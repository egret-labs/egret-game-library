class ComboBoxItem extends eui.ItemRenderer{
	private bg:eui.Image;
	private content:eui.Label;

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
		//背景
		this.bg = new eui.Image();
		this.addChild(this.bg);
		this.bg.width = this.stage.stageWidth;
		this.bg.height = 113;
		//内容
		this.content = new eui.Label();
		this.addChild(this.content);
		this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
		this.content.textAlign = "center";
		this.content.verticalAlign = "middle";
		this.content.textColor = 0x000000;
		
	}
	protected dataChanged():void{
		//this.bg.source = this.data.bg;
		if(typeof(this.data.content) != "undefined"){
			//内容
			this.content.text = this.data.content;
		}
		
		if(typeof(this.data.width) != "undefined"){
			//宽度
			this.width = this.data.width;
			this.content.width = this.data.width;
		}
		if(typeof(this.data.bg) != "undefined"){
			//背景
			this.bg.source = this.data.bg;
		}else{
			this.bg.source = "resource/assets/ScrollBar/track_sb.png";
		}
		if(typeof(this.data.height) != "undefined"){
			//高度
			this.height = this.data.height;
			this.bg.height = this.data.height;
			this.content.height = this.data.height;
		}
		if(typeof(this.data.fontSize) != "undefined"){
			//字体大小
			this.content.size = this.data.fontSize;
		}
		if(typeof(this.data.textAlign) != "undefined"){
			//字体对齐方式
			this.content.textAlign = this.data.textAlign;
		}
		
	}
	private onTouchEnd(event:egret.TouchEvent){
		var data = {};
		data["itemIndex"] = this.itemIndex;
		this.dispatchEventWith(ComboBox.onClick,true,data);

		
	}
	
	
}