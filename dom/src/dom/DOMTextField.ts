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
                self._draw.call(self, renderContext);
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
            this.changeStyle("fontFamily", this._textField.fontFamily, "");
            this.changeStyle("fontSize", this._textField.size + "px", "");
            this.changeStyle("lineHeight", this._textField.size + "px", "");
            this.changeStyle("fontStyle", this._textField.italic ? "italic" : "normal", "normal");
            this.changeStyle("fontWeight", this._textField.bold ? "bold" : "normal", "normal");


            var textColorStr = toColorString(this._textField.textColor);

            this.changeStyle("color", textColorStr, "");
            this.changeStyle("textAlign", this._textField.textAlign, "");
            this.changeStyle("verticalAlign", this._textField.verticalAlign, "");
            this.changeStyle("letterSpacing", "0px", "0px");

            egret.MainContext.instance.rendererContext.setupFont(this._textField);

            if (!this._textField._hasWidthSet) {
                var width = egret.MainContext.instance.rendererContext.measureText(this._textField.text);
                this.setWidth(width + 4);
                this.setHeight(this._textField.height);


            } else {
                this.setWidth(this._textField.width);
                this.setHeight(this._textField.height);
            }

            this.setLines();
//            this.setText(this._textField.text);
        }

        private setLines() {
            this.removeChildren();

            var lines:Array<any> = this._textField._getLinesArr();

            if (!lines) {
                return;
            }
            var length:number = lines.length;
            var drawY:number = 0;

            var textHeight:number = 0;
            var maxWidth:number = 0;
            for (var i:number = 0; i < lines.length; i++) {
                var lineArr:Array<any> = lines[i];
                textHeight += lineArr[lineArr.length - 1][1];
                maxWidth = Math.max(lineArr[lineArr.length - 1][0], maxWidth);
            }
            textHeight += (length - 1) * this._textField._lineSpacing;

            if (this._textField._hasWidthSet) {
                maxWidth = this._textField._explicitWidth;
            }

            var explicitHeight:number = this._textField._hasHeightSet ? this._textField._explicitHeight : Number.POSITIVE_INFINITY;
            if (this._textField._hasHeightSet && textHeight < explicitHeight) {
                var valign:number = 0;
                if (this._textField._verticalAlign == egret.VerticalAlign.MIDDLE)
                    valign = 0.5;
                else if (this._textField._verticalAlign == egret.VerticalAlign.BOTTOM)
                    valign = 1;
                drawY += valign * (explicitHeight - textHeight);
            }
            drawY = Math.round(drawY);
            var halign:number = 0;
            if (this._textField._textAlign == egret.HorizontalAlign.CENTER) {
                halign = 0.5;
            }
            else if (this._textField._textAlign == egret.HorizontalAlign.RIGHT) {
                halign = 1;
            }

            var drawX:number = 0;
            for (var i = 0; i < length; i++) {
                var lineArr:Array<any> = lines[i];

                drawX = Math.round((maxWidth - lineArr[lineArr.length - 1][0]) * halign);

                for (var j:number = 0; j < lineArr.length - 1; j++) {
                    if (this._textField._type == egret.TextFieldType.INPUT) {
                        this.setP(lineArr[j][0], drawX, drawY, lineArr[j][2], {});
                    }
                    else {
                        this.setP(lineArr[j][0], drawX, drawY, lineArr[j][2], lineArr[j][1]);
                    }
                    drawX += lineArr[j][2];
                }
                drawY += lineArr[lineArr.length - 1][1] + this._textField._lineSpacing;

                if (this._textField._hasHeightSet && drawY - this._textField._size * 0.5 > this._textField._explicitHeight) {
                    break;
                }
            }
        }

        private setP(text:string, x:number, y:number, maxWidth:number, style:Object) {
            var p = DOMPool.getP();

            if ("innerText" in p) {
                p._currentDiv.innerText = text;
            }
            else if ("textContent" in this._currentDiv) {
                p._currentDiv.textContent = text;
            }

            p.setX(x);
            p.setY(y);
            p.reflow();
            this.addChild(p);
        }
    }
}