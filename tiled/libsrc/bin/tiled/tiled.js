var tiled;
(function (tiled) {
    var TMXAnimation = (function () {
        /**
         * 创建1个新的tile动画实例
         * @param tilemap TMXTilemap实例引用
         * @param tileset TMXTileset实例引用
         * @param tileX 水平格子坐标
         * @param tileY 垂直格子坐标
         * @param data 动画数据
         * @version egret 3.0.3
         */
        function TMXAnimation(tilemap, tileset, tileX, tileY, data) {
            this.tileX = tileX;
            this.tileY = tileY;
            this._currentFrame = 0;
            if (data) {
                this._tilemap = tilemap;
                this._tileset = tileset;
                this._data = data;
                this._animations = [];
                this._currentFrame = 0;
                var children = data.children;
                if (children) {
                    for (var i = 0; i < children.length; i++) {
                        var child = children[i];
                        var frame = new tiled.TMXAnimationFrame(tilemap, tileset, tileX, tileY, child);
                        this._animations[i] = frame;
                    }
                }
            }
        }
        var d = __define,c=TMXAnimation,p=c.prototype;
        /**
         * 渲染
         * @version egret 3.0.3
         */
        p.render = function () {
            this._currentFrame++;
            this._currentFrame = this._currentFrame % this._animations.length;
        };
        d(p, "currentAnimationFrame"
            /**
             * 获取当前运行时动画帧<code>tiled.TMXAnimationFrame</code>实例
             * @version egret 3.0.3
             */
            ,function () {
                return this._animations[this._currentFrame];
            }
        );
        d(p, "animations"
            /**
             * 获取动画帧列表
             * @version egret 3.0.3
             */
            ,function () {
                return this._animations;
            }
        );
        return TMXAnimation;
    })();
    tiled.TMXAnimation = TMXAnimation;
    egret.registerClass(TMXAnimation,'tiled.TMXAnimation');
})(tiled || (tiled = {}));

var tiled;
(function (tiled) {
    var TMXAnimationFrame = (function () {
        /**
         * 创建1个动画帧数据解析类
         * @param tilemap 获取Tiledmap实例
         * @param tileset
         * @param tileX
         * @param tileY
         * @param data
         *
         * @version egret 3.0.3
         */
        function TMXAnimationFrame(tilemap, tileset, col, row, data) {
            this._tiledid = +data.attributes.tileid;
            this._duration = +data.attributes.duration;
            this._tile = new tiled.TMXTile(col, row, this._tiledid + tileset.firstgid, tilemap, tileset);
        }
        var d = __define,c=TMXAnimationFrame,p=c.prototype;
        d(p, "tile"
            /**
             * 获取当前画帧所使用的<code>TMXTile实例</code>
             * @version egret 3.0.3
             */
            ,function () {
                return this._tile;
            }
        );
        d(p, "tiledId"
            /**
             * 获取当前帧所使用的tileset中的id号
             * @version egret 3.0.3
             */
            ,function () {
                return this._tiledid;
            }
        );
        d(p, "duration"
            /**
             * 获取每帧持续时间(单位：毫秒)
             * @version egret 3.0.3
             */
            ,function () {
                return this._duration;
            }
        );
        return TMXAnimationFrame;
    })();
    tiled.TMXAnimationFrame = TMXAnimationFrame;
    egret.registerClass(TMXAnimationFrame,'tiled.TMXAnimationFrame');
})(tiled || (tiled = {}));

var tiled;
(function (tiled) {
    /**
     * TMX常量数据
     */
    var TMXConstants = (function () {
        function TMXConstants() {
        }
        var d = __define,c=TMXConstants,p=c.prototype;
        /**
         * @version Egret 3.0.3
         */
        TMXConstants.TMX_FLIP_H = 0x80000000;
        /**
         * @version Egret 3.0.3
         */
        TMXConstants.TMX_FLIP_V = 0x40000000;
        /**
         * @version Egret 3.0.3
         */
        TMXConstants.TMX_FLIP_AD = 0x20000000;
        /**
         * @version Egret 3.0.3
         */
        TMXConstants.TMX_CLEAR_BIT_MASK = ~(0x80000000 | 0x40000000 | 0x20000000);
        /**
         * 图层
         * @version Egret 3.0.3
         */
        TMXConstants.LAYER = "layer";
        /**
         * 对象组
         * @version Egret 3.0.3
         */
        TMXConstants.OBJECT_GROUP = "objectgroup";
        /**
         * 属性
         * @version Egret 3.0.3
         */
        TMXConstants.PROPERTIES = "properties";
        /**
         * 数据
         * @version Egret 3.0.3
         */
        TMXConstants.DATA = "data";
        /**
         * 对象
         * @version Egret 3.0.3
         */
        TMXConstants.OBJECT = "object";
        /**
         * 图像
         * @version Egret 3.0.3
         */
        TMXConstants.IMAGE = "image";
        /**
         * 图像层
         * @version Egret 3.0.3
         */
        TMXConstants.IMAGE_LAYER = "imagelayer";
        /**
         * Tile设置
         * @version Egret 3.0.3
         */
        TMXConstants.TILE_SET = "tileset";
        /**
         * Tile
         * @version Egret 3.0.3
         */
        TMXConstants.TILE = "tile";
        /**
         * Tile偏移
         * @version Egret 3.0.3
         */
        TMXConstants.TILE_OFFSET = "tileoffset";
        /**
         * 动画
         * @version Egret 3.0.3
         */
        TMXConstants.ANIMATION = "animation";
        /**
         * 默认颜色
         * @version Egret 3.0.3
         */
        TMXConstants.DEFAULT_COLOR = 0xa0a0a4;
        /**
         * 绘图索引
         * @version Egret 3.0.3
         */
        TMXConstants.DRAWORDER_INDEX = "index";
        /**
         * 多边形
         * @version Egret 3.0.3
         */
        TMXConstants.POLYGON = "polygon";
        /**
         * 折线
         * @version Egret 3.0.3
         */
        TMXConstants.POLYLINE = "polyline";
        /**
         * 椭圆
         * @version Egret 3.0.3
         */
        TMXConstants.ELLIPSE = "ellipse";
        /**
         * tile对象组
         * @version Egret 3.0.3
         */
        TMXConstants.TILE_OBJECT_GROUP = "tileobjectgroup";
        /**
         * 正交
         * @version Egret 3.0.3
         */
        TMXConstants.ORIENTATION_ORTHOGONAL = "orthogonal";
        /**
         * 等矩
         * @version Egret 3.0.3
         */
        TMXConstants.ORIENTATION_ISOMETRIC = "isometric";
        /**
         * 交错
         * @version Egret 3.0.3
         */
        TMXConstants.ORIENTATION_STAGGERED = "staggered";
        /**
         * 六角
         * @version Egret 3.0.3
         */
        TMXConstants.ORIENTATION_HEXAGONAL = "hexagonal";
        return TMXConstants;
    })();
    tiled.TMXConstants = TMXConstants;
    egret.registerClass(TMXConstants,'tiled.TMXConstants');
})(tiled || (tiled = {}));

var tiled;
(function (tiled) {
    var TMXImageLoadEvent = (function (_super) {
        __extends(TMXImageLoadEvent, _super);
        /**
         * Tile中图片加载完成事件
         * @param type 事件的类型，可以作为 TMXImageLoadEvent.type 访问。
         * @param texture 事件在IMAGE_COMPLETE完成后所带的纹理
         * @param bubbles 确定 TMXImageLoadEvent 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 确定是否可以取消 TMXImageLoadEvent 对象。默认值为 false。
         * @version Egret 3.0.3
         */
        function TMXImageLoadEvent(type, texture, bubbles, cancelable) {
            if (texture === void 0) { texture = null; }
            if (bubbles === void 0) { bubbles = true; }
            if (cancelable === void 0) { cancelable = false; }
            _super.call(this, type, bubbles, cancelable);
            this.texture = texture;
        }
        var d = __define,c=TMXImageLoadEvent,p=c.prototype;
        /**
         * 单张图片加载完成
         * @version Egret 3.0.3
         */
        TMXImageLoadEvent.IMAGE_COMPLETE = "complete";
        /**
         * 所有图片加载完成
         * @version Egret 3.0.3
         */
        TMXImageLoadEvent.ALL_IMAGE_COMPLETE = "allComplete";
        return TMXImageLoadEvent;
    })(egret.Event);
    tiled.TMXImageLoadEvent = TMXImageLoadEvent;
    egret.registerClass(TMXImageLoadEvent,'tiled.TMXImageLoadEvent');
})(tiled || (tiled = {}));


var tiled;
(function (tiled) {
    var TMXLayerBase = (function (_super) {
        __extends(TMXLayerBase, _super);
        /**
         * 图层基类
         * @param tilemap TMXTilemap实例
         * @param data
         * @param z 图层层深
         * @version Egret 3.0.3
         */
        function TMXLayerBase(tilemap, data, z) {
            _super.call(this);
            this._tilemap = tilemap;
            this._data = data;
            this._z = z;
        }
        var d = __define,c=TMXLayerBase,p=c.prototype;
        d(p, "tilemap"
            /**
             * 获取TMXTilemap实例
             * @version Egret 3.0.3
             */
            ,function () {
                return this._tilemap;
            }
        );
        d(p, "z"
            /**
             * 获取图层所在的层深
             * @version Egret 3.0.3
             */
            ,function () {
                return this._z;
            }
        );
        /**
         * 实现ILayer绘制<code>draw</code>接口
         * @param rect 绘制的矩形区域
         * @version Egret 3.0.3
         */
        p.draw = function (rect) {
        };
        return TMXLayerBase;
    })(egret.Sprite);
    tiled.TMXLayerBase = TMXLayerBase;
    egret.registerClass(TMXLayerBase,'tiled.TMXLayerBase',["tiled.ILayer"]);
})(tiled || (tiled = {}));

var tiled;
(function (tiled) {
    var TMXColorLayer = (function (_super) {
        __extends(TMXColorLayer, _super);
        /**
         * 创建1个Tile颜色图层
         * @param tilemap TMXTilemap实例
         * @param color 颜色值，格式#ff0000
         * @param z 图层深度
         * @version Egret 3.0.3
         */
        function TMXColorLayer(tilemap, color, z) {
            _super.call(this);
            this._tilemap = tilemap;
            this._color = color;
            this._z = z;
            this.graphics.beginFill(tiled.TMXUtils.color16ToUnit(this._color), 1);
            this.graphics.drawRect(0, 0, tilemap.renderwidth, tilemap.renderheight);
            this.graphics.endFill();
        }
        var d = __define,c=TMXColorLayer,p=c.prototype;
        return TMXColorLayer;
    })(egret.Sprite);
    tiled.TMXColorLayer = TMXColorLayer;
    egret.registerClass(TMXColorLayer,'tiled.TMXColorLayer');
})(tiled || (tiled = {}));

