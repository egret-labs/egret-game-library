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
    export class GravityParticleSystem extends ParticleSystem {
        /**
         * 表示粒子初始坐标 x 差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#emitterXVariance
         */
        private emitterXVariance:number;
        /**
         * 表示粒子初始坐标 y 差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#emitterYVariance
         */
        private emitterYVariance:number;

        /**
         * 表示粒子存活时间，单位毫秒，取值范围(0,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#lifespan
         */
        private lifespan:number;
        /**
         * 表示粒子存活时间差值，单位毫秒，取值范围(0,Number.MAX_VALUE]且不大于 lifespan
         * @member {number} particle.GravityParticleSystem#lifespanVariance
         */
        private lifespanVariance:number;

        /**
         * 表示粒子出现时大小，取值范围(0,Number.MAX_VALUE]，粒子将会在存活时间内由 startSize 慢慢变为 endSize
         * @member {number} particle.GravityParticleSystem#startSize
         */
        private startSize:number;
        /**
         * 表示粒子出现时大小差值，取值范围(0,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#startSizeVariance
         */
        private startSizeVariance:number;

        /**
         * 表示粒子消失时大小，取值范围(0,Number.MAX_VALUE]，粒子将会在存活时间内由 startSize慢慢变为 endSize
         * @member {number} particle.GravityParticleSystem#endSize
         */
        private endSize:number;
        /**
         * 表示粒子消失时大小差值，取值范围(0,Number.MAX_VALUE]，且不大于endSize
         * @member {number} particle.GravityParticleSystem#endSizeVariance
         */
        private endSizeVariance:number;

        /**
         * 表示粒子出现时的角度，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#emitAngle
         */
        private emitAngle:number;
        /**
         * 表示粒子出现时的角度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#emitAngleVariance
         */
        private emitAngleVariance:number;

        /**
         * 表示粒子出现时旋转值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]，粒子将会在存活时间内由 startRotation 慢慢变为 endRotation
         * @member {number} particle.GravityParticleSystem#startRotation
         */
        private startRotation:number;
        /**
         * 表示粒子出现时旋转值差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#startRotationVariance
         */
        private startRotationVariance:number;

        /**
         * 表示粒子消失时旋转值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]，粒子将会在存活时间内由 startRotation 慢慢变为 endRotation
         * @member {number} particle.GravityParticleSystem#endRotation
         */
        private endRotation:number;
        /**
         * 表示粒子消失时旋转值差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#endRotationVariance
         */
        private endRotationVariance:number;

        /**
         * 表示粒子出现时速度，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#speed
         */
        private speed:number;
        /**
         * 表示粒子出现时速度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#speedVariance
         */
        private speedVariance:number;

        /**
         * 表示粒子水平重力，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#gravityX
         */
        private gravityX:number;
        /**
         * 表示粒子垂直重力，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#gravityX
         */
        private gravityY:number;

        /**
         * 表示粒子径向加速度，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#radialAcceleration
         */
        private radialAcceleration:number;
        /**
         * 表示粒子径向加速度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#radialAccelerationVariance
         */
        private radialAccelerationVariance:number;

        /**
         * 表示粒子切向加速度，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#tangentialAcceleration
         */
        private tangentialAcceleration:number;
        /**
         * 表示粒子切向加速度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#tangentialAccelerationVariance
         */
        private tangentialAccelerationVariance:number;

        /**
         * 表示粒子出现时的 Alpha 透明度值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]，粒子将会在存活时间内由 startAlpha 慢慢变为 endAlpha
         * @member {number} particle.GravityParticleSystem#startAlpha
         */
        private startAlpha:number;
        /**
         * 表示粒子出现时的 Alpha 透明度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#startAlphaVariance
         */
        private startAlphaVariance:number;

        /**
         * 表示粒子消失时的 Alpha 透明度值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]，粒子将会在存活时间内由 startAlpha 慢慢变为 endAlpha
         * @member {number} particle.GravityParticleSystem#endAlpha
         */
        private endAlpha:number;
        /**
         * 表示粒子消失时的 Alpha 透明度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#endAlphaVariance
         */
        private endAlphaVariance:number;
        
        /**
         * 表示粒子使用的混合模式
         * @member {number} particle.GravityParticleSystem#blendMode
         */
        private particleBlendMode:number;

        constructor(texture:egret.Texture, config:any) {
            super(texture, 200);
            this.parseConfig(config);
            this.emissionRate = this.lifespan / this.maxParticles;
            this.particleClass = GravityParticle;
        }

        private parseConfig(config:any):void {
            this.emitterX = getValue(config.emitter.x);
            this.emitterY = getValue(config.emitter.y);
            this.emitterXVariance = getValue(config.emitterVariance.x);
            this.emitterYVariance = getValue(config.emitterVariance.y);

            this.gravityX = getValue(config.gravity.x);
            this.gravityY = getValue(config.gravity.y);
            
            if(config.useEmitterRect == true){
                var bounds:egret.Rectangle = new egret.Rectangle();
                bounds.x = getValue(config.emitterRect.x);
                bounds.y = getValue(config.emitterRect.y);
                bounds.width = getValue(config.emitterRect.width);
                bounds.height = getValue(config.emitterRect.height);
                this.emitterBounds = bounds;
            }

            this.maxParticles = getValue(config.maxParticles);

            this.speed = getValue(config.speed);
            this.speedVariance = getValue(config.speedVariance);

            this.lifespan = Math.max(0.01, getValue(config.lifespan));
            this.lifespanVariance = getValue(config.lifespanVariance);

            this.emitAngle = getValue(config.emitAngle);
            this.emitAngleVariance = getValue(config.emitAngleVariance);

            this.startSize = getValue(config.startSize);
            this.startSizeVariance = getValue(config.startSizeVariance);
            this.endSize = getValue(config.endSize);
            this.endSizeVariance = getValue(config.endSizeVariance);

            this.startRotation = getValue(config.startRotation);
            this.startRotationVariance = getValue(config.startRotationVariance);
            this.endRotation = getValue(config.endRotation);
            this.endRotationVariance = getValue(config.endRotationVariance);

            this.radialAcceleration = getValue(config.radialAcceleration);
            this.radialAccelerationVariance = getValue(config.radialAccelerationVariance);
            this.tangentialAcceleration = getValue(config.tangentialAcceleration);
            this.tangentialAccelerationVariance = getValue(config.tangentialAccelerationVariance);

            this.startAlpha = getValue(config.startAlpha);
            this.startAlphaVariance = getValue(config.startAlphaVariance);
            this.endAlpha = getValue(config.endAlpha);
            this.endAlphaVariance = getValue(config.endAlphaVariance);
            
            this.particleBlendMode = config.blendMode;

            function getValue(value:any):number {
                if (typeof value == "undefined") {
                    return 0;
                }
                return value;
            }
        }

        public initParticle(particle:Particle):void {
            var locParticle:GravityParticle = <GravityParticle>particle;

            var lifespan:number = GravityParticleSystem.getValue(this.lifespan, this.lifespanVariance);

            locParticle.currentTime = 0;
            locParticle.totalTime = lifespan > 0 ? lifespan : 0;

            if (lifespan <= 0) {
                return;
            }

            locParticle.x = GravityParticleSystem.getValue(this.emitterX, this.emitterXVariance);
            locParticle.y = GravityParticleSystem.getValue(this.emitterY, this.emitterYVariance);
            locParticle.startX = this.emitterX;
            locParticle.startY = this.emitterY;

            var angle:number = GravityParticleSystem.getValue(this.emitAngle, this.emitAngleVariance);
            var speed:number = GravityParticleSystem.getValue(this.speed, this.speedVariance);
            locParticle.velocityX = speed * egret.NumberUtils.cos(angle);
            locParticle.velocityY = speed * egret.NumberUtils.sin(angle);

            locParticle.radialAcceleration = GravityParticleSystem.getValue(this.radialAcceleration, this.radialAccelerationVariance);
            locParticle.tangentialAcceleration = GravityParticleSystem.getValue(this.tangentialAcceleration, this.tangentialAccelerationVariance);

            var startSize:number = GravityParticleSystem.getValue(this.startSize, this.startSizeVariance);
            if (startSize < 0.1) {
                startSize = 0.1;
            }
            var endSize:number = GravityParticleSystem.getValue(this.endSize, this.endSizeVariance);
            if (endSize < 0.1) {
                endSize = 0.1;
            }
            var textureWidth = this.texture.textureWidth;
            locParticle.scale = startSize / textureWidth;
            locParticle.scaleDelta = ((endSize - startSize) / lifespan) / textureWidth;

            var startRotation:number = GravityParticleSystem.getValue(this.startRotation, this.startRotationVariance);
            var endRotation:number = GravityParticleSystem.getValue(this.endRotation, this.endRotationVariance);
            locParticle.rotation = startRotation;
            locParticle.rotationDelta = (endRotation - startRotation) / lifespan;

            var startAlpha:number = GravityParticleSystem.getValue(this.startAlpha, this.startAlphaVariance);
            var endAlpha:number = GravityParticleSystem.getValue(this.endAlpha, this.endAlphaVariance);

            locParticle.alpha = startAlpha;
            locParticle.alphaDelta = (endAlpha - startAlpha) / lifespan;
            
            locParticle.blendMode = this.particleBlendMode;
        }

        private static getValue(base:number, variance:number):number {
            return base + variance * (Math.random() * 2 - 1);
        }

        public advanceParticle(particle:Particle, dt:number):void {
            var locParticle:GravityParticle = <GravityParticle>particle;
            dt = dt / 1000;

            var restTime:number = locParticle.totalTime - locParticle.currentTime;
            dt = restTime > dt ? dt : restTime;
            locParticle.currentTime += dt;

            var distanceX:number = locParticle.x - locParticle.startX;
            var distanceY:number = locParticle.y - locParticle.startY;
            var distanceScalar:number = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            if (distanceScalar < 0.01) {
                distanceScalar = 0.01;
            }

            var radialX:number = distanceX / distanceScalar;
            var radialY:number = distanceY / distanceScalar;
            var tangentialX:number = radialX;
            var tangentialY:number = radialY;

            radialX *= locParticle.radialAcceleration;
            radialY *= locParticle.radialAcceleration;

            var temp:number = tangentialX;
            tangentialX = -tangentialY * locParticle.tangentialAcceleration;
            tangentialY = temp * locParticle.tangentialAcceleration;

            locParticle.velocityX += dt * (this.gravityX + radialX + tangentialX);
            locParticle.velocityY += dt * (this.gravityY + radialY + tangentialY);
            locParticle.x += locParticle.velocityX * dt;
            locParticle.y += locParticle.velocityY * dt;

            locParticle.scale += locParticle.scaleDelta * dt * 1000;
            if(locParticle.scale < 0) {
                locParticle.scale = 0;
            }
            locParticle.rotation += locParticle.rotationDelta * dt * 1000;
            locParticle.alpha += locParticle.alphaDelta * dt * 1000;
        }
    }
}