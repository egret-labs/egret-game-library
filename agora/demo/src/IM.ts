class IM {
    private client: AgoraRTC.AgoraClient;
    private localStream: AgoraRTC.LocalStream;

    private channelID: string;
    private onSuccess: Function;
    private onFailure: Function;
    private onShowMessage: Function;
    private uid: number;//从声网获取
    constructor(channelID: any, onSuccess: Function, onFailure: Function, onShowMessage: Function) {
        this.onSuccess = onSuccess;
        this.onFailure = onFailure;
        this.onShowMessage = onShowMessage;
        this.channelID = channelID.toString();
        this.init();

    }
    private init() {
        var createObj: AgoraRTC.ICreateObj = { "mode": 'interop' };
        this.client = AgoraRTC.createClient(createObj);
        var appid = "0138e815209a483385af2325bb753eda";//测试id
        egret.log('demo使用的是声网测试账号，如果无法运行，请更换成你的账号');
        this.client.init(appid, this.t2_joinChannel.bind(this), this.onFailure);
    }
    private t2_joinChannel() {
        this.client.join(null, this.channelID, undefined, (uid) => {
            // console.log("t01-1-用户:" + uid + " 加入频道");
            egret.log("用户:" + uid + " 加入频道");
            this.uid = uid;
            this.t3_createStream();
        }, (err) => {
            egret.log("加入频道失败");
            this.onFailure(err)
        });
    }
    public t3_createStream() {
        var spec: AgoraRTC.Ispec = {
            streamID: this.uid,
            audio: true,
            vidoe: false
        }
        var localStream = AgoraRTC.createStream(spec);
        this.localStream = localStream;
        localStream.on("accessAllowed", () => {
            // egret.log("accessAllowed");
        });

        // The user has denied access to the camera and mic.
        localStream.on("accessDenied", () => {
            // egret.log("accessDenied");
        });
        localStream.init(() => {
            this.localStream.play('agora_local');
            this.client.publish(this.localStream, (err) => {
                this.onFailure();
            })
            this.client.on('stream-published', (evt) => {
                this.onSuccess();
            });
        }, (err) => {
        })

        this.client.on('error', (err) => {
            this.onFailure();
            // egret.log("t-10: client 发生错误:", err.reason);
            if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
                this.client.renewChannelKey('', function () {
                    // egret.log("t-10-1:Renew channel key successfully");
                }, function (err) {
                    // egret.log("t-10-2:Renew channel key failed: ", err);
                });
            }
        });
        this.client.on('stream-added', (evt) => {//别的玩家加入
            var stream = evt.stream;
            this.onShowMessage('对方已经加入频道，连麦成功')
            // egret.log("t-11: New stream added: " + stream.getId());
            // egret.log("Subscribe ", stream);
            this.client.subscribe(stream, (err) => {
                // egret.log("t-11-1: Subscribe stream failed", err);
            });
        });

        this.client.on('peer-leave', (evt) => {
            // egret.log('t-13:', "peer-leave");
            var stream = evt.stream;
            if (stream) {
                stream.stop();
                this.onShowMessage('对方已经离开频道')
                // egret.log('t-13-1:', evt.uid + " leaved from this channel");
            }
        });
        this.client.on('stream-subscribed', (evt) => {
            var stream = evt.stream;
            stream.play('agora_local');
        });
        this.client.on('stream-removed', (evt) => {
            var stream = evt.stream;
            stream.stop();
            // egret.log("t-12: Remote stream is removed " + stream.getId());
        });
    }
    public logIn(): void {
        this.init();
    }
    public logOut() {
        this.localStream.stop();
        this.localStream.close();
        this.client.leave(function () {
            egret.log("Leavel channel successfully");
        }, function (err) {
            egret.log("Leave channel failed");
        });
    }
}