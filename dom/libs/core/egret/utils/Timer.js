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
    * @class egret.Timer
    * @classdesc
    * @extends egret.EventDispatcher
    */
    var Timer = (function (_super) {
        __extends(Timer, _super);
        function Timer(delay, repeatCount) {
            if (typeof repeatCount === "undefined") { repeatCount = 0; }
            _super.call(this);
            this._currentCount = 0;
            this.delay = delay;
            this.repeatCount = repeatCount;
        }
        /**
        * @method egret.Timer#currentCount
        * @returns {number}
        */
        Timer.prototype.currentCount = function () {
            return this._currentCount;
        };

        Object.defineProperty(Timer.prototype, "running", {
            /**
            * @member {boolean} egret.Timer#running
            */
            get: function () {
                return this._running;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * @method egret.Timer#reset
        */
        Timer.prototype.reset = function () {
            this.stop();
            this._currentCount = 0;
        };

        /**
        * @method egret.Timer#start
        */
        Timer.prototype.start = function () {
            if (this._running)
                return;
            this.lastTime = egret.getTimer();
            if (this._currentCount != 0) {
                this._currentCount = 0;
            }
            egret.Ticker.getInstance().register(this.onEnterFrame, this);
            this._running = true;
        };

        /**
        * @method egret.Timer#stop
        */
        Timer.prototype.stop = function () {
            if (!this._running)
                return;
            egret.Ticker.getInstance().unregister(this.onEnterFrame, this);
            this._running = false;
        };

        Timer.prototype.onEnterFrame = function (frameTime) {
            var now = egret.getTimer();
            var passTime = now - this.lastTime;
            if (passTime > this.delay) {
                this.lastTime = now;
                this._currentCount++;
                egret.TimerEvent.dispatchTimerEvent(this, egret.TimerEvent.TIMER);
                if (this.repeatCount > 0 && this._currentCount >= this.repeatCount) {
                    this.stop();
                    egret.TimerEvent.dispatchTimerEvent(this, egret.TimerEvent.TIMER_COMPLETE);
                }
            }
        };
        return Timer;
    })(egret.EventDispatcher);
    egret.Timer = Timer;
    Timer.prototype.__class__ = "egret.Timer";
})(egret || (egret = {}));
