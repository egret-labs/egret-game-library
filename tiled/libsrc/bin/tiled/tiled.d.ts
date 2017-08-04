declare module tiled {
    class TMXLayerBase extends egret.Sprite implements ILayer {
        protected _tilemap: tiled.TMXTilemap;
        protected _data: any;
        protected _z: number;
        /**
         * 图层基类
         * @param tilemap TMXTilemap实例
         * @param data
         * @param z 图层层深
         * @version Egret 3.0.3
         */
        constructor(tilemap: tiled.TMXTilemap, data: any, z: number);
        /**
         * 获取TMXTilemap实例
         * @version Egret 3.0.3
         */
        readonly tilemap: TMXTilemap;
        /**
         * 获取图层所在的层深
         * @version Egret 3.0.3
         */
        readonly z: number;
        /**
         * 实现ILayer绘制<code>draw</code>接口
         * @param rect 绘制的矩形区域
         * @version Egret 3.0.3
         */
        draw(rect: egret.Rectangle): void;
    }
}
declare module tiled {
    class TMXRenderer {
        rows: number;
        cols: number;
        tilewidth: number;
        tileheight: number;
        protected animationTiles: any[];
        /**
         * 渲染器基类
         * @param rows 水平方向格子数
         * @param cols 垂直方向格子数
         * @param tilewidth 格子宽（单位：像素）
         * @param tileheight 格子高（单位：像素）
         * @version Egret 3.0.3
         */
        constructor(rows: number, cols: number, tilewidth: number, tileheight: number);
        /**
         * 是否能够渲染
         * @param layer
         * @version Egret 3.0.3
         * @private
         */
        canRender(layer: any): boolean;
        /**
         * 绘制Tile图层
         * @param layer
         * @param rect
         * @version Egret 3.0.3
         */
        drawTileLayer(layer: tiled.TMXLayer, rect: egret.Rectangle): void;
        /**
         * 绘制Tile
         * @param renderer 渲染容器
         * @param tileX 水平格子坐标
         * @param tileY 垂直格子坐标
         * @param tile TMXTile实例
         * @version Egret 3.0.3
         */
        drawTile(renderer: egret.Sprite, tileX: number, tileY: number, tile: tiled.TMXTile): void;
        /**
         * 渲染动画
         * @param renderContainer
         * @version Egret 3.0.3
         */
        render(renderContainer: egret.Sprite): void;
    }
}
declare module tiled {
    /**
     * 属性VO,存储map、tileset、tile相关属性数据
     */
    class TMXProperty {
        /**
         * id
         * @version Egret 3.0.3
         * */
        gid: number;
        /**
         * 属性名
         * @version Egret 3.0.3
         * */
        name: string;
        /**
         * 属性值
         * @version Egret 3.0.3
         * */
        value: string;
    }
}
declare module tiled {
    /**
     * TMX常量数据
     */
    class TMXConstants {
        /**
         * @version Egret 3.0.3
         */
        static TMX_FLIP_H: number;
        /**
         * @version Egret 3.0.3
         */
        static TMX_FLIP_V: number;
        /**
         * @version Egret 3.0.3
         */
        static TMX_FLIP_AD: number;
        /**
         * @version Egret 3.0.3
         */
        static TMX_CLEAR_BIT_MASK: number;
        /**
         * 图层
         * @version Egret 3.0.3
         */
        static LAYER: string;
        /**
         * 对象组
         * @version Egret 3.0.3
         */
        static OBJECT_GROUP: string;
        /**
         * 属性
         * @version Egret 3.0.3
         */
        static PROPERTIES: string;
        /**
         * 数据
         * @version Egret 3.0.3
         */
        static DATA: string;
        /**
         * 对象
         * @version Egret 3.0.3
         */
        static OBJECT: string;
        /**
         * 图像
         * @version Egret 3.0.3
         */
        static IMAGE: string;
        /**
         * 图像层
         * @version Egret 3.0.3
         */
        static IMAGE_LAYER: string;
        /**
         * Tile设置
         * @version Egret 3.0.3
         */
        static TILE_SET: string;
        /**
         * Tile
         * @version Egret 3.0.3
         */
        static TILE: string;
        /**
         * Tile偏移
         * @version Egret 3.0.3
         */
        static TILE_OFFSET: string;
        /**
         * 动画
         * @version Egret 3.0.3
         */
        static ANIMATION: string;
        /**
         * 默认颜色
         * @version Egret 3.0.3
         */
        static DEFAULT_COLOR: number;
        /**
         * 绘图索引
         * @version Egret 3.0.3
         */
        static DRAWORDER_INDEX: string;
        /**
         * 多边形
         * @version Egret 3.0.3
         */
        static POLYGON: string;
        /**
         * 折线
         * @version Egret 3.0.3
         */
        static POLYLINE: string;
        /**
         * 椭圆
         * @version Egret 3.0.3
         */
        static ELLIPSE: string;
        /**
         * tile对象组
         * @version Egret 3.0.3
         */
        static TILE_OBJECT_GROUP: string;
        /**
         * 正交
         * @version Egret 3.0.3
         */
        static ORIENTATION_ORTHOGONAL: string;
        /**
         * 等矩
         * @version Egret 3.0.3
         */
        static ORIENTATION_ISOMETRIC: string;
        /**
         * 交错
         * @version Egret 3.0.3
         */
        static ORIENTATION_STAGGERED: string;
        /**
         * 六角
         * @version Egret 3.0.3
         */
        static ORIENTATION_HEXAGONAL: string;
    }
}
declare module tiled {
    class TMXImageLoadEvent extends egret.Event {
        /**
         * 单张图片加载完成
         * @version Egret 3.0.3
         */
        static IMAGE_COMPLETE: string;
        /**
         * 所有图片加载完成
         * @version Egret 3.0.3
         */
        static ALL_IMAGE_COMPLETE: string;
        /**
         * 当前图片加载完成的纹理
         * @version Egret 3.0.3
         */
        texture: egret.Texture;
        /**
         * Tile中图片加载完成事件
         * @param type 事件的类型，可以作为 TMXImageLoadEvent.type 访问。
         * @param texture 事件在IMAGE_COMPLETE完成后所带的纹理
         * @param bubbles 确定 TMXImageLoadEvent 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 确定是否可以取消 TMXImageLoadEvent 对象。默认值为 false。
         * @version Egret 3.0.3
         */
        constructor(type: string, texture?: egret.Texture, bubbles?: boolean, cancelable?: boolean);
    }
}
declare module tiled {
    interface ILayer {
        /**
         * 图层绘制的公用接口
         * @see tiled.TMXLayerBase#draw
         * @see tiled.TMXImageLayer#draw
         * @see tiled.TMXLayer#draw
         */
        draw(rect: egret.Rectangle): void;
    }
}
declare module tiled {
    class TMXColorLayer extends egret.Sprite {
        private _color;
        private _z;
        private _tilemap;
        /**
         * 创建1个Tile颜色图层
         * @param tilemap TMXTilemap实例
         * @param color 颜色值，格式#ff0000
         * @param z 图层深度
         * @version Egret 3.0.3
         */
        constructor(tilemap: tiled.TMXTilemap, color: string, z: number);
    }
}
declare module tiled {
    class TMXImageLayer extends TMXLayerBase {
        private _name;
        private _imagewidth;
        private _imageheight;
        private _opacity;
        private _source;
        private _transColor;
        private _properties;
        private _bitmap;
        private _sourcebitmap;
        private _texture;
        /**
         * 创建1个图像图层实例
         * @param tilemap TMXTilemap实例
         * @param data 图像图层数据
         * @param z 层深
         * @version Egret 3.0.3
         */
        constructor(tilemap: tiled.TMXTilemap, data: any, z: number);
        /**
         * 获取图像图层的位图，如果源图像没有加载完成，那么，数据为空
         * @version Egret 3.0.3
         */
        readonly bitmap: egret.Bitmap;
        /**
         * 获取图像图层的纹理，如果源图像没有加载完成，那么，数据为空
         * @version Egret 3.0.3
         */
        readonly texture: egret.Texture;
        /**
         * 创建图像图层的透明度
         * @version Egret 3.0.3
         */
        readonly alpha: number;
        /**
         * 加载图片
         * @param $url 图片地址
         * @version Egret 3.0.3
         */
        private loadImage(url);
        /**
         * 绘制矩形区域内的图像
         * @param rect 矩形区域
         * @version Egret 3.0.3
         */
        draw(rect: egret.Rectangle): void;
    }
}
declare module tiled {
    class TMXLayer extends TMXLayerBase {
        private _tilewidth;
        private _tileheight;
        private _orientation;
        private _tilesets;
        private _name;
        private _cols;
        private _rows;
        private _hexsidelength;
        private _staggeraxis;
        private _staggerindex;
        private _opacity;
        private renderer;
        private _properties;
        private _staticContainer;
        private _animationContainer;
        layerData: Array<Array<tiled.TMXTile>>;
        tileset: tiled.TMXTileset;
        maxTileSize: any;
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
        constructor(tilemap: tiled.TMXTilemap, tilewidth: number, tileheight: number, orientation: string, tilesets: tiled.TMXTilesetGroup, z: number, data: any);
        /**
         * 返回层的名字
         * @version Egret 3.0.3
         */
        readonly name: string;
        /**
         * 获取静态层容器（用于渲染静态对象）
         * @version Egret 3.0.3
         */
        readonly staticContainer: egret.Sprite;
        /**
         * 获取动画层容器（用于渲染动画）
         * @version Egret 3.0.3
         */
        readonly animationContainer: egret.Sprite;
        /**
         * 获取tile宽
         * @version Egret 3.0.3
         */
        readonly tilewidth: number;
        /**
         * 获取tile高
         * @version Egret 3.0.3
         */
        readonly tileheight: number;
        /**
         * 获取渲染方向
         * @version Egret 3.0.3
         */
        readonly orientation: string;
        /**
         * 获取水平格子数
         * @version Egret 3.0.3
         */
        readonly rows: number;
        /**
         * 获取垂直格子数
         * @version Egret 3.0.3
         */
        readonly cols: number;
        /**
         * @version Egret 3.0.3
         */
        readonly hexsidelength: number;
        /**
         * @version Egret 3.0.3
         */
        readonly staggeraxis: string;
        /**
         * @version Egret 3.0.3
         */
        readonly staggerindex: any;
        /**
         * 获取透明度
         * @version Egret 3.0.3
         */
        readonly opacity: number;
        /**
         * 获取图层属性列表
         * @version Egret 3.0.3
         */
        readonly properties: TMXProperty[];
        /**
         * 设置渲染器
         * @param renderer 渲染器(包括：1、TMXHexagonoalRenderer,2、TMXIsometricRenderer,3、TMXOrthogonalRenderer)
         * @version Egret 3.0.3
         */
        setRenderer(renderer: tiled.TMXRenderer): void;
        /**
         * 根据像素坐标获取Tile Id
         * @param x 水平像素坐标
         * @param y 垂直像素坐标
         * @version Egret 3.0.3
         */
        getTileId(x: number, y: number): number;
        /**
         * 根据像素坐标获取格子信息
         * @param x 水平像素坐标
         * @param y 垂直像素坐标
         * @version Egret 3.0.3
         */
        getTile(x: number, y: number): tiled.TMXTile;
        /**
         * TMXTileMap#setLayerData调用
         * @param tileX 水平格子坐标
         * @param tileY 垂直格子坐标
         * @param tileId tileset所对应的id
         * @version Egret 3.0.3
         */
        setTile(tileX: number, tileY: number, tileId: number): tiled.TMXTile;
        /**
         * 清除Tile
         * @param tileX 水平格子坐标
         * @param tileY 垂直格子坐标
         * @version Egret 3.0.3
         */
        clearTile(tileX: number, tileY: number): void;
        /**
         * 绘制
         * @param rect 要绘制的矩形区域
         * @version Egret 3.0.3
         */
        draw(rect: egret.Rectangle): void;
        /**
         * 渲染
         * @version Egret 3.0.3
         */
        render(): void;
        /**
         * 根据水平格子数与垂直格子数初始化图层数据
         * @param rows 水平格子数
         * @param cols 垂直格子数
         * @version Egret 3.0.3
         */
        private initArray(rows, cols);
        /**
         * 解析图层数据
         * @param data
         * @version Egret 3.0.3
         */
        private parseLayerData(data);
    }
}
declare module tiled {
    class TMXTilemap extends egret.Sprite {
        private _name;
        private _data;
        private _rows;
        private _cols;
        private _tilewidth;
        private _tileheight;
        private _version;
        private _orientation;
        private _renderorder;
        private _z;
        private _nextobjectid;
        private _hexsidelength;
        private _staggeraxis;
        private _staggerindex;
        private _backgroundcolor;
        private _initialized;
        private _properties;
        private _layers;
        private _tilesets;
        private _tmxRenderer;
        private _showHideBackground;
        private _baseURL;
        private _renderWidth;
        private _renderHeight;
        /**
         * 创建1个TMXTilemap实例对象
         * @param renderwidth 渲染区域宽
         * @param renderheight 渲染区域高
         * @param data tmx文件加载完毕的数据
         * @param url tmx文件地址
         * @version egret 3.0.3
         */
        constructor(renderwidth: number, renderheight: number, data: any, url: string);
        readonly nextobjectid: number;
        /**
         * 获取格子宽（单位：像素）
         * @version egret 3.0.3
         */
        readonly tilewidth: number;
        /**
         * 获取格子高（单位：像素）
         * @version egret 3.0.3
         */
        readonly tileheight: number;
        /**
         * 获取场景水平方向格子数
         * @version egret 3.0.3
         */
        readonly rows: number;
        /**
         * 获取场景垂直方向格子数
         * @version egret 3.0.3
         */
        readonly cols: number;
        /**
         * 获取基本地址
         * @version egret 3.0.3
         */
        readonly baseURL: string;
        /**
         * 获取渲染宽（单位：像素）
         * @version egret 3.0.3
         */
        readonly renderwidth: number;
        /**
         * 获取渲染高（单位：像素）
         * @version egret 3.0.3
         */
        readonly renderheight: number;
        /**
         * 渲染
         * @version egret 3.0.3
         */
        render(): void;
        /**
         * 获取所有的图层
         * @version egret 3.0.3
         */
        getLayers(): Array<any>;
        /**
         * 获取所有的对象数据
         * @version egret 3.0.3
         */
        getObjects(): Array<tiled.TMXObjectGroup>;
        /**
         * 解析属性
         * @param data 属性数据
         * @version egret 3.0.3
         */
        parseProperties(data: any): Array<tiled.TMXProperty>;
        /**
         * 是否显示背景
         * @param isShow
         * @version egret 3.0.3
         */
        showHideBackground(isShow: boolean): void;
        /**
         * 销毁所有数据
         * @version egret 3.0.3
         */
        destory(): void;
        /**
         * 读取地图上的对象
         * @param data
         */
        private readMapObjects(data);
        /**
         * 开始渲染
         * @param event
         */
        private onStartRendering(event);
        /**
         * 建立一个兼容的渲染对象
         * @param obj
         */
        private getNewDefaultRenderer(obj);
        /**
         * 解析图层数据
         * @param data 传入的图层数据
         * @param z 图层深度
         */
        private parseLayer(data, z);
        /**
         * 解析对象组数据
         * @param data 传入的对象组数据
         * @param z 对象深度
         */
        private parseObjectGroup(data, z);
        /**
         * 解析Tileset数据
         * @param data 传入的Tileset数据
         */
        private parseTileset(data);
        /**
         * 解析imagelayer(此类型的图层不参与渲染方向更新)
         * @param data
         * @param z
         */
        private parseImageLayer(data, z);
    }
}
declare module tiled {
    class TMXImage extends egret.EventDispatcher {
        private _source;
        private _width;
        private _height;
        private _trans;
        private _texture;
        private _bitmap;
        /**
         * Tile图像
         * @param data 图像数据
         * @param baseURL 地址前缀
         * @version Egret 3.0.3
         */
        constructor(data: any, baseURL: string);
        /**
         * 获取图像加载完后的纹理
         * @version Egret 3.0.3
         */
        readonly texture: egret.Texture;
        /**
         * 获取图像加载完后的图片
         * @version Egret 3.0.3
         */
        readonly bitmap: egret.Bitmap;
        /**
         * 获取图像加载的源地址
         * @version Egret 3.0.3
         */
        readonly source: string;
        /**
         * 获取图像的原始宽（单位：像素）
         * @version Egret 3.0.3
         */
        readonly width: number;
        /**
         * 获取图像的原始高（单位：像素）
         * @version Egret 3.0.3
         */
        readonly height: number;
        /**
         * 加载图像
         * @param $url
         * @version Egret 3.0.3
         */
        private loadImage(url);
    }
}
declare module tiled {
    class TMXObject extends egret.Sprite {
        private _points;
        private _ellipse;
        private _name;
        private _id;
        private _gid;
        private _z;
        private _type;
        private _orientation;
        private _shapes;
        private _isEllipse;
        private _isPolygon;
        private _isPolyLine;
        private _isImage;
        private _tile;
        private _color;
        private _flippedX;
        private _flippedY;
        private _flippedAD;
        private _flipped;
        private _properties;
        /**
         * 创建一个Tile对象实例
         * @param data 数据
         * @param orientation 渲染方向
         * @param tilesets TMXTilesetGroup实例
         * @param z 对象所在的层深
         * @param color 对象所使用的颜色
         * @version Egret 3.0.3
         */
        constructor(data: any, orientation: any, tilesets: tiled.TMXTilesetGroup, z: number, color: number);
        /**
         * 对象自增长id
         * @version Egret 3.0.3
         */
        readonly id: number;
        /**
         * tileset中对应的id
         * @version Egret 3.0.3
         */
        readonly gid: number;
        /**
         * 对象名称
         * @version Egret 3.0.3
         */
        readonly name: string;
        /**
         * 对象类型
         * @version Egret 3.0.3
         */
        readonly type: string;
        /**
         * 对象所在层深
         * @version Egret 3.0.3
         */
        readonly z: number;
        /**
         * 当前对象是否是椭圆
         * @version Egret 3.0.3
         */
        readonly isEllipse: boolean;
        /**
         * 当前对象是否为多边形
         * @version Egret 3.0.3
         */
        readonly isPolygon: boolean;
        /**
         * 当前对象是否为折线
         * @version Egret 3.0.3
         */
        readonly isPolyLine: boolean;
        /**
         * 当前对象是否为图像
         * @version Egret 3.0.3
         */
        readonly isImage: boolean;
        /**
         * 解析多边形或者折线数据
         * @param $points
         * @version Egret 3.0.3
         */
        private parsePolygonOrPolyline($points);
        /**
         * 解析椭圆数据
         * @param $data
         * @version Egret 3.0.3
         */
        private parseEllipse($data);
        /**
         * 解析多种对象（包括：椭圆，多边形，折线等）
         * @version Egret 3.0.3
         */
        private parseTMXShapes();
        /**
         * 设置Tile
         * @param tilesets TMXTileset实例
         * @version Egret 3.0.3
         */
        private setTile(tilesets);
    }
}
declare module tiled {
    class TMXObjectGroup extends egret.Sprite {
        private _name;
        private _z;
        private _objects;
        private _objectHash;
        private _opacity;
        private _draworder;
        private _color;
        private _orientaion;
        private _childrens;
        private _tilesets;
        type: string;
        /**
         * 创建1个对象组
         * @param data 数据
         * @param orientation 渲染方向
         * @param tilesets TMXTilset实例
         * @param z 对象组所在的层
         * @version Egret 3.0.3
         */
        constructor(data: any, orientation: string, tilesets: tiled.TMXTilesetGroup, z: number);
        /**
         * 对象组名称
         * @version Egret 3.0.3
         */
        readonly name: string;
        draw(): void;
        /**
         * 渲染
         * @version Egret 3.0.3
         */
        render(): void;
        /**
         * 销毁
         * @version Egret 3.0.3
         */
        destory(): void;
        /**
         * 根据对象id获取TMXObject实例
         * @param id 对象id，在tmx数据中是由tiled工具生成的
         * @version Egret 3.0.3
         */
        getObjectById(id: number): tiled.TMXObject;
        /**
         * 根据对象id移除TMXObject实例
         * @param id 对象id，在tmx数据中是由tiled工具生成的
         * @version Egret 3.0.3
         */
        removeObjectById(id: number): void;
        /**
         * 根据对象id显示或者隐藏对象
         * @param id 对象id，在tmx数据中是由tiled工具生成的
         * @param visible 是否显示
         * @version Egret 3.0.3
         */
        showHideObjectById(id: number, visible: boolean): void;
        /**
         * 获取对象组中对象长度
         * @version Egret 3.0.3
         */
        getObjectCount(): number;
        /**
         * 根据索引获取TMXObject实例
         * @param index 对象所在对象组中的索引
         * @version Egret 3.0.3
         */
        getObjectByIndex(index: number): tiled.TMXObject;
        /**
         * 根据索引移除对象
         * @param index  对象所在对象组中的索引
         * @version Egret 3.0.3
         */
        removeObjectByIndex(index: number): void;
    }
}
declare module tiled {
    class TMXAnimation {
        tileX: number;
        tileY: number;
        private _animations;
        private _tiledId;
        private _data;
        private _currentFrame;
        private _tilemap;
        private _tileset;
        oldBitmap: egret.Bitmap;
        /**
         * 创建1个新的tile动画实例
         * @param tilemap TMXTilemap实例引用
         * @param tileset TMXTileset实例引用
         * @param tileX 水平格子坐标
         * @param tileY 垂直格子坐标
         * @param data 动画数据
         * @version egret 3.0.3
         */
        constructor(tilemap: tiled.TMXTilemap, tileset: tiled.TMXTileset, tileX: number, tileY: number, data: any);
        /**
         * 渲染
         * @version egret 3.0.3
         */
        render(): void;
        /**
         * 获取当前运行时动画帧<code>tiled.TMXAnimationFrame</code>实例
         * @version egret 3.0.3
         */
        readonly currentAnimationFrame: TMXAnimationFrame;
        /**
         * 获取动画帧列表
         * @version egret 3.0.3
         */
        readonly animations: TMXAnimationFrame[];
    }
}
declare module tiled {
    class TMXHexagonalRenderer extends TMXRenderer {
        private _hexsidelength;
        private _staggeraxis;
        private _staggerindex;
        private _sidelengthx;
        private _sidelengthy;
        private _sideoffsetx;
        private _sideoffsety;
        private _columnwidth;
        private _rowheight;
        private _centers;
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
        constructor(rows: number, cols: number, tilewidth: number, tileheight: number, hexsidelength: number, staggeraxis: string, staggerindex: string);
        /**
         * 是否可渲染
         * @param layer
         * @version Egret 3.0.3
         */
        canRender(layer: any): boolean;
        /**
         * 像素坐标转化为格子坐标
         * @param x 水平像素坐标
         * @param y 垂直像素坐标
         * @version Egret 3.0.3
         */
        pixelToTileCoords(x: number, y: number): egret.Point;
        /**
         * 像素坐标转换成水平格子坐标
         * @param x 水平像素坐标（单位：像素）
         * @param y 垂直像素坐标（单位：像素）
         * @version Egret 3.0.3
         */
        pixelToTileX(x: number, y: number): number;
        /**
         * 像素坐标转换成垂直格子坐标
         * @param y 垂直像素坐标（单位：像素）
         * @param x 水平像素坐标（单位：像素）
         * @version Egret 3.0.3
         */
        pixelToTileY(y: number, x: number): number;
        /**
         * 返回指定的瓦片对应的像素位置
         * @param q
         * @param r
         * @version Egret 3.0.3
         */
        tileToPixelCoords(q: number, r: number): egret.Point;
        /**
         * 绘制格子
         * @param renderer 渲染容器
         * @param tileX 水平格子坐标
         * @param tileY 垂直格子坐标
         * @param tile TMXTile实例
         * @version Egret 3.0.3
         */
        drawTile(renderer: egret.Sprite, tileX: number, tileY: number, tile: tiled.TMXTile): void;
        /**
         * 绘制图层
         * @param layer 图层
         * @param rect 绘制区域
         * @version Egret 3.0.3
         */
        drawTileLayer(layer: tiled.TMXLayer, rect: egret.Rectangle): void;
    }
}
declare module tiled {
    class TMXIsometricRenderer extends tiled.TMXRenderer {
        private _hTilewidth;
        private _hTileheight;
        private _originX;
        /**
         * 创建1个iso渲染器
         * @param rows 水平方向格子数
         * @param cols 垂直方向格子数
         * @param tilewidth 格子宽（单位：像素）
         * @param tileheight 格子高（单位：像素）
         * @version Egret 3.0.3
         */
        constructor(rows: number, cols: number, tilewidth: number, tileheight: number);
        /**
         * 是否可渲染
         * @param layer
         * @version Egret 3.0.3
         */
        canRender(layer: any): boolean;
        /**
         * 像素坐标转化为格子坐标
         * @param x 水平像素坐标
         * @param y 垂直像素坐标
         * @version Egret 3.0.3
         */
        pixelToTileCoords(x: number, y: number): egret.Point;
        /**
         * 像素坐标转化为水平格子坐标
         * @param x 水平像素坐标
         * @param y 垂直像素坐标
         * @version Egret 3.0.3
         */
        pixelToTileX(x: number, y: number): number;
        /**
         * 像素坐标转化为垂直格子坐标
         * @param y 垂直像素坐标
         * @param x 水平像素坐标
         * @version Egret 3.0.3
         */
        pixelToTileY(y: number, x: number): number;
        /**
         * 格子坐标转化为像素坐标
         * @param tileX 水平格子坐标
         * @param tileY 垂直格子坐标
         * @version Egret 3.0.3
         */
        tileToPixelCoords(tileX: number, tileY: number): egret.Point;
        /**
         * 绘制作Tile
         * @param renderer 渲染容器
         * @param tileX 水平格子坐标（单位：像素）
         * @param tileY 垂直格子坐标（单位：像素）
         * @param tile TMXTile实例
         * @version Egret 3.0.3
         */
        drawTile(renderer: egret.Sprite, tileX: number, tileY: number, tile: tiled.TMXTile): void;
        /**
         * 绘制图层
         * @param layer 图层
         * @param rect 绘制区域
         * @version Egret 3.0.3
         */
        drawTileLayer(layer: TMXLayer, rect: egret.Rectangle): void;
    }
}
declare module tiled {
    class TMXOrthogonalRenderer extends tiled.TMXRenderer {
        /**
         * 创建1个正交渲染器（正常模式）
         * @param rows 水平方向格子数
         * @param cols 垂直方向格子数
         * @param tilewidth 格子宽（单位：像素）
         * @param tileheight 格子高（单位：像素）
         * @version Egret 3.0.3
         */
        constructor(rows: number, cols: number, tilewidth: number, tileheight: number);
        /**
         * 是否可渲染
         * @param layer
         * @version Egret 3.0.3
         */
        canRender(layer: any): boolean;
        /**
         * 像素坐标转化为格子坐标
         * @param x 水平像素坐标
         * @param y 垂直像素坐标
         * @version Egret 3.0.3
         */
        pixelToTileCoords(x: number, y: number): egret.Point;
        /**
         * 水平像素坐标转化为水平格子坐标
         * @param x 水平像素坐标
         * @version Egret 3.0.3
         */
        pixelToTileX(x: number): number;
        /**
         * 垂直像素坐标转化为垂直格子坐标
         * @param y 垂直像素坐标
         * @version Egret 3.0.3
         */
        pixelToTileY(y: number): number;
        /**
         * 格子坐标转化为像素坐标
         * @param tileX 水平格子坐标
         * @param tileY 垂直格子坐标
         * @version Egret 3.0.3
         */
        tileToPixelCoords(tileX: number, tileY: number): egret.Point;
        /**
         * 绘制Tile
         * @param renderer 渲染容器
         * @param tileX 水平格子坐标
         * @param tileY 垂直格子坐标
         * @param tile TMXTile实例
         * @version Egret 3.0.3
         */
        drawTile(renderer: egret.Sprite, tileX: number, tileY: number, tile: tiled.TMXTile): void;
        /**
         * 绘制作Tile图层
         * @param layer 图层
         * @param rect  绘制区域
         * @version Egret 3.0.3
         */
        drawTileLayer(layer: tiled.TMXLayer, rect: egret.Rectangle): void;
    }
}
declare module tiled {
    class TMXAnimationFrame {
        private _tiledid;
        private _duration;
        private _tile;
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
        constructor(tilemap: tiled.TMXTilemap, tileset: tiled.TMXTileset, col: number, row: number, data: any);
        /**
         * 获取当前画帧所使用的<code>TMXTile实例</code>
         * @version egret 3.0.3
         */
        readonly tile: TMXTile;
        /**
         * 获取当前帧所使用的tileset中的id号
         * @version egret 3.0.3
         */
        readonly tiledId: number;
        /**
         * 获取每帧持续时间(单位：毫秒)
         * @version egret 3.0.3
         */
        readonly duration: number;
    }
}
declare module tiled {
    class Ellipse extends egret.Sprite {
        /**
         * 创建1个椭圆形状实例
         * @param x 水平坐标（单位：像素）
         * @param y 垂直坐标（单位：像素）
         * @param w 椭圆宽
         * @param h 椭圆高
         * @version Egret 3.0.3
         */
        constructor(x: number, y: number, w: number, h: number);
        /**
         * 根据参数<code>color</code>绘制椭圆，参数为16进制表示形式，例如：0xff0000
         * @param color 颜色值
         * @version Egret 3.0.3
         */
        draw(color: number): void;
    }
}
declare module tiled {
    class Polygon extends egret.Sprite {
        private points;
        /**
         * 创建1个新的多边形实例
         * @param x 水平坐标（单位：像素）
         * @param y 垂直坐标（单位：像素）
         * @param points 多边形对应的点数据列表，三角形有三个点数据，n边形有n个点数据
         * @version Egret 3.0.3
         */
        constructor(x: number, y: number, points: number[][]);
        /**
         * 根据参数<code>color</code>绘制多边形，参数为16进制表示形式，例如：0xff0000
         * @param color 颜色值
         * @version Egret 3.0.3
         */
        draw(color: number): void;
    }
}
declare module tiled {
    class PolyLine extends egret.Sprite {
        private points;
        /**
         * 创建1个新的折线实例
         * @param x 水平坐标（单位：像素）
         * @param y 垂直坐标（单位：像素）
         * @param points 折线对应的点数据列表
         * @version Egret 3.0.3
         */
        constructor(x: number, y: number, points: number[][]);
        /**
         * 根据参数<code>color</code>绘制折线，参数为16进制表示形式，例如：0xff0000
         * @param color 颜色值
         * @version Egret 3.0.3
         */
        draw(color: number): void;
    }
}
declare module tiled {
    class TMXTile extends egret.Sprite {
        private _tileX;
        private _tileY;
        private _flippedX;
        private _flippedY;
        private _flippedAD;
        private _flipped;
        private _gid;
        private _tileData;
        private _tileset;
        private _tilemap;
        private _image;
        private _animation;
        private _properties;
        private _objectGroups;
        bitmap: egret.Bitmap;
        /**
         * 创建一个新的TMXTile实例，此类存储了场景的格子数据与Tileset中格子的数据
         * @param tileX 场景中的水平格子坐标
         * @param tileY 场景中的垂直格子坐标
         * @param gid tileset中的格子id
         * @param tilemap TMXTilemap实例
         * @param tileset TMXTileset实例
         * @param decodeAnimation 是否解析动画，娇正无限嵌套
         * @version Egret 3.0.3
         */
        constructor(tileX: number, tileY: number, gid: number, tilemap: tiled.TMXTilemap, tileset: tiled.TMXTileset, decodeAnimation?: boolean);
        /**
         * 获取在tileset所对应的格子id
         * @version Egret 3.0.3
         */
        readonly gid: number;
        /**
         * 获取其在场景水平格子坐标
         * @version Egret 3.0.3
         */
        readonly tileX: number;
        /**
         * 获取其在场景中垂直格子坐标
         * @version Egret 3.0.3
         */
        readonly tileY: number;
        /**
         * 获取其在场景中所引用的TMXTileset实例
         * @version Egret 3.0.3
         */
        readonly tileset: TMXTileset;
        readonly image: TMXImage;
        /**
         * 获取对TMXTilemap实例的引用
         * @version Egret 3.0.3
         */
        readonly tilemap: TMXTilemap;
        /**
         * 获取格子是否进行了水平方向翻转
         * @version Egret 3.0.3
         */
        readonly flippedX: boolean;
        /**
         * 获取格子是否进行了垂直方向翻转
         * @version Egret 3.0.3
         */
        readonly flippedY: boolean;
        /**
         * 获取格子是否进行了水平且垂直方向翻转
         * @version Egret 3.0.3
         */
        readonly flippedAD: boolean;
        /**
         * 获取格子是否进行了翻转（不管是水平还是垂直）
         * @version Egret 3.0.3
         */
        readonly flipped: boolean;
        /**
         * 获取格子的动画信息(如果没有动画信息，那么为空)
         * @version Egret 3.0.3
         */
        readonly animation: TMXAnimation;
    }
}
declare module tiled {
    class TMXTileset {
        private _lastgid;
        private _firstgid;
        private _name;
        private _tilewidth;
        private _tileheight;
        private _spacing;
        private _margin;
        private _tileoffset;
        private _hTileCount;
        private _vTileCount;
        private _tilemap;
        private _tileDatas;
        private _properties;
        private _image;
        private _images;
        private _imagesource;
        private _transformMatrix;
        private static spritesheets;
        /**
         * Tileset对象
         * @param tilemap 引用的TMXTilemap对象
         * @param tilesetData tilesetDat数据
         * @version Egret 3.0.3
         * 暂时不支持tsx文件的扩展
         */
        constructor(tilemap: tiled.TMXTilemap, tilesetData: any);
        /**
         * Tileset名称
         * @version Egret 3.0.3
         */
        readonly name: string;
        /**
         * 获取每个tileset第1个格子的id号。<br/>
         * 例如，1个tmx文件有3个tileset，那么第1个tileset的firstgid默认为1，如果第1个tileset有12个格子，<br/>
         * 那么第二个tileset的firstgid将为13，依此类推，firstgid为全局的标识id号，通过此id号可以计算每个tileset中格子的id号
         * @version Egret 3.0.3
         */
        readonly firstgid: number;
        /**
         * 获取每个tileset最后1个格子的id号
         * @version Egret 3.0.3
         */
        readonly lastgid: number;
        /**
         * 获取每个tileset中格子宽（单位：像素）
         * @version Egret 3.0.3
         */
        readonly tilewidth: number;
        /**
         * 获取每个tileset中格子高（单位：像素）
         * @version Egret 3.0.3
         */
        readonly tileheight: number;
        /**
         * 获取tileset中格子与格子之间的水平间距（单位：像素）
         * @version Egret 3.0.3
         */
        readonly spacing: number;
        /**
         * 获取tileset中格子与格子之间的垂直间距（单位：像素）
         * @version Egret 3.0.3
         */
        readonly margin: number;
        /**
         * 获取tileset中格子的偏移值,返回egret.Point数据
         * @version Egret 3.0.3
         */
        readonly tileoffset: egret.Point;
        /**
         * 获取tileset中水平方向的格子数
         * @version Egret 3.0.3
         */
        readonly horizontalTileCount: number;
        /**
         * 获取tileset中垂直方向的格子数
         * @version Egret 3.0.3
         */
        readonly verticalTileCount: number;
        /**
         * 获取对TMXTilemap实例的引用
         * @version Egret 3.0.3
         */
        readonly tilemap: TMXTilemap;
        /**
         * 获取tileset所具备的属性列表<br/>
         * 通过查看tmx文件可知，只有具备属性数据的tileset才会生成属性数据，以标签<code>properties</code>表示
         * 注意：这里表示的是tileset本身的属性列表，而非tileset中格子的属性列表
         * @version Egret 3.0.3
         */
        readonly properties: any[];
        /**
         * 获取tileset中对标签<code>image</code>解析实例的引用
         * @version Egret 3.0.3
         */
        readonly image: TMXImage;
        /**
         * 获取tileset中对标签<code>image</code>解析实例的引用,可能是列表
         * @version Egret 3.0.3
         */
        readonly images: TMXImage[];
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
        getSpecialTileDataByTileId(gid: number): any;
        /**
         * 获取文件扩展名
         * @version Egret 3.0.3
         */
        getFileExtension: (path: string) => string;
        /**
         *  获取tileset属性列表
         * @version Egret 3.0.3
         */
        getProperties(): tiled.TMXProperty[];
        /**
         * 根据索引获取tileset属性列表
         * @param index
         * @version Egret 3.0.3
         */
        getPropertyByIndex(index: number): any;
        /**
         * 判断当前tileset中是否包含对应<code>gid</code>的格子
         * @param gid gid
         * @version Egret 3.0.3
         */
        contains(gid: number): boolean;
        /**
         * 绘制Tile
         * @param renderer 渲染容器
         * @param dx 水平像素坐标
         * @param dy 垂直像素坐标
         * @param tile TMXTile实例
         * @version Egret 3.0.3
         */
        drawTile(renderer: egret.Sprite, dx: number, dy: number, tile: tiled.TMXTile): void;
        /**
         * 移除所有缓存的纹理
         * @version Egret 3.0.3
         */
        static removeAllTextures(): void;
    }
}
declare module tiled {
    class TMXTilesetGroup {
        private _tilesets;
        private _tilemap;
        private _length;
        private _imagelength;
        /**
         * Tileset集合，所有的Tileset都存储在这里
         * @param $tilemap
         * @version Egret 3.0.3
         */
        constructor($tilemap: tiled.TMXTilemap);
        /**
         * 获取tileset的长度
         * @version Egret 3.0.3
         */
        readonly length: number;
        /**
         * 获取所有图片的长度
         * @version Egret 3.0.3
         */
        readonly imagelength: number;
        /**
         * 获取TMXTilemap实例的引用
         * @version Egret 3.0.3
         */
        readonly tilemap: tiled.TMXTilemap;
        /**
         * 添加Tileset
         * @param tileset
         * @version Egret 3.0.3
         */
        add(tileset: tiled.TMXTileset): void;
        /**
         * 根据索引获取Tileset
         * @param index
         * @version Egret 3.0.3
         */
        getTilesetByIndex(index: number): tiled.TMXTileset;
        /**
         * 根据格子id获取Tileset，每个tileset都可能有n个格子(n>=1)，而这些格子的id都具备唯一性<br/>
         * 因此，通过格子id可以获取到此id在哪个tileset中的格子集中
         * @param gid 格子id
         * @version Egret 3.0.3
         */
        getTilesetByGid(gid: number): tiled.TMXTileset;
    }
}
declare module tiled {
    class Base64 {
        private static _keyStr;
        /**
         * 判断是否原生支持Base64位解析
         * @version Egret 3.0.3
         */
        static readonly nativeBase64: boolean;
        /**
         * 解码
         * @param input
         * @version Egret 3.0.3
         */
        static decode(input: string): string;
        /**
         * 编码
         * @param input
         * @version Egret 3.0.3
         */
        static encode(input: string): string;
        /**
         * 解析Base64格式数据
         * @param input
         * @param bytes
         * @version egret 3.0.3
         */
        static decodeBase64AsArray(input: string, bytes: number): Uint32Array;
        /**
         * 暂时不支持
         * @param data
         * @param decoded
         * @param compression
         * @version egret 3.0.3
         * @private
         */
        static decompress(data: string, decoded: any, compression: string): any;
        /**
         * 解析csv数据
         * @param input
         * @version egret 3.0.3
         */
        static decodeCSV(input: string): Array<number>;
    }
}
declare module tiled {
    class TMXUtils {
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
        static create($renderwidth: number, $renderheight: number, $url: string, $parentContainer: egret.Sprite, $onComplete?: Function, $thisObject?: any): void;
        /**
         * 解码
         * @param data 数据
         * @param encoding 编码方式 目前暂时只支持XML、base64(无压缩)、csv解析
         * @param compression 压缩方式
         * @returns 返回解析后的数据列表
         *
         * @version Egret 3.0.3
         */
        static decode(data: any, encoding: any, compression: string): Array<number>;
        /**
         * 将带"#"号的颜色字符串转换为16进制的颜色,例如：可将"#ff0000"转换为"0xff0000"
         * @param $color 要转换的颜色字符串
         * @returns 返回16进制的颜色值
         * @version Egret 3.0.3
         */
        static color16ToUnit($color: string): number;
    }
}
