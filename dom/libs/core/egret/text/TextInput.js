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
    var TextInput = (function (_super) {
        __extends(TextInput, _super);
        function TextInput() {
            _super.call(this);
            /**
            * 字号
            * @member {number} egret.TextField#size
            */
            this._size = 30;
            this._textColorString = "#FFFFFF";
            this._textColor = 0xFFFFFF;
            this.stageText = new egret.StageText();
            var point = this.localToGlobal();
            this.stageText._open(point.x, point.y, this._explicitWidth, this._explicitHeight);
        }
        TextInput.prototype._onAddToStage = function () {
            _super.prototype._onAddToStage.call(this);
            this.stageText._add();
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this);
        };

        TextInput.prototype.setText = function (value) {
            this.stageText._setText(value);
        };

        TextInput.prototype.getText = function () {
            return this.stageText._getText();
        };

        TextInput.prototype.setTextType = function (type) {
            this.stageText._setTextType(type);
        };

        TextInput.prototype.getTextType = function () {
            return this.stageText._getTextType();
        };

        TextInput.prototype.onMouseDownHandler = function (event) {
        };

        TextInput.prototype._onRemoveFromStage = function () {
            this.stageText._remove();
        };

        TextInput.prototype._measureBounds = function () {
            return egret.Rectangle.identity;
        };

        TextInput.prototype.hitTest = function (x, y, ignoreTouchEnabled) {
            if (typeof ignoreTouchEnabled === "undefined") { ignoreTouchEnabled = false; }
            //它不能被点击
            return null;
        };

        TextInput.prototype._updateTransform = function () {
            //todo 等待worldTransform的性能优化完成，合并这块代码
            var oldTransFormA = this._worldTransform.a;
            var oldTransFormB = this._worldTransform.b;
            var oldTransFormC = this._worldTransform.c;
            var oldTransFormD = this._worldTransform.d;
            var oldTransFormTx = this._worldTransform.tx;
            var oldTransFormTy = this._worldTransform.ty;
            _super.prototype._updateTransform.call(this);
            var newTransForm = this._worldTransform;
            if (oldTransFormA != newTransForm.a || oldTransFormB != newTransForm.b || oldTransFormC != newTransForm.c || oldTransFormD != newTransForm.d || oldTransFormTx != newTransForm.tx || oldTransFormTy != newTransForm.ty) {
                var point = this.localToGlobal();
                this.stageText.changePosition(point.x, point.y);
                this.stageText.changeSize(this._explicitWidth, this._explicitHeight);
            }
        };

        Object.defineProperty(TextInput.prototype, "size", {
            get: function () {
                return this._size;
            },
            set: function (value) {
                if (this._size != value) {
                    this._size = value;
                    this.stageText.setSize(this._size);
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TextInput.prototype, "textColor", {
            /**
            * 文字颜色
            * @member {number} egret.TextField#textColor
            */
            get: function () {
                return this._textColor;
            },
            set: function (value) {
                if (this._textColor != value) {
                    this._textColor = value;
                    this._textColorString = egret.toColorString(value);
                    this.stageText.setTextColor(this._textColorString);
                }
            },
            enumerable: true,
            configurable: true
        });

        return TextInput;
    })(egret.DisplayObject);
    egret.TextInput = TextInput;
    TextInput.prototype.__class__ = "egret.TextInput";
})(egret || (egret = {}));
