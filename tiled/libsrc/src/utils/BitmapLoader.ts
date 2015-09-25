class BitmapLoader{
	public constructor(){
	}
	public static load($url:string,$onComplete:Function,$onCompleteParams:Array<any>=null):void{
        var _texture: egret.Texture = TexturePool.getTexture($url);
        if (_texture) {
            if ($onComplete != null) {
                $onComplete.apply(null, $onCompleteParams);
            }
        } else {
            var data = { url: $url, onComplete: $onComplete, onCompleteParams: $onCompleteParams };
            this.startload($url, data);
        }
    }

    private static startload($url: string, $data: Object) {
        RES.getResByUrl($url, this.onRESComplete, $data);
    }

    private static onRESComplete(textureData: egret.Texture): void {
        var This: any = this;
        TexturePool.addTexture(This.url,textureData);
        //完成回调
        if (This.onComplete != null) {
            This.onComplete.apply(null, This.onCompleteParams);
        }
    }
}
