/**
 * @fileOverview 游密 H5 IM SDK Core 描述文件
 * @author benz@youme.im
 * @date 2018/6/26
 *
 * 每位工程师都有保持代码优雅的义务
 * each engineer has a duty to keep the code elegant
 */

type eventCallback = (...payload: any[]) => void;
type wildcardEventCallback = (eventName: string, ...payload: any[]) => void;

declare class WildEmitter  {
    static mixin<T>(object: T): T & WildEmitter;

    isWildEmitter: true;

    emit(event: string, ...payload: any[]): any;

    off(event: string, fn?: Function): any;

    on(event: string, groupName: string, fn: eventCallback | wildcardEventCallback): any;
    on(event: string, fn: eventCallback | wildcardEventCallback): any;

    once(event: string, groupName: string, fn: eventCallback | wildcardEventCallback): any;
    once(event: string, fn: eventCallback | wildcardEventCallback): any;

    releaseGroup(groupName: string): any;
}

type AnyJson =  boolean | number | string | null | JsonArray | JsonMap;
interface JsonMap {  [key: string]: AnyJson; }
interface JsonArray extends Array<AnyJson> {}

/**
 * 消息基类，供继承扩展
 * @class
 * @category 消息控制
 */
declare abstract class Message extends WildEmitter {

    /**
     * 当消息内容创建好了，派生类须调用一下这个方法
     * 例如文字消息直接把文字输入此方法
     * 例如语音消息录音完毕后把需要传输出去的信息用 JSON 输入此方法
     * @param {string | AnyJson} content
     * @private
     */
    protected setContent(content: string | AnyJson): void;

    /**
     * 当消息内容放弃创建，派生类须调用一下这个方法
     * 例如语音消息放弃录音了
     * @private
     */
    protected setCancelled(): void;

    /**
     * 若需要上传文件，请把 Blob 输入此方法，并在 Promise 返回之后再调用 setContent
     * @param {Blob} file
     * @return {Promise<string>} 上传完成后用 Promise 回调下载地址
     */
    protected uploadFile(file: Blob): Promise<string>;

    /**
     * 若需要使用微信 token，请使用此方法
     * @return {Promise<string>}
     */
    protected requestWechatToken(): Promise<string>;

    /**
     * 自定义类型的ID 总是 0
     */
    protected typeId: number;

    /**
     * 子类实现：消息类型名字标识，文本为 'text'，语音为 'voice'，更多类型可以自定义名字
     */
    protected abstract typeName: string;

    /**
     * 子类实现：从服务器收到一串消息之后该如何初始化
     * 例如收到语音消息后，在此分析 content ，做好随时播放语音的准备
     * @param {string} content 收到的消息
     * @return {Promise<void>}
     */
    public abstract initWithContent(content: string): Promise<void>;

    /**
     * 是否已准备好
     * @return {boolean}
     */
    public isReady(): boolean;

    /**
     * 是否已经取消该消息
     * @return {boolean}
     */
    public isCanceled(): boolean;

    /**
     * 取消息内容
     * @return {string}
     */
    public getContent(): string;

    /**
     * 取消息类型ID
     * @return {number}
     */
    public getTypeId(): number;

    /**
     * 取消息类型字
     * @return {string}
     */
    public getType(): string;
}

type ChatType = 'user' | 'group';

/**
 * 消息类型，供读取
 * @category 消息控制
 */
interface MessageObject {
    senderId: string;
    receiverId: string;
    withPeer: string;
    isFromMe: boolean;
    chatType: ChatType;
    time: Date;
    serial?: string;
    serverId: string;
    message: Message;
}

interface InitConfig {
    appKey: string;
    userId?: string;
    token?: string;
    roomId?: string | number;
    useMessageType?: (new () => Message) | Array<new () => Message>;
}

declare class YIM extends WildEmitter {

    constructor(config?: InitConfig);

    /**
     * 初始化
     * @param {InitConfig} config
     * @return {Promise<void>} 完成初始化
     *   - 若设定了用户名和密码，则登录成功后回调
     *   - 若同时设定了用户名、密码、房间号，则加入房间后回调
     *   - 若没有用户名和密码，则无论是否设定房间号，都立即回调，不等待加入房间
     */
    public init(config: InitConfig): Promise<void>;

    /**
     * 反初始化，相当于 logout()
     */
    public uninit(): void;

    /***** account *****/

    /**
     * 登录
     * @param {string} userId
     * @param {string} token
     * @param {boolean} silent=false 若 true，则登录失败时不抛出错误（关闭 catch）
     * @returns {Promise<void>}
     * @category 用户帐户控制
     */
    public login(userId: string, token: string, silent?: boolean): Promise<void>;

    /**
     * 退出登录，同时清空内存中的聊天记录，并退出所有房间
     * @category 用户帐户控制
     */
    public logout(): void;
    
    /**
     * 是否正在进行登录中（请求了登录，但尚未成功登录）
     * @return {boolean}
     */
    public isLogging(): boolean;
    
    /**
     * 是否已经完成登录
     * @return {boolean}
     */
    public isLogged(): boolean;
    
    /**
     * 获得当前用户ID。
     * @return {string} - 用户ID。若未登录，则返回空字符串 ''。
     * @category 用户帐户控制
     */
    public getMyUserId(): string;

    /***** room *****/

    /**
     * 加入房间
     * @param {string | number} roomId
     * @return {Promise<void>}
     * @category 房间控制
     */
    public joinRoom(roomId: string | number): Promise<string>;

    /**
     * 退出房间
     * @param {string | number} roomId
     * @return {Promise<void>} 完成退出
     * @category 房间控制
     */
    public leaveRoom(roomId?: string | number): Promise<void>;

    /**
     * 检测是否在房间里
     * @param {string | number} roomId
     * @return {boolean}
     * @category 房间控制
     */
    public inRoom(roomId: string | number): boolean;

    /**
     * 已加入的房间列表
     * @return {string[]}
     * @category 房间控制
     */
    public getRoomIdList(): string[];

    /**
     * 房间内的成员列表
     * @param {string | number} roomId
     * @return {string[] | null}
     * @category 房间控制
     */

    /***** message *****/

    /**
     * 注册一个或多个消息类型（不注册则收取不到该类型的消息）
     * @param {{new(): Message} | Array<{new(): Message}>} MsgClass
     * @example YIM.registerMessageType([ TextMessage, VoiceMessage ]);
     * @category 消息控制
     */
    public registerMessageType(MsgClass: (new () => Message) | Array<new () => Message>): void;

    /**
     * 群发消息到指定房间
     * @param {string} roomId
     * @param {Message} msg
     * @param {boolean} silent=false 若 true，则发送失败时不抛出错误（关闭 catch）
     * @return {Promise<void>}
     * @category 消息控制
     */
    public sendToRoom(roomId: string | number, msg: Message, silent?: boolean): Promise<MessageObject | void>;

