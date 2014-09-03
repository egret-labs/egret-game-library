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
    * @class egret.Sound
    * @classdesc Sound 类允许您在应用程序中使用声音。
    */
    var Sound = (function () {
        function Sound() {
            this.type = Sound.EFFECT;
        }
        /**
        * 播放声音
        * @method egret.Sound#play
        * @param loop {boolean} 是否循环播放，默认为false
        */
        Sound.prototype.play = function (loop) {
            if (typeof loop === "undefined") { loop = false; }
            var sound = this.audio;
            if (!sound) {
                return;
            }
            if (!isNaN(sound.duration)) {
                sound.currentTime = 0;
            }
            sound.loop = loop;
            sound.play();
        };

        /**
        * 暂停声音
        * @method egret.Sound#pause
        */
        Sound.prototype.pause = function () {
            var sound = this.audio;
            if (!sound) {
                return;
            }
            sound.pause();
        };

        /**
        * 重新加载声音
        * @method egret.Sound#load
        */
        Sound.prototype.load = function () {
            var sound = this.audio;
            if (!sound) {
                return;
            }
            sound.load();
        };

        /**
        * 添加事件监听
        * @param type 事件类型
        * @param listener 监听函数
        */
        Sound.prototype.addEventListener = function (type, listener) {
            var sound = this.audio;
            if (!sound) {
                return;
            }
            this.audio.addEventListener(type, listener, false);
        };

        /**
        * 移除事件监听
        * @param type 事件类型
        * @param listener 监听函数
        */
        Sound.prototype.removeEventListener = function (type, listener) {
            var sound = this.audio;
            if (!sound) {
                return;
            }
            this.audio.removeEventListener(type, listener, false);
        };

        /**
        * 设置音量
        * @param value 值需大于0 小于等于 1
        */
        Sound.prototype.setVolume = function (value) {
            var sound = this.audio;
            if (!sound) {
                return;
            }
            sound.volume = value;
        };

        /**
        * 获取当前音量值
        * @returns number
        */
        Sound.prototype.getVolume = function () {
            return this.audio ? this.audio.volume : 0;
        };

        Sound.prototype.preload = function (type) {
            this.type = type;
        };

        Sound.prototype._setAudio = function (value) {
            this.audio = value;
        };
        Sound.MUSIC = "music";
        Sound.EFFECT = "effect";
        return Sound;
    })();
    egret.Sound = Sound;
    Sound.prototype.__class__ = "egret.Sound";
})(egret || (egret = {}));
