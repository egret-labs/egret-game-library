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
    * 加载配置文件并解析
    * @method RES.loadConfig
    * @param url {string} 配置文件路径(resource.json的路径)
    * @param resourceRoot {string} 资源根路径。配置中的所有url都是这个路径的相对值。最终url是这个字符串与配置里资源项的url相加的值。
    * @param type {string} 配置文件的格式。确定要用什么解析器来解析配置文件。默认"json"
    */
    function loadConfig(url, resourceRoot, type) {
        if (typeof resourceRoot === "undefined") { resourceRoot = ""; }
        if (typeof type === "undefined") { type = "json"; }
        instance.loadConfig(url, resourceRoot, type);
    }
    RES.loadConfig = loadConfig;

    /**
    * 根据组名加载一组资源
    * @method RES.loadGroup
    * @param name {string} 要加载资源组的组名
    * @param priority {number} 加载优先级,可以为负数,默认值为0。
    * 低优先级的组必须等待高优先级组完全加载结束才能开始，同一优先级的组会同时加载。
    */
    function loadGroup(name, priority) {
        if (typeof priority === "undefined") { priority = 0; }
        instance.loadGroup(name, priority);
    }
    RES.loadGroup = loadGroup;

    /**
    * 检查某个资源组是否已经加载完成
    * @method RES.isGroupLoaded
    * @param name {string} 组名
    * @returns {boolean}
    */
    function isGroupLoaded(name) {
        return instance.isGroupLoaded(name);
    }
    RES.isGroupLoaded = isGroupLoaded;

    /**
    * 根据组名获取组加载项列表
    * @method RES.getGroupByName
    * @param name {string} 组名
    * @returns {egret.ResourceItem}
    */
    function getGroupByName(name) {
        return instance.getGroupByName(name);
    }
    RES.getGroupByName = getGroupByName;

    /**
    * 创建自定义的加载资源组,注意：此方法仅在资源配置文件加载完成后执行才有效。
    * 可以监听ResourceEvent.CONFIG_COMPLETE事件来确认配置加载完成。
    * @method RES.createGroup
    * @param name {string} 要创建的加载资源组的组名
    * @param keys {egret.Array<string>} 要包含的键名列表，key对应配置文件里的name属性或sbuKeys属性的一项或一个资源组名。
    * @param override {boolean} 是否覆盖已经存在的同名资源组,默认false。
    * @returns {boolean}
    */
    function createGroup(name, keys, override) {
        if (typeof override === "undefined") { override = false; }
        return instance.createGroup(name, keys, override);
    }
    RES.createGroup = createGroup;

    /**
    * 检查配置文件里是否含有指定的资源
    * @method RES.hasRes
    * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
    * @returns {boolean}
    */
    function hasRes(key) {
        return instance.hasRes(key);
    }
    RES.hasRes = hasRes;

    /**
    * 同步方式获取缓存的已经加载成功的资源。<br/>
    * @method RES.getRes
    * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
    * @returns {any}
    */
    function getRes(key) {
        return instance.getRes(key);
    }
    RES.getRes = getRes;

    /**
    * 异步方式获取配置里的资源。只要是配置文件里存在的资源，都可以通过异步方式获取。
    * @method RES.getResAsync
    * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
    * @param compFunc {Function} 回调函数。示例：compFunc(data,key):void。
    * @param thisObject {any} 回调函数的this引用
    */
    function getResAsync(key, compFunc, thisObject) {
        instance.getResAsync(key, compFunc, thisObject);
    }
    RES.getResAsync = getResAsync;

    /**
    * 通过完整URL方式获取外部资源。
    * @method RES.getResByUrl
    * @param url {string} 要加载文件的外部路径。
    * @param compFunc {Function} 回调函数。示例：compFunc(data,url):void。
    * @param thisObject {any} 回调函数的this引用
    * @param type {string} 文件类型(可选)。请使用ResourceItem类中定义的静态常量。若不设置将根据文件扩展名生成。
    */
    function getResByUrl(url, compFunc, thisObject, type) {
        if (typeof type === "undefined") { type = ""; }
        instance.getResByUrl(url, compFunc, thisObject, type);
    }
    RES.getResByUrl = getResByUrl;

    /**
    * 销毁单个资源文件或一组资源的缓存数据,返回是否删除成功。
    * @method RES.destroyRes
    * @param name {string} 配置文件中加载项的name属性或资源组名
    * @returns {boolean}
    */
    function destroyRes(name) {
        return instance.destroyRes(name);
    }
    RES.destroyRes = destroyRes;

    /**
    * 设置最大并发加载线程数量，默认值是2.
    * @method RES.setMaxLoadingThread
    * @param thread {number} 要设置的并发加载数。
    */
    function setMaxLoadingThread(thread) {
        instance.setMaxLoadingThread(thread);
    }
    RES.setMaxLoadingThread = setMaxLoadingThread;

    /**
    * 添加事件侦听器,参考ResourceEvent定义的常量。
    * @method RES.addEventListener
    * @param type {string} 事件的类型。
    * @param listener {Function} 处理事件的侦听器函数。此函数必须接受 Event 对象作为其唯一的参数，并且不能返回任何结果，
    * 如下面的示例所示： function(evt:Event):void 函数可以有任何名称。
    * @param thisObject {any} 侦听函数绑定的this对象
    * @param useCapture {boolean} 确定侦听器是运行于捕获阶段还是运行于目标和冒泡阶段。如果将 useCapture 设置为 true，
    * 则侦听器只在捕获阶段处理事件，而不在目标或冒泡阶段处理事件。如果 useCapture 为 false，则侦听器只在目标或冒泡阶段处理事件。
    * 要在所有三个阶段都侦听事件，请调用 addEventListener 两次：一次将 useCapture 设置为 true，一次将 useCapture 设置为 false。
    * @param priority {number} 事件侦听器的优先级。优先级由一个带符号的 32 位整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在
    * 优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
    */
    function addEventListener(type, listener, thisObject, useCapture, priority) {
        if (typeof useCapture === "undefined") { useCapture = false; }
        if (typeof priority === "undefined") { priority = 0; }
        instance.addEventListener(type, listener, thisObject, useCapture, priority);
    }
    RES.addEventListener = addEventListener;

    /**
    * 移除事件侦听器,参考ResourceEvent定义的常量。
    * @method RES.removeEventListener
    * @param type {string} 事件名
    * @param listener {Function} 侦听函数
    * @param thisObject {any} 侦听函数绑定的this对象
    * @param useCapture {boolean} 是否使用捕获，这个属性只在显示列表中生效。
    */
    function removeEventListener(type, listener, thisObject, useCapture) {
        if (typeof useCapture === "undefined") { useCapture = false; }
        instance.removeEventListener(type, listener, thisObject, useCapture);
    }
    RES.removeEventListener = removeEventListener;

    var Resource = (function (_super) {
        __extends(Resource, _super);
        /**
        * 构造函数
        * @method RES.constructor
        */
        function Resource() {
            _super.call(this);
            /**
            * 解析器字典
            */
            this.analyzerDic = {};
            this.configItemList = [];
            this.callLaterFlag = false;
            /**
            * 配置文件加载解析完成标志
            */
            this.configComplete = false;
            /**
            * 已经加载过组名列表
            */
            this.loadedGroups = [];
            this.groupNameList = [];
            /**
            * 异步获取资源参数缓存字典
            */
            this.asyncDic = {};
            this.init();
        }
        /**
        * 根据type获取对应的文件解析库
        */
        Resource.prototype.getAnalyzerByType = function (type) {
            var analyzer = this.analyzerDic[type];
            if (!analyzer) {
                analyzer = this.analyzerDic[type] = egret.Injector.getInstance(RES.AnalyzerBase, type);
            }
            return analyzer;
        };

        /**
        * 初始化
        */
        Resource.prototype.init = function () {
            if (!egret.Injector.hasMapRule(RES.AnalyzerBase, RES.ResourceItem.TYPE_BIN))
                egret.Injector.mapClass(RES.AnalyzerBase, RES.BinAnalyzer, RES.ResourceItem.TYPE_BIN);
            if (!egret.Injector.hasMapRule(RES.AnalyzerBase, RES.ResourceItem.TYPE_IMAGE))
                egret.Injector.mapClass(RES.AnalyzerBase, RES.ImageAnalyzer, RES.ResourceItem.TYPE_IMAGE);
            if (!egret.Injector.hasMapRule(RES.AnalyzerBase, RES.ResourceItem.TYPE_TEXT))
                egret.Injector.mapClass(RES.AnalyzerBase, RES.TextAnalyzer, RES.ResourceItem.TYPE_TEXT);
            if (!egret.Injector.hasMapRule(RES.AnalyzerBase, RES.ResourceItem.TYPE_JSON))
                egret.Injector.mapClass(RES.AnalyzerBase, RES.JsonAnalyzer, RES.ResourceItem.TYPE_JSON);
            if (!egret.Injector.hasMapRule(RES.AnalyzerBase, RES.ResourceItem.TYPE_SHEET))
                egret.Injector.mapClass(RES.AnalyzerBase, RES.SheetAnalyzer, RES.ResourceItem.TYPE_SHEET);
            if (!egret.Injector.hasMapRule(RES.AnalyzerBase, RES.ResourceItem.TYPE_FONT))
                egret.Injector.mapClass(RES.AnalyzerBase, RES.FontAnalyzer, RES.ResourceItem.TYPE_FONT);
            if (!egret.Injector.hasMapRule(RES.AnalyzerBase, RES.ResourceItem.TYPE_SOUND))
                egret.Injector.mapClass(RES.AnalyzerBase, RES.SoundAnalyzer, RES.ResourceItem.TYPE_SOUND);
            if (!egret.Injector.hasMapRule(RES.AnalyzerBase, RES.ResourceItem.TYPE_XML))
                egret.Injector.mapClass(RES.AnalyzerBase, RES.XMLAnalyzer, RES.ResourceItem.TYPE_XML);
            this.resConfig = new RES.ResourceConfig();
            this.resLoader = new RES.ResourceLoader();
            this.resLoader.callBack = this.onResourceItemComp;
            this.resLoader.resInstance = this;
            this.resLoader.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this);
        };

        /**
        * 开始加载配置
        * @method RES.loadConfig
        * @param url {string}
        * @param resourceRoot {string}
        * @param type {string}
        */
        Resource.prototype.loadConfig = function (url, resourceRoot, type) {
            if (typeof type === "undefined") { type = "json"; }
            var configItem = { url: url, resourceRoot: resourceRoot, type: type };
            this.configItemList.push(configItem);
            if (!this.callLaterFlag) {
                egret.callLater(this.startLoadConfig, this);
                this.callLaterFlag = true;
            }
        };

        Resource.prototype.startLoadConfig = function () {
            this.callLaterFlag = false;
            var configList = this.configItemList;
            this.configItemList = [];
            this.loadingConfigList = configList;
            var length = configList.length;
            var itemList = [];
            for (var i = 0; i < length; i++) {
                var item = configList[i];
                var resItem = new RES.ResourceItem(item.url, item.url, item.type);
                itemList.push(resItem);
            }
            this.resLoader.loadGroup(itemList, Resource.GROUP_CONFIG, Number.MAX_VALUE);
        };

        /**
        * 检查某个资源组是否已经加载完成
        * @method RES.isGroupLoaded
        * @param name {string}
        * @returns {boolean}
        */
        Resource.prototype.isGroupLoaded = function (name) {
            return this.loadedGroups.indexOf(name) != -1;
        };

        /**
        * 根据组名获取组加载项列表
        * @method RES.getGroupByName
        * @param name {string}
        * @returns {Array<egret.ResourceItem>}
        */
        Resource.prototype.getGroupByName = function (name) {
            return this.resConfig.getGroupByName(name);
        };

        /**
        * 根据组名加载一组资源
        * @method RES.loadGroup
        * @param name {string}
        * @param priority {number}
        */
        Resource.prototype.loadGroup = function (name, priority) {
            if (typeof priority === "undefined") { priority = 0; }
            if (this.loadedGroups.indexOf(name) != -1 || this.resLoader.isGroupInLoading(name))
                return;
            if (this.configComplete) {
                var group = this.resConfig.getGroupByName(name);
                this.resLoader.loadGroup(group, name, priority);
            } else {
                this.groupNameList.push({ name: name, priority: priority });
            }
        };

        /**
        * 创建自定义的加载资源组,注意：此方法仅在资源配置文件加载完成后执行才有效。
        * 可以监听ResourceEvent.CONFIG_COMPLETE事件来确认配置加载完成。
        * @method RES.ResourceConfig#createGroup
        * @param name {string} 要创建的加载资源组的组名
        * @param keys {egret.Array<string>} 要包含的键名列表，key对应配置文件里的name属性或一个资源组名。
        * @param override {boolean} 是否覆盖已经存在的同名资源组,默认false。
        * @returns {boolean}
        */
        Resource.prototype.createGroup = function (name, keys, override) {
            if (typeof override === "undefined") { override = false; }
            if (override) {
                var index = this.loadedGroups.indexOf(name);
                if (index != -1) {
                    this.loadedGroups.splice(index, 1);
                }
            }
            return this.resConfig.createGroup(name, keys, override);
        };

        /**
        * 队列加载完成事件
        */
        Resource.prototype.onGroupComp = function (event) {
            if (event.groupName == Resource.GROUP_CONFIG) {
                var length = this.loadingConfigList.length;
                for (var i = 0; i < length; i++) {
                    var config = this.loadingConfigList[i];
                    var resolver = this.getAnalyzerByType(config.type);
                    var data = resolver.getRes(config.url);
                    resolver.destroyRes(config.url);
                    this.resConfig.parseConfig(data, config.resourceRoot);
                }
                this.configComplete = true;
                this.loadingConfigList = null;
                RES.ResourceEvent.dispatchResourceEvent(this, RES.ResourceEvent.CONFIG_COMPLETE);
                var groupNameList = this.groupNameList;
                var length = groupNameList.length;
                for (var i = 0; i < length; i++) {
                    var item = groupNameList[i];
                    this.loadGroup(item.name, item.priority);
                }
                this.groupNameList = [];
            } else {
                this.loadedGroups.push(event.groupName);
                this.dispatchEvent(event);
            }
        };

        /**
        * 检查配置文件里是否含有指定的资源
        * @method RES.hasRes
        * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
        * @returns {boolean}
        */
        Resource.prototype.hasRes = function (key) {
            var type = this.resConfig.getType(key);
            if (type == "") {
                var prefix = RES.AnalyzerBase.getStringPrefix(key);
                type = this.resConfig.getType(prefix);
                if (type == "") {
                    return false;
                }
            }
            return true;
        };

        /**
        * 通过key同步获取资源
        * @method RES.getRes
        * @param key {string}
        * @returns {any}
        */
        Resource.prototype.getRes = function (key) {
            var type = this.resConfig.getType(key);
            if (type == "") {
                var prefix = RES.AnalyzerBase.getStringPrefix(key);
                type = this.resConfig.getType(prefix);
                if (type == "") {
                    return null;
                }
            }

            var analyzer = this.getAnalyzerByType(type);
            return analyzer.getRes(key);
        };

        /**
        * 通过key异步获取资源
        * @method RES.getResAsync
        * @param key {string}
        * @param compFunc {Function} 回调函数。示例：compFunc(data,url):void。
        * @param thisObject {any}
        */
        Resource.prototype.getResAsync = function (key, compFunc, thisObject) {
            var type = this.resConfig.getType(key);
            var name = this.resConfig.getName(key);
            if (type == "") {
                name = RES.AnalyzerBase.getStringPrefix(key);
                type = this.resConfig.getType(name);
                if (type == "") {
                    compFunc.call(thisObject, null);
                    return;
                }
            }
            var analyzer = this.getAnalyzerByType(type);
            var res = analyzer.getRes(key);
            if (res) {
                compFunc.call(thisObject, res);
                return;
            }
            var args = { key: key, compFunc: compFunc, thisObject: thisObject };
            if (this.asyncDic[name]) {
                this.asyncDic[name].push(args);
            } else {
                this.asyncDic[name] = [args];
                var resItem = this.resConfig.getResourceItem(name);
                this.resLoader.loadItem(resItem);
            }
        };

        /**
        * 通过url获取资源
        * @method RES.getResByUrl
        * @param url {string}
        * @param compFunc {Function}
        * @param thisObject {any}
        * @param type {string}
        */
        Resource.prototype.getResByUrl = function (url, compFunc, thisObject, type) {
            if (typeof type === "undefined") { type = ""; }
            if (!url) {
                compFunc.call(thisObject, null);
                return;
            }
            if (!type)
                type = this.getTypeByUrl(url);
            var analyzer = this.getAnalyzerByType(type);

            var name = url;
            var res = analyzer.getRes(name);
            if (res) {
                compFunc.call(thisObject, res);
                return;
            }
            var args = { key: name, compFunc: compFunc, thisObject: thisObject };
            if (this.asyncDic[name]) {
                this.asyncDic[name].push(args);
            } else {
                this.asyncDic[name] = [args];
                var resItem = new RES.ResourceItem(name, url, type);
                this.resLoader.loadItem(resItem);
            }
        };

        /**
        * 通过url获取文件类型
        */
        Resource.prototype.getTypeByUrl = function (url) {
            var suffix = url.substr(url.lastIndexOf(".") + 1);
            if (suffix) {
                suffix = suffix.toLowerCase();
            }
            var type;
            switch (suffix) {
                case RES.ResourceItem.TYPE_XML:
                case RES.ResourceItem.TYPE_JSON:
                case RES.ResourceItem.TYPE_SHEET:
                    type = suffix;
                    break;
                case "png":
                case "jpg":
                case "gif":
                    type = RES.ResourceItem.TYPE_IMAGE;
                    break;
                case "fnt":
                    type = RES.ResourceItem.TYPE_FONT;
                    break;
                case "txt":
                    type = RES.ResourceItem.TYPE_TEXT;
                    break;
                case "mp3":
                case "ogg":
                case "mpeg":
                case "wav":
                case "m4a":
                case "mp4":
                case "aiff":
                case "wma":
                case "mid":
                    type = RES.ResourceItem.TYPE_SOUND;
                    break;
                default:
                    type = RES.ResourceItem.TYPE_BIN;
                    break;
            }
            return type;
        };

        /**
        * 一个加载项加载完成
        */
        Resource.prototype.onResourceItemComp = function (item) {
            var argsList = this.asyncDic[item.name];
            delete this.asyncDic[item.name];
            var analyzer = this.getAnalyzerByType(item.type);
            var length = argsList.length;
            for (var i = 0; i < length; i++) {
                var args = argsList[i];
                var res = analyzer.getRes(args.key);
                args.compFunc.call(args.thisObject, res, args.key);
            }
        };

        /**
        * 销毁单个资源文件或一组资源的缓存数据,返回是否删除成功。
        * @method RES.destroyRes
        * @param name {string} 配置文件中加载项的name属性或资源组名
        * @returns {boolean}
        */
        Resource.prototype.destroyRes = function (name) {
            var group = this.resConfig.getRawGroupByName(name);
            if (group) {
                var index = this.loadedGroups.indexOf(name);
                if (index != -1) {
                    this.loadedGroups.splice(index, 1);
                }
                var length = group.length;
                for (var i = 0; i < length; i++) {
                    var item = group[i];
                    item.loaded = false;
                    var analyzer = this.getAnalyzerByType(item.type);
                    analyzer.destroyRes(item.name);
                }
                return true;
            } else {
                var type = this.resConfig.getType(name);
                if (type == "")
                    return false;
                item = this.resConfig.getRawResourceItem(name);
                item.loaded = false;
                analyzer = this.getAnalyzerByType(type);
                return analyzer.destroyRes(name);
            }
        };

        /**
        * 设置最大并发加载线程数量，默认值是2.
        * @method RES.setMaxLoadingThread
        * @param thread {number} 要设置的并发加载数。
        */
        Resource.prototype.setMaxLoadingThread = function (thread) {
            if (thread < 1) {
                thread = 1;
            }
            this.resLoader.thread = thread;
        };
        Resource.GROUP_CONFIG = "RES__CONFIG";
        return Resource;
    })(egret.EventDispatcher);
    Resource.prototype.__class__ = "Resource";

    /**
    * Resource单例
    */
    var instance = new Resource();
})(RES || (RES = {}));
