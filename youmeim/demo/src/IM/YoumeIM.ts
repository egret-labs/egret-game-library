/**
 * 游密IM SDK简单封装
 * 接收到IM事件后可把事件dispatch为egret事件，也可以直接监听游密事件
 *
 * @class YoumeIM
 * @extends {egret.EventDispatcher}
 */
class YoumeIM extends egret.EventDispatcher {
  private static ERROR_NAME = {
    // 通用
    NotLoginError: "请先登录",
    InvalidParamError: "无效的参数",
    InvalidLoginError: "无效的登录",
    UsernameOrTokenError: "用户名或token错误",
    LoginTimeoutError: "登录超时",
    ServiceOverloadError: "服务过载，消息传输过于频繁",
    MessageTooLongError: "消息长度超出限制，最大长度1400",
    // 录音
    UnsupportedVoiceFormatError: "不支持的音频格式",
    DeviceNotSupportedError: "设备不支持录音",
    AlreadyReadyError: "已经录过音或加载过音频了，要重新录音请重新 new 一个新实例",
    CanceledError: "已经取消了录音或录音出错了，要重新录音请重新 new 一个新实例",
    NotAllowedError: "没有录音权限",
    RecorderNotStartedError: "没有启动录音却企图完成录音",
    RecorderBusyError: "录音系统正忙，可能有其他实例正在录音中",
    RecordTooShortError: "录音时长太短",
    WXObjectIsEmptyError: "未传入微信wx对象",
    WXObjectNoConfigError: "微信wx对象尚未初始化",
    WXNoPermissionError: "微信wx对象没有提供录音相关接口权限",
    NotSupportedError: "环境不支持，录音需要https或localhost环境下打开页面"
  };

  private appKey: string = "YOUMEBC2B3171A7A165DC10918A7B50A4B939F2A187D0";
  private static _instance: YoumeIM;
  private _yim: YIM;
  public userId: string = "";
  public roomId: string = "";

  constructor() {
    super();

    if (YoumeIM._instance) {
      return YoumeIM._instance;
    }
    // 初始化
    this._yim = new YIM({appKey: this.appKey, useMessageType: [TextMessage, VoiceMessage]});

    // 初始化录音插件
    this.init();
    // 绑定事件
    this.bindEvents();
  }

  // 单例
  public static get getInstance() {
    return YoumeIM._instance || (YoumeIM._instance = new YoumeIM());
  }

  private init(): void {
    // 注册语音插件
    VoiceMessage.registerRecorder([MP3Recorder]);

    // 初始化录音授权，此步骤可省略。
    // 若省略此步，调用 startRecord() 的时候，浏览器可能会弹出麦克风授权框
    VoiceMessage.initRecorder()
      .then(() => {
        egret.log("初始化录音完毕");
      })
      .catch(e => {
        egret.log(YoumeIM.getErrorMsg(e.name));
      });
  }

  public login(userId: string, token: string, roomId: string): void {
    // 登录
    this._yim.login(userId, token).catch(e => {
      egret.log("登录失败: " + YoumeIM.getErrorMsg(e.name));
    });

    // 若填写了房间号，则加入房间，会自动等登录成功了再加入房间
    if (roomId) {
      this._yim.joinRoom(roomId).catch(e => {
        egret.log("加入房间失败: " + YoumeIM.getErrorMsg(e.name));
      });
    }
  }

  // 退出房间
  public leaveRoom(roomId: string): void {
    this._yim.leaveRoom(roomId);
  }

  // 退出登录
  public logout(): void {
    this._yim.logout();
  }

  // 获取当前用户userId
  public getMyUserId(): string {
    return this._yim.getMyUserId();
  }

  // 发送消息到某房间
  public sendToRoom(roomId: string, msg: Message): Promise<void | MessageObject> {
    return this._yim.sendToRoom(roomId, msg);
  }

  // 发送消息给某用户
  public sendToUser(userId: string, msg: Message): Promise<void | MessageObject> {
    return this._yim.sendToUser(userId, msg);
  }

