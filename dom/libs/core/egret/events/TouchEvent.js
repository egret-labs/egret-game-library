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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var egret;
(function (egret) {
    var TouchEvent = (function (_super) {
        __extends(TouchEvent, _super);
        /**
        * 创建一个作为参数传递给事件侦听器的 Event 对象。
        *
        * @class egret.TouchEvent
        * @classdesc
        * TouchEvent事件类
        * @extends egret.Event
        * @constructor egret.TouchEvent
        * @param type {string} 事件的类型，可以作为 Event.type 访问。
        * @param bubbles {boolean} 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
        * @param cancelable {boolean} 确定是否可以取消 Event 对象。默认值为 false。
        * @param touchPointID {number}
        * @param stageX {number}
        * @param stageY {number}
        * @param ctrlKey {boolean}
        * @param altKey {boolean}
        * @param shiftKey {boolean}
        * @param touchDown {boolean}
        */
        function TouchEvent(type, bubbles, cancelable, touchPointID, stageX, stageY, ctrlKey, altKey, shiftKey, touchDown) {
            if (typeof bubbles === "undefined") { bubbles = true; }
            if (typeof cancelable === "undefined") { cancelable = true; }
            if (typeof touchPointID === "undefined") { touchPointID = 0; }
            if (typeof stageX === "undefined") { stageX = 0; }
            if (typeof stageY === "undefined") { stageY = 0; }
            if (typeof ctrlKey === "undefined") { ctrlKey = false; }
            if (typeof altKey === "undefined") { altKey = false; }
            if (typeof shiftKey === "undefined") { shiftKey = false; }
            if (typeof touchDown === "undefined") { touchDown = false; }
            _super.call(this, type, bubbles, cancelable);
            this._stageX = 0;
            this._stageY = 0;
            this.touchPointID = touchPointID;
            this._stageX = stageX;
            this._stageY = stageY;
            this.ctrlKey = ctrlKey;
            this.altKey = altKey;
            this.touchDown = touchDown;
        }
        Object.defineProperty(TouchEvent.prototype, "stageX", {
            /**
            * 事件发生点在全局舞台坐标中的水平坐标。
            * @member {number} egret.TouchEvent#stageX
            */
            get: function () {
                return this._stageX;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TouchEvent.prototype, "stageY", {
            /**
            * 事件发生点在全局舞台坐标中的垂直坐标。
            * @member {number} egret.TouchEvent#stageY
            */
            get: function () {
                return this._stageY;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TouchEvent.prototype, "localX", {
            /**
            * 事件发生点相对于currentTarget的水平坐标。
            * @member {number} egret.TouchEvent#localX
            */
            get: function () {
                var dp = this._currentTarget;
                var point = dp.globalToLocal(this._stageX, this._stageY, egret.Point.identity);
                return point.x;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TouchEvent.prototype, "localY", {
            /**
            * 事件发生点相对于currentTarget的垂直坐标。
            * @member {number} egret.TouchEvent#localY
            */
            get: function () {
                var dp = this._currentTarget;
                var point = dp.globalToLocal(this._stageX, this._stageY, egret.Point.identity);
                return point.y;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * 使用指定的EventDispatcher对象来抛出Event事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
        * @method egret.TouchEvent.dispatchTouchEvent
        * @param target {egret.IEventDispatcher}
        * @param type {string}
        * @param touchPointID {number}
        * @param stageX {number}
        * @param stageY {number}
        * @param ctrlKey {boolean}
        * @param altKey {boolean}
        * @param shiftKey {boolean}
        * @param touchDown {boolean}
        */
        TouchEvent.dispatchTouchEvent = function (target, type, touchPointID, stageX, stageY, ctrlKey, altKey, shiftKey, touchDown) {
            if (typeof touchPointID === "undefined") { touchPointID = 0; }
            if (typeof stageX === "undefined") { stageX = 0; }
            if (typeof stageY === "undefined") { stageY = 0; }
            if (typeof ctrlKey === "undefined") { ctrlKey = false; }
            if (typeof altKey === "undefined") { altKey = false; }
            if (typeof shiftKey === "undefined") { shiftKey = false; }
            if (typeof touchDown === "undefined") { touchDown = false; }
            var eventClass = TouchEvent;
            var props = egret.Event._getPropertyData(eventClass);
            props.touchPointID = touchPointID;
            props._stageX = stageX;
            props._stageY = stageY;
            props.ctrlKey = ctrlKey;
            props.altKey = altKey;
            props.shiftKey = shiftKey;
            props.touchDown = touchDown;
            egret.Event._dispatchByTarget(eventClass, target, type, props, true, true);
        };
        TouchEvent.TOUCH_TAP = "touchTap";

        TouchEvent.TOUCH_MOVE = "touchMove";

        TouchEvent.TOUCH_BEGIN = "touchBegin";

        TouchEvent.TOUCH_END = "touchEnd";

        TouchEvent.TOUCH_RELEASE_OUTSIDE = "touchReleaseOutside";

        TouchEvent.TOUCH_ROLL_OUT = "touchRollOut";

        TouchEvent.TOUCH_ROLL_OVER = "touchRollOver";

        TouchEvent.TOUCH_OUT = "touchOut";

        TouchEvent.TOUCH_OVER = "touchOver";
        return TouchEvent;
    })(egret.Event);
    egret.TouchEvent = TouchEvent;
    TouchEvent.prototype.__class__ = "egret.TouchEvent";
})(egret || (egret = {}));