    /**
     * 私发消息给某人
     * @param {string} userId
     * @param {Message} msg
     * @param {boolean} silent=false 若 true，则发送失败时不抛出错误（关闭 catch）
     * @return {Promise<void>}
     * @category 消息控制
     */
    public sendToUser(userId: string, msg: Message, silent?: boolean): Promise<MessageObject | void>;

    /**
     * 获取历史消息列表
     * @param {string} userOrRoomId 接收者用户ID
     * @param {string} minMsgId 消息范围开始ID
     * @param {string} maxMsgId 消息范围结束ID
     * @param {number} day 消息天数
     * @return {Promise<MessageObject[]>}
     * @category 消息控制
     */
    public requestHistoryMessage(userOrRoomId: string, minMsgId: string, maxMsgId: string, day: number): Promise<MessageObject[]>;
    

    /***** events *****/

    /**
     * 用户登录成功。
     * @event YIM#event:"account.login"
     * @category 用户帐户控制
     */
    /**
     * 正在登录。
     * @event YIM#event:"account.logging"
     * @category 用户帐户控制
     */
    /**
     * 已登出。
     * @event YIM#event:"account.logout"
     * @category 用户帐户控制
     */
    /**
     * 被踢下线。
     * @event YIM#event:"account.kickoff"
     * @category 用户帐户控制
     */
    /**
     * 用户名或密码错误
     * @event YIM#event:"account.error:UsernameOrTokenError"
     * @property {Error} e - 错误对象，e.name = 'UsernameOrTokenError'
     * @category 用户帐户控制
     */

    /**
     * 本帐户正在请求进入房间[roomId]。
     * @event YIM#event:"room.joining:[roomId]"
     * @property {string} roomId - 房间ID
     * @category 房间控制
     */
    /**
     * 本帐户进入了房间[roomId]。
     * @event YIM#event:"room.join:[roomId]"
     * @property {string} roomId - 房间ID
     * @category 房间控制
     */
    /**
     * 本帐户离开了房间[roomId]。
     * @event YIM#event:"room.leave:[roomId]"
     * @property {string} roomId - 房间ID
     * @category 房间控制
     */

    /**
     * 成功发送了消息
     * @event YIM#event:"message:send:['user'|'group']:[userId|roomId]"
     * @property {MessageObject} msgObj - 消息对象
     * @category 消息控制
     */
    /**
     * 发送消息失败：长度超限
     * @event YIM#event:"message:send-failed:MessageTooLongError:['user'|'group']:[userId|roomId]"
     * @property {Message} msgInstance - 消息对象
     * @category 消息控制
     */
    /**
     * 发送消息失败：未登录
     * @event YIM#event:"message:send-failed:NotLoginError:['user'|'group']:[userId|roomId]"
     * @property {Message} msgInstance - 消息对象
     * @category 消息控制
     */
    /**
     * 接收到消息
     * @event YIM#event:"message:receive:['user'|'group']:[userId|roomId]"
     * @property {MessageObject} msgObj - 消息对象
     * @category 消息控制
     */

    /**
     * 信令连接状态改变。
     * @event YIM#event:"signaling.status:[status]"
     * @property {string} status - 新的状态值，状态的取值：<br>
     *  - `disconnected`: 未连接；<br>
     *  - `connecting`: 正在尝试连接；<br>
     *  - `connected`: 已连接；<br>
     *  - `reconnecting`: （掉线后）重新连接；<br>
     *  - `ended`: 用户主动结束了连接。<br>
     * @category 信令服务器连接
     */
    /**
     * 信令服务器已经成功连接，等同于事件 `signaling.status:connected`
     * @event YIM#event:"signaling.ready"
     * @category 信令服务器连接
     */


    /***** classes *****/

    /**
     * 放出 WildEmitter 类，供扩展插件选择使用
     * 详情参阅：https://github.com/HenrikJoreteg/wildemitter
     * @class
     */
    public static WildEmitter: typeof WildEmitter;

    /**
     * 消息基类，供继承扩展
     * @class
     * @category 消息控制
     */
    public static Message: typeof Message;
}

/**
 * @fileOverview 文本消息
 * @author benz@youme.im
 * @date 2018/6/28
 *
 * 每位工程师都有保持代码优雅的义务
 * each engineer has a duty to keep the code elegant
 */

declare class TextMessage extends YIM.Message {
    /**
     * 可直接新建一个文本消息对象
     * @param {string} text
     */
    constructor(text?: string);

    /**
     * 设置文本
     * @param {string} text
     */
    public setText(text: string): void;

    /**
     * 取得文本
     * @return {string}
     */
    public getText(): string;

    protected typeId: number;
    protected typeName: string;
    public initWithContent(content: string): Promise<void>;

    /**
     * 按事先设置的脏字数组
     * @param {string} text 原始消息
     * @param {string='**'} replace 脏字替换字，默认为 '**'
     */
    public static filterDirty(text: string, replace?: string): string;

    /**
     * 设置过滤脏字，若传入 null 则取消过滤
     * @param {string[] | null} wordsArray
     */
    public static setDirtyWords(wordsArray: string[] | null): void;
}



/**
 * @fileOverview 语音消息类
 * @author benz@youme.im
 * @date 2018/6/28
 *
 * 每位工程师都有保持代码优雅的义务
 * each engineer has a duty to keep the code elegant
 */

/**
 * Recorder 基类，实现录音插件
 * IM 核心会读取 typeId 和 getJsonMsg()，然后传给对方的 initWithJsonMsg()。
 * 子类请自行定制一个 Json 的格式，存储录音的相关信息。
 * 让 IM 核心可以从 getJsonMsg() 取出该格式的 Json，并传入另一方的 initWithJsonMsg()。
 * 另一方的 initWithJsonMsg() 经过解析，可实现录音播放。
 * @class
 * @abstract
 */
declare abstract class Recorder {

    /**
     * 子类实现：填入一个ID号，微信为1，WebRTC为2，其他类型可自定义ID号
     */
    protected abstract typeId: number;

    /**
     * 子类实现：录音机类型名字标识，微信为 'wechat'，WebRTC 为 'WebRTC'，其他类型可自定义
     */
    protected abstract typeName: string;

    public getTypeId(): number;
    public getType(): string;

    /**
     * 若需要上传音频，请把 Blob 输入此方法
     * @param {Blob} file
     * @return {Promise<string>} 上传完成后用 Promise 回调下载地址
     */
    protected uploadFile(file: Blob): Promise<string>;

    /**
     * 子类实现：判断是否支持当前系统环境，支持就返回 true
     * @return {boolean}
     */
    public abstract isEnvSupport(): boolean;

    /**
     * 子类实现：输入一个从服务器接收的 msg json 音频信息，判断能否支持其播放
     * @param {AnyJson} msg
     * @return {boolean}
     */
    public abstract isSupportMsg(msg: AnyJson): boolean;

