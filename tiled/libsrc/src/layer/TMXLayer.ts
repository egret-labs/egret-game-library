module tiled{
    
	export class TMXLayer extends TMXLayerBase{
		private _tilewidth: number;
		private _tileheight: number;
		private _orientation: string;
		private _tilesets: tiled.TMXTilesetGroup;
		private _name: string;
		private _cols: number;
		private _rows: number;
		private _hexsidelength: number;
		private _staggeraxis: string;
		private _staggerindex: number;
		private _opacity: number;
		private renderer: tiled.TMXRenderer;
		private _properties: Array<tiled.TMXProperty>;
		
		private _staticContainer:egret.Sprite;
		private _animationContainer:egret.Sprite;

		layerData: Array<Array<tiled.TMXTile>>;
		tileset: tiled.TMXTileset;
		maxTileSize: any;

		/**
		 * 创建1个基本图层实例
		 * 为了优化渲染，这里创建了静态图层与动画图层<br/>
		 * 静态图层中没有任何动画组件，将其缓存为位图，即container.cacheAsBitmap=true;<br/>
		 * 动态图层中有动画
		 * @param tilemap TMXTilemap实例引用
		 * @param tilewidth 格子宽
		 * @param tileheight 格子高
		 * @param orientation 渲染方向
		 * @param tilesets tilesets组
		 * @param z 层深
		 * @param data
		 * @version Egret 3.0.3
		 */
		constructor(tilemap: tiled.TMXTilemap, tilewidth: number, tileheight: number, orientation: string, tilesets: tiled.TMXTilesetGroup, z: number, data: any) {
            super(tilemap,data,z);
			
			this._staticContainer               = new egret.Sprite();
			//
			this.addChild(this._staticContainer);
			//为了防止地图坐标为负时出现无法显示的问题，这里延迟2秒进行缓存
			setTimeout(function(self:any):void{
				self._staticContainer.cacheAsBitmap = true;
			},2000,this);
			
			this._animationContainer            = new egret.Sprite();
			this.addChild(this._animationContainer);
			
			this._tilemap                       = tilemap;
			this._tilewidth                     = tilewidth;
			this._tileheight                    = tileheight;
			this._orientation                   = orientation;
			this._tilesets                      = tilesets;

			this.tileset                        = this._tilesets ? this._tilesets.getTilesetByIndex(0) : null;
			this.maxTileSize                    = { "width": 0, "height": 0 };
			//根据Tile设置来设置图层数据
			for (var i: number = 0; i < this._tilesets.length; i++) {
				var tileset: tiled.TMXTileset = this._tilesets.getTilesetByIndex(i);
				this.maxTileSize.width          = Math.max(this.maxTileSize.width, tileset.tilewidth);
				this.maxTileSize.height         = Math.max(this.maxTileSize.height, tileset.tileheight);
			}

			this._name                          = data.attributes.name;
			this._cols                          = +data.attributes.width;
			this._rows                          = +data.attributes.height;
			this._opacity                       = (typeof data.attributes.opacity !== "undefined") ? parseFloat(data.attributes.opacity) : 1;
			this.visible                        = (typeof data.attributes.visible !== "undefined") ? Boolean(+data.attributes.visible) : true;

			this._hexsidelength                 = +data.attributes.hexsidelength;
			this._staggeraxis                   = data.attributes.staggeraxis;
			this._staggerindex                  = +data.attributes.staggerindex;

			// layer "real" size
			if (this._orientation === "isometric") {
				this.width                      = (this._cols + this._rows) * (this._tilewidth / 2);
				this.height                     = (this._cols + this._rows) * (this._tileheight / 2);
			} else {
				this.width                      = this._cols * this._tilewidth;
				this.height                     = this._rows * this._tileheight;
			}

			this.initArray(this._cols, this._rows);

			//解析子属性
			var children: Array<any>            = data.children;
			if (children) {
				for (var i: number = 0; i < children.length; i++) {
					var child: any              = children[i];
					switch (child.localName) {
                        case tiled.TMXConstants.DATA://解析数据
							this.parseLayerData(tiled.TMXUtils.decode(child, child.attributes.encoding, child.attributes.compression));
							break;

                        case tiled.TMXConstants.PROPERTIES://解析属性
							this._properties    = this.tilemap.parseProperties(child);
							break;

						default:
							throw new Error("TMXTileMap decode Layer is Error：" + child.localName);
					}
				}
			}

			this.alpha = this._opacity;
			this.visible = this.visible;
			
		}
		

		/**
		 * 返回层的名字
		 * @version Egret 3.0.3
		 */
		get name() {
			return this._name;
		}

        /**
		 * 获取静态层容器（用于渲染静态对象）
		 * @version Egret 3.0.3
		 */
        get staticContainer() {
            return this._staticContainer;
        }

        /**
		 * 获取动画层容器（用于渲染动画）
		 * @version Egret 3.0.3
		 */
        get animationContainer() {
            return this._animationContainer;
        }

        /**
		 * 获取tile宽
		 * @version Egret 3.0.3
		 */
        get tilewidth() {
            return this._tilewidth;
        }

        /**
		 * 获取tile高
		 * @version Egret 3.0.3
		 */
        get tileheight() {
            return this._tileheight;
        }

        /**
		 * 获取渲染方向
		 * @version Egret 3.0.3
		 */
        get orientation() {
            return this._orientation;
        }
        
        /**
		 * 获取水平格子数
		 * @version Egret 3.0.3
		 */
        get rows() {
            return this._rows;
        }

        /**
		 * 获取垂直格子数
		 * @version Egret 3.0.3
		 */
        get cols() {
            return this._cols;
        }

        /**
		 * @version Egret 3.0.3
		 */
        get hexsidelength() {
            return this._hexsidelength;
        }

        /**
		 * @version Egret 3.0.3
		 */
        get staggeraxis() {
            return this._staggeraxis;
        }

        /**
		 * @version Egret 3.0.3
		 */
        get staggerindex() {
            return this.staggerindex;
        }

        /**
		 * 获取透明度
		 * @version Egret 3.0.3
		 */
        get opacity() {
            return this._opacity;
        }

        /**
		 * 获取图层属性列表
		 * @version Egret 3.0.3
		 */
        get properties() {
            return this._properties;
        }
       
		/**
		 * 设置渲染器
		 * @param renderer 渲染器(包括：1、TMXHexagonoalRenderer,2、TMXIsometricRenderer,3、TMXOrthogonalRenderer)
		 * @version Egret 3.0.3
		 */
		setRenderer(renderer: tiled.TMXRenderer): void {
			this.renderer = renderer;
		}
		
		/**
		 * 根据像素坐标获取Tile Id
		 * @param x 水平像素坐标
		 * @param y 垂直像素坐标
		 * @version Egret 3.0.3
		 */
		getTileId(x:number,y:number): number {
			var tile:tiled.TMXTile = this.getTile(x, y);
			return tile ? tile.gid : 0;
		}
		
		/**
		 * 根据像素坐标获取格子信息
		 * @param x 水平像素坐标
		 * @param y 垂直像素坐标
		 * @version Egret 3.0.3
		 */
		getTile(x: number, y: number): tiled.TMXTile {
			if (this.renderer instanceof tiled.TMXOrthogonalRenderer) {
				return this.layerData[~~(<tiled.TMXOrthogonalRenderer>this.renderer).pixelToTileX(x)][~~(<tiled.TMXOrthogonalRenderer>this.renderer).pixelToTileY(y)];
			} else if (this.renderer instanceof tiled.TMXIsometricRenderer) {
				return this.layerData[~~(<tiled.TMXIsometricRenderer>this.renderer).pixelToTileX(x,y)][~~(<tiled.TMXIsometricRenderer>this.renderer).pixelToTileY(y,x)];
			}
			return this.layerData[~~(<tiled.TMXHexagonalRenderer>this.renderer).pixelToTileX(x, y)][~~(<tiled.TMXHexagonalRenderer>this.renderer).pixelToTileY(y, x)];
		}
		
		
		/**
		 * TMXTileMap#setLayerData调用
		 * @param tileX 水平格子坐标
		 * @param tileY 垂直格子坐标
		 * @param tileId tileset所对应的id
		 * @version Egret 3.0.3
		 */
		setTile(tileX: number, tileY: number, tileId: number): tiled.TMXTile {
			if (!this.tileset.contains(tileId)) 
				this.tileset = this._tilesets.getTilesetByGid(tileId);
			if (this.tileset) {
				var tile: tiled.TMXTile = this.layerData[tileX][tileY] = new tiled.TMXTile(tileX, tileY, tileId, this.tilemap, this.tileset);
				return tile;
			}
			return null;
		}

		/**
		 * 清除Tile
		 * @param tileX 水平格子坐标
		 * @param tileY 垂直格子坐标
		 * @version Egret 3.0.3
		 */
		clearTile(tileX: number, tileY: number): void {
			this.layerData[tileX][tileY] = null;
		}

		/**
		 * 绘制
		 * @param rect 要绘制的矩形区域
		 * @version Egret 3.0.3
		 */
		draw(rect: egret.Rectangle): void {
			this.renderer.drawTileLayer(this, rect);
		}

		/**
		 * 渲染
		 * @version Egret 3.0.3
		 */
		render(): void {
			this.renderer.render(this._animationContainer);
		}

		/**
		 * 根据水平格子数与垂直格子数初始化图层数据
		 * @param rows 水平格子数
		 * @param cols 垂直格子数
		 * @version Egret 3.0.3
		 */
		private initArray(rows: number, cols: number) {
			this.layerData = [];
			for (var x: number = 0; x < rows; x++) {
				this.layerData[x] = [];
				for (var y: number = 0; y < cols; y++) {
					this.layerData[x][y] = null;
				}
			}
		}

		/**
		 * 解析图层数据
		 * @param data
		 * @version Egret 3.0.3
		 */
		private parseLayerData(data: Array<number>): void {
			if (data) {
				var idx: number = 0;
				for (var y: number = 0; y < this.rows; y++) {
					for (var x: number = 0; x < this.cols; x++) {
						var gid = data[idx];
						if (gid !== 0) {
							this.setTile(x,y,gid);
						}
						idx++;
					}
				}
			}
		}
	} 
}
