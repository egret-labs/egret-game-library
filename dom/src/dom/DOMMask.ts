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

    export function _setScrollRect(rect:egret.Rectangle, domDiv:DOMDiv):void {
//        domDiv.changeStyle("overflow", "auto");
//        var str:string = "rect(" + 0 + "px "
//            + (0 + rect.width) + "px "
//            + (0 + rect.height) + "px "
//            + 0 + "px)";//(y, x + w, y + h, x)
//        domDiv.changeStyle("clip", str);
//        domDiv._currentDiv.scrollLeft = rect.x;
//        domDiv._currentDiv.scrollTop = rect.y;

        var str:string = "rect(" + rect.y + "px "
            + (rect.x + rect.width) + "px "
            + (rect.y + rect.height) + "px "
            + rect.x + "px)";//(y, x + w, y + h, x)
        domDiv.changeStyle("clip", str, "");
    }

    export function _setMask(rect:egret.Rectangle, domDiv:DOMDiv):void {
        var str:string = "rect(" + rect.y + "px "
            + (rect.x + rect.width) + "px "
            + (rect.y + rect.height) + "px "
            + rect.x + "px)";//(y, x + w, y + h, x)
        domDiv.changeStyle("clip", str, "");
    }

    export function _setGraphics(domDiv:DOMDiv):void {
        return;
//        if (this.divRenderContext == null) {
//
//            var domCanvas:DOMDiv = DOMDiv.createCanvas("");
//            domCanvas.changeStyle("opacity", 0.8);
//            domCanvas.changeStyle("position", "absolute");
//            domCanvas.setY(0);
//            domCanvas.setX(0);
//
//            var canvas2:any = document.getElementById(egret.StageDelegate.canvas_name);
//
//            setMask(new egret.Rectangle(0, 0, canvas2.width, canvas2.height), domCanvas);
//
//        domCanvas.setWidth(canvas2.width);
//        domCanvas.setHeight(canvas2.height);
//            domCanvas.changeStyle("overflow", "hidden");
//            domCanvas.visible = true;
//            domCanvas.changeCss3Style("backgroundPosition", "-100px-100px");
//            domCanvas.changeCss3Style("zIndex", -1);
//            domDiv.addChild(domCanvas);
//            this.divRenderContext = egret.RendererContext.createRendererContext(domCanvas.domDiv);
//        }
//        this._draw(this.divRenderContext);
    }

}