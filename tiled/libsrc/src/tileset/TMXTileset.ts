class TMXTileset { 
    private _lastgid: number;
    private _firstgid: number;
    private _name: string;
    private _tilewidth: number;
    private _tileheight: number;
    private _spacing: number;
    private _margin: number;
    private _tileoffset: egret.Point;
    private _hTileCount: number;
    private _vTileCount: number;
    private _tilemap: TMXTilemap;
    private _tileDatas: Array<any>;
    private _properties: Array<any>;
    private _image: TMXImage;
    private _imagesource: string;
    private _transformMatrix: egret.Matrix;
    private static _cacheRenderTextures: any;

    constructor(tilemap: TMXTilemap, tilesetData: any) {
        this._tileDatas     = [];
        TMXTileset._cacheRenderTextures = {};
        this._firstgid      = +tilesetData.attributes.firstgid;
        this._lastgid       = this._firstgid;
        this._tilemap       = tilemap;
        //tileset也可能是外部加载的
        var src: string     = tilesetData.attributes.source;
        if (src && this.getFileExtension(src) === "tsx") {
            throw new Error("tmx not support tsx file load!!!");
        }

        this._transformMatrix = new egret.Matrix();

        this._name          = tilesetData.attributes.name;
        this._tilewidth     = +tilesetData.attributes.tilewidth;
        this._tileheight    = +tilesetData.attributes.tileheight;
        this._spacing       = +tilesetData.attributes.spacing || 0;
        this._margin        = +tilesetData.attributes.margin || 0;
        

        //每个Tileset有个偏移值，这个偏移值是指绘制在场景中的对象的偏移值
        this._tileoffset    = new egret.Point();
        this._hTileCount    = 0;
        this._vTileCount    = 0;

        var childrens: Array<any> = tilesetData.children;
        if (childrens) {
            for (var i: number = 0; i < childrens.length; i++) {
                var child: any = childrens[i];
                switch (child.localName) {
                    case TMXConstants.IMAGE:
                        this._image = new TMXImage(child, this.tilemap.baseURL);
                        this._imagesource = this._image.source;
                        break;

                    case TMXConstants.TILE_OFFSET:
                        this._tileoffset = new egret.Point(+child.attributes.x, +child.attributes.y);
                        break;

                    case TMXConstants.TILE:
                        var gid: number = +child.attributes.id + this._firstgid;
                        if (this._tileDatas[gid] == null)
                            this._tileDatas[gid] = child;
                        break;

                    case TMXConstants.PROPERTIES:
                        this._properties = tilemap.parseProperties(child);
                        break;
                }
            }
        }

        if (this._image) {
            this._hTileCount    = ~~(this._image.width / (this._tilewidth + this._spacing));
            this._vTileCount    = ~~(this._image.height / (this._tileheight + this._margin));
            this._lastgid       = this._firstgid + (((this._hTileCount * this._vTileCount) - 1) || 0);
        }    
    }

    get name() {
        return this._name;
    }

    get firstgid() {
        return this._firstgid;
    }

    get lastgid() {
        return this._lastgid;
    }

    get tilewidth() {
        return this._tilewidth;
    }

    get tileheight() {
        return this._tileheight;
    }

    //获取tileset分隔的间距
    get spacing() {
        return this._spacing;
    }

    //获取tileset分隔的边距
    get margin() {
        return this._margin;
    }

    get tileoffset() {
        return this._tileoffset;
    }

    get horizontalTileCount() {
        return this._hTileCount;
    }

    get verticalTileCount() {
        return this._vTileCount;
    }

    get tilemap() {
        return this._tilemap;
    }

    get properties() {
        return this._properties;
    }

    get image() {
        return this._image;
    }

    //获取特殊的格子数据
    getSpecialTileDataByTileId(gid:number): any {
        return this._tileDatas[gid];
    }

    //获取文件扩展名
    getFileExtension = function (path:string) {
        return path.substring(path.lastIndexOf(".") + 1, path.length);
    };

    getTileProperties(tileId: number):any {
        return this._properties[tileId];
    }

    contains(gid):boolean {
        return gid >= this._firstgid && gid <= this._lastgid;
    }

    drawTile(renderer: egret.Sprite, dx: number, dy: number, tmxTile: TMXTile): void {
        //用gid+col+row作key来降低draw的次数
        var renderTexture: egret.RenderTexture;
        var id: number = tmxTile.gid - this.firstgid;
        var key: string = this.firstgid + "_" + id;
        if (key) {
            if (TMXTileset._cacheRenderTextures[key] == null) {
                if (this.image) {
                    renderTexture = new egret.RenderTexture();
                    renderTexture.drawToTexture(
                        this.image.bitmap,
                        new egret.Rectangle(
                            (id % this.horizontalTileCount) * (this.tilewidth + this._spacing) + this._spacing,
                            (Math.floor(id / this.horizontalTileCount)) * (this.tileheight + this._margin) + this._margin,
                            this.tilewidth,
                            this.tileheight)
                        );
                    TMXTileset._cacheRenderTextures[key] = renderTexture;
                }
            } else {
                renderTexture = TMXTileset._cacheRenderTextures[key];
            }

            if (renderTexture) {
                var isImage: boolean = false;
                var isObject: boolean = false;
                if (renderer instanceof TMXObject) {
                    isObject = true;
                    isImage = (<TMXObject>renderer).isImage;
                }
                this._transformMatrix.identity();
                var _scalex: number = isObject ? renderer.width / renderTexture.textureWidth : 1;
                var _scaley: number = isObject ? renderer.height / renderTexture.textureHeight : 1;
                if (tmxTile.flippedAD) {
                    this._transformMatrix.scale(-1 * _scalex, -1 * _scaley);
                    this._transformMatrix.translate(dx + renderer.width * _scalex, dy + renderer.height * _scaley);
                } else if (tmxTile.flippedY) {
                    this._transformMatrix.scale(1 * _scalex, -1 * _scaley);
                    this._transformMatrix.translate(dx, dy + renderer.height * _scaley);
                } else if (tmxTile.flippedX) {
                    this._transformMatrix.scale(-1 * _scalex, 1 * _scaley);
                    this._transformMatrix.translate(dx + renderer.width * _scalex, dy);
                } else {
                    this._transformMatrix.scale(_scalex, _scaley);
                    this._transformMatrix.translate(dx, dy + (isObject ? (renderTexture.textureHeight - renderer.height) : 0));
                }
				
                if (tmxTile.bitmap == null)
					tmxTile.bitmap 			= new egret.Bitmap();
                tmxTile.bitmap.texture 		= renderTexture;
                tmxTile.bitmap.matrix		= this._transformMatrix;
				renderer.addChild(tmxTile.bitmap);
            }
        }   
    }
} 