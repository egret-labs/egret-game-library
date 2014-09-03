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
        /**
        * @class egret.dom.DOMBitmap
        * @extends egret.dom.DOMDiv
        * @classdesc
        * Bitmap 类表示用于表示位图图像的在DOM中得显示。
        */
        var DOMBitmap = (function (_super) {
            __extends(DOMBitmap, _super);
            function DOMBitmap(bitmap, id) {
                _super.call(this, "div", id);

                this._bitmap = bitmap;

                this._overrideFunctions();
            }
            /**
            * 重写方法
            */
            DOMBitmap.prototype._overrideFunctions = function () {
                _super.prototype._overrideFunctions.call(this);

                var self = this;

                this._bitmap._draw = function (renderContext) {
                    self._draw.apply(self, [renderContext]);
                };
            };

            DOMBitmap.prototype._draw = function (renderContext) {
                if (!this._bitmap.getDirty()) {
                    return;
                }
                if (this._bitmap.texture) {
                    if (this._bitmap.scale9Grid) {
                        this.setScale9Div(this, this._bitmap.scale9Grid, this._bitmap.texture, this._bitmap.width, this._bitmap.height);
                    } else {
                        this.setBitmapDiv(this, this._bitmap.texture);
                    }
                } else {
                    this._bitmap._clearDirty();
                    this._bitmap._clearSizeDirty();
                    return;
                }

                //设置当前div可否点击情况
                this.touchChildren = false;

                dom._renderObject(this._bitmap, this);
            };

            //绘制图，创建img
            DOMBitmap.prototype.initBitmapDiv = function (domDiv, src, w, h, bitmapX, bitmapY) {
                //        domDiv.changeCss3Style("backgroundImage", "url('" + src + "')");
                //        domDiv.changeStyle("width", w + "px");
                //        domDiv.changeStyle("height", h + "px");
                //        domDiv.changeCss3Style("backgroundPosition", (-bitmapX) + "px " + (-bitmapY) + "px");
                //        return;
                var img;
                if (domDiv.numChildren) {
                    img = domDiv.getChildAt(0);
                } else {
                    img = dom.DOMPool.getImg(src);
                }
                var str = "rect(" + bitmapY + "px, " + Math.round(bitmapX + w) + "px, " + Math.round(bitmapY + h) + "px, " + bitmapX + "px)";
                img.changeStyle("clip", str);

                domDiv.changeStyle("width", Math.round(w) + "px");
                domDiv.changeStyle("height", Math.round(h) + "px");
                domDiv.changeStyle("overflow", "hidden");

                img.setX(-bitmapX);
                img.setY(-bitmapY);

                img.reflow();

                domDiv.addChild(img);

                if (domDiv.numChildren == 0) {
                    domDiv.addChild(img);
                }
            };

            //绘制9宫图
            DOMBitmap.prototype.setScale9Div = function (domDiv, rect, texture, width, height) {
                var left = rect.x - texture._offsetX;
                var top = rect.y - texture._offsetY;
                var bitmapW = texture._bitmapWidth;
                var bitmapH = texture._bitmapHeight;
                var right = bitmapW - left - rect.width;
                var bottom = bitmapH - top - rect.height;

                var arrX = [0, left, left + rect.width, bitmapW];
                var arrY = [0, top, top + rect.height, bitmapH];

                var arrW = [0, left, width - right, width];
                var arrH = [0, top, height - bottom, height];

                var hasChildren = false;
                if (domDiv.numChildren > 0) {
                    hasChildren = true;
                }
                for (var x = 0; x < 3; x++) {
                    for (var y = 0; y < 3; y++) {
                        var childDiv;
                        if (hasChildren) {
                            childDiv = domDiv.getChildAt(x * 3 + y);
                        } else {
                            childDiv = dom.DOMPool.getDiv();
                        }

                        var textureW = arrX[x + 1] - arrX[x];
                        var textureH = arrY[y + 1] - arrY[y];

                        var bitmapW = arrW[x + 1] - arrW[x];
                        var bitmapH = arrH[y + 1] - arrH[y];

                        this.initBitmapDiv(childDiv, texture.bitmapData.src, textureW, textureH, texture._bitmapX + arrX[x], texture._bitmapY + arrY[y]);

                        var transformStr = "scale(" + (bitmapW / textureW) + ", " + (bitmapH / textureH) + ")";

                        childDiv.changeTrans("transform", transformStr);
                        childDiv.setX(Math.round(arrW[x]));
                        childDiv.setY(Math.round(arrH[y]));
                        childDiv.reflow();
                        if (!hasChildren) {
                            domDiv.addChild(childDiv);
                        }
                    }
                }
            };

            //绘制标准图
            DOMBitmap.prototype.setBitmapDiv = function (domDiv, texture) {
                this.initBitmapDiv(domDiv, texture.bitmapData.src, texture._bitmapWidth, texture._bitmapHeight, texture._bitmapX, texture._bitmapY);
            };
            return DOMBitmap;
        })(dom.DOMDiv);
        dom.DOMBitmap = DOMBitmap;
        DOMBitmap.prototype.__class__ = "egret.dom.DOMBitmap";
    })(egret.dom || (egret.dom = {}));
    var dom = egret.dom;
})(egret || (egret = {}));
