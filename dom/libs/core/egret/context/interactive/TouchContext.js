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
    /**
    *
    * @class egret.TouchContext
    * @classdesc TouchContext是egret的触摸Context
    */
    var TouchContext = (function (_super) {
        __extends(TouchContext, _super);
        function TouchContext() {
            _super.call(this);
            this._currentTouchTarget = {};
            this.maxTouches = 2;
            this.touchDownTarget = {};
            this.touchingIdentifiers = [];
            this.lastTouchX = -1;
            this.lastTouchY = -1;
        }
        /**
        * 启动触摸检测
        * @method egret.TouchContext#run
        */
        TouchContext.prototype.run = function () {
        };

        TouchContext.prototype.getTouchData = function (identifier, x, y) {
            var obj = this._currentTouchTarget[identifier];
            if (obj == null) {
                obj = {};
                this._currentTouchTarget[identifier] = obj;
            }
            obj.stageX = x;
            obj.stageY = y;
            obj.identifier = identifier;
            return obj;
        };

        TouchContext.prototype.dispatchEvent = function (type, data) {
            var touchDown = (this.touchDownTarget[data.identifier] == true);
            egret.TouchEvent.dispatchTouchEvent(data.target, type, data.identifier, data.stageX, data.stageY, false, false, false, touchDown);
        };

        TouchContext.prototype.onTouchBegan = function (x, y, identifier) {
            if (this.touchingIdentifiers.length == this.maxTouches) {
                return;
            }
            var stage = egret.MainContext.instance.stage;
            var result = stage.hitTest(x, y);
            if (result) {
                var obj = this.getTouchData(identifier, x, y);
                this.touchDownTarget[identifier] = true;
                obj.target = result;
                obj.beginTarget = result;
                this.dispatchEvent(egret.TouchEvent.TOUCH_BEGIN, obj);
            }
            this.touchingIdentifiers.push(identifier);
        };

        TouchContext.prototype.onTouchMove = function (x, y, identifier) {
            var index = this.touchingIdentifiers.indexOf(identifier);
            if (index == -1) {
                return;
            }
            if (x == this.lastTouchX && y == this.lastTouchY) {
                return;
            }
            this.lastTouchX = x;
            this.lastTouchY = y;
            var stage = egret.MainContext.instance.stage;
            var result = stage.hitTest(x, y);
            if (result) {
                var obj = this.getTouchData(identifier, x, y);
                obj.target = result;
                this.dispatchEvent(egret.TouchEvent.TOUCH_MOVE, obj);
            }
        };

        TouchContext.prototype.onTouchEnd = function (x, y, identifier) {
            var index = this.touchingIdentifiers.indexOf(identifier);
            if (index == -1) {
                return;
            }
            this.touchingIdentifiers.splice(index, 1);
            var stage = egret.MainContext.instance.stage;
            var result = stage.hitTest(x, y);
            if (result) {
                var obj = this.getTouchData(identifier, x, y);
                delete this.touchDownTarget[identifier];
                var oldTarget = obj.beginTarget;
                obj.target = result;
                this.dispatchEvent(egret.TouchEvent.TOUCH_END, obj);
                if (oldTarget == result) {
                    this.dispatchEvent(egret.TouchEvent.TOUCH_TAP, obj);
                } else if (obj.beginTarget) {
                    obj.target = obj.beginTarget;
                    this.dispatchEvent(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, obj);
                }
                delete this._currentTouchTarget[obj.identifier];
            }
        };
        return TouchContext;
    })(egret.HashObject);
    egret.TouchContext = TouchContext;
    TouchContext.prototype.__class__ = "egret.TouchContext";
})(egret || (egret = {}));
