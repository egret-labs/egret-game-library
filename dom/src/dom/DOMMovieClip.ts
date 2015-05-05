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
     * @class egret.dom.DOMMovieClip
     * @extends egret.dom.DOMDiv
     * @classdesc
     * Bitmap 类表示用于表示位图图像的在DOM中得显示。
     */
    export class DOMMovieClip extends DOMDiv {
        private _movieclip:egret.MovieClip;

        constructor(movieclip:egret.MovieClip, id:string) {
            super("div", id);

            this._movieclip = movieclip;

            this._overrideFunctions();
        }

        /**
         * 重写方法
         */
        public _overrideFunctions():void {
            super._overrideFunctions();

            var self = this;

            this._movieclip._draw = function (renderContext:egret.RendererContext) {
                self._draw.call(self, renderContext);
            };
        }

        public _draw(renderContext:egret.RendererContext):void {
            if (!this._movieclip.getDirty()) {
                //return;
            }
            if (this._movieclip._textureToRender) {
                this.setBitmapDiv(this, this._movieclip._textureToRender);
            }
            else {
            }

            //设置当前div可否点击情况
            this.touchChildren = false;

            _renderObject(this._movieclip, this);
        }

        //绘制图，创建img
        private initBitmapDiv(domDiv:DOMDiv, src:string, w:number, h:number, bitmapX:number, bitmapY:number):void {
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
            img.changeStyle("clip", str, "");

            domDiv.setWidth(w);
            domDiv.setHeight(h);
            domDiv.changeStyle("overflow", "hidden", "");

            img.setX(-bitmapX);
            img.setY(-bitmapY);

            img.reflow();

            if (domDiv.numChildren == 0) {
                domDiv.addChild(img);
            }
        }

        //绘制标准图
        private setBitmapDiv(domDiv:DOMDiv, texture:egret.Texture):void {
            this.initBitmapDiv(domDiv, texture._bitmapData.getAttribute("bitmapSrc"), texture._bitmapWidth, texture._bitmapHeight, texture._bitmapX, texture._bitmapY);
        }
    }
}
