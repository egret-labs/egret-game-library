module tiled{
	//可能存在普通对象，也可能存在动画
	export class TMXObject extends egret.Sprite {
		//多边形与折线数据列表
		private _points: number[][];
		//椭圆数据列表
		private _ellipse: Array<any>;
		private _name: string;
		private _id: number;
		private _gid: number;
		private _z: number;
		//用于程序的标志（自定义的类型）
		private _type: string;
		
		//对象方向 (orthogonal or isometric)
		private _orientation: string;
		//the collision shapes defined for this object
		private _shapes: Array<egret.Sprite>;
		private _isEllipse: boolean;
		private _isPolygon: boolean;
		private _isPolyLine: boolean;
		private _isImage: boolean;

		private _tile: tiled.TMXTile;
		private _color: number;

		private _flippedX: boolean;
		private _flippedY: boolean;
		private _flippedAD: boolean;
		private _flipped: boolean;

		private _properties: Array<tiled.TMXProperty>;
		
		/**
		 * 创建一个Tile对象实例
		 * @param data 数据
		 * @param orientation 渲染方向
		 * @param tilesets TMXTilesetGroup实例
		 * @param z 对象所在的层深
		 * @param color 对象所使用的颜色
		 * @version Egret 3.0.3
		 */
		constructor(data: any, orientation: any, tilesets: tiled.TMXTilesetGroup, z: number, color: number) {
			super();

			this._points                                = undefined;
			this._name                                  = data.attributes.name;
			this.x                                      = +data.attributes.x;
			this.y                                      = +data.attributes.y;
			this._z                                     = +z;
			this.width                                  = +data.attributes.width || 0;
			this.height                                 = +data.attributes.height || 0;
			this._gid                                   = +data.attributes.gid || null;
			this._type                                  = data.attributes.type;
			this.rotation                               = +data.attributes.rotation || 0;
			this._id                                    = +data.attributes.id || undefined;
			this._orientation                           = orientation;
			this._shapes                                = undefined;
			this._color                                 = color;
			this._isEllipse                             = false;
			this._isPolygon                             = false;
			this._isPolyLine                            = false;
			this.visible                                = (typeof data.attributes.visible !== "undefined") ? Boolean(+data.attributes.visible) : true;
			// 检测当前对象是否已经分配了gid(只有图块对象层才会分配gid)
			if (typeof this._gid === "number") {
				this._isImage                           = true;
				this.setTile(tilesets);
			} else {
				this._points                            = [];
				var self                                = this;
				var children: Array<any>                = data.children;
				if (children) {
					for (var i: number = 0; i < children.length; i++) {
						var child: any                  = children[i];
						switch (child.localName) {
							case tiled.TMXConstants.ELLIPSE:
								this._isEllipse         = true;
								this._isImage           = false;
								this._ellipse           = this.parseEllipse(child);
								break;

							case tiled.TMXConstants.POLYGON:
								this._isPolygon         = true;
								this._isImage           = false;
								this._points            = this.parsePolygonOrPolyline(child.attributes.points);
								break;

							case tiled.TMXConstants.POLYLINE:
								this._isPolyLine        = true;
								this._isImage           = false;
								this._points            = this.parsePolygonOrPolyline(child.attributes.points);
								break;

							case tiled.TMXConstants.PROPERTIES:
								if (tilesets.tilemap) 
									this._properties    = tilesets.tilemap.parseProperties(child);
								break;
						}
					}
				}
			}

			//parseShapes
			if (!this._shapes)
				this._shapes                            = this.parseTMXShapes();

			for (var i: number = 0; i < this._shapes.length; i++) {
				var _shape: egret.Sprite                = this._shapes[i];
				this.addChild(_shape);
			}
		}
		
		/**
		 * 对象自增长id
		 * @version Egret 3.0.3
		 */
		get id(){
			return this._id;
		}

		/**
		 * tileset中对应的id
		 * @version Egret 3.0.3
		 */
		get gid() {
			return this._gid;
		}

		/**
		 * 对象名称
		 * @version Egret 3.0.3
		 */
		get name() {
			return this._name;
		}

		/**
		 * 对象类型
		 * @version Egret 3.0.3
		 */
		get type() {
			return this._type;
		}

		/**
		 * 对象所在层深
		 * @version Egret 3.0.3
		 */
		get z() {
			return this._z;
		}

		/**
		 * 当前对象是否是椭圆
		 * @version Egret 3.0.3
		 */
		get isEllipse() {
			return this._isEllipse;
		}

		/**
		 * 当前对象是否为多边形
		 * @version Egret 3.0.3
		 */
		get isPolygon() {
			return this._isPolygon;
		}

		/**
		 * 当前对象是否为折线
		 * @version Egret 3.0.3
		 */
		get isPolyLine() {
			return this._isPolyLine;
		}

		/**
		 * 当前对象是否为图像
		 * @version Egret 3.0.3
		 */
		get isImage() {
			return this._isImage;
		}

		/**
		 * 解析多边形或者折线数据
		 * @param $points
		 * @version Egret 3.0.3
		 */
		private parsePolygonOrPolyline($points: string): number[][]{
			var datas: number[][] = [];
			var points: Array<any> = $points.split(" ");
			if (points) {
				for (var i: number = 0; i < points.length; i++) {
					var pdata: Array<any> = points[i].split(",");
					datas[i] = [+pdata[0], +pdata[1]];
				}
			}
			return datas;
		}
		
		/**
		 * 解析椭圆数据
		 * @param $data
		 * @version Egret 3.0.3
		 */
		private parseEllipse($data: any): number[] {
			var _width: number  = +$data.attributes.width || 32;
			var _height: number = +$data.attributes.height || 32;
			return [_width, _height];
		}

		/**
		 * 解析多种对象（包括：椭圆，多边形，折线等）
		 * @version Egret 3.0.3
		 */
		private parseTMXShapes(): Array<any> {
			var shapes: Array<egret.Sprite> = [];
			if (this._isEllipse) {
				var _ellipse: tiled.Ellipse   = new tiled.Ellipse(0, 0, this.width, this.height);
				_ellipse.draw(this._color);
				shapes.push(_ellipse);
			} else if (this._isPolygon) {
				var _polygon: tiled.Polygon   = new tiled.Polygon(0, 0, this._points);
				_polygon.draw(this._color);
				shapes.push(_polygon);
			} else if (this._isPolyLine) {
				var _polyline: tiled.PolyLine = new tiled.PolyLine(0, 0, this._points);
				_polyline.draw(this._color);
				shapes.push(_polyline);
			} else {
				if (!this._gid) {
					var _polygon: tiled.Polygon = new tiled.Polygon(0, 0, [[0, 0], [this.width, 0], [this.width, this.height], [0, this.height]]);
					_polygon.draw(this._color);
					shapes.push(_polygon);
				}
			}

			if (this._orientation === "isometric") {
				for (var i: number = 0; i < shapes.length; i++) {
					var shape: egret.Sprite = shapes[i];
					shape.rotation  = 45;
					shape.scaleX    = Math.SQRT1_2;
					shape.scaleY    = Math.SQRT1_2;
				}
			}
			return shapes;
		}

		
		/**
		 * 设置Tile
		 * @param tilesets TMXTileset实例
		 * @version Egret 3.0.3
		 */
		private setTile(tilesets: tiled.TMXTilesetGroup): void {
			var tileset: tiled.TMXTileset = tilesets.getTilesetByGid(this._gid);
			if (tileset) {
				this._tile = new tiled.TMXTile(0,0,this.gid,tileset.tilemap,tileset);
                tileset.drawTile(this,tileset.tileoffset.x,tileset.tileoffset.y - tileset.tileheight,this._tile);  
			}
		}
	} 
}
