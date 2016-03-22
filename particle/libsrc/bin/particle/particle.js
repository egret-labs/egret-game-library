//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
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
var particle;
(function (particle) {
    var Particle = (function () {
        function Particle() {
            this.reset();
        }
        var d = __define,c=Particle,p=c.prototype;
        p.reset = function () {
            this.x = 0;
            this.y = 0;
            this.scale = 1;
            this.rotation = 0;
            this.alpha = 1;
            this.currentTime = 0;
            this.totalTime = 1000;
        };
        return Particle;
    }());
    particle.Particle = Particle;
    egret.registerClass(Particle,'particle.Particle');
})(particle || (particle = {}));

//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
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
var particle;
(function (particle_1) {
    var ParticleSystem = (function (_super) {
        __extends(ParticleSystem, _super);
        function ParticleSystem(texture, emissionRate) {
            _super.call(this);
            this._pool = [];
            this.frameTime = 0;
            this.particles = [];
            this._emitterX = 0;
            this._emitterY = 0;
            /**
             * 表示粒子出现总时间，单位毫秒，取值范围(0,Number.MAX_VALUE]，-1表示无限时间
             * @member {number} particle.ParticleSystem#emissionTime
             * @default -1
             */
            this.emissionTime = -1;
            /**
             * 表示粒子系统最大粒子数，超过该数量将不会继续创建粒子，取值范围[1,Number.MAX_VALUE]
             * @member {number} particle.ParticleSystem#maxParticles
             * @default 200
             */
            this.maxParticles = 200;
            /**
             * 当前粒子数
             * @member {number} particle.ParticleSystem#numParticles
             */
            this.numParticles = 0;
            /**
             * 表示粒子类，如果设置创建粒子时将创建该类
             * @member {number} particle.ParticleSystem#particleClass
             */
            this.particleClass = null;
            this.particleMeasureRect = new egret.Rectangle();
            this.transformForMeasure = new egret.Matrix();
            this.transformForRender = new egret.Matrix();
            this.setTransformNodeList = [];
            this.setAlphaNodeList = [];
            this.bitmapNodeList = [];
            this.emissionRate = emissionRate;
            this.texture = texture;
            this.$renderNode = new egret.sys.GroupNode();
        }
        var d = __define,c=ParticleSystem,p=c.prototype;
        p.getParticle = function () {
            var result;
            if (this._pool.length) {
                result = this._pool.pop();
            }
            else if (this.particleClass) {
                result = new this.particleClass();
            }
            else {
                result = new particle_1.Particle();
            }
            return result;
        };
        p.removeParticle = function (particle) {
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
        };
        p.initParticle = function (particle) {
            particle.x = this.emitterX;
            particle.y = this.emitterY;
            particle.currentTime = 0;
            particle.totalTime = 1000;
        };
        /**
         * 更新当前显示对象坐标系下的边框界限
         * @param emitterRect {egret.Rectangle} 相对发射点坐标系下的界限
         */
        p.updateRelativeBounds = function (emitterRect) {
            if (emitterRect) {
                if (this.relativeContentBounds == null) {
                    this.relativeContentBounds = new egret.Rectangle();
                }
                this.relativeContentBounds.copyFrom(emitterRect);
                this.relativeContentBounds.x += this.emitterX;
                this.relativeContentBounds.y += this.emitterY;
            }
            else {
                this.relativeContentBounds = null;
            }
            this.mask = this.relativeContentBounds;
        };
        d(p, "emitterBounds"
            ,function () {
                return this._emitterBounds;
            }
            /**
             * 表示当前粒子系统中发射粒子的渲染边界范围，使用以发射点为基准的坐标系
             * @member {egret.Rectangle} particle.ParticleSystem#emitterBounds
             */
            ,function (rect) {
                this._emitterBounds = rect;
                this.updateRelativeBounds(rect);
            }
        );
        d(p, "emitterX"
            ,function () {
                return this._emitterX;
            }
            /**
             * 表示粒子出现点X坐标，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
             * @member {number} particle.ParticleSystem#emitterX
             * @default 0
             */
            ,function (value) {
                this._emitterX = value;
                this.updateRelativeBounds(this.emitterBounds);
            }
        );
        d(p, "emitterY"
            ,function () {
                return this._emitterY;
            }
            /**
             * 表示粒子出现点Y坐标，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
             * @member {number} particle.ParticleSystem#emitterY
             * @default 0
             */
            ,function (value) {
                this._emitterY = value;
                this.updateRelativeBounds(this.emitterBounds);
            }
        );
        /**
         * 开始创建粒子
         * @param duration {number} 粒子出现总时间
         */
        p.start = function (duration) {
            if (duration === void 0) { duration = -1; }
            if (this.emissionRate != 0) {
                this.emissionTime = duration;
                egret.Ticker.getInstance().register(this.update, this);
            }
        };
        /**
         * 停止创建粒子
         * @param clear {boolean} 是否清除掉现有粒子
         */
        p.stop = function (clear) {
            if (clear === void 0) { clear = false; }
            this.emissionTime = 0;
            if (clear) {
                this.clear();
                egret.Ticker.getInstance().unregister(this.update, this);
            }
        };
        p.update = function (dt) {
            //粒子数很少的时候可能会错过添加粒子的时机
            if (this.emissionTime == -1 || this.emissionTime > 0) {
                this.frameTime += dt;
                while (this.frameTime > 0) {
                    if (this.numParticles < this.maxParticles) {
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
            var particle;
            var particleIndex = 0;
            while (particleIndex < this.numParticles) {
                particle = this.particles[particleIndex];
                if (particle.currentTime < particle.totalTime) {
                    this.advanceParticle(particle, dt);
                    particle.currentTime += dt;
                    particleIndex++;
                }
                else {
                    this.removeParticle(particle);
                }
            }
            this.$invalidateContentBounds();
            if (this.numParticles == 0 && this.emissionTime == 0) {
                egret.Ticker.getInstance().unregister(this.update, this);
                this.dispatchEventWith(egret.Event.COMPLETE);
            }
        };
        p.$measureContentBounds = function (bounds) {
            //如果设置了固定的区域边界则直接使用这个边界，否则进行自动的内容边界测量
            if (this.relativeContentBounds) {
                bounds.copyFrom(this.relativeContentBounds);
                return;
            }
            if (this.numParticles > 0) {
                var texture = this.texture;
                var textureW = Math.round(texture.$getScaleBitmapWidth());
                var textureH = Math.round(texture.$getScaleBitmapHeight());
                var totalRect = egret.Rectangle.create();
                var particle;
                for (var i = 0; i < this.numParticles; i++) {
                    particle = this.particles[i];
                    this.transformForMeasure.identity();
                    this.appendTransform(this.transformForMeasure, particle.x, particle.y, particle.scale, particle.scale, particle.rotation, 0, 0, textureW / 2, textureH / 2);
                    this.particleMeasureRect.setEmpty();
                    this.particleMeasureRect.width = textureW;
                    this.particleMeasureRect.height = textureH;
                    var tmpRegion = egret.sys.Region.create();
                    tmpRegion.updateRegion(this.particleMeasureRect, this.transformForMeasure);
                    if (i == 0) {
                        totalRect.setTo(tmpRegion.minX, tmpRegion.minY, tmpRegion.maxX - tmpRegion.minX, tmpRegion.maxY - tmpRegion.minY);
                    }
                    else {
                        var l = Math.min(totalRect.x, tmpRegion.minX);
                        var t = Math.min(totalRect.y, tmpRegion.minY);
                        var r = Math.max(totalRect.right, tmpRegion.maxX);
                        var b = Math.max(totalRect.bottom, tmpRegion.maxY);
                        totalRect.setTo(l, t, r - l, b - t);
                    }
                    egret.sys.Region.release(tmpRegion);
                }
                //console.log(totalRect.x + "," + totalRect.y + "," + totalRect.width + "," + totalRect.height);
                bounds.setTo(totalRect.x, totalRect.y, totalRect.width, totalRect.height);
                egret.Rectangle.release(totalRect);
            }
        };
        p.setCurrentParticles = function (num) {
            for (var i = this.numParticles; i < num && this.numParticles < this.maxParticles; i++) {
                this.addOneParticle();
            }
        };
        /**
         * 更换粒子纹理
         * @param texture {egret.Texture} 新的纹理
         */
        p.changeTexture = function (texture) {
            if (this.texture != texture) {
                this.texture = texture;
            }
        };
        p.clear = function () {
            while (this.particles.length) {
                this.removeParticle(this.particles[0]);
            }
            this.numParticles = 0;
        };
        p.addOneParticle = function () {
            //todo 这里可能需要返回成功与否
            var particle = this.getParticle();
            this.initParticle(particle);
            if (particle.totalTime > 0) {
                this.particles.push(particle);
                this.numParticles++;
            }
        };
        p.advanceParticle = function (particle, dt) {
            particle.y -= dt / 6;
        };
        p.$render = function () {
            if (this.numParticles > 0) {
                //todo 考虑不同粒子使用不同的texture，或者使用egret.SpriteSheet
                var texture = this.texture;
                var textureW = Math.round(texture.$getScaleBitmapWidth());
                var textureH = Math.round(texture.$getScaleBitmapHeight());
                var offsetX = texture._offsetX;
                var offsetY = texture._offsetY;
                var bitmapX = texture._bitmapX;
                var bitmapY = texture._bitmapY;
                var bitmapWidth = texture._bitmapWidth;
                var bitmapHeight = texture._bitmapHeight;
                var particle;
                for (var i = 0; i < this.numParticles; i++) {
                    particle = this.particles[i];
                    this.transformForRender.identity();
                    this.transformForRender.copyFrom(this.$renderNode.renderMatrix);
                    this.appendTransform(this.transformForRender, particle.x, particle.y, particle.scale, particle.scale, particle.rotation, 0, 0, textureW / 2, textureH / 2);
                    var setTransformNode;
                    var setAlphaNode;
                    var bitmapNode;
                    if (!this.setTransformNodeList[i]) {
                        this.setTransformNodeList[i] = new egret.sys.SetTransformNode();
                        this.setAlphaNodeList[i] = new egret.sys.SetAlphaNode();
                        this.bitmapNodeList[i] = new egret.sys.BitmapNode();
                        this.$renderNode.addNode(this.setTransformNodeList[i]);
                        this.$renderNode.addNode(this.setAlphaNodeList[i]);
                        this.$renderNode.addNode(this.bitmapNodeList[i]);
                    }
                    setTransformNode = this.setTransformNodeList[i];
                    setAlphaNode = this.setAlphaNodeList[i];
                    bitmapNode = this.bitmapNodeList[i];
                    setTransformNode.setTransform(this.transformForRender.a, this.transformForRender.b, this.transformForRender.c, this.transformForRender.d, this.transformForRender.tx, this.transformForRender.ty);
                    setAlphaNode.setAlpha(particle.alpha);
                    bitmapNode.image = texture._bitmapData;
                    bitmapNode.drawImage(bitmapX, bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureW, textureH);
                }
            }
        };
        p.appendTransform = function (matrix, x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
            if (rotation % 360) {
                var r = rotation; // * Matrix.DEG_TO_RAD;
                var cos = egret.NumberUtils.cos(r);
                var sin = egret.NumberUtils.sin(r);
            }
            else {
                cos = 1;
                sin = 0;
            }
            if (skewX || skewY) {
                // TODO: can this be combined into a single append?
                //                skewX *= Matrix.DEG_TO_RAD;
                //                skewY *= Matrix.DEG_TO_RAD;
                matrix.append(egret.NumberUtils.cos(skewY), egret.NumberUtils.sin(skewY), -egret.NumberUtils.sin(skewX), egret.NumberUtils.cos(skewX), x, y);
                matrix.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0);
            }
            else {
                matrix.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
            }
            if (regX || regY) {
                // prepend the registration offset:
                matrix.tx -= regX * matrix.a + regY * matrix.c;
                matrix.ty -= regX * matrix.b + regY * matrix.d;
            }
            return matrix;
        };
        return ParticleSystem;
    }(egret.DisplayObject));
    particle_1.ParticleSystem = ParticleSystem;
    egret.registerClass(ParticleSystem,'particle.ParticleSystem');
})(particle || (particle = {}));

//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
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
var particle;
(function (particle) {
    var GravityParticle = (function (_super) {
        __extends(GravityParticle, _super);
        function GravityParticle() {
            _super.apply(this, arguments);
        }
        var d = __define,c=GravityParticle,p=c.prototype;
        p.reset = function () {
            _super.prototype.reset.call(this);
            this.startX = 0;
            this.startY = 0;
            this.velocityX = 0;
            this.velocityY = 0;
            this.radialAcceleration = 0;
            this.tangentialAcceleration = 0;
            this.rotationDelta = 0;
            this.scaleDelta = 0;
        };
        return GravityParticle;
    }(particle.Particle));
    particle.GravityParticle = GravityParticle;
    egret.registerClass(GravityParticle,'particle.GravityParticle');
})(particle || (particle = {}));

//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
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
var particle;
(function (particle_1) {
    var GravityParticleSystem = (function (_super) {
        __extends(GravityParticleSystem, _super);
        function GravityParticleSystem(texture, config) {
            _super.call(this, texture, 200);
            this.parseConfig(config);
            this.emissionRate = this.lifespan / this.maxParticles;
            this.particleClass = particle_1.GravityParticle;
        }
        var d = __define,c=GravityParticleSystem,p=c.prototype;
        p.parseConfig = function (config) {
            this.emitterX = getValue(config.emitter.x);
            this.emitterY = getValue(config.emitter.y);
            this.emitterXVariance = getValue(config.emitterVariance.x);
            this.emitterYVariance = getValue(config.emitterVariance.y);
            this.gravityX = getValue(config.gravity.x);
            this.gravityY = getValue(config.gravity.y);
            if (config.useEmitterRect == true) {
                var bounds = new egret.Rectangle();
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
            function getValue(value) {
                if (typeof value == "undefined") {
                    return 0;
                }
                return value;
            }
        };
        p.initParticle = function (particle) {
            var locParticle = particle;
            var lifespan = GravityParticleSystem.getValue(this.lifespan, this.lifespanVariance);
            locParticle.currentTime = 0;
            locParticle.totalTime = lifespan > 0 ? lifespan : 0;
            if (lifespan <= 0) {
                return;
            }
            locParticle.x = GravityParticleSystem.getValue(this.emitterX, this.emitterXVariance);
            locParticle.y = GravityParticleSystem.getValue(this.emitterY, this.emitterYVariance);
            locParticle.startX = this.emitterX;
            locParticle.startY = this.emitterY;
            var angle = GravityParticleSystem.getValue(this.emitAngle, this.emitAngleVariance);
            var speed = GravityParticleSystem.getValue(this.speed, this.speedVariance);
            locParticle.velocityX = speed * egret.NumberUtils.cos(angle);
            locParticle.velocityY = speed * egret.NumberUtils.sin(angle);
            locParticle.radialAcceleration = GravityParticleSystem.getValue(this.radialAcceleration, this.radialAccelerationVariance);
            locParticle.tangentialAcceleration = GravityParticleSystem.getValue(this.tangentialAcceleration, this.tangentialAccelerationVariance);
            var startSize = GravityParticleSystem.getValue(this.startSize, this.startSizeVariance);
            if (startSize < 0.1) {
                startSize = 0.1;
            }
            var endSize = GravityParticleSystem.getValue(this.endSize, this.endSizeVariance);
            if (endSize < 0.1) {
                endSize = 0.1;
            }
            var textureWidth = this.texture.textureWidth;
            locParticle.scale = startSize / textureWidth;
            locParticle.scaleDelta = ((endSize - startSize) / lifespan) / textureWidth;
            var startRotation = GravityParticleSystem.getValue(this.startRotation, this.startRotationVariance);
            var endRotation = GravityParticleSystem.getValue(this.endRotation, this.endRotationVariance);
            locParticle.rotation = startRotation;
            locParticle.rotationDelta = (endRotation - startRotation) / lifespan;
            var startAlpha = GravityParticleSystem.getValue(this.startAlpha, this.startAlphaVariance);
            var endAlpha = GravityParticleSystem.getValue(this.endAlpha, this.endAlphaVariance);
            locParticle.alpha = startAlpha;
            locParticle.alphaDelta = (endAlpha - startAlpha) / lifespan;
        };
        GravityParticleSystem.getValue = function (base, variance) {
            return base + variance * (Math.random() * 2 - 1);
        };
        p.advanceParticle = function (particle, dt) {
            var locParticle = particle;
            dt = dt / 1000;
            var restTime = locParticle.totalTime - locParticle.currentTime;
            dt = restTime > dt ? dt : restTime;
            locParticle.currentTime += dt;
            var distanceX = locParticle.x - locParticle.startX;
            var distanceY = locParticle.y - locParticle.startY;
            var distanceScalar = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            if (distanceScalar < 0.01) {
                distanceScalar = 0.01;
            }
            var radialX = distanceX / distanceScalar;
            var radialY = distanceY / distanceScalar;
            var tangentialX = radialX;
            var tangentialY = radialY;
            radialX *= locParticle.radialAcceleration;
            radialY *= locParticle.radialAcceleration;
            var temp = tangentialX;
            tangentialX = -tangentialY * locParticle.tangentialAcceleration;
            tangentialY = temp * locParticle.tangentialAcceleration;
            locParticle.velocityX += dt * (this.gravityX + radialX + tangentialX);
            locParticle.velocityY += dt * (this.gravityY + radialY + tangentialY);
            locParticle.x += locParticle.velocityX * dt;
            locParticle.y += locParticle.velocityY * dt;
            locParticle.scale += locParticle.scaleDelta * dt * 1000;
            locParticle.rotation += locParticle.rotationDelta * dt * 1000;
            locParticle.alpha += locParticle.alphaDelta * dt * 1000;
        };
        //增加设置重力系统参数的方法，方便动态改变参数
        p.setEmitterXVariance = function (emitterXVariance) {
            this.emitterXVariance = emitterXVariance;
        };
        p.setEmitterYVariance = function (emitterYVariance) {
            this.emitterYVariance = emitterYVariance;
        };
        p.setLifespan = function (lifespan) {
            this.lifespan = lifespan;
        };
        p.setLifespanVariance = function (lifespanVariance) {
            this.lifespanVariance = lifespanVariance;
        };
        p.setStartSize = function (startSize) {
            this.startSize = startSize;
        };
        p.setStartSizeVariance = function (startSizeVariance) {
            this.startSizeVariance = startSizeVariance;
        };
        p.setEndSize = function (endSize) {
            this.endSize = endSize;
        };
        p.setEndSizeVariance = function (endSizeVariance) {
            this.endSizeVariance = endSizeVariance;
        };
        p.setEmitAngle = function (emitAngle) {
            this.emitAngle = emitAngle;
        };
        p.setEmitAngleVariance = function (emitAngleVariance) {
            this.emitAngleVariance = emitAngleVariance;
        };
        p.setStartRotation = function (startRotation) {
            this.startRotation = startRotation;
        };
        p.setStartRotationVariance = function (startRotationVariance) {
            this.startRotationVariance = startRotationVariance;
        };
        p.setEndRotation = function (endRotation) {
            this.endRotation = endRotation;
        };
        p.setEndRotationVariance = function (endRotationVariance) {
            this.endRotationVariance = endRotationVariance;
        };
        p.setSpeed = function (speed) {
            this.speed = speed;
        };
        p.setSpeedVariance = function (speedVariance) {
            this.speedVariance = speedVariance;
        };
        p.setGravityX = function (gravityX) {
            this.gravityX = gravityX;
        };
        p.setGravityY = function (gravityY) {
            this.gravityY = gravityY;
        };
        p.setRadialAcceleration = function (radialAcceleration) {
            this.radialAcceleration = radialAcceleration;
        };
        p.setRadialAccelerationVariance = function (radialAccelerationVariance) {
            this.radialAccelerationVariance = radialAccelerationVariance;
        };
        p.setTangentialAcceleration = function (tangentialAcceleration) {
            this.tangentialAcceleration = tangentialAcceleration;
        };
        p.setTangentialAccelerationVariance = function (tangentialAccelerationVariance) {
            this.tangentialAccelerationVariance = tangentialAccelerationVariance;
        };
        p.setStartAlpha = function (startAlpha) {
            this.startAlpha = startAlpha;
        };
        p.setStartAlphaVariance = function (startAlphaVariance) {
            this.startAlphaVariance = startAlphaVariance;
        };
        p.setEndAlpha = function (endAlpha) {
            this.endAlpha = endAlpha;
        };
        p.setEndAlphaVariance = function (endAlphaVariance) {
            this.endAlphaVariance = endAlphaVariance;
        };
        return GravityParticleSystem;
    }(particle_1.ParticleSystem));
    particle_1.GravityParticleSystem = GravityParticleSystem;
    egret.registerClass(GravityParticleSystem,'particle.GravityParticleSystem');
})(particle || (particle = {}));

