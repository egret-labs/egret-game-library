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
    var HTML5TouchContext = (function (_super) {
        __extends(HTML5TouchContext, _super);
        function HTML5TouchContext(canvas) {
            _super.call(this);
            this.canvas = canvas;
            this._isTouchDown = false;
        }
        HTML5TouchContext.prototype.run = function () {
            var that = this;
            if (window.navigator.msPointerEnabled) {
                this.canvas.addEventListener("MSPointerDown", function (event) {
                    that._onTouchBegin(event);
                    event.stopPropagation();
                    event.preventDefault();
                }, false);
                this.canvas.addEventListener("MSPointerMove", function (event) {
                    that._onTouchMove(event);
                    event.stopPropagation();
                    event.preventDefault();
                }, false);
                this.canvas.addEventListener("MSPointerUp", function (event) {
                    that._onTouchEnd(event);
                    event.stopPropagation();
                    event.preventDefault();
                }, false);
            } else if (egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE) {
                this.addTouchListener();
            } else if (egret.MainContext.deviceType == egret.MainContext.DEVICE_PC) {
                this.addTouchListener();
                this.addMouseListener();
            }

            window.addEventListener("mousedown", function (event) {
                if (!that.inOutOfCanvas(event)) {
                    that._isTouchDown = true;
                } else {
                    that.dispatchLeaveStageEvent();
                }
            });

            window.addEventListener("mouseup", function (event) {
                if (that._isTouchDown && that.inOutOfCanvas(event)) {
                    that.dispatchLeaveStageEvent();
                }
                that._isTouchDown = false;
            });
        };

        HTML5TouchContext.prototype.addMouseListener = function () {
            var that = this;
            this.canvas.addEventListener("mousedown", function (event) {
                that._onTouchBegin(event);
            });
            this.canvas.addEventListener("mousemove", function (event) {
                that._onTouchMove(event);
            });
            this.canvas.addEventListener("mouseup", function (event) {
                that._onTouchEnd(event);
            });
        };

        HTML5TouchContext.prototype.addTouchListener = function () {
            var that = this;
            this.canvas.addEventListener("touchstart", function (event) {
                var l = event.changedTouches.length;
                for (var i = 0; i < l; i++) {
                    that._onTouchBegin(event.changedTouches[i]);
                }
                event.stopPropagation();
                event.preventDefault();
            }, false);
            this.canvas.addEventListener("touchmove", function (event) {
                var l = event.changedTouches.length;
                for (var i = 0; i < l; i++) {
                    that._onTouchMove(event.changedTouches[i]);
                }
                event.stopPropagation();
                event.preventDefault();
            }, false);
            this.canvas.addEventListener("touchend", function (event) {
                var l = event.changedTouches.length;
                for (var i = 0; i < l; i++) {
                    that._onTouchEnd(event.changedTouches[i]);
                }
                event.stopPropagation();
                event.preventDefault();
            }, false);
            this.canvas.addEventListener("touchcancel", function (event) {
                var l = event.changedTouches.length;
                for (var i = 0; i < l; i++) {
                    that._onTouchEnd(event.changedTouches[i]);
                }
                event.stopPropagation();
                event.preventDefault();
            }, false);
        };

        HTML5TouchContext.prototype.inOutOfCanvas = function (event) {
            var location = this.getLocation(this.canvas, event);
            if (location.x < 0 || location.y < 0 || location.x > this.canvas.width || location.y > this.canvas.height) {
                return true;
            }
            return false;
        };

        HTML5TouchContext.prototype.dispatchLeaveStageEvent = function () {
            egret.MainContext.instance.stage.dispatchEventWith(egret.Event.LEAVE_STAGE);
        };

        HTML5TouchContext.prototype._onTouchBegin = function (event) {
            var location = this.getLocation(this.canvas, event);
            var identifier = -1;
            if (event.hasOwnProperty("identifier")) {
                identifier = event.identifier;
            }
            this.onTouchBegan(location.x, location.y, identifier);
        };

        HTML5TouchContext.prototype._onTouchMove = function (event) {
            var location = this.getLocation(this.canvas, event);
            var identifier = -1;
            if (event.hasOwnProperty("identifier")) {
                identifier = event.identifier;
            }
            this.onTouchMove(location.x, location.y, identifier);
        };

        HTML5TouchContext.prototype._onTouchEnd = function (event) {
            var location = this.getLocation(this.canvas, event);
            var identifier = -1;
            if (event.hasOwnProperty("identifier")) {
                identifier = event.identifier;
            }
            this.onTouchEnd(location.x, location.y, identifier);
        };

        HTML5TouchContext.prototype.getLocation = function (canvas, event) {
            var doc = document.documentElement;
            var win = window;
            var left, top, tx, ty;

            if (typeof canvas.getBoundingClientRect === 'function') {
                var box = canvas.getBoundingClientRect();
                left = box.left;
                top = box.top;
            } else {
                left = 0;
                top = 0;
            }

            left += win.pageXOffset - doc.clientLeft;
            top += win.pageYOffset - doc.clientTop;

            if (event.pageX != null) {
                tx = event.pageX;
                ty = event.pageY;
            } else {
                left -= document.body.scrollLeft;
                top -= document.body.scrollTop;
                tx = event.clientX;
                ty = event.clientY;
            }
            var result = egret.Point.identity;
            result.x = (tx - left) / egret.StageDelegate.getInstance().getScaleX();
            result.y = (ty - top) / egret.StageDelegate.getInstance().getScaleY();
            return result;
        };
        return HTML5TouchContext;
    })(egret.TouchContext);
    egret.HTML5TouchContext = HTML5TouchContext;
    HTML5TouchContext.prototype.__class__ = "egret.HTML5TouchContext";
})(egret || (egret = {}));
