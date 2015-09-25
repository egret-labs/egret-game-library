class TMXAnimationFrame {
    private _tiledid: number;
    private _duration: number;
    private _tile: TMXTile;
    constructor(data:any,x:number,y:number,tilemap:TMXTilemap,tileset:TMXTileset) {
        this._tiledid   = +data.attributes.tileid;
        this._duration  = +data.attributes.duration;
        this._tile 		= new TMXTile(x, y, this._tiledid + tileset.firstgid, tilemap, tileset);
    }

    get tile() {
        return this._tile;
    }

    get tiledId() {
        return this._tiledid;
    }

    get duration() {
        return this._duration;
    }
} 