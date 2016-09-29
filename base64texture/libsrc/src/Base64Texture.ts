class Base64Texture {
    /**
     * @param base64 字符串
     */
    public static getTexture(base64: string):egret.Texture {
        var img: HTMLImageElement = new Image();
        img.src = base64;
        var texture = new egret.Texture();
        var bitmapdata = new egret.BitmapData(img);
        texture._setBitmapData(bitmapdata);
        return texture;
    }
}