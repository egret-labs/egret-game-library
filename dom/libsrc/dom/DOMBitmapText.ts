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

module egret.dom {

    /**
     * @class egret.dom.DOMBitmapText
     * @extends egret.dom.DOMDiv
     * @classdesc
     * Bitmap 类表示用于表示位图图像的在DOM中得显示。
     */
    export class DOMBitmapText extends DOMDiv {
        private _bitmapText:egret.BitmapText;

        constructor(bitmap:egret.BitmapText, id:string) {
            super("div", id);

            this._bitmapText = bitmap;

            this._overrideFunctions();
        }

        /**
         * 重写方法
         */
        public _overrideFunctions():void {
            super._overrideFunctions();

            var self = this;

            this._bitmapText._draw = function (renderContext:egret.RendererContext) {
                self._draw.call(self, renderContext);
            };
        }

        public _draw(renderContext:egret.RendererContext):void {
            if (!this._bitmapText.getDirty()) {
                return;
            }
            if (this._bitmapText._font) {
                this.setBitmapDiv(this);
            }
            else {
                this._bitmapText._clearDirty();
                this._bitmapText._clearSizeDirty();
                return;
            }

            //设置当前div可否点击情况
            this.touchChildren = false;

            _renderObject(this._bitmapText, this);
        }

        //绘制图，创建img
        private initBitmapDiv(domDiv:DOMDiv, src:string, w:number, h:number, bitmapX:number, bitmapY:number, posX:number, posY:number):void {
            var img = DOMPool.getImg(src);

            var str = "rect(" + bitmapY + "px, " + Math.round(bitmapX + w) + "px, " + Math.round(bitmapY + h) + "px, " + bitmapX + "px)";
            img.changeStyle("clip", str, "");

            //domDiv.setWidth(w);
            //domDiv.setHeight(h);

            img.setX(-bitmapX + posX);
            img.setY(-bitmapY + posY);

            img.reflow();

            domDiv.addChild(img);
        }

        private setBitmapDiv(domDiv:DOMDiv):void {
            domDiv.removeChildren();
            this.setWidth(this._bitmapText.width);
            this.setHeight(this._bitmapText.height);
            this.changeStyle("overflow", "hidden", "");

            var bitmapText = this._bitmapText;
            var do_props = bitmapText._DO_Props_;
            var textLines:Array<string> = bitmapText._getTextLines();
            var length:number = textLines.length;
            if (length == 0) {
                return;
            }
            var bitmapFont:BitmapFont = bitmapText._font;
            var emptyHeight:number = bitmapFont._getFirstCharHeight();
            var emptyWidth:number = Math.ceil(emptyHeight * egret.BitmapText.EMPTY_FACTOR);
            var yPos:number = 0;
            var maxHeight:number = do_props._hasHeightSet ? do_props._explicitHeight : Number.POSITIVE_INFINITY;
            var lineHeights:Array<number> = bitmapText._lineHeights;
            for (var i:number = 0; i < length; i++) {
                var lineHeight:number = lineHeights[i];
                if (i > 0 && yPos + lineHeight > maxHeight) {
                    break;
                }
                var line:string = textLines[i];
                var len:number = line.length;
                var xPos:number = 0;
                for (var j:number = 0; j < len; j++) {
                    var character = line.charAt(j);
                    var texture = bitmapFont.getTexture(character);
                    if (!texture) {
                        if (character == " ") {
                            xPos += emptyWidth;
                        }
                        else {
                            egret.$warn(1011, character);
                        }
                        continue;
                    }
                    var bitmapWidth:number = texture._bitmapWidth || texture._textureWidth;
                    var bitmapHeight:number = texture._bitmapHeight || texture._textureHeight;
                    bitmapText._texture_to_render = texture;
                    this.initBitmapDiv(domDiv, texture._bitmapData.src, bitmapWidth, bitmapHeight, texture._bitmapX, texture._bitmapY, xPos + texture._offsetX, yPos + texture._offsetY);
                    //RenderFilter.getInstance().drawImage(renderContext, bitmapText, texture._bitmapX, texture._bitmapY,
                    //    bitmapWidth, bitmapHeight, xPos+texture._offsetX, yPos+texture._offsetY, bitmapWidth,bitmapHeight);
                    xPos += texture._textureWidth;
                }
                yPos += lineHeight;
            }
            bitmapText._texture_to_render = null;
        }
    }
}
