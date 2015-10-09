module tiled{
	export class TMXImage extends egret.EventDispatcher {
		private _source: string;
		private _width: number;
		private _height: number;
		private _trans: number;
		private _texture: egret.Texture;
		private _bitmap: egret.Bitmap;

		constructor(imgData: any, baseURL: string) {
			super(this);

			this._width     = +imgData.attributes.width;
			this._height    = +imgData.attributes.height;
			this._source    = imgData.attributes.source;
			this._trans     = (typeof imgData.attributes.trans !== "undefined") ? +imgData.attributes.trans : 1;

			this._source = baseURL + this._source;
			this.loadImage(this._source);
		}

		get texture() {
			return this._texture;
		}

		get source() {
			return this._source;
		}

		get bitmap() {
			return this._bitmap;
		}

		get width() {
			return this._width;
		}

		get height() {
			return this._height;
		}

		private loadImage($url: string): void {
			var self: tiled.TMXImage = this;
			tiled.BitmapLoader.load($url, function ($url: string): void {
				self._texture = tiled.TexturePool.getTexture($url);
				self._bitmap = new egret.Bitmap(self._texture);
				self.dispatchEvent(new tiled.TMXImageLoadEvent(tiled.TMXImageLoadEvent.IMAGE_COMPLETE, self._texture));
			}, [$url]);
		}
	} 
}
