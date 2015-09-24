var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var TMXAnimation = (function () {
    function TMXAnimation($data, x, y, tilemap, tileset) {
        this._currentFrame = 0;
        this.oldTime = 0;
        if ($data) {
            this._x = x;
            this._y = y;
            this._data = $data;
            this._animations = [];
            this._currentFrame = 0;
            var children = $data.children;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    var frame = new TMXAnimationFrame(child, x, y, tilemap, tileset);
                    this._animations[i] = frame;
                }
            }
        }
    }
    var d = __define,c=TMXAnimation;p=c.prototype;
    d(p, "x"
        ,function () {
            return this._x;
        }
    );
    d(p, "y"
        ,function () {
            return this._y;
        }
    );
    p.render = function () {
        this._currentFrame++;
        this._currentFrame = this._currentFrame % this._animations.length;
    };
    d(p, "currentAnimationFrame"
        ,function () {
            return this._animations[this._currentFrame];
        }
    );
    d(p, "animations"
        ,function () {
            return this._animations;
        }
    );
    d(p, "data"
        ,function () {
            return this._data;
        }
    );
    return TMXAnimation;
})();
egret.registerClass(TMXAnimation,"TMXAnimation");

var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var TMXAnimationFrame = (function () {
    function TMXAnimationFrame(data, x, y, tilemap, tileset) {
        this._tiledid = +data.attributes.tileid;
        this._duration = +data.attributes.duration;
        this._tile = new TMXTile(x, y, this._tiledid + tileset.firstgid, tilemap, tileset);
    }
    var d = __define,c=TMXAnimationFrame;p=c.prototype;
    d(p, "tile"
        ,function () {
            return this._tile;
        }
    );
    d(p, "tiledId"
        ,function () {
            return this._tiledid;
        }
    );
    d(p, "duration"
        ,function () {
            return this._duration;
        }
    );
    return TMXAnimationFrame;
})();
egret.registerClass(TMXAnimationFrame,"TMXAnimationFrame");

