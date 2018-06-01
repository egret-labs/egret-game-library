//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

egret.DisplayObject.prototype["$getConcatenatedVisible"] = function () {
    if (this.$parent) {
        let parentVisible = this.$parent.$getConcatenatedVisible();
        return parentVisible && this.$visible;
    }
    else {
        return this.$visible;
    }
}

namespace mouse {

    let currentTarget;
    let stageObj: egret.Stage;
    let isPC: boolean;

    const dispatch = function (type: string, bubbles: boolean, x: number, y: number) {
        if (type == MouseEvent.ROLL_OVER && currentTarget.isRollOver) {
            return;
        }
        if (type == MouseEvent.ROLL_OVER) {
            currentTarget.isRollOver = true;
        }
        else if (type == MouseEvent.ROLL_OUT) {
            delete currentTarget.isRollOver;
        }
        //处理鼠标手型
        if (isPC && currentTarget["buttonModeForMouse"]) {
            try {
                const canvas = stageObj.$displayList.renderBuffer.surface;
                if (type == MouseEvent.ROLL_OVER) {
                    canvas.style.cursor = "pointer";
                }
                else if (type == MouseEvent.ROLL_OUT) {
                    canvas.style.cursor = "auto";
                }
            }
            catch (e) {

            }
        }
        egret.TouchEvent.dispatchTouchEvent(currentTarget, type, bubbles, false, x, y, null);
    };

    /**
     * @language en_US
     * Enable mouse detection.
     * @version Egret 3.1.0
     * @platform Web
     */
    /**
     * @language zh_CN
     * 启用mouse检测。
     * @version Egret 3.1.0
     * @platform Web
     */
    export const enable = function (stage: egret.Stage) {
        isPC = egret.Capabilities.os == "Windows PC" || egret.Capabilities.os == "Mac OS";
        stageObj = stage;
        if (isPC) {
            addMouseWheelEvent();
        }
        let check = function (x: number, y: number) {
            if (currentTarget && !currentTarget.$stage) {
                dispatch(MouseEvent.MOUSE_OUT, true, x, y);
                dispatch(MouseEvent.ROLL_OUT, false, x, y);
                currentTarget = null;
            }
            const result = stage.$hitTest(x, y);
            if (result != null && result != stage) {
                if (!currentTarget) {
                    currentTarget = result;
                    dispatch(MouseEvent.ROLL_OVER, false, x, y);
                    dispatch(MouseEvent.MOUSE_OVER, true, x, y);
                }
                else if (result != currentTarget) {
                    dispatch(MouseEvent.MOUSE_OUT, true, x, y);
                    if (!currentTarget.$getConcatenatedVisible() || !currentTarget.hitTestPoint(x, y, true)) {
                        dispatch(MouseEvent.ROLL_OUT, false, x, y);
                    }
                    currentTarget = result;
                    dispatch(MouseEvent.ROLL_OVER, false, x, y);
                    dispatch(MouseEvent.MOUSE_OVER, true, x, y);
                }
            }
            else {
                if (currentTarget) {
                    dispatch(MouseEvent.MOUSE_OUT, true, x, y);
                    dispatch(MouseEvent.ROLL_OUT, false, x, y);
                    currentTarget = null;
                }
            }
        };
        let mouseX = NaN;
        let mouseY = NaN;
        const onTouchMove = egret.sys.TouchHandler.prototype.onTouchMove;
        egret.sys.TouchHandler.prototype.onTouchMove = function (x: number, y: number, touchPointID: number) {
            mouseX = x;
            mouseY = y;
            onTouchMove.call(this, x, y, touchPointID);
            if (mouseMoveEnabled) {
                let target = stageObj.$hitTest(x, y);
                if (!target) {
                    target = stageObj;
                }
                egret.TouchEvent.dispatchTouchEvent(target, MouseEvent.MOUSE_MOVE, true, true, x, y, touchPointID, true);
            }
            check(x, y);            
        };
        const onTouchBegin = egret.sys.TouchHandler.prototype.onTouchBegin;
        egret.sys.TouchHandler.prototype.onTouchBegin = function (x: number, y: number, touchPointID: number) {
            onTouchBegin.call(this, x, y, touchPointID);
            check(x, y);
        };
        let isMove = false;
        const getLocation = egret["web"].WebTouchHandler.prototype.getLocation;
        egret["web"].WebTouchHandler.prototype.getLocation = function (event) {
            if (event.buttons == 0) {
                isMove = true;
            }
            return getLocation.call(this, event);
        };
        const onTouchEnd = egret.sys.TouchHandler.prototype.onTouchEnd;
        egret.sys.TouchHandler.prototype.onTouchEnd = function (x: number, y: number, touchPointID: number) {
            if (isMove) {
                isMove = false;
                mouseX = x;
                mouseY = y;
                onTouchEnd.call(this, x, y, touchPointID);
                if (mouseMoveEnabled) {
                    let target = stageObj.$hitTest(x, y);
                    if (!target) {
                        target = stageObj;
                    }
                    egret.TouchEvent.dispatchTouchEvent(target, MouseEvent.MOUSE_MOVE, true, true, x, y, touchPointID, true);
                }
                return;
            }
            onTouchEnd.call(this, x, y, touchPointID);
            check(x, y);
        };
        stage.addEventListener(egret.Event.ENTER_FRAME, function () {
            if (mouseX != NaN && mouseY != NaN) {
                check(mouseX, mouseY);
            }
        }, null);
    }

    /**
     * @language en_US
     * Set a target of buttonMode property setting is true, when the mouse rolls over the object becomes hand type.
     * @version Egret 3.1.0
     * @platform Web
     */
    /**
     * @language zh_CN
     * 设置一个对象的buttonMode属性，设置为true后，当鼠标滑过该对象会变手型。
     * @version Egret 3.1.0
     * @platform Web
     */
    export const setButtonMode = function (displayObjcet: egret.DisplayObject, buttonMode: boolean) {
        displayObjcet["buttonModeForMouse"] = buttonMode;
    }

    let mouseMoveEnabled = false;

    /**
     * @language en_US
     * Setting ON mouseMove event detection, after opening slightly impacts performance, default is not open.
     * @version Egret 3.1.0
     * @platform Web
     */
    /**
     * @language zh_CN
     * 设置开启mouseMove事件检测，开启后性能会稍有影响，默认为不开启。
     * @version Egret 3.1.0
     * @platform Web
     */
    export const setMouseMoveEnabled = function (enabled: boolean) {
        mouseMoveEnabled = enabled;
    }

    const addMouseWheelEvent = function () {
        let type = "mousewheel";
        let _eventCompat = function (event) {
            const type = event.type;
            if (type == "DOMMouseScroll" || type == "mousewheel") {
                event.delta = event.wheelDelta ? event.wheelDelta : -(event.detail || 0);
                stageObj.dispatchEventWith(MouseEvent.MOUSE_WHEEL, false, event.delta);
            }
        };

        if (window.addEventListener) {
            if (type === "mousewheel" && document["mozFullScreen"] !== undefined) {
                type = "DOMMouseScroll";
            }
            window.addEventListener(type, function (event) {
                _eventCompat(event);
            }, false);
        } else if (window["attachEvent"]) {
            window["attachEvent"]("on" + type, function (event) {
                event = event || window.event;
                _eventCompat(event);
            });
        }
    }
}