var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var egret;
(function (egret) {
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
    (function (dom) {
        var DOMCanvas = (function (_super) {
            __extends(DOMCanvas, _super);
            function DOMCanvas(displayObject, id) {
                _super.call(this, "canvas", id);

                this._doc = displayObject;

                this._render = new (egret.getDefinitionByName("egret.HTML5CanvasRenderer"))(this._currentDiv);

                this.initWorldTransform = new egret.Matrix();

                this.changeProperty("width", this._doc.width);
                this.changeProperty("height", this._doc.height);

                this.changeStyle("width", Math.round(this._doc.width) + "px");
                this.changeStyle("height", Math.round(this._doc.height) + "px");

                this._overrideFunctions();
            }
            DOMCanvas.prototype._overrideFunctions = function () {
                _super.prototype._overrideFunctions.call(this);

                var self = this;

                this._doc._draw = function (renderContext) {
                    self._draw.apply(self, [renderContext]);
                };
            };

            DOMCanvas.prototype._draw = function (renderContext) {
                if (!this._doc.visible) {
                    this.visible = false;
                    this.reflow();
                }

                if (this._doc.getDirty()) {
                    dom._renderObject(this._doc, this);
                }

                this._render.clearScreen();

                for (var i = 0; i < this._doc.numChildren; i++) {
                    var child = this._doc.getChildAt(i);
                    child._draw(this._render);
                }
            };
            return DOMCanvas;
        })(dom.DOMDiv);
        dom.DOMCanvas = DOMCanvas;
        DOMCanvas.prototype.__class__ = "egret.dom.DOMCanvas";
    })(egret.dom || (egret.dom = {}));
    var dom = egret.dom;
})(egret || (egret = {}));
