/**
* Copyright (c) 2014,Egret-Labs.org
* All rights reserved.
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
*     * Redistributions of source code must retain the above copyright
*       notice, this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright
*       notice, this list of conditions and the following disclaimer in the
*       documentation and/or other materials provided with the distribution.
*     * Neither the name of the Egret-Labs.org nor the
*       names of its contributors may be used to endorse or promote products
*       derived from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var egret;
(function (egret) {
    /**
    * @class egret.Stage
    * @classdesc Stage 类代表主绘图区。
    */
    var Stage = (function (_super) {
        __extends(Stage, _super);
        function Stage(width, height) {
            if (typeof width === "undefined") { width = 480; }
            if (typeof height === "undefined") { height = 800; }
            _super.call(this);
            this.touchEnabled = true;
            this._stage = this;
            this._stageWidth = width;
            this._stageHeight = height;
        }
        /**
        * 调用 invalidate() 方法后，在显示列表下次呈现时，Egret 会向每个已注册侦听 render 事件的显示对象发送一个 render 事件。
        * 每次您希望 Egret 发送 render 事件时，都必须调用 invalidate() 方法。
        * @method egret.Stage#invalidate
        */
        Stage.prototype.invalidate = function () {
            Stage._invalidateRenderFlag = true;
        };

        Object.defineProperty(Stage.prototype, "scaleMode", {
            get: function () {
                return this._scaleMode;
            },
            set: function (value) {
                if (this._scaleMode != value) {
                    this._scaleMode = value;

                    var scaleModeEnum = {};
                    scaleModeEnum[egret.StageScaleMode.NO_SCALE] = new egret.NoScale();
                    scaleModeEnum[egret.StageScaleMode.SHOW_ALL] = new egret.ShowAll();
                    scaleModeEnum[egret.StageScaleMode.NO_BORDER] = new egret.FixedWidth();
                    var content = scaleModeEnum[value];
                    if (!content) {
                        throw new Error("使用了尚未实现的ScaleMode");
                    }
                    var container = new egret.EqualToFrame();
                    var policy = new egret.ResolutionPolicy(container, content);
                    egret.StageDelegate.getInstance()._setResolutionPolicy(policy);
                    var canvas = document.getElementById(egret.StageDelegate.canvas_name);
                    this._stageWidth = canvas.width;
                    this._stageHeight = canvas.height;
                    this.dispatchEventWith(egret.Event.RESIZE);
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Stage.prototype, "stageWidth", {
            /**
            * @member {number} egret.Stage#stageWidth
            * 舞台宽度（坐标系宽度，非设备宽度）
            */
            get: function () {
                return this._stageWidth;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Stage.prototype, "stageHeight", {
            /**
            * @member {number} egret.Stage#stageHeight
            * 舞台高度（坐标系高度，非设备高度）
            */
            get: function () {
                return this._stageHeight;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * @member egret.Stage#hitTest
        * @see egret.DisplayObject#hitTest
        * @param x
        * @param y
        * @returns {egret.DisplayObject}
        */
        Stage.prototype.hitTest = function (x, y) {
            if (!this.touchEnabled) {
                return null;
            }
            var result;
            if (!this.visible) {
                return this;
            }
            var children = this._children;
            var l = children.length;
            for (var i = l - 1; i >= 0; i--) {
                var child = children[i];
                var o = child;
                var offsetPoint = o._getOffsetPoint();
                var mtx = egret.Matrix.identity.identity().prependTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, 0, 0, offsetPoint.x, offsetPoint.y);
                mtx.invert();
                var point = egret.Matrix.transformCoords(mtx, x, y);
                result = child.hitTest(point.x, point.y, true);
                if (result) {
                    if (result.touchEnabled) {
                        return result;
                    }
                }
            }
            return this;
        };

        /**
        * 返回舞台尺寸范围
        * @member egret.Stage#getBounds
        * @see egret.DisplayObject#getBounds
        * @param resultRect {egret.Rectangle} 可选参数，传入用于保存结果的Rectangle对象，避免重复创建对象。
        * @returns {egret.Rectangle}
        */
        Stage.prototype.getBounds = function (resultRect) {
            if (!resultRect) {
                resultRect = new egret.Rectangle();
            }
            return resultRect.initialize(0, 0, this._stageWidth, this._stageHeight);
        };

        Stage.prototype._updateTransform = function () {
            for (var i = 0, length = this._children.length; i < length; i++) {
                var child = this._children[i];
                child._updateTransform();
            }
        };
        Stage._invalidateRenderFlag = false;
        return Stage;
    })(egret.DisplayObjectContainer);
    egret.Stage = Stage;
    Stage.prototype.__class__ = "egret.Stage";
})(egret || (egret = {}));
