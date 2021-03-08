module tiled{
	export abstract class TMXRenderer {
        protected animationTiles: any[];
		
		/**
		 * 渲染器基类
		 * @param rows 水平方向格子数
		 * @param cols 垂直方向格子数
		 * @param tilewidth 格子宽（单位：像素）
		 * @param tileheight 格子高（单位：像素）
		 * @version Egret 3.0.3
		 */
        constructor(public rows: number,public cols: number,public tilewidth: number,public tileheight: number) {
			this.animationTiles = [];
		}

		/**
		 * 是否能够渲染
		 * @param layer
		 * @version Egret 3.0.3
		 * @private
		 */
		canRender(layer:any): boolean {
			return (
				(this.cols === layer.cols) &&
				(this.rows === layer.rows) &&
				(this.tilewidth === layer.tilewidth) &&
				(this.tileheight === layer.tileheight));
		}
		
		/**
		 * 地图坐标转化为格子坐标
		 * @param x 水平地图坐标
		 * @param y 垂直地图坐标
		 * @version Egret 3.0.3
		 */
		abstract mapToTileCoords(x: number, y: number): egret.Point;

		/**
		 * 格子坐标转化为地图坐标
		 * @param tileX 水平格子坐标
		 * @param tileY 垂直格子坐标
		 * @version Egret 3.0.3
		 */
		abstract tileToMapCoords(tileX: number, tileY: number): egret.Point;

		/**
		 * 像素坐标转化为格子坐标
		 * @param x 水平像素坐标
		 * @param y 垂直像素坐标
		 * @version Egret 3.0.3
		 */
		abstract pixelToTileCoords(x: number, y: number): egret.Point;

		/**
		 * 格子坐标转化为像素坐标
		 * @param tileX 水平格子坐标
		 * @param tileY 垂直格子坐标
		 * @version Egret 3.0.3
		 */
		abstract tileToPixelCoords(tileX: number, tileY: number): egret.Point;

		/**
		 * 地图坐标转化为像素坐标
		 * @param {number} x 水平地图坐标
		 * @param {number} y 垂直地图坐标
		 * @return {*}  {egret.Point}
		 * @version Egret 3.0.3
		 */
		abstract mapToPixelCoords(x: number, y: number): egret.Point;

		/**
		 * 像素坐标转化为地图坐标
		 * @param {number} x 水平像素坐标
		 * @param {number} y 垂直像素坐标
		 * @return {*}  {egret.Point}
		 * @version Egret 3.0.3
		 */
		abstract pixelToMapCoords(x: number, y: number): egret.Point;

		/**
		 * 绘制Tile图层
		 * @param layer
		 * @param rect
		 * @version Egret 3.0.3
		 */
		drawTileLayer(layer: tiled.TMXLayer, rect: egret.Rectangle): void {

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

		}
		
		/**
		 * 渲染动画
		 * @param renderContainer
		 * @version Egret 3.0.3
		 */
		render(renderContainer: egret.Sprite): void {
			if (!this.animationTiles)
				return;

			var currentTime: number 			        = egret.getTimer();
			for (var i: number = 0; i < this.animationTiles.length; i++) {
				var animationInfo: any 			  = this.animationTiles[i];
				var tmxTile: tiled.TMXTile 		  = animationInfo.tmxTile;
				var pos: Array<number> 			  = animationInfo.pos;
				var animation: tiled.TMXAnimation 	  = tmxTile.animation;
				var frame: tiled.TMXAnimationFrame 	  = animation.currentAnimationFrame;
                if(animation["oldTime"] == undefined)
                    animation["oldTime"] = 0;
				if(currentTime - animation["oldTime"] > frame.duration) {
					if(animation.oldBitmap && animation.oldBitmap.parent)
						animation.oldBitmap.parent.removeChild(animation.oldBitmap);
					this.drawTile(renderContainer, pos[0], pos[1], frame.tile);
					animation.oldBitmap			  = frame.tile.bitmap;
                    animation["oldTime"] 			  = currentTime;
					animation.render();
				}
			}
		}
	} 
}
