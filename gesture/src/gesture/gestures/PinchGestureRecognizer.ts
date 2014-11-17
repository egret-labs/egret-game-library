class PinchGestureRecognizer extends GestureRecognizerPlugin {
    private _cx:number = 0;
    private _cy:number = 0;

    private _offsetX:number = 0;
    private _offsetY:number = 0;

    private _localLocation:egret.Point;

    private _d1X:number;
    private _d1Y:number;

    private _d2X:number;
    private _d2Y:number;

    public constructor(priority:number = 0, requireGestureRecognizerToFail:boolean = false) {
        super(GestureType.PINCH, priority, requireGestureRecognizerToFail, true, 2);
    }

    public checkGesture(ts:Array<egret.TouchEvent>):boolean {
        if (ts.length != 2) {
            this._cx = 0;
            this._offsetX = this._offsetY = 0;
            return false;
        }

        var t1:egret.TouchEvent = ts[0];
        var t2:egret.TouchEvent = ts[1];

        //如果某一个手指抬起来了，此手势结束识别
        if (t1.type == egret.TouchEvent.TOUCH_END || t2.type == egret.TouchEvent.TOUCH_END) {
            this._cx = 0;
            this._offsetX = this._offsetY = 0;
            return false;
        }

        if (this._cx != 0) {
            return true;
        }
        this._cx = (t1.stageX + t2.stageX) * 0.5;
        this._cy = (t1.stageY + t2.stageY) * 0.5;
        this._d1X = t1.stageX - t2.stageX;
        this._d1Y = t1.stageY - t2.stageY;

        this._localLocation = this._g.target.globalToLocal(this._cx, this._cy, this._localLocation);

        if (this._callBack.changed) {
            this._result.dx = this._offsetX;
            this._result.dy = this._offsetY;
            this._result.dScale = 1;
            this._result.localLocation = this._localLocation;
            this._callBack.changed(this._result);
        }
        return true;
    }

    public updateValue(ts:Array<egret.TouchEvent>):boolean {
        if (ts.length != 2) {
            this._cx = 0;
            return false;
        }

        var t1:egret.TouchEvent = ts[0];
        var t2:egret.TouchEvent = ts[1];

        if (t1.type == egret.TouchEvent.TOUCH_END || t2.type == egret.TouchEvent.TOUCH_END) {
            this._cx = 0;
            this._offsetX = this._offsetY = 0;
            return false;
        }

        var prevX:number = this._cx;
        var prevY:number = this._cy;

        this._cx = (t1.stageX + t2.stageX) * 0.5;
        this._cy = (t1.stageY + t2.stageY) * 0.5;
        this._offsetX = this._cx - prevX;
        this._offsetY = this._cy - prevY;
        this._d2X = t1.stageX - t2.stageX;
        this._d2Y = t1.stageY - t2.stageY;
        this._localLocation = this._g.target.globalToLocal(this._cx, this._cy, this._localLocation);

        var scale:number = egret.Point.distance(new egret.Point(this._d2X, this._d2Y), this.pZero) / egret.Point.distance(new egret.Point(this._d1X, this._d1Y), this.pZero);

        this._d1X = this._d2X;
        this._d1Y = this._d2Y;

        if (this._callBack.changed) {
            this._result.dx = this._offsetX;
            this._result.dy = this._offsetY;
            this._result.dScale = scale;
            this._result.localLocation = this._localLocation;
            this._callBack.changed(this._result);
        }

        //返回true，说明这个连续的手势开始作用，当返回false的时候，说明这个连续的手势停止执行
        return true;
    }

    private pZero = new egret.Point();
}
