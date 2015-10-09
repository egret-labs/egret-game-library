module tiled{
	export class TMXImageLayer extends egret.Sprite{
		private _name: string;
		private _imagewidth: number;
		private _imageheight: number;
		private _opacity: number;
		private _source: string;
		private _transColor: string;
		private _tilemap: tiled.TMXTilemap;
		private _properties: Array<tiled.TMXProperty>;
		private _bitmap: egret.Bitmap;
		private _z: number;
		private _sourcebitmap: egret.Bitmap;
		constructor(tilemap: tiled.TMXTilemap, data: any,z:number) {
			super();
			this._tilemap = tilemap;
			this._name = data.attributes.name;
			this.x = +data.attributes.x;
			this.y = +data.attributes.y;
			this._z = +data.attributes.z;
			this._opacity = (typeof +data.attributes.opacity !== "undefined") ? +data.attributes.opacity : 1;
			this.visible = (typeof +data.attributes.visible !== "undefined") ? Boolean(+data.attributes.visible) : true;

			//解析源
			var children: Array<any> = data.children;
			if (children) {
				for (var i: number = 0; i < children.length; i++) {
					var child: any = data.children[i];
					switch (child.localName) {
						case tiled.TMXConstants.IMAGE:
							this._source = child.attributes.source;
							this._transColor = child.attributes.trans;
							this.loadImage(this.tilemap.baseURL + this._source);
							break;

						case tiled.TMXConstants.PROPERTIES:
							this._properties = this._tilemap.parseProperties(child);
							break;
					}
				}
				
			}
		}

		get tilemap() {
			return this._tilemap;
		}

		get bitmap() {
			return this._bitmap;
		}

		get z() {
			return this._z;
		}

		get name() {
			return this._name;
		}

		get alpha() {
			return this._opacity;
		}

		get transColor() {
			return this._transColor;
		}

		private loadImage($url:string): void {
			var self: tiled.TMXImageLayer = this;
			tiled.BitmapLoader.load($url, function ($url: string): void {
				var _texture:egret.Texture = tiled.TexturePool.getTexture($url);
				self._sourcebitmap = new egret.Bitmap(_texture);
				self.dispatchEvent(new tiled.TMXImageLoadEvent(tiled.TMXImageLoadEvent.IMAGE_COMPLETE, _texture));
			}, [$url]);
		}

		draw(rect: egret.Rectangle): void {
			var renderTexture: egret.RenderTexture = new egret.RenderTexture();
			var brect: egret.Rectangle = new egret.Rectangle(this.x, this.y, this._sourcebitmap.width, this._sourcebitmap.height);
			rect = brect.intersection(rect);
			rect.right = Math.ceil(this.tilemap.width / this.tilemap.tilewidth) * this.tilemap.tilewidth;
			rect.bottom = Math.ceil(this.tilemap.height / this.tilemap.tileheight) * this.tilemap.tileheight;
			//补充可能缺失的部分像素区域
			renderTexture.drawToTexture(this._sourcebitmap, rect);
			this._bitmap = new egret.Bitmap();
			this._bitmap.texture = renderTexture;
			this._bitmap.alpha = this._opacity;
			this._bitmap.visible = this.visible;
			this.addChild(this._bitmap);
		}
	} 
}
