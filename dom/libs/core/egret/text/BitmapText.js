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
    * @classdesc
    * @class egret.BitmapText
    * 位图字体采用了Bitmap+SpriteSheet的方式来渲染文字。
    * @extends egret.DisplayObjectContainer
    */
    var BitmapText = (function (_super) {
        __extends(BitmapText, _super);
        function BitmapText() {
            _super.call(this);
            /**
            * 设置文本
            */
            this._text = "";
            this._textChanged = false;
            this._bitmapPool = [];
        }

        Object.defineProperty(BitmapText.prototype, "text", {
            /**
            * 显示的文本内容
            * @member {string} egret.BitmapText#text
            *
            */
            get: function () {
                return this._text;
            },
            //        private current_rendered_text:string;
            set: function (value) {
                this._textChanged = true;
                this._text = value;
            },
            enumerable: true,
            configurable: true
        });

        BitmapText.prototype._updateTransform = function () {
            if (!this.visible) {
                return;
            }
            if (this._textChanged) {
                this._renderText();
            }
            _super.prototype._updateTransform.call(this);
        };

        //todo:这里对bounds的处理和TextField非常类似，以后考虑重构
        BitmapText.prototype._renderText = function (forMeasureContentSize) {
            if (typeof forMeasureContentSize === "undefined") { forMeasureContentSize = false; }
            var tempW = 0;
            var tempH = 0;

            if (this._textChanged) {
                this.removeChildren();
            }
            for (var i = 0, l = this.text.length; i < l; i++) {
                var character = this.text.charAt(i);
                var texture = this.spriteSheet.getTexture(character);
                if (texture == null) {
                    console.log("当前没有位图文字：" + character);
                    continue;
                }
                var offsetX = texture._offsetX;
                var offsetY = texture._offsetY;
                var characterWidth = texture._textureWidth;
                if (this._textChanged) {
                    var bitmap = this._bitmapPool[i];
                    if (!bitmap) {
                        bitmap = new egret.Bitmap();
                        this._bitmapPool.push(bitmap);
                    }
                    bitmap.texture = texture;
                    this.addChild(bitmap);
                    bitmap.x = tempW;
                }
                tempW += characterWidth + offsetX;
                if (offsetY + texture._textureHeight > tempH) {
                    tempH = offsetY + texture._textureHeight;
                }
            }

            this._textChanged = false;
            var rect = egret.Rectangle.identity.initialize(0, 0, tempW, tempH);
            return rect;
        };

        BitmapText.prototype._measureBounds = function () {
            return this._renderText(true);
        };
        return BitmapText;
    })(egret.DisplayObjectContainer);
    egret.BitmapText = BitmapText;
    BitmapText.prototype.__class__ = "egret.BitmapText";
})(egret || (egret = {}));
