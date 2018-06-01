declare namespace AgoraRTC {
    /**
     * 创建音视频对象
     */
    let createClient: (createObj: ICreateObj) => AgoraClient;//: AgoraRTC.AgoraClient;
    /**
     * 创建本地流, 修改对应的参数可以指定启用/禁用特定功能
     */
    let createStream: (spec: Ispec) => LocalStream;
    interface AgoraClient {
        /**
         * 初始化
         * @param appID 从 agora 后台获取
         */
        init(appID: string, onSuccess: Function, onFailure: Function): void;
        /**
         * @param ChannelKey null 或者自己按照规则生成的 ChannelKey
         */
        join(channelKey: string, channel: string, uid: number, onSuccess?: Function, onFailure?: Function): void;
        publish(stream: LocalStream, callBack: Function): void;
        unpublish(stream: LocalStream, callBack: Function): void;
        on(eventNamt: string, listener: Function): void;
        renewChannelKey(channelKey: string, onSuccess?: Function, onFailure?: Function);
        /**
         * 该方法从服务器端接收远程音视频流
         */
        subscribe(stream: any, onFailure?: Function): void;
        /**
         * 取消订阅远程音视频流
         */
        unsubscribe(stream: any, onFailure?: Function): void;

        leave(onSuccess?: Function, onFailure?: Function): void;

    }
    interface LocalStream {
        /**
         * 设置视频属性
         */
        setVideoProfile(profile: string): void;
        on(eventNamt: string, listener: Function): void;
        init(onSuccess?: Function, onFailure?: Function): void;
        play(divID: string): void;
        stop():void;
        close():void;
    }
    /**
     * Safari mode 为 “h264_interop”。
     * 其他浏览器 mode 为 “interop”
     */
    interface ICreateObj {
        mode: AgoraCreateType;
    }
    interface Ispec {
        streamID: number,
        audio: boolean,
        vidoe: boolean,
        screen?: boolean,
        mirror?: boolean
        mediaSource?: any,
        extensionId?: string,
        attributes?: any,
        cameraId?: any,
        microphoneId?: any,
    }
    interface IMediaSource {

    }
    type AgoraCreateType = "interop" | "h264_interop";
}