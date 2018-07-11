/************************************************************************************************************
 *
 * Describe :   Matchvs skd .d.ts define files for typescrip
 * Version  :   Develop 1.6.000
 *
 * CHANGE   :   2018.05.1
 *
 *
 ************************************************************************************************************/

/**
 * 清除缓存信息
 * @constructor
 */
declare function LocalStore_Clear();

/**
 * 缓存
 * @param {string} key
 * @param {string} value
 * @constructor
 */
declare function LocalStore_Save(key:string,value:string);
/**
 * openLog 打开日志
 * closeLog 关闭日志
 */
declare class MatchvsLog{
    static openLog();
    static closeLog();
}
/**
 * 创建房间请求参数类型
 */
declare class MsCreateRoomInfo implements Object{
    public roomName:string;
    public maxPlayer:number;
    public mode:number;
    public canWatch:number;
    public visibility:number;
    public roomProperty:string;
    constructor(roomName:string,maxPlayer:number,mode:number, canWatch:number, visibility:number, roomProperty:string);
    toString();
}

/**
 * 创建房间回调接口参数类型
 */
declare class MsCreateRoomRsp{
    public status:number;
    public roomID:string;
    public owner:number;
    constructor(status:number,roomID:string, owner:number)
}

/**
 * 禁止加入房间回调接口参数类型
 */
declare class MsJoinOverRsp{
    public status:number;
    public  cpProto:string;
    constructor(status:number, cpProto:string)
}

/**
 * 禁止加入房间异步通知参数类型
 */
declare class MsJoinOverNotifyInfo{
    public roomID:string;
    public srcUserID:number;
    public cpProto :string;
    constructor(roomID:string, srcUserID:number, cpProto:string)
}

/**
 * 进入房间信息匹配参数类型
 */
declare class MsMatchInfo{
    public maxPlayer:number;    //最大人数
    public mode:number;         //房间模式，由cp自己定义
    public canWatch:number;     //可观战人数
    public tags:any;         // 实际为 object 使用属性匹配时定义的协议，为 key-value 对象{key:value,key:value}
    constructor(maxplayer:number, mode:number, canWatch:number, tags:any)
}

/**
 * 房间信息
 */
declare class MsRoomInfo{
    public roomID:string;
    public roomProperty:any;
    public ownerId:number;
    constructor(roomId:string, roomProperty:any, ownerId:number)
}

/**
 * 房间用户信息
 */
declare class MsRoomUserInfo{
    public userId:number;
    public userProfile:string;
    constructor(userID:number,userProfile:string)
}

/**
 * 获取房间列表请求参数类型
 */
declare class MsRoomFilter{
    public maxPlayer:number;
    public mode:number;
    public canWatch:number;
    public roomProperty:string;
    constructor(maxPlayer:number,mode:number,canWatch:number, roomProperty:string)
}

/**
 * 获取房列表扩展接口请求参数类型
 * @param full  {number} 0-all 1-full 2-no full
 * @param state {number} 0-StateNil 1-StateOpen 2-StateClosed
 * @param sort  {number} 0-RoomSortNil 1-RoomSortCreateTime 2-SortPlayerNum 3-SortState
 * @param order {number} 0-SortAsc 1-SortDesc
 * @param pageNo {number} 0为第一页
 */
declare class MsRoomFilterEx{
    public maxPlayer:number;
    public mode:number;
    public canWatch:number;
    public roomProperty:string;
    public full:number;
    public state:number;
    public sort:number;
    public order:number;
    public pageNo:number;
    public pageSize:number;
    constructor(maxPlayer:number, mode:number, canWatch:number, roomProperty:string,
                full:number, state:number, sort:number, order:number, pageNo:number, pageSize:number)
}

/**
 * 获取房间详情回调接口返回参数
 */
declare class MsGetRoomDetailRsp{
    public status:number;
    public state:number;
    public maxPlayer:number;
    public mode:number;
    public canWatch:number;
    public roomProperty:string;
    public owner:number;
    public createFlag:number;
    public userInfos:Array<MsRoomUserInfo>;
    constructor(status:number, state:number, maxPlayer:number, mode:number, canWatch:number,
                roomProperty:number, owner:number, createFlag:number, userInfos:Array<MsRoomUserInfo>);
}

/**
 *
 */
declare class MsRoomAttribute{
    public roomID:string;
    public roomName:string;
    public maxPlayer:number;
    public gamePlayer:number;
    public watchPlayer:number;
    public mode:number;
    public canWatch:number;
    public roomProperty:string;
    public owner:number;
    public state:number;
    public createTime:string;
    constructor(roomID:string, roomName:string, maxPlayer:number, gamePlayer:number, watchPlayer:number,
                mode:number, canWatch:number, roomProperty:string, owner:number, state:number, createTime:string);
}