    /********** 录音 **********/

    /**
     * 子类实现：初始化录音，然后返回 Promise
     *   若不需要初始化，请直接返回一个 Promise.resolve()
     * @return {Promise<void>} 返回初始化完毕后的 Promise
     */

    public abstract initRecord(): Promise<void>;

    /**
     * 子类实现：开始录音。
     *   子类不需要理会是否初始化，VoiceMessage 核心会先初始化了再调用这个录音的。
     *   注意：若无法支持多实例同时录音，请自行实现以下判断逻辑：
     *   若其他 VoiceMessage 实例仍在录音中，则子类须在此抛出以下错误：
     *     const err = new Error('Recorder is busy.');
     *     err.name = 'RecorderBusyError';
     *     throw err;
     * @return {Promise<void>} 处理好录音文件之后的 Promise
     */
    public abstract startRecord(): void | Promise<void>;

    /**
     * 子类实现：停止并完成录音，处理好录音文件，然后返回 Promise
     *   当 Promise 被 resolve 之后，play()、getJsonMsg()、getDuration() 须保证正常工作
     * @return {Promise<void>} 处理好录音文件之后的 Promise
     */
    public abstract finishRecord(): Promise<void>;

    /**
     * 子类实现：停止并放弃录音
     */
    public abstract cancelRecord(): void;

    /**
     * 子类实现：是否正在录音
     */
    public abstract isRecording(): boolean;

    /**
     * 子类实现：设定监听录音完成回调（包括手动停止录音&超时自动完成录音，不包括取消录音）
     *   当 callback 被回调之后，play()、getJsonMsg()、getDuration() 须保证正常工作
     * @param {function(): void} callback
     */
    public abstract onRecordEnd(callback: () => void): void;

    /**
     * 子类实现：获取用于服务器传输的 msg json
     * @return {AnyJson}
     */
    public abstract getJsonMsg(): AnyJson;

    /************ 播放 ************/

    /**
     * 子类实现：使用服务器接收的 msg json 进行初始化、下载音频
     *   注意：调用本方法之后，play()、getJsonMsg()、getDuration() 须保证正常工作
     * @param {AnyJson} json
     * @return {Promise<void>}
     */
    public abstract initWithJsonMsg(json: AnyJson): Promise<void>;

    /**
     * 子类实现：播放
     */
    public abstract play(): void;

    /**
     * 子类实现：停止
     */
    public abstract stop(): void;

    /**
     * 子类实现：是否正在播放
     * @return {boolean}
     */
    public abstract isPlaying(): boolean;

    /**
     * 子类实现：设定监听播放完毕回调（包括手动停止播放&播放到末尾自动停止）
     * @param {function(): void} callback
     */
    public abstract onPlayEnd(callback: () => void): void;

    /**
     * 子类实现：获取录音长度，（单位：秒），可以有小数
     * @return {number}
     */
    public abstract getDuration(): number;

    /************ ？？ ************/
    public __controls: {[fnName: string]: Function};
}

declare class VoiceMessage extends YIM.Message {
    /**
     * 放出 Recorder 基类，所有 Recorder 基于此基类开发
     * @type {Recorder}
     */
    public static Recorder: typeof Recorder;

    /**
     * 注册一个 Recorder
     * @param {Array<{new: Recorder}>} RecClass 数组，Recorder 类列表（直接传入，不要 new 和括号）
     */
    public static registerRecorder(RecClass: (new () => Recorder)[]): void;

    /**
     * 设备是否支持录音
     * @return {boolean}
     */
    public static isEnvSupport(): boolean;

    /**
     * 提前初始化录音，用于像“按住说话”之类的场景，提前让用户授权
     * @return {Promise<void>}
     */
    public static initRecorder(): Promise<void>;

    /**
     * 加入自动播放列表
     * @param {VoiceMessage} msg
     */
    public static addToAutoPlayQueue(msg: VoiceMessage): void;

    /**
     * 获取自动播放列表待播放的数量
     * @return {number} 数量
     */
    public static getAutoPlayQueueLength(): number;

    /**
     * 获取当前自动播放中正在播放的 VoiceMessage
     * @return {VoiceMessage | undefined} 返回 Message，没有自动播放则返回 undefined
     */
    public static getCurrentAutoPlayingMessage(): VoiceMessage | undefined;

    /**
     * 跳到下一音频
     */
    public static nextAutoPlay(): void;

    /**
     * 停止播放并清空播放列表
     */
    public static stopAndClearAutoPlayQueue(): void;

    /**
     * 绑定自动播放事件
     * @param {string} event 事件名
     * @param {Function} cb 事件 Function
     * @category 自动播放列表
     */
    public static bindAutoPlayEvent(event: string, cb: (...payload: any[]) => void): void;

    /**
     * 解绑自动播放事件
     * @param {string} event 事件名
     * @param {Function=} cb 事件 Function，若不填则清空所有事件
     * @category 自动播放列表
     */
    public static unbindAutoPlayEvent(event: string, cb?: (...payload: any[]) => void): void;

    protected typeId: number;
    protected typeName: string;

    /**
     * 使用服务器返回的或者其他实例获得的 JSON 或字符串内容来初始化语音，初始化成功后应可直接播放
     * @param content
     * @return Promise 成功初始化
     */
    public initWithContent(content: string): Promise<void>;

    /**
     * 初始化录音
     * 正常情况下可以直接调用 startRecord 开始录音，然后用户若尚未授权，系统会向用户询问授权
     * 若需要提前取得授权，可以调用此方法
     * @return {Promise<void>}
     */
    public initRecord(): Promise<void>;

    /**
     * 开始录音，若尚未初始化，会先自动初始化
     * 另外，视系统而定，两个 VoiceMessage 实例不一定可以同时录音。
     * 若另一 VoiceMessage 尚未结束录音，本实例调用 startRecord 可能会报错。
     * 目前，AMR、MP3 可支持多实例同时录音，微信不支持。
     * @param {boolean=false} silent 若为 true，出错时js不会报错，不能 catch，
     *           但可以通过监听 'error:*' 事件，或 isError() 获取错误信息。
     * @return {Promise<void>}
     */
    public startRecord(silent?: boolean): Promise<void>;

    /**
     * 结束录音
     * @param {boolean=false} silent 若为 true，出错时js不会报错，不能 catch，
     *           但可以通过监听 'error:*' 事件，或 isError() 获取错误信息。
     * @return {Promise<void>}
     */
    public finishRecord(silent?: boolean): Promise<void>;

    /**
     * 放弃录音
     */
    public cancelRecord(): void;

    /**
     * 是否正在录音
     * @return {boolean}
     */
    public isRecording(): boolean;

    /**
     * 是否发生过错误
     * @category 录音控制
     */
    public isError(): boolean;

    /**
     * 若有错误则返回错误名称，否则返回空字符串
     * @return {string}
     */
    public getErrorName(): string;