var tiled;
(function (tiled) {
    var TMXImageLayer = (function (_super) {
        __extends(TMXImageLayer, _super);
        /**
         * 创建1个图像图层实例
         * @param tilemap TMXTilemap实例
         * @param data 图像图层数据
         * @param z 层深
         * @version Egret 3.0.3
         */
        function TMXImageLayer(tilemap, data, z) {
            _super.call(this, tilemap, data, z);
            this._name = data.attributes.name;
            this.x = +data.attributes.x;
            this.y = +data.attributes.y;
            this._z = z;
            this._opacity = (typeof +data.attributes.opacity !== "undefined") ? +data.attributes.opacity : 1;
            this.visible = (typeof +data.attributes.visible !== "undefined") ? Boolean(+data.attributes.visible) : true;
            //解析源
            var children = data.children;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    var child = data.children[i];
                    switch (child.localName) {
                        case tiled.TMXConstants.IMAGE:
                            this._source = child.attributes.source;
                            this._transColor = child.attributes.trans;
                            this.loadImage(this.tilemap.baseURL + this._source);
                            break;
                        case tiled.TMXConstants.PROPERTIES:
                            this._properties = this._tilemap.parseProperties(child);
                            break;
                        default:
                            throw new Error("TMXTileMap decode ImageLayer is Error：" + child.localName);
                            break;
                    }
                }
            }
        }
        var d = __define,c=TMXImageLayer,p=c.prototype;
        d(p, "bitmap"
            /**
             * 获取图像图层的位图，如果源图像没有加载完成，那么，数据为空
             * @version Egret 3.0.3
             */
            ,function () {
                return this._bitmap;
            }
        );
        d(p, "texture"
            /**
             * 获取图像图层的纹理，如果源图像没有加载完成，那么，数据为空
             * @version Egret 3.0.3
             */
            ,function () {
                return this._texture;
            }
        );
        d(p, "alpha"
            /**
             * 创建图像图层的透明度
             * @version Egret 3.0.3
             */
            ,function () {
                return this._opacity;
            }
        );
        /**
         * 加载图片
         * @param $url 图片地址
         * @version Egret 3.0.3
         */
        p.loadImage = function (url) {
            if (url == null || url == "")
                return;
            RES.getResByUrl(url, function (texture) {
                if (texture) {
                    this._sourcebitmap.texture = texture;
                    this._texture = texture;
                    this.dispatchEvent(new tiled.TMXImageLoadEvent(tiled.TMXImageLoadEvent.IMAGE_COMPLETE, texture));
                }
            }, this, RES.ResourceItem.TYPE_IMAGE);
        };
        /**
         * 绘制矩形区域内的图像
         * @param rect 矩形区域
         * @version Egret 3.0.3
         */
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
    })(tiled.TMXLayerBase);
    tiled.TMXImageLayer = TMXImageLayer;
    egret.registerClass(TMXImageLayer,'tiled.TMXImageLayer');
})(tiled || (tiled = {}));

var tiled;
(function (tiled) {
    var TMXTile = (function (_super) {
        __extends(TMXTile, _super);
        /**
         * 创建一个新的TMXTile实例，此类存储了场景的格子数据与Tileset中格子的数据
         * @param tileX 场景中的水平格子坐标
         * @param tileY 场景中的垂直格子坐标
         * @param gid tileset中的格子id
         * @param tilemap TMXTilemap实例
         * @param tileset TMXTileset实例
         * @version Egret 3.0.3
         */
        function TMXTile(tileX, tileY, gid, tilemap, tileset) {
            _super.call(this);
            this._tileset = tileset;
            this._tileX = tileX;
            this._tileY = tileY;
            this._tilemap = tilemap;
            this._gid = gid;
            this._flippedX = (this._gid & tiled.TMXConstants.TMX_FLIP_H) !== 0;
            this._flippedY = (this._gid & tiled.TMXConstants.TMX_FLIP_V) !== 0;
            this._flippedAD = this._flippedX && this._flippedY; //(this._gid & tiled.TMXConstants.TMX_FLIP_AD) !== 0;
            this._flipped = this._flippedX || this._flippedY || this._flippedAD;
            this._gid &= tiled.TMXConstants.TMX_CLEAR_BIT_MASK;
            this._tileData = tileset.getSpecialTileDataByTileId(this._gid);
            if (this._tileData) {
                var children = this._tileData.children;
                if (children) {
                    for (var i = 0; i < children.length; i++) {
                        var child = children[i];
                        switch (child.localName) {
                            case tiled.TMXConstants.PROPERTIES:
                                this._properties = tilemap.parseProperties(child);
                                break;
                            case tiled.TMXConstants.OBJECT_GROUP:
                                break;
                            case tiled.TMXConstants.IMAGE:
                                this._image = new tiled.TMXImage(child, this.tilemap.baseURL);
                                break;
                            case tiled.TMXConstants.ANIMATION:
                                this._animation = new tiled.TMXAnimation(tilemap, tileset, tileX, tileY, child);
                                break;
                        }
                    }
                }
            }
        }
        var d = __define,c=TMXTile,p=c.prototype;
        d(p, "gid"
            /**
             * 获取在tileset所对应的格子id
             * @version Egret 3.0.3
             */
            ,function () {
                return this._gid;
            }
        );
        d(p, "tileX"
            /**
             * 获取其在场景水平格子坐标
             * @version Egret 3.0.3
             */
            ,function () {
                return this._tileX;
            }
        );
        d(p, "tileY"
            /**
             * 获取其在场景中垂直格子坐标
             * @version Egret 3.0.3
             */
            ,function () {
                return this._tileY;
            }
        );
        d(p, "tileset"
            /**
             * 获取其在场景中所引用的TMXTileset实例
             * @version Egret 3.0.3
             */
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
            /**
             * 获取对TMXTilemap实例的引用
             * @version Egret 3.0.3
             */
            ,function () {
                return this._tilemap;
            }
        );
        d(p, "flippedX"
            /**
             * 获取格子是否进行了水平方向翻转
             * @version Egret 3.0.3
             */
            ,function () {
                return this._flippedX;
            }
        );
        d(p, "flippedY"
            /**
             * 获取格子是否进行了垂直方向翻转
             * @version Egret 3.0.3
             */
            ,function () {
                return this._flippedY;
            }
        );
        d(p, "flippedAD"
            /**
             * 获取格子是否进行了水平且垂直方向翻转
             * @version Egret 3.0.3
             */
            ,function () {
                return this._flippedAD;
            }
        );
        d(p, "flipped"
            /**
             * 获取格子是否进行了翻转（不管是水平还是垂直）
             * @version Egret 3.0.3
             */
            ,function () {
                return this._flipped;
            }
        );
        d(p, "animation"
            /**
             * 获取格子的动画信息(如果没有动画信息，那么为空)
             * @version Egret 3.0.3
             */
            ,function () {
                return this._animation;
            }
        );
        return TMXTile;
    })(egret.Sprite);
    tiled.TMXTile = TMXTile;
    egret.registerClass(TMXTile,'tiled.TMXTile');
})(tiled || (tiled = {}));

