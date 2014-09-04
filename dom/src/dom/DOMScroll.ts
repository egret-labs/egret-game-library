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
    export class DOMScroll extends DOMDiv {

        private _displayObject:egret.DisplayObject;
        private _iscroll:egret.IScroll;

        constructor(displayObject:egret.DisplayObject, id:string) {
            super("div", id);

            this._displayObject = displayObject;
            this._iscroll = <egret.IScroll>(<any>displayObject);

            this._listeners = [];

            if (this._iscroll.getDirection() == egret.ScrollDirection.BOTH) {
                this.changeStyle("overflow", "auto");
            }
            else if (this._iscroll.getDirection() == egret.ScrollDirection.HORIZONTAL) {//水平
                this.changeStyle("overflowX", "auto");
                this.changeStyle("overflowY", "hidden");
            }
            else {
                this.changeStyle("overflowX", "hidden");
                this.changeStyle("overflowY", "auto");
            }

            this._overrideFunctions();
        }

        public _overrideFunctions():void {
            super._overrideFunctions();

            var self = this;

            this._displayObject._draw = function (renderContext:egret.RendererContext) {
                self._draw.apply(self, [renderContext]);
            };

            this._iscroll.scrollStart = function () {
            };
        }

        public _draw(renderContext:egret.RendererContext):void {
            if (!this._displayObject.visible) {
                this.visible = false;
                this.reflow();
                return;
            }

            if (this._displayObject.getDirty()) {

                this.changeStyle("width", Math.round(this._displayObject.width) + "px");
                this.changeStyle("height", Math.round(this._displayObject.height) + "px");

                //设置当前div可否点击情况
                this.touchEnabled = this._displayObject.touchEnabled;

                //修改当前位置
                _updatePosition(this, this._displayObject);
                _clear(this._displayObject);
            }

            //绘制children
            if (this._displayObject instanceof egret.DisplayObjectContainer) {
                var container:egret.DisplayObjectContainer = <egret.DisplayObjectContainer>this._displayObject;
                for (var i = 0 , length = container.numChildren; i < length; i++) {
                    var child = container.getChildAt(i);
                    child._draw(renderContext);
                }
            }
        }

        /**
         * 从DIV节点移除处理
         */
        public _removeFromParent():void {
            super._removeFromParent();

            this.removeListeners();
        }

        /**
         * 加入到DIV节点处理
         */
        public _addToParent():void {
            super._addToParent();

            this.addListeners();
        }

        private addListeners():void {
            if (this._listeners.length > 0) {
                return;
            }
            this.addEventListener("touchstart", false);
            this.addEventListener("touchmove", false);
            this.addEventListener("touchend", false);
            this.addEventListener("touchcancel", false);
            this.addEventListener("scroll", false);
        }

        private removeListeners():void {
            if (this._listeners.length <= 0) {
                return;
            }
            this.removeEventListener("touchstart", false);
            this.removeEventListener("touchmove", false);
            this.removeEventListener("touchend", false);
            this.removeEventListener("touchcancel", false);
            this.removeEventListener("scroll", false);
        }

        private _listeners:Array<any> = [];
        private addEventListener(type:string, useCapture:boolean):void {
            var self:DOMScroll = this;
            var tempListener = function (event) {
                if (!self.touchEnabled) {
                    return;
                }

                if (event.type == "scroll") {
                    self._iscroll.setScrollRect(self._currentDiv.scrollLeft, self._currentDiv.scrollTop);
                }
                else {
                    event["isScroll"] = true;
                }
            };
            this._listeners.push({"t": type, "u": useCapture, "tl": tempListener});

            this.domDiv.addEventListener(type, tempListener, useCapture);
        }

        private removeEventListener(type:string, useCapture:boolean):void {
            for (var i:number = 0; i < this._listeners.length; i++) {
                var info:Object = this._listeners[i];
                if (info["t"] == type && info["u"] == useCapture) {
                    this.domDiv.removeEventListener(info["t"], info["tl"], info["u"]);
                    this._listeners.splice(i, 1);
                    return;
                }
            }
        }
    }
}