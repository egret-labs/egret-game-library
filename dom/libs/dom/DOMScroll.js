var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var egret;
(function (egret) {
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
    (function (dom) {
        var DOMScroll = (function (_super) {
            __extends(DOMScroll, _super);
            function DOMScroll(displayObject, id) {
                _super.call(this, "div", id);
                this._listeners = [];

                this._displayObject = displayObject;
                this._iscroll = displayObject;

                this._listeners = [];

                if (this._iscroll.getDirection() == egret.ScrollDirection.BOTH) {
                    this.changeStyle("overflow", "auto");
                } else if (this._iscroll.getDirection() == egret.ScrollDirection.HORIZONTAL) {
                    this.changeStyle("overflowX", "auto");
                    this.changeStyle("overflowY", "hidden");
                } else {
                    this.changeStyle("overflowX", "hidden");
                    this.changeStyle("overflowY", "auto");
                }

                this._overrideFunctions();
            }
            DOMScroll.prototype._overrideFunctions = function () {
                _super.prototype._overrideFunctions.call(this);

                var self = this;

                this._displayObject._draw = function (renderContext) {
                    self._draw.apply(self, [renderContext]);
                };

                this._iscroll.scrollStart = function () {
                };
            };

            DOMScroll.prototype._draw = function (renderContext) {
                if (!this._displayObject.visible) {
                    this.visible = false;
                    this.reflow();
                }

                if (this._displayObject.getDirty()) {
                    this.changeStyle("width", Math.round(this._displayObject.width) + "px");
                    this.changeStyle("height", Math.round(this._displayObject.height) + "px");

                    //设置当前div可否点击情况
                    this.touchEnabled = this._displayObject.touchEnabled;

                    //修改当前位置
                    dom._updatePosition(this, this._displayObject);
                    dom._clear(this._displayObject);
                }

                //绘制children
                if (this._displayObject instanceof egret.DisplayObjectContainer) {
                    var container = this._displayObject;
                    for (var i = 0, length = container.numChildren; i < length; i++) {
                        var child = container.getChildAt(i);
                        child._draw(renderContext);
                    }
                }
            };

            /**
            * 从DIV节点移除处理
            */
            DOMScroll.prototype._removeFromParent = function () {
                _super.prototype._removeFromParent.call(this);

                this.removeListeners();
            };

            /**
            * 加入到DIV节点处理
            */
            DOMScroll.prototype._addToParent = function () {
                _super.prototype._addToParent.call(this);

                this.addListeners();
            };

            DOMScroll.prototype.addListeners = function () {
                if (this._listeners.length > 0) {
                    return;
                }
                this.addEventListener("touchstart", false);
                this.addEventListener("touchmove", false);
                this.addEventListener("touchend", false);
                this.addEventListener("touchcancel", false);
                this.addEventListener("scroll", false);
            };

            DOMScroll.prototype.removeListeners = function () {
                if (this._listeners.length <= 0) {
                    return;
                }
                this.removeEventListener("touchstart", false);
                this.removeEventListener("touchmove", false);
                this.removeEventListener("touchend", false);
                this.removeEventListener("touchcancel", false);
                this.removeEventListener("scroll", false);
            };

            DOMScroll.prototype.addEventListener = function (type, useCapture) {
                var self = this;
                var tempListener = function (event) {
                    if (!self.touchEnabled) {
                        return;
                    }

                    if (event.type == "scroll") {
                        self._iscroll.setScrollRect(self._currentDiv.scrollLeft, self._currentDiv.scrollTop);
                    } else {
                        event["isScroll"] = true;
                    }
                };
                this._listeners.push({ "t": type, "u": useCapture, "tl": tempListener });

                this.domDiv.addEventListener(type, tempListener, useCapture);
            };

            DOMScroll.prototype.removeEventListener = function (type, useCapture) {
                for (var i = 0; i < this._listeners.length; i++) {
                    var info = this._listeners[i];
                    if (info["t"] == type && info["u"] == useCapture) {
                        this.domDiv.removeEventListener(info["t"], info["tl"], info["u"]);
                        this._listeners.splice(i, 1);
                        return;
                    }
                }
            };
            return DOMScroll;
        })(dom.DOMDiv);
        dom.DOMScroll = DOMScroll;
        DOMScroll.prototype.__class__ = "egret.dom.DOMScroll";
    })(egret.dom || (egret.dom = {}));
    var dom = egret.dom;
})(egret || (egret = {}));
