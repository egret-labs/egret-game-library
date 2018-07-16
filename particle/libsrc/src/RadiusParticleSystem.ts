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

    export class RadiusParticleSystem extends ParticleSystem {
        private emitterXVariance: number;
        private emitterYVariance: number;
        private lifespan: number;
        private lifespanVariance: number;
        private startSize: number;
        private startSizeVariance: number;
        private endSize: number;
        private endSizeVariance: number;
        private startRotation: number;
        private startRotationVariance: number;
        private endRotation: number;
        private endRotationVariance: number;

        private startRed: number;
        private startRedVariance: number;
        private endRed: number;
        private endRedVariance: number;
        private startGreen: number;
        private startGreenVariance: number;
        private endGreen: number;
        private endGreenVariance: number;
        private startBlue: number;
        private startBlueVariance: number;
        private endBlue: number;
        private endBlueVariance: number;
        private startAlpha: number;
        private startAlphaVariance: number;
        private endAlpha: number;
        private endAlphaVariance: number;

        private maxRadius: number;
        private maxRadiusVariance: number;
        private minRadius: number;
        private minRadiusVariance: number;
        private emitRotation: number;
        private emitRotationVariance: number;
        private emitRotationDelta: number;
        private emitRotationDeltaVariance: number;

        private particleBlendMode: number;

        constructor(texture: egret.Texture, config: ArrayBuffer) {
            super(texture, 200);
            if (this.gpuRender) {
                this.$renderNode = new egret.sys.ParticleNode();
                let vertexSrc = "attribute vec2 aParticlePosition;\n" +
                    "attribute vec2 aParticleTextureCoord;\n" +
                    "attribute vec2 aParticleScale;\n" +
                    "attribute vec2 aParticleRotation;\n" +
                    "attribute vec2 aParticleRed;\n" +
                    "attribute vec2 aParticleGreen;\n" +
                    "attribute vec2 aParticleBlue;\n" +
                    "attribute vec2 aParticleAlpha;\n" +
                    "attribute vec2 aParticleEmitRotation;\n" +
                    "attribute vec2 aParticleEmitRadius;\n" +
                    "attribute vec2 aParticleTime;\n" +

                    "uniform vec2 projectionVector;\n" +
                    "uniform vec2 uTextureSize;\n" +
                    "uniform mat3 uGlobalMatrix;\n" +
                    "uniform float uGlobalAlpha;\n" +
                    "uniform float uParticleEmitterX;\n" +
                    "uniform float uParticleEmitterY;\n" +
                    "uniform float uParticlePasedTime;\n" +

                    "varying vec2 vTextureCoord;\n" +
                    "varying vec4 vColor;\n" +

                    "void main(void) {\n" +
                    "   vTextureCoord = aParticleTextureCoord;\n" +
                    //计算dt
                    "   float dt;\n" +
                    "   if(uParticlePasedTime > aParticleTime.x + aParticleTime.y) {\n" +
                    "       return;\n" +
                    "   }\n" +
                    "   else {\n" +
                    "       dt = uParticlePasedTime - aParticleTime.x;\n" +
                    "   }\n" +
                    // global 矩阵
                    "   float globalA = uGlobalMatrix[0][0];\n" +
                    "   float globalB = uGlobalMatrix[1][0];\n" +
                    "   float globalC = uGlobalMatrix[0][1];\n" +
                    "   float globalD = uGlobalMatrix[1][1];\n" +
                    "   float globalTx = uGlobalMatrix[0][2];\n" +
                    "   float globalTy = uGlobalMatrix[1][2];\n" +

                    //计算粒子矩阵
                    "   float scale = aParticleScale.x + aParticleScale.y * dt;\n" +
                    "   float rotation = aParticleRotation.x + aParticleRotation.y * dt;\n" +
                    "   float cos2 = cos(rotation);\n" +
                    "   float sin2 = sin(rotation);\n" +
                    "   float localA = cos2 * scale;\n" +
                    "   float localB = sin2 * scale;\n" +
                    "   float localC = -sin2 * scale;\n" +
                    "   float localD = cos2 * scale;\n" +
                    "   float emitRotation = aParticleEmitRotation.x + aParticleEmitRotation.y * dt;\n" +
                    "   float emitRadius = aParticleEmitRadius.x + aParticleEmitRadius.y * dt;\n" +
                    "   float localTx = uParticleEmitterX - cos(emitRotation) * emitRadius;\n" +
                    "   float localTy = uParticleEmitterY - sin(emitRotation) * emitRadius;\n" +
                    //以中心为锚点缩放
                    "   localTx -= uTextureSize.x / 2.0 * localA + uTextureSize.y / 2.0 * localC;\n" +
                    "   localTy -= uTextureSize.x / 2.0 * localB + uTextureSize.y / 2.0 * localD;\n" +

                    //计算最终矩阵
                    "   float finalA = localA * globalA + localB * globalC;\n" +
                    "   float finalB = localA * globalB + localB * globalD;\n" +
                    "   float finalC = localC * globalA + localD * globalC;\n" +
                    "   float finalD = localC * globalB + localD * globalD;\n" +
                    "   float finalTx = localTx * globalA + localTy * globalC + globalTx;\n" +
                    "   float finalTy = localTx * globalB + localTy * globalD + globalTy;\n" +

                    "   float positionX = finalA * uTextureSize.x * aParticlePosition.x + finalC * uTextureSize.y * aParticlePosition.y + finalTx;\n" +
                    "   float positionY = finalD * uTextureSize.y * aParticlePosition.y + finalB * uTextureSize.x * aParticlePosition.x + finalTy;\n" +
                    "   gl_Position = vec4(positionX / projectionVector.x - 1.0, positionY / projectionVector.y + 1.0, 0.0, 1.0);\n" +

                    //计算颜色变换
                    "   float red = aParticleRed.x + aParticleRed.y * dt;\n" +
                    "   float green = aParticleGreen.x + aParticleGreen.y * dt;\n" +
                    "   float blue = aParticleBlue.x + aParticleBlue.y * dt;\n" +
                    "   float alpha = aParticleAlpha.x + aParticleAlpha.y * dt;\n" +
                    "   vColor = vec4(red, green, blue, alpha) * uGlobalAlpha;\n" +
                    "}";
                let fragmentSrc = "precision lowp float;\n" +
                    "varying vec2 vTextureCoord;\n" +
                    "varying vec4 vColor;\n" +
                    "uniform sampler2D uSampler;\n" +
                    "void main(void) {\n" +
                    "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor;\n" +
                    "   gl_FragColor.rgb *= vColor.a;\n" +
                    "}";
                this.uniforms = { uGlobalMatrix: null, uGlobalAlpha: null };
                let filter = new egret.CustomFilter(vertexSrc, fragmentSrc, this.uniforms);
                this.filters = [filter];
            }
            this.parseConfig(config);
            this.particleClass = RadiusParticle;

        }

        private parseConfig(config: ArrayBuffer): void {
            if (!config || config.byteLength != 179) {
                throw "config error";
            }
            const byteArray = new egret.ByteArray(config);
            const nameLength = byteArray.readUnsignedByte();
            const name = byteArray.readUTFBytes(nameLength);
            if (name != "feather") {
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

            //colors
            this.startRed = getValue(byteArray.readFloat());
            this.startRedVariance = getValue(byteArray.readFloat());
            this.endRed = getValue(byteArray.readFloat());
            this.endRedVariance = getValue(byteArray.readFloat());
            this.startGreen = getValue(byteArray.readFloat());
            this.startGreenVariance = getValue(byteArray.readFloat());
            this.endGreen = getValue(byteArray.readFloat());
            this.endGreenVariance = getValue(byteArray.readFloat());
            this.startBlue = getValue(byteArray.readFloat());
            this.startBlueVariance = getValue(byteArray.readFloat());
            this.endBlue = getValue(byteArray.readFloat());
            this.endBlueVariance = getValue(byteArray.readFloat());
            this.startAlpha = getValue(byteArray.readFloat());
            this.startAlphaVariance = getValue(byteArray.readFloat());
            this.endAlpha = getValue(byteArray.readFloat());
            this.endAlphaVariance = getValue(byteArray.readFloat());

            this.maxRadius = getValue(byteArray.readFloat());
            this.maxRadiusVariance = getValue(byteArray.readFloat());
            this.minRadius = getValue(byteArray.readFloat());
            this.minRadiusVariance = getValue(byteArray.readFloat());

            this.emitRotation = getValue(byteArray.readFloat());
            this.emitRotationVariance = getValue(byteArray.readFloat());
            this.emitRotationDelta = getValue(byteArray.readFloat());
            this.emitRotationDeltaVariance = getValue(byteArray.readFloat());

            const x = byteArray.readFloat();
            const y = byteArray.readFloat();
            const width = byteArray.readFloat();
            const height = byteArray.readFloat();
            if (width != 0 && height != 0) {
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

            this.emissionRate = this.lifespan / this.maxParticles;

            if (this.gpuRender) {
                this.numProperties = 22;
                const vertices = new Float32Array(this.numProperties * this.maxParticles * 4);
                let offset: number;
                for (let i = 0; i < this.maxParticles; i++) {
                    offset = i * this.numProperties * 4;
                    vertices[offset + this.numProperties * 0 + 0] = 0;
                    vertices[offset + this.numProperties * 0 + 1] = 0;
                    vertices[offset + this.numProperties * 0 + 2] = 0;
                    vertices[offset + this.numProperties * 0 + 3] = 0;

                    vertices[offset + this.numProperties * 1 + 0] = 1;
                    vertices[offset + this.numProperties * 1 + 1] = 0;
                    vertices[offset + this.numProperties * 1 + 2] = 1;
                    vertices[offset + this.numProperties * 1 + 3] = 0;

                    vertices[offset + this.numProperties * 2 + 0] = 1;
                    vertices[offset + this.numProperties * 2 + 1] = 1;
                    vertices[offset + this.numProperties * 2 + 2] = 1;
                    vertices[offset + this.numProperties * 2 + 3] = 1;

                    vertices[offset + this.numProperties * 3 + 0] = 0;
                    vertices[offset + this.numProperties * 3 + 1] = 1;
                    vertices[offset + this.numProperties * 3 + 2] = 0;
                    vertices[offset + this.numProperties * 3 + 3] = 1;
                }
                this.vertices = vertices;
                (this.$renderNode as egret.sys.ParticleNode).vertices = vertices;
                (this.$renderNode as egret.sys.ParticleNode).numParticles = this.maxParticles;
                (this.$renderNode as egret.sys.ParticleNode).numProperties = this.numProperties;
                (this.$renderNode as egret.sys.ParticleNode).image = this.texture.$bitmapData;
                (this.$renderNode as egret.sys.ParticleNode).blendMode = this.particleBlendMode;
                this.verticesIndex = 0;
                this.removeIndexs = [];
                this.pasedTime = 0;
            }
        }

        public initParticle(particle: Particle): void {
            const locParticle: RadiusParticle = <RadiusParticle>particle;

            const lifespan: number = RadiusParticleSystem.getValue(this.lifespan, this.lifespanVariance);

            locParticle.currentTime = 0;
            locParticle.totalTime = lifespan > 0 ? lifespan : 0;

            if (lifespan <= 0) {
                return;
            }

            locParticle.x = RadiusParticleSystem.getValue(this.emitterX, this.emitterXVariance);
            locParticle.y = RadiusParticleSystem.getValue(this.emitterY, this.emitterYVariance);

            let startSize: number = RadiusParticleSystem.getValue(this.startSize, this.startSizeVariance);
            if (startSize < 0.1) {
                startSize = 0.1;
            }
            let endSize: number = RadiusParticleSystem.getValue(this.endSize, this.endSizeVariance);
            if (endSize < 0.1) {
                endSize = 0.1;
            }
            const textureWidth = this.texture.textureWidth;
            locParticle.scale = startSize / textureWidth;
            locParticle.scaleDelta = ((endSize - startSize) / lifespan) / textureWidth;

            const startRotation: number = RadiusParticleSystem.getValue(this.startRotation, this.startRotationVariance);
            const endRotation: number = RadiusParticleSystem.getValue(this.endRotation, this.endRotationVariance);
            locParticle.rotation = startRotation;
            locParticle.rotationDelta = (endRotation - startRotation) / lifespan;

            const startRed: number = RadiusParticleSystem.getValue(this.startRed, this.startRedVariance, true);
            const endRed: number = RadiusParticleSystem.getValue(this.endRed, this.endRedVariance, true);
            locParticle.red = startRed;
            locParticle.redDelta = (endRed - startRed) / lifespan;
            const startGreen: number = RadiusParticleSystem.getValue(this.startGreen, this.startGreenVariance, true);
            const endGreen: number = RadiusParticleSystem.getValue(this.endGreen, this.endGreenVariance, true);
            locParticle.green = startGreen;
            locParticle.greenDelta = (endGreen - startGreen) / lifespan;
            const startBlue: number = RadiusParticleSystem.getValue(this.startBlue, this.startBlueVariance, true);
            const endBlue: number = RadiusParticleSystem.getValue(this.endBlue, this.endBlueVariance, true);
            locParticle.blue = startBlue;
            locParticle.blueDelta = (endBlue - startBlue) / lifespan;
            const startAlpha: number = RadiusParticleSystem.getValue(this.startAlpha, this.startAlphaVariance, true);
            const endAlpha: number = RadiusParticleSystem.getValue(this.endAlpha, this.endAlphaVariance, true);
            locParticle.alpha = startAlpha;
            locParticle.alphaDelta = (endAlpha - startAlpha) / lifespan;

            locParticle.blendMode = this.particleBlendMode;

            const startRadius: number = RadiusParticleSystem.getValue(this.maxRadius, this.maxRadiusVariance);
            const endRadius: number = RadiusParticleSystem.getValue(this.minRadius, this.minRadiusVariance);
            locParticle.emitRadius = startRadius;
            locParticle.emitRadiusDelta = (endRadius - startRadius) / lifespan;
            locParticle.emitRotation = RadiusParticleSystem.getValue(this.emitRotation, this.emitRotationVariance);
            locParticle.emitRotationDelta = RadiusParticleSystem.getValue(this.emitRotationDelta, this.emitRotationDeltaVariance);

            if (this.gpuRender) {
                let addIndex;
                if (this.removeIndexs.length) {
                    addIndex = this.removeIndexs.pop();
                }
                else {
                    addIndex = this.verticesIndex;
                    this.verticesIndex++;
                }
                const vertices = this.vertices;
                const startIndex = addIndex * this.numProperties * 4;
                const locParticle = particle as RadiusParticle;
                locParticle.addIndex = addIndex;
                for (let i = 0; i < 4; i++) {
                    vertices[startIndex + i * this.numProperties + 4] = locParticle.scale;
                    vertices[startIndex + i * this.numProperties + 5] = locParticle.scaleDelta;
                    vertices[startIndex + i * this.numProperties + 6] = locParticle.rotation / 180 * Math.PI;
                    vertices[startIndex + i * this.numProperties + 7] = locParticle.rotationDelta / 180 * Math.PI;
                    vertices[startIndex + i * this.numProperties + 8] = locParticle.red;
                    vertices[startIndex + i * this.numProperties + 9] = locParticle.redDelta;
                    vertices[startIndex + i * this.numProperties + 10] = locParticle.green;
                    vertices[startIndex + i * this.numProperties + 11] = locParticle.greenDelta;
                    vertices[startIndex + i * this.numProperties + 12] = locParticle.blue;
                    vertices[startIndex + i * this.numProperties + 13] = locParticle.blueDelta;
                    vertices[startIndex + i * this.numProperties + 14] = locParticle.alpha;
                    vertices[startIndex + i * this.numProperties + 15] = locParticle.alphaDelta;
                    vertices[startIndex + i * this.numProperties + 16] = locParticle.emitRotation;
                    vertices[startIndex + i * this.numProperties + 17] = locParticle.emitRotationDelta;
                    vertices[startIndex + i * this.numProperties + 18] = locParticle.emitRadius;
                    vertices[startIndex + i * this.numProperties + 19] = locParticle.emitRadiusDelta;
                    vertices[startIndex + i * this.numProperties + 20] = this.pasedTime;
                    vertices[startIndex + i * this.numProperties + 21] = locParticle.totalTime;
                }
            }
        }

        private static getValue(base: number, variance: number, clamp: boolean = false): number {
            let result = base + variance * (Math.random() * 2 - 1);
            if (clamp) {
                result = Math.max(0, result);
                result = Math.min(result, 1);
            }
            return result;
        }

        public advanceParticle(particle: Particle, dt: number): void {
            const locParticle = particle as RadiusParticle;
            dt = dt / 1000;

            const restTime: number = locParticle.totalTime - locParticle.currentTime;
            dt = restTime > dt ? dt : restTime;

            locParticle.emitRotation += locParticle.emitRotationDelta * dt * 1000;
            locParticle.emitRadius += locParticle.emitRadiusDelta * dt * 1000;
            locParticle.x = this.emitterX - Math.cos(locParticle.emitRotation) * locParticle.emitRadius;
            locParticle.y = this.emitterY - Math.sin(locParticle.emitRotation) * locParticle.emitRadius;

            locParticle.scale += locParticle.scaleDelta * dt * 1000;
            if (locParticle.scale < 0) {
                locParticle.scale = 0;
            }
            locParticle.rotation += locParticle.rotationDelta * dt * 1000;
            locParticle.alpha += locParticle.alphaDelta * dt * 1000;
        }
    }
}