var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var TMXConstants = (function () {
    function TMXConstants() {
    }
    var d = __define,c=TMXConstants;p=c.prototype;
    TMXConstants.TMX_FLIP_H = 0x80000000;
    TMXConstants.TMX_FLIP_V = 0x40000000;
    TMXConstants.TMX_FLIP_AD = 0x20000000;
    TMXConstants.TMX_CLEAR_BIT_MASK = ~(0x80000000 | 0x40000000 | 0x20000000);
    TMXConstants.LAYER = "layer";
    TMXConstants.OBJECT_GROUP = "objectgroup";
    TMXConstants.PROPERTIES = "properties";
    TMXConstants.DATA = "data";
    TMXConstants.OBJECT = "object";
    TMXConstants.IMAGE = "image";
    TMXConstants.IMAGE_LAYER = "imagelayer";
    TMXConstants.TILE_SET = "tileset";
    TMXConstants.TILE = "tile";
    TMXConstants.TILE_OFFSET = "tileoffset";
    TMXConstants.ANIMATION = "animation";
    //默认颜色
    TMXConstants.DEFAULT_COLOR = 0xa0a0a4;
    TMXConstants.DRAWORDER_INDEX = "index";
    TMXConstants.POLYGON = "polygon";
    TMXConstants.POLYLINE = "polyline";
    TMXConstants.ELLIPSE = "ellipse";
    TMXConstants.TILE_OBJECT_GROUP = "tileobjectgroup";
    //正交
    TMXConstants.ORIENTATION_ORTHOGONAL = "orthogonal";
    //等矩
    TMXConstants.ORIENTATION_ISOMETRIC = "isometric";
    //交错
    TMXConstants.ORIENTATION_STAGGERED = "staggered";
    //六角
    TMXConstants.ORIENTATION_HEXAGONAL = "hexagonal";
    return TMXConstants;
})();
egret.registerClass(TMXConstants,"TMXConstants");

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var TMXImageLoadEvent = (function (_super) {
    __extends(TMXImageLoadEvent, _super);
    function TMXImageLoadEvent(type, data, bubbles, cancelable) {
        if (data === void 0) { data = null; }
        if (bubbles === void 0) { bubbles = true; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
        this.texture = data;
    }
    var d = __define,c=TMXImageLoadEvent;p=c.prototype;
    TMXImageLoadEvent.IMAGE_COMPLETE = "complete";
    TMXImageLoadEvent.ALL_IMAGE_COMPLETE = "allComplete";
    return TMXImageLoadEvent;
})(egret.Event);
egret.registerClass(TMXImageLoadEvent,"TMXImageLoadEvent");

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var TMXColorLayer = (function (_super) {
    __extends(TMXColorLayer, _super);
    function TMXColorLayer(tilemap, color, z) {
        _super.call(this);
        this._tilemap = tilemap;
        this._color = color;
        this._z = z;
        this.graphics.beginFill(TMXUtils.color16ToUnit(this._color), 1);
        this.graphics.drawRect(0, 0, tilemap.renderwidth, tilemap.renderheight);
        this.graphics.endFill();
    }
    var d = __define,c=TMXColorLayer;p=c.prototype;
    return TMXColorLayer;
})(egret.Sprite);
egret.registerClass(TMXColorLayer,"TMXColorLayer");

var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var TexturePool = (function () {
    function TexturePool() {
    }
    var d = __define,c=TexturePool;p=c.prototype;
    TexturePool.addTexture = function ($url, $texture) {
        this.texturePools[$url] = $texture;
    };
    TexturePool.removeTexture = function ($url) {
        this.texturePools[$url] = null;
    };
    TexturePool.getTexture = function ($url) {
        return this.texturePools[$url];
    };
    TexturePool.texturePools = {};
    return TexturePool;
})();
egret.registerClass(TexturePool,"TexturePool");

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var TMXImageLayer = (function (_super) {
    __extends(TMXImageLayer, _super);
    function TMXImageLayer(tilemap, data, z) {
        _super.call(this);
        this._tilemap = tilemap;
        this._name = data.attributes.name;
        this.x = +data.attributes.x;
        this.y = +data.attributes.y;
        this._z = +data.attributes.z;
        this._opacity = (typeof +data.attributes.opacity !== "undefined") ? +data.attributes.opacity : 1;
        this.visible = (typeof +data.attributes.visible !== "undefined") ? (+data.attributes.visible == 0 ? false : true) : true;
        //解析源
        var children = data.children;
        if (children) {
            for (var i = 0; i < children.length; i++) {
                var child = data.children[i];
                switch (child.localName) {
                    case TMXConstants.IMAGE:
                        this._source = child.attributes.source;
                        this._transColor = child.attributes.trans;
                        this.loadImage(this.tilemap.baseURL + this._source);
                        break;
                    case TMXConstants.PROPERTIES:
                        this._properties = this._tilemap.parseProperties(child);
                        break;
                }
            }
        }
    }
    var d = __define,c=TMXImageLayer;p=c.prototype;
    d(p, "tilemap"
        ,function () {
            return this._tilemap;
        }
    );
    d(p, "bitmap"
        ,function () {
            return this._bitmap;
        }
    );
    d(p, "z"
        ,function () {
            return this._z;
        }
    );
    d(p, "name"
        ,function () {
            return this._name;
        }
    );
    d(p, "alpha"
        ,function () {
            return this._opacity;
        }
    );
    d(p, "transColor"
        ,function () {
            return this._transColor;
        }
    );
    p.loadImage = function ($url) {
        var self = this;
        BitmapLoader.load($url, function ($url) {
            var _texture = TexturePool.getTexture($url);
            self._sourcebitmap = new egret.Bitmap(_texture);
            self.dispatchEvent(new TMXImageLoadEvent(TMXImageLoadEvent.IMAGE_COMPLETE, _texture));
        }, [$url]);
    };
    p.draw = function (rect) {
        var renderTexture = new egret.RenderTexture();
        var brect = new egret.Rectangle(this.x, this.y, this._sourcebitmap.width, this._sourcebitmap.height);
        rect = brect.intersection(rect);
        rect.right = Math.ceil(this.tilemap.width / this.tilemap.tilewidth) * this.tilemap.tilewidth;
        rect.bottom = Math.ceil(this.tilemap.height / this.tilemap.tileheight) * this.tilemap.tileheight;
        //补充可能缺失的部分像素区域
        renderTexture.drawToTexture(this._sourcebitmap, rect);
        this._bitmap = new egret.Bitmap();
        this._bitmap.texture = renderTexture;
        this._bitmap.alpha = this._opacity;
        this._bitmap.visible = this.visible;
        this.addChild(this._bitmap);
    };
    return TMXImageLayer;
})(egret.Sprite);
egret.registerClass(TMXImageLayer,"TMXImageLayer");

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
//Tile设置中的Tile TMXLayer中的Tile
var TMXTile = (function (_super) {
    __extends(TMXTile, _super);
    //x 为在场景中的水平格子坐标,y 为在场景中的垂直格子坐标
    function TMXTile(x, y, gid, tilemap, tileset) {
        _super.call(this);
        this._tileset = tileset;
        this._col = x;
        this._row = y;
        this._tilemap = tilemap;
        this._gid = gid;
        this._flippedX = (this._gid & TMXConstants.TMX_FLIP_H) !== 0;
        this._flippedY = (this._gid & TMXConstants.TMX_FLIP_V) !== 0;
        this._flippedAD = this._flippedX && this._flippedY; //(this._gid & TMXConstants.TMX_FLIP_AD) !== 0;
        this._flipped = this._flippedX || this._flippedY || this._flippedAD;
        this._gid &= TMXConstants.TMX_CLEAR_BIT_MASK;
        this._tileData = tileset.getSpecialTileDataByTileId(this._gid);
        if (this._tileData) {
            var children = this._tileData.children;
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
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
    var d = __define,c=TMXTile;p=c.prototype;
    d(p, "gid"
        ,function () {
            return this._gid;
        }
    );
    d(p, "col"
        ,function () {
            return this._col;
        }
    );
    d(p, "row"
        ,function () {
            return this._row;
        }
    );
    d(p, "tileset"
        ,function () {
            return this._tileset;
        }
    );
    d(p, "image"
        ,function () {
            return this._image;
        }
    );
    d(p, "tilemap"
        ,function () {
            return this._tilemap;
        }
    );
    d(p, "flippedX"
        ,function () {
            return this._flippedX;
        }
    );
    d(p, "flippedY"
        ,function () {
            return this._flippedY;
        }
    );
    d(p, "flippedAD"
        ,function () {
            return this._flippedAD;
        }
    );
    d(p, "flipped"
        ,function () {
            return this._flipped;
        }
    );
    d(p, "animation"
        ,function () {
            return this._animation;
        }
    );
    return TMXTile;
})(egret.Sprite);
egret.registerClass(TMXTile,"TMXTile");

var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
//包含所有的Tileset的组
var TMXTilesetGroup = (function () {
    function TMXTilesetGroup($tilemap) {
        this._tilesets = [];
        this._length = 0;
        this._imagelength = 0;
        this._tilemap = $tilemap;
    }
    var d = __define,c=TMXTilesetGroup;p=c.prototype;
    d(p, "length"
        //获取Tileset长度
        ,function () {
            return this._length;
        }
    );
    d(p, "imagelength"
        //获取所有的图片长度
        ,function () {
            return this._imagelength;
        }
    );
    d(p, "tilemap"
        ,function () {
            return this._tilemap;
        }
    );
    //添加Tileset
    p.add = function (tileset) {
        this._tilesets.push(tileset);
        this._length++;
        if (tileset.image)
            this._imagelength++;
    };
    //根据索引获取Tileset
    p.getTilesetByIndex = function (index) {
        return this._tilesets[index];
    };
    //根据gid获取Tileset
    p.getTilesetByGid = function (gid) {
        if (gid === 0)
            return null;
        var invalidRange = -1;
        gid &= TMXConstants.TMX_CLEAR_BIT_MASK;
        for (var i = 0, len = this._tilesets.length; i < len; i++) {
            var tileset = this._tilesets[i];
            if (tileset.contains(gid))
                return tileset;
            if (tileset.firstgid === tileset.lastgid && gid >= tileset.firstgid)
                invalidRange = i;
        }
        if (invalidRange !== -1)
            return this._tilesets[invalidRange];
        else
            throw new Error("no matching tileset found for gid " + gid);
    };
    return TMXTilesetGroup;
})();
egret.registerClass(TMXTilesetGroup,"TMXTilesetGroup");

var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var BitmapLoader = (function () {
    function BitmapLoader() {
    }
    var d = __define,c=BitmapLoader;p=c.prototype;
    BitmapLoader.load = function ($url, $onComplete, $onCompleteParams) {
        if ($onCompleteParams === void 0) { $onCompleteParams = null; }
        var _texture = TexturePool.getTexture($url);
        if (_texture) {
            if ($onComplete != null) {
                $onComplete.apply(null, $onCompleteParams);
            }
        }
        else {
            var data = { url: $url, onComplete: $onComplete, onCompleteParams: $onCompleteParams };
            this.startload($url, data);
        }
    };
    BitmapLoader.startload = function ($url, $data) {
        RES.getResByUrl($url, this.onRESComplete, $data);
    };
    BitmapLoader.onRESComplete = function (textureData) {
        var This = this;
        TexturePool.addTexture(This.url, textureData);
        //完成回调
        if (This.onComplete != null) {
            This.onComplete.apply(null, This.onCompleteParams);
        }
    };
    return BitmapLoader;
})();
egret.registerClass(BitmapLoader,"BitmapLoader");

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var TMXImage = (function (_super) {
    __extends(TMXImage, _super);
    function TMXImage(imgData, baseURL) {
        _super.call(this, this);
        this._width = +imgData.attributes.width;
        this._height = +imgData.attributes.height;
        this._source = imgData.attributes.source;
        this._trans = (typeof imgData.attributes.trans !== "undefined") ? +imgData.attributes.trans : 1;
        this._source = baseURL + this._source;
        this.loadImage(this._source);
    }
    var d = __define,c=TMXImage;p=c.prototype;
    d(p, "texture"
        ,function () {
            return this._texture;
        }
    );
    d(p, "source"
        ,function () {
            return this._source;
        }
    );
    d(p, "bitmap"
        ,function () {
            return this._bitmap;
        }
    );
    d(p, "width"
        ,function () {
            return this._width;
        }
    );
    d(p, "height"
        ,function () {
            return this._height;
        }
    );
    p.loadImage = function ($url) {
        var self = this;
        BitmapLoader.load($url, function ($url) {
            self._texture = TexturePool.getTexture($url);
            self._bitmap = new egret.Bitmap(self._texture);
            self.dispatchEvent(new TMXImageLoadEvent(TMXImageLoadEvent.IMAGE_COMPLETE, self._texture));
        }, [$url]);
    };
    return TMXImage;
})(egret.EventDispatcher);
egret.registerClass(TMXImage,"TMXImage");

var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var TMXProperty = (function () {
    function TMXProperty() {
        this.gid = 0;
    }
    var d = __define,c=TMXProperty;p=c.prototype;
    return TMXProperty;
})();
egret.registerClass(TMXProperty,"TMXProperty");

var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var TMXRenderer = (function () {
    function TMXRenderer(cols, rows, tilewidth, tileheight) {
        this.offsetsStaggerX = [
            { x: 0, y: 0 },
            { x: +1, y: -1 },
            { x: +1, y: 0 },
            { x: +2, y: 0 },
        ];
        this.offsetsStaggerY = [
            { x: 0, y: 0 },
            { x: -1, y: +1 },
            { x: 0, y: +1 },
            { x: 0, y: +2 },
        ];
        this._cols = cols;
        this._rows = rows;
        this._tilewidth = tilewidth;
        this._tileheight = tileheight;
        this.animationTiles = [];
    }
    var d = __define,c=TMXRenderer;p=c.prototype;
    d(p, "cols"
        ,function () {
            return this._cols;
        }
    );
    d(p, "rows"
        ,function () {
            return this._rows;
        }
    );
    d(p, "tilewidth"
        ,function () {
            return this._tilewidth;
        }
    );
    d(p, "tileheight"
        ,function () {
            return this._tileheight;
        }
    );
    p.canRender = function (layer) {
        return ((this.cols === layer.cols) && (this.rows === layer.rows) && (this.tilewidth === layer.tilewidth) && (this.tileheight === layer.tileheight));
    };
    p.drawTileLayer = function (layer, rect) {
    };
    p.drawTile = function (renderer, x, y, tmxTile) {
    };
    //渲染动画
    p.render = function (renderContainer) {
        if (!this.animationTiles)
            return;
        var currentTime = egret.getTimer();
        for (var i = 0; i < this.animationTiles.length; i++) {
            var animationInfo = this.animationTiles[i];
            var tmxTile = animationInfo.tmxTile;
            var pos = animationInfo.pos;
            var animation = tmxTile.animation;
            var frame = animation.currentAnimationFrame;
            if (currentTime - animation.oldTime > frame.duration) {
                if (animation.oldBitmap && animation.oldBitmap.parent)
                    animation.oldBitmap.parent.removeChild(animation.oldBitmap);
                this.drawTile(renderContainer, pos[0], pos[1], frame.tile);
                animation.oldBitmap = frame.tile.bitmap;
                animation.oldTime = currentTime;
                animation.render();
            }
        }
    };
    return TMXRenderer;
})();
egret.registerClass(TMXRenderer,"TMXRenderer");

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var TMXOrthogonalRenderer = (function (_super) {
    __extends(TMXOrthogonalRenderer, _super);
    function TMXOrthogonalRenderer(cols, rows, tilewidth, tileheight) {
        _super.call(this, cols, rows, tilewidth, tileheight);
    }
    var d = __define,c=TMXOrthogonalRenderer;p=c.prototype;
    p.canRender = function (layer) {
        return (layer.orientation === TMXConstants.ORIENTATION_ORTHOGONAL) && _super.prototype.canRender.call(this, layer);
    };
    //像素坐标转化为格子坐标
    p.pixelToTileCoords = function (x, y) {
        return new egret.Point(this.pixelToTileX(x), this.pixelToTileY(y));
    };
    //水平像素坐标转化为水平格子坐标
    p.pixelToTileX = function (x) {
        return Math.floor(x / this.tilewidth);
    };
    //垂直像素坐标转化为垂直格子坐标
    p.pixelToTileY = function (y) {
        return Math.floor(y / this.tileheight);
    };
    //格子坐标转化为像素坐标
    p.tileToPixelCoords = function (tileX, tileY) {
        return new egret.Point(tileX * this.tilewidth, tileY * this.tileheight);
    };
    //绘制1个Tile map
    p.drawTile = function (renderer, x, y, tmxTile) {
        var tileset = tmxTile.tileset;
        tileset.drawTile(renderer, tileset.tileoffset.x + x * this.tilewidth, tileset.tileoffset.y + (y + 1) * this.tileheight - tileset.tileheight, tmxTile);
    };
    //绘制作Tile图层
    p.drawTileLayer = function (layer, rect) {
        var staticContainer = layer.staticContainer;
        var start = this.pixelToTileCoords(Math.floor(Math.max(rect.x - (layer.maxTileSize.width - layer.tilewidth), 0)), Math.floor(Math.max(rect.y - (layer.maxTileSize.height - layer.tileheight), 0)));
        var end = this.pixelToTileCoords(Math.ceil(rect.x + rect.width + this.tilewidth), Math.ceil(rect.y + rect.height + this.tileheight));
        end.x = end.x > this.cols ? this.cols : end.x;
        end.y = end.y > this.rows ? this.rows : end.y;
        for (var y = start.y; y < end.y; y++) {
            for (var x = start.x; x < end.x; x++) {
                var tmxTile = layer.layerData[x][y];
                if (tmxTile) {
                    if (tmxTile.animation)
                        this.animationTiles.push({ "tmxTile": tmxTile, "pos": [x, y] });
                    this.drawTile(staticContainer, x, y, tmxTile);
                }
            }
        }
    };
    return TMXOrthogonalRenderer;
})(TMXRenderer);
egret.registerClass(TMXOrthogonalRenderer,"TMXOrthogonalRenderer");

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var TMXIsometricRenderer = (function (_super) {
    __extends(TMXIsometricRenderer, _super);
    function TMXIsometricRenderer(cols, rows, tilewidth, tileheight) {
        _super.call(this, cols, rows, tilewidth, tileheight);
        this._hTilewidth = this.tilewidth / 2;
        this._hTileheight = this.tileheight / 2;
        this._originX = this.rows * this._hTilewidth;
    }
    var d = __define,c=TMXIsometricRenderer;p=c.prototype;
    p.canRender = function (layer) {
        return (layer.orientation === TMXConstants.ORIENTATION_ISOMETRIC) && _super.prototype.canRender.call(this, layer);
    };
    p.pixelToTileCoords = function (x, y) {
        return new egret.Point(Math.floor(this.pixelToTileX(x, y)), Math.floor(this.pixelToTileY(y, x)));
    };
    p.pixelToTileX = function (x, y) {
        return (y / this.tileheight) + ((x - this._originX) / this.tilewidth);
    };
    p.pixelToTileY = function (y, x) {
        return (y / this.tileheight) - ((x - this._originX) / this.tilewidth);
    };
    p.tileToPixelCoords = function (x, y) {
        return new egret.Point((x - y) * this._hTilewidth + this._originX, (x + y) * this._hTileheight);
    };
    p.drawTile = function (renderer, x, y, tmxTile) {
        var tileset = tmxTile.tileset;
        tileset.drawTile(renderer, tileset.tileoffset.x + x, tileset.tileoffset.y + y - tileset.tileheight, tmxTile);
    };
    p.drawTileLayer = function (layer, rect) {
        var staticContainer = layer.staticContainer;
        var tileset = layer.tileset;
        var offset = tileset.tileoffset;
        //获得上左，右下角位置
        var rowItr = this.pixelToTileCoords(rect.x - tileset.tilewidth, rect.y - tileset.tileheight);
        rowItr = new egret.Point(Math.floor(rowItr.x), Math.floor(rowItr.y));
        var tileEnd = this.pixelToTileCoords(rect.x + rect.width + tileset.tilewidth, rect.x + rect.width + tileset.tilewidth);
        tileEnd = new egret.Point(Math.ceil(tileEnd.x), Math.ceil(tileEnd.y));
        var rectEnd = this.tileToPixelCoords(tileEnd.x, tileEnd.y);
        var startPos = this.tileToPixelCoords(rowItr.x, rowItr.y);
        startPos.x -= this._hTilewidth;
        startPos.y += this.tileheight;
        var inUpperHalf = (startPos.y - rect.y) > this._hTileheight;
        var inLeftHalf = (rect.x - startPos.x) < this._hTilewidth;
        if (inUpperHalf) {
            if (inLeftHalf) {
                rowItr.x--;
                startPos.x -= this._hTilewidth;
            }
            else {
                rowItr.y--;
                startPos.x += this._hTilewidth;
            }
            startPos.y -= this._hTileheight;
        }
        //确定当前行是否将半个瓦片移到右边
        var inUpper = (inUpperHalf) ? 1 : 0;
        var inLeft = (inLeftHalf) ? 1 : 0;
        var shifted = ((inUpper ^ inLeft) > 0) ? true : false;
        var columnItr = rowItr.clone();
        for (var y = startPos.y; y - this.tileheight < rectEnd.y; y += this._hTileheight) {
            columnItr.setTo(rowItr.x, rowItr.y);
            for (var x = startPos.x; x < rectEnd.x; x += this.tilewidth) {
                if ((columnItr.x >= 0) && (columnItr.y >= 0) && (columnItr.x < this.cols) && (columnItr.y < this.rows)) {
                    var tmxTile = layer.layerData[columnItr.x][columnItr.y];
                    if (tmxTile) {
                        tileset = tmxTile.tileset;
                        offset = tileset.tileoffset;
                        if (tmxTile) {
                            if (tmxTile.animation)
                                this.animationTiles.push({ "tmxTile": tmxTile, "pos": [offset.x + x, offset.y + y] });
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
            }
            else {
                rowItr.y++;
                startPos.x -= this._hTilewidth;
                shifted = false;
            }
        }
    };
    return TMXIsometricRenderer;
})(TMXRenderer);
egret.registerClass(TMXIsometricRenderer,"TMXIsometricRenderer");

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var TMXHexagonalRenderer = (function (_super) {
    __extends(TMXHexagonalRenderer, _super);
    function TMXHexagonalRenderer(cols, rows, tilewidth, tileheight, hexsidelength, staggeraxis, staggerindex) {
        _super.call(this, cols, rows, tilewidth, tileheight);
        this._hexsidelength = hexsidelength;
        this._staggeraxis = staggeraxis;
        this._staggerindex = staggerindex;
        this._sidelengthx = 0;
        this._sidelengthy = 0;
        if (staggeraxis === "x")
            this._sidelengthx = hexsidelength;
        else
            this._sidelengthy = hexsidelength;
        this._sideoffsetx = (this.tilewidth - this._sidelengthx) / 2;
        this._sideoffsety = (this.tileheight - this._sidelengthy) / 2;
        this._columnwidth = this._sideoffsetx + this._sidelengthx;
        this._rowheight = this._sideoffsety + this._sidelengthy;
        this._centers = [new egret.Point(), new egret.Point(), new egret.Point(), new egret.Point()];
    }
    var d = __define,c=TMXHexagonalRenderer;p=c.prototype;
    p.canRender = function (layer) {
        return (layer.orientation === TMXConstants.ORIENTATION_HEXAGONAL) && _super.prototype.canRender.call(this, layer);
    };
    //像素坐标转化为格子坐标
    p.pixelToTileCoords = function (x, y) {
        if (this._staggeraxis === "x")
            x = x - ((this._staggerindex === "old") ? this._sidelengthx : this.tilewidth);
        else
            y = y - ((this._staggerindex === "old") ? this._sideoffsety : this.tileheight);
        //Start with the coordinates of a grid-aligned tile
        var referencePoint = new egret.Point(Math.floor(x / (this.tilewidth + this._sidelengthx)), Math.floor(y / (this.tileheight + this._sidelengthy)));
        var rel = new egret.Point(x - referencePoint.x * (this.tilewidth + this._sidelengthx), y - referencePoint.y * (this.tilewidth + this._sidelengthy));
        if (this._staggeraxis === "x") {
            referencePoint.x = referencePoint.x * 2;
            if (this._staggerindex === "even") {
                ++referencePoint.x;
            }
        }
        else {
            referencePoint.y = referencePoint.y * 2;
            if (this._staggerindex === "even") {
                ++referencePoint.y;
            }
        }
        //确定最近的六角瓦片距离中心的距离
        var left, top, centerX, centerY;
        if (this._staggeraxis === "x") {
            left = this._sidelengthx / 2;
            centerX = left + this._columnwidth;
            centerY = this.tileheight / 2;
            this._centers[0].setTo(left, centerY);
            this._centers[1].setTo(centerX, centerY - this._rowheight);
            this._centers[2].setTo(centerX, centerY + this._rowheight);
            this._centers[3].setTo(centerX + this._columnwidth, centerY);
        }
        else {
            top = this._sidelengthy / 2;
            centerX = this.tilewidth / 2;
            centerY = top + this._rowheight;
            this._centers[0].setTo(centerX, top);
            this._centers[1].setTo(centerX - this._columnwidth, centerY);
            this._centers[2].setTo(centerX + this._columnwidth, centerY);
            this._centers[3].setTo(centerX, centerY + this._rowheight);
        }
        var nearest = 0;
        var minDist = Number.MAX_VALUE;
        var dc;
        for (var i = 0; i < 4; ++i) {
            dc = Math.pow(this._centers[i].x - rel.x, 2) + Math.pow(this._centers[i].y - rel.y, 2);
            if (dc < minDist) {
                minDist = dc;
                nearest = i;
            }
        }
        var offsets = (this._staggeraxis === "x") ? this.offsetsStaggerX : this.offsetsStaggerY;
        return new egret.Point(referencePoint.x + offsets[nearest].x, referencePoint.y + offsets[nearest].y);
    };
    p.pixelToTileX = function (x, y) {
        var ret = this.pixelToTileCoords(x, y);
        return ret.x;
    };
    p.pixelToTileY = function (y, x) {
        var ret = this.pixelToTileCoords(x, y);
        return ret.y;
    };
    //返回指定的瓦片对应的像素位置
    p.tileToPixelCoords = function (q, r) {
        var x, y;
        if (this._staggeraxis === "x") {
            x = q * this._columnwidth;
            if (this._staggerindex === "odd") {
                y = r * (this.tileheight + this._sidelengthy);
                y = y + (this._rowheight * (q & 1));
            }
            else {
                y = r * (this.tileheight + this._sidelengthy);
                y = y + (this._rowheight * (1 - (q & 1)));
            }
        }
        else {
            y = r * this._rowheight;
            if (this._staggerindex === "odd") {
                x = q * (this.tilewidth + this._sidelengthx);
                x = x + (this._columnwidth * (r & 1));
            }
            else {
                x = q * (this.tilewidth + this._sidelengthx);
                x = x + (this._columnwidth * (1 - (r & 1)));
            }
        }
        return new egret.Point(x, y);
    };
    p.drawTile = function (renderer, x, y, tmxTile) {
        var point = this.tileToPixelCoords(x, y);
        var tileset = tmxTile.tileset;
        tileset.drawTile(renderer, tileset.tileoffset.x + point.x, tileset.tileoffset.y + point.y + (this.tileheight - tileset.tileheight), tmxTile);
    };
    p.drawTileLayer = function (layer, rect) {
        var staticContainer = layer.staticContainer;
        var start = this.pixelToTileCoords(Math.floor(rect.x), Math.floor(rect.y));
        var end = this.pixelToTileCoords(Math.floor(rect.x + rect.width + this.tilewidth), Math.floor(rect.y + rect.height + this.tileheight));
        start.x = start.x < 0 ? 0 : start.x;
        start.y = start.y < 0 ? 0 : start.y;
        end.x = end.x > this.cols ? this.cols : end.x;
        end.y = end.y > this.rows ? this.rows : end.y;
        for (var y = start.y; y < end.y; y++) {
            for (var x = start.x; x < end.x; x++) {
                var tmxTile = layer.layerData[x][y];
                if (tmxTile) {
                    if (tmxTile.animation)
                        this.animationTiles.push({ "tmxTile": tmxTile, "pos": [x, y] });
                    this.drawTile(staticContainer, x, y, tmxTile);
                }
            }
        }
    };
    return TMXHexagonalRenderer;
})(TMXRenderer);
egret.registerClass(TMXHexagonalRenderer,"TMXHexagonalRenderer");

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var TMXTilemap = (function (_super) {
    __extends(TMXTilemap, _super);
    function TMXTilemap(renderwidth, renderheight, data, url) {
        _super.call(this);
        this._tmxRenderer = null;
        this._data = data;
        this._renderWidth = renderwidth;
        this._renderHeight = renderheight;
        this._cols = +data.attributes.width;
        this._rows = +data.attributes.height;
        this._tilewidth = +data.attributes.tilewidth;
        this._tileheight = +data.attributes.tileheight;
        this._nextobjectid = +data.attributes.nextobjectid;
        this._version = +data.attributes.version;
        this._orientation = data.attributes.orientation;
        this._renderorder = data.attributes.renderorder;
        this._baseURL = url;
        this._baseURL = decodeURIComponent(this._baseURL);
        var lastIndex = this._baseURL.lastIndexOf("/");
        this._baseURL = this._baseURL.slice(0, lastIndex + 1);
        if (this._orientation === TMXConstants.ORIENTATION_ISOMETRIC) {
            this.width = (this._cols + this._rows) * (this._tilewidth / 2);
            this.height = (this._cols + this._rows) * (this._tileheight / 2);
        }
        else {
            this.width = this._cols * this._tilewidth;
            this.height = this._rows * this._tileheight;
        }
        this._hexsidelength = +data.attributes.hexsidelength;
        this._staggeraxis = data.attributes.staggeraxis || undefined;
        this._staggerindex = data.attributes.staggerindex || undefined;
        this._backgroundcolor = data.attributes.backgroundcolor;
        this._z = 0;
        this._layers = [];
        this._objectGroups = [];
        //初始化默认的渲染
        if (this._tmxRenderer === null || !this._tmxRenderer.canRender(this)) {
            this._tmxRenderer = this.getNewDefaultRenderer(this);
        }
        this._initialized = false;
    }
    var d = __define,c=TMXTilemap;p=c.prototype;
    d(p, "nextobjectid"
        ,function () {
            return this._nextobjectid;
        }
    );
    d(p, "tilewidth"
        ,function () {
            return this._tilewidth;
        }
    );
    d(p, "tileheight"
        ,function () {
            return this._tileheight;
        }
    );
    d(p, "baseURL"
        ,function () {
            return this._baseURL;
        }
    );
    d(p, "renderwidth"
        ,function () {
            return this._renderWidth;
        }
    );
    d(p, "renderheight"
        ,function () {
            return this._renderHeight;
        }
    );
    //解析属性
    p.parseProperties = function (data) {
        var properties;
        var children = data.children;
        if (children) {
            properties = [];
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                var tmxProperty = new TMXProperty();
                tmxProperty.name = child.attributes.name;
                tmxProperty.value = child.attributes.value;
                properties[i] = tmxProperty;
            }
        }
        return properties;
    };
    //渲染
    p.render = function () {
        //add all layers instances
        var layers = this.getLayers();
        for (var i = 0; i < layers.length; i++) {
            this.addChild(layers[i]);
        }
        //add all Object instances
        var objects = this.getObjects();
        for (var i = 0; i < objects.length; i++) {
            this.addChild(objects[i]);
        }
        this.addEventListener(egret.Event.ENTER_FRAME, this.onStartRendering, this);
    };
    //获取所有的图层
    p.getLayers = function () {
        this.readMapObjects(this._data);
        return this._layers;
    };
    p.getObjects = function () {
        this.readMapObjects(this._data);
        return this._objectGroups;
    };
    p.showHideBackground = function (isShow) {
        for (var i = 0; i < this._layers.length; i++) {
            var layer = this._layers[i];
            if (layer instanceof TMXColorLayer) {
                layer.visible = isShow;
                return;
            }
        }
    };
    p.destory = function () {
        this._tilesets = undefined;
        this._layers = [];
        this._objectGroups = [];
        this._initialized = false;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onStartRendering, this);
    };
    //读取地图上的对象
    p.readMapObjects = function (data) {
        if (this._initialized === true)
            return;
        //自动排序
        var zOrder = this._z;
        var self = this;
        if (!this._tilesets)
            this._tilesets = new TMXTilesetGroup(this);
        if (this._backgroundcolor)
            this._layers.push(new TMXColorLayer(this, this._backgroundcolor, zOrder++));
        var children = this._data.children;
        if (children) {
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                switch (child.localName) {
                    case TMXConstants.TILE_SET:
                        this._tilesets.add(new TMXTileset(this, child));
                        break;
                    case TMXConstants.LAYER:
                        this._layers.push(this.parseLayer(child, zOrder++));
                        break;
                    case TMXConstants.OBJECT_GROUP:
                        this._objectGroups.push(this.parseObjectGroup(child, zOrder++));
                        break;
                    case TMXConstants.PROPERTIES:
                        this._properties = this.parseProperties(child);
                        break;
                    case TMXConstants.IMAGE_LAYER:
                        this._layers.push(this.parseImageLayer(child, zOrder++));
                        break;
                }
            }
        }
        var loadCount = 0;
        for (var i = 0; i < this._tilesets.length; i++) {
            var tileset = this._tilesets.getTilesetByIndex(i);
            if (tileset.image) {
                var onImageLoad = function (event) {
                    loadCount++;
                    if (loadCount == this._tilesets.imagelength) {
                        self.dispatchEvent(new TMXImageLoadEvent(TMXImageLoadEvent.ALL_IMAGE_COMPLETE));
                    }
                };
                tileset.image.addEventListener(TMXImageLoadEvent.IMAGE_COMPLETE, onImageLoad, this);
            }
        }
        this._initialized = true;
    };
    p.onStartRendering = function (event) {
        var layers = this.getLayers();
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            if (layer instanceof TMXLayer)
                layer.render();
        }
        var objects = this.getObjects();
        for (var i = 0; i < objects.length; i++) {
            var object = objects[i];
        }
    };
    //建立一个兼容的渲染对象
    p.getNewDefaultRenderer = function (obj) {
        switch (obj._orientation) {
            case "orthogonal":
                return new TMXOrthogonalRenderer(obj._cols, obj._rows, obj._tilewidth, obj._tileheight);
                break;
            case "isometric":
                return new TMXIsometricRenderer(obj._cols, obj._rows, obj._tilewidth, obj._tileheight);
                break;
            case "hexagonal":
                return new TMXHexagonalRenderer(obj._cols, obj._rows, obj._tilewidth, obj._tileheight, obj._hexsidelength, obj._staggeraxis, obj._staggerindex);
                break;
            default:
                throw new Error(obj._orientation + " type TMX Tile Map not supported!");
        }
    };
    //读取图层数据
    p.parseLayer = function (data, z) {
        var layer = new TMXLayer(this, this._tilewidth, this._tileheight, this._orientation, this._tilesets, z, data);
        //渲染图层
        if (this._tmxRenderer.canRender(layer))
            layer.setRenderer(this.getNewDefaultRenderer(this));
        else
            layer.setRenderer(this._tmxRenderer);
        var self = this;
        var onAllImageLoad = function (event) {
            this.draw(new egret.Rectangle(0, 0, self._renderWidth, self._renderHeight));
        };
        this.addEventListener(TMXImageLoadEvent.ALL_IMAGE_COMPLETE, onAllImageLoad, layer);
        return layer;
    };
    //解析对象组数据
    p.parseObjectGroup = function (data, z) {
        var objectGroup = new TMXObjectGroup(data, this._orientation, this._tilesets, z);
        var self = this;
        var onAllImageLoad = function (event) {
            this.draw(new egret.Rectangle(0, 0, self._renderWidth, self._renderHeight));
        };
        this.addEventListener(TMXImageLoadEvent.ALL_IMAGE_COMPLETE, onAllImageLoad, objectGroup);
        return objectGroup;
    };
    //解析Tileset
    p.parseTileset = function (data) {
        return new TMXTileset(data, this);
    };
    //解析imagelayer(此类型的图层不参与渲染方向更新)
    p.parseImageLayer = function (data, z) {
        var self = this;
        var imageLayer = new TMXImageLayer(this, data, z);
        var onImageLoad = function (event) {
            this.draw(new egret.Rectangle(0, 0, self._renderWidth, self._renderHeight));
        };
        imageLayer.addEventListener(TMXImageLoadEvent.IMAGE_COMPLETE, onImageLoad, imageLayer);
        return imageLayer;
    };
    return TMXTilemap;
})(egret.Sprite);
egret.registerClass(TMXTilemap,"TMXTilemap");

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var Ellipse = (function (_super) {
    __extends(Ellipse, _super);
    function Ellipse(x, y, w, h) {
        _super.call(this);
        this._x = x;
        this._y = y;
        this.width = w;
        this.height = h;
    }
    var d = __define,c=Ellipse;p=c.prototype;
    p.draw = function ($color) {
        this.graphics.clear();
        this.graphics.lineStyle(2, $color);
        this.graphics.beginFill($color, 0.2);
        this.graphics.drawEllipse(this._x, this._y, this.width, this.height);
        this.graphics.endFill();
    };
    return Ellipse;
})(egret.Sprite);
egret.registerClass(Ellipse,"Ellipse");

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var Polygon = (function (_super) {
    __extends(Polygon, _super);
    function Polygon(x, y, points) {
        _super.call(this);
        this._x = x;
        this._y = y;
        this._points = points;
    }
    var d = __define,c=Polygon;p=c.prototype;
    p.draw = function ($color) {
        this.graphics.clear();
        this.graphics.lineStyle(2, $color);
        this.graphics.beginFill($color, 0.2);
        if (this._points) {
            for (var i = 0; i < this._points.length; i++) {
                var _data = this._points[i];
                if (i == 0)
                    this.graphics.moveTo(_data[0], _data[1]);
                else
                    this.graphics.lineTo(_data[0], _data[1]);
            }
        }
        this.graphics.endFill();
    };
    return Polygon;
})(egret.Sprite);
egret.registerClass(Polygon,"Polygon");

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var PolyLine = (function (_super) {
    __extends(PolyLine, _super);
    function PolyLine(x, y, points) {
        _super.call(this);
        this._x = x;
        this._y = y;
        this._points = points;
    }
    var d = __define,c=PolyLine;p=c.prototype;
    p.draw = function ($color) {
        this.graphics.clear();
        this.graphics.lineStyle(2, $color);
        this.graphics.beginFill($color, 0.2);
        if (this._points) {
            for (var i = 0; i < this._points.length; i++) {
                var _data = this._points[i];
                if (i == 0)
                    this.graphics.moveTo(_data[0], _data[1]);
                else
                    this.graphics.lineTo(_data[0], _data[1]);
            }
        }
        this.graphics.endFill();
    };
    return PolyLine;
})(egret.Sprite);
egret.registerClass(PolyLine,"PolyLine");

var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var TMXTileset = (function () {
    function TMXTileset(tilemap, tilesetData) {
        //获取文件扩展名
        this.getFileExtension = function (path) {
            return path.substring(path.lastIndexOf(".") + 1, path.length);
        };
        this._tileDatas = [];
        TMXTileset._cacheRenderTextures = {};
        this._firstgid = +tilesetData.attributes.firstgid;
        this._lastgid = this._firstgid;
        this._tilemap = tilemap;
        //tileset也可能是外部加载的
        var src = tilesetData.attributes.source;
        if (src && this.getFileExtension(src) === "tsx") {
            throw new Error("tmx not support tsx file load!!!");
        }
        this._transformMatrix = new egret.Matrix();
        this._name = tilesetData.attributes.name;
        this._tilewidth = +tilesetData.attributes.tilewidth;
        this._tileheight = +tilesetData.attributes.tileheight;
        this._spacing = +tilesetData.attributes.spacing || 0;
        this._margin = +tilesetData.attributes.margin || 0;
        //每个Tileset有个偏移值，这个偏移值是指绘制在场景中的对象的偏移值
        this._tileoffset = new egret.Point();
        this._hTileCount = 0;
        this._vTileCount = 0;
        var childrens = tilesetData.children;
        if (childrens) {
            for (var i = 0; i < childrens.length; i++) {
                var child = childrens[i];
                switch (child.localName) {
                    case TMXConstants.IMAGE:
                        this._image = new TMXImage(child, this.tilemap.baseURL);
                        this._imagesource = this._image.source;
                        break;
                    case TMXConstants.TILE_OFFSET:
                        this._tileoffset = new egret.Point(+child.attributes.x, +child.attributes.y);
                        break;
                    case TMXConstants.TILE:
                        var gid = +child.attributes.id + this._firstgid;
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
            this._hTileCount = ~~(this._image.width / (this._tilewidth + this._spacing));
            this._vTileCount = ~~(this._image.height / (this._tileheight + this._margin));
            this._lastgid = this._firstgid + (((this._hTileCount * this._vTileCount) - 1) || 0);
        }
    }
    var d = __define,c=TMXTileset;p=c.prototype;
    d(p, "name"
        ,function () {
            return this._name;
        }
    );
    d(p, "firstgid"
        ,function () {
            return this._firstgid;
        }
    );
    d(p, "lastgid"
        ,function () {
            return this._lastgid;
        }
    );
    d(p, "tilewidth"
        ,function () {
            return this._tilewidth;
        }
    );
    d(p, "tileheight"
        ,function () {
            return this._tileheight;
        }
    );
    d(p, "spacing"
        //获取tileset分隔的间距
        ,function () {
            return this._spacing;
        }
    );
    d(p, "margin"
        //获取tileset分隔的边距
        ,function () {
            return this._margin;
        }
    );
    d(p, "tileoffset"
        ,function () {
            return this._tileoffset;
        }
    );
    d(p, "horizontalTileCount"
        ,function () {
            return this._hTileCount;
        }
    );
    d(p, "verticalTileCount"
        ,function () {
            return this._vTileCount;
        }
    );
    d(p, "tilemap"
        ,function () {
            return this._tilemap;
        }
    );
    d(p, "properties"
        ,function () {
            return this._properties;
        }
    );
    d(p, "image"
        ,function () {
            return this._image;
        }
    );
    //获取特殊的格子数据
    p.getSpecialTileDataByTileId = function (gid) {
        return this._tileDatas[gid];
    };
    p.getTileProperties = function (tileId) {
        return this._properties[tileId];
    };
    p.contains = function (gid) {
        return gid >= this._firstgid && gid <= this._lastgid;
    };
    p.drawTile = function (renderer, dx, dy, tmxTile) {
        //用gid+col+row作key来降低draw的次数
        var renderTexture;
        var id = tmxTile.gid - this.firstgid;
        var key = this.firstgid + "_" + id;
        if (key) {
            if (TMXTileset._cacheRenderTextures[key] == null) {
                if (this.image) {
                    renderTexture = new egret.RenderTexture();
                    renderTexture.drawToTexture(this.image.bitmap, new egret.Rectangle((id % this.horizontalTileCount) * (this.tilewidth + this._spacing) + this._spacing, (Math.floor(id / this.horizontalTileCount)) * (this.tileheight + this._margin) + this._margin, this.tilewidth, this.tileheight));
                    TMXTileset._cacheRenderTextures[key] = renderTexture;
                }
            }
            else {
                renderTexture = TMXTileset._cacheRenderTextures[key];
            }
            if (renderTexture) {
                var isImage = false;
                var isObject = false;
                if (renderer instanceof TMXObject) {
                    isObject = true;
                    isImage = renderer.isImage;
                }
                this._transformMatrix.identity();
                var _scalex = isObject ? renderer.width / renderTexture.textureWidth : 1;
                var _scaley = isObject ? renderer.height / renderTexture.textureHeight : 1;
                if (tmxTile.flippedAD) {
                    this._transformMatrix.scale(-1 * _scalex, -1 * _scaley);
                    this._transformMatrix.translate(dx + renderer.width * _scalex, dy + renderer.height * _scaley);
                }
                else if (tmxTile.flippedY) {
                    this._transformMatrix.scale(1 * _scalex, -1 * _scaley);
                    this._transformMatrix.translate(dx, dy + renderer.height * _scaley);
                }
                else if (tmxTile.flippedX) {
                    this._transformMatrix.scale(-1 * _scalex, 1 * _scaley);
                    this._transformMatrix.translate(dx + renderer.width * _scalex, dy);
                }
                else {
                    this._transformMatrix.scale(_scalex, _scaley);
                    this._transformMatrix.translate(dx, dy + (isObject ? (renderTexture.textureHeight - renderer.height) : 0));
                }
                if (tmxTile.bitmap == null)
                    tmxTile.bitmap = new egret.Bitmap();
                tmxTile.bitmap.texture = renderTexture;
                tmxTile.bitmap.matrix = this._transformMatrix;
                renderer.addChild(tmxTile.bitmap);
            }
        }
    };
    return TMXTileset;
})();
egret.registerClass(TMXTileset,"TMXTileset");

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var TMXLayer = (function (_super) {
    __extends(TMXLayer, _super);
    //每1个图层的信息，包括：水平格子数，垂直格子数，渲染方向，tilesets组，层深
    function TMXLayer(tilemap, tilewidth, tileheight, orientation, tilesets, z, data) {
        _super.call(this);
        this._staticContainer = new egret.Sprite();
        this._staticContainer.cacheAsBitmap = true;
        this.addChild(this._staticContainer);
        this._animationContainer = new egret.Sprite();
        this.addChild(this._animationContainer);
        this._tilemap = tilemap;
        this._tilewidth = tilewidth;
        this._tileheight = tileheight;
        this._orientation = orientation;
        this._tilesets = tilesets;
        this.tileset = this._tilesets ? this._tilesets.getTilesetByIndex(0) : null;
        this.maxTileSize = { "width": 0, "height": 0 };
        for (var i = 0; i < this._tilesets.length; i++) {
            var tileset = this._tilesets.getTilesetByIndex(i);
            this.maxTileSize.width = Math.max(this.maxTileSize.width, tileset.tilewidth);
            this.maxTileSize.height = Math.max(this.maxTileSize.height, tileset.tileheight);
        }
        this._name = data.attributes.name;
        this._cols = +data.attributes.width;
        this._rows = +data.attributes.height;
        this._opacity = (typeof data.attributes.opacity !== "undefined") ? parseFloat(data.attributes.opacity) : 1;
        this.visible = (typeof data.attributes.visible !== "undefined") ? data.attributes.visible : true;
        this._hexsidelength = +data.attributes.hexsidelength;
        this._staggeraxis = data.attributes.staggeraxis;
        this._staggerindex = +data.attributes.staggerindex;
        // layer "real" size
        if (this._orientation === "isometric") {
            this.width = (this._cols + this._rows) * (this._tilewidth / 2);
            this.height = (this._cols + this._rows) * (this._tileheight / 2);
        }
        else {
            this.width = this._cols * this._tilewidth;
            this.height = this._rows * this._tileheight;
        }
        this.initArray(this._cols, this._rows);
        //解析子属性
        var children = data.children;
        if (children) {
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
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
    var d = __define,c=TMXLayer;p=c.prototype;
    d(p, "name"
        ,function () {
            return this._name;
        }
    );
    d(p, "staticContainer"
        ,function () {
            return this._staticContainer;
        }
    );
    d(p, "animationContainer"
        ,function () {
            return this._animationContainer;
        }
    );
    d(p, "tilewidth"
        ,function () {
            return this._tilewidth;
        }
    );
    d(p, "tileheight"
        ,function () {
            return this._tileheight;
        }
    );
    d(p, "orientation"
        ,function () {
            return this._orientation;
        }
    );
    d(p, "cols"
        ,function () {
            return this._cols;
        }
    );
    d(p, "rows"
        ,function () {
            return this._rows;
        }
    );
    d(p, "hexsidelength"
        ,function () {
            return this._hexsidelength;
        }
    );
    d(p, "staggeraxis"
        ,function () {
            return this._staggeraxis;
        }
    );
    d(p, "staggerindex"
        ,function () {
            return this.staggerindex;
        }
    );
    d(p, "opacity"
        ,function () {
            return this._opacity;
        }
    );
    d(p, "properties"
        ,function () {
            return this._properties;
        }
    );
    d(p, "tilemap"
        ,function () {
            return this._tilemap;
        }
    );
    p.setRenderer = function (renderer) {
        this.renderer = renderer;
    };
    p.getTileId = function (x, y) {
        var tile = this.getTile(x, y);
        return tile ? tile.gid : 0;
    };
    p.getTile = function (x, y) {
        if (this.renderer instanceof TMXOrthogonalRenderer) {
            return this.layerData[~~this.renderer.pixelToTileX(x)][~~this.renderer.pixelToTileY(y)];
        }
        else if (this.renderer instanceof TMXIsometricRenderer) {
            return this.layerData[~~this.renderer.pixelToTileX(x, y)][~~this.renderer.pixelToTileY(y, x)];
        }
        return this.layerData[~~this.renderer.pixelToTileX(x, y)][~~this.renderer.pixelToTileY(y, x)];
    };
    //TMXTileMap#setLayerData调用
    p.setTile = function (x, y, tileId) {
        if (!this.tileset.contains(tileId))
            this.tileset = this._tilesets.getTilesetByGid(tileId);
        if (this.tileset) {
            var tile = this.layerData[x][y] = new TMXTile(x, y, tileId, this.tilemap, this.tileset);
            return tile;
        }
        return null;
    };
    p.clearTile = function (x, y) {
        this.layerData[x][y] = null;
    };
    p.draw = function (rect) {
        this.renderer.drawTileLayer(this, rect);
    };
    p.render = function () {
        this.renderer.render(this._animationContainer);
    };
    p.initArray = function (cols, rows) {
        this.layerData = [];
        for (var x = 0; x < cols; x++) {
            this.layerData[x] = [];
            for (var y = 0; y < rows; y++) {
                this.layerData[x][y] = null;
            }
        }
    };
    p.setLayerData = function (data) {
        if (data) {
            var idx = 0;
            for (var y = 0; y < this.rows; y++) {
                for (var x = 0; x < this.cols; x++) {
                    var gid = data[idx];
                    if (gid !== 0) {
                        this.setTile(x, y, gid);
                    }
                    idx++;
                }
            }
        }
    };
    return TMXLayer;
})(egret.Sprite);
egret.registerClass(TMXLayer,"TMXLayer");

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
//可能存在普通对象，也可能存在动画
var TMXObject = (function (_super) {
    __extends(TMXObject, _super);
    function TMXObject(tmxObj, orientation, tilesets, z, color) {
        _super.call(this);
        this._points = undefined;
        this._name = tmxObj.attributes.name;
        this.x = +tmxObj.attributes.$x;
        this.y = +tmxObj.attributes.y;
        this._z = +z;
        this.width = +tmxObj.attributes.width || 0;
        this.height = +tmxObj.attributes.height || 0;
        this._gid = +tmxObj.attributes.gid || null;
        this._type = tmxObj.attributes.type;
        this.rotation = +tmxObj.attributes.rotation || 0;
        this._id = +tmxObj.attributes.id || undefined;
        this._orientation = orientation;
        this._shapes = undefined;
        this._color = color;
        this._isEllipse = false;
        this._isPolygon = false;
        this._isPolyLine = false;
        // 检测当前对象是否已经分配了gid(只有图块对象层才会分配gid)
        if (typeof this._gid === "number") {
            this._isImage = true;
            this.setTile(tilesets);
        }
        else {
            this._points = [];
            var self = this;
            var children = tmxObj.children;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    switch (child.localName) {
                        case TMXConstants.ELLIPSE:
                            this._isEllipse = true;
                            this._isImage = false;
                            this._ellipse = this.parseEllipse(child);
                            break;
                        case TMXConstants.POLYGON:
                            this._isPolygon = true;
                            this._isImage = false;
                            this._points = this.parsePolygonOrPolyline(child.attributes.points);
                            break;
                        case TMXConstants.POLYLINE:
                            this._isPolyLine = true;
                            this._isImage = false;
                            this._points = this.parsePolygonOrPolyline(child.attributes.points);
                            break;
                        case TMXConstants.PROPERTIES:
                            if (tilesets.tilemap)
                                this._properties = tilesets.tilemap.parseProperties(child);
                            break;
                    }
                }
            }
        }
        //parseShapes
        if (!this._shapes)
            this._shapes = this.parseTMXShapes();
        for (var i = 0; i < this._shapes.length; i++) {
            var _shape = this._shapes[i];
            this.addChild(_shape);
        }
    }
    var d = __define,c=TMXObject;p=c.prototype;
    d(p, "gid"
        ,function () {
            return this._gid;
        }
    );
    d(p, "name"
        ,function () {
            return this._name;
        }
    );
    d(p, "type"
        ,function () {
            return this._type;
        }
    );
    d(p, "z"
        ,function () {
            return this._z;
        }
    );
    d(p, "isEllipse"
        ,function () {
            return this._isEllipse;
        }
    );
    d(p, "isPolygon"
        ,function () {
            return this._isPolygon;
        }
    );
    d(p, "isPolyLine"
        ,function () {
            return this._isPolyLine;
        }
    );
    d(p, "isImage"
        ,function () {
            return this._isImage;
        }
    );
    p.getObjectPropertyByName = function (name) {
        return this[name];
    };
    p.parsePolygonOrPolyline = function ($points) {
        var datas = [];
        var points = $points.split(" ");
        if (points) {
            for (var i = 0; i < points.length; i++) {
                var pdata = points[i].split(",");
                datas[i] = [+pdata[0], +pdata[1]];
            }
        }
        return datas;
    };
    p.parseEllipse = function ($data) {
        var _width = +$data.attributes.width || 32;
        var _height = +$data.attributes.height || 32;
        return [_width, _height];
    };
    p.parseTMXShapes = function () {
        var shapes = [];
        if (this._isEllipse) {
            var _ellipse = new Ellipse(0, 0, this.width, this.height);
            _ellipse.draw(this._color);
            shapes.push(_ellipse);
        }
        else if (this._isPolygon) {
            var _polygon = new Polygon(0, 0, this._points);
            _polygon.draw(this._color);
            shapes.push(_polygon);
        }
        else if (this._isPolyLine) {
            var _polyline = new PolyLine(0, 0, this._points);
            _polyline.draw(this._color);
            shapes.push(_polyline);
        }
        else {
            if (!this._gid) {
                var _polygon = new Polygon(0, 0, [[0, 0], [this.width, 0], [this.width, this.height], [0, this.height]]);
                _polygon.draw(this._color);
                shapes.push(_polygon);
            }
        }
        if (this._orientation === "isometric") {
            for (var i = 0; i < shapes.length; i++) {
                var shape = shapes[i];
                shape.rotation = 45;
                shape.scaleX = Math.SQRT1_2;
                shape.scaleY = Math.SQRT1_2;
            }
        }
        return shapes;
    };
    p.setTile = function (tilesets) {
        var tileset = tilesets.getTilesetByGid(this._gid);
        if (tileset) {
            var image = tileset.image;
            if (image) {
                var onImageLoad = function (event) {
                };
                image.addEventListener(TMXImageLoadEvent.IMAGE_COMPLETE, onImageLoad, this);
            }
            this._tile = new TMXTile(0, 0, this.gid, tileset.tilemap, tileset);
            tileset.drawTile(this, tileset.tileoffset.x, tileset.tileoffset.y - tileset.tileheight, this._tile);
        }
    };
    return TMXObject;
})(egret.Sprite);
egret.registerClass(TMXObject,"TMXObject");

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var TMXObjectGroup = (function (_super) {
    __extends(TMXObjectGroup, _super);
    function TMXObjectGroup(tmxObjGroupData, orientation, tilesets, z) {
        _super.call(this);
        this._name = tmxObjGroupData.attributes.name;
        this._opacity = (typeof tmxObjGroupData.attributes.opacity !== "undefined") ? +tmxObjGroupData.attributes.opacity : 1;
        this._draworder = tmxObjGroupData.attributes.draworder;
        this._color = tmxObjGroupData.attributes.color ? (TMXUtils.color16ToUnit(tmxObjGroupData.attributes.color)) : TMXConstants.DEFAULT_COLOR;
        this._orientaion = orientation;
        this._tilesets = tilesets;
        this._z = z;
        this._objects = [];
        this._childrens = tmxObjGroupData.children;
    }
    var d = __define,c=TMXObjectGroup;p=c.prototype;
    d(p, "name"
        ,function () {
            return this._name;
        }
    );
    p.draw = function () {
        if (this._childrens) {
            for (var i = 0; i < this._childrens.length; i++) {
                var object = new TMXObject(this._childrens[i], this._orientaion, this._tilesets, this._z, this._color);
                object.alpha = this._opacity;
                object.visible = this.visible;
                this._objects[i] = object;
                this.addChild(object);
            }
        }
    };
    p.render = function () {
    };
    p.destory = function () {
        this._objects = null;
    };
    p.getObjectCount = function () {
        return this._objects.length;
    };
    p.getObjectByIndex = function (index) {
        return this._objects[index];
    };
    return TMXObjectGroup;
})(egret.Sprite);
egret.registerClass(TMXObjectGroup,"TMXObjectGroup");

var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var Base64 = (function () {
    function Base64() {
    }
    var d = __define,c=Base64;p=c.prototype;
    d(Base64, "nativeBase64"
        ,function () {
            return (typeof (window.atob) === "function");
        }
    );
    Base64.decode = function (input) {
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        if (this.nativeBase64) {
            return window.atob(input);
        }
        else {
            var output = [], chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
            while (i < input.length) {
                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output.push(String.fromCharCode(chr1));
                if (enc3 !== 64) {
                    output.push(String.fromCharCode(chr2));
                }
                if (enc4 !== 64) {
                    output.push(String.fromCharCode(chr3));
                }
            }
            output = output.join("");
            return output;
        }
    };
    Base64.encode = function (input) {
        input = input.replace(/\r\n/g, "\n");
        if (this.nativeBase64) {
            window.btoa(input);
        }
        else {
            var output = [], chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                }
                else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output.push(this._keyStr.charAt(enc1));
                output.push(this._keyStr.charAt(enc2));
                output.push(this._keyStr.charAt(enc3));
                output.push(this._keyStr.charAt(enc4));
            }
            output = output.join("");
            return output;
        }
    };
    Base64.decodeBase64AsArray = function (input, bytes) {
        bytes = bytes || 1;
        var dec = Base64.decode(input), i, j, len;
        var ar = new Uint32Array(dec.length / bytes);
        for (i = 0, len = dec.length / bytes; i < len; i++) {
            ar[i] = 0;
            for (j = bytes - 1; j >= 0; --j) {
                ar[i] += dec.charCodeAt((i * bytes) + j) << (j << 3);
            }
        }
        return ar;
    };
    Base64.decompress = function (data, decoded, compression) {
        throw new Error("GZIP/ZLIB compressed TMX Tile Map not supported!");
    };
    Base64.decodeCSV = function (input) {
        var entries = input.replace("\n", "").trim().split(",");
        var result = [];
        for (var i = 0; i < entries.length; i++) {
            result.push(+entries[i]);
        }
        return result;
    };
    Base64._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    return Base64;
})();
egret.registerClass(Base64,"Base64");

var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var TMXUtils = (function () {
    function TMXUtils() {
    }
    var d = __define,c=TMXUtils;p=c.prototype;
    TMXUtils.create = function ($renderwidth, $renderheight, $url, $parentContainer, $onComplete) {
        if ($onComplete === void 0) { $onComplete = null; }
        var urlLoader = new egret.URLLoader();
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        urlLoader.addEventListener(egret.Event.COMPLETE, function (event) {
            try {
                var data = egret.XML.parse(event.target.data);
            }
            catch (e) {
                throw new Error("tmx文件格式不正确！");
            }
            var tmxTileMap = new TMXTilemap($renderwidth, $renderheight, data, $url);
            tmxTileMap.render();
            $parentContainer.addChild(tmxTileMap);
            if ($onComplete != null)
                $onComplete();
        }, this);
        urlLoader.load(new egret.URLRequest($url));
        urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
            throw new Error("TMXTiledMap加载错误！！");
        }, this);
    };
    TMXUtils.decode = function (data, encoding, compression) {
        compression = compression || "none";
        encoding = encoding || "none";
        var text = data.children[0].text;
        switch (encoding) {
            case "base64":
                var decoded = Base64.decodeBase64AsArray(text, 4);
                return (compression === "none") ? decoded : Base64.decompress(text, decoded, compression);
                break;
            case "csv":
                return Base64.decodeCSV(text);
                break;
            case "none":
                var datas = [];
                for (var i = 0; i < data.children.length; i++) {
                    datas[i] = +data.children[i].attributes.gid;
                }
                return datas;
                break;
            default:
                throw new Error("未定义的编码:" + encoding);
                break;
        }
    };
    TMXUtils.color16ToUnit = function ($color) {
        var colorStr = "0x" + $color.slice(1);
        return parseInt(colorStr, 16);
    };
    return TMXUtils;
})();
egret.registerClass(TMXUtils,"TMXUtils");

