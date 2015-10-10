module tiled{
	export class TexturePool {
		public static texturePools: Object = {};
		public constructor() { }

		public static addTexture($url:string,$texture:egret.Texture): void {
			this.texturePools[$url] = $texture;
		}

		public static removeTexture($url: string): void {
			this.texturePools[$url] = null;
		}

		public static getTexture($url:string): egret.Texture {
			return this.texturePools[$url];
		}

		public static removeAllTextures():void
		{
			this.texturePools={};
		}
	}
}