    /**
     * 播放
     * 视系统而定，不一定支持两个 VoiceMessage 实例同时播放。
     * 这时若另一实例仍在播放中，可能另一实例会被强制停止播放。
     * 目前，AMR、MP3 支持多个实例同时混音播放，微信不支持。
     */
    public play(): void;

    /**
     * 停止
     */
    public stop(): void;

    /**
     * 是否正在播放
     * @return {boolean}
     */
    public isPlaying(): boolean;

    /**
     * 获取录音长度，（单位：秒），可能会有小数
     * @return {number}
     */
    public getDuration(): number;



    /***** events *****/

    /**
     * 开始录音
     * @event VoiceMessage#event:"start-record"
     * @category 录音控制
     */
    /**
     * 正在完成录音（开始做转码、上传等）
     * @event VoiceMessage#event:"finishing-record"
     * @category 录音控制
     */
    /**
     * 完成录音（包括转码、上传等，已经可以播放）
     * @event VoiceMessage#event:"finish-record"
     * @category 录音控制
     */
    /**
     * 取消录音，此实例作废
     * @event VoiceMessage#event:"cancel-record"
     * @category 录音控制
     */
    /**
     * 错误：设备不支持录音
     * @event VoiceMessage#event:"error:DeviceNotSupportedError"
     * @category 录音控制
     */
    /**
     * 错误：没有录音设备权限
     * @event VoiceMessage#event:"error:NotAllowedError"
     * @category 录音控制
     */
    /**
     * 错误：此实例已经拥有录音（若要新建录音则需要 new 一个新的实例）
     * @event VoiceMessage#event:"error:AlreadyReadyError"
     * @category 录音控制
     */
    /**
     * 错误：此实例已经取消了录音，实例作废（若要新建录音则需要 new 一个新的实例）
     * @event VoiceMessage#event:"error:CanceledError"
     * @category 录音控制
     */
    /**
     * 错误：未曾开始录音（却调用了完成录音的接口）
     * @event VoiceMessage#event:"error:RecorderNotStartedError"
     * @category 录音控制
     */
    /**
     * 错误：录音系统忙碌（有其他实例正在录音或录音系统在处理数据）
     * @event VoiceMessage#event:"error:RecorderBusyError"
     * @category 录音控制
     */
    /**
     * 错误：录音时间太短
     * @event VoiceMessage#event:"error:RecordTooShortError"
     * @category 录音控制
     */

    /**
     * 开始播放
     * @event VoiceMessage#event:"play"
     * @category 播放控制
     */
    /**
     * 停止播放
     * @event VoiceMessage#event:"stop"
     * @category 播放控制
     */
    /**
     * 播放结束，包括调用 stop() 结束和播放到结尾自动结束
     * @event VoiceMessage#event:"end-play"
     * @category 播放控制
     */

    /**
     * 播放列表全部播放完毕
     * @event VoiceMessage#event:"all-ended"
     * @static
     * @category 自动播放列表
     */
    /**
     * 播放列表开始播放某一条语音
     * @event VoiceMessage#event:"begin-play"
     * @property {VoiceMessage} msg - 刚开始的语音消息对象
     * @static
     * @category 自动播放列表
     */
    /**
     * 播放列表结束播放某一条语音（包括播放到结尾和手动停止）
     * @event VoiceMessage#event:"end-play"
     * @property {VoiceMessage} msg - 刚结束的语音消息对象
     * @static
     * @category 自动播放列表
     */
    /**
     * 播放列表跳到下一条语音（包括自动跳和手动跳）
     * @event VoiceMessage#event:"next"
     * @property {VoiceMessage} msg - 下一条语音消息对象
     * @static
     * @category 自动播放列表
     */
    /**
     * 播放列表新增一条语音
     * @event VoiceMessage#event:"add"
     * @property {VoiceMessage} msg - 新增的语音消息对象
     * @static
     * @category 自动播放列表
     */
}

type RecorderType = Recorder;
declare namespace VoiceMessage {
    export type Recorder = RecorderType;
}


/**
 * @fileOverview MP3 格式录音插件，H5浏览器端使用，只能与浏览器通讯
 * @author benz@youme.im
 * @date 2018/7/12
 *
 * 每位工程师都有保持代码优雅的义务
 * each engineer has a duty to keep the code elegant
 */

declare class MP3Recorder extends VoiceMessage.Recorder {
    protected typeId: number;
    protected typeName: string;

    /**
     * 判断浏览器环境是否支持
     * @return {boolean}
     */
    public isEnvSupport(): boolean;

    /**
     * 判断是否支持播放某条消息
     * @return {boolean}
     */
    public isSupportMsg(msg: AnyJson): boolean;

    /**
     * 初始化录音，然后返回 Promise
     * @return {Promise<void>} 返回初始化完毕后的 Promise
     */
    public initRecord(): Promise<void>;

    /**
     * 开始录音
     */
    public startRecord(): void;

    /**
     * 停止并完成录音，上传录音文件，之后返回 Promise
     * @return {Promise<void>} 处理好录音文件之后的 Promise
     */
    public finishRecord(): Promise<void>;

    /**
     * 停止并放弃录音
     */
    public cancelRecord(): void;

    /**
     * 是否正在录音
     */
    public isRecording(): boolean;

    /**
     * 设定监听录音完成回调（包括手动停止录音&超时自动完成录音，不包括取消录音）
     * @param {function(): void} callback
     */
    public onRecordEnd(callback: () => void): void;

    /**
     * 获取用于服务器传输的 msg json
     * @return {AnyJson}
     */
    public getJsonMsg(): AnyJson;

    /************ 播放 ************/

    /**
     * 使用服务器接收的 msg json 进行初始化、下载音频
     * @param {AnyJson} json
     * @return {Promise<void>}
     */
    public initWithJsonMsg(json: AnyJson): Promise<void>;

    /**
     * 播放
     */
    public play(): void;

    /**
     * 停止
     */
    public stop(): void;

    /**
     * 是否正在播放
     * @return {boolean}
     */
    public isPlaying(): boolean;

    /**
     * 设定监听播放完毕回调（包括手动停止播放&播放到末尾自动停止）
     * @param {function(): void} callback
     */
    public onPlayEnd(callback: () => void): void;

    /**
     * 获取录音长度，（单位：秒），可以有小数
     * @return {number}
     */
    public getDuration(): number;
}

