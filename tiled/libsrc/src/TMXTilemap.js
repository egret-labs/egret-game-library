var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var tiled;
(function (tiled) {
    var TMXTilemap = /** @class */ (function (_super) {
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
            var _this = _super.call(this) || this;
            _this._tmxRenderer = null;
            _this._data = data;
            _this._renderWidth = renderwidth;
            _this._renderHeight = renderheight;
            _this._rows = +data.attributes.width; //水平方向格子数量
            _this._cols = +data.attributes.height; //垂直方向格子数量
            _this._tilewidth = +data.attributes.tilewidth;
            _this._tileheight = +data.attributes.tileheight;
            _this._nextobjectid = +data.attributes.nextobjectid;
            _this._version = +data.attributes.version;
            _this._orientation = data.attributes.orientation;
            _this._renderorder = data.attributes.renderorder;
            _this._baseURL = url;
            _this._baseURL = decodeURIComponent(_this._baseURL);
            var lastIndex = _this._baseURL.lastIndexOf("/");
            _this._baseURL = _this._baseURL.slice(0, lastIndex + 1);
            if (_this._orientation === tiled.TMXConstants.ORIENTATION_ISOMETRIC) {
                _this.width = (_this._rows + _this._cols) * (_this._tilewidth / 2);
                _this.height = (_this._rows + _this._cols) * (_this._tileheight / 2);
            }
            else {
                _this.width = _this._rows * _this._tilewidth;
                _this.height = _this._cols * _this._tileheight;
            }
            _this._hexsidelength = +data.attributes.hexsidelength;
            _this._staggeraxis = data.attributes.staggeraxis || undefined;
            _this._staggerindex = data.attributes.staggerindex || undefined;
            _this._backgroundcolor = data.attributes.backgroundcolor;
            _this._z = 0;
            _this._layers = [];
            //初始化默认的渲染
            if (_this._tmxRenderer === null || !_this._tmxRenderer.canRender(_this)) {
                _this._tmxRenderer = _this.getNewDefaultRenderer(_this);
            }
            _this._initialized = false;
            return _this;
        }
        Object.defineProperty(TMXTilemap.prototype, "nextobjectid", {
            get: function () {
                return this._nextobjectid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TMXTilemap.prototype, "tilewidth", {
            /**
             * 获取格子宽（单位：像素）
             * @version egret 3.0.3
             */
            get: function () {
                return this._tilewidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TMXTilemap.prototype, "tileheight", {
            /**
             * 获取格子高（单位：像素）
             * @version egret 3.0.3
             */
            get: function () {
                return this._tileheight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TMXTilemap.prototype, "rows", {
            /**
             * 获取场景水平方向格子数
             * @version egret 3.0.3
             */
            get: function () {
                return this._rows;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TMXTilemap.prototype, "cols", {
            /**
             * 获取场景垂直方向格子数
             * @version egret 3.0.3
             */
            get: function () {
                return this._cols;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TMXTilemap.prototype, "baseURL", {
            /**
             * 获取基本地址
             * @version egret 3.0.3
             */
            get: function () {
                return this._baseURL;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TMXTilemap.prototype, "renderwidth", {
            /**
             * 获取渲染宽（单位：像素）
             * @version egret 3.0.3
             */
            get: function () {
                return this._renderWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TMXTilemap.prototype, "renderheight", {
            /**
             * 获取渲染高（单位：像素）
             * @version egret 3.0.3
             */
            get: function () {
                return this._renderHeight;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 渲染
         * @version egret 3.0.3
         */
        TMXTilemap.prototype.render = function () {
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
        TMXTilemap.prototype.getLayers = function () {
            this.readMapObjects(this._data);
            return this._layers;
        };
        /**
         * 获取对应名称图层
         * @version egret 3.0.3
         */
        TMXTilemap.prototype.getLayerByName = function (name) {
            var layers = this.getLayers();
            for (var _i = 0, layers_1 = layers; _i < layers_1.length; _i++) {
                var l = layers_1[_i];
                if (l.name == name) {
                    return l;
                }
            }
            return undefined;
        };
        /**
         * 获取所有的对象数据
         * @version egret 3.0.3
         */
        TMXTilemap.prototype.getObjects = function () {
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
        TMXTilemap.prototype.parseProperties = function (data) {
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
        TMXTilemap.prototype.showHideBackground = function (isShow) {
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
        TMXTilemap.prototype.destory = function () {
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
        TMXTilemap.prototype.readMapObjects = function (data) {
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
                for (var j = 0; j < tileset.images.length; j++) {
                    var _image = tileset.images[j];
                    var onImageLoad = function (event) {
                        var target = event.currentTarget;
                        target.removeEventListener(tiled.TMXImageLoadEvent.IMAGE_COMPLETE, onImageLoad, this);
                        loadCount++;
                        if (loadCount == this._tilesets.imagelength) {
                            self.dispatchEvent(new tiled.TMXImageLoadEvent(tiled.TMXImageLoadEvent.ALL_IMAGE_COMPLETE));
                        }
                    };
                    _image.addEventListener(tiled.TMXImageLoadEvent.IMAGE_COMPLETE, onImageLoad, this);
                }
            }
            this._initialized = true;
        };
        /**
         * 开始渲染
         * @param event
         */
        TMXTilemap.prototype.onStartRendering = function (event) {
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
        TMXTilemap.prototype.getNewDefaultRenderer = function (obj) {
            switch (obj._orientation) {
                case "orthogonal":
                    return new tiled.TMXOrthogonalRenderer(obj.rows, obj.cols, obj.tilewidth, obj.tileheight);
                case "isometric":
                    return new tiled.TMXIsometricRenderer(obj.rows, obj.cols, obj.tilewidth, obj.tileheight);
                case "hexagonal":
                    return new tiled.TMXHexagonalRenderer(obj.rows, obj.cols, obj.tilewidth, obj.tileheight, obj._hexsidelength, obj._staggeraxis, obj._staggerindex);
                default:
                    throw new Error(obj._orientation + " type TMX Tile Map not supported!");
            }
        };
        /**
         * 解析图层数据
         * @param data 传入的图层数据
         * @param z 图层深度
         */
        TMXTilemap.prototype.parseLayer = function (data, z) {
            var layer = new tiled.TMXLayer(this, this._tilewidth, this._tileheight, this._orientation, this._tilesets, z, data);
            //渲染图层
            if (this._tmxRenderer.canRender(layer))
                layer.setRenderer(this._tmxRenderer);
            else
                layer.setRenderer(this.getNewDefaultRenderer(this));
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
        TMXTilemap.prototype.parseObjectGroup = function (data, z) {
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
        TMXTilemap.prototype.parseTileset = function (data) {
            return new tiled.TMXTileset(this, data);
        };
        /**
         * 解析imagelayer(此类型的图层不参与渲染方向更新)
         * @param data
         * @param z
         */
        TMXTilemap.prototype.parseImageLayer = function (data, z) {
            var self = this;
            var imageLayer = new tiled.TMXImageLayer(this, data, z);
            var onImageLoad = function (event) {
                this.draw(new egret.Rectangle(0, 0, self._renderWidth, self._renderHeight));
            };
            imageLayer.addEventListener(tiled.TMXImageLoadEvent.IMAGE_COMPLETE, onImageLoad, imageLayer);
            return imageLayer;
        };
        /**
         * 像素坐标转化为格子坐标
         * @param x 水平像素坐标
         * @param y 垂直像素坐标
         * @version Egret 3.0.3
         */
        TMXTilemap.prototype.pixelToTileCoords = function (x, y) {
            return this._tmxRenderer.pixelToTileCoords(x, y);
        };
        /**
         * 返回指定的瓦片对应的像素位置
         * @param q
         * @param r
         * @version Egret 3.0.3
         */
        TMXTilemap.prototype.tileToPixelCoords = function (q, r) {
            return this._tmxRenderer.tileToPixelCoords(q, r);
        };
        return TMXTilemap;
    }(egret.Sprite));
    tiled.TMXTilemap = TMXTilemap;
})(tiled || (tiled = {}));
