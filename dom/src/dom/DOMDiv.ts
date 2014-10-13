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
    export class DOMDiv {

        public _currentDiv;

        private _showStyles:Object;
        private _changeStyles:Object;

        //父节点
        public parent:DOMDiv;

        constructor(elementName:string, id:string) {
            this._currentDiv = egret.Browser.getInstance().$new(elementName);
            if (id != "") {
                this._currentDiv.id = id;
            }

            this._showStyles = {};
            this._changeStyles = {};

            this._children = [];
//            this.changeTrans("transformOrigin", "0% 0% 0px");
            this.setY(0);
            this.setX(0);

            this.changeStyle("display", "block", "");
            this.changeStyle("position", "absolute", "");
            this.changeStyle("margin", "0 auto", "");
            this.changeStyle("padding", "0", "");
            this.changeStyle("border", "0", "");
            this.changeStyle("outline", "medium", "");
        }

        /**
         * 重写原显示对象方法
         * @private
         */
        public _overrideFunctions():void {

        }

        public addChildAt(div:DOMDiv, index:number):DOMDiv {
            div.parent = this;

            if (index < 0 || index >= this._children.length) {
                this._currentDiv.appendChild(div._currentDiv);
                this._children.push(div);
            }
            else {
                this._currentDiv.insertBefore(div._currentDiv, this._children[index]._currentDiv);
                this._children.splice(index, 0, div);
            }
            div._addToParent();
            return div;
        }

        public addChild(div:DOMDiv):DOMDiv {
            return this.addChildAt(div, this.numChildren);
        }

        public _children:Array<any>;

        public get numChildren():number {
            return this._children.length;
        }

        public getChildAt(index:number):DOMDiv {
            return this._children[index];
        }

        public removeChildAt(index:number):DOMDiv {
            if (index < 0 || index >= this._children.length) {
                return null;
            }
            var div:DOMDiv = this._children[index];
            div.parent = null;
            this._children.splice(index, 1);
            //从html中删除
            this._currentDiv.removeChild(div._currentDiv);

            div._removeFromParent();
            return div;
        }

        /**
         * 从DIV节点移除处理
         */
        public _removeFromParent():void {

        }

        /**
         * 加入到DIV节点处理
         */
        public _addToParent():void {

        }

        public removeChild(div:DOMDiv):DOMDiv {
            this.removeChildAt(this._children.indexOf(div));
            return div;
        }

        public removeFromParent():DOMDiv {
            if (this && this.parent) {
                this.parent.removeChild(this);
            }
            return this;
        }


        public getDomDiv() {
            return this._currentDiv;
        }

        public setText(text:string):void {
            if ("innerText" in this._currentDiv) {
                this._currentDiv.innerText = text;
            }
            else if ("textContent" in this._currentDiv) {
                this._currentDiv.textContent = text;
            }
        }

        public hasStyle(type:string):boolean {
            return this._showStyles[type];
        }

        public setX(x:number):void {
            this.changeStyle("left", Math.round(x) + "px", "0px");
        }

        public setY(y:number):void {
            this.changeStyle("top", Math.round(y) + "px", "0px");
        }

        public setWidth(w:number):void {
            this.changeStyle("width", Math.round(w) + "px", "0px");
        }

        public setHeight(h:number):void {
            this.changeStyle("height", Math.round(h) + "px", "0px");
        }

        public changeProperty(type:string, value:any):void {
            this._currentDiv.setAttribute(type, value);
        }

        public changeTrans(type:string, value:any):void {
            this.changeStyle(egret.dom._getTrans(type), value, "");
        }

        /**
         * 修改style
         * @param type
         * @param value
         */
        public changeStyle(type:string, value:any, defaultValue:any):void {
            if (value == defaultValue) {
                if (this._showStyles[type] == null) {
                    return;
                }
            }
            if (this._showStyles[type] == value) {
                return;
            }
            this._changeStyles[type] = value;
            this._showStyles[type] = value;
        }

        /**
         * 显示对象是否可见。
         * @member {boolean} egret.DOMDiv#visible
         */
        private _visible:boolean = true;

        public hide():void {
            if (!this._visible) {
                return;
            }
            this._visible = false;
            this.changeStyle("display", "none", "");
//            this.changeStyle("pointerEvents", "none", "");
            this._currentDiv.style.display = "none";
//            this._currentDiv.style.pointerEvents = "none";

        }

        /**
         * 刷新style
         */
        public reflow():void {
            this._visible = true;
            this.changeStyle("display", "block", "block");

            //判断事件点击
            if (this instanceof DOMCanvas) {
//                this.changeStyle("pointerEvents", "none", "");
            }
            else if (egret.dom.useScroll) {
                if (this.parent && !this.parent.touchChildren) {//父层里设置touchChildren = false，当前不可点击
                    this.changeStyle("pointerEvents", "none", "");
                }
                else if (!this.touchEnabled && !this.touchChildren) {//当前层设置touchEnabled touchChildren = false，当前不可点击
                    this.changeStyle("pointerEvents", "none", "");
                }
                else if (!this.touchEnabled) {//只有touchEnabled=false，当前可以点击，但是需要在响应事件里直接return
                    if (!(this instanceof DOMBitmap)) {
                        this.changeStyle("width", "0px", "0px");
                        this.changeStyle("height", "0px", "0px");
                    }
                    this.changeStyle("pointerEvents", "auto", "");
                }
                else {
                    this.changeStyle("pointerEvents", "auto", "");
                }
            }
            else {
//                this.changeStyle("pointerEvents", "none", "");
            }


            for (var key in this._changeStyles) {
                this._currentDiv.style[key] = this._changeStyles[key];
            }

            this._changeStyles = {};
        }

        public rotation:number = 0;

        public skew:number = 0;

        public scaleX:number = 1;

        public scaleY:number = 1;

        /**
         * 指定此对象是否接收鼠标/触摸事件
         * @member {boolean} egret.DOMDiv#touchEnabled
         * @default false
         */
        public touchEnabled:boolean = false;

        /**
         * 指定此对象的子项以及子孙项是否接收鼠标/触摸事件
         * @member {boolean} egret.DOMDiv#touchChildren
         */
        public touchChildren:boolean = false;

        /**
         * 当前img的url地址
         * @type {string}
         */
        public bitmapSrc:string = "";

    }

}

