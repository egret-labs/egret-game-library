class GestureRecognizerPlugin {
    public _gestureType:string;

    /**
     * @private
     * 如果_failed为true，说明这次识别确实已经失败，而不是介于成功或者失败中的不可知。
     * 例如对于长按来说，在短于阈值抬起手指，则确认识别失败，此时_failed是true，在下一次check value的时候这个值会被重置
     */
    public _failed:boolean = false;

    public _g:GestureManager;

    public _config:any;

    public _priority:number = 0;

    public _numTouchesRequired:number = 1;

    public _continuous:boolean = false;

    /**
     * all the callback function will have these types:
     * recognized， possible， failed， began， changed， ended
     * @private
     */
    public _callBack:any;

    public _requireGestureRecognizerToFail:boolean;

    public _possible:boolean = true;

    public _result:GestureEvent;

    public _shouldReceiveTouch:Function;

    public constructor(name:string = "", priority:number = 0, requireGestureRecognizerToFail:boolean = false, continuous:boolean = false, numTouchesRequired:number = 1) {
        this._gestureType = name;
        this._continuous = continuous;
        this._requireGestureRecognizerToFail = requireGestureRecognizerToFail;
        this._priority = priority || 0;
        this._numTouchesRequired = numTouchesRequired;
    }

    /**
     * Inject custom gesture-recognizers which extend this class.
     * @param gestures
     */
    public static activate(gestures:Array<GestureRecognizerPlugin>):void {
        var i:number = gestures.length;
        while (--i > -1) {
            GestureManager._gesturePlugins[(new (<any><any> (gestures[i]))())._gestureName] = gestures[i];
        }
    }

    public _onInitGesture(callback:any, config:any, g:GestureManager):boolean {
        this._callBack = callback;
        this._config = config;
        this._g = g;
        if (this._config != null && this._config["shouldReceiveTouch"] != null) this._shouldReceiveTouch = this._config["shouldReceiveTouch"];
        this._result = new GestureEvent(GestureEvent.ACHE_GESTURE, this._g);
        return true;
    }

    /** @private **/
    public executeGestureRecognizedCallback():void {
        if (this._callBack.recognized) {
            this._result.state = GestureState.RECOGNIZED;
            this._callBack.recognized(this._result);
        }
    }

    /** @private **/
    public checkGesture(ts:Array<egret.TouchEvent>):boolean {
        return false;
    }

    /** @private **/
    public updateValue(ts:Array<egret.TouchEvent>):boolean {
        //return true means this continuous gesture has began to effect, while return false means the gestures has stopped.
        return true;
    }

    /** @private **/
    public gesturePossible(value:boolean):void {
        this._possible = value;
        if (this._callBack.possible) {
            this._result.state = GestureState.POSSIBLE;
            this._result.possible = value;
            this._callBack.possible(this._result);
        }
    }

    /** @private **/
    public gestureBegan():void {
        if (this._callBack.began) {
            this._result.state = GestureState.BEGAN;
            this._callBack.began(this._result);
        }
    }

    /** @private **/
    public gestureEnded():void {
        if (this._callBack.ended) {
            this._result.state = GestureState.ENDED;
            this._callBack.ended(this._result);
        }
    }
}
