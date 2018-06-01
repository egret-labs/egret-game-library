class MatchvsDemo {
    private engine: MatchvsEngine;
    private response: MatchvsResponse;
    private gameID = 201208;//请替换成你的 gameID
    private appKey = '1222fa8c13154dbfa79c730a4a3ee504';//请替换成你的 appKey
    private secret = 'd244b8f6ba3b4e7084aa5bfaf794c8ac';//请替换成你的 secret
    private userID: any;
    private token: any;
    public messageCallBack: Function;
    constructor() {
        // egret.log('matchvs demo - v1')
        this.engine = new MatchvsEngine();
        this.response = new MatchvsResponse();

        //初始化
        this.engine.init(this.response, "MatchVS", "alpha", this.gameID)
    }
    public registerUser() {
        this.response.errorResponse = function (error) {
            egret.log("错误信息：", error);
        }

        this.response.registerUserResponse = (userInfo) => {
            this.userID = userInfo.id;
            this.token = userInfo.token;
            // 用户ID
            egret.log("userId: ", userInfo.id);
            // token
            egret.log("token: ", userInfo.token);
            egret.log('----注册用户结束----')
        }
        this.engine.registerUser();
    }
    public login() {
        this.response.loginResponse = (loginRsp) => {
            egret.log('loginRsp' + JSON.stringify(loginRsp))
            // 返回值
            var status = loginRsp.status;
            // 房间号
            var roomId = loginRsp.roomID;
            if (status === 200) {
                egret.log('返回值:', status);
                egret.log('房间号:', roomId);
                egret.log('----登陆结束----')
            } else {
                egret.log('登陆失败', status)
            }
        }
        var deviceID = '';
        this.engine.login(this.userID, this.token, this.gameID, 2.0, this.appKey, this.secret, this.userID, 0);
    }
    public joinRandomRoom(callBack: Function) {
        this.response.joinRoomResponse = (status, roomUserInfoList, roomInfo) => {
            egret.log('加入房间结果：', status);
            egret.log('房间信息：', JSON.stringify(roomInfo));
            // egret.log('玩家信息：',JSON.stringify(roomUserInfoList));
            egret.log('----加入房间结束----')
            if (roomInfo.ownerId.toString() == this.userID.toString()) {
                egret.log('我是房主')
                callBack(0);
            } else {
                egret.log('我是玩家')
                callBack(1);
            }
        }
        this.response.joinRoomNotify = (roomUserInfo) => {
            egret.log("其他玩家加入：", JSON.stringify(roomUserInfo));
        }
        var user = JSON.stringify({
            name: 'EgretUser-' + Math.floor(Math.random() * 1000),
            life: Math.floor(Math.random() * 100)
        })
        //发送消息的返回
        this.response.sendEventResponse = (sendEventRsp) => {
            // egret.log("返回状态：", sendEventRsp.status);
            // egret.log("事件序号：", sendEventRsp.sequence);
        }
        this.response.sendEventNotify = (eventInfo) => {
            // egret.log("推送方用户ID：", eventInfo.srcUserId);
            // egret.log("消息内容：", eventInfo.cpProto);
            this.messageCallBack(eventInfo.cpProto);
        }
        var type = this.engine.joinRandomRoom(2, user);
    }
    public stopJoin() {
        this.response.joinOverResponse = (joinOverRsp) => {
            // 返回值
            egret.log("加入房间结果：", joinOverRsp.status);
            // 负载数据
            egret.log("负载信息：", joinOverRsp.cpProto);
        }
        this.engine.joinOver('full')
    }
    public sendEvent(msg: string) {
        this.engine.sendEvent(msg);
    }
    public logout() {
        this.response.logoutResponse = (status) => {
            egret.log("状态返回值：", status);
        }
        this.engine.logout('logout!!');
    }
    public uninit() {
        this.engine.uninit();
    }

}
