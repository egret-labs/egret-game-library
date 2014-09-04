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
module egret.dom {

    /**
     * @class egret.dom.DOMBitmap
     * @extends egret.dom.DOMDiv
     * @classdesc
     * Bitmap 类表示用于表示位图图像的在DOM中得显示。
     */
    export class DOMBitmap extends DOMDiv {
        private _bitmap:egret.Bitmap;

        constructor(bitmap:egret.Bitmap, id:string) {
            super("div", id);

            this._bitmap = bitmap;

            this._overrideFunctions();
        }

        /**
         * 重写方法
         */
        public _overrideFunctions():void {
            super._overrideFunctions();

            var self = this;

            this._bitmap._draw = function (renderContext:egret.RendererContext) {
                self._draw.apply(self, [renderContext]);
            };
        }

        public _draw(renderContext:egret.RendererContext):void {
            if (!this._bitmap.getDirty()) {
                return;
            }
            if (this._bitmap.texture) {
                if (this._bitmap.scale9Grid) {
                    this.setScale9Div(this, this._bitmap.scale9Grid,
                        this._bitmap.texture, this._bitmap.width, this._bitmap.height);
                }
                else {
                    this.setBitmapDiv(this, this._bitmap.texture);
                }
            }
            else {
                this._bitmap._clearDirty();
                this._bitmap._clearSizeDirty();
                return;
            }

            //设置当前div可否点击情况
            this.touchChildren = false;

            _renderObject(this._bitmap, this);
        }

        //绘制图，创建img
        private initBitmapDiv(domDiv:DOMDiv, src:string, w:number, h:number, bitmapX:number, bitmapY:number):void {

//        domDiv.changeCss3Style("backgroundImage", "url('" + src + "')");
//        domDiv.changeStyle("width", w + "px");
//        domDiv.changeStyle("height", h + "px");
//        domDiv.changeCss3Style("backgroundPosition", (-bitmapX) + "px " + (-bitmapY) + "px");
//        return;

            var img;
            if (domDiv.numChildren) {
                img = domDiv.getChildAt(0);

                if (img.bitmapSrc != src) {
                    img.changeProperty("src", src);
                    img.bitmapSrc = src;
                }
            }
            else {
                img = DOMPool.getImg(src);
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
        }

        //绘制9宫图
        private setScale9Div(domDiv:DOMDiv, rect:egret.Rectangle, texture:egret.Texture, width, height):void {
            var left:number = rect.x - texture._offsetX;
            var top:number = rect.y - texture._offsetY;
            var bitmapW:number = texture._bitmapWidth;
            var bitmapH:number = texture._bitmapHeight;
            var right:number = bitmapW - left - rect.width;
            var bottom:number = bitmapH - top - rect.height;

            var arrX:Array<number> = [0, left, left + rect.width, bitmapW];
            var arrY:Array<number> = [0, top, top + rect.height, bitmapH];

            var arrW:Array<number> = [0, left, width - right, width];
            var arrH:Array<number> = [0, top, height - bottom, height];

            var hasChildren:boolean = false;
            if (domDiv.numChildren > 0) {
                hasChildren = true;
            }
            for (var x = 0; x < 3; x++) {
                for (var y = 0; y < 3; y++) {
                    var childDiv:DOMDiv;
                    if (hasChildren) {
                        childDiv = domDiv.getChildAt(x * 3 + y);
                    }
                    else {
                        childDiv = DOMPool.getDiv();
                    }

                    var textureW = arrX[x + 1] - arrX[x];
                    var textureH = arrY[y + 1] - arrY[y];

                    var bitmapW = arrW[x + 1] - arrW[x];
                    var bitmapH = arrH[y + 1] - arrH[y];

                    this.initBitmapDiv(childDiv, texture.bitmapData.src, textureW, textureH, texture._bitmapX + arrX[x], texture._bitmapY + arrY[y]);

                    var transformStr = "scale(" + (bitmapW / textureW) + ", "
                        + (bitmapH / textureH) + ")";

                    childDiv.changeTrans("transform", transformStr);
                    childDiv.setX(Math.round(arrW[x]));
                    childDiv.setY(Math.round(arrH[y]));
                    childDiv.reflow();
                    if (!hasChildren) {
                        domDiv.addChild(childDiv);
                    }
                }
            }
        }

        //绘制标准图
        private setBitmapDiv(domDiv:DOMDiv, texture:egret.Texture):void {
            this.initBitmapDiv(domDiv, texture.bitmapData.src, texture._bitmapWidth, texture._bitmapHeight, texture._bitmapX, texture._bitmapY);
        }
    }
}
