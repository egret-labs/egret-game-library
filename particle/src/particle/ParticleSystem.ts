/**
 * Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
 * to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

module particle {
    export class ParticleSystem extends egret.DisplayObject {
        private _pool:Array<Particle> = [];
        private frameTime:number = 0;
        private particles:Array<Particle> = [];
        /**
         * 表示粒子出现总时间，单位毫秒，取值范围(0,Number.MAX_VALUE]，-1表示无限时间
         * @member {number} particle.ParticleSystem#emissionTime
         * @default -1
         */
        public emissionTime:number = -1;

        /**
         * 表示粒子出现间隔，单位毫秒，取值范围(0,Number.MAX_VALUE]
         * @member {number} particle.ParticleSystem#emissionRate
         */
        public emissionRate:number;

        /**
         * 表示粒子所使用的纹理
         * @member {egret.Texture} particle.ParticleSystem#texture
         */
        public texture:egret.Texture;

        /**
         * 表示粒子出现点X坐标，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.ParticleSystem#emitterX
         * @default 0
         */
        public emitterX:number = 0;

        /**
         * 表示粒子出现点Y坐标，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.ParticleSystem#emitterY
         * @default 0
         */
        public emitterY:number = 0;

        /**
         * 表示粒子系统最大粒子数，超过该数量将不会继续创建粒子，取值范围[1,Number.MAX_VALUE]
         * @member {number} particle.ParticleSystem#maxParticles
         * @default 200
         */
        public maxParticles:number = 200;

        /**
         * 当前粒子数
         * @member {number} particle.ParticleSystem#numParticles
         */
        private numParticles:number = 0;

        /**
         * 表示粒子类，如果设置创建粒子时将创建该类
         * @member {number} particle.ParticleSystem#particleClass
         */
        public particleClass:any = null;

        constructor(texture:egret.Texture, emissionRate:number) {
            super();
            this._texture_to_render = texture;
            this.emissionRate = emissionRate;
            this.texture = texture;
        }

        private getParticle():Particle {
            var result:Particle;
            if (this._pool.length) {
                result = this._pool.pop();
            }
            else if (this.particleClass) {
                result = new this.particleClass();
            }
            else {
                result = new Particle();
            }
            return result;
        }

        private removeParticle(particle:Particle):boolean {
            var index = this.particles.indexOf(particle);
            if (index != -1) {
                particle.reset();
                this.particles.splice(index, 1);
                this._pool.push(particle);
                this.numParticles--;
                return true;
            }
            else {
                return false;
            }
        }

        public initParticle(particle:Particle):void {
            particle.x = this.emitterX;
            particle.y = this.emitterY;
            particle.currentTime = 0;
            particle.totalTime = 1000;
        }

        /**
         * 开始创建粒子
         * @param duration {number} 粒子出现总时间
         */
        public start(duration:number = -1):void {
            if (this.emissionRate != 0) {
                this.emissionTime = duration;
                egret.Ticker.getInstance().register(this.update, this);
            }
        }

        /**
         * 停止创建粒子
         * @param clear {boolean} 是否清除掉现有粒子
         */
        public stop(clear:boolean = false):void {
            this.emissionTime = 0;
            egret.Ticker.getInstance().unregister(this.update, this);
            if (clear) {
                this.clear();
            }
        }

        private update(dt:number):void {
            //粒子数很少的时候可能会错过添加粒子的时机
            if (this.emissionTime == -1 || this.emissionTime > 0) {
                this.frameTime += dt;
                while (this.frameTime > 0) {
                    if (this.numParticles < this.maxParticles) {//需要添加粒子
                        this.addOneParticle();
                    }
                    this.frameTime -= this.emissionRate;
                }
                if (this.emissionTime != -1) {
                    this.emissionTime -= dt;
                    if (this.emissionTime < 0) {
                        this.emissionTime = 0;
                    }
                }
            }

            var particle:Particle;
            var particleIndex:number = 0;
            while (particleIndex < this.numParticles) {
                particle = <Particle>this.particles[particleIndex];
                if (particle.currentTime < particle.totalTime) {
                    this.advanceParticle(particle, dt);
                    particle.currentTime += dt;
                    particleIndex++;
                }
                else {
                    this.removeParticle(particle);

                    if (this.numParticles == 0 && this.emissionTime == 0) {
                        this.dispatchEventWith(egret.Event.COMPLETE);
                    }
                }
            }
        }

        public setCurrentParticles(num:number):void {
            for (var i:number = this.numParticles; i < num && this.numParticles < this.maxParticles; i++) {
                this.addOneParticle();
            }
        }

        /**
         * 更换粒子纹理
         * @param texture {egret.Texture} 新的纹理
         */
        public changeTexture(texture:egret.Texture):void {
            if (this.texture != texture) {
                this.texture = texture;
                this._texture_to_render = texture;
            }
        }

        private clear():void {
            while (this.particles.length) {
                this.removeParticle(this.particles[0]);
            }
            this.numParticles = 0;
        }

        private addOneParticle():void {
            //todo 这里可能需要返回成功与否
            var particle:Particle = this.getParticle();
            this.initParticle(particle);
            if (particle.totalTime > 0) {
                this.particles.push(particle);
                this.numParticles++;
            }
        }

        public advanceParticle(particle:Particle, dt:number):void {
            particle.y -= dt / 6;
        }

        private transform:egret.Matrix = new egret.Matrix();

        public _render(renderContext:egret.RendererContext):void {
            if (this.numParticles > 0) {
                var renderFilter = egret.RenderFilter.getInstance();

                //todo 考虑不同粒子使用不同的texture，或者使用egret.SpriteSheet
                var texture:egret.Texture = this.texture;
                var textureW:number = texture._textureWidth;
                var textureH:number = texture._textureHeight;
                var offsetX = texture._offsetX;
                var offsetY = texture._offsetY;
                var bitmapX = texture._bitmapX;
                var bitmapY = texture._bitmapY;
                var bitmapWidth = texture._bitmapWidth;
                var bitmapHeight = texture._bitmapHeight;

                var particle:Particle;
                for (var i:number = 0; i < this.numParticles; i++) {
                    particle = this.particles[i];
                    this.transform.identityMatrix(this._worldTransform);
                    this.transform.appendTransform(particle.x, particle.y, particle.scale, particle.scale, particle.rotation, 0, 0, 0, 0);
                    renderContext.setTransform(this.transform);
                    renderFilter.drawImage(renderContext, this, bitmapX, bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureW, textureH);
                }
            }
        }
    }
}