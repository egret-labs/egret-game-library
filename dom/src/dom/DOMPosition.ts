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

    /**
     * 更新DOM节点坐标、缩放、旋转、斜切、透明度、隐藏显示
     * @param domDiv
     * @param displayObject
     */
    export function _updatePosition(domDiv:DOMDiv, displayObject:egret.DisplayObject):void {
        if (displayObject == egret.MainContext.instance.stage) {
            domDiv.reflow();
            return;
        }

        var visible = displayObject.visible;

        if (!visible) {
            domDiv.visible = false;
            domDiv.reflow();
            return;
        }
        else {
            domDiv.visible = true;
        }

        var widthScale:number = displayObject.scaleX;//宽度修改导致的缩放
        var heightScale:number = displayObject.scaleY;//高度修改导致的缩放
        var offsetY = 0, offsetX = 0;
        if (displayObject instanceof egret.Bitmap) {
            var bitmap:egret.Bitmap = <egret.Bitmap>displayObject;
            if (bitmap.scale9Grid == null && bitmap.texture) {
                widthScale *= bitmap.width / bitmap.texture._textureWidth;
                heightScale *= bitmap.height / bitmap.texture._textureHeight;

                offsetX = bitmap.texture._offsetX || 0;
                offsetY = bitmap.texture._offsetY || 0;
            }
        }

        var transformStr:string = "";

        var initX:number = displayObject.x + offsetX;
        var initY:number = displayObject.y + offsetY;

        var p = displayObject._getOffsetPoint();
        var anchorOffsetX = p.x;
        var anchorOffsetY = p.y;

        var x:number = Math.round(initX - anchorOffsetX);
        var y:number = Math.round(initY - anchorOffsetY);
        if (egret.dom._hasTransform) {
            transformStr += "translate(" + x + "px, " + y + "px) ";
        }
        else {
            domDiv.setX(x);
            domDiv.setY(y);
        }

        domDiv.changeTrans("transformOrigin", anchorOffsetX + "px " + anchorOffsetY + "px 0px");

        var skewScaleY:number = 1;
        if (displayObject.skewX != 0 || displayObject.skewY != 0) {
            transformStr += "rotate(" + (displayObject.skewY) + "deg) ";
            var skew:number = displayObject.skewX - displayObject.skewY;
            transformStr += "skew(" + (-skew) + "deg) ";
            skewScaleY = Math.cos(skew / 180 * Math.PI);
        } else {
            transformStr += "rotate(" + (displayObject.rotation) + "deg) ";
        }
        heightScale *= skewScaleY;

        transformStr += "scale(" + widthScale + ", " + heightScale + ")";

        domDiv.changeTrans("transitionDelay", "0");

        domDiv.changeTrans("transform", transformStr);
        domDiv.changeStyle("opacity", displayObject.alpha);
        domDiv.reflow();
    }
}
