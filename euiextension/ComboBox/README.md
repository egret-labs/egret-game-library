ComboBox
==================
#1.概述
使用ComboBox组件，您可以快速实现下拉列表功能。
例如浏览器顶部搜索框的下拉显示。
#2.快速上手
###1.工程引用
- 下载本项目，编译，引用即可。
```javascript
		{
			"name":"combobox",
			"path":"../libsrc"
		}
```
- demo相关资源（都是egret工程的默认资源）说明：

|  路径 | 说明  |
| :------------ | :------------ |
|  resource/assets | 资源：包含默认的图片资源  |
|  resource/eui_skins | 皮肤：相关的皮肤  |



###2.初始化数据
- **数据说明**
```javascript
{
		bg:"resource/assets/ScrollBar/track_sb.png",//Item的背景图片
		content:"http://developer.egret.com/cn/"//Item的文字内容
}
```



- **bg（可选）**	 背景图片全路径
- **content（可选）**	 文字内容



###3.核心代码
```javascript

		this.cb = new ComboBox(this.data);
        this.addChild(this.cb);
        //1.点击事件
        this.cb.addEventListener(ComboBox.onClick,this.onClick,this);
        //2.设置title
        this.cb.setTitleHeight(this.stage.stageWidth/5);
        this.cb.setTitleBackground("resource/assets/ItemRenderer/selected.png");
        this.cb.setTitleFontSize(40);
        //3.设置Item
        this.cb.setItemWidth(this.stage.stageWidth);
        this.cb.setItemHeight(80);
        this.cb.setItemFontSize(30);
        //4.设置Item内容文字的对齐方式
        this.cb.setItemTextAlign("left");
        //5.展开和收起
        //this.cb.show();
        //this.cb.hide();

```
###4.Item点击事件回调
- event.data.itemIndex：当前点击了哪个Item（number）类型。
```javascript
private onClick(event){
        //getTitleLabe()方法可以获取titleLabel控件。
        var titleLabel = this.cb.getTitleLabe();
        titleLabel.text = this.data[event.data.itemIndex].content;

        this.cb.hide();
        console.log(event.data);
}
```


#3.完整代码demo:

请参考本项目中的demo实例源码。














