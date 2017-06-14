class Main extends egret.Sprite {
    private urlloader: egret.URLLoader;
    public constructor() {
        super();
		var self:Main=this;
        var url: string = "resource/village.tmx";
        var urlLoader: egret.URLLoader = new egret.URLLoader();
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        //load complete
        urlLoader.addEventListener(egret.Event.COMPLETE, function (event: egret.Event): void {
            var data: any = egret.XML.parse(event.target.data);
            var tmxTileMap: tiled.TMXTilemap = new tiled.TMXTilemap(2000, 2000, data, url);
            tmxTileMap.render();
            self.addChild(tmxTileMap);
        }, url);
        urlLoader.load(new egret.URLRequest(url));
		
		//TMXUtils.create(2000, 2000,url,this);
    }
}