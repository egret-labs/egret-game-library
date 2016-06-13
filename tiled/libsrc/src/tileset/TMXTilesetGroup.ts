module tiled{
	export class TMXTilesetGroup {
		private _tilesets: Array<tiled.TMXTileset>;
		private _tilemap: tiled.TMXTilemap;
		private _length: number;
		private _imagelength: number;
		
		/**
		 * Tileset集合，所有的Tileset都存储在这里
		 * @param $tilemap
		 * @version Egret 3.0.3
		 */
		constructor($tilemap:tiled.TMXTilemap) {
			this._tilesets      = [];
			this._length        = 0;
			this._imagelength   = 0;
			this._tilemap       = $tilemap;
		}

		/**
		 * 获取tileset的长度
		 * @version Egret 3.0.3
		 */
		get length() {
			return this._length;
		}

		/**
		 * 获取所有图片的长度
		 * @version Egret 3.0.3
		 */
		get imagelength() {
			return this._imagelength;
		}

		/**
		 * 获取TMXTilemap实例的引用
		 * @version Egret 3.0.3
		 */
		get tilemap(): tiled.TMXTilemap {
			return this._tilemap;
		}
		
		/**
		 * 添加Tileset
		 * @param tileset
		 * @version Egret 3.0.3
		 */
		add(tileset: tiled.TMXTileset): void {
			this._tilesets.push(tileset);
			this._length++;
			if (tileset.images)
				this._imagelength += tileset.images.length;
		}
		
		/**
		 * 根据索引获取Tileset
		 * @param index
		 * @version Egret 3.0.3
		 */
		getTilesetByIndex(index: number): tiled.TMXTileset {
			return this._tilesets[index];
		}

		/**
		 * 根据格子id获取Tileset，每个tileset都可能有n个格子(n>=1)，而这些格子的id都具备唯一性<br/>
		 * 因此，通过格子id可以获取到此id在哪个tileset中的格子集中
		 * @param gid 格子id
		 * @version Egret 3.0.3
		 */
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
