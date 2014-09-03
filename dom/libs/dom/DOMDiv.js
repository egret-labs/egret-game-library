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
        var DOMDiv = (function () {
            function DOMDiv(elementName, id) {
                this._touchChildren = false;
                this._visible = true;
                /**
                * 当前img的url地址
                * @type {string}
                */
                this.bitmapSrc = "";
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
            DOMDiv.prototype._overrideFunctions = function () {
            };

            DOMDiv.prototype.addChildAt = function (div, index) {
                div.parent = this;

                if (index < 0 || index >= this._children.length) {
                    this._currentDiv.appendChild(div.domDiv);
                    this._children.push(div);
                } else {
                    this._currentDiv.insertBefore(div.domDiv, this._children[index].domDiv);
                    this._children.splice(index, 0, div);
                }
                div._addToParent();
                return div;
            };

            DOMDiv.prototype.addChild = function (div) {
                return this.addChildAt(div, this.numChildren);
            };

            Object.defineProperty(DOMDiv.prototype, "numChildren", {
                get: function () {
                    return this._children.length;
                },
                enumerable: true,
                configurable: true
            });

            DOMDiv.prototype.getChildAt = function (index) {
                return this._children[index];
            };

            DOMDiv.prototype.removeChildAt = function (index) {
                if (index < 0 || index >= this._children.length) {
                    return null;
                }
                var div = this._children[index];
                div.parent = null;
                this._children.splice(index, 1);

                //从html中删除
                this._currentDiv.removeChild(div.domDiv);

                div._removeFromParent();
                return div;
            };

            /**
            * 从DIV节点移除处理
            */
            DOMDiv.prototype._removeFromParent = function () {
            };

            /**
            * 加入到DIV节点处理
            */
            DOMDiv.prototype._addToParent = function () {
            };

            DOMDiv.prototype.removeChild = function (div) {
                this.removeChildAt(this._children.indexOf(div));
                return div;
            };

            DOMDiv.prototype.removeFromParent = function () {
                if (this && this.parent) {
                    this.parent.removeChild(this);
                }
                return this;
            };

            Object.defineProperty(DOMDiv.prototype, "domDiv", {
                get: function () {
                    return this._currentDiv;
                },
                enumerable: true,
                configurable: true
            });

            DOMDiv.prototype.setText = function (text) {
                if ("innerText" in this._currentDiv) {
                    this._currentDiv.innerText = text;
                } else if ("textContent" in this._currentDiv) {
                    this._currentDiv.textContent = text;
                }
            };

            DOMDiv.prototype.setX = function (x) {
                this.changeStyle("left", x + "px");
            };

            DOMDiv.prototype.setY = function (y) {
                this.changeStyle("top", y + "px");
            };

            DOMDiv.prototype.changeProperty = function (type, value) {
                this._currentDiv.setAttribute(type, value);
            };

            DOMDiv.prototype.changeTrans = function (type, value) {
                this.changeCss3Style(egret.dom._getTrans(type), value);
            };

            /**
            * 修改css3 style
            * @param type
            * @param value
            */
            DOMDiv.prototype.changeCss3Style = function (type, value) {
                var index = this._style3Types.indexOf(type);
                if (index >= 0) {
                    this._style3Types.splice(index, 1);
                    this._style3Values.splice(index, 1);
                }

                this._style3Types.push(type);
                this._style3Values.push(value);
            };

            /**
            * 修改style
            * @param type
            * @param value
            */
            DOMDiv.prototype.changeStyle = function (type, value) {
                var index = this._styleTypes.indexOf(type);
                if (index >= 0) {
                    this._styleTypes.splice(index, 1);
                    this._styleValues.splice(index, 1);
                }

                this._styleTypes.push(type);
                this._styleValues.push(value);
            };

            /**
            * 刷新style
            */
            DOMDiv.prototype.reflow = function () {
                if (!this.visible) {
                    this.changeStyle("display", "none");
                    this.changeStyle("pointerEvents", "none");
                    this._currentDiv.style.display = "none";
                    this._currentDiv.style.pointerEvents = "none";
                    return;
                } else {
                    this.changeStyle("display", "block");

                    //判断事件点击
                    if (this instanceof dom.DOMCanvas) {
                        this.changeStyle("pointerEvents", "none");
                    } else if (egret.dom.useScroll) {
                        if (this.parent && !this.parent.touchChildren) {
                            this.changeStyle("pointerEvents", "none");
                        } else if (!this.touchEnabled && !this.touchChildren) {
                            this.changeStyle("pointerEvents", "none");
                        } else if (!this.touchEnabled) {
                            if (!(this instanceof dom.DOMBitmap)) {
                                this.changeStyle("width", "0px");
                                this.changeStyle("height", "0px");
                            }
                            this.changeStyle("pointerEvents", "auto");
                        } else {
                            this.changeStyle("pointerEvents", "auto");
                        }
                    } else {
                        this.changeStyle("pointerEvents", "none");
                    }
                }

                //修改style值
                if (false) {
                    var strCss = "";
                    for (var i = 0; i < this._styleTypes.length; i++) {
                        strCss += this._styleTypes[i] + ":" + this._styleValues[i];
                        if (i != this._styleTypes.length - 1) {
                            strCss += ";";
                        }
                    }
                    this._currentDiv.style.cssText = strCss;
                } else {
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
            };

            Object.defineProperty(DOMDiv.prototype, "touchEnabled", {
                /**
                * 指定此对象是否接收鼠标/触摸事件
                * @member {boolean} egret.DOMDiv#touchEnabled
                * @default false
                */
                get: function () {
                    return this._touchEnabled;
                },
                set: function (value) {
                    this._touchEnabled = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(DOMDiv.prototype, "touchChildren", {
                /**
                * 指定此对象的子项以及子孙项是否接收鼠标/触摸事件
                * @member {boolean} egret.DOMDiv#touchChildren
                */
                get: function () {
                    return this._touchChildren;
                },
                set: function (value) {
                    this._touchChildren = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(DOMDiv.prototype, "visible", {
                /**
                * 显示对象是否可见。
                * @member {boolean} egret.DOMDiv#visible
                */
                get: function () {
                    return this._visible;
                },
                set: function (value) {
                    this._visible = value;
                },
                enumerable: true,
                configurable: true
            });

            return DOMDiv;
        })();
        dom.DOMDiv = DOMDiv;
        DOMDiv.prototype.__class__ = "egret.dom.DOMDiv";
    })(egret.dom || (egret.dom = {}));
    var dom = egret.dom;
})(egret || (egret = {}));
