module tiled{
	export class TMXTileset { 
		private _lastgid: number;
		private _firstgid: number;
		private _name: string;
		private _tilewidth: number;
		private _tileheight: number;
		private _spacing: number;
		private _margin: number;
		private _tileoffset: egret.Point;
		private _hTileCount: number;
		private _vTileCount: number;
		private _tilemap: tiled.TMXTilemap;
		private _tileDatas: Array<any>;
		private _properties: Array<any>;
		private _image: tiled.TMXImage;
		private _images: tiled.TMXImage[];
		private _imagesource: string;
		private _transformMatrix: egret.Matrix;
        private static spritesheets:Object = {};
		
		/**
		 * Tileset对象
		 * @param tilemap 引用的TMXTilemap对象
		 * @param tilesetData tilesetDat数据
		 * @version Egret 3.0.3
		 * 暂时不支持tsx文件的扩展
		 */
		constructor(tilemap: tiled.TMXTilemap, tilesetData: any) {
			this._tileDatas     = [];
			this._firstgid      = +tilesetData.attributes.firstgid;
			this._lastgid       = this._firstgid;
			this._tilemap       = tilemap;
			//tileset也可能是外部加载的
			var src: string     = tilesetData.attributes.source;
			if (src && this.getFileExtension(src) === "tsx") {
				throw new Error("tmx not support tsx file load!!!");
			}

			this._transformMatrix = new egret.Matrix();

			this._name          = tilesetData.attributes.name;
			this._tilewidth     = +tilesetData.attributes.tilewidth;
			this._tileheight    = +tilesetData.attributes.tileheight;
			this._spacing       = +tilesetData.attributes.spacing || 0;
			this._margin        = +tilesetData.attributes.margin || 0;
			

			//每个Tileset有个偏移值，这个偏移值是指绘制在场景中的对象的偏移值
			this._tileoffset    = new egret.Point();
			this._hTileCount    = 0;
			this._vTileCount 	= 0;
			this._images 		= [];

			var childrens: Array<any> = tilesetData.children;
			if (childrens) {
				for (var i: number = 0; i < childrens.length; i++) {
					var child: any = childrens[i];
					switch (child.localName) {
						case tiled.TMXConstants.IMAGE:
							this._image = new tiled.TMXImage(child, this.tilemap.baseURL);
							this._imagesource = this._image.source;
							this._images.push(this._image);
							break;

						case tiled.TMXConstants.TILE_OFFSET:
							this._tileoffset = new egret.Point(+child.attributes.x, +child.attributes.y);
							break;

						case tiled.TMXConstants.TILE:
							var gid: number = +child.attributes.id + this._firstgid;
							if (this._tileDatas[gid] == null)
								this._tileDatas[gid] = child;
							//检查是否有图片
							if(child.children && child.children.length>0){
								if(child.children[0].localName == tiled.TMXConstants.IMAGE){
									this._image = new tiled.TMXImage(child.children[0], this.tilemap.baseURL);
									this._imagesource = this._image.source;
									this._images.push(this._image);
								}
							}
							
							break;

						case tiled.TMXConstants.PROPERTIES:
							this._properties = tilemap.parseProperties(child);
							break;
					}
				}
			}

			if (this._image) {
				this._hTileCount    = ~~(this._image.width / (this._tilewidth + this._spacing));
				this._vTileCount    = ~~(this._image.height / (this._tileheight + this._margin));
				this._lastgid       = this._firstgid + (((this._hTileCount * this._vTileCount) - 1) || 0);
			}    
		}

		/**
		 * Tileset名称
		 * @version Egret 3.0.3
		 */
		get name() {
			return this._name;
		}

		/**
		 * 获取每个tileset第1个格子的id号。<br/>
		 * 例如，1个tmx文件有3个tileset，那么第1个tileset的firstgid默认为1，如果第1个tileset有12个格子，<br/>
		 * 那么第二个tileset的firstgid将为13，依此类推，firstgid为全局的标识id号，通过此id号可以计算每个tileset中格子的id号
		 * @version Egret 3.0.3
		 */
		get firstgid() {
			return this._firstgid;
		}

