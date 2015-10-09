module tiled{
	export class TMXUtils {
		static create($renderwidth:number,$renderheight:number,$url: string, $parentContainer: egret.Sprite, $onComplete: Function=null): void {
			var urlLoader: egret.URLLoader = new egret.URLLoader();
			urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
			urlLoader.addEventListener(egret.Event.COMPLETE, function (event: egret.Event): void {
				try{
					var data: any = egret.XML.parse(event.target.data);
				}catch(e)
				{
					throw new Error("tmx文件格式不正确！");
				}
				var tmxTileMap: tiled.TMXTilemap = new tiled.TMXTilemap($renderwidth, $renderheight, data, $url);
				tmxTileMap.render();
				$parentContainer.addChild(tmxTileMap);
				if ($onComplete != null)
					$onComplete();
			},this);
			urlLoader.load(new egret.URLRequest($url));
			urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event: egret.Event): void {
				throw new Error("TMXTiledMap加载错误！！");
			}, this);
		}

		static decode(data: any, encoding: any, compression: string): Array<number> {
			compression = compression || "none";
			encoding = encoding || "none";
			var text:string=data.children[0].text;
			switch (encoding) {
				case "base64":
					var decoded = tiled.Base64.decodeBase64AsArray(text, 4);
					return (compression === "none") ? decoded : tiled.Base64.decompress(text, decoded, compression);
					break;

				case "csv":
					return tiled.Base64.decodeCSV(text);
					break;

				case "none":
					var datas: Array<number> = [];
					for (var i: number = 0; i < data.children.length; i++) {
						datas[i] = +data.children[i].attributes.gid;
					}
					return datas;
					break;

				default:
					throw new Error("未定义的编码:" + encoding);
					break;
			}
		}
		
		static color16ToUnit($color:string): number {
			var colorStr: string = "0x" + $color.slice(1);
			return parseInt(colorStr, 16);
		}
	} 
}
