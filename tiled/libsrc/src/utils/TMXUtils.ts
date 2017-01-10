module tiled{
	export class TMXUtils {
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
		static create($renderwidth:number,$renderheight:number,$url: string, $parentContainer: egret.Sprite, $onComplete: Function=null, $thisObject:any=null): void {
			RES.getResByUrl($url,function(data:any):void{
                    try {
                        var data: any = egret.XML.parse(data);
                    } catch(e) {
                        throw new Error("tmx文件格式不正确！");
                    }
                    var tmxTileMap: tiled.TMXTilemap = new tiled.TMXTilemap($renderwidth,$renderheight,data,$url);
                    tmxTileMap.render();
                    $parentContainer.addChild(tmxTileMap);
                    
                    if($onComplete)
                        $onComplete.apply($thisObject);
    			},this,RES.ResourceItem.TYPE_XML);
		}

		
		/**
		 * 解码
		 * @param data 数据
		 * @param encoding 编码方式 目前暂时只支持XML、base64(无压缩)、csv解析
		 * @param compression 压缩方式
		 * @returns 返回解析后的数据列表
		 * 
		 * @version Egret 3.0.3
		 */
		static decode(data: any, encoding: any, compression: string): Array<number> {
			compression = compression || "none";
			encoding = encoding || "none";
			var text:string=data.children[0].text;
			switch (encoding) {
				case "base64":
					var decoded = tiled.Base64.decodeBase64AsArray(text, 4);
					return (compression === "none") ? decoded : tiled.Base64.decompress(text, decoded, compression);

				case "csv":
					return tiled.Base64.decodeCSV(text);

				case "none":
					var datas: Array<number> = [];
					for (var i: number = 0; i < data.children.length; i++) {
						datas[i] = +data.children[i].attributes.gid;
					}
					return datas;

				default:
					throw new Error("未定义的编码:" + encoding);
			}
		}
		
		
		/**
		 * 将带"#"号的颜色字符串转换为16进制的颜色,例如：可将"#ff0000"转换为"0xff0000"
		 * @param $color 要转换的颜色字符串
		 * @returns 返回16进制的颜色值
		 * @version Egret 3.0.3
		 */
		static color16ToUnit($color:string): number {
			var colorStr: string = "0x" + $color.slice(1);
			return parseInt(colorStr, 16);
		}
	} 
}