/**
 * @fileOverview
 * @author mio@youme.im
 * @date 2018/6/28
 *
 * 每位工程师都有保持代码优雅的义务
 * each engineer has a duty to keep the code elegant
 */

 declare class WAVRecorder extends VoiceMessage.Recorder {
    protected typeId: number;
    protected typeName: string;

    /**
     * 是否支持媒体设备
     * @returns {boolean}
     */
    public isEnvSupport(): boolean;

    /**
     * 是否支持信息
     * @param {AnyJson} msg
     * @returns {boolean}
     */
    public isSupportMsg(msg: AnyJson): boolean;

    /**
     * 初始化录音设备
     * @returns {Promise<void>}
     */
    public initRecord(): Promise<void>;

    /**
     * 开始录音，最大时长为60秒
     */
    public startRecord(): void;

    /**
     * 结束录音
     * @returns {Promise<void>}
     */
    public finishRecord(): Promise<void>;

    /**
     * 取消录音
     */
    public cancelRecord(): void;

    /**
     * 是否正在录音
     * @returns {boolean}
     */
    public isRecording(): boolean;

    /**
     * 设定监听录音完成回调（包括手动停止录音&超时自动完成录音，不包括取消录音）
     * @param {() => void} callback
     */
    public onRecordEnd(callback: () => void): void;

    /**
     * 获取用于服务器传输的 msg json
     * @return {AnyJson}
     */
    public getJsonMsg(): AnyJson;


    /************ 播放 ************/

    /**
     * 使用服务器接收的 msg json 进行初始化、下载音频
     * @param {AnyJson} json
     * @return {Promise<void>}
     */
    public initWithJsonMsg(json: AnyJson): Promise<void>;

    /**
     * 播放
     */
    public play(): void;

    /**
     * 停止
     */
    public stop(): void;

    /**
     * 是否正在播放
     * @returns {boolean}
     */
    public isPlaying(): boolean;

    /**
     * 设定监听播放完毕回调（包括手动停止播放&播放到末尾自动停止）
     * @param {function(): void} callback
     */
    public onPlayEnd(callback: () => void): void;

    /**
     * 获取录音长度，（单位：秒），可以有小数
     * @return {number}
     */
    public getDuration(): number;
}

/**
 * @fileOverview 微信H5录音插件，实现微信H5与微信H5、小程序之间通讯，若要与其他端互通，由其他端提供读取微信临时语音的支持
 * @author benz@youme.im
 * @date 2018/6/28
 *
 * 每位工程师都有保持代码优雅的义务
 * each engineer has a duty to keep the code elegant
 */

declare class WechatRecorder extends VoiceMessage.Recorder {

    /**
     * 要开始使用，须先给本插件设置微信 JS SDK 的 "wx" 对象
     * 并自行使用 wx.config() 对微信进行初始化
     * https://mp.weixin.qq.com/wiki?action=doc&id=mp1421141115#1
     * @param {Wechat.wx} wx
     */
    public static setWXObject(wx: Wechat.wx): void;

    /**
     * 通过 UserAgent 判断是否在微信端
     * @return {boolean}
     */
    public static isWechat(): boolean;

    protected typeId: number;
    protected typeName: string;

    /**
     * 判断浏览器环境是否支持
     * @return {boolean}
     */
    public isEnvSupport(): boolean;

    /**
     * 判断是否支持播放某条消息
     * @return {boolean}
     */
    public isSupportMsg(msg: AnyJson): boolean;

    /**
     * 初始化录音，然后返回 Promise
     * @return {Promise<void>} 返回初始化完毕后的 Promise
     */
    public initRecord(): Promise<void>;

    /**
     * 开始录音
     */
    public startRecord(): void;

    /**
     * 停止并完成录音，上传录音文件，之后返回 Promise
     * @return {Promise<void>} 处理好录音文件之后的 Promise
     */
    public finishRecord(): Promise<void>;

    /**
     * 停止并放弃录音
     */
    public cancelRecord(): void;

    /**
     * 是否正在录音
     */
    public isRecording(): boolean;

    /**
     * 设定监听录音完成回调（包括手动停止录音&超时自动完成录音，不包括取消录音）
     * @param {function(): void} callback
     */
    public onRecordEnd(callback: () => void): void;

    /**
     * 获取用于服务器传输的 msg json
     * @return {AnyJson}
     */
    public getJsonMsg(): AnyJson;


    /************ 播放 ************/

    /**
     * 使用服务器接收的 msg json 进行初始化、下载音频
     * @param {AnyJson} json
     * @return {Promise<void>}
     */
    public initWithJsonMsg(json: AnyJson): Promise<void>;

    /**
     * 播放
     */
    public play(): void;

    /**
     * 停止
     */
    public stop(): void;

    /**
     * 是否正在播放
     * @return {boolean}
     */
    public isPlaying(): boolean;

    /**
     * 设定监听播放完毕回调（包括手动停止播放&播放到末尾自动停止）
     * @param {function(): void} callback
     */
    public onPlayEnd(callback: () => void): void;

    /**
     * 获取录音长度，（单位：秒），可以有小数
     * @return {number}
     */
    public getDuration(): number;
}

declare namespace Wechat {
    interface wx {
        /**注入权限验证配置 */
        config(configData: ConfigData): void;

        /**
         * 处理成功验证
         * config信息验证后会执行ready方法
         * 所有接口调用都必须在config接口获得结果之后
         * config是一个客户端的异步操作
         * 所以如果需要在页面加载时就调用相关接口
         * 则须把相关接口放在ready函数中调用来确保正确执行
         * 对于用户触发时才调用的接口,则可以直接调用,不需要放在ready函数中
         */
        ready(callback: () => void): void;
        /**
         * 处理失败验证
         * config信息验证失败会执行error函数
         * 如签名过期导致验证失败
         * 具体错误信息可以打开config的debug模式查看
         * 也可以在返回的res参数中查看,对于SPA可以在这里更新签名
         */
        error(callback: (result?: any) => void): void;

        /**判断当前客户端版本是否支持指定JS接口 */
        checkJsApi(param: CheckJsApiData): void;

        /**获取"分享到朋友圈"按钮点击状态及自定义分享内容 */
        onMenuShareTimeline(param: ShareData): void;
        /**获取"分享给朋友"按钮点击状态及自定义分享内容 */
        onMenuShareAppMessage(param: MessageShareData): void;
        /**获取"分享到QQ"按钮点击状态及自定义分享内容 */
        onMenuShareQQ(param: QQShareData): void;
        /**获取"分享到腾讯微博"按钮点击状态及自定义分享内容 */
        onMenuShareWeibo(param: QQShareData): void;
        /**获取"分享到QQ空间"按钮点击状态及自定义分享内容 */
        onMenuShareQZone(param: QQShareData): void;

        /**开始录音 */
        startRecord(callback?: WxParamBase): void;
        /**停止录音 */
        stopRecord(callback: RecordResource): void;
        /**
         * 监听录音自动停止
         * 录音时间超过一分钟没有停止的时候会执行 complete 回调
         */
        onVoiceRecordEnd(callback: RecordResource): void;
        /**播放语音 */
        playVoice(param: LocalResource): void;
        /**暂停播放 */
        pauseVoice(param: LocalResource): void;
        /**停止播放 */
        stopVoice(param: LocalResource): void;
        /**监听语音播放完毕 */
        onVoicePlayEnd(callback: RecordResource): void;
        /**上传语音 */
        uploadVoice(param: UploadResource): void;
        /**下载语音 */
        downloadVoice(param: DownloadResource): void;
        /**识别音频并返回识别结果 */
        translateVoice(param: TranslateData): void;

