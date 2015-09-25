/**
 * DataEye SDK for HTML5
 *
 * for more information, see http://wiki.dataeye.com/h5/document/html5/html5-quick.html
 *
 * Copyright@2013 DataEye
 */

declare class DCAgent {
    /**
     * SDK初始化
     * @param config 初始化配置
     * @param callback SDK初始化完成之后的回调函数
     */
    static init( config: DCAgentInitConfig, callback?: Function ):void;

    /**
     * 上报自定义事件
     * see http://wiki.dataeye.com/h5/document/html5/html5-advanced-guide.html#part1
     * @param eventID 事件ID
     * @param duration 耗时 单位：秒
     * @param data 简单类型的json数据，不支持传递数组和对象
     */
    static onEvent( eventID: string, duration: number, data: JSON ):void;

    /**
     * 上报PV
	 * 此接口SDK内部会自动调用一次，开发者一般无需主动调用，单页应用除外
     * @param pagePath
     */
    static onPageView( pagePath: string ):void;

    /**
     * 上报付费信息
	 * 使用示例见 http://wiki.dataeye.com/h5/document/html5/html5-advanced-guide.html#part2
     * @param options
     */
    static onPayment( options: DCAgentPaymentConfig ):void;

	/**
	 * 检测SDK是否已经初始化完成
	 */
	static isReady():void;

	/**
	 * 卸载SDK，回收资源
	 * 支持（AMD/CommonJS模块系统卸载）
	 */
	static teardown():void;
}

/**
 * appId必填，其它可选
 * 详细参数介绍参见 http://wiki.dataeye.com/h5/document/html5/html5-quick.html#part2
 */
declare class DCAgentInitConfig {
    appId: string;
    appVer: string;
    accountId: string;
    channel: string;
    interval: number;
    errorReport: boolean;
    excludes: Array<string>;
    virus: boolean;
}

/**
 * amount必填，其它可选
 * 详细参数介绍参见 http://wiki.dataeye.com/h5/document/html5/html5-advanced-guide.html#part2
 */
declare class DCAgentPaymentConfig {
    amount: number;
    currencyType: string;
    payType: string;
    iapid: string;
    orderId: string;
    payTime: number;
}