		/**
		 * 获取每个tileset最后1个格子的id号
		 * @version Egret 3.0.3
		 */
		get lastgid() {
			return this._lastgid;
		}

		/**
		 * 获取每个tileset中格子宽（单位：像素）
		 * @version Egret 3.0.3
		 */
		get tilewidth() {
			return this._tilewidth;
		}

		/**
		 * 获取每个tileset中格子高（单位：像素）
		 * @version Egret 3.0.3
		 */
		get tileheight() {
			return this._tileheight;
		}

		/**
		 * 获取tileset中格子与格子之间的水平间距（单位：像素）
		 * @version Egret 3.0.3
		 */
		get spacing() {
			return this._spacing;
		}

		/**
		 * 获取tileset中格子与格子之间的垂直间距（单位：像素）
		 * @version Egret 3.0.3
		 */
		get margin() {
			return this._margin;
		}

		/**
		 * 获取tileset中格子的偏移值,返回egret.Point数据
		 * @version Egret 3.0.3
		 */
		get tileoffset() {
			return this._tileoffset;
		}

		/**
		 * 获取tileset中水平方向的格子数
		 * @version Egret 3.0.3
		 */
		get horizontalTileCount() {
			return this._hTileCount;
		}

		/**
		 * 获取tileset中垂直方向的格子数
		 * @version Egret 3.0.3
		 */
		get verticalTileCount() {
			return this._vTileCount;
		}

		/**
		 * 获取对TMXTilemap实例的引用
		 * @version Egret 3.0.3
		 */
		get tilemap() {
			return this._tilemap;
		}

		/**
		 * 获取tileset所具备的属性列表<br/>
		 * 通过查看tmx文件可知，只有具备属性数据的tileset才会生成属性数据，以标签<code>properties</code>表示
		 * 注意：这里表示的是tileset本身的属性列表，而非tileset中格子的属性列表
		 * @version Egret 3.0.3
		 */
		get properties() {
			return this._properties;
		}

		/**
		 * 获取tileset中对标签<code>image</code>解析实例的引用
		 * @version Egret 3.0.3
		 */
		get image() {
			return this._image;
		}

		/**
		 * 获取tileset中对标签<code>image</code>解析实例的引用,可能是列表
		 * @version Egret 3.0.3
		 */		
		get images() {
			return this._images;
		}

		/**
		 * 根据id获取特殊格子的数据，默认情况下，tileset中格子如果没有作特殊处理，在tmx文件中是不会生成数据的，这里的特殊处理包括以下几个方面：<br/>
		 * (1):格子添加了自定义属性<br/>
		 * (2):格子添加了动画<br/>
		 * (3):格子添加了碰撞区域<br/>
		 * 对于第2种情况，tmx文件中是以标签<code>animation</code>记录</br>
		 * 对于第3种情况，tmx文件中是以标签<code>objectgroup</code>记录，这表示可以添加多个自定义的碰撞区域
		 * @param gid tileset中的格子id
		 * @version Egret 3.0.3
		 */
		getSpecialTileDataByTileId(gid:number): any {
			return this._tileDatas[gid];
		}

		/**
		 * 获取文件扩展名
		 * @version Egret 3.0.3
		 */
		getFileExtension = function (path:string) {
			return path.substring(path.lastIndexOf(".") + 1, path.length);
		};
		
        /**
         *  获取tileset属性列表
         * @version Egret 3.0.3
         */
        getProperties(): tiled.TMXProperty[]
		{
		    return this._properties;
		}
		
		/**
		 * 根据索引获取tileset属性列表
		 * @param index
		 * @version Egret 3.0.3
		 */
		getPropertyByIndex(index:number)
		{
            if(this._properties && index < this._properties.length)
                return this._properties[index];
            return null;
		}

		/**
		 * 判断当前tileset中是否包含对应<code>gid</code>的格子
		 * @param gid gid
		 * @version Egret 3.0.3
		 */
		contains(gid:number):boolean {
            return gid >= this._firstgid && gid <= this._lastgid;
		}
        
