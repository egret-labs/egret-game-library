//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

module particle {
    export class ParticleSystem extends egret.DisplayObject {
        private _pool: Array<Particle> = [];
        private frameTime: number = 0;
        private particles: Array<Particle> = [];
        private _emitterBounds: egret.Rectangle;
        //相对当前显示对象坐标系下的内容边界
        protected relativeContentBounds: egret.Rectangle;

        protected _emitterX: number = 0;
        protected _emitterY: number = 0;
        /**
         * 表示粒子出现总时间，单位毫秒，取值范围(0,Number.MAX_VALUE]，-1表示无限时间
         * @member {number} particle.ParticleSystem#emissionTime
         * @default -1
         */
        public emissionTime: number = -1;

        /**
         * 表示粒子出现间隔，单位毫秒，取值范围(0,Number.MAX_VALUE]
         * @member {number} particle.ParticleSystem#emissionRate
         */
        public emissionRate: number;

        /**
         * 表示粒子所使用的纹理
         * @member {egret.Texture} particle.ParticleSystem#texture
         */
        public texture: egret.Texture;

        /**
         * 表示粒子系统最大粒子数，超过该数量将不会继续创建粒子，取值范围[1,Number.MAX_VALUE]
         * @member {number} particle.ParticleSystem#maxParticles
         * @default 200
         */
        public maxParticles: number = 200;

        /**
         * 当前粒子数
         * @member {number} particle.ParticleSystem#numParticles
         */
        private numParticles: number = 0;

        /**
         * 表示粒子类，如果设置创建粒子时将创建该类
         * @member {number} particle.ParticleSystem#particleClass
         */
        public particleClass: any = null;

        public $particleConfig:any = null;

        constructor(texture: egret.Texture, emissionRate: number) {
            super();
            if (egret.nativeRender) {
                this.initConfig(emissionRate, 0, 0);
                this.changeTexture(texture);
                this.$nativeDisplayObject.addCallBack("on" + egret.Event.COMPLETE, ()=>{
                    this.dispatchEventWith(egret.Event.COMPLETE);
                }, this);
            }
            else {
                this.emissionRate = emissionRate;
                this.texture = texture;
                this.$renderNode = new egret.sys.GroupNode();
                //不清除绘制数据
                this.$renderNode.cleanBeforeRender = function () { };
            }

        }

        protected createNativeDisplayObject(): void {
            this.$nativeDisplayObject = new egret_native.NativeDisplayObject(egret_native.NativeObjectType.PARTICLE_SYSTEM);
        }

        public initConfig(emissionRate: number, emitterX: number, emitterY: number): void {
            this.$particleConfig = [
                emissionRate,      // emissionRate
                emitterX,          //emitterX
                emitterY,          //emitterY
                0,                 //emitterTime 
                200                //maxParticles
            ]
            this.emissionRate = emissionRate;
            this._emitterX = emitterX;
            this._emitterY = emitterY;
        }

