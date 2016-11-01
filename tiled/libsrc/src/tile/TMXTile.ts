module tiled{
	export class TMXTile extends egret.Sprite{
		private _tileX: number;
		private _tileY: number;

		private _flippedX: boolean;
		private _flippedY: boolean;
		private _flippedAD: boolean;
		private _flipped: boolean;

		private _gid: number;
		private _tileData: any;
		private _tileset: tiled.TMXTileset;
		private _tilemap: tiled.TMXTilemap;
		
		private _image: tiled.TMXImage;
		private _animation: tiled.TMXAnimation;
        private _properties: tiled.TMXProperty[];
        private _objectGroups: tiled.TMXObjectGroup[];

		bitmap: egret.Bitmap;
		
		/**
		 * 创建一个新的TMXTile实例，此类存储了场景的格子数据与Tileset中格子的数据
		 * @param tileX 场景中的水平格子坐标
		 * @param tileY 场景中的垂直格子坐标
		 * @param gid tileset中的格子id
		 * @param tilemap TMXTilemap实例
		 * @param tileset TMXTileset实例
		 * @param decodeAnimation 是否解析动画，娇正无限嵌套 
		 * @version Egret 3.0.3
		 */
		constructor(tileX: number, tileY: number, gid: number, tilemap: tiled.TMXTilemap, tileset: tiled.TMXTileset,decodeAnimation:boolean=true) {
			super();

			this._tileset   = tileset;
            this._tileX     = tileX;
            this._tileY     = tileY;

			this._tilemap   = tilemap;
			this._gid       = gid;
			this._flippedX  = (this._gid & tiled.TMXConstants.TMX_FLIP_H) !== 0;
			this._flippedY  = (this._gid & tiled.TMXConstants.TMX_FLIP_V) !== 0;
			this._flippedAD = this._flippedX && this._flippedY;//(this._gid & tiled.TMXConstants.TMX_FLIP_AD) !== 0;
			this._flipped   = this._flippedX || this._flippedY || this._flippedAD;
			this._gid       &= tiled.TMXConstants.TMX_CLEAR_BIT_MASK;

			this._tileData  = tileset.getSpecialTileDataByTileId(this._gid);
			if (this._tileData) {
				var children: Array<any> = this._tileData.children;
				if(children)
				{
					for (var i: number = 0; i < children.length; i++) {
						var child: any = children[i];
						switch (child.localName) {
							case tiled.TMXConstants.PROPERTIES:
								this._properties = tilemap.parseProperties(child);
								break;

							case tiled.TMXConstants.OBJECT_GROUP:

								break;

							case tiled.TMXConstants.IMAGE:
								this._image = new tiled.TMXImage(child, this.tilemap.baseURL);
								break;

							case tiled.TMXConstants.ANIMATION:
								if(decodeAnimation)	
                                	this._animation = new tiled.TMXAnimation(tilemap,tileset,tileX,tileY,child);
								break;
						}
					}
				}
			}
		}

		/**
		 * 获取在tileset所对应的格子id
		 * @version Egret 3.0.3
		 */
		get gid() {
			return this._gid;
		}

		/**
		 * 获取其在场景水平格子坐标
		 * @version Egret 3.0.3
		 */
		get tileX() {
			return this._tileX;
		}

		/**
		 * 获取其在场景中垂直格子坐标
		 * @version Egret 3.0.3
		 */
		get tileY() {
			return this._tileY;
		}

		/**
		 * 获取其在场景中所引用的TMXTileset实例
		 * @version Egret 3.0.3
		 */
		get tileset() {
			return this._tileset;
		}

		get image() {
			return this._image;
		}

		/**
		 * 获取对TMXTilemap实例的引用
		 * @version Egret 3.0.3
		 */
		get tilemap() {
			return this._tilemap;
		}

		/**
		 * 获取格子是否进行了水平方向翻转
		 * @version Egret 3.0.3
		 */
		get flippedX() {
			return this._flippedX;
		}

		/**
		 * 获取格子是否进行了垂直方向翻转
		 * @version Egret 3.0.3
		 */
		get flippedY() {
			return this._flippedY;
		}

		/**
		 * 获取格子是否进行了水平且垂直方向翻转
		 * @version Egret 3.0.3
		 */
		get flippedAD() {
			return this._flippedAD;
		}

		/**
		 * 获取格子是否进行了翻转（不管是水平还是垂直）
		 * @version Egret 3.0.3
		 */
		get flipped() {
			return this._flipped;
		}

		/**
		 * 获取格子的动画信息(如果没有动画信息，那么为空)
		 * @version Egret 3.0.3
		 */
		get animation() {
			return this._animation;
		}
	} 
}
