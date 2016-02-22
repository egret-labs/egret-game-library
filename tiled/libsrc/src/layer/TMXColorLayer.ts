module tiled{
    
	export class TMXColorLayer extends egret.Sprite {
		private _color: string;
		private _z: number;
		private _tilemap: tiled.TMXTilemap;
		
		/**
		 * 创建1个Tile颜色图层
		 * @param tilemap TMXTilemap实例
		 * @param color 颜色值，格式#ff0000
		 * @param z 图层深度
		 * @version Egret 3.0.3
		 */
		constructor(tilemap: tiled.TMXTilemap, color: string, z: number) {
			super();
			this._tilemap   = tilemap;
			this._color     = color;
			this._z         = z;
			this.graphics.beginFill(tiled.TMXUtils.color16ToUnit(this._color), 1);
			this.graphics.drawRect(0, 0, tilemap.renderwidth, tilemap.renderheight);
			this.graphics.endFill();
		}
	} 
}
