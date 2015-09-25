class TMXIsometricRenderer extends TMXRenderer {
    private _hTilewidth: number;
    private _hTileheight: number;
    private _originX: number;
    constructor(cols: number, rows: number, tilewidth: number, tileheight: number) {
        super(cols, rows, tilewidth, tileheight);
        this._hTilewidth 	= this.tilewidth / 2;
        this._hTileheight 	= this.tileheight / 2;
        this._originX 		= this.rows * this._hTilewidth;
    }

    canRender(layer:any): boolean {
        return (layer.orientation === TMXConstants.ORIENTATION_ISOMETRIC) && super.canRender(layer);
    }

    pixelToTileCoords(x: number, y: number): egret.Point {
		var __x:number=Math.floor(this.pixelToTileX(x, y));
		var __y:number=Math.floor(this.pixelToTileY(y, x));
        return new egret.Point(this.pixelToTileX(x, y), this.pixelToTileY(y, x));
    }

    pixelToTileX(x: number, y: number): number {
		var _value:number=(y / this.tileheight) + ((x - this._originX) / this.tilewidth);
        return (y / this.tileheight) + ((x - this._originX) / this.tilewidth);
    }

    pixelToTileY(y: number,x:number): number {
		var _value:number=(y / this.tileheight) - ((x - this._originX) / this.tilewidth);
        return (y / this.tileheight) - ((x - this._originX) / this.tilewidth);
    }

    tileToPixelCoords(x: number, y: number): egret.Point {
        return new egret.Point((x - y) * this._hTilewidth + this._originX, (x + y) * this._hTileheight);
    }

    drawTile(renderer: egret.Sprite, x: number, y: number, tmxTile: TMXTile): void {
        var tileset: TMXTileset = tmxTile.tileset;
        tileset.drawTile(renderer,
            tileset.tileoffset.x + x,
            tileset.tileoffset.y + y - tileset.tileheight,
            tmxTile);
    }

    drawTileLayer(layer: TMXLayer, rect: egret.Rectangle): void {
		var staticContainer:egret.Sprite=layer.staticContainer;
        var tileset: TMXTileset = layer.tileset;
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
                if ((columnItr.x >= 0) && (columnItr.y >= 0) && (columnItr.x < this.cols) && (columnItr.y < this.rows)) {
                    var tmxTile: TMXTile = layer.layerData[columnItr.x][columnItr.y];
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