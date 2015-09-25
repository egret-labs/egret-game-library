//Tile设置中的Tile TMXLayer中的Tile
class TMXTile extends egret.Sprite{
    private _col: number;
    private _row: number;

    private _flippedX: boolean;
    private _flippedY: boolean;
    private _flippedAD: boolean;
    private _flipped: boolean;

    private _gid: number;
    private _tileData: any;
    private _tileset: TMXTileset;
    private _tilemap: TMXTilemap;
    
    private _image: TMXImage;
    private _animation: TMXAnimation;
    private _properties: Array<TMXProperty>;
    private _objectGroups: Array<TMXObjectGroup>;

    bitmap: egret.Bitmap;
    //x 为在场景中的水平格子坐标,y 为在场景中的垂直格子坐标
    constructor(x: number, y: number, gid: number, tilemap: TMXTilemap, tileset: TMXTileset) {
        super();

        this._tileset = tileset;
        this._col = x;
        this._row = y;

        this._tilemap = tilemap;
        this._gid = gid;
        this._flippedX = (this._gid & TMXConstants.TMX_FLIP_H) !== 0;
        this._flippedY = (this._gid & TMXConstants.TMX_FLIP_V) !== 0;
        this._flippedAD = this._flippedX && this._flippedY;//(this._gid & TMXConstants.TMX_FLIP_AD) !== 0;
        this._flipped = this._flippedX || this._flippedY || this._flippedAD;
        this._gid &= TMXConstants.TMX_CLEAR_BIT_MASK;

        this._tileData   = tileset.getSpecialTileDataByTileId(this._gid);
        if (this._tileData) {
            var children: Array<any> = this._tileData.children;
            for (var i: number = 0; i < children.length; i++) {
                var child: any = children[i];
                switch (child.localName) {
                    case TMXConstants.PROPERTIES:
                        this._properties = tilemap.parseProperties(child);
                        break;

                    case TMXConstants.OBJECT_GROUP:

                        break;

                    case TMXConstants.IMAGE:
                        this._image = new TMXImage(child, this.tilemap.baseURL);
                        break;

                    case TMXConstants.ANIMATION:
                        this._animation = new TMXAnimation(child, x, y, tilemap, tileset);
                        break;
                }
            }
        }
    }

    get gid() {
        return this._gid;
    }

    get col() {
        return this._col;
    }

    get row() {
        return this._row;
    }

    get tileset() {
        return this._tileset;
    }

    get image() {
        return this._image;
    }

    get tilemap() {
        return this._tilemap;
    }

    get flippedX() {
        return this._flippedX;
    }

    get flippedY() {
        return this._flippedY;
    }

    get flippedAD() {
        return this._flippedAD;
    }

    get flipped() {
        return this._flipped;
    }

    get animation() {
        return this._animation;
    }
} 