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
    const enum ParticleKeys {
        emitterX,
        emitterY,
        emitterTime,
        maxParticles,
        emitterXVariance,
        emitterYVariance,
        gravityX,
        gravityY,
        speed,
        speedVariance,
        lifespan,
        lifespanVariance,
        emitAngle,
        emitAngleVariance,
        startSize,
        startSizeVariance,
        endSize,
        endSizeVariance,
        startRotation,
        startRotationVariance,
        endRotation,
        endRotationVariance,
        radialAcceleration,
        radialAccelerationVariance,
        tangentialAcceleration,
        tangentialAccelerationVariance,
        startAlpha,
        startAlphaVariance,
        endAlpha,
        endAlphaVariance,
        particleBlendMode,
        emitterBoundsX,
        emitterBoundsY,
        emitterBoundsWidth,
        emitterBoundsHeight,
        currentParticles
    }

    export class GravityParticleSystem extends ParticleSystem {
        /**
         * 表示粒子初始坐标 x 差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#emitterXVariance
         */
        private emitterXVariance: number;
        /**
         * 表示粒子初始坐标 y 差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#emitterYVariance
         */
        private emitterYVariance: number;

        /**
         * 表示粒子存活时间，单位毫秒，取值范围(0,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#lifespan
         */
        private lifespan: number;
        /**
         * 表示粒子存活时间差值，单位毫秒，取值范围(0,Number.MAX_VALUE]且不大于 lifespan
         * @member {number} particle.GravityParticleSystem#lifespanVariance
         */
        private lifespanVariance: number;

        /**
         * 表示粒子出现时大小，取值范围(0,Number.MAX_VALUE]，粒子将会在存活时间内由 startSize 慢慢变为 endSize
         * @member {number} particle.GravityParticleSystem#startSize
         */
        private startSize: number;
        /**
         * 表示粒子出现时大小差值，取值范围(0,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#startSizeVariance
         */
        private startSizeVariance: number;

        /**
         * 表示粒子消失时大小，取值范围(0,Number.MAX_VALUE]，粒子将会在存活时间内由 startSize慢慢变为 endSize
         * @member {number} particle.GravityParticleSystem#endSize
         */
        private endSize: number;
        /**
         * 表示粒子消失时大小差值，取值范围(0,Number.MAX_VALUE]，且不大于endSize
         * @member {number} particle.GravityParticleSystem#endSizeVariance
         */
        private endSizeVariance: number;

        /**
         * 表示粒子出现时的角度，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#emitAngle
         */
        private emitAngle: number;
        /**
         * 表示粒子出现时的角度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#emitAngleVariance
         */
        private emitAngleVariance: number;

        /**
         * 表示粒子出现时旋转值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]，粒子将会在存活时间内由 startRotation 慢慢变为 endRotation
         * @member {number} particle.GravityParticleSystem#startRotation
         */
        private startRotation: number;
        /**
         * 表示粒子出现时旋转值差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#startRotationVariance
         */
        private startRotationVariance: number;

        /**
         * 表示粒子消失时旋转值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]，粒子将会在存活时间内由 startRotation 慢慢变为 endRotation
         * @member {number} particle.GravityParticleSystem#endRotation
         */
        private endRotation: number;
        /**
         * 表示粒子消失时旋转值差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#endRotationVariance
         */
        private endRotationVariance: number;

        /**
         * 表示粒子出现时速度，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#speed
         */
        private speed: number;
        /**
         * 表示粒子出现时速度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#speedVariance
         */
        private speedVariance: number;

        /**
         * 表示粒子水平重力，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#gravityX
         */
        private gravityX: number;
        /**
         * 表示粒子垂直重力，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#gravityX
         */
        private gravityY: number;

        /**
         * 表示粒子径向加速度，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#radialAcceleration
         */
        private radialAcceleration: number;
        /**
         * 表示粒子径向加速度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#radialAccelerationVariance
         */
        private radialAccelerationVariance: number;

        /**
         * 表示粒子切向加速度，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#tangentialAcceleration
         */
        private tangentialAcceleration: number;
        /**
         * 表示粒子切向加速度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#tangentialAccelerationVariance
         */
        private tangentialAccelerationVariance: number;

        /**
         * 表示粒子出现时的 Alpha 透明度值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]，粒子将会在存活时间内由 startAlpha 慢慢变为 endAlpha
         * @member {number} particle.GravityParticleSystem#startAlpha
         */
        private startAlpha: number;
        /**
         * 表示粒子出现时的 Alpha 透明度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#startAlphaVariance
         */
        private startAlphaVariance: number;

        /**
         * 表示粒子消失时的 Alpha 透明度值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]，粒子将会在存活时间内由 startAlpha 慢慢变为 endAlpha
         * @member {number} particle.GravityParticleSystem#endAlpha
         */
        private endAlpha: number;
        /**
         * 表示粒子消失时的 Alpha 透明度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#endAlphaVariance
         */
        private endAlphaVariance: number;

        /**
         * 表示粒子使用的混合模式
         * @member {number} particle.GravityParticleSystem#blendMode
         */
        private particleBlendMode: number;

        /**
         * 是否完成解析json数据
         */
        private $init = false;

        constructor(texture: egret.Texture, config: ArrayBuffer) {
            super(texture, 200);
            this.gpuRender = false;
            this.parseConfig(config);
            this.emissionRate = this.lifespan / this.maxParticles;
            this.particleClass = GravityParticle;
            this.$init = true;
        }

        public start(duration: number = -1): void {
            if (egret.nativeRender) {
                if (this.emissionRate != 0) {
                    this.emissionTime = duration;
                }
                this.$particleConfig[2] = duration;
                let configArray = [];
                let i = 0;
                for (let key in this.$particleConfig) {
                    configArray.push(i++);
                    configArray.push(this.$particleConfig[key]);
                }
                this.$nativeDisplayObject.setCustomData(configArray);
            }
            else {
                super.start(duration);
            }
        }

        protected onPropertyChanges(): void {
            if (this.$init == false) {
                return;
            }
            let configArray: Array<number> = [];
            configArray.push(ParticleKeys.emitterX);
            this.$particleConfig[ParticleKeys.emitterX] = this._emitterX;
            configArray.push(this._emitterX);
            configArray.push(ParticleKeys.emitterY);
            this.$particleConfig[ParticleKeys.emitterY] = this._emitterY;
            configArray.push(this._emitterY);

            if (this.relativeContentBounds) {
                configArray.push(ParticleKeys.emitterBoundsX);
                this.$particleConfig[ParticleKeys.emitterBoundsX] = this.relativeContentBounds.x;
                configArray.push(this.relativeContentBounds.x);
                configArray.push(ParticleKeys.emitterBoundsY);
                this.$particleConfig[ParticleKeys.emitterBoundsY] = this.relativeContentBounds.y;
                configArray.push(this.relativeContentBounds.y);
                configArray.push(ParticleKeys.emitterBoundsWidth);
                this.$particleConfig[ParticleKeys.emitterBoundsWidth] = this.relativeContentBounds.width;
                configArray.push(this.relativeContentBounds.width);
                configArray.push(ParticleKeys.emitterBoundsHeight);
                this.$particleConfig[ParticleKeys.emitterBoundsHeight] = this.relativeContentBounds.height;
                configArray.push(this.relativeContentBounds.height);
            }
            this.$nativeDisplayObject.setCustomData(configArray);
        }

        private parseConfig(config: ArrayBuffer): void {
            if(!config || config.byteLength != 139) {
                throw "config error";
            }
            const byteArray = new egret.ByteArray(config);
            const nameLength = byteArray.readUnsignedByte();
            const name = byteArray.readUTFBytes(nameLength);
            if(name != "feather") {
                throw "config error";
            }
            byteArray.position = 12;

            if (egret.nativeRender) {
                this._emitterX = getValue(byteArray.readFloat());
                this.emitterXVariance = getValue(byteArray.readFloat());
                this._emitterY = getValue(byteArray.readFloat());
                this.emitterYVariance = getValue(byteArray.readFloat());
            }
            else {
                this.emitterX = getValue(byteArray.readFloat());
                this.emitterXVariance = getValue(byteArray.readFloat());
                this.emitterY = getValue(byteArray.readFloat());
                this.emitterYVariance = getValue(byteArray.readFloat());
            }

            this.maxParticles = getValue(byteArray.readUnsignedShort());

            this.lifespan = Math.max(0.01, getValue(byteArray.readUnsignedShort()));
            this.lifespanVariance = getValue(byteArray.readUnsignedShort());

            this.startSize = getValue(byteArray.readFloat());
            this.startSizeVariance = getValue(byteArray.readFloat());
            this.endSize = getValue(byteArray.readFloat());
            this.endSizeVariance = getValue(byteArray.readFloat());

            this.startRotation = getValue(byteArray.readFloat());
            this.startRotationVariance = getValue(byteArray.readFloat());
            this.endRotation = getValue(byteArray.readFloat());
            this.endRotationVariance = getValue(byteArray.readFloat());

            this.startAlpha = getValue(byteArray.readFloat());
            this.startAlphaVariance = getValue(byteArray.readFloat());
            this.endAlpha = getValue(byteArray.readFloat());
            this.endAlphaVariance = getValue(byteArray.readFloat());

            this.gravityX = getValue(byteArray.readFloat());
            this.gravityY = getValue(byteArray.readFloat());

            this.speed = getValue(byteArray.readFloat());
            this.speedVariance = getValue(byteArray.readFloat());

            this.emitAngle = getValue(byteArray.readFloat());
            this.emitAngleVariance = getValue(byteArray.readFloat());

            this.radialAcceleration = getValue(byteArray.readFloat());
            this.radialAccelerationVariance = getValue(byteArray.readFloat());
            this.tangentialAcceleration = getValue(byteArray.readFloat());
            this.tangentialAccelerationVariance = getValue(byteArray.readFloat());

            const x = byteArray.readFloat();
            const y = byteArray.readFloat();
            const width = byteArray.readFloat();
            const height = byteArray.readFloat();
            const useEmitterRect = width != 0 && height != 0;
            if (useEmitterRect) {
                const bounds: egret.Rectangle = new egret.Rectangle();
                bounds.x = getValue(x);
                bounds.y = getValue(y);
                bounds.width = getValue(width);
                bounds.height = getValue(height);
                this.emitterBounds = bounds;
            }
            else {
                this.emitterBounds = null;
            }

            this.particleBlendMode = byteArray.readUnsignedByte();

            function getValue(value: any): number {
                if (typeof value == "undefined") {
                    return 0;
                }
                return value;
            }

            this.$particleConfig = {
                0: this.emitterX,
                1: this.emitterY,
                2: -1,     // emitterTime, 
                3: this.maxParticles,
                4: this.emitterXVariance,
                5: this.emitterYVariance,
                6: this.gravityX,
                7: this.gravityY,
                8: this.speed,
                9: this.speedVariance,
                10: this.lifespan,
                11: this.lifespanVariance,
                12: this.emitAngle,
                13: this.emitAngleVariance,
                14: this.startSize,
                15: this.startSizeVariance,
                16: this.endSize,
                17: this.endSizeVariance,
                18: this.startRotation,
                19: this.startRotationVariance,
                20: this.endRotation,
                21: this.endRotationVariance,
                22: this.radialAcceleration,
                23: this.radialAccelerationVariance,
                24: this.tangentialAcceleration,
                25: this.tangentialAccelerationVariance,
                26: this.startAlpha,
                27: this.startAlphaVariance,
                28: this.endAlpha,
                29: this.endAlphaVariance,
                30: this.particleBlendMode,
                31: useEmitterRect ? this.relativeContentBounds.x : 0,
                32: useEmitterRect ? this.relativeContentBounds.y : 0,
                33: useEmitterRect ? this.relativeContentBounds.width : 0,
                34: useEmitterRect ? this.relativeContentBounds.height : 0,
                35: 0
            }
        }

        public initParticle(particle: Particle): void {
            const locParticle: GravityParticle = <GravityParticle>particle;

            const lifespan: number = GravityParticleSystem.getValue(this.lifespan, this.lifespanVariance);

            locParticle.currentTime = 0;
            locParticle.totalTime = lifespan > 0 ? lifespan : 0;

            if (lifespan <= 0) {
                return;
            }

            locParticle.x = GravityParticleSystem.getValue(this.emitterX, this.emitterXVariance);
            locParticle.y = GravityParticleSystem.getValue(this.emitterY, this.emitterYVariance);
            locParticle.startX = this.emitterX;
            locParticle.startY = this.emitterY;

            const angle: number = GravityParticleSystem.getValue(this.emitAngle, this.emitAngleVariance);
            const speed: number = GravityParticleSystem.getValue(this.speed, this.speedVariance);
            locParticle.velocityX = speed * egret.NumberUtils.cos(angle);
            locParticle.velocityY = speed * egret.NumberUtils.sin(angle);

            locParticle.radialAcceleration = GravityParticleSystem.getValue(this.radialAcceleration, this.radialAccelerationVariance);
            locParticle.tangentialAcceleration = GravityParticleSystem.getValue(this.tangentialAcceleration, this.tangentialAccelerationVariance);

            let startSize: number = GravityParticleSystem.getValue(this.startSize, this.startSizeVariance);
            if (startSize < 0.1) {
                startSize = 0.1;
            }
            let endSize: number = GravityParticleSystem.getValue(this.endSize, this.endSizeVariance);
            if (endSize < 0.1) {
                endSize = 0.1;
            }
            const textureWidth = this.texture.textureWidth;
            locParticle.scale = startSize / textureWidth;
            locParticle.scaleDelta = ((endSize - startSize) / lifespan) / textureWidth;

            const startRotation: number = GravityParticleSystem.getValue(this.startRotation, this.startRotationVariance);
            const endRotation: number = GravityParticleSystem.getValue(this.endRotation, this.endRotationVariance);
            locParticle.rotation = startRotation;
            locParticle.rotationDelta = (endRotation - startRotation) / lifespan;

            const startAlpha: number = GravityParticleSystem.getValue(this.startAlpha, this.startAlphaVariance);
            const endAlpha: number = GravityParticleSystem.getValue(this.endAlpha, this.endAlphaVariance);

            locParticle.alpha = startAlpha;
            locParticle.alphaDelta = (endAlpha - startAlpha) / lifespan;

            locParticle.blendMode = this.particleBlendMode;
        }

        private static getValue(base: number, variance: number): number {
            return base + variance * (Math.random() * 2 - 1);
        }

        public advanceParticle(particle: Particle, dt: number): void {
            const locParticle: GravityParticle = <GravityParticle>particle;
            dt = dt / 1000;

            const restTime: number = locParticle.totalTime - locParticle.currentTime;
            dt = restTime > dt ? dt : restTime;

            const distanceX: number = locParticle.x - locParticle.startX;
            const distanceY: number = locParticle.y - locParticle.startY;
            let distanceScalar: number = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            if (distanceScalar < 0.01) {
                distanceScalar = 0.01;
            }

            let radialX: number = distanceX / distanceScalar;
            let radialY: number = distanceY / distanceScalar;
            let tangentialX: number = radialX;
            let tangentialY: number = radialY;

            radialX *= locParticle.radialAcceleration;
            radialY *= locParticle.radialAcceleration;

            const temp: number = tangentialX;
            tangentialX = -tangentialY * locParticle.tangentialAcceleration;
            tangentialY = temp * locParticle.tangentialAcceleration;

            locParticle.velocityX += dt * (this.gravityX + radialX + tangentialX);
            locParticle.velocityY += dt * (this.gravityY + radialY + tangentialY);
            locParticle.x += locParticle.velocityX * dt;
            locParticle.y += locParticle.velocityY * dt;

            locParticle.scale += locParticle.scaleDelta * dt * 1000;
            if (locParticle.scale < 0) {
                locParticle.scale = 0;
            }
            locParticle.rotation += locParticle.rotationDelta * dt * 1000;
            locParticle.alpha += locParticle.alphaDelta * dt * 1000;
        }
    }
}