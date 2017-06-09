
/**
 * DataEye SDK for HTML5 2.0 for Egret 2.5
 *
 * 更多信息请前往 http://wiki.dataeye.com/h5/document/html5/guide.html
 *
 * Copyright@2013 DataEye
 */

declare class DCAgent {

  /**
   * SDK初始化，appId必填
   * http://wiki.dataeye.com/h5/document/html5/api.html#init
   * @param config
   */
  static init(config:DCAgentConfig):void;

  /**
   * 获取玩家uid，init之后调用
   */
  static getUid():string;

  /**
   * 玩家登录，SDK初始化之后调用
   * 帐户相关接口（角色、区服、关卡、等级等）需要在玩家登录之后调用
   * @param username
   */
  static login(username:string):void;

  /**
   * 上报自定义事件，初始化之后即可调用，无需调用login
   * @param eventID 事件ID
   * @param data 事件属性，支持key和value为string或number的对象
   */
  static onEvent(eventID:string, data?:DCAgentConfig):void;

  /**
   * 上报玩家付费，login之后调用
   * http://wiki.dataeye.com/h5/document/html5/api.html#payment
   * @param options
   */
  static onPayment(options:DCAgentPaymentConfig):void;

  /**
   * 设置玩家帐户类型，login之后调用
   * @param accountType
   */
  static setAccountType(accountType:string):void;

  /**
   * 设置玩家年龄，login之后调用
   * @param age
   */
  static setAge(age:number):void;

  /**
   * 设置玩家性别，login之后调用
   * 1: 男，2: 女
   * @param gender
   */
  static setGender(gender:number):void;

  /**
   * 设置区服，login之后调用
   * @param serverID
   */
  static setGameServer(serverID:string):void;

  /**
   * 设置角色信息，login之后调用
   * @param roleID 角色ID(String)
   * @param roleRace 角色种族(String)
   * @param roleClass 角色职业(String)
   * @param roleLevel 角色等级(Number)
   */
  static setRoleInfo(roleID:string, roleRace:string, roleClass:string, roleLevel:number):void;

  /**
   * 创建角色信息，login之后调用
   * 【玩家第一次创建角色时调用】
   * @param roleID
   * @param roleRace
   * @param roleClass
   * @param roleLevel
   */
  static createRole(roleID:string, roleRace:string, roleClass:string, roleLevel:number):void;

  /**
   * 获取虚拟币，login之后调用
   * @param getNum 获取数量
   * @param balanceNum 留存总量
   * @param coinType 虚拟币类型
   * @param reason 获取原因
   */
  static onCoinGet(getNum:number, balanceNum:number, coinType:string, reason:string):void;

  /**
   * 消耗虚拟币，login之后调用
   * @param useNum 消耗数量
   * @param balanceNum 留存总量
   * @param coinType 虚拟币类型
   * @param reason 消耗原因
   */
  static onCoinUse(useNum:number, balanceNum:number, coinType:string, reason:string):void;

  /**
   * 关卡内使用虚拟币购买道具，login之后调用
   * @param itemID 道具ID
   * @param itemNum 道具数目
   * @param coinType 虚拟币类型
   * @param coinNum 虚拟币数目
   * @param missonID 关卡ID
   */
  static onItemBuy(itemID:string, itemNum:number, coinType:string, coinNum:number, missonID:string):void;

  /**
   * 关卡内道具产出以及原因，login之后调用
   * @param itemID 道具ID
   * @param itemNum 道具数目
   * @param missonID 关卡ID
   * @param reason 产出原因
   */
  static onItemProduce(itemID:string, itemNum:number, missonID:string, reason:string):void;

  /**
   * 关卡内道具消耗以及原因，login之后调用
   * @param itemID 道具ID
   * @param itemNum 道具数目
   * @param missonID 关卡ID
   * @param reason 消耗原因
   */
  static onItemUse(itemID:string, itemNum:number, missonID:string, reason:string):void;

  /**
   * 通关成功耗时，login之后调用
   * @param missionID 关卡ID
   * @param elapsed 通关耗时(秒)
   */
  static onMissionFinished(missionID:string, elapsed:number):void;

  /**
   * 通关失败耗时，login之后调用
   * @param missionID 关卡ID
   * @param elapsed 通关耗时(秒)
   */
  static onMissionUnfinished(missionID:string, elapsed:number):void;

  /**
   * 完成任务耗时，login之后调用
   * @param taskID 任务ID
   * @param elapsed 耗时(秒)
   */
  static onTaskFinished(taskID:string, elapsed:number):void;

  /**
   * 执行任务失败耗时，login之后调用
   * @param taskID 任务ID
   * @param elapsed 耗时(秒)
   */
  static onTaskUnfinished(taskID:string, elapsed:number):void;

  /**
   * 升级耗时，login之后调用
   * @param startLevel 开始等级
   * @param endLevel 目标等级
   * @param elapsed 耗时（秒）
   */
  static onLevelUp(startLevel:number, endLevel:number, elapsed:number):void;
}

interface DCAgentConfig {
}

/**
 * amount必填，其它可选
 * http://wiki.dataeye.com/h5/document/html5/api.html#payment
 */
declare class DCAgentPaymentConfig {
  amount:number;
  currencyType:string;
  payType:string;
  iapid:string;
  orderId:string;
}
