module tiled{
	export class TMXIsometricRenderer extends tiled.TMXRenderer {
		private _hTilewidth: number;
		private _hTileheight: number;
		private _originX: number;
		
		/**
		 * 创建1个iso渲染器
		 * @param rows 水平方向格子数
		 * @param cols 垂直方向格子数
		 * @param tilewidth 格子宽（单位：像素）
		 * @param tileheight 格子高（单位：像素）
		 * @version Egret 3.0.3
		 */
		constructor(rows: number, cols: number, tilewidth: number, tileheight: number) {
			super(rows, cols, tilewidth, tileheight);
			this._hTilewidth 	= this.tilewidth / 2;
			this._hTileheight 	= this.tileheight / 2;
			this._originX 		= this.rows * this._hTilewidth;
		}

		
		/**
		 * 是否可渲染
		 * @param layer
		 * @version Egret 3.0.3
		 */
		canRender(layer:any): boolean {
			return (layer.orientation === tiled.TMXConstants.ORIENTATION_ISOMETRIC) && super.canRender(layer);
		}

		
		/**
		 * 像素坐标转化为格子坐标
		 * @param x 水平像素坐标
		 * @param y 垂直像素坐标
		 * @version Egret 3.0.3
		 */
		pixelToTileCoords(x: number, y: number): egret.Point {
			var __x:number=Math.floor(this.pixelToTileX(x, y));
			var __y:number=Math.floor(this.pixelToTileY(y, x));
			return new egret.Point(this.pixelToTileX(x, y), this.pixelToTileY(y, x));
		}

		
		/**
		 * 像素坐标转化为水平格子坐标
		 * @param x 水平像素坐标
		 * @param y 垂直像素坐标
		 * @version Egret 3.0.3
		 */
		pixelToTileX(x: number, y: number): number {
			var _value:number=(y / this.tileheight) + ((x - this._originX) / this.tilewidth);
			return (y / this.tileheight) + ((x - this._originX) / this.tilewidth);
		}

		
		/**
		 * 像素坐标转化为垂直格子坐标
		 * @param y 垂直像素坐标
		 * @param x 水平像素坐标
		 * @version Egret 3.0.3
		 */
		pixelToTileY(y: number,x:number): number {
			var _value:number=(y / this.tileheight) - ((x - this._originX) / this.tilewidth);
			return (y / this.tileheight) - ((x - this._originX) / this.tilewidth);
		}

		
		/**
		 * 格子坐标转化为像素坐标
		 * @param tileX 水平格子坐标
		 * @param tileY 垂直格子坐标
		 * @version Egret 3.0.3
		 */
		tileToPixelCoords(tileX: number, tileY: number): egret.Point {
			return new egret.Point((tileX - tileY) * this._hTilewidth + this._originX, (tileX + tileY) * this._hTileheight);
		}

		
		/**
		 * 绘制作Tile
		 * @param renderer 渲染容器
		 * @param tileX 水平格子坐标（单位：像素）
		 * @param tileY 垂直格子坐标（单位：像素）
		 * @param tile TMXTile实例
		 * @version Egret 3.0.3
		 */
		drawTile(renderer: egret.Sprite, tileX: number, tileY: number, tile: tiled.TMXTile): void {
			var tileset: tiled.TMXTileset = tile.tileset;
			tileset.drawTile(renderer,
				tileset.tileoffset.x + tileX,
				tileset.tileoffset.y + tileY - tileset.tileheight,
				tile);
		}

		/**
		 * 绘制图层
		 * @param layer 图层
		 * @param rect 绘制区域
		 * @version Egret 3.0.3
		 */
		drawTileLayer(layer: TMXLayer, rect: egret.Rectangle): void {
			var staticContainer:egret.Sprite=layer.staticContainer;
			var tileset: tiled.TMXTileset = layer.tileset;
			var offset: egret.Point = tileset.tileoffset;
			//获得上左，右下角位置
			var rowItr: egret.Point = this.pixelToTileCoords(
				rect.x - tileset.tilewidth,
				rect.y - tileset.tileheight
				);
			rowItr = new egret.Point(Math.floor(rowItr.x), Math.floor(rowItr.y));

			var tileEnd: egret.Point = this.pixelToTileCoords(
				rect.x + rect.width + tileset.tilewidth,
				rect.y + rect.height + tileset.tileheight
				);
			tileEnd = new egret.Point(Math.ceil(tileEnd.x),Math.ceil(tileEnd.y));

			var rectEnd: egret.Point = this.tileToPixelCoords(tileEnd.x, tileEnd.y);
			var startPos: egret.Point = this.tileToPixelCoords(rowItr.x, rowItr.y);
			startPos.x -= this._hTilewidth;
			startPos.y += this.tileheight;

			var inUpperHalf: boolean = (startPos.y - rect.y) > this._hTileheight;
			var inLeftHalf: boolean = (rect.x - startPos.x) < this._hTilewidth;

			if (inUpperHalf) {
				if (inLeftHalf) {
					rowItr.x--;
					startPos.x -= this._hTilewidth;
				} else {
					rowItr.y--;
					startPos.x += this._hTilewidth;
				}
				startPos.y -= this._hTileheight;
			}

			//确定当前行是否将半个瓦片移到右边
			var shifted: boolean = Boolean(+inUpperHalf ^ +inLeftHalf);
			var columnItr: egret.Point = rowItr.clone();
			//先横向扫描，再纵向扫描
			for (var y: number = startPos.y; y - this.tileheight < rectEnd.y; y += this._hTileheight) {
				columnItr.setTo(rowItr.x, rowItr.y);
				for (var x: number = startPos.x; x < rectEnd.x; x += this.tilewidth) {
					if ((columnItr.x >= 0) && (columnItr.y >= 0) && (columnItr.x < this.rows) && (columnItr.y < this.cols)) {
						var tmxTile: tiled.TMXTile = layer.layerData[columnItr.x][columnItr.y];
						if (tmxTile) {
							tileset = tmxTile.tileset;
							offset = tileset.tileoffset;
							if (tmxTile) {
								if (tmxTile.animation)
									this.animationTiles.push({ "tmxTile": tmxTile, "pos": [offset.x + x, offset.y + y] });
								else
									this.drawTile(staticContainer, x, y, tmxTile);
							}
						}
					}
					columnItr.x++;
					columnItr.y--;
				}

				if (!shifted) {
					rowItr.x++;
					startPos.x += this._hTilewidth;
					shifted = true;
				} else {
					rowItr.y++;
					startPos.x -= this._hTilewidth;
					shifted = false;
				}
			}
		}
	} 
}
