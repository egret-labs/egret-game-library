module tiled{
	export class TMXImage extends egret.EventDispatcher {
		private _source: string;
		private _width: number;
		private _height: number;
		private _trans: string;
		private _texture: egret.Texture;
		private _bitmap:egret.Bitmap;
		
		/**
		 * Tile图像
		 * @param data 图像数据
		 * @param baseURL 地址前缀
		 * @version Egret 3.0.3
		 */
		constructor(data: any, baseURL: string) {
			super();

			this._width     = +data.attributes.width;
			this._height    = +data.attributes.height;
			this._source    = data.attributes.source;
			this._trans     = (typeof data.attributes.trans !== "undefined") ? data.attributes.trans : '000000';
            this._bitmap    = new egret.Bitmap();
			this._source    = baseURL + this._source;
			this.loadImage(this._source);
		}

		/**
		 * 获取图像加载完后的纹理
		 * @version Egret 3.0.3
		 */
		get texture() {
			return this._texture;
		}
		
		/**
		 * 获取图像加载完后的图片
		 * @version Egret 3.0.3
		 */
		get bitmap(){
		    return this._bitmap;
		}

		/**
		 * 获取图像加载的源地址
		 * @version Egret 3.0.3
		 */
		get source() {
			return this._source;
		}

		/**
		 * 获取图像的原始宽（单位：像素）
		 * @version Egret 3.0.3
		 */
		get width() {
			return this._width;
		}

		/**
		 * 获取图像的原始高（单位：像素）
		 * @version Egret 3.0.3
		 */
		get height() {
			return this._height;
		}
		
		/**
		 * 加载图像
		 * @param $url
		 * @version Egret 3.0.3
		 */
		private loadImage(url: string): void {
            if(url == null || url == "")
                return;
            RES.getResByUrl(url,function(texture: egret.Texture):void{
                    if(texture)
                    {
                        this._bitmap.texture    = texture;
                        this._texture           = texture;
                        this._width             = texture.textureWidth;
                        this._height            = texture.textureHeight;
                        this.dispatchEvent(new tiled.TMXImageLoadEvent(tiled.TMXImageLoadEvent.IMAGE_COMPLETE,texture));
                    }
                },this,RES.ResourceItem.TYPE_IMAGE);
		}
	} 
}
