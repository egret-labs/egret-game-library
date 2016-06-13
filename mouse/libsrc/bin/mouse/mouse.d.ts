declare module mouse {
    class MouseEvent {
        /**
         * @language en_US
         *
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
    }
}
declare module mouse {
    var enable: (stage: egret.Stage) => void;
    var setButtonMode: (displayObjcet: egret.DisplayObject, buttonMode: boolean) => void;
    var setMouseMoveEnabled: (enabled: boolean) => void;
}
