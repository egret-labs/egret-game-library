declare class GestureRecognizerPlugin {
    _gestureType: string;
    /**
     * @private
     * 如果_failed为true，说明这次识别确实已经失败，而不是介于成功或者失败中的不可知。
     * 例如对于长按来说，在短于阈值抬起手指，则确认识别失败，此时_failed是true，在下一次check value的时候这个值会被重置
     */
    _failed: boolean;
    _g: GestureManager;
    _config: any;
    _priority: number;
    _numTouchesRequired: number;
    _continuous: boolean;
    /**
     * all the callback function will have these types:
     * recognized， possible， failed， began， changed， ended
     * @private
     */
    _callBack: any;
    _requireGestureRecognizerToFail: boolean;
    _possible: boolean;
    _result: GestureEvent;
    _shouldReceiveTouch: Function;
    constructor(name?: string, priority?: number, requireGestureRecognizerToFail?: boolean, continuous?: boolean, numTouchesRequired?: number);
    /**
     * Inject custom gesture-recognizers which extend this class.
     * @param gestures
     */
    static activate(gestures: Array<GestureRecognizerPlugin>): void;
    _onInitGesture(callback: any, config: any, g: GestureManager): boolean;
    /** @private **/
    executeGestureRecognizedCallback(): void;
    /** @private **/
    checkGesture(ts: Array<egret.TouchEvent>): boolean;
    /** @private **/
    updateValue(ts: Array<egret.TouchEvent>): boolean;
    /** @private **/
    gesturePossible(value: boolean): void;
    /** @private **/
    gestureBegan(): void;
    /** @private **/
    gestureEnded(): void;
}
declare class PinchGestureRecognizer extends GestureRecognizerPlugin {
    private _cx;
    private _cy;
    private _offsetX;
    private _offsetY;
    private _localLocation;
    private _d1X;
    private _d1Y;
    private _d2X;
    private _d2Y;
    constructor(priority?: number, requireGestureRecognizerToFail?: boolean);
    checkGesture(ts: Array<egret.TouchEvent>): boolean;
    updateValue(ts: Array<egret.TouchEvent>): boolean;
    private pZero;
}
declare class DoubleTapGestureRecognizer extends GestureRecognizerPlugin {
    private _interval;
    private _max_dist;
    private _t;
    private _count;
    private _validate;
    private _sx;
    private _sy;
    constructor(priority?: number, requireGestureRecognizerToFail?: boolean);
    checkGesture(ts: Array<egret.TouchEvent>): boolean;
    private onCheck(e);
}
declare class PropGesture {
    /**
     * 目标手势，GesturePlugin
     */
    t: any;
    /**
     * Continuous Gesture，是否需要在确认手势之后不停得更新数据
     */
    c: boolean;
    /**
     *  execute gesture recognized callback function name
     */
    p0: string;
    /**
     *  check gesture function name
     */
    p1: string;
    /**
     * update value function name
     */
    p2: string;
    /**
     * 手势需要的触摸数量，对应numTouchesRequired
     */
    n: number;
    _next: PropGesture;
    _prev: PropGesture;
    /**
     * Possible，还有可能被识别
     */
    p: boolean;
    /**
     * recognized
     * 是否已经识别出此手势，如果识别出来，计算链条将被打破，识别出来的手势会放到首位
     */
    r: boolean;
    /**
     * failed
     * 一轮手势检测中已经确认监测失败
     */
    f: boolean;
    /**
     * 是否在hold链条里面等待被执行（requireGestureRecognizerToFail确定识别失败），或者被取消执行 （requireGestureRecognizerToFail确定已经识别）
     */
    h: boolean;
    /** Priority **/
    pr: number;
    /**
     * requireGestureRecognizerToFail的源，
     * 也就是这个手势g，需要当前手势再f=true的时候再次尝试
     */
    _o: PropGesture;
    /**
     * requireGestureRecognizerToFail
     * 如果_f != null，说明此手势需要等待_f在识别失败的时候才开始识别
     */
    _f: PropGesture;
    constructor(target: any, property0?: string, property1?: string, property2?: string, next?: PropGesture, isContinuous?: boolean, priority?: number, numTouchesRequired?: number);
}
declare class GestureEvent extends egret.Event {
    static ACHE_GESTURE: string;
    /**
     *  GestureManager instance that related to this object
     */
    gm: GestureManager;
    /**
     * gesture state, all types of state is defined in acheGesture.utils.GestureState
     * @see GestureState
     */
    state: string;
    /**
     * delta x value
     * Pan gesture for example, dx is the delta x value updated every time user's finger moves
     */
    dx: number;
    /**
     * delta y value
     * Pan gesture for example, dy is the delta y value updated every time user's finger moves
     */
    dy: number;
    /**
     *
     */
    localLocation: egret.Point;
    /**
     * delta scale value
     * Pinch gesture use this value
     */
    dScale: number;
    /**
     *  The rotation of the gesture in radians since its last change.
     */
    rotation: number;
    /**
     * time interval for some specific gesture
     * Swipe gesture for example, interval is the time interval when swip happen
     */
    interval: number;
    /**
     * possible state of some specific gesture
     * Tap gesture for example, before touch end, the possible value will come along with this object to indicate that if the tap gesture is possible to recognize
     */
    possible: boolean;
    /**
     * @param type        Event type, use AcheGestureEvent.ACHE_GESTURE
     * @param gm        GestureManager instance that related to this object
     * @param state        What state of the gesture when this happen, see ache.Gesture.utils.GestureState
     */
    constructor(type: string, gm: GestureManager, state?: string);
}
declare class GestureType {
    static DOUBLE_TAP: string;
    static PINCH: string;
}
declare class GestureState {
    static POSSIBLE: string;
    static RECOGNIZED: string;
    static FAILED: string;
    static BEGAN: string;
    static CHANGED: string;
    static ENDED: string;
    static CANCELLED: string;
}
declare class GestureManager {
    /**
     * All the available gesture-recognizers
     * @private
     */
    static _gesturePlugins: any;
    /**
     * display object linked to this gesture manager instance
     */
    target: egret.DisplayObject;
    /**
     * global x position when receive TouchPhase.BEGAN event
     */
    startGlobalX: number;
    /**
     * global y position when receive TouchPhase.BEGAN event
     */
    startGlobalY: number;
    /**
     * config object for GestureManager instance
     * @private
     */
    vars: any;
    /**
     * if all gesture behave simultaneously
     */
    private _allowSimultaneous;
    /**
     * 用于绑定当前创建的PropGesture与其对应的GesturePlugin（具体的某个手势）
     */
    private _ref;
    /**
     * first PropGesture of all the gesture-recognizers
     * @private
     */
    _firstG: PropGesture;
    /**
     * Touch objects
     */
    private _ts;
    /**
     * Use the target as key value to track all the gesture-managers has been created
     */
    private static _gestures;
    /**
     * Creates a GestureManager instance
     *
     * @param target                Display object linked to this gesture manager instance
     * @param vars                    Config object, using acheGesture.data.GestureVars is recommended
     * @param allowSimultaneous        Allow the gesture-manager behave simultaneously
     */
    constructor(target: egret.DisplayObject, vars?: any, allowSimultaneous?: boolean);
    /** @private **/
    _initGesture(): void;
    private leaveStage(e);
    /** @private **/
    linkGestureCondition(): void;
    /**
     * @private
     *
     * @param name
     * @param value
     */
    gestureRecognizerStateChange(name: string, value: boolean): void;
    private removeTouch(e);
    private _touchEventPool;
    private cloneTouchEvent(e);
    /** @private **/
    onTouched(e: egret.TouchEvent): void;
    /**
     * @param target
     * @param vars
     * @param allowSimultaneous
     * @return GestureManager
     */
    static add(target: egret.DisplayObject, vars?: any, allowSimultaneous?: boolean): GestureManager;
    /**
     * Remove all of the gesture-managers linked to this target display object
     * @param target
     */
    static removeAll(target: egret.DisplayObject): void;
    /**
     * Add some gesutres to this gesture-recognizers' chain after the GestureManger instance created.
     * @param vars
     */
    add(vars: any): void;
    /**
     * remove certain type of gesture-recognizer
     * @param gestureType
     */
    remove(gestureType: string): boolean;
    /**
     * dispose all the gestures managed by this instance
     */
    dispose(): void;
    /**
     * if all gesture behave simultaneously
     */
    allowSimultaneous: boolean;
}
interface ITouchValue {
    stageX?: number;
    stageY?: number;
    type?: string;
    touchDown?: boolean;
    touchPointID?: number;
}
