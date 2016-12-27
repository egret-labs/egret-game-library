class TreeViewItem extends eui.ItemRenderer {
	private rootNode:eui.Group;
	private bgRect:eui.Rect;
	private itemBgRect:eui.Rect;
	private arrowiconBg:eui.Rect;
	private arrowicon:eui.Image;
	private foldericon:eui.Image;
	private content:eui.Label;
	private DataGroup:eui.DataGroup;
	
	private myHeight = 0;

	public constructor() {
		super();
	}
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
	protected childrenCreated():void
	{
		super.childrenCreated();
		this.arrowiconBg.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
		this.itemBgRect.addEventListener(egret.TouchEvent.TOUCH_END,this.itemBgRectOnTouchEnd,this);
		this.addEventListener(egret.Event.ENTER_FRAME,this.update,this);

		this.arrowicon.anchorOffsetX = this.arrowicon.width;
		this.arrowicon.anchorOffsetY = this.arrowicon.height;
		this.arrowicon.rotation = -90;
		
		this.rootNode.touchEnabled = false;
		this.arrowicon.touchEnabled = false;
		this.foldericon.touchEnabled = false;
		this.content.touchEnabled = false;

	}
	protected dataChanged():void{	
		if(typeof(this.data.arrowicon) == "undefined"){
			this.data.arrowicon = "resource/assets/TreeView/icon.png";
		}
		if(typeof(this.data.foldericon) == "undefined"){
			this.data.foldericon = {normal:"resource/assets/TreeView/folder_normal.png",press:"resource/assets/TreeView/folder_press.png"};
		}
		if(typeof(this.data.content) == "undefined"){
			this.data.content = "";
		}
		this.arrowicon.source = this.data.arrowicon;
		this.foldericon.source = this.data.foldericon.normal;
		this.content.text = this.data.content;
		
		//高度
		if(typeof(this.data.itemHeight) != "undefined" ){
			this.myHeight = this.data.itemHeight;
		}else{
			this.myHeight = 113.6;
		}
		this.height = this.myHeight;
		this.rootNode.height = this.myHeight;
		this.itemBgRect.height = this.myHeight;
		this.itemBgRect.width = this.width;
		
		//背景颜色
		if(typeof(this.data.bgColor) != "undefined" ){
			this.itemBgRect.fillColor = this.data.bgColor;
		}else{
			this.itemBgRect.fillColor = 0xffffff;
			this.data.bgColor = 0xffffff;
		}
		this.bgRect.fillColor = this.data.bgColor;
		
		this.width = this.parent.width - 70;

		//字体大小
		if(typeof(this.data.fontSize) != "undefined" ){
			this.content.size = this.data.fontSize;
		}
		if(typeof(this.data.items) == "undefined" || this.data.items == null){
			this.arrowicon.visible = false;
			this.arrowiconBg.visible = false;
		}
		
	}
	private update(){
		if(this.name != "" ){
			if(this.name == TreeView.isSelectName){
				if(typeof(this.data.selectedColor) != "undefined"){
					this.itemBgRect.fillColor = this.data.selectedColor;
				}else{
					this.itemBgRect.fillColor = 0x000000;
				}
			}else{
				this.itemBgRect.fillColor = this.data.bgColor;
			}	
		}

	}
	private itemBgRectOnTouchEnd(event:egret.TouchEvent){
		event.stopPropagation();
		//按下背景
		this.name = this.hashCode.toString();
		TreeView.isSelectName = this.name;
		this.popEvent();
	}
	//事件派发
	private popEvent(){	
		var data = {};
		data["pos"] = this.data.pos;
		if(this.arrowicon.rotation == 0){
			data["isOpen"] = true;
		}else{
			data["isOpen"] = false;
		}
		this.dispatchEventWith(TreeView.onClick,true,data);
	}
	
	
	private onTouchEnd(event:egret.TouchEvent){	
		//按下背景
		this.name = this.hashCode.toString();
		TreeView.isSelectName = this.name;
		this.popEvent();

		event.stopPropagation();	
		if(this.arrowicon.rotation == 0){
			this.arrowicon.rotation = -90;
			this.foldericon.source = this.data.foldericon.normal;

			if(typeof(this.data.items) != "undefined" && this.data.items != null){
				//移除视图
				this.removeChild(this.DataGroup);
				 this.height = this.myHeight;
				if(typeof(this.data.that) != "undefined"){
					this.data.that.height -= this.height * this.data.items.length;
				}
			}	
		}else{
			this.arrowicon.rotation = 0;
			this.foldericon.source = this.data.foldericon.press;
			
			if(typeof(this.data.items) != "undefined" && this.data.items != null){
				
				this.DataGroup = new eui.DataGroup();
				this.DataGroup.y = this.height;
				this.DataGroup.x = 70;
				//this.width -=70 ;
				//this.DataGroup.width = this.width - 70;
				this.addChild(this.DataGroup);

				//更改第二及以下item的高度，因为只有第一列表有Scroll，其它子列表没有。
				if(this.data.level == 1){
					//更改当前item的高度
					this.height += this.height * this.data.items.length;

					var self = this;
					let loopData = function(items){
						for(let i=0; i < items.length; i++){
							items[i].that = self;
							if(items[i].items != null){
								loopData(items[i].items);
							}
						}
					}
					if(typeof(this.data.items) != "undefined" && this.data.items != null){
						loopData(this.data.items);
					}
				}else{
					var changeHeight = this.height * this.data.items.length;
					//更改当前item的高度
					this.height += changeHeight;
					//更改parent的高度
					this.data.that.height += changeHeight;
				}
				this.DataGroup.dataProvider = new eui.ArrayCollection(this.data.items);
        		this.DataGroup.itemRenderer = TreeViewItem;
				this.DataGroup.useVirtualLayout = false;

				
				// if(typeof(this.data.items.items) == "undefined" || this.data.items.items == null){
				// 	this.arrowicon.visible = false;
					
				// }
			}else{
				console.log("没有子数据了");
			}
	
		}	
		
	}

	
}