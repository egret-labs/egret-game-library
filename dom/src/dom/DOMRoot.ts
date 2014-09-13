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

    export function _wrapper(displayObject:egret.DisplayObject, childIdx:number, parentDiv:DOMDiv):void {

        displayObject._setDirty();

        //加入当前 displayObject 的div
        var currentDiv = _createDisplayObjectDiv(displayObject);
        if (currentDiv.parent != null) {//说明已经加入在某个dom节点上，不一定是在显示上
            return;
        }
        if (parentDiv) {
            parentDiv.addChildAt(currentDiv, childIdx);
        }

        if (displayObject instanceof egret.DisplayObjectContainer && !displayObject["alwaysCanvas"]) {
            var container:egret.DisplayObjectContainer = <egret.DisplayObjectContainer>displayObject;
            //创建 子元件的div
            for (var i = 0 , length = container._children.length; i < length; i++) {
                var child = container._children[i];

                _wrapper(child, i, currentDiv);
            }

            if (displayObject["__use__dom"] != true) {
                _overrideDoAddChild.call(container);
                _overrideDoRemoveChild.call(container);
            }
        }

        if (displayObject["__use__dom"]) {
            return;
        }
        displayObject._calculateWorldform = function () {

        };

        if (!displayObject["alwaysCanvas"] && displayObject != egret.MainContext.instance.stage) {
            _overrideSetDirty.call(displayObject);
        }
        displayObject["__use__dom"] = true;
    }

    export var _renderDisplays:Array<any> = [];
    export var _alwaysRenderDisplays:Array<any> = [];

    /**
     * 重写加入方法
     */
    export function _overrideSetDirty():void {
        this.__tempSetDirty = this._setDirty;
        if (this.getDirty()) {
            egret.dom._renderDisplays.push(this);
        }
        this._setDirty = function ():void {
            egret.dom._renderDisplays.push(this);
            this.__tempSetDirty.call(this);
        };
    }

    /**
     * 重写加入方法
     */
    export function _overrideDoAddChild():void {
        this.__tempDoAddChild = this._doAddChild;
        this._doAddChild = function (child:egret.DisplayObject, index:number, notifyListeners:boolean = true):egret.DisplayObject {
            _wrapper(child, index, this["__dom_node"]);
            this.__tempDoAddChild.call(this, child, index, notifyListeners);
            return child;
        };
    }

    /**
     * 重写删除方法
     */
    export function _overrideDoRemoveChild():void {
        this.__tempDoRemoveChild = this._doRemoveChild;
        this._doRemoveChild = function (index:number, notifyListeners:boolean = true):egret.DisplayObject {
            var locChildren = this._children;
            var child:DisplayObject = locChildren[index];
            if (child["__dom_node"]) {
                child["__dom_node"].removeFromParent();
            }

            return this.__tempDoRemoveChild.call(this, index, notifyListeners);
        };
    }
}

