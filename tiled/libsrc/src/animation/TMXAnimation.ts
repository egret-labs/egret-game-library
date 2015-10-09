module tiled{
	export class TMXAnimation {
		private _animations: Array<tiled.TMXAnimationFrame>;
		private _tiledId: number;
		private _data: any;
		private _currentFrame: number = 0;
		private _x: number;
		private _y: number;
		oldTime: number = 0;
		oldBitmap:egret.Bitmap;
		constructor($data: any,x:number,y:number,tilemap:tiled.TMXTilemap,tileset:tiled.TMXTileset) {
			if ($data) {
				this._x = x;
				this._y = y;
				this._data = $data;
				this._animations = [];
				this._currentFrame = 0;
				var children: Array<any> = $data.children;
				if (children) {
					for (var i: number = 0; i < children.length; i++) {
						var child: any = children[i];
						var frame: tiled.TMXAnimationFrame = new tiled.TMXAnimationFrame(child, x, y, tilemap, tileset);
						this._animations[i] = frame;
					}
				} 
			}
		}

		get x() {
			return this._x;
		}

		get y() {
			return this._y;
		}

		render(): void {
			this._currentFrame++;
			this._currentFrame = this._currentFrame % this._animations.length;
		}

		get currentAnimationFrame() {
			return this._animations[this._currentFrame];
		}

		get animations() {
			return this._animations;
		}

		get data() {
			return this._data;
		}
	}
}

