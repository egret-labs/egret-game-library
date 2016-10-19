var TreeViewItem = (function (_super) {
    __extends(TreeViewItem, _super);
    function TreeViewItem() {
        _super.call(this);
        this.myHeight = 0;
    }
    var d = __define,c=TreeViewItem,p=c.prototype;
    p.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.arrowiconBg.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.itemBgRect.addEventListener(egret.TouchEvent.TOUCH_END, this.itemBgRectOnTouchEnd, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.arrowicon.anchorOffsetX = this.arrowicon.width;
        this.arrowicon.anchorOffsetY = this.arrowicon.height;
        this.arrowicon.rotation = -90;
        this.rootNode.touchEnabled = false;
        this.arrowicon.touchEnabled = false;
        this.foldericon.touchEnabled = false;
        this.content.touchEnabled = false;
    };
    p.dataChanged = function () {
        if (typeof (this.data.arrowicon) == "undefined") {
            this.data.arrowicon = "resource/assets/TreeView/icon.png";
        }
        if (typeof (this.data.foldericon) == "undefined") {
            this.data.foldericon = { normal: "resource/assets/TreeView/folder_normal.png", press: "resource/assets/TreeView/folder_press.png" };
        }
        if (typeof (this.data.content) == "undefined") {
            this.data.content = "";
        }
        this.arrowicon.source = this.data.arrowicon;
        this.foldericon.source = this.data.foldericon.normal;
        this.content.text = this.data.content;
        //高度
        if (typeof (this.data.itemHeight) != "undefined") {
            this.myHeight = this.data.itemHeight;
        }
        else {
            this.myHeight = 113.6;
        }
        this.height = this.myHeight;
        this.rootNode.height = this.myHeight;
        this.itemBgRect.height = this.myHeight;
        this.itemBgRect.width = this.width;
        //背景颜色
        if (typeof (this.data.bgColor) != "undefined") {
            this.itemBgRect.fillColor = this.data.bgColor;
        }
        else {
            this.itemBgRect.fillColor = 0xffffff;
            this.data.bgColor = 0xffffff;
        }
        this.bgRect.fillColor = this.data.bgColor;
        this.width = this.parent.width - 70;
        //字体大小
        if (typeof (this.data.fontSize) != "undefined") {
            this.content.size = this.data.fontSize;
        }
        if (typeof (this.data.items) == "undefined" || this.data.items == null) {
            this.arrowicon.visible = false;
            this.arrowiconBg.visible = false;
        }
    };
    p.update = function () {
        if (this.name != "") {
            if (this.name == TreeView.isSelectName) {
                if (typeof (this.data.selectedColor) != "undefined") {
                    this.itemBgRect.fillColor = this.data.selectedColor;
                }
                else {
                    this.itemBgRect.fillColor = 0x000000;
                }
            }
            else {
                this.itemBgRect.fillColor = this.data.bgColor;
            }
        }
    };
    p.itemBgRectOnTouchEnd = function (event) {
        event.stopPropagation();
        //按下背景
        this.name = this.hashCode.toString();
        TreeView.isSelectName = this.name;
        this.popEvent();
    };
    //事件派发
    p.popEvent = function () {
        var data = {};
        data["pos"] = this.data.pos;
        if (this.arrowicon.rotation == 0) {
            data["isOpen"] = true;
        }
        else {
            data["isOpen"] = false;
        }
        this.dispatchEventWith(TreeView.onClick, true, data);
    };
    p.onTouchEnd = function (event) {
        //按下背景
        this.name = this.hashCode.toString();
        TreeView.isSelectName = this.name;
        this.popEvent();
        event.stopPropagation();
        if (this.arrowicon.rotation == 0) {
            this.arrowicon.rotation = -90;
            this.foldericon.source = this.data.foldericon.normal;
            if (typeof (this.data.items) != "undefined" && this.data.items != null) {
                //移除视图
                this.removeChild(this.DataGroup);
                this.height = this.myHeight;
                if (typeof (this.data.that) != "undefined") {
                    this.data.that.height -= this.height * this.data.items.length;
                }
            }
        }
        else {
            this.arrowicon.rotation = 0;
            this.foldericon.source = this.data.foldericon.press;
            if (typeof (this.data.items) != "undefined" && this.data.items != null) {
                this.DataGroup = new eui.DataGroup();
                this.DataGroup.y = this.height;
                this.DataGroup.x = 70;
                //this.width -=70 ;
                //this.DataGroup.width = this.width - 70;
                this.addChild(this.DataGroup);
                //更改第二及以下item的高度，因为只有第一列表有Scroll，其它子列表没有。
                if (this.data.level == 1) {
                    //更改当前item的高度
                    this.height += this.height * this.data.items.length;
                    var self = this;
                    if (typeof (this.data.items) != "undefined" && this.data.items != null) {
                        loopData(this.data.items);
                    }
                    function loopData(items) {
                        for (var i = 0; i < items.length; i++) {
                            items[i].that = self;
                            if (items[i].items != null) {
                                loopData(items[i].items);
                            }
                        }
                    }
                }
                else {
                    var changeHeight = this.height * this.data.items.length;
                    //更改当前item的高度
                    this.height += changeHeight;
                    //更改parent的高度
                    this.data.that.height += changeHeight;
                }
                this.DataGroup.dataProvider = new eui.ArrayCollection(this.data.items);
                this.DataGroup.itemRenderer = TreeViewItem;
                this.DataGroup.useVirtualLayout = false;
            }
            else {
                console.log("没有子数据了");
            }
        }
    };
    return TreeViewItem;
}(eui.ItemRenderer));
egret.registerClass(TreeViewItem,'TreeViewItem');