        private getParticle(): Particle {
            var result: Particle;
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

        private removeParticle(particle: Particle): boolean {
            var index = this.particles.indexOf(particle);
            if (index != -1) {
                particle.reset();
                this.particles.splice(index, 1);
                this._pool.push(particle);
                this.numParticles--;
                if (this.bitmapNodeList.length > this.numParticles) {
                    this.bitmapNodeList.length = this.numParticles;
                    this.$renderNode.drawData.length = this.numParticles;
                }
                return true;
            }
            else {
                return false;
            }
        }

        public initParticle(particle: Particle): void {
            particle.x = this.emitterX;
            particle.y = this.emitterY;
            particle.currentTime = 0;
            particle.totalTime = 1000;
        }

        /**
         * 更新当前显示对象坐标系下的边框界限
         * @param emitterRect {egret.Rectangle} 相对发射点坐标系下的界限
         */
        private updateRelativeBounds(emitterRect: egret.Rectangle): void {
            if (emitterRect) {
                if (this.relativeContentBounds == null) {
                    this.relativeContentBounds = new egret.Rectangle();
                }
                this.relativeContentBounds.copyFrom(emitterRect);
                this.relativeContentBounds.x += this.emitterX;
                this.relativeContentBounds.y += this.emitterY;
            } else {
                this.relativeContentBounds = null;
            }

            this.mask = this.relativeContentBounds;
        }

        /**
         * 表示当前粒子系统中发射粒子的渲染边界范围，使用以发射点为基准的坐标系
         * @member {egret.Rectangle} particle.ParticleSystem#emitterBounds
         */
        public set emitterBounds(rect: egret.Rectangle) {
            this._emitterBounds = rect;
            this.updateRelativeBounds(rect);
            if (egret.nativeRender) {
                this.onPropertyChanges();
            }
        }

        public get emitterBounds(): egret.Rectangle {
            return this._emitterBounds;
        }

        public onPropertyChanges(): void {
            this.$nativeDisplayObject.setCustomData(this.$particleConfig);
        }

        /**
         * 表示粒子出现点X坐标，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.ParticleSystem#emitterX
         * @default 0
         */
        public set emitterX(value: number) {
            this._emitterX = value;
            this.updateRelativeBounds(this.emitterBounds);
            if (egret.nativeRender) {
                this.onPropertyChanges();
            }
        }

        public get emitterX(): number {
            return this._emitterX;
        }

        /**
         * 表示粒子出现点Y坐标，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.ParticleSystem#emitterY
         * @default 0
         */
        public set emitterY(value: number) {
            this._emitterY = value;
            this.updateRelativeBounds(this.emitterBounds);
            if (egret.nativeRender) {
                this.onPropertyChanges();
            }
        }

        public get emitterY(): number {
            return this._emitterY;
        }

        /**
         * 开始创建粒子
         * @param duration {number} 粒子出现总时间
         */
        public start(duration: number = -1): void {
            if (this.emissionRate != 0) {
                this.emissionTime = duration;
                if (egret.nativeRender) {
                    this.$particleConfig[3] = duration;
                    this.$nativeDisplayObject.setCustomData(this.$particleConfig);
                }
                else {
                    this.timeStamp = egret.getTimer();
                    egret.startTick(this.update, this);
                }
            }
        }

        /**
         * 停止创建粒子
         * @param clear {boolean} 是否清除掉现有粒子
         */
        public stop(clear: boolean = false): void {
            if (egret.nativeRender) {
                this.$nativeDisplayObject.setStopToParticle(clear);
                return;
            }
            this.emissionTime = 0;
            if (clear) {
                this.clear();
                egret.stopTick(this.update, this);
            }
        }

        private timeStamp: number;

        private update(timeStamp: number): boolean {
            var dt: number = timeStamp - this.timeStamp;
            this.timeStamp = timeStamp;
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

            var particle: Particle;
            var particleIndex: number = 0;
            while (particleIndex < this.numParticles) {
                particle = <Particle>this.particles[particleIndex];
                if (particle.currentTime < particle.totalTime) {
                    this.advanceParticle(particle, dt);
                    particle.currentTime += dt;
                    particleIndex++;
                }
                else {
                    this.removeParticle(particle);
                }
            }

            this.$renderDirty = true;

            if (this.numParticles == 0 && this.emissionTime == 0) {
                egret.stopTick(this.update, this);
                this.dispatchEventWith(egret.Event.COMPLETE);
            }
            return false;
        }

        private particleMeasureRect: egret.Rectangle = new egret.Rectangle();
        private transformForMeasure: egret.Matrix = new egret.Matrix();
        private lastRect: egret.Rectangle;
        $measureContentBounds(bounds: egret.Rectangle): void {
            //如果设置了固定的区域边界则直接使用这个边界，否则进行自动的内容边界测量
            if (this.relativeContentBounds) {
                bounds.copyFrom(this.relativeContentBounds);
                return;
            }

            if (this.numParticles > 0) {
                var texture: egret.Texture = this.texture;

                var textureW: number = Math.round(texture.$getScaleBitmapWidth());
                var textureH: number = Math.round(texture.$getScaleBitmapHeight());

                var totalRect: egret.Rectangle = egret.Rectangle.create();

                var particle: Particle;
                for (var i: number = 0; i < this.numParticles; i++) {
                    particle = this.particles[i];
                    this.transformForMeasure.identity();
                    this.appendTransform(this.transformForMeasure, particle.x, particle.y, particle.scale, particle.scale, particle.rotation, 0, 0, textureW / 2, textureH / 2);

                    this.particleMeasureRect.setEmpty();
                    this.particleMeasureRect.width = textureW;
                    this.particleMeasureRect.height = textureH;

                    var tmpRegion: Region = Region.create();
                    tmpRegion.updateRegion(this.particleMeasureRect, this.transformForMeasure);

                    if (i == 0) {
                        totalRect.setTo(tmpRegion.minX, tmpRegion.minY, tmpRegion.maxX - tmpRegion.minX, tmpRegion.maxY - tmpRegion.minY);
                    } else {
                        var l: number = Math.min(totalRect.x, tmpRegion.minX);
                        var t: number = Math.min(totalRect.y, tmpRegion.minY);

                        var r: number = Math.max(totalRect.right, tmpRegion.maxX);
                        var b: number = Math.max(totalRect.bottom, tmpRegion.maxY);

                        totalRect.setTo(l, t, r - l, b - t);
                    }
                    Region.release(tmpRegion);
                }
                //console.log(totalRect.x + "," + totalRect.y + "," + totalRect.width + "," + totalRect.height);
                this.lastRect = totalRect;
                bounds.setTo(totalRect.x, totalRect.y, totalRect.width, totalRect.height);
                egret.Rectangle.release(totalRect);
            } else {
                if (this.lastRect) {
                    totalRect = this.lastRect;
                    bounds.setTo(totalRect.x, totalRect.y, totalRect.width, totalRect.height);
                    egret.Rectangle.release(totalRect);
                    this.lastRect = null;
                }
            }

        }

        public setCurrentParticles(num: number): void {
            if (egret.nativeRender) {
                return;
            }
            for (var i: number = this.numParticles; i < num && this.numParticles < this.maxParticles; i++) {
                this.addOneParticle();
            }
        }

        /**
         * 更换粒子纹理
         * @param texture {egret.Texture} 新的纹理
         */
        public changeTexture(texture: egret.Texture): void {
            if (this.texture != texture) {
                this.texture = texture;
                if (egret.nativeRender) {
                    this.$nativeDisplayObject.setBitmapDataToParticle(texture);
                }
                else {
                    //todo 这里可以优化
                    this.bitmapNodeList.length = 0;
                    this.$renderNode.drawData.length = 0;
                }
            }
        }

        private clear(): void {
            while (this.particles.length) {
                this.removeParticle(this.particles[0]);
            }
            this.numParticles = 0;
            this.$renderNode.drawData.length = 0;
            this.bitmapNodeList.length = 0;
            this.$renderDirty = true;
            this._pool.length = 0;
        }

        private addOneParticle(): void {
            //todo 这里可能需要返回成功与否
            var particle: Particle = this.getParticle();
            this.initParticle(particle);
            if (particle.totalTime > 0) {
                this.particles.push(particle);
                this.numParticles++;
            }
        }

        public advanceParticle(particle: Particle, dt: number): void {
            particle.y -= dt / 6;
        }

        private bitmapNodeList: Array<egret.sys.BitmapNode> = [];

        public $updateRenderNode(): void {
            if (egret.nativeRender) {
                return;
            }
            if (this.numParticles > 0) {

                //todo 考虑不同粒子使用不同的texture，或者使用egret.SpriteSheet
                var texture: egret.Texture = this.texture;

                var textureW: number = Math.round(texture.$getScaleBitmapWidth());
                var textureH: number = Math.round(texture.$getScaleBitmapHeight());
                var offsetX = texture.$offsetX;
                var offsetY = texture.$offsetY;
                var bitmapX = texture.$bitmapX;
                var bitmapY = texture.$bitmapY;
                var bitmapWidth = texture.$bitmapWidth;
                var bitmapHeight = texture.$bitmapHeight;

                var particle: Particle;
                for (var i: number = 0; i < this.numParticles; i++) {
                    particle = this.particles[i];

                    var bitmapNode: egret.sys.BitmapNode;
                    if (!this.bitmapNodeList[i]) {
                        bitmapNode = new egret.sys.BitmapNode();
                        this.bitmapNodeList[i] = bitmapNode;
                        (<egret.sys.GroupNode>this.$renderNode).addNode(this.bitmapNodeList[i]);
                        bitmapNode.image = texture.$bitmapData;
                        bitmapNode.imageWidth = texture.$sourceWidth;
                        bitmapNode.imageHeight = texture.$sourceHeight;
                        bitmapNode.drawImage(bitmapX, bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureW, textureH);
                    }
                    bitmapNode = this.bitmapNodeList[i];

                    bitmapNode.matrix = particle.$getMatrix(textureW / 2, textureH / 2);
                    bitmapNode.blendMode = particle.blendMode;
                    bitmapNode.alpha = particle.alpha;
                }
            }
        }

        private appendTransform(matrix: egret.Matrix, x: number, y: number, scaleX: number, scaleY: number, rotation: number, skewX: number, skewY: number, regX: number, regY: number): egret.Matrix {
            if (rotation % 360) {
                var r = rotation;// * Matrix.DEG_TO_RAD;
                var cos = egret.NumberUtils.cos(r);
                var sin = egret.NumberUtils.sin(r);
            } else {
                cos = 1;
                sin = 0;
            }

            if (skewX || skewY) {
                // TODO: can this be combined into a single append?
                //                skewX *= Matrix.DEG_TO_RAD;
                //                skewY *= Matrix.DEG_TO_RAD;
                matrix.append(egret.NumberUtils.cos(skewY), egret.NumberUtils.sin(skewY), -egret.NumberUtils.sin(skewX), egret.NumberUtils.cos(skewX), x, y);
                matrix.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0);
            } else {
                matrix.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
            }

            if (regX || regY) {
                // prepend the registration offset:
                matrix.tx -= regX * matrix.a + regY * matrix.c;
                matrix.ty -= regX * matrix.b + regY * matrix.d;
            }
            return matrix;
        }
    }
}

