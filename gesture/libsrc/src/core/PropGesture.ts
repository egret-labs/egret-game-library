class PropGesture {
    /**
     * 目标手势，GesturePlugin
     */
    public t:any;

    /**
     * Continuous Gesture，是否需要在确认手势之后不停得更新数据
     */
    public c:boolean;

    /**
     *  execute gesture recognized callback function name
     */
    public p0:string;

    /**
     *  check gesture function name
     */
    public p1:string;

    /**
     * update value function name
     */
    public p2:string;

    /**
     * 手势需要的触摸数量，对应numTouchesRequired
     */
    public n:number = 0;

    public _next:PropGesture;

    public _prev:PropGesture;


    /**
     * Possible，还有可能被识别
     */
    public p:boolean = true;

    /**
     * recognized
     * 是否已经识别出此手势，如果识别出来，计算链条将被打破，识别出来的手势会放到首位
     */
    public r:boolean;

    /**
     * failed
     * 一轮手势检测中已经确认监测失败
     */
    public f:boolean;

    /**
     * 是否在hold链条里面等待被执行（requireGestureRecognizerToFail确定识别失败），或者被取消执行 （requireGestureRecognizerToFail确定已经识别）
     */
    public h:boolean;

    /** Priority **/
    public pr:number = 0;

    /**
     * requireGestureRecognizerToFail的源，
     * 也就是这个手势g，需要当前手势再f=true的时候再次尝试
     */
    public _o:PropGesture;

    /**
     * requireGestureRecognizerToFail
     * 如果_f != null，说明此手势需要等待_f在识别失败的时候才开始识别
     */
    public _f:PropGesture;

    public constructor(target:any, property0:string = "executeGestureRecognizedCallback", property1:string = "checkGesture", property2:string = "updateValue", next:PropGesture = null, isContinuous:boolean = false, priority:number = 0, numTouchesRequired:number = 1) {
        this.t = target;
        this.c = isContinuous;
        if (next) {
            next._prev = this;
            this._next = next;
        }
        this.p0 = property0;
        this.p1 = property1;
        this.p2 = property2;
        this.n = numTouchesRequired;
    }

}
