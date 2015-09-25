class Polygon extends egret.Sprite {
    private _x: number;
    private _y: number;
    private _points: Array<any>;
    constructor(x: number, y: number, points: Array<any>) {
        super();
        this._x = x;
        this._y = y;
        this._points = points;
    }

    draw($color: number): void {
        this.graphics.clear();
        this.graphics.lineStyle(2, $color);
        this.graphics.beginFill($color, 0.2);
        if (this._points) {
            for (var i: number = 0; i < this._points.length; i++) {
                var _data: Array<number> = this._points[i];
                if (i == 0)
                    this.graphics.moveTo(_data[0], _data[1]);
                else
                    this.graphics.lineTo(_data[0], _data[1]);
            }
        }
        this.graphics.endFill();
    }
} 