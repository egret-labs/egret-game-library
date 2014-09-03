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
    * @class egret.Ticker
    * @classdesc
    * Ticker是egret引擎的心跳控制器，是游戏唯一的时间处理入口。开发者务必不要使用setTimeout / setInterval 等方法，而是统一使用Ticker
    * @extends egret.EventDispatcher
    */
    var Ticker = (function (_super) {
        __extends(Ticker, _super);
        function Ticker() {
            _super.apply(this, arguments);
            this._timeScale = 1;
            this._paused = false;
            this.callBackList = [];
        }
        /**
        * 启动心跳控制器。
        * 这个函数应只在游戏初始化时调用一次
        * @method egret.Ticker#run
        * @stable A
        */
        Ticker.prototype.run = function () {
            egret.__START_TIME = new Date().getTime();
            var context = egret.MainContext.instance.deviceContext;
            context.executeMainLoop(this.update, this);
        };

        Ticker.prototype.update = function (advancedTime) {
            var list = this.callBackList.concat();
            var length = list.length;

            var frameTime = advancedTime * this._timeScale;

            frameTime *= this._timeScale;
            for (var i = 0; i < length; i++) {
                var eventBin = list[i];
                eventBin.listener.call(eventBin.thisObject, frameTime);
            }
        };

        /**
        * 注册帧回调事件，同一函数的重复监听会被忽略。
        * @method egret.Ticker#register
        * @param listener {Function} 帧回调函数,参数返回上一帧和这帧的间隔时间。示例：onEnterFrame(frameTime:number):void
        * @param thisObject {any} 帧回调函数的this对象
        * @param priority {any} 事件优先级，开发者请勿传递 Number.NEGATIVE_INFINITY 和 Number.POSITIVE_INFINITY
        * @stable A-
        */
        Ticker.prototype.register = function (listener, thisObject, priority) {
            if (typeof priority === "undefined") { priority = 0; }
            var list = this.callBackList;
            this._insertEventBin(list, listener, thisObject, priority);
        };

        /**
        * 取消侦听enterFrame事件
        * @method egret.Ticker#unregister
        * @param listener {Function} 事件侦听函数
        * @param thisObject {any} 侦听函数的this对象
        * @stable A-
        */
        Ticker.prototype.unregister = function (listener, thisObject) {
            var list = this.callBackList;
            this._removeEventBin(list, listener, thisObject);
        };

        /**
        * 在指定的延迟（以毫秒为单位）后运行指定的函数。
        * @method egret.Ticker#setTimeout
        * @param listener {Function}
        * @param thisObject {any}
        * @param delay {number}
        * @param ...parameter {any}
        * @deprecated
        */
        Ticker.prototype.setTimeout = function (listener, thisObject, delay) {
            var parameters = [];
            for (var _i = 0; _i < (arguments.length - 3); _i++) {
                parameters[_i] = arguments[_i + 3];
            }
            egret.Logger.warning("Ticker#setTimeout方法即将废弃,请使用egret.setTimeout");
            egret.setTimeout.apply(null, [listener, thisObject, delay].concat(parameters));
        };

        /**
        * @method egret.Ticker#setTimeScale
        * @param timeScale {number}
        */
        Ticker.prototype.setTimeScale = function (timeScale) {
            this._timeScale = timeScale;
        };

        /**
        * @method egret.Ticker#getTimeScale
        */
        Ticker.prototype.getTimeScale = function () {
            return this._timeScale;
        };

        /**
        * @method egret.Ticker#pause
        */
        Ticker.prototype.pause = function () {
            this._paused = true;
        };

        /**
        * @method egret.Ticker#resume
        */
        Ticker.prototype.resume = function () {
            this._paused = false;
        };

        /**
        * @method egret.Ticker.getInstance
        * @returns {Ticker}
        */
        Ticker.getInstance = function () {
            if (Ticker.instance == null) {
                Ticker.instance = new Ticker();
            }
            return Ticker.instance;
        };
        return Ticker;
    })(egret.EventDispatcher);
    egret.Ticker = Ticker;
    Ticker.prototype.__class__ = "egret.Ticker";
})(egret || (egret = {}));