        /**拍照或从手机相册中选图 */
        chooseImage(param: ChooseImageData): void;
        /**预览图片 */
        previewImage(param: PreviewImageData): void;
        /**上传图片 */
        uploadImage(param: UploadResource): void;
        /**下载图片 */
        downloadImage(param: DownloadResource): void;

        /**获取网络状态 */
        getNetworkType(callback: { success: (res?: NetworkResource) => void }): void;

        /**使用微信内置地图查看位置 */
        openLocation(locationData: LocationData): void;
        /**获取地理位置 */
        getLocation(param: GetLocationParam): void;

        /**隐藏右上角菜单 */
        hideOptionMenu(): void;
        /**显示右上角菜单 */
        showOptionMenu(): void;
        /**关闭当前网页窗口 */
        closeWindow(): void;
        /**
         * 批量隐藏功能按钮
         * @param param 要隐藏的菜单项,只能隐藏"传播类"和"保护类"按钮
         */
        hideMenuItems(param: MenuItemData): void;
        /**
         * 批量显示功能按钮
         * @param param 要显示的菜单项
         */
        showMenuItems(param: MenuItemData): void;
        /**隐藏所有非基础按钮 */
        hideAllNonBaseMenuItem(): void;
        /**显示所有功能按钮 */
        showAllNonBaseMenuItem(): void;

        /**调起微信扫一扫 */
        scanQRCode(param: ScanQRCodeData): void;

        /**跳转微信商品页 */
        openProductSpecificView(data: ProductSpecific): void;

        /**批量添加卡券 */
        addCard(param: AddCardData): void;
        /**拉取适用卡券列表并获取用户选择信息 */
        chooseCard(param: ChooseCardData): void;
        /**查看微信卡包中的卡券 */
        openCard(data: CardResource): void;
        /**核销后再次赠送卡券 */
        consumeAndShareCard(data: CardResource): void;

        /**发起一个微信支付请求 */
        chooseWXPay(param: WXPayData): void;

        /**开启查找周边ibeacon设备 */
        startSearchBeacons(param: BeaconData): void;
        /**关闭查找周边ibeacon设备 */
        stopSearchBeacons(callback: { complete: (res?: any) => void }): void;
        /**监听周边ibeacon设备 */
        onSearchBeacons(callback: { complete: (argv?: any) => void }): void;

        /**创建企业会话 */
        openEnterpriseChat(param: EnterpriseChatData): void;

        /**发起获取收货地址共享接口 */
        openAddress(param: WXAddressParam): void;
    }

    type ApiMethod = 'onMenuShareTimeline' |
        'onMenuShareAppMessage' |
        'onMenuShareQQ' |
        'onMenuShareWeibo' |
        'onMenuShareQZone' |
        'startRecord' |
        'stopRecord' |
        'onVoiceRecordEnd' |
        'playVoice' |
        'pauseVoice' |
        'stopVoice' |
        'onVoicePlayEnd' |
        'uploadVoice' |
        'downloadVoice' |
        'chooseImage' |
        'previewImage' |
        'uploadImage' |
        'downloadImage' |
        'translateVoice' |
        'getNetworkType' |
        'openLocation' |
        'getLocation' |
        'hideOptionMenu' |
        'showOptionMenu' |
        'hideMenuItems' |
        'showMenuItems' |
        'hideAllNonBaseMenuItem' |
        'showAllNonBaseMenuItem' |
        'closeWindow' |
        'scanQRCode' |
        'chooseWXPay' |
        'openProductSpecificView' |
        'addCard' |
        'chooseCard' |
        'openCard';

    // 所有JS接口列表
    type jsApiList = ApiMethod[];

    interface WxParamBaseRes {
        errMsg: string;
        [key: string]: any;
    }

    interface WxParamBase {
        success?: (res?: WxParamBaseRes) => void;
        fail?: (res?: WxParamBaseRes) => void;
        complete?: (res?: WxParamBaseRes) => void;
        cancel?: (res?: WxParamBaseRes) => void;
        trigger?: (res?: WxParamBaseRes) => void;
    }

    interface ConfigData extends WxParamBase {
        /**
         * 开启调试模式
         * 调用的所有api的返回值会在客户端alert出来
         * 若要查看传入的参数
         * 可以在pc端打开
         * 参数信息会通过log打出
         * 仅在pc端时才会打印
         */
        debug?: boolean;
        /**必填,公众号的唯一标识 */
        appId?: string;
        /**必填,生成签名的时间戳 */
        timestamp?: number;
        /**必填,生成签名的随机串 */
        nonceStr?: string;
        /**必填,签名 */
        signature?: string;
        /**必填,需要使用的JS接口列表 */
        jsApiList?: jsApiList;
    }

    interface CheckResult {
        /**
         * 以键值对的形式返回,可用的api值true,不可用为false
         * 如: {"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
         */
        checkResult?: {[api in ApiMethod]: boolean};
        errMsg?: string;
    }

    interface CheckJsApiData extends WxParamBase {
        /**需要检测的JS接口列表 */
        jsApiList?: jsApiList;
        success?: (result?: CheckResult) => void;
    }

    interface ShareData extends WxParamBase {
        /**分享标题 */
        title?: string;
        /**分享链接 */
        link?: string;
        /**分享图标 */
        imgUrl?: string;
        /**用户确认分享后执行的回调函数 */
        success?: () => void;
        /**用户取消分享后执行的回调函数 */
        cancel?: () => void;
    }

    interface MessageShareData extends ShareData {
        /**分享描述 */
        desc?: string;
        /** 分享类型:music,video或link,不填默认为link */
        type?: string;
        /**如果type是music或video,则要提供数据链接,默认为空 */
        dataUrl?: string;
    }

    interface QQShareData extends ShareData {
        /**分享描述 */
        desc?: string;
    }

    interface LocalResource {
        /**需要播放的音频的本地ID,由stopRecord接口获得 */
        localId?: string;
        /**选定照片的本地ID列表,localId可以作为img标签的src属性显示图片 */
        localIds?: Array<string>;
    }

    interface LocalResourceCallback extends LocalResource, WxParamBaseRes {}

    interface ServerResource {
        /**需要下载的音频的服务器端ID,由uploadVoice接口获得 */
        serverId?: string;
    }

    interface ServerResourceCallback extends ServerResource, WxParamBaseRes {}

    interface RecordResource extends WxParamBase {
        success?: (res?: LocalResourceCallback) => void;
        complete?: (res?: LocalResourceCallback) => void;
    }

