var weixinextension;
(function (weixinextension) {
    /**
     * 微信带顶部栏的全屏视频
     */
    var FullScreenVideo = (function (_super) {
        __extends(FullScreenVideo, _super);
        function FullScreenVideo(url) {
            var _this = this;
            _super.call(this);
            /**
             * 是否设置为循环播放
             */
            this.loop = false;
            this.loaded = false;
            this.played = false;
            this.onClickHandler = function (e) {
                console.log('onclick');
                if (!_this.src) {
                    egret.error('请使用 load 方法设置视频的 url 地址');
                    return;
                }
                if (_this.played) {
                    return;
                }
                _this.played = true;
                _this.videobox.appendChild(_this.video);
                _this.video.currentTime = 0;
                _this.video.play();
                if (egret.Capabilities.os == 'iOS') {
                    _this.videobox.style.display = '';
                }
                _this.video.addEventListener('timeupdate', _this.onTimeUpdateHandler);
                _this.video.addEventListener('ended', _this.onEndedHandler);
            };
            this.onTimeUpdateHandler = function (e) {
                if (_this.video.currentTime < 2 && _this.video.currentTime >= 0.5) {
                    _this.posterDiv.style.display = 'none';
                    _this.videobox.style.display = '';
                    _this.video.removeEventListener('timeupdate', _this.onTimeUpdateHandler);
                }
            };
            this.onEndedHandler = function (e) {
                if (_this.loop) {
                    _this.video.currentTime = 0;
                    _this.video.play();
                }
                else {
                    _this.posterDiv.style.display = '';
                    _this.videobox.removeChild(_this.video);
                }
                _this.dispatchEventWith(egret.Event.COMPLETE);
            };
            this.src = url;
            var container = document.createElement('div');
            this.container = container;
            container.id = 'video';
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
        var d = __define,c=FullScreenVideo,p=c.prototype;
        /**
         * 显示视频
         */
        p.show = function () {
            document.body.appendChild(this.container);
            this.container.addEventListener('click', this.onClickHandler);
        };
        /**
         * 关闭视频
         */
        p.close = function () {
            document.body.removeChild(this.container);
            this.video.pause();
            this.container.removeEventListener('click', this.onClickHandler);
            this.video.removeEventListener('timeupdate', this.onTimeUpdateHandler);
            this.video.removeEventListener('ended', this.onEndedHandler);
        };
        /**
         * 加载视频的地址
         */
        p.load = function (url) {
            if (this.src) {
                this.src = url;
                this.createVideo();
            }
            else {
                this.src = url;
                this.video.src = this.src;
            }
        };
        d(p, "poster"
            /**
             * 预览图的地址
             */
            ,function () {
                return this.posterUrl;
            }
            /**
             * 预览图的地址
             */
            ,function (url) {
                this.posterUrl = url;
                this.posterDiv.src = url;
            }
        );
        p.createVideo = function () {
            this.played = false;
            this.posterDiv.style.display = '';
            this.videobox.style.display = 'none';
            if (this.video) {
                if (this.video.parentNode) {
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
            if (this.src) {
                video.src = this.src;
            }
        };
        return FullScreenVideo;
    }(egret.EventDispatcher));
    weixinextension.FullScreenVideo = FullScreenVideo;
    egret.registerClass(FullScreenVideo,'weixinextension.FullScreenVideo');
})(weixinextension || (weixinextension = {}));

