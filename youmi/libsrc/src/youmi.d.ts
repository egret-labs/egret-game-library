declare class YMWebRTCAPI {
    /**
     * SDK 初始化
     */
    init(listener: YMWebRTCAPI.Listener, config: YMWebRTCAPI.Config): void;
    /**
         * 打开麦克风
         */
    openAudio: Function;
    /**
     * 关闭麦克风
     */
    closeAudio: Function;
    /**
     * 创建房间
     */
    createRoom(opts: any, callback: Function): void;
    /**
     * 退出房间
     */
    quit(): void;
    /**
     * 打开本地摄像头
     */
    openVideo(): void;
    /**
     * 关闭本地摄像头
     */
    closeVideo(): void;
    /**
     * 切换spear配置的角色
     */
    changeSpearRole(role: string): void;
    /**
     * return: openid
     */
    getOpenId(tinyid: string): string;
    /**
     * 枚举摄像头
     */
    getVideoDevices(callback:Function):void;
    /**
     * 选择摄像头
     */
    chooseVideoDevice(device:Object):void;
}
declare namespace YMWebRTCAPI {
    interface Listener {
        /**
         * 视频状态通知，切换了摄像头/麦克风的开关状态
         */
        onMediaChange?: Function;
        /**
         * 远端断开
         */
        onRemoteLeave?: Function;
        /**
         * 初始化成功的回调
         */
        onInitResult?: Function;
        /**
         * 新增本地视频流
         */
        onLocalStreamAdd?: Function;
        /**
         * 新增远端视频流
         */
        onRemoteStreamAdd?: Function;
        /**
         * 远端视频流断开
         */
        onRemoteStreamRemove?: Function;
        /**
         * 远端视频流更新
         */
        onUpdateRemoteStream?: Function;
        /**
         * 被踢下线
         */
        onKickout?: Function;
        /**
         * websocket断开
         */
        onWebSocketClose?: Function;
        /**
         * 视频流server超时断开
         */
        onRelayTimeout?: Function;
        /**
         * ICE连接断开
         */
        onIceConnectionClose?: Function;
        /**
         * 主路/辅路状态更新通知
         */
        onChangeRemoteStreamState?: Function;
    }
    interface Config {
        /**
         * 网页通讯，true
         */
        webim: boolean,
        /**
         * 应用的sdkappid
         */
        sdkAppId: number;
        /**
         * 用户的唯一标识
         */
        openid: string;
        /**
         * 鉴权签名
         */
        userSig: string;
        /**
         * 账户类型 
         */
        accountType: number;
        /**
         * 是否关闭自动推流(如果置为true，则在完成加入/建房操作后，不会发起本端的推流，如需推流，需要由业务主动调推流接口)
         */
        closeLocalMedia?: boolean;
        /**
         *  是否启用音频采集 ，默认 true
         */
        audio?: boolean;
        /**
         *  是否启用视频采集 ，默认 true
         */
        video?: boolean;
    }
}