var tiled;
(function (tiled) {
    var TMXTilesetGroup = (function () {
        /**
         * Tileset集合，所有的Tileset都存储在这里
         * @param $tilemap
         * @version Egret 3.0.3
         */
        function TMXTilesetGroup($tilemap) {
            this._tilesets = [];
            this._length = 0;
            this._imagelength = 0;
            this._tilemap = $tilemap;
        }
        var d = __define,c=TMXTilesetGroup,p=c.prototype;
        d(p, "length"
            /**
             * 获取tileset的长度
             * @version Egret 3.0.3
             */
            ,function () {
                return this._length;
            }
        );
        d(p, "imagelength"
            /**
             * 获取所有图片的长度
             * @version Egret 3.0.3
             */
            ,function () {
                return this._imagelength;
            }
        );
        d(p, "tilemap"
            /**
             * 获取TMXTilemap实例的引用
             * @version Egret 3.0.3
             */
            ,function () {
                return this._tilemap;
            }
        );
        /**
         * 添加Tileset
         * @param tileset
         * @version Egret 3.0.3
         */
        p.add = function (tileset) {
            this._tilesets.push(tileset);
            this._length++;
            if (tileset.image)
                this._imagelength++;
        };
        /**
         * 根据索引获取Tileset
         * @param index
         * @version Egret 3.0.3
         */
        p.getTilesetByIndex = function (index) {
            return this._tilesets[index];
        };
        /**
         * 根据格子id获取Tileset，每个tileset都可能有n个格子(n>=1)，而这些格子的id都具备唯一性<br/>
         * 因此，通过格子id可以获取到此id在哪个tileset中的格子集中
         * @param gid 格子id
         * @version Egret 3.0.3
         */
        p.getTilesetByGid = function (gid) {
            if (gid === 0)
                return null;
            var invalidRange = -1;
            gid &= tiled.TMXConstants.TMX_CLEAR_BIT_MASK;
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
    tiled.TMXTilesetGroup = TMXTilesetGroup;
    egret.registerClass(TMXTilesetGroup,'tiled.TMXTilesetGroup');
})(tiled || (tiled = {}));

var tiled;
(function (tiled) {
    var TMXImage = (function (_super) {
        __extends(TMXImage, _super);
        /**
         * Tile图像
         * @param data 图像数据
         * @param baseURL 地址前缀
         * @version Egret 3.0.3
         */
        function TMXImage(data, baseURL) {
            _super.call(this, this);
            this._width = +data.attributes.width;
            this._height = +data.attributes.height;
            this._source = data.attributes.source;
            this._trans = (typeof data.attributes.trans !== "undefined") ? data.attributes.trans : '000000';
            this._bitmap = new egret.Bitmap();
            this._source = baseURL + this._source;
            this.loadImage(this._source);
        }
        var d = __define,c=TMXImage,p=c.prototype;
        d(p, "texture"
            /**
             * 获取图像加载完后的纹理
             * @version Egret 3.0.3
             */
            ,function () {
                return this._texture;
            }
        );
        d(p, "bitmap"
            /**
             * 获取图像加载完后的图片
             * @version Egret 3.0.3
             */
            ,function () {
                return this._bitmap;
            }
        );
        d(p, "source"
            /**
             * 获取图像加载的源地址
             * @version Egret 3.0.3
             */
            ,function () {
                return this._source;
            }
        );
        d(p, "width"
            /**
             * 获取图像的原始宽（单位：像素）
             * @version Egret 3.0.3
             */
            ,function () {
                return this._width;
            }
        );
        d(p, "height"
            /**
             * 获取图像的原始高（单位：像素）
             * @version Egret 3.0.3
             */
            ,function () {
                return this._height;
            }
        );
        /**
         * 加载图像
         * @param $url
         * @version Egret 3.0.3
         */
        p.loadImage = function (url) {
            if (url == null || url == "")
                return;
            RES.getResByUrl(url, function (texture) {
                if (texture) {
                    this._bitmap.texture = texture;
                    this._texture = texture;
                    this._width = texture.textureWidth;
                    this._height = texture.textureHeight;
                    this.dispatchEvent(new tiled.TMXImageLoadEvent(tiled.TMXImageLoadEvent.IMAGE_COMPLETE, texture));
                }
            }, this, RES.ResourceItem.TYPE_IMAGE);
        };
        return TMXImage;
    })(egret.EventDispatcher);
    tiled.TMXImage = TMXImage;
    egret.registerClass(TMXImage,'tiled.TMXImage');
})(tiled || (tiled = {}));

var tiled;
(function (tiled) {
    /**
     * 属性VO,存储map、tileset、tile相关属性数据
     */
    var TMXProperty = (function () {
        function TMXProperty() {
            /**
             * id
             * @version Egret 3.0.3
             * */
            this.gid = 0;
        }
        var d = __define,c=TMXProperty,p=c.prototype;
        return TMXProperty;
    })();
    tiled.TMXProperty = TMXProperty;
    egret.registerClass(TMXProperty,'tiled.TMXProperty');
})(tiled || (tiled = {}));

var tiled;
(function (tiled) {
    var TMXRenderer = (function () {
        /**
         * 渲染器基类
         * @param rows 水平方向格子数
         * @param cols 垂直方向格子数
         * @param tilewidth 格子宽（单位：像素）
         * @param tileheight 格子高（单位：像素）
         * @version Egret 3.0.3
         */
        function TMXRenderer(rows, cols, tilewidth, tileheight) {
            this.rows = rows;
            this.cols = cols;
            this.tilewidth = tilewidth;
            this.tileheight = tileheight;
            this.animationTiles = [];
        }
        var d = __define,c=TMXRenderer,p=c.prototype;
        /**
         * 是否能够渲染
         * @param layer
         * @version Egret 3.0.3
         * @private
         */
        p.canRender = function (layer) {
            return ((this.cols === layer.cols) &&
                (this.rows === layer.rows) &&
                (this.tilewidth === layer.tilewidth) &&
                (this.tileheight === layer.tileheight));
        };
        /**
         * 绘制Tile图层
         * @param layer
         * @param rect
         * @version Egret 3.0.3
         */
        p.drawTileLayer = function (layer, rect) {
        };
        /**
         * 绘制Tile
         * @param renderer 渲染容器
         * @param tileX 水平格子坐标
         * @param tileY 垂直格子坐标
         * @param tile TMXTile实例
         * @version Egret 3.0.3
         */
        p.drawTile = function (renderer, tileX, tileY, tile) {
        };
        /**
         * 渲染动画
         * @param renderContainer
         * @version Egret 3.0.3
         */
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
                if (animation["oldTime"] == undefined)
                    animation["oldTime"] = 0;
                if (currentTime - animation["oldTime"] > frame.duration) {
                    if (animation.oldBitmap && animation.oldBitmap.parent)
                        animation.oldBitmap.parent.removeChild(animation.oldBitmap);
                    this.drawTile(renderContainer, pos[0], pos[1], frame.tile);
                    animation.oldBitmap = frame.tile.bitmap;
                    animation["oldTime"] = currentTime;
                    animation.render();
                }
            }
        };
        return TMXRenderer;
    })();
    tiled.TMXRenderer = TMXRenderer;
    egret.registerClass(TMXRenderer,'tiled.TMXRenderer');
})(tiled || (tiled = {}));

var tiled;
(function (tiled) {
    var TMXOrthogonalRenderer = (function (_super) {
        __extends(TMXOrthogonalRenderer, _super);
        /**
         * 创建1个正交渲染器（正常模式）
         * @param rows 水平方向格子数
         * @param cols 垂直方向格子数
         * @param tilewidth 格子宽（单位：像素）
         * @param tileheight 格子高（单位：像素）
         * @version Egret 3.0.3
         */
        function TMXOrthogonalRenderer(rows, cols, tilewidth, tileheight) {
            _super.call(this, rows, cols, tilewidth, tileheight);
        }
        var d = __define,c=TMXOrthogonalRenderer,p=c.prototype;
        /**
         * 是否可渲染
         * @param layer
         * @version Egret 3.0.3
         */
        p.canRender = function (layer) {
            return (layer.orientation === tiled.TMXConstants.ORIENTATION_ORTHOGONAL) && _super.prototype.canRender.call(this, layer);
        };
        /**
         * 像素坐标转化为格子坐标
         * @param x 水平像素坐标
         * @param y 垂直像素坐标
         * @version Egret 3.0.3
         */
        p.pixelToTileCoords = function (x, y) {
            return new egret.Point(this.pixelToTileX(x), this.pixelToTileY(y));
        };
        /**
         * 水平像素坐标转化为水平格子坐标
         * @param x 水平像素坐标
         * @version Egret 3.0.3
         */
        p.pixelToTileX = function (x) {
            return Math.floor(x / this.tilewidth);
        };
        /**
         * 垂直像素坐标转化为垂直格子坐标
         * @param y 垂直像素坐标
         * @version Egret 3.0.3
         */
        p.pixelToTileY = function (y) {
            return Math.floor(y / this.tileheight);
        };
        /**
         * 格子坐标转化为像素坐标
         * @param tileX 水平格子坐标
         * @param tileY 垂直格子坐标
         * @version Egret 3.0.3
         */
        p.tileToPixelCoords = function (tileX, tileY) {
            return new egret.Point(tileX * this.tilewidth, tileY * this.tileheight);
        };
        /**
         * 绘制Tile
         * @param renderer 渲染容器
         * @param tileX 水平格子坐标
         * @param tileY 垂直格子坐标
         * @param tile TMXTile实例
         * @version Egret 3.0.3
         */
        p.drawTile = function (renderer, tileX, tileY, tile) {
            var tileset = tile.tileset;
            tileset.drawTile(renderer, tileset.tileoffset.x + tileX * this.tilewidth, tileset.tileoffset.y + (tileY + 1) * this.tileheight - tileset.tileheight, tile);
        };
        /**
         * 绘制作Tile图层
         * @param layer 图层
         * @param rect  绘制区域
         * @version Egret 3.0.3
         */
        p.drawTileLayer = function (layer, rect) {
            var staticContainer = layer.staticContainer;
            var start = this.pixelToTileCoords(Math.floor(Math.max(rect.x - (layer.maxTileSize.width - layer.tilewidth), 0)), Math.floor(Math.max(rect.y - (layer.maxTileSize.height - layer.tileheight), 0)));
            var end = this.pixelToTileCoords(Math.ceil(rect.x + rect.width + this.tilewidth), Math.ceil(rect.y + rect.height + this.tileheight));
            end.x = end.x > this.rows ? this.rows : end.x;
            end.y = end.y > this.cols ? this.cols : end.y;
            for (var y = start.y; y < end.y; y++) {
                for (var x = start.x; x < end.x; x++) {
                    var tmxTile = layer.layerData[x][y];
                    if (tmxTile) {
                        if (tmxTile.animation)
                            this.animationTiles.push({ "tmxTile": tmxTile, "pos": [x, y] });
                        else
                            this.drawTile(staticContainer, x, y, tmxTile);
                    }
                }
            }
        };
        return TMXOrthogonalRenderer;
    })(tiled.TMXRenderer);
    tiled.TMXOrthogonalRenderer = TMXOrthogonalRenderer;
    egret.registerClass(TMXOrthogonalRenderer,'tiled.TMXOrthogonalRenderer');
})(tiled || (tiled = {}));

var tiled;
(function (tiled) {
    var TMXIsometricRenderer = (function (_super) {
        __extends(TMXIsometricRenderer, _super);
        /**
         * 创建1个iso渲染器
         * @param rows 水平方向格子数
         * @param cols 垂直方向格子数
         * @param tilewidth 格子宽（单位：像素）
         * @param tileheight 格子高（单位：像素）
         * @version Egret 3.0.3
         */
        function TMXIsometricRenderer(rows, cols, tilewidth, tileheight) {
            _super.call(this, rows, cols, tilewidth, tileheight);
            this._hTilewidth = this.tilewidth / 2;
            this._hTileheight = this.tileheight / 2;
            this._originX = this.rows * this._hTilewidth;
        }
        var d = __define,c=TMXIsometricRenderer,p=c.prototype;
        /**
         * 是否可渲染
         * @param layer
         * @version Egret 3.0.3
         */
        p.canRender = function (layer) {
            return (layer.orientation === tiled.TMXConstants.ORIENTATION_ISOMETRIC) && _super.prototype.canRender.call(this, layer);
        };
        /**
         * 像素坐标转化为格子坐标
         * @param x 水平像素坐标
         * @param y 垂直像素坐标
         * @version Egret 3.0.3
         */
        p.pixelToTileCoords = function (x, y) {
            var __x = Math.floor(this.pixelToTileX(x, y));
            var __y = Math.floor(this.pixelToTileY(y, x));
            return new egret.Point(this.pixelToTileX(x, y), this.pixelToTileY(y, x));
        };
        /**
         * 像素坐标转化为水平格子坐标
         * @param x 水平像素坐标
         * @param y 垂直像素坐标
         * @version Egret 3.0.3
         */
        p.pixelToTileX = function (x, y) {
            var _value = (y / this.tileheight) + ((x - this._originX) / this.tilewidth);
            return (y / this.tileheight) + ((x - this._originX) / this.tilewidth);
        };
        /**
         * 像素坐标转化为垂直格子坐标
         * @param y 垂直像素坐标
         * @param x 水平像素坐标
         * @version Egret 3.0.3
         */
        p.pixelToTileY = function (y, x) {
            var _value = (y / this.tileheight) - ((x - this._originX) / this.tilewidth);
            return (y / this.tileheight) - ((x - this._originX) / this.tilewidth);
        };
        /**
         * 格子坐标转化为像素坐标
         * @param tileX 水平格子坐标
         * @param tileY 垂直格子坐标
         * @version Egret 3.0.3
         */
        p.tileToPixelCoords = function (tileX, tileY) {
            return new egret.Point((tileX - tileY) * this._hTilewidth + this._originX, (tileX + tileY) * this._hTileheight);
        };
        /**
         * 绘制作Tile
         * @param renderer 渲染容器
         * @param tileX 水平格子坐标（单位：像素）
         * @param tileY 垂直格子坐标（单位：像素）
         * @param tile TMXTile实例
         * @version Egret 3.0.3
         */
        p.drawTile = function (renderer, tileX, tileY, tile) {
            var tileset = tile.tileset;
            tileset.drawTile(renderer, tileset.tileoffset.x + tileX, tileset.tileoffset.y + tileY - tileset.tileheight, tile);
        };
        /**
         * 绘制图层
         * @param layer 图层
         * @param rect 绘制区域
         * @version Egret 3.0.3
         */
        p.drawTileLayer = function (layer, rect) {
            var staticContainer = layer.staticContainer;
            var tileset = layer.tileset;
            var offset = tileset.tileoffset;
            //获得上左，右下角位置
            var rowItr = this.pixelToTileCoords(rect.x - tileset.tilewidth, rect.y - tileset.tileheight);
            rowItr = new egret.Point(Math.floor(rowItr.x), Math.floor(rowItr.y));
            var tileEnd = this.pixelToTileCoords(rect.x + rect.width + tileset.tilewidth, rect.y + rect.height + tileset.tileheight);
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
            var shifted = Boolean(+inUpperHalf ^ +inLeftHalf);
            var columnItr = rowItr.clone();
            //先横向扫描，再纵向扫描
            for (var y = startPos.y; y - this.tileheight < rectEnd.y; y += this._hTileheight) {
                columnItr.setTo(rowItr.x, rowItr.y);
                for (var x = startPos.x; x < rectEnd.x; x += this.tilewidth) {
                    if ((columnItr.x >= 0) && (columnItr.y >= 0) && (columnItr.x < this.rows) && (columnItr.y < this.cols)) {
                        var tmxTile = layer.layerData[columnItr.x][columnItr.y];
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
                }
                else {
                    rowItr.y++;
                    startPos.x -= this._hTilewidth;
                    shifted = false;
                }
            }
        };
        return TMXIsometricRenderer;
    })(tiled.TMXRenderer);
    tiled.TMXIsometricRenderer = TMXIsometricRenderer;
    egret.registerClass(TMXIsometricRenderer,'tiled.TMXIsometricRenderer');
})(tiled || (tiled = {}));

var tiled;
(function (tiled) {
    var TMXHexagonalRenderer = (function (_super) {
        __extends(TMXHexagonalRenderer, _super);
        /**
         * 创建1个六角形渲染器实例
         * @param rows 水平方向格子数
         * @param cols 垂直方向格子数
         * @param tilewidth 格子宽（单位：像素）
         * @param tileheight 格子高（单位：像素）
         * @param hexsidelength
         * @param staggeraxis
         * @param staggerindex
         * @version Egret 3.0.3
         */
        function TMXHexagonalRenderer(rows, cols, tilewidth, tileheight, hexsidelength, staggeraxis, staggerindex) {
            _super.call(this, rows, cols, tilewidth, tileheight);
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
        var d = __define,c=TMXHexagonalRenderer,p=c.prototype;
        /**
         * 是否可渲染
         * @param layer
         * @version Egret 3.0.3
         */
        p.canRender = function (layer) {
            return (layer.orientation === tiled.TMXConstants.ORIENTATION_HEXAGONAL) && _super.prototype.canRender.call(this, layer);
        };
        /**
         * 像素坐标转化为格子坐标
         * @param x 水平像素坐标
         * @param y 垂直像素坐标
         * @version Egret 3.0.3
         */
        p.pixelToTileCoords = function (x, y) {
            if (this._staggeraxis === "x")
                x = x - ((this._staggerindex === "old") ? this._sidelengthx : this.tilewidth);
            else
                y = y - ((this._staggerindex === "old") ? this._sideoffsety : this.tileheight);
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
            var offsetsStaggerX = [
                { x: 0, y: 0 },
                { x: +1, y: -1 },
                { x: +1, y: 0 },
                { x: +2, y: 0 },];
            var offsetsStaggerY = [
                { x: 0, y: 0 },
                { x: -1, y: +1 },
                { x: 0, y: +1 },
                { x: 0, y: +2 },];
            var offsets = (this._staggeraxis === "x") ? offsetsStaggerX : offsetsStaggerY;
            return new egret.Point(referencePoint.x + offsets[nearest].x, referencePoint.y + offsets[nearest].y);
        };
        /**
         * 像素坐标转换成水平格子坐标
         * @param x 水平像素坐标（单位：像素）
         * @param y 垂直像素坐标（单位：像素）
         * @version Egret 3.0.3
         */
        p.pixelToTileX = function (x, y) {
            var ret = this.pixelToTileCoords(x, y);
            return ret.x;
        };
        /**
         * 像素坐标转换成垂直格子坐标
         * @param y 垂直像素坐标（单位：像素）
         * @param x 水平像素坐标（单位：像素）
         * @version Egret 3.0.3
         */
        p.pixelToTileY = function (y, x) {
            var ret = this.pixelToTileCoords(x, y);
            return ret.y;
        };
        /**
         * 返回指定的瓦片对应的像素位置
         * @param q
         * @param r
         * @version Egret 3.0.3
         */
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
        /**
         * 绘制格子
         * @param renderer 渲染容器
         * @param tileX 水平格子坐标
         * @param tileY 垂直格子坐标
         * @param tile TMXTile实例
         * @version Egret 3.0.3
         */
        p.drawTile = function (renderer, tileX, tileY, tile) {
            var point = this.tileToPixelCoords(tileX, tileY);
            var tileset = tile.tileset;
            tileset.drawTile(renderer, tileset.tileoffset.x + point.x, tileset.tileoffset.y + point.y + (this.tileheight - tileset.tileheight), tile);
        };
        /**
         * 绘制图层
         * @param layer 图层
         * @param rect 绘制区域
         * @version Egret 3.0.3
         */
        p.drawTileLayer = function (layer, rect) {
            var staticContainer = layer.staticContainer;
            var start = this.pixelToTileCoords(Math.floor(rect.x), Math.floor(rect.y));
            var end = this.pixelToTileCoords(Math.floor(rect.x + rect.width + this.tilewidth), Math.floor(rect.y + rect.height + this.tileheight));
            start.x = start.x < 0 ? 0 : start.x;
            start.y = start.y < 0 ? 0 : start.y;
            end.x = end.x > this.rows ? this.rows : end.x;
            end.y = end.y > this.cols ? this.cols : end.y;
            for (var y = start.y; y < end.y; y++) {
                for (var x = start.x; x < end.x; x++) {
                    var tmxTile = layer.layerData[x][y];
                    if (tmxTile) {
                        if (tmxTile.animation)
                            this.animationTiles.push({ "tmxTile": tmxTile, "pos": [x, y] });
                        else
                            this.drawTile(staticContainer, x, y, tmxTile);
                    }
                }
            }
        };
        return TMXHexagonalRenderer;
    })(tiled.TMXRenderer);
    tiled.TMXHexagonalRenderer = TMXHexagonalRenderer;
    egret.registerClass(TMXHexagonalRenderer,'tiled.TMXHexagonalRenderer');
})(tiled || (tiled = {}));

var tiled;
(function (tiled) {
    var TMXTilemap = (function (_super) {
        __extends(TMXTilemap, _super);
        /**
         * 创建1个TMXTilemap实例对象
         * @param renderwidth 渲染区域宽
         * @param renderheight 渲染区域高
         * @param data tmx文件加载完毕的数据
         * @param url tmx文件地址
         * @version egret 3.0.3
         */
        function TMXTilemap(renderwidth, renderheight, data, url) {
            _super.call(this);
            this._tmxRenderer = null;
            this._data = data;
            this._renderWidth = renderwidth;
            this._renderHeight = renderheight;
            this._rows = +data.attributes.width; //水平方向格子数量
            this._cols = +data.attributes.height; //垂直方向格子数量
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
            if (this._orientation === tiled.TMXConstants.ORIENTATION_ISOMETRIC) {
                this.width = (this._rows + this._cols) * (this._tilewidth / 2);
                this.height = (this._rows + this._cols) * (this._tileheight / 2);
            }
            else {
                this.width = this._rows * this._tilewidth;
                this.height = this._cols * this._tileheight;
            }
            this._hexsidelength = +data.attributes.hexsidelength;
            this._staggeraxis = data.attributes.staggeraxis || undefined;
            this._staggerindex = data.attributes.staggerindex || undefined;
            this._backgroundcolor = data.attributes.backgroundcolor;
            this._z = 0;
            this._layers = [];
            //初始化默认的渲染
            if (this._tmxRenderer === null || !this._tmxRenderer.canRender(this)) {
                this._tmxRenderer = this.getNewDefaultRenderer(this);
            }
            this._initialized = false;
        }
        var d = __define,c=TMXTilemap,p=c.prototype;
        d(p, "nextobjectid"
            ,function () {
                return this._nextobjectid;
            }
        );
        d(p, "tilewidth"
            /**
             * 获取格子宽（单位：像素）
             * @version egret 3.0.3
             */
            ,function () {
                return this._tilewidth;
            }
        );
        d(p, "tileheight"
            /**
             * 获取格子高（单位：像素）
             * @version egret 3.0.3
             */
            ,function () {
                return this._tileheight;
            }
        );
        d(p, "rows"
            /**
             * 获取场景水平方向格子数
             * @version egret 3.0.3
             */
            ,function () {
                return this._rows;
            }
        );
        d(p, "cols"
            /**
             * 获取场景垂直方向格子数
             * @version egret 3.0.3
             */
            ,function () {
                return this._cols;
            }
        );
        d(p, "baseURL"
            /**
             * 获取基本地址
             * @version egret 3.0.3
             */
            ,function () {
                return this._baseURL;
            }
        );
        d(p, "renderwidth"
            /**
             * 获取渲染宽（单位：像素）
             * @version egret 3.0.3
             */
            ,function () {
                return this._renderWidth;
            }
        );
        d(p, "renderheight"
            /**
             * 获取渲染高（单位：像素）
             * @version egret 3.0.3
             */
            ,function () {
                return this._renderHeight;
            }
        );
        /**
         * 渲染
         * @version egret 3.0.3
         */
        p.render = function () {
            //add all layers instances
            var layers = this.getLayers();
            for (var i = 0; i < layers.length; i++) {
                this.addChild(layers[i]);
            }
            this.addEventListener(egret.Event.ENTER_FRAME, this.onStartRendering, this);
        };
        /**
         * 获取所有的图层
         * @version egret 3.0.3
         */
        p.getLayers = function () {
            this.readMapObjects(this._data);
            return this._layers;
        };
        /**
         * 获取所有的对象数据
         * @version egret 3.0.3
         */
        p.getObjects = function () {
            this.readMapObjects(this._data);
            var _objects = [];
            for (var i = 0; i < this._layers.length; i++) {
                if (this._layers[i] instanceof tiled.TMXObjectGroup)
                    _objects.push(this._layers[i]);
            }
            return _objects;
        };
        /**
         * 解析属性
         * @param data 属性数据
         * @version egret 3.0.3
         */
        p.parseProperties = function (data) {
            var properties;
            var children = data.children;
            if (children) {
                properties = [];
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    var tmxProperty = new tiled.TMXProperty();
                    tmxProperty.name = child.attributes.name;
                    tmxProperty.value = child.attributes.value;
                    properties[i] = tmxProperty;
                }
            }
            return properties;
        };
        /**
         * 是否显示背景
         * @param isShow
         * @version egret 3.0.3
         */
        p.showHideBackground = function (isShow) {
            this._showHideBackground = isShow;
            for (var i = 0; i < this._layers.length; i++) {
                var layer = this._layers[i];
                if (layer instanceof tiled.TMXColorLayer) {
                    layer.visible = isShow;
                    return;
                }
            }
        };
        /**
         * 销毁所有数据
         * @version egret 3.0.3
         */
        p.destory = function () {
            this._tilesets = undefined;
            this._layers = [];
            this._initialized = false;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onStartRendering, this);
            tiled.TMXTileset.removeAllTextures();
            if (this.parent)
                this.parent.removeChild(this);
        };
        /**
         * 读取地图上的对象
         * @param data
         */
        p.readMapObjects = function (data) {
            if (this._initialized === true)
                return;
            //自动排序
            var zOrder = this._z;
            var self = this;
            if (!this._tilesets)
                this._tilesets = new tiled.TMXTilesetGroup(this);
            if (this._backgroundcolor && this._showHideBackground)
                this._layers.push(new tiled.TMXColorLayer(this, this._backgroundcolor, zOrder++));
            var children = this._data.children;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    switch (child.localName) {
                        case tiled.TMXConstants.TILE_SET:
                            this._tilesets.add(new tiled.TMXTileset(this, child));
                            break;
                        case tiled.TMXConstants.LAYER:
                            this._layers.push(this.parseLayer(child, zOrder++));
                            break;
                        case tiled.TMXConstants.OBJECT_GROUP:
                            this._layers.push(this.parseObjectGroup(child, zOrder++));
                            break;
                        case tiled.TMXConstants.PROPERTIES:
                            this._properties = this.parseProperties(child);
                            break;
                        case tiled.TMXConstants.IMAGE_LAYER:
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
                        var target = event.currentTarget;
                        target.removeEventListener(tiled.TMXImageLoadEvent.IMAGE_COMPLETE, onImageLoad, this);
                        loadCount++;
                        if (loadCount == this._tilesets.imagelength) {
                            self.dispatchEvent(new tiled.TMXImageLoadEvent(tiled.TMXImageLoadEvent.ALL_IMAGE_COMPLETE));
                        }
                    };
                    tileset.image.addEventListener(tiled.TMXImageLoadEvent.IMAGE_COMPLETE, onImageLoad, this);
                }
            }
            this._initialized = true;
        };
        /**
         * 开始渲染
         * @param event
         */
        p.onStartRendering = function (event) {
            var layers = this.getLayers();
            for (var i = 0; i < layers.length; i++) {
                var layer = layers[i];
                if (layer instanceof tiled.TMXLayer)
                    layer.render();
            }
            var objects = this.getObjects();
            for (var i = 0; i < objects.length; i++) {
                var object = objects[i];
            }
        };
        /**
         * 建立一个兼容的渲染对象
         * @param obj
         */
        p.getNewDefaultRenderer = function (obj) {
            switch (obj._orientation) {
                case "orthogonal":
                    return new tiled.TMXOrthogonalRenderer(obj.rows, obj.cols, obj.tilewidth, obj.tileheight);
                    break;
                case "isometric":
                    return new tiled.TMXIsometricRenderer(obj.rows, obj.cols, obj.tilewidth, obj.tileheight);
                    break;
                case "hexagonal":
                    return new tiled.TMXHexagonalRenderer(obj.rows, obj.cols, obj.tilewidth, obj.tileheight, obj._hexsidelength, obj._staggeraxis, obj._staggerindex);
                    break;
                default:
                    throw new Error(obj._orientation + " type TMX Tile Map not supported!");
            }
        };
        /**
         * 解析图层数据
         * @param data 传入的图层数据
         * @param z 图层深度
         */
        p.parseLayer = function (data, z) {
            var layer = new tiled.TMXLayer(this, this._tilewidth, this._tileheight, this._orientation, this._tilesets, z, data);
            //渲染图层
            if (this._tmxRenderer.canRender(layer))
                layer.setRenderer(this.getNewDefaultRenderer(this));
            else
                layer.setRenderer(this._tmxRenderer);
            var self = this;
            var onAllImageLoad = function (event) {
                self.removeEventListener(tiled.TMXImageLoadEvent.ALL_IMAGE_COMPLETE, onAllImageLoad, this);
                this.draw(new egret.Rectangle(0, 0, self._renderWidth, self._renderHeight));
            };
            this.addEventListener(tiled.TMXImageLoadEvent.ALL_IMAGE_COMPLETE, onAllImageLoad, layer);
            return layer;
        };
        /**
         * 解析对象组数据
         * @param data 传入的对象组数据
         * @param z 对象深度
         */
        p.parseObjectGroup = function (data, z) {
            var objectGroup = new tiled.TMXObjectGroup(data, this._orientation, this._tilesets, z);
            var self = this;
            var onAllImageLoad = function (event) {
                self.removeEventListener(tiled.TMXImageLoadEvent.ALL_IMAGE_COMPLETE, onAllImageLoad, this);
                this.draw(new egret.Rectangle(0, 0, self._renderWidth, self._renderHeight));
            };
            this.addEventListener(tiled.TMXImageLoadEvent.ALL_IMAGE_COMPLETE, onAllImageLoad, objectGroup);
            return objectGroup;
        };
        /**
         * 解析Tileset数据
         * @param data 传入的Tileset数据
         */
        p.parseTileset = function (data) {
            return new tiled.TMXTileset(data, this);
        };
        /**
         * 解析imagelayer(此类型的图层不参与渲染方向更新)
         * @param data
         * @param z
         */
        p.parseImageLayer = function (data, z) {
            var self = this;
            var imageLayer = new tiled.TMXImageLayer(this, data, z);
            var onImageLoad = function (event) {
                this.draw(new egret.Rectangle(0, 0, self._renderWidth, self._renderHeight));
            };
            imageLayer.addEventListener(tiled.TMXImageLoadEvent.IMAGE_COMPLETE, onImageLoad, imageLayer);
            return imageLayer;
        };
        return TMXTilemap;
    })(egret.Sprite);
    tiled.TMXTilemap = TMXTilemap;
    egret.registerClass(TMXTilemap,'tiled.TMXTilemap');
})(tiled || (tiled = {}));

