declare module weixinextension {
    /**
     * 微信带顶部栏的全屏视频
     */
    class FullScreenVideo extends egret.EventDispatcher {
        private container;
        private videobox;
        private video;
        private posterDiv;
        /**
         * 加载视频的地址
         */
        src: string;
        /**
         * 是否设置为循环播放
         */
        loop: Boolean;
        constructor(url?: string);
        private loaded;
        /**
         * 显示视频
         */
        show(): void;
        /**
         * 关闭视频
         */
        close(): void;
        /**
         * 加载视频的地址
         */
        load(url: string): void;
        private posterUrl;
        /**
         * 预览图的地址
         */
        /**
         * 预览图的地址
         */
        poster: string;
        private createVideo();
        private played;
        private onClickHandler;
        private onTimeUpdateHandler;
        private onEndedHandler;
    }
}