    interface UploadResource extends WxParamBase {
        /**需要播放的音频的本地ID,由stopRecord接口获得 */
        localId?: string;
        /**选定照片的本地ID列表,localId可以作为img标签的src属性显示图片 */
        localIds?: Array<string>;
        /**默认为1,显示进度提示 */
        isShowProgressTips?: number;
        success?: (res?: ServerResourceCallback) => void;
    }

    interface DownloadResource extends WxParamBase {
        /**需要下载的音频的服务器端ID,由uploadVoice接口获得 */
        serverId?: string;
        /**默认为1,显示进度提示 */
        isShowProgressTips?: number;
        success?: (res?: LocalResourceCallback) => void;
        complete?: (res?: LocalResourceCallback) => void;
    }

    interface TranslateResource {
        /**语音识别的结果 */
        translateResult?: string;
    }

    interface TranslateResourceCallback extends TranslateResource, WxParamBaseRes {}

    interface TranslateData extends WxParamBase {
        /**需要播放的音频的本地ID,由stopRecord接口获得 */
        localId?: string;
        /**选定照片的本地ID列表,localId可以作为img标签的src属性显示图片 */
        localIds?: Array<string>;
        /**默认为1,显示进度提示 */
        isShowProgressTips?: number;
        success?: (res?: TranslateResourceCallback) => void;
    }

    interface ChooseImageData extends WxParamBase {
        /**默认9 */
        count?: number;
        /**['original', 'compressed'],可以指定是原图还是压缩图,默认二者都有 */
        sizeType?: Array<string>;
        /**['album', 'camera'],可以指定来源是相册还是相机,默认二者都有 */
        sourceType?: Array<string>;
        success?: (res?: LocalResourceCallback) => void;
    }

    interface PreviewImageData extends WxParamBase {
        /**当前显示图片的http链接 */
        current?: string;
        /**需要预览的图片http链接列表 */
        urls?: Array<string>;
    }

    interface NetworkResource {
        /**
         * value should be one of 2g,3g,4g and wifi
         */
        networkType?: ('2g' | '3g' | '4g' | '5g' | 'wifi');
    }

    interface LocationData extends WxParamBase {
        /**纬度,浮点数,范围为90 ~ -90 */
        latitude?: number;
        /**经度,浮点数,范围为180 ~ -180 */
        longitude?: number;
        /**位置名 */
        name?: string;
        /**地址详情说明 */
        address?: string;
        /**地图缩放级别,整型值,范围从1~28,默认为最大 */
        scale?: number;
        /**在查看位置界面底部显示的超链接,可点击跳转 */
        infoUrl?: string;
    }

    interface LocationResource {
        /**纬度,浮点数,范围为90 ~ -90 */
        latitude?: number;
        /**经度,浮点数,范围为180 ~ -180 */
        longitude?: number;
        /**速度,以米/每秒计 */
        speed?: number;
        /**位置精度 */
        accuracy?: number;
    }

    interface LocationResourceCallback extends LocationResource, WxParamBaseRes {}

    interface GetLocationParam extends WxParamBase {
        /**
         * 默认为wgs84的gps坐标
         * 如果要返回直接给openLocation用的火星坐标,可传入'gcj02'
         */
        type?: string;
        success?: (res?: LocationResourceCallback) => void;
    }

    interface MenuItemData extends WxParamBase {
        /**
         * * 基本类
         *  * 举报: "menuItem:exposeArticle"
         *  * 调整字体: "menuItem:setFont"
         *  * 日间模式: "menuItem:dayMode"
         *  * 夜间模式: "menuItem:nightMode"
         *  * 刷新: "menuItem:refresh"
         *  * 查看公众号（已添加）: "menuItem:profile"
         *  * 查看公众号（未添加）: "menuItem:addContact"
         * * 传播类
         *  * 发送给朋友: "menuItem:share:appMessage"
         *  * 分享到朋友圈: "menuItem:share:timeline"
         *  * 分享到QQ: "menuItem:share:qq"
         *  * 分享到Weibo: "menuItem:share:weiboApp"
         *  * 收藏: "menuItem:favorite"
         *  * 分享到FB: "menuItem:share:facebook"
         *  * 分享到 QQ 空间: "menuItem:share:QZone"
         * * 保护类
         *  * 编辑标签: "menuItem:editTag"
         *  * 删除: "menuItem:delete"
         *  * 复制链接: "menuItem:copyUrl"
         *  * 原网页: "menuItem:originPage"
         *  * 阅读模式: "menuItem:readMode"
         *  * 在QQ浏览器中打开: "menuItem:openWithQQBrowser"
         *  * 在Safari中打开: "menuItem:openWithSafari"
         *  * 邮件: "menuItem:share:email"
         *  * 一些特殊公众号: "menuItem:share:brand"
         */
        menuList?: Array<string>;
    }

    interface QRCodeResource {
        /**当needResult 为 1 时,扫码返回的结果 */
        resultStr?: string;
    }

    interface QRCodeResourceCallback extends QRCodeResource, WxParamBaseRes {}

    interface ScanQRCodeData extends WxParamBase {
        /**默认为0,扫描结果由微信处理,1则直接返回扫描结果 */
        needResult?: number;
        /**["qrCode","barCode"],可以指定扫二维码还是一维码,默认二者都有 */
        scanType?: Array<string>;
        success?: (res?: QRCodeResourceCallback) => void;
    }

    interface ProductSpecific extends WxParamBase {
        /**商品id */
        productId?: string;
        /**0:默认值,普通商品详情页,1:扫一扫商品详情页,2:小店商品详情页 */
        viewType?: string;
    }

    interface CardSpecific {
        cardId?: string;
        cardExt?: string;
    }

    interface CardResource {
        /**卡券列表 */
        cardList?: Array<CardSpecific>;
    }

    interface CardResourceCallback extends CardResource, WxParamBaseRes {}

    interface AddCardData extends WxParamBase {
        /**需要添加的卡券列表 */
        cardList?: Array<CardSpecific>;
        success?: (res?: CardResourceCallback) => void;
    }

    interface ChooseCardData extends WxParamBase {
        /**门店Id */
        shopId?: string;
        /**卡券类型 */
        cardType?: string;
        /**卡券Id */
        cardId?: string;
        /**卡券签名时间戳 */
        timestamp?: number;
        /**卡券签名随机串 */
        nonceStr?: string;
        /** 签名方式,默认'SHA1' */
        signType?: string;
        /**卡券签名 */
        cardSign?: string;
        /**用户选中的卡券列表信息 */
        success?: (res?: CardResourceCallback) => void;
    }

    interface WXPayData extends WxParamBase {
        /**
         * 支付签名时间戳,注意微信jssdk中的所有使用timestamp字段均为小写
         * 但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
         */
        timestamp?: string;
        /**支付签名随机串,不长于 32 位 */
        nonceStr?: string;
        /**统一支付接口返回的prepay_id参数值,提交格式如?:prepay_id=*** */
        package?: string;
        /**签名方式,默认为'SHA1',使用新版支付需传入'MD5' */
        signType?: string;
        /**支付签名 */
        paySign?: string;
        /**支付成功后的回调函数 */
        success?: (res?: any) => void;
    }

