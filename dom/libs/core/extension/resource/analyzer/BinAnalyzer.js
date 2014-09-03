/**
* Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
* to any person obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish, distribute,
* sublicense, and/or sell copies of the Software, and to permit persons to whom
* the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included
* in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
* INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
* PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
* FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
* ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RES;
(function (RES) {
    var BinAnalyzer = (function (_super) {
        __extends(BinAnalyzer, _super);
        /**
        * 构造函数
        */
        function BinAnalyzer() {
            _super.call(this);
            /**
            * 字节流数据缓存字典
            */
            this.fileDic = {};
            /**
            * 加载项字典
            */
            this.resItemDic = [];
            this._dataFormat = egret.URLLoaderDataFormat.BINARY;
            /**
            * URLLoader对象池
            */
            this.recycler = new egret.Recycler();
        }
        /**
        * @inheritDoc
        */
        BinAnalyzer.prototype.loadFile = function (resItem, compFunc, thisObject) {
            if (this.fileDic[resItem.name]) {
                compFunc.call(thisObject, resItem);
                return;
            }
            var loader = this.getLoader();
            this.resItemDic[loader.hashCode] = { item: resItem, func: compFunc, thisObject: thisObject };
            loader.load(new egret.URLRequest(resItem.url));
        };

        /**
        * 获取一个URLLoader对象
        */
        BinAnalyzer.prototype.getLoader = function () {
            var loader = this.recycler.pop();
            if (!loader) {
                loader = new egret.URLLoader();
                loader.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
                loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
            }
            loader.dataFormat = this._dataFormat;
            return loader;
        };

        /**
        * 一项加载结束
        */
        BinAnalyzer.prototype.onLoadFinish = function (event) {
            var loader = (event.target);
            var data = this.resItemDic[loader.hashCode];
            delete this.resItemDic[loader.hashCode];
            this.recycler.push(loader);
            var resItem = data.item;
            var compFunc = data.func;
            resItem.loaded = (event.type == egret.Event.COMPLETE);
            if (resItem.loaded) {
                this.analyzeData(resItem, loader.data);
            }
            compFunc.call(data.thisObject, resItem);
        };

        /**
        * 解析并缓存加载成功的数据
        */
        BinAnalyzer.prototype.analyzeData = function (resItem, data) {
            var name = resItem.name;
            if (this.fileDic[name] || !data) {
                return;
            }
            this.fileDic[name] = data;
        };

        /**
        * @inheritDoc
        */
        BinAnalyzer.prototype.getRes = function (name) {
            return this.fileDic[name];
        };

        /**
        * @inheritDoc
        */
        BinAnalyzer.prototype.hasRes = function (name) {
            var res = this.getRes(name);
            return res != null;
        };

        /**
        * @inheritDoc
        */
        BinAnalyzer.prototype.destroyRes = function (name) {
            if (this.fileDic[name]) {
                delete this.fileDic[name];
                return true;
            }
            return false;
        };
        return BinAnalyzer;
    })(RES.AnalyzerBase);
    RES.BinAnalyzer = BinAnalyzer;
    BinAnalyzer.prototype.__class__ = "RES.BinAnalyzer";
})(RES || (RES = {}));