var TreeView = (function (_super) {
    __extends(TreeView, _super);
    /**
     * 	item data
     */
    function TreeView(items) {
        if (items === void 0) { items = null; }
        _super.call(this);
        /**
         * items: treeView data
         */
        this.items = [];
        var self = this;
        if (items != null) {
            this.items = items;
        }
        else {
            this.items = [
                {
                    arrowicon: "resource/assets/TreeView/icon.png",
                    foldericon: { normal: "resource/assets/TreeView/folder_normal.png", press: "resource/assets/TreeView/folder_press.png" },
                    content: "本地磁盘(C:)",
                    items: [
                        {
                            arrowicon: "resource/arrow_drop_down_72.png",
                            foldericon: { normal: "resource/assets/TreeView/folder_normal.png", press: "resource/assets/TreeView/folder_press.png" },
                            content: "Program Files",
                            items: null
                        },
                    ]
                },
                {
                    arrowicon: "resource/assets/TreeView/icon.png",
                    foldericon: { normal: "resource/assets/TreeView/folder_normal.png", press: "resource/assets/TreeView/folder_press.png" },
                    content: "本地磁盘(D:)",
                }
            ];
        }
        //handle data :为了 treeViewTestItem能识别
        loopData(this.items);
        function loopData(items) {
            for (var i = 0; i < items.length; i++) {
                items[i]["level"] = 1;
            }
        }
        //增加识别下标
        loopDataPos(this.items, []);
        function loopDataPos(items, parentPos) {
            for (var i = 0; i < items.length; i++) {
                items[i]["pos"] = [];
                for (var j = 0; j < parentPos.length; j++) {
                    items[i]["pos"].push(parentPos[j]);
                }
                items[i]["pos"].push(i);
                if (items[i].items != null) {
                    loopDataPos(items[i].items, items[i]["pos"]);
                }
            }
        }
    }
    var d = __define,c=TreeView,p=c.prototype;
    p.partAdded = function (partName, instance) {
        //super.partAdded(partName,instance);
    };
    p.childrenCreated = function () {
        //super.childrenCreated();
        this.Scroller = new eui.Scroller();
        this.addChild(this.Scroller);
        this.Scroller.x = 0;
        this.Scroller.y = 0;
        this.DataGroup = new eui.DataGroup();
        this.DataGroup.y = this.height;
        this.DataGroup.x = 0;
        this.addChild(this.DataGroup);
        //2.设置相关参数
        this.itemDataCollection = new eui.ArrayCollection(this.items);
        this.DataGroup.dataProvider = this.itemDataCollection;
        this.DataGroup.itemRenderer = TreeViewItem;
        this.Scroller.viewport = this.DataGroup;
        //大数据优化:numElements 会获得总的数据条数. numChildren 会获得具体的实例数量.
        this.DataGroup.useVirtualLayout = false; //不要缓存它；会出现bug.
    };
    /**
     * TreeView Width
     */
    p.setWidth = function (width) {
        this.Scroller.width = width;
        //设置不能滚动
        this.DataGroup.width = width;
    };
    /**
     * TreeView Height
     */
    p.setHeight = function (height) {
        this.Scroller.height = height;
    };
    /**
     * set treeview item height
     */
    p.setItemHeight = function (itemHeight) {
        this.loopData(this.items, "itemHeight", itemHeight);
    };
    /**
     * set treeview item width
     */
    p.setItemWidth = function (itemWidth) {
        if (itemWidth === void 0) { itemWidth = 113.6; }
    };
    /**
     * item BackgroundColor
     */
    p.setBgColor = function (color) {
        this.loopData(this.items, "bgColor", color);
    };
    /**
     * treeview item selected color
     */
    p.setSelectedColor = function (color) {
        this.loopData(this.items, "selectedColor", color);
    };
    /**
     * treeview item content fontSize
     */
    p.setFontSize = function (size) {
        this.loopData(this.items, "fontSize", size);
    };
    p.loopData = function (items, key, value) {
        for (var i = 0; i < items.length; i++) {
            items[i][key] = value;
            if (items[i].items != null) {
                this.loopData(items[i].items, key, value);
            }
        }
    };
    /**
     * is selected
     */
    TreeView.isSelectName = "";
    TreeView.onClick = "treeViewTestOnClick";
    return TreeView;
}(eui.Component));
egret.registerClass(TreeView,'TreeView',["eui.UIComponent"]);

