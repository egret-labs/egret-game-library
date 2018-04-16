class IM {
    private openid: string;
    private userSig: string;
    private sdkAppId: number = 1400081110;
    private accountType: number = 25010;
    private YMWebRTCAPI: YMWebRTCAPI;
    constructor(openid: string) {
        this.openid = openid.toString();

        this.getUserSig((result) => {
            this.userSig = result;
            this.init();
        })
    }
    private init() {
        var onRemoteStreamAdd = (stream, videoId, openId) => {
            if (stream) {
                // 创建新的对端语音
                egret.log('创建新的对端语音')
                var newAudio = document.createElement('audio');
                newAudio.srcObject = stream;
                newAudio.autoplay = true;
                newAudio.id = 'audio' + videoId;

                // 创建用户
                egret.log('创建用户')
                var newUser = document.createElement('div');
                newUser.innerText = openId;
                newUser.id = 'user' + videoId;

                if (!document.getElementById('audio' + videoId)) {
                    document.getElementById('audioContainer').appendChild(newAudio);
                    document.getElementById('userContainer').appendChild(newUser);

                    egret.log('用户: ' + openId + '加入频道');
                }
            }
        }
        var onMediaChange = () => {
            egret.log('t1-视频状态通知，切换了摄像头/麦克风的开关状态');
        }
        var onRemoteLeave = () => {
            egret.log('t2-远端断开');
        }
        var onInitResult = (result) => {
            egret.log('t3-初始化成功的回调');
            if (result !== 0) {
                var errorStr = "";
                if (result === -10001) {
                    errorStr = "WebRTCJSAPI初始化参数不正确";
                } else if (result === -10002) {
                    errorStr = "浏览器版本不正确";
                } else if (result === -10003) {
                    errorStr = "sig校验失败";
                } else if (result === -10006) {
                    errorStr = "WebSocket 初始化失败";
                } else {
                    errorStr = "初始化错误";
                }
                egret.log(errorStr + " " + result);
            } else {
                this.YMWebRTCAPI.createRoom({
                    roomid: 1367, // roomid为long类型
                    role: "LiveGuest"
                }, function (res) {
                    if (res !== 0) {
                        egret.log("创建房间失败!!!");
                    } else {
                        egret.log("创建房间成功!!!");
                    }
                });
            }
        }
        var onLocalStreamAdd = (stream) => {
            if (stream) {
                document.getElementById('localVideo')['srcObject'] = stream;
                egret.log("你成功加入语音频道");
            }
        }
        var onRemoteStreamRemove = (videoId) => {
            egret.log('t6-远端视频流断开');
            var videoElement = document.getElementById('audio' + videoId);
            if (videoElement) {
                videoElement['srcObject'] = null;
                videoElement.parentNode.removeChild(videoElement);
                var userElement = document.getElementById('user' + videoId);
                userElement.parentNode.removeChild(userElement);
                egret.log("有人退出语音频道");
            }
        }
        var onUpdateRemoteStream = (stream, videoId, type, ssrState, openId) => {
            egret.log('t7-onUpdateRemoteStream')
            onRemoteStreamAdd(stream, videoId, openId);
        }
        var onKickout = () => {
            egret.log("t8-你被踢出了房间,账号在其他地方登录！,请刷新页面重新登录");
        }
        var onWebSocketClose = (e) => {
            egret.log('t9-websocket断开' + e);
        }
        var onRelayTimeout = () => {
            egret.log('t10-视频流server超时断开');
        }
        var onIceConnectionClose = (e) => {
            egret.log('t11-ICE连接断开' + e);
        }
        var onChangeRemoteStreamState = () => {
            egret.log('t12-主路/辅路状态更新通知')
        }
        var listeners: YMWebRTCAPI.Listener = {
            onMediaChange: onMediaChange,
            onRemoteLeave: onRemoteLeave,
            onInitResult: onInitResult,
            onLocalStreamAdd: onLocalStreamAdd,
            onRemoteStreamAdd: onRemoteStreamAdd,
            onRemoteStreamRemove: onRemoteStreamRemove,
            onUpdateRemoteStream: onUpdateRemoteStream,
            onKickout: onKickout,
            onWebSocketClose: onWebSocketClose,
            onRelayTimeout: onRelayTimeout,
            onIceConnectionClose: onIceConnectionClose,
            onChangeRemoteStreamState: onChangeRemoteStreamState
        }
        var configs: YMWebRTCAPI.Config = {
            webim: true,
            sdkAppId: this.sdkAppId,
            openid: this.openid,
            userSig: this.userSig,
            accountType: this.accountType,
            closeLocalMedia: false,
            // video: false,
        }
        this.YMWebRTCAPI = window['YMSDK'].YMWebRTC.Instance;
        this.YMWebRTCAPI.init(listeners, configs)

    }
    public openMic() {
        this.YMWebRTCAPI.closeAudio();
    }
    public closeMic() {
        this.YMWebRTCAPI.openAudio();
    }
    public openVideo(){
        this.YMWebRTCAPI.openVideo();
    }
    public closeVideo(){
        this.YMWebRTCAPI.closeVideo();
    }
    public createRoom() {
        egret.log('已经自动创建房间了')
        //手动创建房间的代码
        // this.YMWebRTCAPI.createRoom({
        //             roomid: 1367, // roomid为long类型
        //             role: "LiveGuest"
        //         }, function (res) {
        //             if (res !== 0) {
        //                 egret.log("创建房间失败!!!");
        //             } else {
        //                 egret.log("创建房间成功!!!");
        //             }
        //         });
    }
    public quit(){
        this.YMWebRTCAPI.quit();
    }
    
    private getUserSig(callBack) {

        var url = `https://rtcapi.youme.im/getusersig?sdkappid=${this.sdkAppId}&username=${this.openid}`;
        var req = new egret.HttpRequest();
        req.responseType = egret.HttpResponseType.TEXT;
        req.addEventListener(egret.Event.COMPLETE, (event) => {
            var result = JSON.parse(event.currentTarget.response)
            callBack(result.data)
        }, this);
        req.addEventListener(egret.IOErrorEvent.IO_ERROR, (err) => {
            console.log('网络错误：', err);
        }, this);
        req.addEventListener(egret.ProgressEvent.PROGRESS, (e) => {
            // console.log('PROGRESS', e);
        }, this);

        req.open(url, egret.HttpMethod.GET);
        req.send();
    }
}