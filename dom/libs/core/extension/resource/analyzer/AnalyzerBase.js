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
    var AnalyzerBase = (function (_super) {
        __extends(AnalyzerBase, _super);
        function AnalyzerBase() {
            _super.call(this);
        }
        /**
        * 加载一个资源文件
        * @param resItem 加载项信息
        * @param compFunc 加载完成回调函数,示例:compFunc(resItem:ResourceItem):void;
        * @param thisObject 加载完成回调函数的this引用
        */
        AnalyzerBase.prototype.loadFile = function (resItem, compFunc, thisObject) {
        };

        /**
        * 同步方式获取解析完成的数据
        * @param name 对应配置文件里的name属性。
        */
        AnalyzerBase.prototype.getRes = function (name) {
        };

        /**
        * 销毁某个资源文件的二进制数据,返回是否删除成功。
        * @param name 配置文件中加载项的name属性
        */
        AnalyzerBase.prototype.destroyRes = function (name) {
            return false;
        };

        /**
        * 读取一个字符串里第一个点之前的内容。
        * @param name {string} 要读取的字符串
        */
        AnalyzerBase.getStringPrefix = function (name) {
            if (!name) {
                return "";
            }
            var index = name.indexOf(".");
            if (index != -1) {
                return name.substring(0, index);
            }
            return "";
        };

        /**
        * 读取一个字符串里第一个点之后的内容。
        * @param name {string} 要读取的字符串
        */
        AnalyzerBase.getStringTail = function (name) {
            if (!name) {
                return "";
            }
            var index = name.indexOf(".");
            if (index != -1) {
                return name.substring(index + 1);
            }
            return "";
        };
        return AnalyzerBase;
    })(egret.HashObject);
    RES.AnalyzerBase = AnalyzerBase;
    AnalyzerBase.prototype.__class__ = "RES.AnalyzerBase";
})(RES || (RES = {}));
