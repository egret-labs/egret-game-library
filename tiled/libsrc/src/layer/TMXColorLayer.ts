module tiled{
	export class TMXColorLayer extends egret.Sprite {
		private _color: string;
		private _z: number;
		private _tilemap: tiled.TMXTilemap;
		constructor(tilemap: tiled.TMXTilemap, color: string, z: number) {
			super();
			this._tilemap = tilemap;
			this._color = color;
			this._z = z;
			this.graphics.beginFill(tiled.TMXUtils.color16ToUnit(this._color), 1);
			this.graphics.drawRect(0, 0, tilemap.renderwidth, tilemap.renderheight);
			this.graphics.endFill();
		}
	} 
}
