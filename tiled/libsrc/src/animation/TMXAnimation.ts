module tiled{
	export class TMXAnimation {
        private _animations: tiled.TMXAnimationFrame[];
		private _tiledId: number;
		private _data: any;
		private _currentFrame: number = 0;
		private _tilemap:tiled.TMXTilemap;
		private _tileset:TMXTileset;
		oldBitmap:egret.Bitmap;
		
        /**
         * 创建1个新的tile动画实例
         * @param tilemap TMXTilemap实例引用
         * @param tileset TMXTileset实例引用
         * @param tileX 水平格子坐标
         * @param tileY 垂直格子坐标
         * @param data 动画数据
         * @version egret 3.0.3
         */
        constructor(tilemap: tiled.TMXTilemap,tileset: tiled.TMXTileset,public tileX: number,public tileY: number,data: any) {
			if (data) {
				this._tilemap               = tilemap;
				this._tileset               = tileset;
				this._data                  = data;
				this._animations            = [];
				this._currentFrame          = 0;
				var children: Array<any>    = data.children;
				if (children) {
					for (var i: number = 0; i < children.length; i++) {
						var child: any = children[i];
                        var frame: tiled.TMXAnimationFrame = new tiled.TMXAnimationFrame(tilemap,tileset,tileX,tileY,child);
						this._animations[i] = frame;
					}
				} 
			}
		}
		
		/**
		 * 渲染
		 * @version egret 3.0.3
		 */
		render(): void {
			this._currentFrame++;
			this._currentFrame = this._currentFrame % this._animations.length;
		}

		/**
		 * 获取当前运行时动画帧<code>tiled.TMXAnimationFrame</code>实例
		 * @version egret 3.0.3
		 */
		get currentAnimationFrame() {
			return this._animations[this._currentFrame];
		}

		/**
		 * 获取动画帧列表
		 * @version egret 3.0.3
		 */
		get animations() {
			return this._animations;
		}
	}
}