    interface WXAddressParam extends WxParamBase {
        success: (res?: WXAddressData) => void;
        cancel: (res?: WxParamBaseRes) => void;
    }

    interface BeaconData extends WxParamBase {
        /**摇周边的业务ticket,系统自动添加在摇出来的页面链接后面 */
        ticket?: string;
        /**开启查找完成后的回调函数 */
        complete?: (argv?: any) => void;
    }

    interface EnterpriseChatError {
        errMsg?: string;
    }

    interface EnterpriseChatData extends WxParamBase {
        /**
         * 必填,参与会话的成员列表
         * 格式为userid1;userid2;...
         * 用分号隔开,最大限制为1000个
         * userid单个时为单聊,多个时为群聊。
         */
        userIds?: string;
        /**
         * 必填,会话名称
         * 单聊时该参数传入空字符串即可
         */
        groupName?: string;
        success?: (res?: any) => void;
        fail?: (res?: EnterpriseChatError) => void;
    }

    interface WXAddressData {
        /**获取编辑收货地址成功返回 'openAddress:ok' */
        errMsg?: string;
        /**收货人姓名 */
        userName?: string;
        /**邮编 */
        postalCode?: string;
        /**国标收货地址第一级地址(省) */
        provinceName?: string;
        /**国标收货地址第二级地址(市) */
        cityName?: string;
        /**国标收货地址第三级地址(国家) */
        countryName?: string;
        /**详细收货地址信息 */
        detailInfo?: string;
        /**收货地址国家码 */
        nationCode?: string;
        /**收货人手机号码 */
        telNumber?: string;
    }
}

/**
 * @fileOverview AMR 格式录音插件，H5浏览器端使用，可与客户端、微信端互通
 * @author benz@youme.im
 * @date 2018/6/28
 *
 * 每位工程师都有保持代码优雅的义务
 * each engineer has a duty to keep the code elegant
 */


declare class AMRRecorder extends VoiceMessage.Recorder {
    protected typeId: number;
    protected typeName: string;

    /**
     * 设置微信公众平台接口的跨域代理接口，用于获取从微信发来的消息
     *   由于微信公众平台接口不支持前端跨域获取文件，
     *   因此，若需要浏览器与微信互通，则需在同域服务器开放一个跨域代理接口。
     *   （跨域代理接口、中转服务接口2选1，这里设置跨域代理接口）
     *   （若没有浏览器与微信互通的需求，可以二者都不用设置，不影响浏览器与客户端互通）
     * @param {string} proxyUrl 接口中转服务器 URL
     * @param {string} [urlParamName] 中转服务器获取微信接口链接的参数名字，默认值为 'url'
     * @example 若 proxyUrl='/proxy.php'，urlParamName='corsUrl'，则跨域代理接口为：
     *   '/proxy.php?corsUrl=https%3A%2F%2Fapi.weixin.qq.com%2Fcgi-bin%2Fmedia%2Fget...'
     */
    public static setCrossDomainProxy(proxyUrl: string, urlParamName?: string): void;

    /**
     * 设置微信临时语音文件的中转服务接口
     *   由于微信公众平台接口不支持前端跨域获取文件，
     *   因此，若需要浏览器与微信互通，则需在同域服务器自行搭建一个中转服务接口。
     *   （跨域代理接口、中转服务接口2选1，这里设置中转服务接口）
     *   （若没有浏览器与微信互通的需求，可以二者都不用设置，不影响浏览器与客户端互通）
     *   中转服务器做两件事：
     *    1. 获取 ACCESS_TOKEN：https://mp.weixin.qq.com/wiki?action=doc&id=mp1421140183
     *    2. 根据 mediaId 获取临时语音文件：https://mp.weixin.qq.com/wiki?action=doc&id=mp1444738727
     *    3. 获得的语音文件原样传回前端。
     * @param {string} url 获取微信录音文件的代理 URL
     * @param {string} [mediaIdParamName] 微信 mediaId 参数名，默认值为 'mediaId'
     */
    public static setWechatVoiceDownloadUrl(url: string, mediaIdParamName?: string): void;

    /**
     * 判断浏览器环境是否支持
     * @return {boolean}
     */
    public isEnvSupport(): boolean;

    /**
     * 判断是否支持播放某条消息
     * @return {boolean}
     */
    public isSupportMsg(msg: AnyJson): boolean;

    /**
     * 初始化录音，然后返回 Promise
     * @return {Promise<void>} 返回初始化完毕后的 Promise
     */
    public initRecord(): Promise<void>;

    /**
     * 开始录音
     */
    public startRecord(): void;

    /**
     * 停止并完成录音，上传录音文件，之后返回 Promise
     * @return {Promise<void>} 处理好录音文件之后的 Promise
     */
    public finishRecord(): Promise<void>;

    /**
     * 停止并放弃录音
     */
    public cancelRecord(): void;

    /**
     * 是否正在录音
     */
    public isRecording(): boolean;

    /**
     * 设定监听录音完成回调（包括手动停止录音&超时自动完成录音，不包括取消录音）
     * @param {function(): void} callback
     */
    public onRecordEnd(callback: () => void): void;

    /**
     * 获取用于服务器传输的 msg json
     * @return {AnyJson}
     */
    public getJsonMsg(): AnyJson;


    /************ 播放 ************/

    /**
     * 使用服务器接收的 msg json 进行初始化、下载音频
     * @param {AnyJson} json
     * @return {Promise<void>}
     */
    public initWithJsonMsg(json: AnyJson): Promise<void>;

    /**
     * 播放
     */
    public play(): void;

    /**
     * 停止
     */
    public stop(): void;

    /**
     * 是否正在播放
     * @return {boolean}
     */
    public isPlaying(): boolean;

    /**
     * 设定监听播放完毕回调（包括手动停止播放&播放到末尾自动停止）
     * @param {function(): void} callback
     */
    public onPlayEnd(callback: () => void): void;

    /**
     * 获取录音长度，（单位：秒），可以有小数
     * @return {number}
     */
    public getDuration(): number;
}


type WE = WildEmitter;
type MsgType = Message;
type MessageObjectType = MessageObject;
type InitConfigType = InitConfig;
type ChatType2 = ChatType;
type AnyJsonType = AnyJson;
type JsonMapType = JsonMap;
type JsonArrayType = JsonArray;
declare namespace YIM {
    export type WildEmitter = WE;
    export type Message = MsgType;
    export type MessageObject = MessageObjectType;
    export type InitConfig = InitConfigType;
    export type ChatType = ChatType2;
    export type AnyJson = AnyJsonType;
    export type JsonMap = JsonMapType;
    export type JsonArray = JsonArrayType;
}
 