  private bindEvents(): void {
    // 事件绑定：已登录
    this._yim.on(youme.ImEvent.ACCOUNT_LOGIN, () => {
      egret.log("已登录到: " + this._yim.getMyUserId());
      const imEvent = new youme.ImEvent(youme.ImEvent.ACCOUNT_LOGIN);
      this.dispatchEvent(imEvent);
    });

    // 事件绑定：正在登录中
    this._yim.on(youme.ImEvent.ACCOUNT_LOGGING, () => {
      egret.log("登录中...");
      const imEvent = new youme.ImEvent(youme.ImEvent.ACCOUNT_LOGGING);
      this.dispatchEvent(imEvent);
    });

    // 事件绑定：退出登录
    this._yim.on(youme.ImEvent.ACCOUNT_LOGOUT, () => {
      egret.log("退出登录");
      const imEvent = new youme.ImEvent(youme.ImEvent.ACCOUNT_LOGOUT);
      this.dispatchEvent(imEvent);
    });

    // 事件绑定：登录失败
    this._yim.on(youme.ImEvent.ACCOUNT_ERROR_ALL, (eventName, e) => {
      egret.log("登录失败: " + YoumeIM.getErrorMsg(e.name));
    });

    // 事件绑定：被踢下线
    this._yim.on(youme.ImEvent.ACCOUNT_KICKOFF, () => {
      egret.log("你被踢下线");
      const imEvent = new youme.ImEvent(youme.ImEvent.ACCOUNT_KICKOFF);
      this.dispatchEvent(imEvent);
    });

    // 事件绑定：正在请求加入房间
    this._yim.on(youme.ImEvent.ROOM_JOINING_ALL, (eventName, roomId) => {
      egret.log("正在加入房间: " + roomId);
      const imEvent = new youme.ImEvent(youme.ImEvent.ROOM_JOIN_ALL);
      imEvent.setContent(roomId);
      this.dispatchEvent(imEvent);
    });

    // 事件绑定：加入房间
    this._yim.on(youme.ImEvent.ROOM_JOIN_ALL, (eventName, roomId) => {
      egret.log("加入到房间: " + roomId);
      const imEvent = new youme.ImEvent(youme.ImEvent.ROOM_JOIN_ALL);
      imEvent.setContent(roomId);
    });

    // 事件绑定：退出房间
    this._yim.on(youme.ImEvent.ROOM_LEAVE_ALL, (eventName, roomId) => {
      egret.log("退出房间: " + roomId);
      const imEvent = new youme.ImEvent(youme.ImEvent.ROOM_LEAVE_ALL);
      imEvent.setContent(roomId);
      this.dispatchEvent(imEvent);
    });

    // 事件绑定：加入房间失败
    this._yim.on(youme.ImEvent.ROOM_JOIN_ERROR_ALL, (eventName, e, roomId) => {
      egret.log("加入房间" + roomId + " 失败: " + YoumeIM.getErrorMsg(e.name));
      const imEvent = new youme.ImEvent(youme.ImEvent.ROOM_JOIN_ERROR_ALL);
      imEvent.setError(e);
      imEvent.setContent(roomId);
      this.dispatchEvent(imEvent);
    });

    // 事件绑定：退出房间失败
    this._yim.on(youme.ImEvent.ROOM_LEAVE_ERROR_ALL, (eventName, e, roomId) => {
      egret.log("退出房间" + roomId + " 失败: " + YoumeIM.getErrorMsg(e.name));
      const imEvent = new youme.ImEvent(youme.ImEvent.ROOM_LEAVE_ERROR_ALL);
      imEvent.setError(e);
      imEvent.setContent(roomId);
      this.dispatchEvent(imEvent);
    });

    // 事件绑定：发送/接收了消息
    this._yim.on(youme.ImEvent.MESSAGE_ALL, (eventName, msgObj) => {
      const imEvent = new youme.ImEvent(youme.ImEvent.MESSAGE_ALL);
      imEvent.setContent(msgObj);
      this.dispatchEvent(imEvent);
    });
  }

  public static getErrorMsg(errorName: string) {
    return YoumeIM.ERROR_NAME[errorName] || errorName;
  }
}
