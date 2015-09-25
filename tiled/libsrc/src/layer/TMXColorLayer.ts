class TMXColorLayer extends egret.Sprite {
    private _color: string;
    private _z: number;
    private _tilemap: TMXTilemap;
    constructor(tilemap: TMXTilemap, color: string, z: number) {
        super();
        this._tilemap = tilemap;
        this._color = color;
        this._z = z;
        this.graphics.beginFill(TMXUtils.color16ToUnit(this._color), 1);
        this.graphics.drawRect(0, 0, tilemap.renderwidth, tilemap.renderheight);
        this.graphics.endFill();
    }
} 