/**
 * 获取房间列表扩展回调接口参数类型
 */
declare class MsGetRoomListExRsp{
    public status:number;
    public total:number;
    public roomAttrs:Array<MsRoomAttribute>;
    constructor(status:number, total:number, roomAttrs:Array<MsRoomAttribute>);
}

/**
 * 注册用户返回参数类型
 */
declare class MsRegistRsp{
    public status:number;
    public id:number;
    public token:string;
    public name:string;
    public avatar:string;
    constructor(status:number,id:number,token:string,name:string,avatar:string)
}

/**
 * 登录回调参数类型
 */
declare class MsLoginRsp{
    public status:number;
    public roomID:string;
    constructor(status,roomID)
}

/**
 * 网关服务连接回调参数类型
 */
declare class MsHeartBeatResponse{
    public gameID:number;
    public gsExist:number;
    constructor(gameId:number, gsExist:number)
}

/**
 * 获取房间列表返回参数类型
 */
declare class MsRoomInfoEx{
    public roomID:string;
    public roomName:string;
    public maxPlayer:number;
    public mode:number;
    public canWatch:number;
    public roomProperty:string;
    constructor(roomId:string, roomName:string,maxplayer:number,mode:number,canWatch:number,roomProperty:string);
}

/**
 * 离开房间回调参数类型
 */
declare class MsLeaveRoomRsp{
    public status:number;
    public roomID:string;
    public userId:number;
    public cpProto:string;
    constructor(status:number, roomId:string, userId:number, cpProto:string);
}

declare class MsLeaveRoomNotify{
    public userId:number;
    public roomID:string;
    public owner:number;
    public cpProto:string;
    constructor(userId:number, roomID:string, owner:number, cpProto:string)
}

/**
 * 踢人异步回调参数类型
 */
declare class MsKickPlayerNotify{
    public userId:number;
    public srcUserId:number;
    public cpProto:string;
    public owner:number;
    constructor(userId:number, srcUserId:number, cpProto:string, owner:number);
}

/**
 * 踢人回调参数类型
 */
declare class MsKickPlayerRsp{
    public status:number;
    public owner:number;
    public userID:number;
    constructor(status:number, owner:number, userID:number);
}


declare class MsSubscribeEventGroupRsp{
    public status:number;
    public groups:Array<number>;
    constructor(status:number, groups:Array<number>);
}

declare class MsSendEventRsp{
    public status:number;
    public sequence:number;
}

/**
 * 发送消息异步回调类型
 */
declare class MsSendEventNotify{
    public srcUserId:number;
    public cpProto:string;
    constructor(srcUserID:number, cpProto:string);
}

/**
 * 接收gameServerNotify发送的消息，srcUserId 为 0
 */
declare class MsGameServerNotifyInfo{
    public srcUserId:number;
    public cpProto:string;
    constructor(srcUserID:number, cpProto:string);
}

declare class MsSendEventGroupNotify{
    public srcUid:number;
    public groups:Array<string>;
    public cpProto:string;
    constructor(srcUid:number, groups:Array<string>, cpProto:string);
}


/**
 *
 */
declare class gatewaySpeedResponse{
    public status:number;
    public seq:number;
    constructor(status:number, seq:number);
}

/**
 *
 */
declare class MsCheckInNotify{
    public userID:number;
    public checkins:Array<number>;
    public players:Array<number>;
    public maxPlayers:number;
    constructor(userID:number, checkins:Array<number>, players:Array<number>,maxPlayers:number);
}

/**
 * 使用Matchvs封装的 http回调类型
 */
declare class MatchvsNetWorkCallBack{
    constructor()
    onMsg(buf:string);
    onErr(errCode:number,errMsg:string);
}

declare class MsGatewaySpeedResponse{
    public status:number;
    public seq:number;
    constructor(status:number, seq:number)
}

/**
 *
 */
declare class MsSetChannelFrameSyncRsp{
    public mStatus:number;
    constructor(mStatus:number)
}

/**
 *
 */
declare class MsSendFrameEventRsp{
    public mStatus:number;
    constructor(mStatus:number)
}

/**
 *
 */
declare class MsFrameItem {
    public srcUserID:number;
    public cpProto:string;
    public timestamp:string;
    constructor(srcUserID:number,cpProto:string,timestamp:string)
}

/**
 *
 */
declare class MsFrameData{
    public frameIndex:number;
    public frameItems:Array<MsFrameItem>;
    public frameWaitCount:number;
    constructor(frameIndex:number,frameItems:Array<MsFrameItem>,frameWaitCount:number)
}

