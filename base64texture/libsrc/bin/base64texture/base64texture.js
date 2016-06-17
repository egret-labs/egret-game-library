var Base64Texture = (function () {
    function Base64Texture() {
    }
    var d = __define,c=Base64Texture,p=c.prototype;
    /**
     * @param base64 字符串
     */
    Base64Texture.getTexture = function (base64) {
        var img = new Image();
        img.src = base64;
        var texture = new egret.Texture();
        texture._setBitmapData(img);
        return texture;
    };
    return Base64Texture;
}());
egret.registerClass(Base64Texture,'Base64Texture');

