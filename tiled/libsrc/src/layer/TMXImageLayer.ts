module tiled{
	export class TMXImageLayer extends TMXLayerBase{
		private _name: string;
		private _imagewidth: number;
		private _imageheight: number;
		private _opacity: number;
		private _source: string;
		private _transColor: string;
		private _properties: Array<tiled.TMXProperty>;
		private _bitmap: egret.Bitmap;
		private _sourcebitmap: egret.Bitmap;
		private _texture:egret.Texture;
				
		/**
		 * 创建1个图像图层实例
		 * @param tilemap TMXTilemap实例
		 * @param data 图像图层数据
		 * @param z 层深
		 * @version Egret 3.0.3
		 */
        constructor(tilemap: tiled.TMXTilemap,data: any,z: number) {
            super(tilemap,data,z);
			this._name      = data.attributes.name;
			this.x          = +data.attributes.x;
			this.y          = +data.attributes.y;
			this._z         = z;
			this._opacity   = (typeof +data.attributes.opacity !== "undefined") ? +data.attributes.opacity : 1;
			this.visible    = (typeof +data.attributes.visible !== "undefined") ? Boolean(+data.attributes.visible) : true;

			//解析源
			var children: Array<any>            = data.children;
			if (children) {
				for (var i: number = 0; i < children.length; i++) {
					var child: any = data.children[i];
					switch (child.localName) {
						case tiled.TMXConstants.IMAGE:
							this._source        = child.attributes.source;
							this._transColor    = child.attributes.trans;
							this.loadImage(this.tilemap.baseURL + this._source);
							break;

						case tiled.TMXConstants.PROPERTIES:
							this._properties    = this._tilemap.parseProperties(child);
							break;
							
						default: 
                            throw new Error("TMXTileMap decode ImageLayer is Error：" + child.localName);
					}
				}				
			}
		}

		/**
		 * 获取图像图层的位图，如果源图像没有加载完成，那么，数据为空
		 * @version Egret 3.0.3
		 */
		get bitmap() {
			return this._bitmap;
		}
		
		/**
		 * 获取图像图层的纹理，如果源图像没有加载完成，那么，数据为空
		 * @version Egret 3.0.3
		 */
		get texture(){
		    return this._texture;
		}
		
        /**
		 * 创建图像图层的透明度
		 * @version Egret 3.0.3
		 */
		get alpha() {
			return this._opacity;
		}
		
		/**
		 * 加载图片
		 * @param $url 图片地址
		 * @version Egret 3.0.3
		 */
		private loadImage(url:string): void {
            if(url == null || url == "")
                return;
            RES.getResByUrl(url,function(texture: egret.Texture): void {
                if(texture) {
                	if (this._sourcebitmap == null || this._sourcebitmap == undefined)
                	{
                		this._sourcebitmap = new egret.Bitmap();
                	}
                    this._sourcebitmap.texture  = texture;
                    this._texture               = texture;
                    this.dispatchEvent(new tiled.TMXImageLoadEvent(tiled.TMXImageLoadEvent.IMAGE_COMPLETE,texture));
                }
            },this,RES.ResourceItem.TYPE_IMAGE);
		}

		
		/**
		 * 绘制矩形区域内的图像
		 * @param rect 矩形区域
		 * @version Egret 3.0.3
		 */
		draw(rect: egret.Rectangle): void {
			var renderTexture: egret.RenderTexture  = new egret.RenderTexture();
			var brect: egret.Rectangle              = new egret.Rectangle(this.x, this.y, this._sourcebitmap.width, this._sourcebitmap.height);
			rect                                    = brect.intersection(rect);
			rect.right                              = Math.ceil(this.tilemap.width / this.tilemap.tilewidth) * this.tilemap.tilewidth;
			rect.bottom                             = Math.ceil(this.tilemap.height / this.tilemap.tileheight) * this.tilemap.tileheight;
			//补充可能缺失的部分像素区域
			renderTexture.drawToTexture(this._sourcebitmap, rect);
			this._bitmap                            = new egret.Bitmap();
			this._bitmap.texture                    = renderTexture;
			this._bitmap.alpha                      = this._opacity;
			this._bitmap.visible                    = this.visible;
			this.addChild(this._bitmap);
		}
	} 
}
