var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
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
    var Particle = (function (_super) {
        __extends(Particle, _super);
        function Particle() {
            var _this = _super.call(this) || this;
            _this.matrix = new egret.Matrix();
            _this.reset();
            return _this;
        }
        Particle.prototype.reset = function () {
            this.x = 0;
            this.y = 0;
            this.scale = 1;
            this.rotation = 0;
            this.alpha = 1;
            this.currentTime = 0;
            this.totalTime = 1000;
        };
        Particle.prototype.$getMatrix = function (regX, regY) {
            var matrix = this.matrix;
            matrix.identity();
            if (this.rotation % 360) {
                var r = this.rotation;
                var cos = egret.NumberUtils.cos(r);
                var sin = egret.NumberUtils.sin(r);
            }
            else {
                cos = 1;
                sin = 0;
            }
            matrix.a = cos * this.scale;
            matrix.b = sin * this.scale;
            matrix.c = -sin * this.scale;
            matrix.d = cos * this.scale;
            matrix.tx = this.x;
            matrix.ty = this.y;
            if (regX || regY) {
                matrix.tx -= regX * matrix.a + regY * matrix.c;
                matrix.ty -= regX * matrix.b + regY * matrix.d;
            }
            return matrix;
        };
        return Particle;
    }(egret.HashObject));
    particle.Particle = Particle;
    __reflect(Particle.prototype, "particle.Particle");
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
(function (particle_1) {
    var ParticleSystem = (function (_super) {
        __extends(ParticleSystem, _super);
        function ParticleSystem(texture, emissionRate) {
            var _this = _super.call(this) || this;
            _this._pool = [];
            _this.frameTime = 0;
            _this.particles = {};
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
             * 当前粒子数
             * @member {number} particle.ParticleSystem#numParticles
             */
            _this.numParticles = 0;
            /**
             * 表示粒子类，如果设置创建粒子时将创建该类
             * @member {number} particle.ParticleSystem#particleClass
             */
            _this.particleClass = null;
            _this.$particleConfig = null;
            _this.gpuRender = egret.Capabilities.renderMode == "webgl";
            _this.particleMeasureRect = new egret.Rectangle();
            _this.transformForMeasure = new egret.Matrix();
            _this.bitmapNodeList = [];
            if (egret.nativeRender) {
                _this.initConfig(emissionRate, 0, 0);
                _this.changeTexture(texture);
            }
            else {
                _this.emissionRate = emissionRate;
                _this.texture = texture;
                _this.$renderNode = new egret.sys.GroupNode();
                //不清除绘制数据
                _this.$renderNode.cleanBeforeRender = function () { };
            }
            return _this;
        }
        ParticleSystem.prototype.createNativeDisplayObject = function () {
            this.$nativeDisplayObject = new egret_native.NativeDisplayObject(10 /* PARTICLE_SYSTEM */);
        };
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
        ParticleSystem.prototype.getParticle = function () {
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
        ParticleSystem.prototype.removeParticle = function (particle) {
            var has = this.particles[particle.hashCode];
            if (has) {
                particle.reset();
                delete this.particles[particle.hashCode];
                this._pool.push(particle);
                this.numParticles--;
                if (this.gpuRender) {
                    this.removeIndexs.push(particle.addIndex);
                }
                else {
                    if (this.bitmapNodeList.length > this.numParticles) {
                        this.bitmapNodeList.length = this.numParticles;
                        this.$renderNode.drawData.length = this.numParticles;
                    }
                }
            }
        };
        ParticleSystem.prototype.initParticle = function (particle) {
            particle.x = this.emitterX;
            particle.y = this.emitterY;
            particle.currentTime = 0;
            particle.totalTime = 1000;
        };
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
            this.mask = this.relativeContentBounds;
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
                if (egret.nativeRender) {
                    this.onPropertyChanges();
                }
            },
            enumerable: true,
            configurable: true
        });
        ParticleSystem.prototype.onPropertyChanges = function () {
            this.$nativeDisplayObject.setCustomData(this.$particleConfig);
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
                if (this.gpuRender) {
                    this.uniforms.uParticleEmitterX = value;
                }
                if (egret.nativeRender) {
                    this.onPropertyChanges();
                }
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
                if (this.gpuRender) {
                    this.uniforms.uParticleEmitterY = value;
                }
                if (egret.nativeRender) {
                    this.onPropertyChanges();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 开始创建粒子
         * @param duration {number} 粒子出现总时间
         */
        ParticleSystem.prototype.start = function (duration) {
            if (duration === void 0) { duration = -1; }
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
        };
        /**
         * 停止创建粒子
         * @param clear {boolean} 是否清除掉现有粒子
         */
        ParticleSystem.prototype.stop = function (clear) {
            if (clear === void 0) { clear = false; }
            if (egret.nativeRender) {
                this.$nativeDisplayObject.setStopToParticle(clear);
                return;
            }
            this.emissionTime = 0;
            if (clear) {
                this.clear();
                egret.stopTick(this.update, this);
            }
        };
        ParticleSystem.prototype.update = function (timeStamp) {
            var dt = timeStamp - this.timeStamp;
            this.timeStamp = timeStamp;
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
            for (var key in this.particles) {
                particle = this.particles[key];
                if (particle.currentTime < particle.totalTime) {
                    if (!this.gpuRender) {
                        this.advanceParticle(particle, dt);
                    }
                    particle.currentTime += dt;
                }
                else {
                    this.removeParticle(particle);
                }
            }
            if (this.gpuRender) {
                this.pasedTime += dt;
                this.uniforms.uParticlePasedTime = this.pasedTime;
            }
            this.$renderDirty = true;
            if (this.numParticles == 0 && this.emissionTime == 0) {
                egret.stopTick(this.update, this);
                this.dispatchEventWith(egret.Event.COMPLETE);
            }
            return false;
        };
        ParticleSystem.prototype.$measureContentBounds = function (bounds) {
            //如果设置了固定的区域边界则直接使用这个边界，否则进行自动的内容边界测量
            if (this.relativeContentBounds) {
                bounds.copyFrom(this.relativeContentBounds);
                return;
            }
            if (this.gpuRender) {
                bounds.setTo(0, 0, 100, 100);
                return;
            }
            var totalRect = egret.Rectangle.create();
            if (this.numParticles > 0) {
                var texture = this.texture;
                var textureW = Math.round(texture.$getScaleBitmapWidth());
                var textureH = Math.round(texture.$getScaleBitmapHeight());
                var particle_2;
                var first = true;
                for (var key in this.particles) {
                    particle_2 = this.particles[key];
                    this.transformForMeasure.identity();
                    this.appendTransform(this.transformForMeasure, particle_2.x, particle_2.y, particle_2.scale, particle_2.scale, particle_2.rotation, 0, 0, textureW / 2, textureH / 2);
                    this.particleMeasureRect.setEmpty();
                    this.particleMeasureRect.width = textureW;
                    this.particleMeasureRect.height = textureH;
                    var tmpRegion = Region.create();
                    tmpRegion.updateRegion(this.particleMeasureRect, this.transformForMeasure);
                    if (first) {
                        first = false;
                        totalRect.setTo(tmpRegion.minX, tmpRegion.minY, tmpRegion.maxX - tmpRegion.minX, tmpRegion.maxY - tmpRegion.minY);
                    }
                    else {
                        var l = Math.min(totalRect.x, tmpRegion.minX);
                        var t = Math.min(totalRect.y, tmpRegion.minY);
                        var r = Math.max(totalRect.right, tmpRegion.maxX);
                        var b = Math.max(totalRect.bottom, tmpRegion.maxY);
                        totalRect.setTo(l, t, r - l, b - t);
                    }
                    Region.release(tmpRegion);
                }
                //console.log(totalRect.x + "," + totalRect.y + "," + totalRect.width + "," + totalRect.height);
                this.lastRect = totalRect;
                bounds.setTo(totalRect.x, totalRect.y, totalRect.width, totalRect.height);
                egret.Rectangle.release(totalRect);
            }
            else {
                if (this.lastRect) {
                    totalRect = this.lastRect;
                    bounds.setTo(totalRect.x, totalRect.y, totalRect.width, totalRect.height);
                    egret.Rectangle.release(totalRect);
                    this.lastRect = null;
                }
            }
        };
        /**
         * 更换粒子纹理
         * @param texture {egret.Texture} 新的纹理
         */
        ParticleSystem.prototype.changeTexture = function (texture) {
            if (this.texture != texture) {
                this.texture = texture;
                if (egret.nativeRender) {
                    this.$nativeDisplayObject.setBitmapDataToParticle(texture);
                }
                else {
                    if (this.gpuRender) {
                        this.$renderNode.image = texture.$bitmapData;
                    }
                    else {
                        //todo 这里可以优化
                        this.bitmapNodeList.length = 0;
                        this.$renderNode.drawData.length = 0;
                    }
                }
            }
        };
        ParticleSystem.prototype.clear = function () {
            for (var key in this.particles) {
                this.removeParticle(this.particles[key]);
            }
            this.numParticles = 0;
            if (this.gpuRender) {
                this.$renderNode.drawData.length = 0;
                this.bitmapNodeList.length = 0;
            }
            this.$renderDirty = true;
        };
        ParticleSystem.prototype.addOneParticle = function () {
            //todo 这里可能需要返回成功与否
            var particle = this.getParticle();
            this.initParticle(particle);
            if (particle.totalTime > 0) {
                this.particles[particle.hashCode] = particle;
                this.numParticles++;
            }
        };
        ParticleSystem.prototype.advanceParticle = function (particle, dt) {
            particle.y -= dt / 6;
        };
        ParticleSystem.prototype.$updateRenderNode = function () {
            if (egret.nativeRender || this.gpuRender) {
                return;
            }
            if (this.numParticles > 0) {
                //todo 考虑不同粒子使用不同的texture，或者使用egret.SpriteSheet
                var texture = this.texture;
                var textureW = Math.round(texture.$getScaleBitmapWidth());
                var textureH = Math.round(texture.$getScaleBitmapHeight());
                var offsetX = texture.$offsetX;
                var offsetY = texture.$offsetY;
                var bitmapX = texture.$bitmapX;
                var bitmapY = texture.$bitmapY;
                var bitmapWidth = texture.$bitmapWidth;
                var bitmapHeight = texture.$bitmapHeight;
                var particle_3;
                var i = 0;
                for (var key in this.particles) {
                    particle_3 = this.particles[key];
                    var bitmapNode = void 0;
                    if (!this.bitmapNodeList[i]) {
                        bitmapNode = new egret.sys.BitmapNode();
                        this.bitmapNodeList[i] = bitmapNode;
                        this.$renderNode.addNode(this.bitmapNodeList[i]);
                        bitmapNode.image = texture.$bitmapData;
                        bitmapNode.imageWidth = texture.$sourceWidth;
                        bitmapNode.imageHeight = texture.$sourceHeight;
                        bitmapNode.drawImage(bitmapX, bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureW, textureH);
                    }
                    bitmapNode = this.bitmapNodeList[i];
                    bitmapNode.matrix = particle_3.$getMatrix(textureW / 2, textureH / 2);
                    bitmapNode.alpha = particle_3.alpha;
                    i++;
                }
            }
        };
        ParticleSystem.prototype.appendTransform = function (matrix, x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
            var cos;
            var sin;
            if (rotation % 360) {
                var r = rotation; // * Matrix.DEG_TO_RAD;
                cos = egret.NumberUtils.cos(r);
                sin = egret.NumberUtils.sin(r);
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
    __reflect(ParticleSystem.prototype, "particle.ParticleSystem");
})(particle || (particle = {}));
var regionPool = [];
/**
 * @private
 */
var Region = (function () {
    function Region() {
        /**
         * @private
         */
        this.minX = 0;
        /**
         * @private
         */
        this.minY = 0;
        /**
         * @private
         */
        this.maxX = 0;
        /**
         * @private
         */
        this.maxY = 0;
        /**
         * @private
         */
        this.width = 0;
        /**
         * @private
         */
        this.height = 0;
        /**
         * @private
         */
        this.area = 0;
    }
    /**
     * @private
     * 释放一个Region实例到对象池
     */
    Region.release = function (region) {
        regionPool.push(region);
    };
    /**
     * @private
     * 从对象池中取出或创建一个新的Region对象。
     * 建议对于一次性使用的对象，均使用此方法创建，而不是直接new一个。
     * 使用完后调用对应的release()静态方法回收对象，能有效减少对象创建数量造成的性能开销。
     */
    Region.create = function () {
        var region = regionPool.pop();
        if (!region) {
            region = new Region();
        }
        return region;
    };
    /**
     * @private
     */
    Region.prototype.setEmpty = function () {
        this.minX = 0;
        this.minY = 0;
        this.maxX = 0;
        this.maxY = 0;
        this.width = 0;
        this.height = 0;
        this.area = 0;
    };
    /**
     * @private
     */
    Region.prototype.updateRegion = function (bounds, matrix) {
        if (bounds.width == 0 || bounds.height == 0) {
            //todo 理论上应该是空
            this.setEmpty();
            return;
        }
        var m = matrix;
        var a = m.a;
        var b = m.b;
        var c = m.c;
        var d = m.d;
        var tx = m.tx;
        var ty = m.ty;
        var x = bounds.x;
        var y = bounds.y;
        var xMax = x + bounds.width;
        var yMax = y + bounds.height;
        var minX, minY, maxX, maxY;
        //优化，通常情况下不缩放旋转的对象占多数，直接加上偏移量即可。
        if (a == 1.0 && b == 0.0 && c == 0.0 && d == 1.0) {
            minX = x + tx - 1;
            minY = y + ty - 1;
            maxX = xMax + tx + 1;
            maxY = yMax + ty + 1;
        }
        else {
            var x0 = a * x + c * y + tx;
            var y0 = b * x + d * y + ty;
            var x1 = a * xMax + c * y + tx;
            var y1 = b * xMax + d * y + ty;
            var x2 = a * xMax + c * yMax + tx;
            var y2 = b * xMax + d * yMax + ty;
            var x3 = a * x + c * yMax + tx;
            var y3 = b * x + d * yMax + ty;
            var tmp = 0;
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
    };
    return Region;
}());
__reflect(Region.prototype, "Region");
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
    var GravityParticle = (function (_super) {
        __extends(GravityParticle, _super);
        function GravityParticle() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GravityParticle.prototype.reset = function () {
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
    __reflect(GravityParticle.prototype, "particle.GravityParticle");
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
(function (particle_4) {
    var GravityParticleSystem = (function (_super) {
        __extends(GravityParticleSystem, _super);
        function GravityParticleSystem(texture, config) {
            var _this = _super.call(this, texture, 200) || this;
            /**
             * 是否完成解析json数据
             */
            _this.$init = false;
            _this.gpuRender = false;
            _this.parseConfig(config);
            _this.emissionRate = _this.lifespan / _this.maxParticles;
            _this.particleClass = particle_4.GravityParticle;
            _this.$init = true;
            return _this;
        }
        GravityParticleSystem.prototype.start = function (duration) {
            if (duration === void 0) { duration = -1; }
            if (egret.nativeRender) {
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
                this.$nativeDisplayObject.setCustomData(configArray);
            }
            else {
                _super.prototype.start.call(this, duration);
            }
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
            this.$nativeDisplayObject.setCustomData(configArray);
        };
        GravityParticleSystem.prototype.parseConfig = function (config) {
            if (!config || config.byteLength != 139) {
                throw "config error";
            }
            var byteArray = new egret.ByteArray(config);
            var nameLength = byteArray.readUnsignedByte();
            var name = byteArray.readUTFBytes(nameLength);
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
            var x = byteArray.readFloat();
            var y = byteArray.readFloat();
            var width = byteArray.readFloat();
            var height = byteArray.readFloat();
            var useEmitterRect = width != 0 && height != 0;
            if (useEmitterRect) {
                var bounds = new egret.Rectangle();
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
            this.$renderNode.blendMode = this.particleBlendMode;
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
                31: useEmitterRect ? this.relativeContentBounds.x : 0,
                32: useEmitterRect ? this.relativeContentBounds.y : 0,
                33: useEmitterRect ? this.relativeContentBounds.width : 0,
                34: useEmitterRect ? this.relativeContentBounds.height : 0,
                35: 0
            };
        };
        GravityParticleSystem.prototype.initParticle = function (particle) {
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
        GravityParticleSystem.prototype.advanceParticle = function (particle, dt) {
            var locParticle = particle;
            dt = dt / 1000;
            var restTime = locParticle.totalTime - locParticle.currentTime;
            dt = restTime > dt ? dt : restTime;
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
            if (locParticle.scale < 0) {
                locParticle.scale = 0;
            }
            locParticle.rotation += locParticle.rotationDelta * dt * 1000;
            locParticle.alpha += locParticle.alphaDelta * dt * 1000;
        };
        return GravityParticleSystem;
    }(particle_4.ParticleSystem));
    particle_4.GravityParticleSystem = GravityParticleSystem;
    __reflect(GravityParticleSystem.prototype, "particle.GravityParticleSystem");
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
    var RadiusParticle = (function (_super) {
        __extends(RadiusParticle, _super);
        function RadiusParticle() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RadiusParticle.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this.emitRadius = 0;
            this.emitRadiusDelta = 0;
            this.emitRotation = 0;
            this.emitRotationDelta = 0;
            this.rotationDelta = 0;
            this.scaleDelta = 0;
            this.alphaDelta = 0;
        };
        return RadiusParticle;
    }(particle.Particle));
    particle.RadiusParticle = RadiusParticle;
    __reflect(RadiusParticle.prototype, "particle.RadiusParticle");
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
(function (particle_5) {
    var RadiusParticleSystem = (function (_super) {
        __extends(RadiusParticleSystem, _super);
        function RadiusParticleSystem(texture, config) {
            var _this = _super.call(this, texture, 200) || this;
            if (_this.gpuRender) {
                _this.$renderNode = new egret.sys.ParticleNode();
                var vertexSrc = "attribute vec2 aParticlePosition;\n" +
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
                var fragmentSrc = "precision lowp float;\n" +
                    "varying vec2 vTextureCoord;\n" +
                    "varying vec4 vColor;\n" +
                    "uniform sampler2D uSampler;\n" +
                    "void main(void) {\n" +
                    "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor;\n" +
                    "   gl_FragColor.rgb *= vColor.a;\n" +
                    "}";
                _this.uniforms = { uGlobalMatrix: null, uGlobalAlpha: null };
                var filter = new egret.CustomFilter(vertexSrc, fragmentSrc, _this.uniforms);
                _this.filters = [filter];
            }
            _this.parseConfig(config);
            _this.particleClass = particle_5.RadiusParticle;
            return _this;
        }
        RadiusParticleSystem.prototype.parseConfig = function (config) {
            if (!config || config.byteLength != 179) {
                throw "config error";
            }
            var byteArray = new egret.ByteArray(config);
            var nameLength = byteArray.readUnsignedByte();
            var name = byteArray.readUTFBytes(nameLength);
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
            var x = byteArray.readFloat();
            var y = byteArray.readFloat();
            var width = byteArray.readFloat();
            var height = byteArray.readFloat();
            if (width != 0 && height != 0) {
                var bounds = new egret.Rectangle();
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
            function getValue(value) {
                if (typeof value == "undefined") {
                    return 0;
                }
                return value;
            }
            this.emissionRate = this.lifespan / this.maxParticles;
            if (this.gpuRender) {
                this.numProperties = 22;
                var vertices = new Float32Array(this.numProperties * this.maxParticles * 4);
                var offset = void 0;
                for (var i = 0; i < this.maxParticles; i++) {
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
                this.$renderNode.vertices = vertices;
                this.$renderNode.numParticles = this.maxParticles;
                this.$renderNode.numProperties = this.numProperties;
                this.$renderNode.image = this.texture.$bitmapData;
                this.$renderNode.blendMode = this.particleBlendMode;
                this.verticesIndex = 0;
                this.removeIndexs = [];
                this.pasedTime = 0;
            }
            else {
                this.$renderNode.blendMode = this.particleBlendMode;
            }
        };
        RadiusParticleSystem.prototype.initParticle = function (particle) {
            var locParticle = particle;
            var lifespan = RadiusParticleSystem.getValue(this.lifespan, this.lifespanVariance);
            locParticle.currentTime = 0;
            locParticle.totalTime = lifespan > 0 ? lifespan : 0;
            if (lifespan <= 0) {
                return;
            }
            locParticle.x = RadiusParticleSystem.getValue(this.emitterX, this.emitterXVariance);
            locParticle.y = RadiusParticleSystem.getValue(this.emitterY, this.emitterYVariance);
            var startSize = RadiusParticleSystem.getValue(this.startSize, this.startSizeVariance);
            if (startSize < 0.1) {
                startSize = 0.1;
            }
            var endSize = RadiusParticleSystem.getValue(this.endSize, this.endSizeVariance);
            if (endSize < 0.1) {
                endSize = 0.1;
            }
            var textureWidth = this.texture.textureWidth;
            locParticle.scale = startSize / textureWidth;
            locParticle.scaleDelta = ((endSize - startSize) / lifespan) / textureWidth;
            var startRotation = RadiusParticleSystem.getValue(this.startRotation, this.startRotationVariance);
            var endRotation = RadiusParticleSystem.getValue(this.endRotation, this.endRotationVariance);
            locParticle.rotation = startRotation;
            locParticle.rotationDelta = (endRotation - startRotation) / lifespan;
            var startRed = RadiusParticleSystem.getValue(this.startRed, this.startRedVariance, true);
            var endRed = RadiusParticleSystem.getValue(this.endRed, this.endRedVariance, true);
            locParticle.red = startRed;
            locParticle.redDelta = (endRed - startRed) / lifespan;
            var startGreen = RadiusParticleSystem.getValue(this.startGreen, this.startGreenVariance, true);
            var endGreen = RadiusParticleSystem.getValue(this.endGreen, this.endGreenVariance, true);
            locParticle.green = startGreen;
            locParticle.greenDelta = (endGreen - startGreen) / lifespan;
            var startBlue = RadiusParticleSystem.getValue(this.startBlue, this.startBlueVariance, true);
            var endBlue = RadiusParticleSystem.getValue(this.endBlue, this.endBlueVariance, true);
            locParticle.blue = startBlue;
            locParticle.blueDelta = (endBlue - startBlue) / lifespan;
            var startAlpha = RadiusParticleSystem.getValue(this.startAlpha, this.startAlphaVariance, true);
            var endAlpha = RadiusParticleSystem.getValue(this.endAlpha, this.endAlphaVariance, true);
            locParticle.alpha = startAlpha;
            locParticle.alphaDelta = (endAlpha - startAlpha) / lifespan;
            var startRadius = RadiusParticleSystem.getValue(this.maxRadius, this.maxRadiusVariance);
            var endRadius = RadiusParticleSystem.getValue(this.minRadius, this.minRadiusVariance);
            locParticle.emitRadius = startRadius;
            locParticle.emitRadiusDelta = (endRadius - startRadius) / lifespan;
            locParticle.emitRotation = RadiusParticleSystem.getValue(this.emitRotation, this.emitRotationVariance);
            locParticle.emitRotationDelta = RadiusParticleSystem.getValue(this.emitRotationDelta, this.emitRotationDeltaVariance);
            if (this.gpuRender) {
                var addIndex = void 0;
                if (this.removeIndexs.length) {
                    addIndex = this.removeIndexs.pop();
                }
                else {
                    addIndex = this.verticesIndex;
                    this.verticesIndex++;
                }
                var vertices = this.vertices;
                var startIndex = addIndex * this.numProperties * 4;
                var locParticle_1 = particle;
                locParticle_1.addIndex = addIndex;
                for (var i = 0; i < 4; i++) {
                    vertices[startIndex + i * this.numProperties + 4] = locParticle_1.scale;
                    vertices[startIndex + i * this.numProperties + 5] = locParticle_1.scaleDelta;
                    vertices[startIndex + i * this.numProperties + 6] = locParticle_1.rotation / 180 * Math.PI;
                    vertices[startIndex + i * this.numProperties + 7] = locParticle_1.rotationDelta / 180 * Math.PI;
                    vertices[startIndex + i * this.numProperties + 8] = locParticle_1.red;
                    vertices[startIndex + i * this.numProperties + 9] = locParticle_1.redDelta;
                    vertices[startIndex + i * this.numProperties + 10] = locParticle_1.green;
                    vertices[startIndex + i * this.numProperties + 11] = locParticle_1.greenDelta;
                    vertices[startIndex + i * this.numProperties + 12] = locParticle_1.blue;
                    vertices[startIndex + i * this.numProperties + 13] = locParticle_1.blueDelta;
                    vertices[startIndex + i * this.numProperties + 14] = locParticle_1.alpha;
                    vertices[startIndex + i * this.numProperties + 15] = locParticle_1.alphaDelta;
                    vertices[startIndex + i * this.numProperties + 16] = locParticle_1.emitRotation;
                    vertices[startIndex + i * this.numProperties + 17] = locParticle_1.emitRotationDelta;
                    vertices[startIndex + i * this.numProperties + 18] = locParticle_1.emitRadius;
                    vertices[startIndex + i * this.numProperties + 19] = locParticle_1.emitRadiusDelta;
                    vertices[startIndex + i * this.numProperties + 20] = this.pasedTime;
                    vertices[startIndex + i * this.numProperties + 21] = locParticle_1.totalTime;
                }
            }
        };
        RadiusParticleSystem.getValue = function (base, variance, clamp) {
            if (clamp === void 0) { clamp = false; }
            var result = base + variance * (Math.random() * 2 - 1);
            if (clamp) {
                result = Math.max(0, result);
                result = Math.min(result, 1);
            }
            return result;
        };
        RadiusParticleSystem.prototype.advanceParticle = function (particle, dt) {
            var locParticle = particle;
            dt = dt / 1000;
            var restTime = locParticle.totalTime - locParticle.currentTime;
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
        };
        return RadiusParticleSystem;
    }(particle_5.ParticleSystem));
    particle_5.RadiusParticleSystem = RadiusParticleSystem;
    __reflect(RadiusParticleSystem.prototype, "particle.RadiusParticleSystem");
})(particle || (particle = {}));
