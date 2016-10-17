TreeView
==================
#1.概述
使用TreeView组件，您可以快速开发出一个类似多级文件夹列表的界面。
#2.快速上手
###1.工程引用
- 下载本项目，编译，引用即可。
```javascript
		{
			"name": "treeview",
			"path": "../libsrc"
		}
```
- demo相关资源说明：

|  路径 | 说明  |
| :------------ | :------------ |
|  resource/assets | 资源：包含默认的图片资源  |
|  resource/eui_skins | 皮肤：相关的皮肤  |



###2.初始化数据
- **准备数据**
//示例数据1：
		var items = [		
	    	{
       		 arrowicon: "resource/assets/TreeView/icon.png",
       		 foldericon:{normal:"resource/assets/TreeView/folder_normal.png",press:"resource/assets/TreeView/folder_press.png"},
        		content: "本地磁盘(C:)",
       		 item: null
	    },
		];



- **arrowicon（可选）**	 图标文件
- **foldericon（可选）**	 文件夹图标文件**：**包括 **正常状态**图标 和 **按下状态**图标
- **content（可选）**	 文件名内容
- **item（可选）**	 下一级数据（也是一个数组[]，跟本级数据一样，）

	//示例数据2：
		var items = [		
				{
					//arrowicon: "resource/assets/TreeView/icon.png",
					foldericon{
		normal:"resource/assets/TreeView/folder_normal.png",press:"resource/assets/TreeView/folder_press.png"},
					content: "本地磁盘(C:)",
					items: [
						{
							arrowicon: "resource/arrow_drop_down_72.png",
							//foldericon:{normal:"resource/assets/TreeView/folder_normal.png",press:"resource/assets/TreeView/folder_press.png"},
							content: "Program Files",
							items: null
						},
					]
				},	
				{
					arrowicon: "resource/assets/TreeView/icon.png",
					foldericon:{normal:"resource/assets/TreeView/folder_normal.png",press:"resource/assets/TreeView/folder_press.png"},
					content: "本地磁盘(D:)",
					// items: null
				}
			];


###3.核心代码
```javascript
var tv = new TreeView(data);
this.addChild(tv);

/*
//设置整个treeView的高度
tv.setHeight(this.stage.stageHeight);
//设置整个treeView的宽度
tv.setWidth(this.stage.stageWidth);
//设置treeView的Item的高度
tv.setItemHeight(90);
//设置treeView的背景颜色
tv.setBgColor(0xffffff);
//设置treeView的Item被选中的颜色
tv.setSelectedColor(0xb8aaaa);
//设置treeView的Item字体的大小
tv.setFontSize(30);
*/
```
###4.Item点击事件
```javascript
//添加事件
tv.addEventListener(TreeView.onClick,this.onclick,this);
```

```javascript
private onclick(event){
	//一个JSON对象：isOpen：当前文件夹是否打开；pos：点击的位置数组，例：[0,0,2]表示点击了第一级中的第一级中的第二个。
		
	console.log(event.data);
}
```














