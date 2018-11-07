/**
 * 游密WebRTC SDK
 *
 * @see https://youme.im/doc/TalkHtml5QuickStart.php
 * @class YMRTC
 */
declare class YMRTC {
  constructor(config: YMRTC.Config)

  /**
   *异步请求一个成员的媒体流（stream）。若未与此成员建立连接， 则等待连接完成，否则直接回调已存在的媒体流。
   *
   * @param {string} userId 成员ID
   * @returns {Promise<MediaStream>}
   * @memberof YMRTC
   */
  requestUserStream(userId: string): Promise<MediaStream>

  /**
   * 获取一个成员的静音状态
   *
   * @param userId
   * @memberof YMRTC
   */
  getMute(userId: string): boolean

  /**
   * 为一个成员的音频流设置静音。
   *
   * @param {string} userId 成员ID
   * @param {boolean} isMuted 是否静音
   * @memberof YMRTC
   */
  setMute(userId: string, isMuted: boolean): void

  /**
   * 为所有成员的音频流设置静音。
   *
   * @param {boolean} isMuted 是否静音
   * @memberof YMRTC
   */
  setAllMute(isMuted: boolean): void

  /**
   * 加入房间，会自动等待登录成功以及本地媒体初始化完成再加入房间。
   *
   * @param {string} roomId 房间ID
   * @returns {Promise<void>} resolve加入房间成功 reject加入房间失败
   * @memberof YMRTC
   */
  joinRoom(roomId: string): Promise<void>

  /**
   * 退出房间，并断开房间内成员之间的连接。强制退出，无返回值。
   *
   * @param {string} [roomid] 指定要退出的房间ID，若不指定则退出所有房间
   * @memberof YMRTC
   */
  leaveRoom(roomid?: string): void

  /**
   * 返回目前是否正在某个房间之内。
   *
   * @param {string} roomId 房间ID
   * @returns {boolean}
   * @memberof YMRTC
   */
  inRoom(roomId: string): boolean

  /**
   * 返回当前已经加入的房间ID列表。
   *
   * @returns {Array<string>} 房间ID数组
   * @memberof YMRTC
   */
  getRoomIdList(): Array<string>

  /**
   * 返回房间内所有成员的ID列表。
   *
   * @param {string} roomId 房间ID
   * @returns {Array<string>} 成员ID数组
   * @memberof YMRTC
   */
  getRoomMemberIdList(roomId: string): Array<string>

  /**
   * 启动本地媒体。
   *
   * @returns {Promise<MediaStream | DOMException>}
   * 完成回调: MediaStream - 启动成功，获得本地媒体流对象， 赋值给 <video> 或 <audio> 的 srcObject 属性即可播放。
   * 关于此对象的更多资料 @see https://developer.mozilla.org/en-US/docs/Web/API/MediaStream
   * 拒绝回调: DOMException - 启动失败，获得原生的错误对象。 具体错误可参见
   * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Return_value
   *
   * @memberof YMRTC
   */
  startLocalMedia(): Promise<MediaStream | DOMException>

  /**
   * 暂停本地媒体（屏蔽摄像头、关闭麦克风）。
   *
   * @memberof YMRTC
   */
  pauseLocalMedia(): void

  /**
   * 暂停本地视频（只屏蔽摄像头，麦克风不变）。
   *
   * @memberof YMRTC
   */
  pauseLocalVideo(): void

  /**
   * 暂停本地视频（只屏蔽麦克风，摄像头不变）。
   *
   * @memberof YMRTC
   */
  pauseLocalAudio(): void

  /**
   * 恢复本地媒体（取消屏蔽摄像头、取消关闭麦克风）。
   *
   * @memberof YMRTC
   */
  resumeLocalMedia(): void

  /**
   * 恢复本地视频（只取消屏蔽摄像头、麦克风不变）。
   *
   * @memberof YMRTC
   */
  resumeLocalVideo(): void

