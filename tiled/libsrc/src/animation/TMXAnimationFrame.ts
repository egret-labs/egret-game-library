module tiled{
	export class TMXAnimationFrame {
		private _tiledid: number;
		private _duration: number;
		private _tile: tiled.TMXTile;
			
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
        constructor(tilemap: tiled.TMXTilemap,tileset: tiled.TMXTileset,col: number,row: number,data: any) {
			this._tiledid 		= +data.attributes.tileid;
			this._duration      = +data.attributes.duration;
			this._tile 			= new tiled.TMXTile(col, row, this._tiledid + tileset.firstgid, tilemap, tileset, false);
		}

		/**
		 * 获取当前画帧所使用的<code>TMXTile实例</code>
		 * @version egret 3.0.3
		 */
		get tile() {
			return this._tile;
		}

		/**
		 * 获取当前帧所使用的tileset中的id号
		 * @version egret 3.0.3
		 */
		get tiledId() {
			return this._tiledid;
		}

		/**
		 * 获取每帧持续时间(单位：毫秒)
		 * @version egret 3.0.3
		 */
		get duration() {
			return this._duration;
		}
	} 
}
