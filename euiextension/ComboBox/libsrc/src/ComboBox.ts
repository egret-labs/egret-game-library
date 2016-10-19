class ComboBox extends eui.Component{
	private bg:eui.Image;
	private titleLabel:eui.Label;

	private Scroller:eui.Scroller;
	private DataGroup:eui.DataGroup;

	private isPullDown = true;
	//抛出事件
	public static onClick = "ComboBoxOnClick";

	private data:any[];

	public constructor(data=null) {
		super();
		
		if(data != null){
			this.data = data;
		}
		
	}
	protected childrenCreated():void
	{
		//super.childrenCreated();
		this.initPullView();
	}
	private updateData(key,value){
		for(let i=0; i<this.data.length; i++){
			this.data[i][key] = value;
		}
	}

	private initPullView(){
		this.width = this.stage.stageWidth;
		this.height = this.stage.stageHeight;
		//背景图片
		this.bg = new eui.Image();
		this.bg.source = "resource/assets/ItemRenderer/selected.png"
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
		this.titleLabel.addEventListener(egret.TouchEvent.TOUCH_END,this.onRightIconBg,this);
		
		//1.准备数据
		var myCollection:eui.ArrayCollection = new eui.ArrayCollection(this.data);//用ArrayCollection包装
		
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
	}

	private onRightIconBg(event:egret.TouchEvent){
		if(!this.isPullDown){
			this.isPullDown = true;
			//展开
			this.addChild(this.Scroller);
		}else{
			this.isPullDown = false;
			//收起
			this.removeChild(this.Scroller);
		}
		
	}


	public getTitleLabe(){
		return this.titleLabel;
	}

	/**
	 * Set the item width of the comboBox
	 * 
	 */
	public setItemWidth(width){
		this.width = width;
		this.bg.width = width;
		this.titleLabel.width = width;
	
		this.Scroller.width = width;
		this.updateData("width",width);
	}
	/**
	 * Set the item height of the comboBox
	 * 
	 */
	public setItemHeight(height){
		this.updateData("height",height);
	}
	/**
	 * Set the title fontSize of the comboBox
	 */
	public setItemFontSize(number=25){
		this.updateData("fontSize",number);
	}


	/**
	 * Set the title height of the comboBox
	 * 
	 */
	public setTitleHeight(height){
		this.bg.height = height;
		this.titleLabel.height = height;
		this.Scroller.y = height;
	}
	/**
	 * Set the title background of the comboBox
	 * example:"reource/picture.png"
	 */
	public setTitleBackground(src){
		this.bg.source = src;
	}
	/**
	 * Set the title fontSize of the comboBox
	 */
	public setTitleFontSize(number){
		this.titleLabel.size = number;
	}
	/**
	 * Show the comboBox
	 */
	public show(){
		this.isPullDown = true;
		//展开
		this.addChild(this.Scroller);
	}
	/**
	 * Hidden the comboBox
	 */
	public hide(){
		this.isPullDown = false;
		//收起
		this.removeChild(this.Scroller);
	}
	/**
	 * TextAlign:"left";"center";"right"
	 */
	public setItemTextAlign(align){
		this.titleLabel.textAlign = align;
		this.updateData("textAlign",align);
	}
	
	





}

