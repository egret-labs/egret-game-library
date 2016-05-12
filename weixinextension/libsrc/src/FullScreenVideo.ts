module weixinextension {
    /**
     * 微信带顶部栏的全屏视频
     */
    export class FullScreenVideo extends egret.EventDispatcher{
        private container;
        private videobox;
        private video;
        private posterDiv;
        /**
         * 加载视频的地址
         */
        public src:string;
        /**
         * 是否设置为循环播放
         */
        public loop:Boolean = false;
        constructor(url?:string) {
            super();
            this.src = url;
            var container = document.createElement('div');
            this.container = container;
            container.id = 'video'
            container.style.position = 'absolute';
            container.style.width = "100%";
            container.style.height = "100%";
            container.style.top = "0px";
            container.style.left = '0px';
                        
            var videobox = document.createElement("div");
            this.videobox = videobox;
            videobox.style.boxSizing = "border-box";
            videobox.style.width = "100%";
            videobox.style.height = "100%";
            videobox.style.position = "absolute";
            videobox.style.display = 'none';
            videobox.style.top = "0px";
            container.appendChild(videobox);

            var poster = document.createElement("img");
            this.posterDiv = poster;
            poster.style.width = '100%';
            poster.style.position = 'absolute';
            poster.style.top = "0px";
            container.appendChild(poster);
            this.createVideo();
        }        
        private loaded: boolean = false;
        /**
         * 显示视频
         */
        public show() {
            document.body.appendChild(this.container)
            this.container.addEventListener('click', this.onClickHandler);            
        }
        /**
         * 关闭视频
         */
        public close() {
            document.body.removeChild(this.container);
            this.video.pause();
            this.container.removeEventListener('click', this.onClickHandler);
            this.video.removeEventListener('timeupdate', this.onTimeUpdateHandler);
            this.video.removeEventListener('ended', this.onEndedHandler);
        }
        /**
         * 加载视频的地址
         */
        public load(url:string){
            if(this.src){//重新创建视频
                this.src = url;
                this.createVideo();
            }else{
                this.src = url;
                this.video.src = this.src;
            }
        }
        private posterUrl:string;
        /**
         * 预览图的地址
         */
        public get poster(){
            return this.posterUrl;
        }
        /**
         * 预览图的地址
         */
        public set poster(url){
            this.posterUrl = url;
            this.posterDiv.src = url;
        }
        private createVideo(){
            this.played = false;
            this.posterDiv.style.display = '';
            this.videobox.style.display = 'none';
            if(this.video){        
                if(this.video.parentNode){
                    this.videobox.removeChild(this.video);
                    this.video.pause();
                }                
                this.video = null;
            }
            
            var video = document.createElement("video");
            this.video = video;
            video.setAttribute("webkit-playsinline", "true");
            video.setAttribute("preload", "auto");
            video.style.width = '100%';
            if(this.src){
               video.src = this.src; 
            }
        }
        private played:boolean = false;
        private onClickHandler = (e): void => {
            console.log('onclick');
            if(!this.src){
                egret.error('请使用 load 方法设置视频的 url 地址');
                return;                
            }
            if(this.played){
                return;
            }
            this.played = true;
            this.videobox.appendChild(this.video);
            this.video.currentTime = 0;
            this.video.play();
            if(egret.Capabilities.os == 'iOS'){
                this.videobox.style.display = '';
            }
            this.video.addEventListener('timeupdate', this.onTimeUpdateHandler);
            this.video.addEventListener('ended', this.onEndedHandler);
        }
        private onTimeUpdateHandler = (e): void => {
            if (this.video.currentTime < 2 && this.video.currentTime >= 0.5) {
                this.posterDiv.style.display = 'none';
                this.videobox.style.display = '';
                this.video.removeEventListener('timeupdate', this.onTimeUpdateHandler);
            }
        }
        private onEndedHandler = (e): void => {
            if(this.loop){
                this.video.currentTime = 0;
                this.video.play();
            }else{
                this.posterDiv.style.display = '';
                this.videobox.removeChild(this.video);
            }
            this.dispatchEventWith(egret.Event.COMPLETE);
        }
    }
}