/**
 * 网络状态回调
 * @param {number} state 1-网络异常，正在重连  2-重连成功 3-重连失败，退出房间
 */
declare class MsNetworkStateNotify{
    public roomID:string;
    public userID:number;
    public state:number;
    public owner:number;
    constructor(roomID:string, userID:number, state:number, owner:number);
}

/**
 * 设置房间属性回调返回类型
 */
declare class MsSetRoomPropertyRspInfo{
    public status:number;
    public roomID:string;
    public userID:number;
    public roomProperty:string;
    constructor(status:number, roomID:string, userID:number, roomProperty:string)
}

/**
 * 设置房间属性异步回调返回类型
 */
declare class MsRoomPropertyNotifyInfo{
    public roomID:string;
    public userID:number;
    public roomProperty:string;
    constructor(roomID:string, userID:number, roomProperty:string)
}

declare class MsReopenRoomResponse {
    public status  : number;
    public cpProto : string;
	constructor(status:number, cpProto:string)
}
declare class MsReopenRoomNotify{
    public roomID  : string;
    public userID  : number;
    public cpProto : string;
	constructor(roomID:string,userID:number, cpProto:string)
}

declare class MatchvsResponse {
    constructor();//构造函数

    /**
     * 初始化回调
     * @param {number} status 200-成功
     */
    initResponse(status:number);

    /**
     * 注册用户回调
     * @param {MsRegistRsp} userInfo
     */
    registerUserResponse(userInfo:MsRegistRsp);

    /**
     * 登录回调
     * @param {MsLoginRsp} login
     */
    loginResponse(login:MsLoginRsp);

    /**
     *
     * @param {MsHeartBeatResponse} rsp
     */
    heartBeatResponse(rsp:MsHeartBeatResponse);

    /**
     * 登出回调
     * @param {number} status
     */
    logoutResponse(status:number);

    /**
     * 手动创建房间
     * @param {MsCreateRoomRsp} rsp
     */
    createRoomResponse(rsp:MsCreateRoomRsp);

    /**
     * 获取房间列表信息，只可以获取手动创建的房间列表
     * @param {number} status
     * @param {Array<MsRoomInfoEx>} roomInfos
     */
    getRoomListResponse(status:number, roomInfos:Array<MsRoomInfoEx>);

    /**
     * 获取房间列表扩展接口回调
     * @param {MsGetRoomListExRsp} rsp
     */
    getRoomListExResponse(rsp:MsGetRoomListExRsp);

    /**
     * 获取房间详细信息回调
     * @param {MsGetRoomDetailRsp} rsp
     */
    getRoomDetailResponse(rsp:MsGetRoomDetailRsp);

    /**
     * 加入房间回调，包含随机加入房间，指定加入房间，tags加入房间
     * @param {number} status
     * @param {Array<MsRoomUserInfo>} roomUserInfoList
     * @param {MsRoomInfo} roomInfo
     */
    joinRoomResponse(status:number, roomUserInfoList:Array<MsRoomUserInfo>, roomInfo:MsRoomInfo);


    /**
     * 加入房间异步回调，其他人加入房间的时候，用户会收到该消息
     * @param {MsRoomUserInfo} roomUserInfo
     */
    joinRoomNotify(roomUserInfo:MsRoomUserInfo);

    /**
     * 禁止加入房间回调
     * @param {MsJoinOverRsp} rsp
     */
    joinOverResponse(rsp:MsJoinOverRsp);

    /**
     *
     * @param {MsJoinOverNotifyInfo} notifyInfo
     */
    joinOverNotify(notifyInfo:MsJoinOverNotifyInfo);

    /**
     * 离开房间回调
     * @param {MsLeaveRoomRsp} rsp
     */
    leaveRoomResponse(rsp:MsLeaveRoomRsp);

    /**
     * 有人离开房间异步回调
     * @param {MsLeaveRoomNotify} leaveRoomInfo
     */
    leaveRoomNotify(leaveRoomInfo:MsLeaveRoomNotify);

    /**
     * 踢人回调
     * @param {MsKickPlayerRsp} rsp
     */
    kickPlayerResponse(rsp:MsKickPlayerRsp);

    /**
     * 踢人异步回调
     * @param {MsKickPlayerNotify} knotify
     */
    kickPlayerNotify(knotify:MsKickPlayerNotify);

    /**
     * 发送消息回调
     * @param {MsSendEventRsp} rsp
     */
    sendEventResponse(rsp:MsSendEventRsp);

