declare namespace mouse {
    class MouseEvent {
        /**
         * @language en_US
         * When the user mouse movements are called.
         * @version Egret 3.1.0
         * @platform Web
         */
        /**
         * @language zh_CN
         * 当用户鼠标移动时被调用。
         * @version Egret 3.1.0
         * @platform Web
         */
        static MOUSE_MOVE: string;
        /**
        * @language en_US
        * Called when the mouse is within the area where the object (not covered by other object).
        * @version Egret 3.1.0
        * @platform Web
        */
        /**
         * @language zh_CN
         * 当鼠标正在对象所在区域内（没有被其他对象覆盖）时调用。
         * @version Egret 3.1.0
         * @platform Web
         */
        static MOUSE_OVER: string;
        /**
         * @language en_US
         * Called when the mouse out of the object within the Area.
         * @version Egret 3.1.0
         * @platform Web
         */
        /**
         * @language zh_CN
         * 当鼠标移出对象所在区域内时调用。
         * @version Egret 3.1.0
         * @platform Web
         */
        static MOUSE_OUT: string;
        /**
         * @language en_US
         * When the mouse enters an object within the Area calls.
         * @version Egret 3.1.0
         * @platform Web
         */
        /**
         * @language zh_CN
         * 当鼠标进入对象所在区域内调用。
         * @version Egret 3.1.0
         * @platform Web
         */
        static ROLL_OVER: string;
        /**
         * @language en_US
         * Called when the mouse out of the object within the Area.
         * @version Egret 3.1.0
         * @platform Web
         */
        /**
         * @language zh_CN
         * 当鼠标移出对象所在区域内时调用。
         * @version Egret 3.1.0
         * @platform Web
         */
        static ROLL_OUT: string;
        /**
         * @language en_US
         * Called when the mouse wheel scrolls.
         * @version Egret 5.1.0
         * @platform Web
         */
        /**
         * @language zh_CN
         * 当鼠标滚轮滚动时调用。
         * @version Egret 5.1.0
         * @platform Web
         */
        static MOUSE_WHEEL: string;
    }
}
declare namespace mouse {
    /**
     * @language en_US
     * Enable mouse detection.
     * @version Egret 3.1.0
     * @platform Web
     */
    /**
     * @language zh_CN
     * 启用mouse检测。
     * @version Egret 3.1.0
     * @platform Web
     */
    const enable: (stage: egret.Stage) => void;
    /**
     * @language en_US
     * Set a target of buttonMode property setting is true, when the mouse rolls over the object becomes hand type.
     * @version Egret 3.1.0
     * @platform Web
     */
    /**
     * @language zh_CN
     * 设置一个对象的buttonMode属性，设置为true后，当鼠标滑过该对象会变手型。
     * @version Egret 3.1.0
     * @platform Web
     */
    const setButtonMode: (displayObjcet: egret.DisplayObject, buttonMode: boolean) => void;
    /**
     * @language en_US
     * Setting ON mouseMove event detection, after opening slightly impacts performance, default is not open.
     * @version Egret 3.1.0
     * @platform Web
     */
    /**
     * @language zh_CN
     * 设置开启mouseMove事件检测，开启后性能会稍有影响，默认为不开启。
     * @version Egret 3.1.0
     * @platform Web
     */
    const setMouseMoveEnabled: (enabled: boolean) => void;
}
