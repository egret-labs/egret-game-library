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
    * @class egret.StageDelegate
    * @classdesc
    * StageDelegate负责处理屏幕适配策略
    * @extends egret.HashObject
    */
    var StageDelegate = (function (_super) {
        __extends(StageDelegate, _super);
        /**
        * @method egret.StageDelegate#constructor
        */
        function StageDelegate() {
            _super.call(this);
            this._designWidth = 0;
            this._designHeight = 0;
            this._scaleX = 1;
            this._scaleY = 1;
            var canvas = document.getElementById(StageDelegate.canvas_name);
            var w = canvas.width, h = canvas.height;
            this._designWidth = w;
            this._designHeight = h;
        }
        /**
        * @method egret.StageDelegate.getInstance
        * @returns {StageDelegate}
        */
        StageDelegate.getInstance = function () {
            if (StageDelegate.instance == null) {
                ContainerStrategy.initialize();
                StageDelegate.instance = new StageDelegate();
            }
            return StageDelegate.instance;
        };

        /**
        * @method egret.StageDelegate#setDesignSize
        * @param width {number}
        * @param height {{number}}
        */
        StageDelegate.prototype.setDesignSize = function (width, height) {
            this._designWidth = width;
            this._designHeight = height;
            if (arguments[2]) {
                egret.Logger.warning("该方法目前不应传入 resolutionPolicy 参数，请在 docs/1.0_Final_ReleaseNote中查看如何升级");
                var resolutionPolicy = arguments[2];
                this._setResolutionPolicy(resolutionPolicy);
            }
        };

        /**
        * @method egret.StageDelegate#_setResolutionPolicy
        * @param resolutionPolic {any}
        */
        StageDelegate.prototype._setResolutionPolicy = function (resolutionPolicy) {
            this._resolutionPolicy = resolutionPolicy;
            resolutionPolicy.init(this);
            resolutionPolicy._apply(this, this._designWidth, this._designHeight);
        };

        /**
        * @method egret.StageDelegate#getScaleX
        */
        StageDelegate.prototype.getScaleX = function () {
            return this._scaleX;
        };

        /**
        * @method egret.StageDelegate#getScaleY
        */
        StageDelegate.prototype.getScaleY = function () {
            return this._scaleY;
        };
        StageDelegate.canvas_name = "gameCanvas";

        StageDelegate.canvas_div_name = "gameDiv";
        return StageDelegate;
    })(egret.HashObject);
    egret.StageDelegate = StageDelegate;
    StageDelegate.prototype.__class__ = "egret.StageDelegate";

    /**
    * @class egret.ResolutionPolicy
    * @classdesc
    */
    var ResolutionPolicy = (function () {
        function ResolutionPolicy(containerStg, contentStg) {
            this._containerStrategy = containerStg;
            this._contentStrategy = contentStg;
        }
        /**
        * @method egret.ResolutionPolicy#init
        * @param view {egret.StageDelegate}
        */
        ResolutionPolicy.prototype.init = function (view) {
            this._containerStrategy.init(view);
            this._contentStrategy.init(view);
        };

        /**
        * @method egret.ResolutionPolicy#_apply
        * @param view {any}
        * @param designedResolutionWidth {any}
        * @param designedResolutionHeigh {any}
        */
        ResolutionPolicy.prototype._apply = function (view, designedResolutionWidth, designedResolutionHeight) {
            this._containerStrategy._apply(view, designedResolutionWidth, designedResolutionHeight);
            this._contentStrategy._apply(view, designedResolutionWidth, designedResolutionHeight);
        };
        return ResolutionPolicy;
    })();
    egret.ResolutionPolicy = ResolutionPolicy;
    ResolutionPolicy.prototype.__class__ = "egret.ResolutionPolicy";

    /**
    * @class egret.ContainerStrategy
    * @classdesc
    */
    var ContainerStrategy = (function () {
        function ContainerStrategy() {
        }
        /**
        * @method egret.ContainerStrategy.initialize
        */
        ContainerStrategy.initialize = function () {
            ContainerStrategy.EQUAL_TO_FRAME = new EqualToFrame();
        };

        /**
        * @method egret.ContainerStrategy#init
        * @param vie {any}
        */
        ContainerStrategy.prototype.init = function (view) {
        };

        /**
        * @method egret.ContainerStrategy#_apply
        * @param view {any}
        * @param designedWidth {any}
        * @param designedHeigh {any}
        */
        ContainerStrategy.prototype._apply = function (view, designedWidth, designedHeight) {
        };

        ContainerStrategy.prototype._setupContainer = function () {
            var body = document.body, style;
            if (body && (style = body.style)) {
                style.paddingTop = style.paddingTop || "0px";
                style.paddingRight = style.paddingRight || "0px";
                style.paddingBottom = style.paddingBottom || "0px";
                style.paddingLeft = style.paddingLeft || "0px";
                style.borderTop = style.borderTop || "0px";
                style.borderRight = style.borderRight || "0px";
                style.borderBottom = style.borderBottom || "0px";
                style.borderLeft = style.borderLeft || "0px";
                style.marginTop = style.marginTop || "0px";
                style.marginRight = style.marginRight || "0px";
                style.marginBottom = style.marginBottom || "0px";
                style.marginLeft = style.marginLeft || "0px";
            }
            //            var contStyle = document.getElementById(egret.StageDelegate.canvas_div_name).style;
            //            contStyle.position = "fixed";
            //            contStyle.left = contStyle.top = "0px";
            //            document.body.scrollTop = 0;
        };
        return ContainerStrategy;
    })();
    egret.ContainerStrategy = ContainerStrategy;
    ContainerStrategy.prototype.__class__ = "egret.ContainerStrategy";

    /**
    * @class egret.EqualToFrame
    * @classdesc
    * @extends egret.ContainerStrategy
    */
    var EqualToFrame = (function (_super) {
        __extends(EqualToFrame, _super);
        function EqualToFrame() {
            _super.apply(this, arguments);
        }
        EqualToFrame.prototype._apply = function (view) {
            this._setupContainer();
        };
        return EqualToFrame;
    })(ContainerStrategy);
    egret.EqualToFrame = EqualToFrame;
    EqualToFrame.prototype.__class__ = "egret.EqualToFrame";

    /**
    * @class egret.ContentStrategy
    * @classdesc
    */
    var ContentStrategy = (function () {
        function ContentStrategy() {
        }
        /**
        * @method egret.ContentStrategy#init
        * @param vie {any}
        */
        ContentStrategy.prototype.init = function (view) {
        };

        /**
        * @method egret.ContentStrategy#_apply
        * @param delegate {egret.StageDelegate}
        * @param designedResolutionWidth {number}
        * @param designedResolutionHeight {number}
        */
        ContentStrategy.prototype._apply = function (delegate, designedResolutionWidth, designedResolutionHeight) {
        };
        return ContentStrategy;
    })();
    egret.ContentStrategy = ContentStrategy;
    ContentStrategy.prototype.__class__ = "egret.ContentStrategy";

    /**
    * @class egret.FixedHeight
    * @classdesc
    * @extends egret.ContentStrategy
    */
    var FixedHeight = (function (_super) {
        __extends(FixedHeight, _super);
        /**
        * 构造函数
        * @param minWidth 最终游戏内适配的最小stageWidth，默认没有最小宽度
        */
        function FixedHeight(minWidth) {
            if (typeof minWidth === "undefined") { minWidth = 0; }
            _super.call(this);
            this.minWidth = minWidth;
        }
        /**
        * @method egret.FixedHeight#_apply
        * @param delegate {any}
        * @param designedResolutionWidth {any}
        * @param designedResolutionHeight {any}
        */
        FixedHeight.prototype._apply = function (delegate, designedResolutionWidth, designedResolutionHeight) {
            var canvas = document.getElementById(StageDelegate.canvas_name);
            var container = document.getElementById(StageDelegate.canvas_div_name);
            var viewPortWidth = document.documentElement.clientWidth;
            var viewPortHeight = document.documentElement.clientHeight;

            var scale = viewPortHeight / designedResolutionHeight;
            var designW = viewPortWidth / scale;
            var designH = designedResolutionHeight;

            var scale2 = 1;
            if (this.minWidth != 0) {
                scale2 = Math.min(1, designW / this.minWidth);
            }
            canvas.width = designW / scale2;
            canvas.height = designH;
            canvas.style.width = viewPortWidth + "px";
            canvas.style.height = (viewPortHeight * scale2) + "px";
            container.style.width = viewPortWidth + "px";
            container.style.height = (viewPortHeight * scale2) + "px";
            delegate._scaleX = scale * scale2;
            delegate._scaleY = scale * scale2;
        };
        return FixedHeight;
    })(ContentStrategy);
    egret.FixedHeight = FixedHeight;
    FixedHeight.prototype.__class__ = "egret.FixedHeight";

    /**
    * @class egret.FixedWidth
    * @classdesc
    * @extends egret.ContentStrategy
    */
    var FixedWidth = (function (_super) {
        __extends(FixedWidth, _super);
        /**
        * 构造函数
        * @param minHeight 最终游戏内适配的最小stageHeight，默认没有最小高度
        */
        function FixedWidth(minHeight) {
            if (typeof minHeight === "undefined") { minHeight = 0; }
            _super.call(this);
            this.minHeight = minHeight;
        }
        FixedWidth.prototype._apply = function (delegate, designedResolutionWidth, designedResolutionHeight) {
            var canvas = document.getElementById(StageDelegate.canvas_name);
            var container = document.getElementById(StageDelegate.canvas_div_name);
            var viewPortWidth = document.documentElement.clientWidth;
            var viewPortHeight = document.documentElement.clientHeight;

            var scale = viewPortWidth / designedResolutionWidth;
            var designW = designedResolutionWidth;
            var designH = viewPortHeight / scale;

            var scale2 = 1;
            if (this.minHeight != 0) {
                scale2 = Math.min(1, designH / this.minHeight);
            }
            canvas.width = designW;
            canvas.height = designH / scale2;
            canvas.style.width = (viewPortWidth * scale2) + "px";
            canvas.style.height = viewPortHeight + "px";
            container.style.width = (viewPortWidth * scale2) + "px";
            container.style.height = viewPortHeight + "px";
            delegate._scaleX = scale * scale2;
            delegate._scaleY = scale * scale2;
        };
        return FixedWidth;
    })(ContentStrategy);
    egret.FixedWidth = FixedWidth;
    FixedWidth.prototype.__class__ = "egret.FixedWidth";

    /**
    * @class egret.FixedSize
    * @classdesc
    * @extends egret.ContentStrategy
    */
    var FixedSize = (function (_super) {
        __extends(FixedSize, _super);
        function FixedSize(width, height) {
            _super.call(this);
            this.width = width;
            this.height = height;
        }
        /**
        * @method egret.FixedSize#_apply
        * @param delegate {egret.StageDelegate}
        * @param designedResolutionWidth {number}
        * @param designedResolutionHeight {number}
        */
        FixedSize.prototype._apply = function (delegate, designedResolutionWidth, designedResolutionHeight) {
            var canvas = document.getElementById(StageDelegate.canvas_name);
            var container = document.getElementById(StageDelegate.canvas_div_name);
            var viewPortWidth = this.width;
            var viewPortHeight = this.height;
            var scale = viewPortWidth / designedResolutionWidth;
            canvas.width = designedResolutionWidth;
            canvas.height = viewPortHeight / scale;

            canvas.style.width = viewPortWidth + "px";
            canvas.style.height = viewPortHeight + "px";
            container.style.width = viewPortWidth + "px";
            container.style.height = viewPortHeight + "px";
            delegate._scaleX = scale;
            delegate._scaleY = scale;
        };
        return FixedSize;
    })(ContentStrategy);
    egret.FixedSize = FixedSize;
    FixedSize.prototype.__class__ = "egret.FixedSize";

    /**
    * @class egret.NoScale
    * @classdesc
    * @extends egret.ContentStrategy
    */
    var NoScale = (function (_super) {
        __extends(NoScale, _super);
        function NoScale() {
            _super.call(this);
        }
        /**
        * @method egret.NoScale#_apply
        * @param delegate {egret.StageDelegate}
        * @param designedResolutionWidth {number}
        * @param designedResolutionHeight {number}
        */
        NoScale.prototype._apply = function (delegate, designedResolutionWidth, designedResolutionHeight) {
            var canvas = document.getElementById(StageDelegate.canvas_name);
            canvas.width = designedResolutionWidth;
            canvas.height = designedResolutionHeight;
            canvas.style.width = designedResolutionWidth + "px";
            canvas.style.height = designedResolutionHeight + "px";
            delegate._scaleX = 1;
            delegate._scaleY = 1;
        };
        return NoScale;
    })(ContentStrategy);
    egret.NoScale = NoScale;
    NoScale.prototype.__class__ = "egret.NoScale";

    var ShowAll = (function (_super) {
        __extends(ShowAll, _super);
        function ShowAll() {
            _super.call(this);
        }
        /**
        * @method egret.NoScale#_apply
        * @param delegate {egret.StageDelegate}
        * @param designedResolutionWidth {number}
        * @param designedResolutionHeight {number}
        */
        ShowAll.prototype._apply = function (delegate, designedResolutionWidth, designedResolutionHeight) {
            var canvas = document.getElementById(StageDelegate.canvas_name);
            var container = document.getElementById(StageDelegate.canvas_div_name);
            var viewPortWidth = document.documentElement.clientWidth;
            var viewPortHeight = document.documentElement.clientHeight;

            var scale = (viewPortWidth / designedResolutionWidth < viewPortHeight / designedResolutionHeight) ? viewPortWidth / designedResolutionWidth : viewPortHeight / designedResolutionHeight;
            var designW = designedResolutionWidth;
            var designH = designedResolutionHeight;

            var viewPortWidth = designW * scale;
            var viewPortHeight = designH * scale;

            var scale2 = 1;

            canvas.width = designW;
            canvas.height = designH / scale2;
            canvas.style.width = (viewPortWidth * scale2) + "px";
            canvas.style.height = viewPortHeight + "px";
            canvas.style.top = Math.floor((document.documentElement.clientHeight - viewPortHeight) / 2) + "px";
            container.style.width = (viewPortWidth * scale2) + "px";
            container.style.height = viewPortHeight + "px";
            delegate._scaleX = scale * scale2;
            delegate._scaleY = scale * scale2;
        };
        return ShowAll;
    })(ContentStrategy);
    egret.ShowAll = ShowAll;
    ShowAll.prototype.__class__ = "egret.ShowAll";
})(egret || (egret = {}));
