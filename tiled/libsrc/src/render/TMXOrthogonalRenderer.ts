class TMXOrthogonalRenderer extends TMXRenderer {
    constructor(cols: number, rows: number, tilewidth: number, tileheight: number) {
        super(cols, rows, tilewidth, tileheight);
    }

    canRender(layer:any): boolean {
        return (layer.orientation === TMXConstants.ORIENTATION_ORTHOGONAL) && super.canRender(layer);
    }

    //像素坐标转化为格子坐标
    pixelToTileCoords(x: number, y: number): egret.Point {
        return new egret.Point(this.pixelToTileX(x), this.pixelToTileY(y));
    }

    //水平像素坐标转化为水平格子坐标
    pixelToTileX(x: number): number {
        return Math.floor(x / this.tilewidth);
    }

    //垂直像素坐标转化为垂直格子坐标
    pixelToTileY(y: number): number {
        return Math.floor(y / this.tileheight);
    }

    //格子坐标转化为像素坐标
    tileToPixelCoords(tileX: number, tileY: number): egret.Point {
        return new egret.Point(tileX * this.tilewidth, tileY * this.tileheight);
    }

    //绘制1个Tile map
    drawTile(renderer: egret.Sprite, x: number, y: number, tmxTile: TMXTile): void {
        var tileset: TMXTileset = tmxTile.tileset;
        tileset.drawTile(renderer,
            tileset.tileoffset.x + x * this.tilewidth,
            tileset.tileoffset.y + (y + 1) * this.tileheight - tileset.tileheight,
            tmxTile);
    }

    //绘制作Tile图层
    drawTileLayer(layer: TMXLayer, rect: egret.Rectangle): void {
		var staticContainer:egret.Sprite=layer.staticContainer;
        var start: egret.Point = this.pixelToTileCoords(
            Math.floor(Math.max(rect.x - (layer.maxTileSize.width -  layer.tilewidth ), 0)),
            Math.floor(Math.max(rect.y - (layer.maxTileSize.height - layer.tileheight), 0))
            );

        var end: egret.Point = this.pixelToTileCoords(
            Math.ceil(rect.x + rect.width + this.tilewidth),
            Math.ceil(rect.y + rect.height + this.tileheight)
            );

        end.x = end.x > this.cols ? this.cols : end.x;
        end.y = end.y > this.rows ? this.rows : end.y;

        for (var y: number = start.y; y < end.y; y++) {
            for (var x: number = start.x; x < end.x; x++) {
                var tmxTile: TMXTile = layer.layerData[x][y];
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