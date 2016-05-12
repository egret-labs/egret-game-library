class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        var video = new weixinextension.FullScreenVideo();
        video.load('resource/video/mp4.mp4');
        video.poster = "resource/video/bg.jpg";
        video.show();
        video.addEventListener(egret.Event.COMPLETE,()=>{
            console.log('play complete');
            video.close();
        },this)
    }
}