    /**
     *
     * @param {MsSendEventNotify} eventInfo
     */
    sendEventNotify(eventInfo:MsSendEventNotify);

    gameServerNotify(eventInfo:MsGameServerNotifyInfo);

    /**
     *
     * @param {number} errCode
     * @param {string} errMsg
     */
    errorResponse(errCode:number, errMsg:string);

    /**
     *
     * @param {number} delay
     */
    networkDelay(delay:number);


    /**
     * 对方网络状态异步回调
     * @param {MsNetworkStateNotify} netnotify
     */
    networkStateNotify(netnotify:MsNetworkStateNotify);

    /**
     * 消息订阅回调
     * @param {number} status
     * @param {Array<string>} groups
     */
    subscribeEventGroupResponse(status:number, groups:Array<string>);


    /**
     * 分组消息发送回调
     * @param {number} status
     * @param {number} dstNum
     */
    sendEventGroupResponse(status:number, dstNum:number);

    /**
     * 分组消息发送异步回调
     * @param {number} srcUid
     * @param {Array<string>} groups
     * @param {string} cpProto
     */
    sendEventGroupNotify(srcUid:number, groups:Array<string>, cpProto:string);

    /**
     *
     * @param {MsSetChannelFrameSyncRsp} rsp
     */
    setFrameSyncResponse(rsp:MsSetChannelFrameSyncRsp);

    /**
     *
     * @param {MsSendFrameEventRsp} rsp
     */
    sendFrameEventResponse(rsp:MsSendFrameEventRsp);

    /**
     *
     * @param {MsFrameData} data
     */
    frameUpdate(data:MsFrameData);

    /**
     *
     * @param {number} data
     */
    hotelHeartBeatRsp(data:number);

    /**
     *
     * @param {MsGatewaySpeedResponse} rsp
     */
    gatewaySpeedResponse(rsp:MsGatewaySpeedResponse);

    /**
     * 房间检测异步回调
     * @param {MsCheckInNotify} rsp
     */
    roomCheckInNotify(rsp:MsCheckInNotify);

    /**
     * 断开连接回调
     * @param {number} status
     */
    disConnectResponse(status:number);

    /**
     * 设置房间属性回调
     * @param {MsSetRoomPropertyRspInfo} rsp
     */
    setRoomPropertyResponse(rsp:MsSetRoomPropertyRspInfo);

    /**
     * 设置房间属性异步回调
     * @param {MsRoomPropertyNotifyInfo} notify
     */
    setRoomPropertyNotify(notify:MsRoomPropertyNotifyInfo);

    /**
     * 断线重连接口回调，接口参数与joinRoomResponse是一样的
     * @param {number} status
     * @param {Array<MsRoomUserInfo>} roomUserInfoList
     * @param {MsRoomInfo} roomInfo
     */
    reconnectResponse(status:number, roomUserInfoList:Array<MsRoomUserInfo>, roomInfo:MsRoomInfo);
	
	 /**
     * 允许房间加人的通知
     * @param {MsReopenRoomNotify} data
     */
	joinOpenNotify(data:MsReopenRoomNotify);
	
	 /**
     * 设置允许房间加人的结果
     * @param {MsReopenRoomResponse} data
     */
	joinOpenResponse(data:MsReopenRoomResponse);
}



/**
 * 引擎
 */
declare class MatchvsEngine {

    // public mChannel:string;
    // public mPlatform:string;
    // public mConfig:any;
    constructor();//构造函数

    /**
     * 初始化
     * @param {MatchvsResponse} pResponse
     * @param {string} pChannel
     * @param {string} pPlatform
     * @param {number} gameID
     * @returns {number}
     */
    init(pResponse: MatchvsResponse, pChannel: string, pPlatform: string, gameID: number): number

    /**
     * 登录
     * @param {number} pUserID
     * @param {string} pToken
     * @param {number} pGameID
     * @param {number} pGameVersion
     * @param {string} pAppkey
     * @param {string} pSecretKey
     * @param pDeviceID
     * @param pGatewayID
     * @returns {number}
     */
    login(pUserID: number, pToken: string, pGameID: number, pGameVersion: number, pAppkey: string, pSecretKey: string, pDeviceID: string, pGatewayID: number): number

    /**
     * 用户网关速度，暂时不用
     * @returns {number}
     */
    speed():number

    /**
     *
     * @param {MsCreateRoomInfo} createRoomInfo 房间信息
     * @param {string} userProfile 附带数据，默认指定 ""
     * @returns {number}
     */
    createRoom(createRoomInfo:MsCreateRoomInfo, userProfile:string): number

    /**
     * 获取sdk 版本信息
     * @returns {string}
     */
    getVersion():string

