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
        function _wrapper(displayObject, childIdx, parentDiv) {
            displayObject._setDirty();

            //加入当前 displayObject 的div
            var currentDiv = dom._createDisplayObjectDiv(displayObject);
            if (currentDiv.parent != null) {
                return;
            }
            if (parentDiv) {
                parentDiv.addChildAt(currentDiv, childIdx);
            }

            if (displayObject instanceof egret.DisplayObjectContainer && !displayObject["alwaysCanvas"]) {
                var container = displayObject;

                for (var i = 0, length = container._children.length; i < length; i++) {
                    var child = container._children[i];

                    _wrapper(child, i, currentDiv);
                }

                _overrideDoAddChild.apply(container);
                _overrideDoRemoveChild.apply(container);
            }

            displayObject._calculateWorldform = function () {
            };

            if (displayObject["__use__dom"]) {
                return;
            }
            displayObject["__use__dom"] = true;
        }
        dom._wrapper = _wrapper;

        /**
        * 重写加入方法
        */
        function _overrideDoAddChild() {
            this.__tempDoAddChild = this._doAddChild;
            this._doAddChild = function (child, index, notifyListeners) {
                if (typeof notifyListeners === "undefined") { notifyListeners = true; }
                _wrapper(child, index, this["__dom_node"]);
                this.__tempDoAddChild.apply(this, [child, index, notifyListeners]);
                return child;
            };
        }
        dom._overrideDoAddChild = _overrideDoAddChild;

        /**
        * 重写删除方法
        */
        function _overrideDoRemoveChild() {
            this.__tempDoRemoveChild = this._doRemoveChild;
            this._doRemoveChild = function (index, notifyListeners) {
                if (typeof notifyListeners === "undefined") { notifyListeners = true; }
                var locChildren = this._children;
                var child = locChildren[index];
                if (child["__dom_node"]) {
                    child["__dom_node"].removeFromParent();
                }

                return this.__tempDoRemoveChild.apply(this, [index, notifyListeners]);
            };
        }
        dom._overrideDoRemoveChild = _overrideDoRemoveChild;
    })(egret.dom || (egret.dom = {}));
    var dom = egret.dom;
})(egret || (egret = {}));
