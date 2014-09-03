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
var egret;
(function (egret) {
    /**
    * @class egret.Profiler
    * @classdesc
    * Profiler是egret的性能检测分析类
    * @todo GitHub文档，如何使用Profiler
    */
    var Profiler = (function () {
        function Profiler() {
            this._lastTime = 0;
            this._logicPerformanceCost = 0;
            this._renderPerformanceCost = 0;
            this._updateTransformPerformanceCost = 0;
            this._preDrawCount = 0;
            this._tick = 0;
            this._maxDeltaTime = 500;
            this._totalDeltaTime = 0;
        }
        /**
        * 返回系统中唯一的Profiler实例。
        * @returns {Profiler}
        */
        Profiler.getInstance = function () {
            if (Profiler.instance == null) {
                Profiler.instance = new Profiler();
            }
            return Profiler.instance;
        };

        /**
        * 启动Profiler
        * @method egret.Profiler#run
        */
        Profiler.prototype.run = function () {
            //todo 加入debug参数
            egret.Ticker.getInstance().register(this.update, this);
            if (this._txt == null) {
                this._txt = new egret.TextField();
                this._txt.size = 28;

                egret.MainContext.instance.stage.addChild(this._txt);
            }
            var context = egret.MainContext.instance;
            context.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            context.addEventListener(egret.Event.RENDER, this.onStartRender, this);
            context.addEventListener(egret.Event.FINISH_RENDER, this.onFinishRender, this);
            context.addEventListener(egret.Event.FINISH_UPDATE_TRANSFORM, this.onFinishUpdateTransform, this);
        };

        /**
        * @private
        */
        Profiler.prototype.onEnterFrame = function (event) {
            this._lastTime = egret.getTimer();
        };

        /**
        * @private
        */
        Profiler.prototype.onStartRender = function (event) {
            var now = egret.getTimer();
            this._logicPerformanceCost = now - this._lastTime;
            this._lastTime = now;
        };

        Profiler.prototype.onFinishUpdateTransform = function (event) {
            var now = egret.getTimer();
            this._updateTransformPerformanceCost = now - this._lastTime;
            this._lastTime = now;
        };

        /**
        * @private
        */
        Profiler.prototype.onFinishRender = function (event) {
            var now = egret.getTimer();
            this._renderPerformanceCost = now - this._lastTime;
            this._lastTime = now;
        };

        /**
        * @private
        */
        Profiler.prototype.update = function (frameTime) {
            this._tick++;
            this._totalDeltaTime += frameTime;
            if (this._totalDeltaTime >= this._maxDeltaTime) {
                var drawStr = (this._preDrawCount - 1).toString();
                var timeStr = Math.ceil(this._logicPerformanceCost).toString() + "," + Math.ceil(this._updateTransformPerformanceCost).toString() + "," + Math.ceil(this._renderPerformanceCost).toString() + "," + Math.ceil(egret.MainContext.instance.rendererContext.renderCost).toString();
                var frameStr = Math.floor(this._tick * 1000 / this._totalDeltaTime).toString();

                this._txt.text = "draw:" + drawStr + "\n" + "cost:" + timeStr + "\n" + "FPS:" + frameStr;

                this._totalDeltaTime = 0;
                this._tick = 0;
            }
            this._preDrawCount = 0;
        };

        /**
        * @method egret.Profiler#onDrawImage
        * @private
        */
        Profiler.prototype.onDrawImage = function () {
            this._preDrawCount++;
        };
        return Profiler;
    })();
    egret.Profiler = Profiler;
    Profiler.prototype.__class__ = "egret.Profiler";
})(egret || (egret = {}));
