var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
var mouse;
(function (mouse) {
    var MouseEvent = (function () {
        function MouseEvent() {
        }
        /**
         * @language en_US
         * When the user mouse movements are called.
         * @version Egret 3.1.0
         * @platform Web
         */
        /**
         * @language zh_CN
         * 当用户鼠标移动时被调用。
         * @version Egret 3.1.0
         * @platform Web
         */
        MouseEvent.MOUSE_MOVE = "mouseMove";
        /**
        * @language en_US
        * Called when the mouse is within the area where the object (not covered by other object).
        * @version Egret 3.1.0
        * @platform Web
        */
        /**
         * @language zh_CN
         * 当鼠标正在对象所在区域内（没有被其他对象覆盖）时调用。
         * @version Egret 3.1.0
         * @platform Web
         */
        MouseEvent.MOUSE_OVER = "mouseOver";
        /**
         * @language en_US
         * Called when the mouse out of the object within the Area.
         * @version Egret 3.1.0
         * @platform Web
         */
        /**
         * @language zh_CN
         * 当鼠标移出对象所在区域内时调用。
         * @version Egret 3.1.0
         * @platform Web
         */
        MouseEvent.MOUSE_OUT = "mouseOut";
        /**
         * @language en_US
         * When the mouse enters an object within the Area calls.
         * @version Egret 3.1.0
         * @platform Web
         */
        /**
         * @language zh_CN
         * 当鼠标进入对象所在区域内调用。
         * @version Egret 3.1.0
         * @platform Web
         */
        MouseEvent.ROLL_OVER = "rollOver";
        /**
         * @language en_US
         * Called when the mouse out of the object within the Area.
         * @version Egret 3.1.0
         * @platform Web
         */
        /**
         * @language zh_CN
         * 当鼠标移出对象所在区域内时调用。
         * @version Egret 3.1.0
         * @platform Web
         */
        MouseEvent.ROLL_OUT = "rollOut";
        /**
         * @language en_US
         * Called when the mouse wheel scrolls.
         * @version Egret 5.1.0
         * @platform Web
         */
        /**
         * @language zh_CN
         * 当鼠标滚轮滚动时调用。
         * @version Egret 5.1.0
         * @platform Web
         */
        MouseEvent.MOUSE_WHEEL = "mouseWheel";
        return MouseEvent;
    }());
    mouse.MouseEvent = MouseEvent;
    __reflect(MouseEvent.prototype, "mouse.MouseEvent");
})(mouse || (mouse = {}));
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
var mouse;
(function (mouse) {
    var currentTarget;
    var stageObj;
    var isPC;
    var dispatch = function (type, bubbles, x, y) {
        if (type == mouse.MouseEvent.ROLL_OVER && currentTarget.isRollOver) {
            return;
        }
        if (type == mouse.MouseEvent.ROLL_OVER) {
            currentTarget.isRollOver = true;
        }
        else if (type == mouse.MouseEvent.ROLL_OUT) {
            delete currentTarget.isRollOver;
        }
        //处理鼠标手型
        if (isPC && currentTarget["buttonModeForMouse"]) {
            try {
                var canvas = stageObj.$displayList.renderBuffer.surface;
                ;
                if (type == mouse.MouseEvent.ROLL_OVER) {
                    canvas.style.cursor = "pointer";
                }
                else if (type == mouse.MouseEvent.ROLL_OUT) {
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
    mouse.enable = function (stage) {
        isPC = egret.Capabilities.os == "Windows PC" || egret.Capabilities.os == "Mac OS";
        stageObj = stage;
        if (isPC) {
            addMouseWheelEvent();
        }
        var check = function (x, y) {
            if (currentTarget && !currentTarget.$stage) {
                dispatch(mouse.MouseEvent.MOUSE_OUT, true, x, y);
                dispatch(mouse.MouseEvent.ROLL_OUT, false, x, y);
                currentTarget = null;
            }
            var result = stage.$hitTest(x, y);
            if (result != null && result != stage) {
                if (!currentTarget) {
                    currentTarget = result;
                    dispatch(mouse.MouseEvent.ROLL_OVER, false, x, y);
                    dispatch(mouse.MouseEvent.MOUSE_OVER, true, x, y);
                }
                else if (result != currentTarget) {
                    dispatch(mouse.MouseEvent.MOUSE_OUT, true, x, y);
                    if (!currentTarget.$getConcatenatedVisible() || !currentTarget.hitTestPoint(x, y, true)) {
                        dispatch(mouse.MouseEvent.ROLL_OUT, false, x, y);
                    }
                    currentTarget = result;
                    dispatch(mouse.MouseEvent.ROLL_OVER, false, x, y);
                    dispatch(mouse.MouseEvent.MOUSE_OVER, true, x, y);
                }
            }
            else {
                if (currentTarget) {
                    dispatch(mouse.MouseEvent.MOUSE_OUT, true, x, y);
                    dispatch(mouse.MouseEvent.ROLL_OUT, false, x, y);
                    currentTarget = null;
                }
            }
        };
        var mouseX = NaN;
        var mouseY = NaN;
        var onTouchMove = egret.sys.TouchHandler.prototype.onTouchMove;
        egret.sys.TouchHandler.prototype.onTouchMove = function (x, y, touchPointID) {
            mouseX = x;
            mouseY = y;
            onTouchMove.call(this, x, y, touchPointID);
            if (mouseMoveEnabled) {
                var target = stageObj.$hitTest(x, y);
                if (!target) {
                    target = stageObj;
                }
                egret.TouchEvent.dispatchTouchEvent(target, mouse.MouseEvent.MOUSE_MOVE, true, true, x, y, touchPointID, true);
            }
            check(x, y);
        };
        var onTouchBegin = egret.sys.TouchHandler.prototype.onTouchBegin;
        egret.sys.TouchHandler.prototype.onTouchBegin = function (x, y, touchPointID) {
            onTouchBegin.call(this, x, y, touchPointID);
            check(x, y);
        };
        var onTouchEnd = egret.sys.TouchHandler.prototype.onTouchEnd;
        egret.sys.TouchHandler.prototype.onTouchEnd = function (x, y, touchPointID) {
            onTouchEnd.call(this, x, y, touchPointID);
            check(x, y);
        };
        stage.addEventListener(egret.Event.ENTER_FRAME, function () {
            if (mouseX != NaN && mouseY != NaN) {
                check(mouseX, mouseY);
            }
        }, null);
    };
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
    mouse.setButtonMode = function (displayObjcet, buttonMode) {
        displayObjcet["buttonModeForMouse"] = buttonMode;
    };
    var mouseMoveEnabled = false;
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
    mouse.setMouseMoveEnabled = function (enabled) {
        mouseMoveEnabled = enabled;
    };
    var addMouseWheelEvent = function () {
        var type = "mousewheel";
        var _eventCompat = function (event) {
            var type = event.type;
            if (type == "DOMMouseScroll" || type == "mousewheel") {
                event.delta = event.wheelDelta ? event.wheelDelta : -(event.detail || 0);
                stageObj.dispatchEventWith(mouse.MouseEvent.MOUSE_WHEEL, false, event.delta);
            }
        };
        if (window.addEventListener) {
            if (type === "mousewheel" && document["mozFullScreen"] !== undefined) {
                type = "DOMMouseScroll";
            }
            window.addEventListener(type, function (event) {
                _eventCompat(event);
            }, false);
        }
        else if (window["attachEvent"]) {
            window["attachEvent"]("on" + type, function (event) {
                event = event || window.event;
                _eventCompat(event);
            });
        }
    };
})(mouse || (mouse = {}));