		/**
		 * 绘制Tile
		 * @param renderer 渲染容器
		 * @param dx 水平像素坐标
		 * @param dy 垂直像素坐标
		 * @param tile TMXTile实例
		 * @version Egret 3.0.3
		 */
		drawTile(renderer: egret.Sprite, dx: number, dy: number, tile: tiled.TMXTile): void {
			//用gid+col+row作key来降低draw的次数
			var renderTexture: any;
            var spritesheet: egret.SpriteSheet;
			var spritesheets: egret.SpriteSheet[];
			spritesheets = [];
			//这里可能是多张图
			if (this.images) {
				for (var i: number = 0; i < this.images.length; i++){
					var _image: tiled.TMXImage = this.images[i];
					if(_image){
						if(tiled.TMXTileset.spritesheets[_image.source] == null){
							spritesheet                             		= new egret.SpriteSheet(_image.texture);
							tiled.TMXTileset.spritesheets[_image.source]    = spritesheet;
						}else{
							spritesheet                             		= tiled.TMXTileset.spritesheets[_image.source];
						}
					}
				}
			}

			for (var i: number = 0; i < this.images.length; i++){
				var _image2: tiled.TMXImage = this.images[i];
				if (_image2)
					spritesheets.push(tiled.TMXTileset.spritesheets[_image2.source]);	
			}
			var id: number 		= tile.gid - this.firstgid;
			var key: string 	= this.firstgid + "_" + id;
			var _spritesheet: egret.SpriteSheet;
			if (this.images.length > 1)
			{
				_spritesheet = spritesheets[tile.gid - this.firstgid];
				var rect:egret.Rectangle = new egret.Rectangle(
					0 * (this.tilewidth + this._spacing) + this._spacing,
					0 * (this.tileheight + this._margin) + this._margin,
					this.tilewidth,
					this.tileheight);
			}	
			else
			{
				_spritesheet = spritesheets[0];
				var rect:egret.Rectangle = new egret.Rectangle(
					(id % this.horizontalTileCount) * (this.tilewidth + this._spacing) + this._spacing,
					(Math.floor(id / this.horizontalTileCount)) * (this.tileheight + this._margin) + this._margin,
					this.tilewidth,
					this.tileheight);
			}	
				
			renderTexture   = _spritesheet.createTexture(key,rect.x,rect.y,rect.width,rect.height,0,0);

			var isImage: boolean    = false;
			var isObject: boolean   = false;
			if (renderer instanceof tiled.TMXObject) {
				isObject = true;
				isImage = (<tiled.TMXObject>renderer).isImage;
			}
			this._transformMatrix.identity();
			var _scalex: number = isObject ? rect.width / renderTexture.textureWidth : 1;
			var _scaley: number = isObject ? rect.height / renderTexture.textureHeight : 1;
			if (tile.flippedAD) {
				this._transformMatrix.scale(-1 * _scalex, -1 * _scaley);
				this._transformMatrix.translate(dx + rect.width * _scalex, dy + rect.height * _scaley);
			} else if (tile.flippedY) {
				this._transformMatrix.scale(1 * _scalex, -1 * _scaley);
				this._transformMatrix.translate(dx, dy + rect.height * _scaley);
			} else if (tile.flippedX) {
				this._transformMatrix.scale(-1 * _scalex, 1 * _scaley);
				this._transformMatrix.translate(dx + rect.width * _scalex, dy);
			} else {
				this._transformMatrix.scale(_scalex, _scaley);
				this._transformMatrix.translate(dx, dy + (isObject ? (renderTexture.textureHeight - rect.height) : 0));
			}
			if (tile.bitmap == null)
				tile.bitmap = new egret.Bitmap();
			tile.bitmap.texture = renderTexture;
			tile.bitmap.matrix = this._transformMatrix;
			renderer.addChild(tile.bitmap);
			tile.bitmap = tile.bitmap;
		}

		/**
		 * 移除所有缓存的纹理
		 * @version Egret 3.0.3
		 */
		static removeAllTextures():void
		{
            for (var url in this.spritesheets){
                var spritesheet: egret.SpriteSheet = this.spritesheets[url];
				//销毁图像不能显示
                //spritesheet.dispose();
            }
			this.spritesheets = {};
		}
	} 
}
