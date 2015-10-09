module tiled{
	export class TMXRenderer {
		private _cols: number;
		private _rows: number;
		private _tilewidth: number;
		private _tileheight: number;
		protected animationTiles: Array<any>;
		protected offsetsStaggerX: Array<any> = [
			{ x: 0, y: 0 },
			{ x: + 1, y: - 1 },
			{ x: + 1, y: 0 },
			{ x: + 2, y: 0 },];
		protected offsetsStaggerY: Array<any> = [
			{ x: 0, y: 0 },
			{ x: - 1, y: + 1 },
			{ x: 0, y: + 1 },
			{ x: 0, y: + 2 }, ];
		
		constructor(cols: number, rows: number, tilewidth: number, tileheight: number) {
			this._cols = cols;
			this._rows = rows;
			this._tilewidth = tilewidth;
			this._tileheight = tileheight;
			this.animationTiles = [];
		}
		
		get cols(){
			return this._cols;
		}
		
		get rows(){
			return this._rows;
		}
		
		get tilewidth(){
			return this._tilewidth;
		}
		
		get tileheight(){
			return this._tileheight;
		}

		canRender(layer:any): boolean {
			return (
				(this.cols === layer.cols) &&
				(this.rows === layer.rows) &&
				(this.tilewidth === layer.tilewidth) &&
				(this.tileheight === layer.tileheight));
		}

		drawTileLayer(layer: tiled.TMXLayer, rect: egret.Rectangle): void {

		}

		drawTile(renderer: egret.Sprite, x: number, y: number, tmxTile: tiled.TMXTile): void {

		}

		//渲染动画
		render(renderContainer: egret.Sprite): void {
			if (!this.animationTiles)
				return;

			var currentTime: number 			= egret.getTimer();
			for (var i: number = 0; i < this.animationTiles.length; i++) {
				var animationInfo: any 			= this.animationTiles[i];
				var tmxTile: tiled.TMXTile 			= animationInfo.tmxTile;
				var pos: Array<number> 			= animationInfo.pos;
				var animation: tiled.TMXAnimation 	= tmxTile.animation;
				var frame: tiled.TMXAnimationFrame 	= animation.currentAnimationFrame;
				if (currentTime - animation.oldTime > frame.duration) {
					if(animation.oldBitmap&&animation.oldBitmap.parent)
						animation.oldBitmap.parent.removeChild(animation.oldBitmap);
					this.drawTile(renderContainer, pos[0], pos[1], frame.tile);
					animation.oldBitmap			=frame.tile.bitmap;
					animation.oldTime 			= currentTime;
					animation.render();
				}
			}
		}
	} 
}
