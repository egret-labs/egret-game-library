module tiled{
	export class TMXOrthogonalRenderer extends tiled.TMXRenderer {
    	
		/**
		 * 创建1个正交渲染器（正常模式）
		 * @param rows 水平方向格子数
		 * @param cols 垂直方向格子数
		 * @param tilewidth 格子宽（单位：像素）
		 * @param tileheight 格子高（单位：像素）
		 * @version Egret 3.0.3
		 */
		constructor(rows: number, cols: number, tilewidth: number, tileheight: number) {
			super(rows, cols, tilewidth, tileheight);
		}
		
		/**
		 * 是否可渲染
		 * @param layer
		 * @version Egret 3.0.3
		 */
		canRender(layer:any): boolean {
			return (layer.orientation === tiled.TMXConstants.ORIENTATION_ORTHOGONAL) && super.canRender(layer);
		}
		
		/**
		 * 像素坐标转化为格子坐标
		 * @param x 水平像素坐标
		 * @param y 垂直像素坐标
		 * @version Egret 3.0.3
		 */
		pixelToTileCoords(x: number, y: number): egret.Point {
			return new egret.Point(this.pixelToTileX(x), this.pixelToTileY(y));
		}
	
		/**
		 * 水平像素坐标转化为水平格子坐标
		 * @param x 水平像素坐标
		 * @version Egret 3.0.3
		 */
		pixelToTileX(x: number): number {
			return Math.floor(x / this.tilewidth);
		}
		
		/**
		 * 垂直像素坐标转化为垂直格子坐标
		 * @param y 垂直像素坐标
		 * @version Egret 3.0.3
		 */
		pixelToTileY(y: number): number {
			return Math.floor(y / this.tileheight);
		}
	
		/**
		 * 格子坐标转化为像素坐标
		 * @param tileX 水平格子坐标
		 * @param tileY 垂直格子坐标
		 * @version Egret 3.0.3
		 */
		tileToPixelCoords(tileX: number, tileY: number): egret.Point {
			return new egret.Point(tileX * this.tilewidth, tileY * this.tileheight);
		}

		/**
		 * 绘制Tile
		 * @param renderer 渲染容器
		 * @param tileX 水平格子坐标
		 * @param tileY 垂直格子坐标
		 * @param tile TMXTile实例
		 * @version Egret 3.0.3
		 */
		drawTile(renderer: egret.Sprite, tileX: number, tileY: number, tile: tiled.TMXTile): void {
			var tileset: tiled.TMXTileset = tile.tileset;
			tileset.drawTile(renderer,
				tileset.tileoffset.x + tileX * this.tilewidth,
				tileset.tileoffset.y + (tileY + 1) * this.tileheight - tileset.tileheight,
				tile);
		}

		/**
		 * 绘制作Tile图层
		 * @param layer 图层
		 * @param rect  绘制区域
		 * @version Egret 3.0.3
		 */
		drawTileLayer(layer: tiled.TMXLayer, rect: egret.Rectangle): void {
            var staticContainer: egret.Sprite = layer.staticContainer;
			var start: egret.Point = this.pixelToTileCoords(
				Math.floor(Math.max(rect.x - (layer.maxTileSize.width -  layer.tilewidth ), 0)),
				Math.floor(Math.max(rect.y - (layer.maxTileSize.height - layer.tileheight), 0))
				);

			var end: egret.Point = this.pixelToTileCoords(
				Math.ceil(rect.x + rect.width + this.tilewidth),
				Math.ceil(rect.y + rect.height + this.tileheight)
				);

			end.x = end.x > this.rows ? this.rows : end.x;
            end.y = end.y > this.cols ? this.cols : end.y;

			for (var y: number = start.y; y < end.y; y++) {
				for (var x: number = start.x; x < end.x; x++) {
					var tmxTile: tiled.TMXTile = layer.layerData[x][y];
					if (tmxTile) {
						if (tmxTile.animation) 
							this.animationTiles.push({ "tmxTile": tmxTile, "pos": [x, y] });
						else
							this.drawTile(staticContainer, x, y, tmxTile);
					} 
				}
			}
		}
	} 
}
