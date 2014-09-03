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
    * @class egret.StageText
    * @classdesc
    * @extends egret.HashObject
    */
    var StageText = (function (_super) {
        __extends(StageText, _super);
        function StageText() {
            _super.call(this);
            this._size = 20;
        }
        /**
        * @method egret.StageText#getText
        * @returns {string}
        */
        StageText.prototype._getText = function () {
            return this.inputElement.value;
        };

        /**
        * @method egret.StageText#setText
        * @param value {string}
        */
        StageText.prototype._setText = function (value) {
            this.inputElement.value = value;
        };

        /**
        * @method egret.StageText#setTextType
        * @param type {string}
        */
        StageText.prototype._setTextType = function (type) {
            this.inputElement.type = type;
        };

        /**
        * @method egret.StageText#getTextType
        * @returns {string}
        */
        StageText.prototype._getTextType = function () {
            return this.inputElement.type;
        };

        /**
        * @method egret.StageText#open
        * @param x {number}
        * @param y {number}
        * @param width {number}
        * @param height {number}
        */
        StageText.prototype._open = function (x, y, width, height) {
            if (typeof width === "undefined") { width = 160; }
            if (typeof height === "undefined") { height = 21; }
            var scaleX = egret.StageDelegate.getInstance().getScaleX();
            var scaleY = egret.StageDelegate.getInstance().getScaleY();

            var inputElement = document.createElement("input");
            inputElement.type = "text";
            inputElement.style.fontSize = this._size + "px";
            inputElement.style.color = "#FFFFFF";
            inputElement.style.border = "none";
            inputElement.style.background = "none";
            inputElement.style.width = width + "px";
            inputElement.style.padding = "0";
            inputElement.style.outline = "medium";

            var div = egret.Browser.getInstance().$new("div");
            div.position.x = x * scaleX;
            div.position.y = y * scaleY;
            div.style.width = width + "px";
            div.scale.x = scaleX;
            div.scale.y = scaleY;
            div.transforms();
            div.style[egret_dom.getTrans("transformOrigin")] = "0% 0% 0px";

            div.appendChild(inputElement);

            this.div = div;
            this.inputElement = inputElement;
        };

        StageText.prototype.getStageDelegateDiv = function () {
            var stageDelegateDiv = egret.Browser.getInstance().$("#StageDelegateDiv");
            if (!stageDelegateDiv) {
                stageDelegateDiv = egret.Browser.getInstance().$new("div");
                stageDelegateDiv.id = "StageDelegateDiv";
                var container = document.getElementById(egret.StageDelegate.canvas_div_name);
                container.appendChild(stageDelegateDiv);
                stageDelegateDiv.transforms();
            }
            return stageDelegateDiv;
        };

        /**
        * @method egret.StageText#add
        */
        StageText.prototype._add = function () {
            var div = this.div;
            if (div && !div.parentNode) {
                var stageDelegateDiv = this.getStageDelegateDiv();
                stageDelegateDiv.appendChild(div);
            }
        };

        /**
        * @method egret.StageText#remove
        */
        StageText.prototype._remove = function () {
            var div = this.div;
            if (div && div.parentNode) {
                div.parentNode.removeChild(div);
            }
        };

        StageText.prototype.changePosition = function (x, y) {
            var scaleX = egret.StageDelegate.getInstance().getScaleX();
            var scaleY = egret.StageDelegate.getInstance().getScaleY();

            this.div.position.x = x * scaleX;
            this.div.position.y = y * scaleY;
            this.div.transforms();
        };

        StageText.prototype.changeSize = function (width, height) {
            this.inputElement.style.width = width + "px";

            //            this.inputElement.style.height = height + "px";
            this.div.style.width = width + "px";

            //            this.div.style.height = height + "px";
            this.div.transforms();
        };

        StageText.prototype.setSize = function (value) {
            this._size = value;
            this.inputElement.style.fontSize = this._size + "px";
        };

        StageText.prototype.setTextColor = function (value) {
            this.inputElement.style.color = value;
        };
        return StageText;
    })(egret.HashObject);
    egret.StageText = StageText;
    StageText.prototype.__class__ = "egret.StageText";
})(egret || (egret = {}));
