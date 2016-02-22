module tiled{
	export class TMXHexagonalRenderer extends TMXRenderer {
		private _hexsidelength: number;
		private _staggeraxis: string;
		private _staggerindex: string;
		private _sidelengthx: number;
		private _sidelengthy: number;
		private _sideoffsetx: number;
		private _sideoffsety: number;
		private _columnwidth: number;
		private _rowheight: number;
		private _centers: Array<egret.Point>;
		
		/**
		 * 创建1个六角形渲染器实例
		 * @param rows 水平方向格子数
		 * @param cols 垂直方向格子数
		 * @param tilewidth 格子宽（单位：像素）
		 * @param tileheight 格子高（单位：像素）
		 * @param hexsidelength
		 * @param staggeraxis
		 * @param staggerindex
		 * @version Egret 3.0.3
		 */
		constructor(rows: number, cols: number, tilewidth: number, tileheight: number, hexsidelength: number, staggeraxis: string, staggerindex: string) {
			super(rows, cols, tilewidth, tileheight);

			this._hexsidelength  = hexsidelength;
			this._staggeraxis    = staggeraxis;
			this._staggerindex   = staggerindex;

			this._sidelengthx    = 0;
			this._sidelengthy    = 0;

			if (staggeraxis === "x")
				this._sidelengthx = hexsidelength;
			else
				this._sidelengthy = hexsidelength;

			this._sideoffsetx    = (this.tilewidth - this._sidelengthx) / 2;
			this._sideoffsety    = (this.tileheight - this._sidelengthy) / 2;

			this._columnwidth    = this._sideoffsetx + this._sidelengthx;
			this._rowheight      = this._sideoffsety + this._sidelengthy;

			this._centers = [new egret.Point(), new egret.Point(), new egret.Point(), new egret.Point()];
		}

		
		/**
		 * 是否可渲染
		 * @param layer
		 * @version Egret 3.0.3
		 */
		canRender(layer: any): boolean {
			return (layer.orientation === tiled.TMXConstants.ORIENTATION_HEXAGONAL) && super.canRender(layer);
		}

		
		/**
		 * 像素坐标转化为格子坐标
		 * @param x 水平像素坐标
		 * @param y 垂直像素坐标
		 * @version Egret 3.0.3
		 */
		pixelToTileCoords(x: number, y: number): egret.Point {
			if (this._staggeraxis === "x")//平顶
				x = x - ((this._staggerindex === "old") ? this._sidelengthx : this.tilewidth);
			else//尖顶
				y = y - ((this._staggerindex === "old") ? this._sideoffsety : this.tileheight);

			var referencePoint: egret.Point = new egret.Point(
				Math.floor(x / (this.tilewidth + this._sidelengthx)),
				Math.floor(y / (this.tileheight + this._sidelengthy))
				);

			var rel: egret.Point = new egret.Point(
				x - referencePoint.x * (this.tilewidth + this._sidelengthx),
				y - referencePoint.y * (this.tilewidth + this._sidelengthy)
				);

			if (this._staggeraxis === "x") {
				referencePoint.x = referencePoint.x * 2;
				if (this._staggerindex === "even") {
					++referencePoint.x;
				}
			} else {
				referencePoint.y = referencePoint.y * 2;
				if (this._staggerindex === "even") {
					++referencePoint.y;
				}
			}

			//确定最近的六角瓦片距离中心的距离
			var left: number, top: number, centerX: number, centerY: number;
			if (this._staggeraxis === "x") {
				left = this._sidelengthx / 2;
				centerX = left + this._columnwidth;
				centerY = this.tileheight / 2;

				this._centers[0].setTo(left, centerY);
				this._centers[1].setTo(centerX, centerY - this._rowheight);
				this._centers[2].setTo(centerX, centerY + this._rowheight);
				this._centers[3].setTo(centerX + this._columnwidth, centerY);
			} else {
				top = this._sidelengthy / 2;
				centerX = this.tilewidth / 2;
				centerY = top + this._rowheight;

				this._centers[0].setTo(centerX, top);
				this._centers[1].setTo(centerX - this._columnwidth, centerY);
				this._centers[2].setTo(centerX + this._columnwidth, centerY);
				this._centers[3].setTo(centerX, centerY + this._rowheight);
			}

			var nearest: number = 0;
			var minDist: number = Number.MAX_VALUE;
			var dc: number;
			for (var i: number = 0; i < 4; ++i) {
				dc = Math.pow(this._centers[i].x - rel.x, 2) + Math.pow(this._centers[i].y - rel.y, 2);
				if (dc < minDist) {
					minDist = dc;
					nearest = i;
				}
			}
            var offsetsStaggerX: any[] = [
                { x: 0,y: 0 },
                { x: + 1,y: - 1 },
                { x: + 1,y: 0 },
                { x: + 2,y: 0 },];
            var offsetsStaggerY: any[] = [
                { x: 0,y: 0 },
                { x: - 1,y: + 1 },
                { x: 0,y: + 1 },
                { x: 0,y: + 2 },];
			var offsets: Array<any> = (this._staggeraxis === "x") ? offsetsStaggerX : offsetsStaggerY;
			return new egret.Point(referencePoint.x + offsets[nearest].x, referencePoint.y + offsets[nearest].y);
		}

		
		/**
		 * 像素坐标转换成水平格子坐标
		 * @param x 水平像素坐标（单位：像素）
		 * @param y 垂直像素坐标（单位：像素）
		 * @version Egret 3.0.3
		 */
		pixelToTileX(x: number, y: number): number {
			var ret: egret.Point = this.pixelToTileCoords(x, y);
			return ret.x;
		}

		
		/**
		 * 像素坐标转换成垂直格子坐标
		 * @param y 垂直像素坐标（单位：像素）
		 * @param x 水平像素坐标（单位：像素）
		 * @version Egret 3.0.3
		 */
		pixelToTileY(y: number, x: number): number {
			var ret: egret.Point = this.pixelToTileCoords(x, y);
			return ret.y;
		}

		
		/**
		 * 返回指定的瓦片对应的像素位置
		 * @param q
		 * @param r
		 * @version Egret 3.0.3
		 */
		tileToPixelCoords(q: number, r: number): egret.Point {
			var x: number, y: number;
			if (this._staggeraxis === "x") {
				x = q * this._columnwidth;
				if (this._staggerindex === "odd") {
					y = r * (this.tileheight + this._sidelengthy);
					y = y + (this._rowheight * (q & 1));
				} else {
					y = r * (this.tileheight + this._sidelengthy);
					y = y + (this._rowheight * (1 - (q & 1)));
				}
			} else {
				y = r * this._rowheight;
				if (this._staggerindex === "odd") {
					x = q * (this.tilewidth + this._sidelengthx);
					x = x + (this._columnwidth * (r & 1));
				} else {
					x = q * (this.tilewidth + this._sidelengthx);
					x = x + (this._columnwidth * (1 - (r & 1)));
				}
			}
			return new egret.Point(x, y);
		}

		
		/**
		 * 绘制格子
		 * @param renderer 渲染容器
		 * @param tileX 水平格子坐标
		 * @param tileY 垂直格子坐标
		 * @param tile TMXTile实例
		 * @version Egret 3.0.3
		 */
        drawTile(renderer: egret.Sprite,tileX: number,tileY: number,tile: tiled.TMXTile): void {
            var point: egret.Point = this.tileToPixelCoords(tileX,tileY);
            var tileset: tiled.TMXTileset = tile.tileset;
			tileset.drawTile(
				renderer,
				tileset.tileoffset.x + point.x,
				tileset.tileoffset.y + point.y + (this.tileheight - tileset.tileheight),
                tile);
		}

		
		/**
		 * 绘制图层
		 * @param layer 图层
		 * @param rect 绘制区域
		 * @version Egret 3.0.3
		 */
		drawTileLayer(layer:tiled.TMXLayer,rect:egret.Rectangle): void {
            var staticContainer: egret.Sprite = layer.staticContainer;
			var start: egret.Point = this.pixelToTileCoords(Math.floor(rect.x), Math.floor(rect.y));
			var end: egret.Point = this.pixelToTileCoords(
				Math.floor(rect.x + rect.width + this.tilewidth),
				Math.floor(rect.y + rect.height + this.tileheight));

			start.x = start.x < 0 ? 0 : start.x;
			start.y = start.y < 0 ? 0 : start.y;
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
