module tiled{
	//可能存在普通对象，也可能存在动画
	export class TMXObject extends egret.Sprite {
		//for Polygon and PolyLine
		private _points: Array<any>;
		//for ellipse
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
		constructor(tmxObj: any, orientation: any, tilesets: tiled.TMXTilesetGroup, z: number, color: number) {
			super();

			this._points         = undefined;
			this._name           = tmxObj.attributes.name;
			this.x               = +tmxObj.attributes.x;
			this.y               = +tmxObj.attributes.y;
			this._z              = +z;
			this.width           = +tmxObj.attributes.width || 0;
			this.height          = +tmxObj.attributes.height || 0;
			this._gid            = +tmxObj.attributes.gid || null;
			this._type           = tmxObj.attributes.type;
			this.rotation        = +tmxObj.attributes.rotation || 0;
			this._id             = +tmxObj.attributes.id || undefined;
			this._orientation    = orientation;
			this._shapes         = undefined;
			this._color          = color;
			this._isEllipse      = false;
			this._isPolygon      = false;
			this._isPolyLine     = false;
			this.visible         = (typeof tmxObj.attributes.visible !== "undefined") ? Boolean(+tmxObj.attributes.visible) : true;
			// 检测当前对象是否已经分配了gid(只有图块对象层才会分配gid)
			if (typeof this._gid === "number") {
				this._isImage = true;
				this.setTile(tilesets);
			} else {
				this._points = [];
				var self = this;
				var children: Array<any> = tmxObj.children;
				if (children) {
					for (var i: number = 0; i < children.length; i++) {
						var child: any = children[i];
						switch (child.localName) {
							case tiled.TMXConstants.ELLIPSE:
								this._isEllipse = true;
								this._isImage = false;
								this._ellipse    = this.parseEllipse(child);
								break;

							case tiled.TMXConstants.POLYGON:
								this._isPolygon = true;
								this._isImage   = false;
								this._points    = this.parsePolygonOrPolyline(child.attributes.points);
								break;

							case tiled.TMXConstants.POLYLINE:
								this._isPolyLine = true;
								this._isImage = false;
								this._points     = this.parsePolygonOrPolyline(child.attributes.points);
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

			for (var i: number = 0; i < this._shapes.length; i++) {
				var _shape: egret.Sprite = this._shapes[i];
				this.addChild(_shape);
			}
		}
		
		get id(){
			return this._id;
		}

		get gid() {
			return this._gid;
		}

		get name() {
			return this._name;
		}

		get type() {
			return this._type;
		}

		get z() {
			return this._z;
		}

		get isEllipse() {
			return this._isEllipse;
		}

		get isPolygon() {
			return this._isPolygon;
		}

		get isPolyLine() {
			return this._isPolyLine;
		}

		get isImage() {
			return this._isImage;
		}

		getObjectPropertyByName(name: string): string {
			return this[name];
		}

		private parsePolygonOrPolyline($points: string): Array<Array<number>> {
			var datas: Array<Array<number>> = [];
			var points: Array<any> = $points.split(" ");
			if (points) {
				for (var i: number = 0; i < points.length; i++) {
					var pdata: Array<any> = points[i].split(",");
					datas[i] = [+pdata[0], +pdata[1]];
				}
			}
			return datas;
		}

		private parseEllipse($data: any): Array<number> {
			var _width: number  = +$data.attributes.width || 32;
			var _height: number = +$data.attributes.height || 32;
			return [_width, _height];
		}

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

		private setTile(tilesets: tiled.TMXTilesetGroup): void {
			var tileset: tiled.TMXTileset = tilesets.getTilesetByGid(this._gid);
			if (tileset) {
				var image: tiled.TMXImage = tileset.image;
				if (image) {
					var onImageLoad: Function = function (event: tiled.TMXImageLoadEvent): void {
						
					}
					image.addEventListener(tiled.TMXImageLoadEvent.IMAGE_COMPLETE, onImageLoad, this);
				}  

				this._tile = new tiled.TMXTile(0, 0, this.gid, tileset.tilemap, tileset);
				tileset.drawTile(this, tileset.tileoffset.x, tileset.tileoffset.y - tileset.tileheight, this._tile);
			}
		}
	} 
}
