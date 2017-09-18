var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var particle;
(function (particle) {
    var ParticleSystem = (function (_super) {
        __extends(ParticleSystem, _super);
        function ParticleSystem(texture, emissionRate) {
            var _this = _super.call(this) || this;
            /**
             * @private
             */
            _this._emitterX = 0;
            _this._emitterY = 0;
            /**
             * 表示粒子出现总时间，单位毫秒，取值范围(0,Number.MAX_VALUE]，-1表示无限时间
             * @member {number} particle.ParticleSystem#emissionTime
             * @default -1
             */
            _this.emissionTime = -1;
            /**
             * 表示粒子系统最大粒子数，超过该数量将不会继续创建粒子，取值范围[1,Number.MAX_VALUE]
             * @member {number} particle.ParticleSystem#maxParticles
             * @default 200
             */
            _this.maxParticles = 200;
            /**
             * 表示粒子类，如果设置创建粒子时将创建该类
             * @member {number} particle.ParticleSystem#particleClass
             */
            _this.particleClass = null;
            _this.$particleConfig = null;
            _this.initConfig(emissionRate, 0, 0);
            _this.changeTexture(texture);
            return _this;
        }
        ParticleSystem.prototype.initConfig = function (emissionRate, emitterX, emitterY) {
            this.$particleConfig = [
                emissionRate,
                emitterX,
                emitterY,
                0,
                200 //maxParticles
            ];
            this.emissionRate = emissionRate;
            this._emitterX = emitterX;
            this._emitterY = emitterY;
        };
        ParticleSystem.prototype.createWebAssemblyNode = function () {
            this.$waNode = new egret.WebAssemblyNode(10 /* PARTICLE_SYSTEM */);
        };
        /**
         * 开始创建粒子
         * @param duration {number} 粒子出现总时间
         */
        ParticleSystem.prototype.start = function (duration) {
            if (duration === void 0) { duration = -1; }
            if (this.emissionRate != 0) {
                this.emissionTime = duration;
            }
            //
            this.$particleConfig[3] = duration;
            this.$waNode.setCustomData(this.$particleConfig);
        };
        ParticleSystem.prototype.stop = function (clear) {
            if (clear === void 0) { clear = false; }
            this.$waNode.setStopToParticle(clear);
        };
        ParticleSystem.prototype.setCurrentParticles = function (num) {
            if (num >= this.maxParticles) {
                return;
            }
        };
        ParticleSystem.prototype.onPropertyChanges = function () {
            this.$waNode.setCustomData(this.$particleConfig);
        };
        Object.defineProperty(ParticleSystem.prototype, "emitterX", {
            get: function () {
                return this._emitterX;
            },
            /**
             * 表示粒子出现点X坐标，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
             * @member {number} particle.ParticleSystem#emitterX
             * @default 0
             */
            set: function (value) {
                this._emitterX = value;
                this.updateRelativeBounds(this.emitterBounds);
                this.onPropertyChanges();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParticleSystem.prototype, "emitterY", {
            get: function () {
                return this._emitterY;
            },
            /**
             * 表示粒子出现点Y坐标，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
             * @member {number} particle.ParticleSystem#emitterY
             * @default 0
             */
            set: function (value) {
                this._emitterY = value;
                this.updateRelativeBounds(this.emitterBounds);
                this.onPropertyChanges();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 更新当前显示对象坐标系下的边框界限
         * @param emitterRect {egret.Rectangle} 相对发射点坐标系下的界限
         */
        ParticleSystem.prototype.updateRelativeBounds = function (emitterRect) {
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
        };
        Object.defineProperty(ParticleSystem.prototype, "emitterBounds", {
            get: function () {
                return this._emitterBounds;
            },
            /**
             * 表示当前粒子系统中发射粒子的渲染边界范围，使用以发射点为基准的坐标系
             * @member {egret.Rectangle} particle.ParticleSystem#emitterBounds
             */
            set: function (rect) {
                this._emitterBounds = rect;
                this.updateRelativeBounds(rect);
                this.onPropertyChanges();
            },
            enumerable: true,
            configurable: true
        });
        ParticleSystem.prototype.changeTexture = function (texture) {
            if (this.texture != texture) {
                this.texture = texture;
                this.$waNode.setBitmapDataToParticle(texture);
            }
        };
        return ParticleSystem;
    }(egret.DisplayObject));
    particle.ParticleSystem = ParticleSystem;
    __reflect(ParticleSystem.prototype, "particle.ParticleSystem");
})(particle || (particle = {}));
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
var particle;
(function (particle) {
    var GravityParticleSystem = (function (_super) {
        __extends(GravityParticleSystem, _super);
        function GravityParticleSystem(texture, config) {
            var _this = _super.call(this, texture, 200) || this;
            /**
             * 表示粒子使用的混合模式
             * @member {number} particle.GravityParticleSystem#blendMode
             */
            _this.particleBlendMode = 0;
            /**
             * 是否完成解析json数据
             */
            _this.$init = false;
            _this.$parseConfig(config);
            _this.emissionRate = _this.lifespan / _this.maxParticles;
            _this.$init = true;
            return _this;
        }
        GravityParticleSystem.prototype.start = function (duration) {
            if (duration === void 0) { duration = -1; }
            if (this.emissionRate != 0) {
                this.emissionTime = duration;
            }
            this.$particleConfig[2] = duration;
            var configArray = [];
            var i = 0;
            for (var key in this.$particleConfig) {
                configArray.push(i++);
                configArray.push(this.$particleConfig[key]);
            }
            this.$waNode.setCustomData(configArray);
        };
        GravityParticleSystem.prototype.setCurrentParticles = function (num) {
            if (num > this.maxParticles) {
                return;
            }
            var configArray = [];
            configArray.push(35 /* currentParticles */);
            configArray.push(num);
            this.$waNode.setCustomData(configArray);
        };
        GravityParticleSystem.prototype.onPropertyChanges = function () {
            if (this.$init == false) {
                return;
            }
            var configArray = [];
            configArray.push(0 /* emitterX */);
            this.$particleConfig[0 /* emitterX */] = this._emitterX;
            configArray.push(this._emitterX);
            configArray.push(1 /* emitterY */);
            this.$particleConfig[1 /* emitterY */] = this._emitterY;
            configArray.push(this._emitterY);
            if (this.relativeContentBounds) {
                configArray.push(31 /* emitterBoundsX */);
                this.$particleConfig[31 /* emitterBoundsX */] = this.relativeContentBounds.x;
                configArray.push(this.relativeContentBounds.x);
                configArray.push(32 /* emitterBoundsY */);
                this.$particleConfig[32 /* emitterBoundsY */] = this.relativeContentBounds.y;
                configArray.push(this.relativeContentBounds.y);
                configArray.push(33 /* emitterBoundsWidth */);
                this.$particleConfig[33 /* emitterBoundsWidth */] = this.relativeContentBounds.width;
                configArray.push(this.relativeContentBounds.width);
                configArray.push(34 /* emitterBoundsHeight */);
                this.$particleConfig[34 /* emitterBoundsHeight */] = this.relativeContentBounds.height;
                configArray.push(this.relativeContentBounds.height);
            }
            this.$waNode.setCustomData(configArray);
        };
        GravityParticleSystem.prototype.$parseConfig = function (config) {
            this._emitterX = getValue(config.emitter.x);
            this._emitterY = getValue(config.emitter.y);
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
            if (config.blendMode) {
                this.particleBlendMode = config.blendMode;
            }
            function getValue(value) {
                if (typeof value == "undefined") {
                    return 0;
                }
                return value;
            }
            this.$particleConfig = {
                0: this.emitterX,
                1: this.emitterY,
                2: -1,
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
                31: config.useEmitterRect ? this.relativeContentBounds.x : 0,
                32: config.useEmitterRect ? this.relativeContentBounds.y : 0,
                33: config.useEmitterRect ? this.relativeContentBounds.width : 0,
                34: config.useEmitterRect ? this.relativeContentBounds.height : 0,
                35: 0
            };
        };
        return GravityParticleSystem;
    }(particle.ParticleSystem));
    particle.GravityParticleSystem = GravityParticleSystem;
    __reflect(GravityParticleSystem.prototype, "particle.GravityParticleSystem");
})(particle || (particle = {}));
