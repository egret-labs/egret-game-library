var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ComboBoxItem = (function (_super) {
    __extends(ComboBoxItem, _super);
    function ComboBoxItem() {
        return _super.call(this) || this;
    }
    ComboBoxItem.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    ComboBoxItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        //背景
        this.bg = new eui.Image();
        this.addChild(this.bg);
        this.bg.width = this.stage.stageWidth;
        this.bg.height = 113;
        //内容
        this.content = new eui.Label();
        this.addChild(this.content);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.content.textAlign = "center";
        this.content.verticalAlign = "middle";
        this.content.textColor = 0x000000;
    };
    ComboBoxItem.prototype.dataChanged = function () {
        //this.bg.source = this.data.bg;
        if (typeof (this.data.content) != "undefined") {
            //内容
            this.content.text = this.data.content;
        }
        if (typeof (this.data.width) != "undefined") {
            //宽度
            this.width = this.data.width;
            this.content.width = this.data.width;
        }
        if (typeof (this.data.bg) != "undefined") {
            //背景
            this.bg.source = this.data.bg;
        }
        else {
            this.bg.source = "resource/assets/ScrollBar/track_sb.png";
        }
        if (typeof (this.data.height) != "undefined") {
            //高度
            this.height = this.data.height;
            this.bg.height = this.data.height;
            this.content.height = this.data.height;
        }
        if (typeof (this.data.fontSize) != "undefined") {
            //字体大小
            this.content.size = this.data.fontSize;
        }
        if (typeof (this.data.textAlign) != "undefined") {
            //字体对齐方式
            this.content.textAlign = this.data.textAlign;
        }
    };
    ComboBoxItem.prototype.onTouchEnd = function (event) {
        var data = {};
        data["itemIndex"] = this.itemIndex;
        this.dispatchEventWith(ComboBox.onClick, true, data);
    };
    return ComboBoxItem;
}(eui.ItemRenderer));
__reflect(ComboBoxItem.prototype, "ComboBoxItem");
var ComboBox = (function (_super) {
    __extends(ComboBox, _super);
    function ComboBox(data) {
        if (data === void 0) { data = null; }
        var _this = _super.call(this) || this;
        _this.isPullDown = true;
        if (data != null) {
            _this.data = data;
        }
        return _this;
    }
    ComboBox.prototype.childrenCreated = function () {
        //super.childrenCreated();
        this.initPullView();
    };
    ComboBox.prototype.updateData = function (key, value) {
        for (var i = 0; i < this.data.length; i++) {
            this.data[i][key] = value;
        }
    };
    ComboBox.prototype.initPullView = function () {
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        //背景图片
        this.bg = new eui.Image();
        this.bg.source = "resource/assets/ItemRenderer/selected.png";
        this.addChild(this.bg);
        this.bg.width = this.width;
        this.bg.height = 114;
        //标题
        this.titleLabel = new eui.Label();
        this.addChild(this.titleLabel);
        this.titleLabel.width = this.width;
        this.titleLabel.height = 114;
        this.titleLabel.textColor = 0x000000;
        this.titleLabel.verticalAlign = "middle";
        this.titleLabel.textAlign = "center";
        this.titleLabel.text = "ComboBox";
        this.titleLabel.size = 60;
        this.titleLabel.addEventListener(egret.TouchEvent.TOUCH_END, this.onRightIconBg, this);
        //1.准备数据
        var myCollection = new eui.ArrayCollection(this.data); //用ArrayCollection包装
        //2.设置相关参数
        this.Scroller = new eui.Scroller();
        this.addChild(this.Scroller);
        this.Scroller.y = 114;
        this.Scroller.width = this.width;
        this.Scroller.height = this.height;
        this.DataGroup = new eui.DataGroup();
        this.Scroller.addChild(this.DataGroup);
        this.DataGroup.dataProvider = myCollection;
        this.DataGroup.itemRenderer = ComboBoxItem;
        this.Scroller.viewport = this.DataGroup;
        //大数据优化:numElements 会获得总的数据条数. numChildren 会获得具体的实例数量.
        this.DataGroup.useVirtualLayout = true;
    };
    ComboBox.prototype.onRightIconBg = function (event) {
        if (!this.isPullDown) {
            this.isPullDown = true;
            //展开
            this.addChild(this.Scroller);
        }
        else {
            this.isPullDown = false;
            //收起
            this.removeChild(this.Scroller);
        }
    };
    ComboBox.prototype.getTitleLabe = function () {
        return this.titleLabel;
    };
    /**
     * Set the item width of the comboBox
     *
     */
    ComboBox.prototype.setItemWidth = function (width) {
        this.width = width;
        this.bg.width = width;
        this.titleLabel.width = width;
        this.Scroller.width = width;
        this.updateData("width", width);
    };
    /**
     * Set the item height of the comboBox
     *
     */
    ComboBox.prototype.setItemHeight = function (height) {
        this.updateData("height", height);
    };
    /**
     * Set the title fontSize of the comboBox
     */
    ComboBox.prototype.setItemFontSize = function (number) {
        if (number === void 0) { number = 25; }
        this.updateData("fontSize", number);
    };
    /**
     * Set the title height of the comboBox
     *
     */
    ComboBox.prototype.setTitleHeight = function (height) {
        this.bg.height = height;
        this.titleLabel.height = height;
        this.Scroller.y = height;
    };
    /**
     * Set the title background of the comboBox
     * example:"reource/picture.png"
     */
    ComboBox.prototype.setTitleBackground = function (src) {
        this.bg.source = src;
    };
    /**
     * Set the title fontSize of the comboBox
     */
    ComboBox.prototype.setTitleFontSize = function (number) {
        this.titleLabel.size = number;
    };
    /**
     * Show the comboBox
     */
    ComboBox.prototype.show = function () {
        this.isPullDown = true;
        //展开
        this.addChild(this.Scroller);
    };
    /**
     * Hidden the comboBox
     */
    ComboBox.prototype.hide = function () {
        this.isPullDown = false;
        //收起
        this.removeChild(this.Scroller);
    };
    /**
     * TextAlign:"left";"center";"right"
     */
    ComboBox.prototype.setItemTextAlign = function (align) {
        this.titleLabel.textAlign = align;
        this.updateData("textAlign", align);
    };
    //抛出事件
    ComboBox.onClick = "ComboBoxOnClick";
    return ComboBox;
}(eui.Component));
__reflect(ComboBox.prototype, "ComboBox");
