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
    * @class egret.MainContext
    * @classdesc
    * MainContext是游戏的核心跨平台接口，组合了多个功能Context，并是游戏启动的主入口
    * @extends egret.EventDispatcher
    */
    var MainContext = (function (_super) {
        __extends(MainContext, _super);
        function MainContext() {
            _super.call(this);
            this.reuseEvent = new egret.Event("");
        }
        /**
        * 游戏启动，开启主循环，参考Flash的滑动跑道模型
        * @method egret.MainContext#run
        */
        MainContext.prototype.run = function () {
            egret.Ticker.getInstance().run();
            egret.Ticker.getInstance().register(this.renderLoop, this, Number.NEGATIVE_INFINITY);
            egret.Ticker.getInstance().register(this.broadcastEnterFrame, this, Number.POSITIVE_INFINITY);
            this.touchContext.run();
        };

        /**
        * 滑动跑道模型，渲染部分
        */
        MainContext.prototype.renderLoop = function (frameTime) {
            if (egret.__callLaterFunctionList.length > 0) {
                var functionList = egret.__callLaterFunctionList;
                egret.__callLaterFunctionList = [];
                var thisList = egret.__callLaterThisList;
                egret.__callLaterThisList = [];
                var argsList = egret.__callLaterArgsList;
                egret.__callLaterArgsList = [];
            }

            this.dispatchEventWith(egret.Event.RENDER);
            if (egret.Stage._invalidateRenderFlag) {
                this.broadcastRender();
                egret.Stage._invalidateRenderFlag = false;
            }
            if (functionList) {
                this.doCallLaterList(functionList, thisList, argsList);
            }
            var context = this.rendererContext;
            context.onRenderStart();
            context.clearScreen();
            this.stage._updateTransform();
            this.dispatchEventWith(egret.Event.FINISH_UPDATE_TRANSFORM);
            this.stage._draw(context);
            this.dispatchEventWith(egret.Event.FINISH_RENDER);
            context.onRenderFinish();
        };

        /**
        * 广播EnterFrame事件。
        */
        MainContext.prototype.broadcastEnterFrame = function (frameTime) {
            var event = this.reuseEvent;
            event._type = egret.Event.ENTER_FRAME;
            this.dispatchEvent(event);
            var list = egret.DisplayObject._enterFrameCallBackList.concat();
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var eventBin = list[i];
                event._target = eventBin.display;
                event._currentTarget = eventBin.display;
                eventBin.listener.call(eventBin.thisObject, event);
            }

            list = egret.Recycler._callBackList;
            for (i = list.length - 1; i >= 0; i--) {
                list[i]._checkFrame();
            }
        };

        /**
        * 广播Render事件。
        */
        MainContext.prototype.broadcastRender = function () {
            var event = this.reuseEvent;
            event._type = egret.Event.RENDER;
            var list = egret.DisplayObject._renderCallBackList.concat();
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var eventBin = list[i];
                var target = eventBin.display;
                event._target = target;
                event._currentTarget = target;
                eventBin.listener.call(eventBin.thisObject, event);
            }
        };

        /**
        * 执行callLater回调函数列表
        */
        MainContext.prototype.doCallLaterList = function (funcList, thisList, argsList) {
            var length = funcList.length;
            for (var i = 0; i < length; i++) {
                var func = funcList[i];
                if (func != null) {
                    func.apply(thisList[i], argsList[i]);
                }
            }
        };
        MainContext.DEVICE_PC = "web";
        MainContext.DEVICE_MOBILE = "native";
        return MainContext;
    })(egret.EventDispatcher);
    egret.MainContext = MainContext;
    MainContext.prototype.__class__ = "egret.MainContext";
})(egret || (egret = {}));

var testDeviceType = function () {
    if (!this["navigator"]) {
        return true;
    }
    var ua = navigator.userAgent.toLowerCase();
    return (ua.indexOf('mobile') != -1 || ua.indexOf('android') != -1);
};

egret.MainContext.instance = new egret.MainContext();
egret.MainContext.deviceType = testDeviceType() ? egret.MainContext.DEVICE_MOBILE : egret.MainContext.DEVICE_PC;
