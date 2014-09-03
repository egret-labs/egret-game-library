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
    * @class egret.HTML5NetContext
    * @classdesc
    * @extends egret.NetContext
    */
    var HTML5NetContext = (function (_super) {
        __extends(HTML5NetContext, _super);
        function HTML5NetContext() {
            _super.call(this);
        }
        HTML5NetContext.prototype.proceed = function (loader) {
            if (loader.dataFormat == egret.URLLoaderDataFormat.TEXTURE) {
                this.loadTexture(loader);
                return;
            }
            if (loader.dataFormat == egret.URLLoaderDataFormat.SOUND) {
                this.loadSound(loader);
                return;
            }

            var request = loader._request;
            var xhr = this.getXHR();
            xhr.onerror = onLoadError;
            xhr.onload = onLoadComplete;
            xhr.open(request.method, request.url, true);
            this.setResponseType(xhr, loader.dataFormat);
            if (request.method == egret.URLRequestMethod.GET || !request.data) {
                xhr.send();
            } else if (request.data instanceof egret.URLVariables) {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                var urlVars = request.data;
                xhr.send(urlVars.toString());
            } else {
                xhr.setRequestHeader("Content-Type", "multipart/form-data");
                xhr.send(request.data);
            }

            function onLoadError(event) {
                egret.IOErrorEvent.dispatchIOErrorEvent(loader);
            }
            ;

            function onLoadComplete(event) {
                switch (loader.dataFormat) {
                    case egret.URLLoaderDataFormat.TEXT:
                        loader.data = xhr.responseText;
                        break;

                    case egret.URLLoaderDataFormat.VARIABLES:
                        loader.data = new egret.URLVariables(xhr.responseText);
                        break;

                    case egret.URLLoaderDataFormat.BINARY:
                        loader.data = xhr.response;
                        break;
                    default:
                        loader.data = xhr.responseText;
                        break;
                }
                egret.callLater(egret.Event.dispatchEvent, egret.Event, loader, egret.Event.COMPLETE);
            }
            ;
        };

        HTML5NetContext.prototype.loadSound = function (loader) {
            var request = loader._request;
            var audio = new Audio(request.url);
            audio["__timeoutId"] = window.setTimeout(soundPreloadCanplayHandler, 100);
            audio.addEventListener('canplaythrough', soundPreloadCanplayHandler, false);
            audio.addEventListener("error", soundPreloadErrorHandler, false);
            audio.load();

            function soundPreloadCanplayHandler(event) {
                window.clearTimeout(audio["__timeoutId"]);
                audio.removeEventListener('canplaythrough', soundPreloadCanplayHandler, false);
                audio.removeEventListener("error", soundPreloadErrorHandler, false);
                var sound = new egret.Sound();
                sound._setAudio(audio);
                loader.data = sound;
                egret.callLater(egret.Event.dispatchEvent, egret.Event, loader, egret.Event.COMPLETE);
            }
            ;

            function soundPreloadErrorHandler(event) {
                window.clearTimeout(audio["__timeoutId"]);
                audio.removeEventListener('canplaythrough', soundPreloadCanplayHandler, false);
                audio.removeEventListener("error", soundPreloadErrorHandler, false);
                egret.IOErrorEvent.dispatchIOErrorEvent(loader);
            }
            ;
        };

        HTML5NetContext.prototype.getXHR = function () {
            if (window["XMLHttpRequest"]) {
                return new window["XMLHttpRequest"]();
            } else {
                return new ActiveXObject("MSXML2.XMLHTTP");
            }
        };

        HTML5NetContext.prototype.setResponseType = function (xhr, responseType) {
            switch (responseType) {
                case egret.URLLoaderDataFormat.TEXT:
                case egret.URLLoaderDataFormat.VARIABLES:
                    xhr.responseType = egret.URLLoaderDataFormat.TEXT;
                    break;

                case egret.URLLoaderDataFormat.BINARY:
                    xhr.responseType = "arraybuffer";
                    break;

                default:
                    xhr.responseType = responseType;
                    break;
            }
        };

        HTML5NetContext.prototype.loadTexture = function (loader) {
            var request = loader._request;
            var image = new Image();
            image.crossOrigin = "Anonymous";
            image.onload = onImageComplete;
            image.onerror = onLoadError;
            image.src = request.url;

            function onImageComplete(event) {
                image.onerror = null;
                image.onload = null;
                var texture = new egret.Texture();
                texture._setBitmapData(image);
                loader.data = texture;
                egret.callLater(egret.Event.dispatchEvent, egret.Event, loader, egret.Event.COMPLETE);
            }
            ;

            function onLoadError(event) {
                image.onerror = null;
                image.onload = null;
                egret.IOErrorEvent.dispatchIOErrorEvent(loader);
            }
            ;
        };
        return HTML5NetContext;
    })(egret.NetContext);
    egret.HTML5NetContext = HTML5NetContext;
    HTML5NetContext.prototype.__class__ = "egret.HTML5NetContext";
})(egret || (egret = {}));
