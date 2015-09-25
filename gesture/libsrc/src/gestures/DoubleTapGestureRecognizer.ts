class DoubleTapGestureRecognizer extends GestureRecognizerPlugin {
    private _interval:number = 300;

    private _max_dist:number = 80;

    private _t:egret.Timer;

    private _count:number = 0;

    private _validate:boolean = false;

    private _sx:number = 0;
    private _sy:number = 0;

    public constructor(priority:number = 0, requireGestureRecognizerToFail:boolean = false) {
        super(GestureType.DOUBLE_TAP, priority, requireGestureRecognizerToFail);
        this._t = new egret.Timer(this._interval, 1);
        this._t.addEventListener(egret.TimerEvent.TIMER, this.onCheck, this);
        this._count = 0;
    }

    public checkGesture(ts:Array<egret.TouchEvent>):boolean {
        var t:egret.TouchEvent = ts[0];
        var validate:boolean;
        if (t.type == egret.TouchEvent.TOUCH_BEGIN) {
            if (this._count == 0) this._failed = false;
        }
        if (t.type == egret.TouchEvent.TOUCH_MOVE) {

        }
        if (t.type == egret.TouchEvent.TOUCH_END) {
            if (this._count == 0) {
                this._count += 1;
                this._validate = true;
                this._t.reset();
                this._t.start();
                //需要记录第一次点击的位置
                this._sx = t.stageX;
                this._sy = t.stageY;
            }
            else if (this._count == 1) {
                if (this._validate && Math.abs(t.stageX - this._sx) < this._max_dist
                    && Math.abs(t.stageY - this._sy) < this._max_dist) {
                    //除了时间间隔需要在规定的时间内，而且需要比对第二次点击和第一次点击的位置差异需要保持在一定范围才算有效
                    validate = true;
                }
                this._count = 0;
                this._t.stop();
            }
        }
        return validate;
    }

    private onCheck(e:egret.TimerEvent):void {
        this._failed = true;
        this._validate = false;
        this._count = 0;
        if (this._requireGestureRecognizerToFail) {
            this._g.gestureRecognizerStateChange(this._gestureType, false);
        }
    }

}
