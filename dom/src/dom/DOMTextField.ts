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

    export class DOMTextField extends DOMDiv {
        private _textField:egret.TextField;

        constructor(textField:egret.TextField, id:string) {
            super("div", id);

            this._textField = textField;

            this._overrideFunctions();
        }

        public _overrideFunctions():void {
            super._overrideFunctions();

            var self = this;

            this._textField._draw = function (renderContext:egret.RendererContext) {
                self._draw.apply(self, [renderContext]);
            };
        }

        public _draw(renderContext:egret.RendererContext):void {
            if (this._textField.getDirty()) {

                this.setTextFieldDiv();

                //设置当前div可否点击情况
                this.touchChildren = false;

                _renderObject(this._textField, this);
            }
        }

        private setTextFieldDiv():void {
            this.changeCss3Style("fontFamily", this._textField.fontFamily);
            this.changeCss3Style("fontSize", this._textField.size + "px");
            this.changeCss3Style("fontStyle", this._textField.italic ? "italic" : "normal");
            this.changeCss3Style("fontWeight", this._textField.bold ? "bold" : "normal");
//            this.changeStyle("lineHeight", this._textField.lineSpacing  + this._textField.size);

            var b = (this._textField.strokeColor & 0x0000ff);
            var g = (this._textField.strokeColor & 0x00ffff) >> 8;
            var r = (this._textField.strokeColor) >> 16;
            var rs = r.toString(16);
            if (rs.length == 1) {
                rs = "0" + rs;
            }
            var gs = g.toString(16);
            if (gs.length == 1) {
                gs = "0" + gs;
            }
            var bs = b.toString(16);
            if (bs.length == 1) {
                bs = "0" + bs;
            }
            this.changeCss3Style("textShadow", "0px 0px " + this._textField.stroke + "px " + "#" + rs + gs + bs);


            var b = (this._textField.textColor & 0x0000ff);
            var g = (this._textField.textColor & 0x00ffff) >> 8;
            var r = (this._textField.textColor) >> 16;

            var rs = r.toString(16);
            if (rs.length == 1) {
                rs = "0" + rs;
            }
            var gs = g.toString(16);
            if (gs.length == 1) {
                gs = "0" + gs;
            }
            var bs = b.toString(16);
            if (bs.length == 1) {
                bs = "0" + bs;
            }

            this.changeStyle("color", "#" + rs + gs + bs);
            this.changeCss3Style("textAlign", this._textField.textAlign);
            this.changeCss3Style("verticalAlign", this._textField.verticalAlign);

            egret.MainContext.instance.rendererContext.setupFont(this._textField);

//            if (!this._textField._hasWidthSet) {
//                var width = egret.MainContext.instance.rendererContext.measureText(this._textField.text);
//                this.changeStyle("width", (width + 4) + "px");
//                this.changeStyle("height", this._textField.height + "px");
//            } else {
                this.changeStyle("width", this._textField.width + "px");
                this.changeStyle("height", this._textField.height + "px");
//            }

            this.setText(this._textField.text);
        }
    }
}