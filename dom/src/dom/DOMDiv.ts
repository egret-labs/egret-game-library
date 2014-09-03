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

        //保存style属性
        private _styleTypes:Array<string>;
        private _styleValues:Array<any>;
        //保存css3 style属性
        private _style3Types:Array<string>;
        private _style3Values:Array<any>;

        private _children:Array<any>;
        //父节点
        public parent:DOMDiv;

        constructor(elementName:string, id:string) {
            this._currentDiv = egret.Browser.getInstance().$new(elementName);
            if (id != "") {
                this._currentDiv.id = id;
            }

            this._styleTypes = [];
            this._styleValues = [];

            this._style3Types = [];
            this._style3Values = [];
            this._children = [];
            this.changeTrans("transformOrigin", "0% 0% 0px");
            this.setY(0);
            this.setX(0);
        }

        /**
         * 重写原显示对象方法
         * @private
         */
        public _overrideFunctions ():void {

        }

        public addChildAt(div:DOMDiv, index:number):DOMDiv {
            div.parent = this;

            if (index < 0 || index >= this._children.length) {
                this._currentDiv.appendChild(div.domDiv);
                this._children.push(div);
            }
            else {
                this._currentDiv.insertBefore(div.domDiv, this._children[index].domDiv);
                this._children.splice(index, 0, div);
            }
            div._addToParent();
            return div;
        }

        public addChild(div:DOMDiv):DOMDiv {
            return this.addChildAt(div, this.numChildren);
        }

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
            this._currentDiv.removeChild(div.domDiv);

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

        public get domDiv() {
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

        public setX(x:number):void {
            this.changeStyle("left", x + "px");
        }

        public setY(y:number):void {
            this.changeStyle("top", y + "px");
        }

        public changeProperty(type:string, value:any):void {
            this._currentDiv.setAttribute(type, value);
        }

        public changeTrans(type:string, value:any):void {
            this.changeCss3Style(egret.dom._getTrans(type), value);
        }

        /**
         * 修改css3 style
         * @param type
         * @param value
         */
        public changeCss3Style(type:string, value:any):void {
            var index = this._style3Types.indexOf(type);
            if (index >= 0) {
                this._style3Types.splice(index, 1);
                this._style3Values.splice(index, 1);
            }

            this._style3Types.push(type);
            this._style3Values.push(value);
        }

        /**
         * 修改style
         * @param type
         * @param value
         */
        public changeStyle(type:string, value:any):void {
            var index = this._styleTypes.indexOf(type);
            if (index >= 0) {
                this._styleTypes.splice(index, 1);
                this._styleValues.splice(index, 1);
            }

            this._styleTypes.push(type);
            this._styleValues.push(value);
        }

        /**
         * 刷新style
         */
        public reflow():void {
            if (!this.visible) {//不显示
                this.changeStyle("display", "none");
                this.changeStyle("pointerEvents", "none");
                this._currentDiv.style.display = "none";
                this._currentDiv.style.pointerEvents = "none";
                return;
            }
            else {
                this.changeStyle("display", "block");

                //判断事件点击
                if (this instanceof DOMCanvas) {
                    this.changeStyle("pointerEvents", "none");
                }
                else if (egret.dom.useScroll) {
                    if (this.parent && !this.parent.touchChildren) {//父层里设置touchChildren = false，当前不可点击
                        this.changeStyle("pointerEvents", "none");
                    }
                    else if (!this.touchEnabled && !this.touchChildren) {//当前层设置touchEnabled touchChildren = false，当前不可点击
                        this.changeStyle("pointerEvents", "none");
                    }
                    else if (!this.touchEnabled) {//只有touchEnabled=false，当前可以点击，但是需要在响应事件里直接return
                        if (!(this instanceof DOMBitmap)) {
                            this.changeStyle("width", "0px");
                            this.changeStyle("height", "0px");
                        }
                        this.changeStyle("pointerEvents", "auto");
                    }
                    else {
                        this.changeStyle("pointerEvents", "auto");
                    }
                }
                else {
                    this.changeStyle("pointerEvents", "none");
                }
            }

            //修改style值
            if (false) {
                var strCss:string = "";
                for (var i = 0; i < this._styleTypes.length; i++) {
                    strCss += this._styleTypes[i] + ":" + this._styleValues[i];
                    if (i != this._styleTypes.length - 1) {
                        strCss += ";";
                    }
                }
                this._currentDiv.style.cssText = strCss;
            }
            else {
                for (var i = 0; i < this._styleTypes.length; i++) {
                    if (this._currentDiv.style[this._styleTypes[i]] != this._styleValues[i]) {
                        this._currentDiv.style[this._styleTypes[i]] = this._styleValues[i];
                    }
                }
            }

            for (var i = 0; i < this._style3Types.length; i++) {
                if (this._currentDiv.style[this._style3Types[i]] != this._style3Values[i]) {
                    this._currentDiv.style[this._style3Types[i]] = this._style3Values[i];
                }
            }
        }


        private _touchEnabled:boolean;
        /**
         * 指定此对象是否接收鼠标/触摸事件
         * @member {boolean} egret.DOMDiv#touchEnabled
         * @default false
         */
        public get touchEnabled():boolean {
            return this._touchEnabled;
        }
        public set touchEnabled(value:boolean) {
            this._touchEnabled = value;
        }

        private _touchChildren:boolean = false;
        /**
         * 指定此对象的子项以及子孙项是否接收鼠标/触摸事件
         * @member {boolean} egret.DOMDiv#touchChildren
         */
        public get touchChildren():boolean {
            return this._touchChildren;
        }
        public set touchChildren(value:boolean) {
            this._touchChildren = value;
        }

        private _visible:boolean = true;
        /**
         * 显示对象是否可见。
         * @member {boolean} egret.DOMDiv#visible
         */
        public get visible():boolean {
            return this._visible;
        }

        public set visible(value:boolean) {
            this._visible = value;
        }

        /**
         * 当前img的url地址
         * @type {string}
         */
        public bitmapSrc:string = "";

    }

}