var tiled;
(function (tiled) {
    var Ellipse = (function (_super) {
        __extends(Ellipse, _super);
        /**
         * 创建1个椭圆形状实例
         * @param x 水平坐标（单位：像素）
         * @param y 垂直坐标（单位：像素）
         * @param w 椭圆宽
         * @param h 椭圆高
         * @version Egret 3.0.3
         */
        function Ellipse(x, y, w, h) {
            _super.call(this);
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
        }
        var d = __define,c=Ellipse,p=c.prototype;
        /**
         * 根据参数<code>color</code>绘制椭圆，参数为16进制表示形式，例如：0xff0000
         * @param color 颜色值
         * @version Egret 3.0.3
         */
        p.draw = function (color) {
            this.graphics.clear();
            this.graphics.lineStyle(2, color);
            this.graphics.beginFill(color, 0.2);
            this.graphics.drawEllipse(0, 0, this.width, this.height);
            this.graphics.endFill();
        };
        return Ellipse;
    })(egret.Sprite);
    tiled.Ellipse = Ellipse;
    egret.registerClass(Ellipse,'tiled.Ellipse');
})(tiled || (tiled = {}));

var tiled;
(function (tiled) {
    var Polygon = (function (_super) {
        __extends(Polygon, _super);
        /**
         * 创建1个新的多边形实例
         * @param x 水平坐标（单位：像素）
         * @param y 垂直坐标（单位：像素）
         * @param points 多边形对应的点数据列表，三角形有三个点数据，n边形有n个点数据
         * @version Egret 3.0.3
         */
        function Polygon(x, y, points) {
            _super.call(this);
            this.points = points;
            this.x = x;
            this.y = y;
        }
        var d = __define,c=Polygon,p=c.prototype;
        /**
         * 根据参数<code>color</code>绘制多边形，参数为16进制表示形式，例如：0xff0000
         * @param color 颜色值
         * @version Egret 3.0.3
         */
        p.draw = function (color) {
            this.graphics.clear();
            this.graphics.lineStyle(2, color);
            this.graphics.beginFill(color, 0.2);
            if (this.points) {
                for (var i = 0; i < this.points.length; i++) {
                    var _data = this.points[i];
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
    tiled.Polygon = Polygon;
    egret.registerClass(Polygon,'tiled.Polygon');
})(tiled || (tiled = {}));

var tiled;
(function (tiled) {
    var PolyLine = (function (_super) {
        __extends(PolyLine, _super);
        /**
         * 创建1个新的折线实例
         * @param x 水平坐标（单位：像素）
         * @param y 垂直坐标（单位：像素）
         * @param points 折线对应的点数据列表
         * @version Egret 3.0.3
         */
        function PolyLine(x, y, points) {
            _super.call(this);
            this.points = points;
            this.x = x;
            this.y = y;
        }
        var d = __define,c=PolyLine,p=c.prototype;
        /**
         * 根据参数<code>color</code>绘制折线，参数为16进制表示形式，例如：0xff0000
         * @param color 颜色值
         * @version Egret 3.0.3
         */
        p.draw = function (color) {
            this.graphics.clear();
            this.graphics.lineStyle(2, color);
            this.graphics.beginFill(color, 0.2);
            if (this.points) {
                for (var i = 0; i < this.points.length; i++) {
                    var _data = this.points[i];
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
    tiled.PolyLine = PolyLine;
    egret.registerClass(PolyLine,'tiled.PolyLine');
})(tiled || (tiled = {}));

var tiled;
(function (tiled) {
    var TMXTileset = (function () {
        /**
         * Tileset对象
         * @param tilemap 引用的TMXTilemap对象
         * @param tilesetData tilesetDat数据
         * @version Egret 3.0.3
         * 暂时不支持tsx文件的扩展
         */
        function TMXTileset(tilemap, tilesetData) {
            /**
             * 获取文件扩展名
             * @version Egret 3.0.3
             */
            this.getFileExtension = function (path) {
                return path.substring(path.lastIndexOf(".") + 1, path.length);
            };
            this._tileDatas = [];
            tiled.TMXTileset._cacheRenderTextures = {};
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
                        case tiled.TMXConstants.IMAGE:
                            this._image = new tiled.TMXImage(child, this.tilemap.baseURL);
                            this._imagesource = this._image.source;
                            break;
                        case tiled.TMXConstants.TILE_OFFSET:
                            this._tileoffset = new egret.Point(+child.attributes.x, +child.attributes.y);
                            break;
                        case tiled.TMXConstants.TILE:
                            var gid = +child.attributes.id + this._firstgid;
                            if (this._tileDatas[gid] == null)
                                this._tileDatas[gid] = child;
                            break;
                        case tiled.TMXConstants.PROPERTIES:
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
        var d = __define,c=TMXTileset,p=c.prototype;
        d(p, "name"
            /**
             * Tileset名称
             * @version Egret 3.0.3
             */
            ,function () {
                return this._name;
            }
        );
        d(p, "firstgid"
            /**
             * 获取每个tileset第1个格子的id号。<br/>
             * 例如，1个tmx文件有3个tileset，那么第1个tileset的firstgid默认为1，如果第1个tileset有12个格子，<br/>
             * 那么第二个tileset的firstgid将为13，依此类推，firstgid为全局的标识id号，通过此id号可以计算每个tileset中格子的id号
             * @version Egret 3.0.3
             */
            ,function () {
                return this._firstgid;
            }
        );
        d(p, "lastgid"
            /**
             * 获取每个tileset最后1个格子的id号
             * @version Egret 3.0.3
             */
            ,function () {
                return this._lastgid;
            }
        );
        d(p, "tilewidth"
            /**
             * 获取每个tileset中格子宽（单位：像素）
             * @version Egret 3.0.3
             */
            ,function () {
                return this._tilewidth;
            }
        );
        d(p, "tileheight"
            /**
             * 获取每个tileset中格子高（单位：像素）
             * @version Egret 3.0.3
             */
            ,function () {
                return this._tileheight;
            }
        );
        d(p, "spacing"
            /**
             * 获取tileset中格子与格子之间的水平间距（单位：像素）
             * @version Egret 3.0.3
             */
            ,function () {
                return this._spacing;
            }
        );
        d(p, "margin"
            /**
             * 获取tileset中格子与格子之间的垂直间距（单位：像素）
             * @version Egret 3.0.3
             */
            ,function () {
                return this._margin;
            }
        );
        d(p, "tileoffset"
            /**
             * 获取tileset中格子的偏移值,返回egret.Point数据
             * @version Egret 3.0.3
             */
            ,function () {
                return this._tileoffset;
            }
        );
        d(p, "horizontalTileCount"
            /**
             * 获取tileset中水平方向的格子数
             * @version Egret 3.0.3
             */
            ,function () {
                return this._hTileCount;
            }
        );
        d(p, "verticalTileCount"
            /**
             * 获取tileset中垂直方向的格子数
             * @version Egret 3.0.3
             */
            ,function () {
                return this._vTileCount;
            }
        );
        d(p, "tilemap"
            /**
             * 获取对TMXTilemap实例的引用
             * @version Egret 3.0.3
             */
            ,function () {
                return this._tilemap;
            }
        );
        d(p, "properties"
            /**
             * 获取tileset所具备的属性列表<br/>
             * 通过查看tmx文件可知，只有具备属性数据的tileset才会生成属性数据，以标签<code>properties</code>表示
             * 注意：这里表示的是tileset本身的属性列表，而非tileset中格子的属性列表
             * @version Egret 3.0.3
             */
            ,function () {
                return this._properties;
            }
        );
        d(p, "image"
            /**
             * 获取tileset中对标签<code>image</code>解析实例的引用
             * @version Egret 3.0.3
             */
            ,function () {
                return this._image;
            }
        );
        /**
         * 根据id获取特殊格子的数据，默认情况下，tileset中格子如果没有作特殊处理，在tmx文件中是不会生成数据的，这里的特殊处理包括以下几个方面：<br/>
         * (1):格子添加了自定义属性<br/>
         * (2):格子添加了动画<br/>
         * (3):格子添加了碰撞区域<br/>
         * 对于第2种情况，tmx文件中是以标签<code>animation</code>记录</br>
         * 对于第3种情况，tmx文件中是以标签<code>objectgroup</code>记录，这表示可以添加多个自定义的碰撞区域
         * @param gid tileset中的格子id
         * @version Egret 3.0.3
         */
        p.getSpecialTileDataByTileId = function (gid) {
            return this._tileDatas[gid];
        };
        /**
         *  获取tileset属性列表
         * @version Egret 3.0.3
         */
        p.getProperties = function () {
            return this._properties;
        };
        /**
         * 根据索引获取tileset属性列表
         * @param index
         * @version Egret 3.0.3
         */
        p.getPropertyByIndex = function (index) {
            if (this._properties && index < this._properties.length)
                return this._properties[index];
            return null;
        };
        /**
         * 判断当前tileset中是否包含对应<code>gid</code>的格子
         * @param gid gid
         * @version Egret 3.0.3
         */
        p.contains = function (gid) {
            return gid >= this._firstgid && gid <= this._lastgid;
        };
        /**
         * 绘制Tile
         * @param renderer 渲染容器
         * @param dx 水平像素坐标
         * @param dy 垂直像素坐标
         * @param tile TMXTile实例
         * @version Egret 3.0.3
         */
        p.drawTile = function (renderer, dx, dy, tile) {
            //用gid+col+row作key来降低draw的次数
            var renderTexture;
            var id = tile.gid - this.firstgid;
            var key = this.firstgid + "_" + id;
            if (key) {
                if (tiled.TMXTileset._cacheRenderTextures[key] == null) {
                    if (this.image) {
                        renderTexture = new egret.RenderTexture();
                        renderTexture.drawToTexture(this.image.bitmap, new egret.Rectangle((id % this.horizontalTileCount) * (this.tilewidth + this._spacing) + this._spacing, (Math.floor(id / this.horizontalTileCount)) * (this.tileheight + this._margin) + this._margin, this.tilewidth, this.tileheight));
                        tiled.TMXTileset._cacheRenderTextures[key] = renderTexture;
                    }
                }
                else {
                    renderTexture = tiled.TMXTileset._cacheRenderTextures[key];
                }
                if (renderTexture) {
                    var isImage = false;
                    var isObject = false;
                    if (renderer instanceof tiled.TMXObject) {
                        isObject = true;
                        isImage = renderer.isImage;
                    }
                    this._transformMatrix.identity();
                    var _scalex = isObject ? renderer.width / renderTexture.textureWidth : 1;
                    var _scaley = isObject ? renderer.height / renderTexture.textureHeight : 1;
                    if (tile.flippedAD) {
                        this._transformMatrix.scale(-1 * _scalex, -1 * _scaley);
                        this._transformMatrix.translate(dx + renderer.width * _scalex, dy + renderer.height * _scaley);
                    }
                    else if (tile.flippedY) {
                        this._transformMatrix.scale(1 * _scalex, -1 * _scaley);
                        this._transformMatrix.translate(dx, dy + renderer.height * _scaley);
                    }
                    else if (tile.flippedX) {
                        this._transformMatrix.scale(-1 * _scalex, 1 * _scaley);
                        this._transformMatrix.translate(dx + renderer.width * _scalex, dy);
                    }
                    else {
                        this._transformMatrix.scale(_scalex, _scaley);
                        this._transformMatrix.translate(dx, dy + (isObject ? (renderTexture.textureHeight - renderer.height) : 0));
                    }
                    if (tile.bitmap == null)
                        tile.bitmap = new egret.Bitmap();
                    tile.bitmap.texture = renderTexture;
                    tile.bitmap.matrix = this._transformMatrix;
                    renderer.addChild(tile.bitmap);
                }
            }
        };
        /**
         * 移除所有缓存的纹理
         * @version Egret 3.0.3
         */
        TMXTileset.removeAllTextures = function () {
            this._cacheRenderTextures = {};
        };
        return TMXTileset;
    })();
    tiled.TMXTileset = TMXTileset;
    egret.registerClass(TMXTileset,'tiled.TMXTileset');
})(tiled || (tiled = {}));

var tiled;
(function (tiled) {
    var TMXLayer = (function (_super) {
        __extends(TMXLayer, _super);
        /**
         * 创建1个基本图层实例
         * 为了优化渲染，这里创建了静态图层与动画图层<br/>
         * 静态图层中没有任何动画组件，将其缓存为位图，即container.cacheAsBitmap=true;<br/>
         * 动态图层中有动画
         * @param tilemap TMXTilemap实例引用
         * @param tilewidth 格子宽
         * @param tileheight 格子高
         * @param orientation 渲染方向
         * @param tilesets tilesets组
         * @param z 层深
         * @param data
         * @version Egret 3.0.3
         */
        function TMXLayer(tilemap, tilewidth, tileheight, orientation, tilesets, z, data) {
            _super.call(this, tilemap, data, z);
            this._staticContainer = new egret.Sprite();
            //
            this.addChild(this._staticContainer);
            //为了防止地图坐标为负时出现无法显示的问题，这里延迟2秒进行缓存
            setTimeout(function (self) {
                self._staticContainer.cacheAsBitmap = true;
            }, 2000, this);
            this._animationContainer = new egret.Sprite();
            this.addChild(this._animationContainer);
            this._tilemap = tilemap;
            this._tilewidth = tilewidth;
            this._tileheight = tileheight;
            this._orientation = orientation;
            this._tilesets = tilesets;
            this.tileset = this._tilesets ? this._tilesets.getTilesetByIndex(0) : null;
            this.maxTileSize = { "width": 0, "height": 0 };
            //根据Tile设置来设置图层数据
            for (var i = 0; i < this._tilesets.length; i++) {
                var tileset = this._tilesets.getTilesetByIndex(i);
                this.maxTileSize.width = Math.max(this.maxTileSize.width, tileset.tilewidth);
                this.maxTileSize.height = Math.max(this.maxTileSize.height, tileset.tileheight);
            }
            this._name = data.attributes.name;
            this._cols = +data.attributes.width;
            this._rows = +data.attributes.height;
            this._opacity = (typeof data.attributes.opacity !== "undefined") ? parseFloat(data.attributes.opacity) : 1;
            this.visible = (typeof data.attributes.visible !== "undefined") ? Boolean(+data.attributes.visible) : true;
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
                        case tiled.TMXConstants.DATA:
                            this.parseLayerData(tiled.TMXUtils.decode(child, child.attributes.encoding, child.attributes.compression));
                            break;
                        case tiled.TMXConstants.PROPERTIES:
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
        var d = __define,c=TMXLayer,p=c.prototype;
        d(p, "staticContainer"
            /**
             * 获取静态层容器（用于渲染静态对象）
             * @version Egret 3.0.3
             */
            ,function () {
                return this._staticContainer;
            }
        );
        d(p, "animationContainer"
            /**
             * 获取动画层容器（用于渲染动画）
             * @version Egret 3.0.3
             */
            ,function () {
                return this._animationContainer;
            }
        );
        d(p, "tilewidth"
            /**
             * 获取tile宽
             * @version Egret 3.0.3
             */
            ,function () {
                return this._tilewidth;
            }
        );
        d(p, "tileheight"
            /**
             * 获取tile高
             * @version Egret 3.0.3
             */
            ,function () {
                return this._tileheight;
            }
        );
        d(p, "orientation"
            /**
             * 获取渲染方向
             * @version Egret 3.0.3
             */
            ,function () {
                return this._orientation;
            }
        );
        d(p, "rows"
            /**
             * 获取水平格子数
             * @version Egret 3.0.3
             */
            ,function () {
                return this._rows;
            }
        );
        d(p, "cols"
            /**
             * 获取垂直格子数
             * @version Egret 3.0.3
             */
            ,function () {
                return this._cols;
            }
        );
        d(p, "hexsidelength"
            /**
             * @version Egret 3.0.3
             */
            ,function () {
                return this._hexsidelength;
            }
        );
        d(p, "staggeraxis"
            /**
             * @version Egret 3.0.3
             */
            ,function () {
                return this._staggeraxis;
            }
        );
        d(p, "staggerindex"
            /**
             * @version Egret 3.0.3
             */
            ,function () {
                return this.staggerindex;
            }
        );
        d(p, "opacity"
            /**
             * 获取透明度
             * @version Egret 3.0.3
             */
            ,function () {
                return this._opacity;
            }
        );
        d(p, "properties"
            /**
             * 获取图层属性列表
             * @version Egret 3.0.3
             */
            ,function () {
                return this._properties;
            }
        );
        /**
         * 设置渲染器
         * @param renderer 渲染器(包括：1、TMXHexagonoalRenderer,2、TMXIsometricRenderer,3、TMXOrthogonalRenderer)
         * @version Egret 3.0.3
         */
        p.setRenderer = function (renderer) {
            this.renderer = renderer;
        };
        /**
         * 根据像素坐标获取Tile Id
         * @param x 水平像素坐标
         * @param y 垂直像素坐标
         * @version Egret 3.0.3
         */
        p.getTileId = function (x, y) {
            var tile = this.getTile(x, y);
            return tile ? tile.gid : 0;
        };
        /**
         * 根据像素坐标获取格子信息
         * @param x 水平像素坐标
         * @param y 垂直像素坐标
         * @version Egret 3.0.3
         */
        p.getTile = function (x, y) {
            if (this.renderer instanceof tiled.TMXOrthogonalRenderer) {
                return this.layerData[~~this.renderer.pixelToTileX(x)][~~this.renderer.pixelToTileY(y)];
            }
            else if (this.renderer instanceof tiled.TMXIsometricRenderer) {
                return this.layerData[~~this.renderer.pixelToTileX(x, y)][~~this.renderer.pixelToTileY(y, x)];
            }
            return this.layerData[~~this.renderer.pixelToTileX(x, y)][~~this.renderer.pixelToTileY(y, x)];
        };
        /**
         * TMXTileMap#setLayerData调用
         * @param tileX 水平格子坐标
         * @param tileY 垂直格子坐标
         * @param tileId tileset所对应的id
         * @version Egret 3.0.3
         */
        p.setTile = function (tileX, tileY, tileId) {
            if (!this.tileset.contains(tileId))
                this.tileset = this._tilesets.getTilesetByGid(tileId);
            if (this.tileset) {
                var tile = this.layerData[tileX][tileY] = new tiled.TMXTile(tileX, tileY, tileId, this.tilemap, this.tileset);
                return tile;
            }
            return null;
        };
        /**
         * 清除Tile
         * @param tileX 水平格子坐标
         * @param tileY 垂直格子坐标
         * @version Egret 3.0.3
         */
        p.clearTile = function (tileX, tileY) {
            this.layerData[tileX][tileY] = null;
        };
        /**
         * 绘制
         * @param rect 要绘制的矩形区域
         * @version Egret 3.0.3
         */
        p.draw = function (rect) {
            this.renderer.drawTileLayer(this, rect);
        };
        /**
         * 渲染
         * @version Egret 3.0.3
         */
        p.render = function () {
            this.renderer.render(this._animationContainer);
        };
        /**
         * 根据水平格子数与垂直格子数初始化图层数据
         * @param rows 水平格子数
         * @param cols 垂直格子数
         * @version Egret 3.0.3
         */
        p.initArray = function (rows, cols) {
            this.layerData = [];
            for (var x = 0; x < rows; x++) {
                this.layerData[x] = [];
                for (var y = 0; y < cols; y++) {
                    this.layerData[x][y] = null;
                }
            }
        };
        /**
         * 解析图层数据
         * @param data
         * @version Egret 3.0.3
         */
        p.parseLayerData = function (data) {
            if (data) {
                var idx = 0;
                for (var y = 0; y < this.rows; y++) {
                    for (var x = 0; x < this.cols; x++) {
                        var gid = data[idx];
                        if (gid !== 0)
                            this.setTile(x, y, gid);
                        idx++;
                    }
                }
            }
        };
        return TMXLayer;
    })(tiled.TMXLayerBase);
    tiled.TMXLayer = TMXLayer;
    egret.registerClass(TMXLayer,'tiled.TMXLayer');
})(tiled || (tiled = {}));

var tiled;
(function (tiled) {
    //可能存在普通对象，也可能存在动画
    var TMXObject = (function (_super) {
        __extends(TMXObject, _super);
        /**
         * 创建一个Tile对象实例
         * @param data 数据
         * @param orientation 渲染方向
         * @param tilesets TMXTilesetGroup实例
         * @param z 对象所在的层深
         * @param color 对象所使用的颜色
         * @version Egret 3.0.3
         */
        function TMXObject(data, orientation, tilesets, z, color) {
            _super.call(this);
            this._points = undefined;
            this._name = data.attributes.name;
            this.x = +data.attributes.x;
            this.y = +data.attributes.y;
            this._z = +z;
            this.width = +data.attributes.width || 0;
            this.height = +data.attributes.height || 0;
            this._gid = +data.attributes.gid || null;
            this._type = data.attributes.type;
            this.rotation = +data.attributes.rotation || 0;
            this._id = +data.attributes.id || undefined;
            this._orientation = orientation;
            this._shapes = undefined;
            this._color = color;
            this._isEllipse = false;
            this._isPolygon = false;
            this._isPolyLine = false;
            this.visible = (typeof data.attributes.visible !== "undefined") ? Boolean(+data.attributes.visible) : true;
            // 检测当前对象是否已经分配了gid(只有图块对象层才会分配gid)
            if (typeof this._gid === "number") {
                this._isImage = true;
                this.setTile(tilesets);
            }
            else {
                this._points = [];
                var self = this;
                var children = data.children;
                if (children) {
                    for (var i = 0; i < children.length; i++) {
                        var child = children[i];
                        switch (child.localName) {
                            case tiled.TMXConstants.ELLIPSE:
                                this._isEllipse = true;
                                this._isImage = false;
                                this._ellipse = this.parseEllipse(child);
                                break;
                            case tiled.TMXConstants.POLYGON:
                                this._isPolygon = true;
                                this._isImage = false;
                                this._points = this.parsePolygonOrPolyline(child.attributes.points);
                                break;
                            case tiled.TMXConstants.POLYLINE:
                                this._isPolyLine = true;
                                this._isImage = false;
                                this._points = this.parsePolygonOrPolyline(child.attributes.points);
                                break;
                            case tiled.TMXConstants.PROPERTIES:
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
        var d = __define,c=TMXObject,p=c.prototype;
        d(p, "id"
            /**
             * 对象自增长id
             * @version Egret 3.0.3
             */
            ,function () {
                return this._id;
            }
        );
        d(p, "gid"
            /**
             * tileset中对应的id
             * @version Egret 3.0.3
             */
            ,function () {
                return this._gid;
            }
        );
        d(p, "name"
            /**
             * 对象名称
             * @version Egret 3.0.3
             */
            ,function () {
                return this._name;
            }
        );
        d(p, "type"
            /**
             * 对象类型
             * @version Egret 3.0.3
             */
            ,function () {
                return this._type;
            }
        );
        d(p, "z"
            /**
             * 对象所在层深
             * @version Egret 3.0.3
             */
            ,function () {
                return this._z;
            }
        );
        d(p, "isEllipse"
            /**
             * 当前对象是否是椭圆
             * @version Egret 3.0.3
             */
            ,function () {
                return this._isEllipse;
            }
        );
        d(p, "isPolygon"
            /**
             * 当前对象是否为多边形
             * @version Egret 3.0.3
             */
            ,function () {
                return this._isPolygon;
            }
        );
        d(p, "isPolyLine"
            /**
             * 当前对象是否为折线
             * @version Egret 3.0.3
             */
            ,function () {
                return this._isPolyLine;
            }
        );
        d(p, "isImage"
            /**
             * 当前对象是否为图像
             * @version Egret 3.0.3
             */
            ,function () {
                return this._isImage;
            }
        );
        /**
         * 解析多边形或者折线数据
         * @param $points
         * @version Egret 3.0.3
         */
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
        /**
         * 解析椭圆数据
         * @param $data
         * @version Egret 3.0.3
         */
        p.parseEllipse = function ($data) {
            var _width = +$data.attributes.width || 32;
            var _height = +$data.attributes.height || 32;
            return [_width, _height];
        };
        /**
         * 解析多种对象（包括：椭圆，多边形，折线等）
         * @version Egret 3.0.3
         */
        p.parseTMXShapes = function () {
            var shapes = [];
            if (this._isEllipse) {
                var _ellipse = new tiled.Ellipse(0, 0, this.width, this.height);
                _ellipse.draw(this._color);
                shapes.push(_ellipse);
            }
            else if (this._isPolygon) {
                var _polygon = new tiled.Polygon(0, 0, this._points);
                _polygon.draw(this._color);
                shapes.push(_polygon);
            }
            else if (this._isPolyLine) {
                var _polyline = new tiled.PolyLine(0, 0, this._points);
                _polyline.draw(this._color);
                shapes.push(_polyline);
            }
            else {
                if (!this._gid) {
                    var _polygon = new tiled.Polygon(0, 0, [[0, 0], [this.width, 0], [this.width, this.height], [0, this.height]]);
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
        /**
         * 设置Tile
         * @param tilesets TMXTileset实例
         * @version Egret 3.0.3
         */
        p.setTile = function (tilesets) {
            var tileset = tilesets.getTilesetByGid(this._gid);
            if (tileset) {
                var image = tileset.image;
                if (image) {
                    this._tile = new tiled.TMXTile(0, 0, this.gid, tileset.tilemap, tileset);
                    tileset.drawTile(this, tileset.tileoffset.x, tileset.tileoffset.y - tileset.tileheight, this._tile);
                }
            }
        };
        return TMXObject;
    })(egret.Sprite);
    tiled.TMXObject = TMXObject;
    egret.registerClass(TMXObject,'tiled.TMXObject');
})(tiled || (tiled = {}));

var tiled;
(function (tiled) {
    var TMXObjectGroup = (function (_super) {
        __extends(TMXObjectGroup, _super);
        /**
         * 创建1个对象组
         * @param data 数据
         * @param orientation 渲染方向
         * @param tilesets TMXTilset实例
         * @param z 对象组所在的层
         * @version Egret 3.0.3
         */
        function TMXObjectGroup(data, orientation, tilesets, z) {
            _super.call(this);
            this._name = data.attributes.name;
            this._opacity = (typeof data.attributes.opacity !== "undefined") ? +data.attributes.opacity : 1;
            this._draworder = data.attributes.draworder;
            this._color = data.attributes.color ? (tiled.TMXUtils.color16ToUnit(data.attributes.color)) : tiled.TMXConstants.DEFAULT_COLOR;
            this._orientaion = orientation;
            this._tilesets = tilesets;
            this._z = z;
            this.visible = (typeof data.attributes.visible !== "undefined") ? Boolean(+data.attributes.visible) : true;
            this._objects = [];
            this._objectHash = {};
            this._childrens = data.children;
        }
        var d = __define,c=TMXObjectGroup,p=c.prototype;
        d(p, "name"
            /**
             * 对象组名称
             * @version Egret 3.0.3
             */
            ,function () {
                return this._name;
            }
        );
        p.draw = function () {
            if (this._childrens) {
                for (var i = 0; i < this._childrens.length; i++) {
                    var object = new tiled.TMXObject(this._childrens[i], this._orientaion, this._tilesets, this._z, this._color);
                    object.alpha = this._opacity;
                    this._objects[i] = object;
                    this.addChild(object);
                    this._objectHash[object.id] = object;
                }
            }
        };
        /**
         * 渲染
         * @version Egret 3.0.3
         */
        p.render = function () {
        };
        /**
         * 销毁
         * @version Egret 3.0.3
         */
        p.destory = function () {
            this._objects = null;
        };
        /**
         * 根据对象id获取TMXObject实例
         * @param id 对象id，在tmx数据中是由tiled工具生成的
         * @version Egret 3.0.3
         */
        p.getObjectById = function (id) {
            return this._objectHash[id];
        };
        /**
         * 根据对象id移除TMXObject实例
         * @param id 对象id，在tmx数据中是由tiled工具生成的
         * @version Egret 3.0.3
         */
        p.removeObjectById = function (id) {
            var object = this.getObjectById(id);
            if (object && object.parent)
                object.parent.removeChild(object);
        };
        /**
         * 根据对象id显示或者隐藏对象
         * @param id 对象id，在tmx数据中是由tiled工具生成的
         * @param visible 是否显示
         * @version Egret 3.0.3
         */
        p.showHideObjectById = function (id, visible) {
            var object = this.getObjectById(id);
            if (object)
                object.visible = true;
        };
        /**
         * 获取对象组中对象长度
         * @version Egret 3.0.3
         */
        p.getObjectCount = function () {
            return this._objects.length;
        };
        /**
         * 根据索引获取TMXObject实例
         * @param index 对象所在对象组中的索引
         * @version Egret 3.0.3
         */
        p.getObjectByIndex = function (index) {
            return this._objects[index];
        };
        /**
         * 根据索引移除对象
         * @param index  对象所在对象组中的索引
         * @version Egret 3.0.3
         */
        p.removeObjectByIndex = function (index) {
            var object = this.getObjectByIndex(index);
            if (object && object.parent)
                object.parent.removeChild(object);
        };
        return TMXObjectGroup;
    })(egret.Sprite);
    tiled.TMXObjectGroup = TMXObjectGroup;
    egret.registerClass(TMXObjectGroup,'tiled.TMXObjectGroup');
})(tiled || (tiled = {}));

var tiled;
(function (tiled) {
    var Base64 = (function () {
        function Base64() {
        }
        var d = __define,c=Base64,p=c.prototype;
        d(Base64, "nativeBase64"
            /**
             * 判断是否原生支持Base64位解析
             * @version Egret 3.0.3
             */
            ,function () {
                return (typeof (window.atob) === "function");
            }
        );
        /**
         * 解码
         * @param input
         * @version Egret 3.0.3
         */
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
        /**
         * 编码
         * @param input
         * @version Egret 3.0.3
         */
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
        /**
         * 解析Base64格式数据
         * @param input
         * @param bytes
         * @version egret 3.0.3
         */
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
        /**
         * 暂时不支持
         * @param data
         * @param decoded
         * @param compression
         * @version egret 3.0.3
         * @private
         */
        Base64.decompress = function (data, decoded, compression) {
            throw new Error("GZIP/ZLIB compressed TMX Tile Map not supported!");
        };
        /**
         * 解析csv数据
         * @param input
         * @version egret 3.0.3
         */
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
    tiled.Base64 = Base64;
    egret.registerClass(Base64,'tiled.Base64');
})(tiled || (tiled = {}));

var tiled;
(function (tiled) {
    var TMXUtils = (function () {
        function TMXUtils() {
        }
        var d = __define,c=TMXUtils,p=c.prototype;
        /**
         * 快速创建TMX地图
         * @param $renderwidth 渲染宽（单位：像素）
         * @param $renderheight 渲染高（单位：像素）
         * @param $url tmx文件地址
         * @param $parentContainer 渲染容器
         * @param $onComplete 创建完成回去调
         * @param $thisObject 回调函数绑定this对象
         *
         * @version Egret 3.0.3
         */
        TMXUtils.create = function ($renderwidth, $renderheight, $url, $parentContainer, $onComplete, $thisObject) {
            if ($onComplete === void 0) { $onComplete = null; }
            if ($thisObject === void 0) { $thisObject = null; }
            RES.getResByUrl($url, function (data) {
                try {
                    var data = egret.XML.parse(data);
                }
                catch (e) {
                    throw new Error("tmx文件格式不正确！");
                }
                var tmxTileMap = new tiled.TMXTilemap($renderwidth, $renderheight, data, $url);
                tmxTileMap.render();
                $parentContainer.addChild(tmxTileMap);
                if ($onComplete)
                    $onComplete.apply($thisObject);
            }, this, RES.ResourceItem.TYPE_XML);
        };
        /**
         * 解码
         * @param data 数据
         * @param encoding 编码方式 目前暂时只支持XML、base64(无压缩)、csv解析
         * @param compression 压缩方式
         * @returns 返回解析后的数据列表
         *
         * @version Egret 3.0.3
         */
        TMXUtils.decode = function (data, encoding, compression) {
            compression = compression || "none";
            encoding = encoding || "none";
            var text = data.children[0].text;
            switch (encoding) {
                case "base64":
                    var decoded = tiled.Base64.decodeBase64AsArray(text, 4);
                    return (compression === "none") ? decoded : tiled.Base64.decompress(text, decoded, compression);
                    break;
                case "csv":
                    return tiled.Base64.decodeCSV(text);
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
        /**
         * 将带"#"号的颜色字符串转换为16进制的颜色,例如：可将"#ff0000"转换为"0xff0000"
         * @param $color 要转换的颜色字符串
         * @returns 返回16进制的颜色值
         * @version Egret 3.0.3
         */
        TMXUtils.color16ToUnit = function ($color) {
            var colorStr = "0x" + $color.slice(1);
            return parseInt(colorStr, 16);
        };
        return TMXUtils;
    })();
    tiled.TMXUtils = TMXUtils;
    egret.registerClass(TMXUtils,'tiled.TMXUtils');
})(tiled || (tiled = {}));

