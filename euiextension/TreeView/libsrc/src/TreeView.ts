
class TreeView extends eui.Component implements  eui.UIComponent {
	/**
	 *  Scroller Control 
	 */
    private Scroller:eui.Scroller;
	/**
	 * 	DataGroup
	 */
	private DataGroup:eui.DataGroup;
	/**
	 * items: treeView data
	 */
	private items = [];
	/**
	 * is selected
	 */
	public static isSelectName = "";
	public static onClick = "treeViewTestOnClick";
	/**
	 * you can refresh data by eui.ArrayCollection 
	 */
	private itemDataCollection:eui.ArrayCollection;

	/**
	 * 	item data
	 */
	public constructor(items = null) {
		super();
		var self = this;

		if(items != null){
			this.items = items;
		}else{
			this.items = [		
				{
					arrowicon: "resource/assets/TreeView/icon.png",
					foldericon:{normal:"resource/assets/TreeView/folder_normal.png",press:"resource/assets/TreeView/folder_press.png"},
					content: "本地磁盘(C:)",
					items: [
						{
							arrowicon: "resource/arrow_drop_down_72.png",
							foldericon:{normal:"resource/assets/TreeView/folder_normal.png",press:"resource/assets/TreeView/folder_press.png"},
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
		}
		//handle data :为了 treeViewTestItem能识别
		loopData(this.items);
		function loopData(items){
			for(let i=0; i < items.length; i++){
				items[i]["level"] = 1;
			}
		}
		//增加识别下标
		loopDataPos(this.items,[]);
		function loopDataPos(items,parentPos){	
			for(let i=0; i < items.length; i++){
				items[i]["pos"] = [];
				for(let j=0; j < parentPos.length; j++){
					items[i]["pos"].push(parentPos[j]);
				}
				items[i]["pos"].push(i);
				if(items[i].items != null){
					loopDataPos(items[i].items,items[i]["pos"]);
				}
			}
		}
	}

	protected partAdded(partName:string,instance:any):void
	{
		//super.partAdded(partName,instance);
	}

	protected childrenCreated():void
	{
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
        this.DataGroup.useVirtualLayout = false;//不要缓存它；会出现bug.
		
	}

	/**
	 * TreeView Width
	 */
	public setWidth(width){
		this.Scroller.width = width;
		//设置不能滚动
		this.DataGroup.width = width;
	}
	/**
	 * TreeView Height
	 */
	public setHeight(height){
		this.Scroller.height = height;
	}
	/**
	 * set treeview item height
	 */
	public setItemHeight(itemHeight){
		this.loopData(this.items,"itemHeight",itemHeight);
	}
	/**
	 * set treeview item width
	 */
	public setItemWidth(itemWidth:number=113.6){
		
	}
	/**
	 * item BackgroundColor
	 */
	public setBgColor(color){
		this.loopData(this.items,"bgColor",color);
	}
	/**
	 * treeview item selected color
	 */
	public setSelectedColor(color){
		this.loopData(this.items,"selectedColor",color);
	}
	/**
	 * treeview item content fontSize
	 */
	public setFontSize(size){
		this.loopData(this.items,"fontSize",size);
	}

	private loopData(items,key,value){
		for(let i=0; i < items.length; i++){
			items[i][key] = value;
			if(items[i].items != null){
				this.loopData(items[i].items,key,value);
			}
		}
	}

 
	
}