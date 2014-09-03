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
    * @class egret.TextField
    * @classdesc
    * TextField是egret的文本渲染类，采用浏览器/设备的API进行渲染，在不同的浏览器/设备中由于字体渲染方式不一，可能会有渲染差异
    * 如果开发者希望所有平台完全无差异，请使用BitmapText
    * @extends egret.DisplayObject
    */
    var TextField = (function (_super) {
        __extends(TextField, _super);
        function TextField() {
            _super.call(this);
            /**
            * 字体
            * @member {any} egret.TextField#fontFamily
            */
            this._fontFamily = "Arial";
            /**
            * 字号
            * @member {number} egret.TextField#size
            */
            this._size = 30;
            this._textColorString = "#FFFFFF";
            this._textColor = 0xFFFFFF;
            this._strokeColorString = "#000000";
            this._strokeColor = 0x000000;
            /**
            * 描边宽度，0为没有描边
            * @member {number} egret.TextField#stroke
            */
            this._stroke = 0;
            /**
            * 文本水平对齐方式,使用HorizontalAlign定义的常量，默认值HorizontalAlign.LEFT。
            * @member {string} egret.TextField#textAlign
            */
            this._textAlign = "left";
            /**
            * 文本垂直对齐方式,使用VerticalAlign定义的常量，默认值VerticalAlign.TOP。
            * @member {string} egret.TextField#verticalAlign
            */
            this._verticalAlign = "top";
            /**
            * 行间距
            * @member {number} egret.TextField#lineSpacing
            */
            this._lineSpacing = 0;
            this._numLines = 0;
            this.measuredWidths = [];
        }
        Object.defineProperty(TextField.prototype, "text", {
            get: function () {
                return this._text;
            },
            set: function (value) {
                if (this._text != value) {
                    this._setTextDirty();
                    this._text = value;
                }
            },
            enumerable: true,
            configurable: true
        });

        TextField.prototype._setTextDirty = function () {
            this._setSizeDirty();
        };


        Object.defineProperty(TextField.prototype, "fontFamily", {
            get: function () {
                return this._fontFamily;
            },
            set: function (value) {
                if (this._fontFamily != value) {
                    this._setTextDirty();
                    this._fontFamily = value;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TextField.prototype, "size", {
            get: function () {
                return this._size;
            },
            set: function (value) {
                if (this._size != value) {
                    this._setTextDirty();
                    this._size = value;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TextField.prototype, "italic", {
            get: function () {
                return this._italic;
            },
            set: function (value) {
                if (this._italic != value) {
                    this._setTextDirty();
                    this._italic = value;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TextField.prototype, "bold", {
            get: function () {
                return this._bold;
            },
            set: function (value) {
                if (this._bold != value) {
                    this._setTextDirty();
                    this._bold = value;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TextField.prototype, "textColor", {
            /**
            * 文字颜色
            * @member {number} egret.TextField#textColor
            */
            get: function () {
                return this._textColor;
            },
            set: function (value) {
                if (this._textColor != value) {
                    this._setTextDirty();
                    this._textColor = value;
                    this._textColorString = egret.toColorString(value);
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TextField.prototype, "strokeColor", {
            /**
            * 描边颜色
            * @member {number} egret.TextField#strokeColor
            */
            get: function () {
                return this._strokeColor;
            },
            set: function (value) {
                if (this._strokeColor != value) {
                    this._setTextDirty();
                    this._strokeColor = value;
                    this._strokeColorString = egret.toColorString(value);
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TextField.prototype, "stroke", {
            get: function () {
                return this._stroke;
            },
            set: function (value) {
                if (this._stroke != value) {
                    this._setTextDirty();
                    this._stroke = value;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TextField.prototype, "textAlign", {
            get: function () {
                return this._textAlign;
            },
            set: function (value) {
                if (this._textAlign != value) {
                    this._setTextDirty();
                    this._textAlign = value;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TextField.prototype, "verticalAlign", {
            get: function () {
                return this._verticalAlign;
            },
            set: function (value) {
                if (this._verticalAlign != value) {
                    this._setTextDirty();
                    this._verticalAlign = value;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TextField.prototype, "lineSpacing", {
            get: function () {
                return this._lineSpacing;
            },
            set: function (value) {
                if (this._lineSpacing != value) {
                    this._setTextDirty();
                    this._lineSpacing = value;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TextField.prototype, "numLines", {
            /**
            * 文本行数
            * @member {number} egret.TextField#numLines
            */
            get: function () {
                return this._numLines;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * @see egret.DisplayObject._render
        * @param renderContext
        */
        TextField.prototype._render = function (renderContext) {
            this.drawText(renderContext, false);

            this._clearDirty();
        };

        /**
        * 测量显示对象坐标与大小
        */
        TextField.prototype._measureBounds = function () {
            var renderContext = egret.MainContext.instance.rendererContext;
            return this.drawText(renderContext, true);
        };

        /**
        * @private
        * @param renderContext
        * @returns {Rectangle}
        */
        TextField.prototype.drawText = function (renderContext, forMeasure) {
            var lines = this.getTextLines(renderContext);
            if (!lines) {
                return egret.Rectangle.identity.initialize(0, 0, 0, 0);
            }
            var length = lines.length;
            var drawY = this._size * 0.5;
            var hGap = this._size + this._lineSpacing;
            var textHeight = length * hGap - this._lineSpacing;
            this._textHeight = textHeight;
            var explicitHeight = this._hasHeightSet ? this._explicitHeight : Number.POSITIVE_INFINITY;
            if (this._hasHeightSet && textHeight < explicitHeight) {
                var valign = 0;
                if (this._verticalAlign == egret.VerticalAlign.MIDDLE)
                    valign = 0.5;
                else if (this._verticalAlign == egret.VerticalAlign.BOTTOM)
                    valign = 1;
                drawY += valign * (explicitHeight - textHeight);
            }
            drawY = Math.round(drawY);
            var minY = drawY;
            var halign = 0;
            if (this._textAlign == egret.HorizontalAlign.CENTER) {
                halign = 0.5;
            } else if (this._textAlign == egret.HorizontalAlign.RIGHT) {
                halign = 1;
            }
            var measuredWidths = this.measuredWidths;
            var maxWidth;
            if (this._hasWidthSet) {
                maxWidth = this._explicitWidth;
            } else {
                maxWidth = this._textWidth;
            }
            var minX = Number.POSITIVE_INFINITY;
            for (var i = 0; i < length; i++) {
                var line = lines[i];
                var measureW = measuredWidths[i];
                var drawX = Math.round((maxWidth - measureW) * halign);
                if (drawX < minX) {
                    minX = drawX;
                }
                if (!forMeasure && drawY < explicitHeight) {
                    renderContext.drawText(this, line, drawX, drawY, maxWidth);
                }
                drawY += hGap;
            }
            return egret.Rectangle.identity.initialize(minX, minY, maxWidth, textHeight);
        };

        TextField.prototype.getTextLines = function (renderContext) {
            var text = this.text ? this.text.toString() : "";
            if (!text) {
                return null;
            }
            var measuredWidths = this.measuredWidths;
            measuredWidths.length = 0;
            renderContext.setupFont(this);
            var lines = text.split(/(?:\r\n|\r|\n)/);
            var length = lines.length;
            var maxWidth = 0;
            if (this._hasWidthSet) {
                var explicitWidth = this._explicitWidth;
                for (var i = 0; i < length; i++) {
                    var line = lines[i];
                    var measureW = renderContext.measureText(line);
                    if (measureW > explicitWidth) {
                        var newLine = "";
                        var lineWidth = 0;
                        var len = line.length;
                        for (var j = 0; j < len; j++) {
                            var word = line.charAt(j);
                            measureW = renderContext.measureText(word);
                            if (lineWidth + measureW > explicitWidth) {
                                if (lineWidth == 0) {
                                    lines.splice(i, 0, word);
                                    measuredWidths[i] = measureW;
                                    if (maxWidth < measureW) {
                                        maxWidth = measureW;
                                    }
                                    measureW = 0;
                                    word = "";
                                } else {
                                    lines.splice(i, 0, newLine);
                                    measuredWidths[i] = lineWidth;
                                    if (maxWidth < lineWidth) {
                                        maxWidth = lineWidth;
                                    }
                                    newLine = "";
                                    lineWidth = 0;
                                }
                                i++;
                                length++;
                            }
                            lineWidth += measureW;
                            newLine += word;
                        }
                        lines[i] = newLine;
                        measuredWidths[i] = lineWidth;
                    } else {
                        measuredWidths[i] = measureW;
                        if (maxWidth < measureW) {
                            maxWidth = measureW;
                        }
                    }
                }
            } else {
                for (i = 0; i < length; i++) {
                    line = lines[i];
                    measureW = renderContext.measureText(line);
                    measuredWidths[i] = measureW;
                    if (maxWidth < measureW) {
                        maxWidth = measureW;
                    }
                }
            }
            this._textWidth = maxWidth;
            return lines;
        };
        return TextField;
    })(egret.DisplayObject);
    egret.TextField = TextField;
    TextField.prototype.__class__ = "egret.TextField";
})(egret || (egret = {}));
