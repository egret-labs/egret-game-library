class TMXLayer extends egret.Sprite {
    private _tilewidth: number;
    private _tileheight: number;
    private _orientation: string;
    private _tilesets: TMXTilesetGroup;
    private _name: string;
    private _cols: number;
    private _rows: number;
    private _hexsidelength: number;
    private _staggeraxis: string;
    private _staggerindex: number;
    private _opacity: number;
    private renderer: TMXRenderer;
    private _tilemap: TMXTilemap;
    private _properties: Array<TMXProperty>;
	
	private _staticContainer:egret.Sprite;
	private _animationContainer:egret.Sprite;

    layerData: Array<Array<TMXTile>>;
    tileset: TMXTileset;
    maxTileSize: any;
    get name() {
        return this._name;
    }
	
	get staticContainer(){
		return this._staticContainer;
	}
	
	get animationContainer(){
		return this._animationContainer;
	}

    get tilewidth() {
        return this._tilewidth;
    }

    get tileheight() {
        return this._tileheight;
    }

    get orientation() {
        return this._orientation;
    }

    get cols() {
        return this._cols;
    }

    get rows() {
        return this._rows;
    }

    get hexsidelength() {
        return this._hexsidelength;
    }

    get staggeraxis() {
        return this._staggeraxis;
    }

    get staggerindex() {
        return this.staggerindex;
    }

    get opacity() {
        return this._opacity;
    }

    get properties() {
        return this._properties;
    }

    //每1个图层的信息，包括：水平格子数，垂直格子数，渲染方向，tilesets组，层深
    constructor(tilemap: TMXTilemap, tilewidth: number, tileheight: number, orientation: string, tilesets: TMXTilesetGroup, z: number, data: any) {
        super();
		
		this._staticContainer=new egret.Sprite();
		this._staticContainer.cacheAsBitmap=true;
		this.addChild(this._staticContainer);
		
		this._animationContainer=new egret.Sprite();
		this.addChild(this._animationContainer);
		
        this._tilemap               = tilemap;
        this._tilewidth             = tilewidth;
        this._tileheight            = tileheight;
        this._orientation           = orientation;
        this._tilesets              = tilesets;

        this.tileset                = this._tilesets ? this._tilesets.getTilesetByIndex(0) : null;
        this.maxTileSize            = { "width": 0, "height": 0 };
        //根据Tile设置来设置图层数据
        for (var i: number = 0; i < this._tilesets.length; i++) {
            var tileset: TMXTileset = this._tilesets.getTilesetByIndex(i);
            this.maxTileSize.width  = Math.max(this.maxTileSize.width, tileset.tilewidth);
            this.maxTileSize.height = Math.max(this.maxTileSize.height, tileset.tileheight);
        }

        this._name                  = data.attributes.name;
        this._cols                  = +data.attributes.width;
        this._rows                  = +data.attributes.height;
        this._opacity               = (typeof data.attributes.opacity !== "undefined") ? parseFloat(data.attributes.opacity) : 1;
        this.visible                = (typeof data.attributes.visible !== "undefined") ? data.attributes.visible : true;

        this._hexsidelength         = +data.attributes.hexsidelength;
        this._staggeraxis           = data.attributes.staggeraxis;
        this._staggerindex          = +data.attributes.staggerindex;

        // layer "real" size
        if (this._orientation === "isometric") {
            this.width              = (this._cols + this._rows) * (this._tilewidth / 2);
            this.height             = (this._cols + this._rows) * (this._tileheight / 2);
        } else {
            this.width              = this._cols * this._tilewidth;
            this.height             = this._rows * this._tileheight;
        }

        this.initArray(this._cols, this._rows);

        //解析子属性
        var children: Array<any> = data.children;
        if (children) {
            for (var i: number = 0; i < children.length; i++) {
                var child: any = children[i];
                switch (child.localName) {
                    case TMXConstants.DATA:
                        //解析数据
                        this.setLayerData(TMXUtils.decode(child, child.attributes.encoding, child.attributes.compression));
                        break;

                    case TMXConstants.PROPERTIES:
                        //解析属性
                        this._properties = this.tilemap.parseProperties(child);
                        break;

                    default:
                        throw new Error("TMXTileMap decode Layer is Error：" + child.localName);
                        break;
                }
            }
        }

        this.alpha = this._opacity;
        this.visible = this.visible;
    }

    get tilemap() {
        return this._tilemap;
    }

    setRenderer(renderer: TMXRenderer): void {
        this.renderer = renderer;
    }

    getTileId(x:number,y:number): number {
        var tile:TMXTile = this.getTile(x, y);
        return tile ? tile.gid : 0;
    }

    getTile(x: number, y: number): TMXTile {
        if (this.renderer instanceof TMXOrthogonalRenderer) {
            return this.layerData[~~(<TMXOrthogonalRenderer>this.renderer).pixelToTileX(x)][~~(<TMXOrthogonalRenderer>this.renderer).pixelToTileY(y)];
        } else if (this.renderer instanceof TMXIsometricRenderer) {
            return this.layerData[~~(<TMXIsometricRenderer>this.renderer).pixelToTileX(x,y)][~~(<TMXIsometricRenderer>this.renderer).pixelToTileY(y,x)];
        }
        return this.layerData[~~(<TMXHexagonalRenderer>this.renderer).pixelToTileX(x, y)][~~(<TMXHexagonalRenderer>this.renderer).pixelToTileY(y, x)];
    }
    
    //TMXTileMap#setLayerData调用
    setTile(x: number, y: number, tileId: number): TMXTile {
        if (!this.tileset.contains(tileId)) 
            this.tileset = this._tilesets.getTilesetByGid(tileId);
        if (this.tileset) {
            var tile: TMXTile = this.layerData[x][y] = new TMXTile(x, y, tileId, this.tilemap, this.tileset);
            return tile;
        }
        return null;
    }

    clearTile(x: number, y: number): void {
        this.layerData[x][y] = null;
    }

    draw(rect: egret.Rectangle): void {
        this.renderer.drawTileLayer(this, rect);
    }

    render(): void {
        this.renderer.render(this._animationContainer);
    }

    private initArray(cols: number, rows: number) {
        this.layerData = [];
        for (var x: number = 0; x < cols; x++) {
            this.layerData[x] = [];
            for (var y: number = 0; y < rows; y++) {
                this.layerData[x][y] = null;
            }
        }
    }

    private setLayerData(data: Array<number>): void {
        if (data) {
            var idx: number = 0;
            for (var y: number = 0; y < this.rows; y++) {
                for (var x: number = 0; x < this.cols; x++) {
                    var gid = data[idx];
                    if (gid !== 0) {
                        this.setTile(x, y, gid);
                    }
                    idx++;
                }
            }
        }
    }
} 