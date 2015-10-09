module tiled{
	export class TMXTilesetGroup {
		private _tilesets: Array<tiled.TMXTileset>;
		private _tilemap: tiled.TMXTilemap;
		private _length: number;
		private _imagelength: number;
		constructor($tilemap:tiled.TMXTilemap) {
			this._tilesets      = [];
			this._length        = 0;
			this._imagelength   = 0;
			this._tilemap       = $tilemap;
		}

		//获取Tileset长度
		get length() {
			return this._length;
		}

		//获取所有的图片长度
		get imagelength() {
			return this._imagelength;
		}

		get tilemap(): tiled.TMXTilemap {
			return this._tilemap;
		}

		//添加Tileset
		add(tileset: tiled.TMXTileset): void {
			this._tilesets.push(tileset);
			this._length++;
			if (tileset.image)
				this._imagelength++;
		}
		
		//根据索引获取Tileset
		getTilesetByIndex(index: number): tiled.TMXTileset {
			return this._tilesets[index];
		}

		//根据gid获取Tileset
		getTilesetByGid(gid: number): tiled.TMXTileset {
			if (gid === 0)
				return null;

			var invalidRange: number = -1;
			gid &= tiled.TMXConstants.TMX_CLEAR_BIT_MASK;

			for (var i = 0, len = this._tilesets.length; i < len; i++) {
				var tileset: tiled.TMXTileset = this._tilesets[i];
				if (tileset.contains(gid)) 
					return tileset;

				if (tileset.firstgid === tileset.lastgid && gid >= tileset.firstgid) 
					invalidRange = i;
			}

			if (invalidRange !== -1)
				return this._tilesets[invalidRange];
			else 
				throw new Error("no matching tileset found for gid " + gid);
		}

	} 
}