let regionPool: Region[] = [];

/**
 * @private
 */
class Region {

    /**
     * @private
     * 释放一个Region实例到对象池
     */
    public static release(region: Region): void {
        regionPool.push(region);
    }

    /**
     * @private
     * 从对象池中取出或创建一个新的Region对象。
     * 建议对于一次性使用的对象，均使用此方法创建，而不是直接new一个。
     * 使用完后调用对应的release()静态方法回收对象，能有效减少对象创建数量造成的性能开销。
     */
    public static create(): Region {
        let region = regionPool.pop();
        if (!region) {
            region = new Region();
        }
        return region;
    }

    /**
     * @private
     */
    public minX: number = 0;
    /**
     * @private
     */
    public minY: number = 0;
    /**
     * @private
     */
    public maxX: number = 0;
    /**
     * @private
     */
    public maxY: number = 0;

    /**
     * @private
     */
    public width: number = 0;
    /**
     * @private
     */
    public height: number = 0;
    /**
     * @private
     */
    public area: number = 0;

    /**
     * @private
     */
    private setEmpty(): void {
        this.minX = 0;
        this.minY = 0;
        this.maxX = 0;
        this.maxY = 0;
        this.width = 0;
        this.height = 0;
        this.area = 0;
    }

    /**
     * @private
     */
    public updateRegion(bounds: egret.Rectangle, matrix: egret.Matrix): void {
        if (bounds.width == 0 || bounds.height == 0) {
            //todo 理论上应该是空
            this.setEmpty();
            return;
        }
        let m = matrix;
        let a = m.a;
        let b = m.b;
        let c = m.c;
        let d = m.d;
        let tx = m.tx;
        let ty = m.ty;
        let x = bounds.x;
        let y = bounds.y;
        let xMax = x + bounds.width;
        let yMax = y + bounds.height;
        let minX: number, minY: number, maxX: number, maxY: number;
        //优化，通常情况下不缩放旋转的对象占多数，直接加上偏移量即可。
        if (a == 1.0 && b == 0.0 && c == 0.0 && d == 1.0) {
            minX = x + tx - 1;
            minY = y + ty - 1;
            maxX = xMax + tx + 1;
            maxY = yMax + ty + 1;
        }
        else {
            let x0 = a * x + c * y + tx;
            let y0 = b * x + d * y + ty;
            let x1 = a * xMax + c * y + tx;
            let y1 = b * xMax + d * y + ty;
            let x2 = a * xMax + c * yMax + tx;
            let y2 = b * xMax + d * yMax + ty;
            let x3 = a * x + c * yMax + tx;
            let y3 = b * x + d * yMax + ty;

            let tmp = 0;

            if (x0 > x1) {
                tmp = x0;
                x0 = x1;
                x1 = tmp;
            }
            if (x2 > x3) {
                tmp = x2;
                x2 = x3;
                x3 = tmp;
            }

            minX = (x0 < x2 ? x0 : x2) - 1;
            maxX = (x1 > x3 ? x1 : x3) + 1;

            if (y0 > y1) {
                tmp = y0;
                y0 = y1;
                y1 = tmp;
            }
            if (y2 > y3) {
                tmp = y2;
                y2 = y3;
                y3 = tmp;
            }

            minY = (y0 < y2 ? y0 : y2) - 1;
            maxY = (y1 > y3 ? y1 : y3) + 1;
        }
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
        this.width = maxX - minX;
        this.height = maxY - minY;
        this.area = this.width * this.height;
    }
}