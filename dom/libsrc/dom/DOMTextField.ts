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

            var do_props = this._textField._DO_Props_;
            if (!do_props._hasWidthSet) {
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

            var lines:Array<egret.ILineElement> = this._textField._getLinesArr();
            if (!lines) {
                return;
            }
            var do_props = this._textField._DO_Props_;

            var maxWidth:number = do_props._hasWidthSet ? do_props._explicitWidth : this._textField.textWidth;
            var textHeight:number = this._textField.textHeight + (this._textField.numLines - 1) * this._textField.lineSpacing;

            var drawY:number = 0;
            var startLine:number = 0;
            if (do_props._hasHeightSet) {//
                if (textHeight < do_props._explicitHeight) {//最大高度比需要显示的高度小
                    var valign:number = 0;
                    if (this._textField.verticalAlign == egret.VerticalAlign.MIDDLE)
                        valign = 0.5;
                    else if (this._textField.verticalAlign == egret.VerticalAlign.BOTTOM)
                        valign = 1;
                    drawY += valign * (do_props._explicitHeight - textHeight);
                }
                else if (textHeight > do_props._explicitHeight) {//最大高度比需要显示的高度大
                    startLine = Math.max(this._textField.scrollV - 1, 0);
                    startLine = Math.min(this._textField.numLines - 1, startLine);
                }
            }

            drawY = Math.round(drawY);
            var halign:number = 0;
            if (this._textField.textAlign == egret.HorizontalAlign.CENTER) {
                halign = 0.5;
            }
            else if (this._textField.textAlign == egret.HorizontalAlign.RIGHT) {
                halign = 1;
            }

            var drawX:number = 0;
            for (var i = startLine; i < this._textField.numLines; i++) {
                var line:egret.ILineElement = lines[i];
                var h:number = line.height;
//                drawY += h / 2;

                if (do_props._hasHeightSet && drawY > do_props._explicitHeight) {
                    break;
                }

                drawX = Math.round((maxWidth - line.width) * halign);

                for (var j:number = 0; j < line.elements.length; j++) {
                    var element:egret.IWTextElement = line.elements[j];
                    var size:number = element.style.size || this._textField.size;

                    if (this._textField.type == egret.TextFieldType.INPUT) {
                        this.setP(element.text, drawX, drawY + (h - size) / 2, element.width, {});
                    }
                    else {
                        this.setP(element.text, drawX, drawY + (h - size) / 2, element.width, element.style);
                    }

                    drawX += element.width;
                }
//                drawY += h / 2 + this._textField.lineSpacing;
                drawY += h + this._textField.lineSpacing;
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