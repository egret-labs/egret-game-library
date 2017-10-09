因为 Chrome 更新后把 base64 图片改为异步加载，引擎无法再使用该 base64 库。

在引擎 5.0.9 我们内置了使用 base64 图片的异步方法。

```
var bmp = new egret.Bitmap();

egret.BitmapData.create('base64', 'base64String', (bitmapData) => {
    bmp.bitmapData = bitmapData;
})
```

如果您需要使用之前的 base64 库，可以[点击下载](https://github.com/egret-labs/egret-game-library/tree/v5.0.8/base64texture)



Since Chrome has been updated to change base64 images to asynchronous loading, the engine can no longer use this base64 library.

In engine 5.0.9 we add an asynchronous method using base64 images.


```
var bmp = new egret.Bitmap();

egret.BitmapData.create('base64', 'base64String', (bitmapData) => {
    bmp.bitmapData = bitmapData;
})
```

If you need to use the previous base64 library, you can [click download](https://github.com/egret-labs/egret-game-library/tree/v5.0.8/base64texture)
