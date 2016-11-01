class Test2Example extends egret.DisplayObjectContainer {
    public constructor() {
        super();

        var self = this;
        var url: string = "resource/test2.tmx";
        var urlLoader:egret.URLLoader = new egret.URLLoader();
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        //load complete
        urlLoader.addEventListener(egret.Event.COMPLETE, function (event:egret.Event):void {
            var data:any = egret.XML.parse(event.target.data);
            var tmxTileMap:tiled.TMXTilemap = new tiled.TMXTilemap(4800, 1920, data, url);
            tmxTileMap.render();
            self.addChild(tmxTileMap);
        }, url);
        urlLoader.load(new egret.URLRequest(url));
    }
}