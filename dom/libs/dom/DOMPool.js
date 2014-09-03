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
    (function (_dom) {
        var DOMPool = (function () {
            function DOMPool() {
            }
            /**
            * 获取一个普通的div
            * @param id
            * @returns {egret.dom.DOMDiv}
            */
            DOMPool.getDiv = function (id) {
                if (typeof id === "undefined") { id = ""; }
                return new _dom.DOMDiv("div", id);
            };

            /**
            * 获取img
            * @param src
            * @param id
            * @returns {DOMDiv}
            */
            DOMPool.getImg = function (src, id) {
                if (typeof id === "undefined") { id = ""; }
                var dom = new _dom.DOMDiv("img", id);
                dom.changeProperty("crossOrigin", "Anonymous");
                dom.changeProperty("src", src);
                dom.bitmapSrc = src;
                return dom;
            };

            /**
            * 获取Bitmap对应的Div
            * @param bitmap
            * @param id
            * @returns {egret.dom.DOMBitmap}
            */
            DOMPool.getBitmap = function (bitmap, id) {
                if (typeof id === "undefined") { id = ""; }
                return new _dom.DOMBitmap(bitmap, id);
            };

            /**
            * 获得TextField对应的div
            * @param textField
            * @param id
            * @returns {egret.dom.DOMTextField}
            */
            DOMPool.getTextField = function (textField, id) {
                if (typeof id === "undefined") { id = ""; }
                return new _dom.DOMTextField(textField, id);
            };

            /**
            * 获得Canvas
            * @param displayObjectContainer
            * @param id
            * @returns {egret.dom.DOMCanvas}
            */
            DOMPool.getCanvas = function (displayObjectContainer, id) {
                if (typeof id === "undefined") { id = ""; }
                return new _dom.DOMCanvas(displayObjectContainer, id);
            };

            /**
            * 获得iscroll对应的Div
            * @param displayObject
            * @param id
            * @returns {egret.dom.DOMScroll}
            */
            DOMPool.getScroll = function (displayObject, id) {
                if (typeof id === "undefined") { id = ""; }
                return new _dom.DOMScroll(displayObject, id);
            };

            /**
            * 获得DisplayObject对应的Div
            * @param displayObject
            * @param id
            * @returns {egret.dom.DOMDisplayObject}
            */
            DOMPool.getDisplayObject = function (displayObject, id) {
                if (typeof id === "undefined") { id = ""; }
                return new _dom.DOMDisplayObject(displayObject, id);
            };
            return DOMPool;
        })();
        _dom.DOMPool = DOMPool;
        DOMPool.prototype.__class__ = "egret.dom.DOMPool";

        _dom.rootDOMDiv;

        function _createRootDocument() {
            if (egret.dom.rootDOMDiv == null) {
                var scale = egret.StageDelegate.getInstance()._scaleX;

                var canvas2 = document.getElementById(egret.StageDelegate.canvas_name);

                var domDiv = DOMPool.getDiv("renderDiv");
                domDiv.changeStyle("width", canvas2.width + "px");
                domDiv.changeStyle("height", canvas2.height + "px");
                domDiv.changeStyle("overflow", "hidden");

                var transformStr = "scale(" + scale + "," + scale + ")";
                domDiv.changeTrans("transform", transformStr);
                domDiv.visible = true;
                domDiv.touchChildren = true;
                domDiv.touchEnabled = true;
                domDiv.reflow();
                egret.dom.rootDOMDiv = domDiv;

                var canvas = document.getElementById(egret.StageDelegate.canvas_div_name);
                canvas.appendChild(domDiv.domDiv);
            }

            return egret.dom.rootDOMDiv;
        }
        _dom._createRootDocument = _createRootDocument;

        function _createDisplayObjectDiv(displayObject) {
            var dom;
            if (!displayObject["__dom_node"]) {
                if ("scrollStart" in displayObject && egret.dom.useScroll) {
                    dom = DOMPool.getScroll(displayObject);
                } else if (displayObject instanceof egret.Bitmap) {
                    dom = DOMPool.getBitmap(displayObject);
                } else if (displayObject instanceof egret.TextField) {
                    dom = DOMPool.getTextField(displayObject);
                } else {
                    if (displayObject instanceof egret.DisplayObjectContainer && displayObject["alwaysCanvas"]) {
                        dom = DOMPool.getCanvas(displayObject);
                    } else {
                        dom = DOMPool.getDisplayObject(displayObject);
                    }
                }
                displayObject["__dom_node"] = dom;
            } else {
                dom = displayObject["__dom_node"];
            }
            return dom;
        }
        _dom._createDisplayObjectDiv = _createDisplayObjectDiv;
    })(egret.dom || (egret.dom = {}));
    var dom = egret.dom;
})(egret || (egret = {}));
