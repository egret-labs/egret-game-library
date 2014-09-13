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

    export class DOMPool {
        /**
         * 获取一个普通的div
         * @param id
         * @returns {egret.dom.DOMDiv}
         */
        public static getDiv(id:string = ""):DOMDiv {
            return new DOMDiv("div", id);
        }

        /**
         * 获取img
         * @param src
         * @param id
         * @returns {DOMDiv}
         */
        public static getImg(src:string, id:string = ""):DOMDiv {
            var dom:DOMDiv = new DOMDiv("img", id);
            dom.changeProperty("crossOrigin", "Anonymous");
            dom.changeProperty("src", src);
            dom.bitmapSrc = src;
            return dom;
        }

        /**
         * 获取Bitmap对应的Div
         * @param bitmap
         * @param id
         * @returns {egret.dom.DOMBitmap}
         */
        public static getBitmap(bitmap:egret.Bitmap, id:string = ""):DOMDiv {
            return new DOMBitmap(bitmap, id);
        }

        /**
         * 获得TextField对应的div
         * @param textField
         * @param id
         * @returns {egret.dom.DOMTextField}
         */
        public static getTextField(textField:egret.TextField, id:string = ""):DOMDiv {
            return new DOMTextField(textField, id);
        }

        /**
         * 获得Canvas
         * @param displayObjectContainer
         * @param id
         * @returns {egret.dom.DOMCanvas}
         */
        public static getCanvas(displayObjectContainer:egret.DisplayObjectContainer, id:string = ""):DOMDiv {
            return new DOMCanvas(displayObjectContainer, id);
        }

        /**
         * 获得iscroll对应的Div
         * @param displayObject
         * @param id
         * @returns {egret.dom.DOMScroll}
         */
        public static getScroll(displayObject:egret.DisplayObject, id:string = ""):DOMDiv {
            return new DOMDisplayObject(displayObject, id);
        }

        /**
         * 获得DisplayObject对应的Div
         * @param displayObject
         * @param id
         * @returns {egret.dom.DOMDisplayObject}
         */
        public static getDisplayObject(displayObject:egret.DisplayObject, id:string = ""):DOMDiv {
            return new DOMDisplayObject(displayObject, id);
        }
    }


    export var rootDOMDiv:DOMDiv;

    export function _createRootDocument():DOMDiv {
        if (egret.dom.rootDOMDiv == null) {
            var scale = egret.StageDelegate.getInstance()._scaleX;

            var canvas2:any = document.getElementById(egret.StageDelegate.canvas_name);

            var domDiv:DOMDiv = DOMPool.getDiv("renderDiv");
            domDiv.changeTrans("transformOrigin", "0% 0% 0px");

            domDiv.setWidth(canvas2.width);
            domDiv.setHeight(canvas2.height);

            domDiv.changeStyle("overflow", "hidden", "");
            domDiv.changeStyle("pointerEvents", "none", "");

            var transformStr = "scale(" + scale + ","
                + scale + ")";
            domDiv.changeTrans("transform", transformStr);
            domDiv.touchChildren = true;
            domDiv.touchEnabled = true;
            domDiv.reflow();
            egret.dom.rootDOMDiv = domDiv;

            var canvas = document.getElementById(egret.StageDelegate.canvas_div_name);
            canvas.appendChild(domDiv._currentDiv);
        }

        return egret.dom.rootDOMDiv;
    }

    export function _createDisplayObjectDiv(displayObject:egret.DisplayObject):DOMDiv {
        var dom:DOMDiv;
        if (!displayObject["__dom_node"]) {
            if ("scrollStart" in displayObject && egret.dom.useScroll) {//对滚动进行特殊处理
                dom = DOMPool.getScroll(displayObject);
            }
            else if (displayObject instanceof egret.Bitmap) {
                dom = DOMPool.getBitmap(<egret.Bitmap>displayObject);
            }
            else if (displayObject instanceof egret.TextField) {
                dom = DOMPool.getTextField(<egret.TextField>displayObject);
            }
            else {
                if (displayObject instanceof egret.DisplayObjectContainer && (<egret.DisplayObjectContainer>displayObject)["alwaysCanvas"]) {
                    dom = DOMPool.getCanvas(<egret.DisplayObjectContainer>displayObject);
                }
                else {
                    dom = DOMPool.getDisplayObject(displayObject);
                }
            }
            displayObject["__dom_node"] = dom;
        }
        else {
            dom = displayObject["__dom_node"];
        }
        return dom;
    }

}
