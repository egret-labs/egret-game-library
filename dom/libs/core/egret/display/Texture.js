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
    * @class egret.Texture
    * @classdesc 纹理类是对不同平台不同的图片资源的封装
    * 在HTML5中，资源是一个HTMLElement对象
    * 在OpenGL / WebGL中，资源是一个提交GPU后获取的纹理id
    * Texture类封装了这些底层实现的细节，开发者只需要关心接口即可
    */
    var Texture = (function (_super) {
        __extends(Texture, _super);
        function Texture() {
            _super.call(this);
            /**
            * 表示这个纹理在bitmapData上的x起始位置
            */
            this._bitmapX = 0;
            /**
            * 表示这个纹理在bitmapData上的y起始位置
            */
            this._bitmapY = 0;
            /**
            * 表示这个纹理在bitmapData上的宽度
            */
            this._bitmapWidth = 0;
            /**
            * 表示这个纹理在bitmapData上的高度
            */
            this._bitmapHeight = 0;
            /**
            * 表示这个纹理显示了之后在x方向的渲染偏移量
            */
            this._offsetX = 0;
            /**
            * 表示这个纹理显示了之后在y方向的渲染偏移量
            */
            this._offsetY = 0;
            this._textureWidth = 0;
            this._textureHeight = 0;
        }
        Object.defineProperty(Texture.prototype, "textureWidth", {
            /**
            * 纹理宽度
            * @member {number} egret.Texture#textureWidth
            */
            get: function () {
                return this._textureWidth;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Texture.prototype, "textureHeight", {
            /**
            * 纹理高度
            * @member {number} egret.Texture#textureWidth
            */
            get: function () {
                return this._textureHeight;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Texture.prototype, "bitmapData", {
            /**
            * 纹理对象中得位图数据
            * @member {any} egret.Texture#bitmapData
            */
            get: function () {
                return this._bitmapData;
            },
            enumerable: true,
            configurable: true
        });

        Texture.prototype._setBitmapData = function (value) {
            var scale = egret.MainContext.instance.rendererContext.texture_scale_factor;
            this._bitmapData = value;
            this._sourceWidth = value.width;
            this._sourceHeight = value.height;
            this._textureWidth = this._sourceWidth * scale;
            this._textureHeight = this._sourceHeight * scale;
            this._bitmapWidth = this._textureWidth;
            this._bitmapHeight = this._textureHeight;
            this._offsetX = this._offsetY = this._bitmapX = this._bitmapY = 0;
        };

        /**
        * 获取某一点像素的颜色值
        * @method egret.Texture#getPixel32
        * @param x 像素点的X轴坐标
        * @param y 像素点的Y轴坐标
        * @returns {number} 指定像素点的颜色值
        */
        Texture.prototype.getPixel32 = function (x, y) {
            var result = this._bitmapData.getContext("2d").getImageData(x, y, 1, 1);
            return result.data;
        };
        return Texture;
    })(egret.HashObject);
    egret.Texture = Texture;
    Texture.prototype.__class__ = "egret.Texture";
})(egret || (egret = {}));
