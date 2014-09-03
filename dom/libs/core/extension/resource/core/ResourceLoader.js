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
    /**
    * @class RES.ResourceLoader
    * @classdesc
    * @extends egret.EventDispatcher
    */
    var ResourceLoader = (function (_super) {
        __extends(ResourceLoader, _super);
        /**
        * 构造函数
        * @method RES.ResourceLoader#constructor
        */
        function ResourceLoader() {
            _super.call(this);
            /**
            * 最大并发加载数
            */
            this.thread = 2;
            /**
            * 正在加载的线程计数
            */
            this.loadingCount = 0;
            /**
            * 当前组加载的项总个数,key为groupName
            */
            this.groupTotalDic = {};
            /**
            * 已经加载的项个数,key为groupName
            */
            this.numLoadedDic = {};
            /**
            * 正在加载的组列表,key为groupName
            */
            this.itemListDic = {};
            /**
            * 优先级队列,key为priority，value为groupName列表
            */
            this.priorityQueue = {};
            /**
            * 延迟加载队列
            */
            this.lazyLoadList = new Array();
            /**
            * 资源解析库字典类
            */
            this.analyzerDic = {};
            /**
            * 当前应该加载同优先级队列的第几列
            */
            this.queueIndex = 0;
        }
        /**
        * 检查指定的组是否正在加载中
        * @method RES.ResourceLoader#isGroupInLoading
        * @param groupName {string}
        * @returns {boolean}
        */
        ResourceLoader.prototype.isGroupInLoading = function (groupName) {
            return this.itemListDic[groupName] !== undefined;
        };

        /**
        * 开始加载一组文件
        * @method RES.ResourceLoader#loadGroup
        * @param list {egret.Array<ResourceItem>} 加载项列表
        * @param groupName {string} 组名
        * @param priority {number} 加载优先级
        */
        ResourceLoader.prototype.loadGroup = function (list, groupName, priority) {
            if (typeof priority === "undefined") { priority = 0; }
            if (this.itemListDic[groupName] || !groupName)
                return;
            if (!list || list.length == 0) {
                var event = new RES.ResourceEvent(RES.ResourceEvent.GROUP_COMPLETE);
                event.groupName = groupName;
                this.dispatchEvent(event);
                return;
            }
            if (this.priorityQueue[priority])
                this.priorityQueue[priority].push(groupName);
            else
                this.priorityQueue[priority] = [groupName];
            this.itemListDic[groupName] = list;
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var resItem = list[i];
                resItem.groupName = groupName;
            }
            this.groupTotalDic[groupName] = list.length;
            this.numLoadedDic[groupName] = 0;
            this.next();
        };

        /**
        * 加载一个文件
        * @method RES.ResourceLoader#loadItem
        * @param resItem {egret.ResourceItem} 要加载的项
        */
        ResourceLoader.prototype.loadItem = function (resItem) {
            this.lazyLoadList.push(resItem);
            resItem.groupName = "";
            this.next();
        };

        /**
        * 加载下一项
        */
        ResourceLoader.prototype.next = function () {
            while (this.loadingCount < this.thread) {
                var resItem = this.getOneResourceItem();
                if (!resItem)
                    break;
                this.loadingCount++;
                if (resItem.loaded) {
                    this.onItemComplete(resItem);
                } else {
                    var analyzer = this.analyzerDic[resItem.type];
                    if (!analyzer) {
                        analyzer = this.analyzerDic[resItem.type] = egret.Injector.getInstance(RES.AnalyzerBase, resItem.type);
                    }
                    analyzer.loadFile(resItem, this.onItemComplete, this);
                }
            }
        };

        /**
        * 获取下一个待加载项
        */
        ResourceLoader.prototype.getOneResourceItem = function () {
            var maxPriority = Number.NEGATIVE_INFINITY;
            for (var p in this.priorityQueue) {
                maxPriority = Math.max(maxPriority, p);
            }
            var queue = this.priorityQueue[maxPriority];
            if (!queue || queue.length == 0) {
                if (this.lazyLoadList.length == 0)
                    return null;

                //后请求的先加载，以便更快获取当前需要的资源
                return this.lazyLoadList.pop();
            }
            var length = queue.length;
            var list;
            for (var i = 0; i < length; i++) {
                if (this.queueIndex >= length)
                    this.queueIndex = 0;
                list = this.itemListDic[queue[this.queueIndex]];
                if (list.length > 0)
                    break;
                this.queueIndex++;
            }
            if (list.length == 0)
                return null;
            return list.shift();
        };

        /**
        * 加载结束
        */
        ResourceLoader.prototype.onItemComplete = function (resItem) {
            this.loadingCount--;
            var groupName = resItem.groupName;
            if (!resItem.loaded) {
                RES.ResourceEvent.dispatchResourceEvent(this.resInstance, RES.ResourceEvent.ITEM_LOAD_ERROR, groupName, resItem);
            }

            if (groupName) {
                this.numLoadedDic[groupName]++;
                var itemsLoaded = this.numLoadedDic[groupName];
                var itemsTotal = this.groupTotalDic[groupName];
                RES.ResourceEvent.dispatchResourceEvent(this.resInstance, RES.ResourceEvent.GROUP_PROGRESS, groupName, resItem, itemsLoaded, itemsTotal);
                if (itemsLoaded == itemsTotal) {
                    this.removeGroupName(groupName);
                    delete this.groupTotalDic[groupName];
                    delete this.numLoadedDic[groupName];
                    delete this.itemListDic[groupName];

                    RES.ResourceEvent.dispatchResourceEvent(this, RES.ResourceEvent.GROUP_COMPLETE, groupName);
                }
            } else {
                this.callBack.call(this.resInstance, resItem);
            }
            this.next();
        };

        /**
        * 从优先级队列中移除指定的组名
        */
        ResourceLoader.prototype.removeGroupName = function (groupName) {
            for (var p in this.priorityQueue) {
                var queue = this.priorityQueue[p];
                var length = queue.length;
                var index = 0;
                var found = false;
                var length = queue.length;
                for (var i = 0; i < length; i++) {
                    var name = queue[i];
                    if (name == groupName) {
                        queue.splice(index, 1);
                        found = true;
                        break;
                    }
                    index++;
                }
                if (found) {
                    if (queue.length == 0) {
                        delete this.priorityQueue[p];
                    }
                    break;
                }
            }
        };
        return ResourceLoader;
    })(egret.EventDispatcher);
    RES.ResourceLoader = ResourceLoader;
    ResourceLoader.prototype.__class__ = "RES.ResourceLoader";
})(RES || (RES = {}));
