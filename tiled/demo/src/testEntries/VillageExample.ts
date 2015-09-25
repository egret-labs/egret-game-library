class VillageExample extends egret.DisplayObjectContainer {
    public constructor() {
        super();

        var self = this;
        var url:string = "resource/village.tmx";
        var urlLoader:egret.URLLoader = new egret.URLLoader();
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        //load complete
        urlLoader.addEventListener(egret.Event.COMPLETE, function (event:egret.Event):void {
            var data:any = egret.XML.parse(event.target.data);
			var tmxTileMap:TMXTilemap = new TMXTilemap(2000, 2000, data, url);
			tmxTileMap.showHideBackground(false);
			tmxTileMap.render();
			self.addChild(tmxTileMap);
        }, url);
        urlLoader.load(new egret.URLRequest(url));
    }
}