  /**
   * 恢复本地音频（只取消屏蔽麦克风、摄像头不变）。
   *
   * @memberof YMRTC
   */
  resumeLocalAudio(): void

  /**
   * 返回摄像头是否为屏蔽状态。
   *
   * @returns {boolean} true: 屏蔽了，false: 没屏蔽
   * @memberof YMRTC
   */
  isLocalVideoPaused(): boolean

  /**
   * 返回麦克风是否为屏蔽状态。
   *
   * @returns {boolean} true: 屏蔽了，false: 没屏蔽
   * @memberof YMRTC
   */
  isLocalAudioPaused(): boolean

  /**
   * 停止本地媒体（关掉摄像头和麦克风的电源）。
   *
   * @memberof YMRTC
   */
  stopLocalMedia(): void

  /**
   * 获取本地媒体的当前状态。
   *
   * @returns {string}
   *  stop: 未启动，starting: 正在尝试启动， recording: 已经启动，
   *  正在录音和/或录像，failed: 启动失败
   * @memberof YMRTC
   */
  getLocalMediaStatus(): string

  /**
   * 异步请求本地媒体流 (stream)。若本地媒体尚未启动， 则等待启动成功，否则直接回调已存在的媒体流。
   *
   * @returns {(Promise<MediaStream | DOMException>)}
   *   完成回调: MediaStream - 获得本地媒体流 赋值给 <video> 或 <audio> 的 srcObject 属性即可播放。 关于此对象的更多资料，可参阅
   *   @see https://developer.mozilla.org/en-US/docs/Web/API/MediaStream
   *   拒绝回调: DOMException - 启动失败，获得原生的错误对象。
   * @memberof YMRTC
   */
  requestLocalMediaStream(): Promise<MediaStream | DOMException>

  /**
   * 用户登录。
   *
   * @param {string} userId 用户ID
   * @param {string} token 用户密码
   * @returns {(Promise<void | string>)}
   * @memberof YMRTC
   */
  login(userId: string, token: string): Promise<void | string>

  /**
   * 用户退出登录，断开所有连接。
   *
   * @memberof YMRTC
   */
  logout(): void

  /**
   * 获得当前用户ID。
   *
   * @returns {string}  用户ID。若未登录，则返回空字符串 ''。
   * @memberof YMRTC
   */
  getMyUserId(): string

  /**
   * 事件监听
   * @see https://youme.im/doc/TalkHtml5Guide.php#%E4%BA%8B%E4%BB%B6%E6%9C%BA%E5%88%B6
   *
   * @param {string} event 事件名
   * @param {Function} callback 回调
   * @memberof YMRTC
   */
  on(event: string, callback: Function)
}

declare namespace YMRTC {
  /**
   * 构造函数config配置
   *
   * @interface Config
   */
  interface Config {
    /**
     * @type {string} 游密分配的 appKey
     *
     * @memberof Config
     */
    appKey: string

    /**
     * 用户登录 ID，若在此处直接输入用户ID和密码，则初始化后自动登录
     *
     * @type {string}
     * @memberof Config
     */
    userId?: string

    /**
     * 用户登录密码，若在此处直接输入用户ID和密码，则初始化后自动登录
     *
     * @type {string}
     * @memberof Config
     */
    token?: string

    /**
     * 要加入的房间ID，若输入此值，则初始化并登录（自动或手动登录均可）之后自动加入房间
     *
     * @type {string}
     * @memberof Config
     */
    roomId?: string

    /**
     * 是否为视频聊天，若为 false 则为仅语音聊天
     *
     * @type {boolean}
     * @memberof Config
     */
    video?: boolean

    /**
     * 可选。自定义本地媒体的配置，配置项可参看 mdn 文档
     * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints
     *
     * @type {MediaStreamConstraints}
     * @memberof Config
     */
    localMediaConstraints?: MediaStreamConstraints
  }
}