    /**
     * 反初始化
     * @returns {number}
     */
    uninit():number

    /**
     * 获取房间列表信息
     * @param {MsRoomFilter} filter
     * @returns {number}
     */
    getRoomList(filter:MsRoomFilter):number

    /**
     * 获取房间列表扩展接口
     * @param {MsRoomFilterEx} filter
     * @returns {number}
     */
    getRoomListEx(filter:MsRoomFilterEx):number

    /**
     * 获取房间详细信息
     * @param {string} roomID
     * @returns {number}
     */
    getRoomDetail(roomID:string):number

    /**
     * 设置房间属性
     * @param {string} roomID
     * @param {string} roomProperty
     * @returns {number}
     */
    setRoomProperty(roomID:string, roomProperty:string):number

    /**
     * 随机加入房间
     * @param {number} maxPlayer 最大人数
     * @param {string} userProfile 附带数据，默认指定 ""
     * @returns {number}
     */
    joinRandomRoom(maxPlayer:number, userProfile:string):number

    /**
     * 属性加入房间
     * @param {MsMatchInfo} matchinfo
     * @param {string} userProfile 附带数据，默认指定 ""
     * @returns {number}
     */
    joinRoomWithProperties(matchinfo:MsMatchInfo, userProfile:string):number

    /**
     * 加入指定房间
     * @param {string} roomID
     * @param {string} userProfile
     * @returns {number}
     */
    joinRoom(roomID:string,userProfile:string):number

    /**
     * 断线重连
     * @returns {number}
     */
    reconnect():number;

    /**
     * 禁止加入房间
     * @param {string} cpProto 禁止加入房间附带的数据
     * @returns {number}
     */
    joinOver(cpProto:string):number

    /**
     * 离开房间
     * @param {string} cpProto 离开房间附带的数据
     * @returns {number}
     */
    leaveRoom(cpProto:string):number

    /**
     *
     * @param {number} userID 被踢者用户ID
     * @param {string} cpProto 踢人附带的消息
     * @returns {number}
     */
    kickPlayer(userID:number, cpProto:string):number

    /**
     *
     * @param {string} cpProto
     * @returns {number}
     */
    sendFrameEvent(cpProto:string):number

    /**
     * frameRate ex:10/s . = 0 is off,>0 is on.
     * @param {number} frameRate
     * @returns {number}
     */
    setFrameSync(frameRate:number):number

    /**
     * 注册用户
     * @returns {number} 0-接口调用成功
     */
    registerUser():number

    /**
     * 指定订阅的分组发送消息
     * @param {Array<string>} groups 要发送数据的分组
     * @param {string} data 要发送的数据
     * @returns {number} 1-失败 0-成功
     */
    sendEventGroup(groups:Array<string>, data:string):number

    /**
     * 订阅组
     * @param {Array<string>} confirms  要创建的订阅组
     * @param {Array<string>} cancles   要取消的订阅组
     * @returns {number} 1-失败 0-成功
     */
    subscribeEventGroup(confirms:Array<string>, cancles:Array<string>):number

    /**
     * 发送消息的扩展，
     * @param {number} msgType          0-包含destUids  1-排除destUids
     * @param {string} data             要发送的数据
     * @param {number} desttype         0-客户端+not CPS  1-not客户端+ CPS   2-客户端 + CPS
     * @param {Array<number>} userids   玩家ID集合 [1,2,3,4,5]
     * @returns {{sequence: number, result: number}}
     */
    sendEventEx(msgType:number, data:string, desttype:number, userids:Array<number>):any

    /**
     * 发送消息
     * @param {string} data 要发送的数据
     * @returns {{sequence: number, result: number}}
     */
    sendEvent(data:string):any

    /**
     * 退出登录
     * @param {number} cpProto
     * @returns {number}
     */
    logout(cpProto:string):number
	
	/**
     * 设置允许房间加人
     * @param {number} cpProto
     * @returns {number}
     */
    joinOpen(cpProto:string):number
	
	/**
	* 存储数据
	* @param {number} gameID
	* @param {number} userID
	* @param {string} key
	* @param {any} value
	*/
	hashSet (gameID, userID, key, value) :void
	
	/**
	* 存储数据
	* @param {number} gameID
	* @param {number} userID
	* @param {string} key
	*/
	hashGet (gameID, userID, key) :void
	

	
}
declare class md5 {
	 constructor();//构造函数
	 
	/**
	*
	*/
	hex_md5 (s:string) :string

}

declare class MatchvsHttp {
	constructor(callBack);//构造函数
	
	
	get(url);
	
 
}
