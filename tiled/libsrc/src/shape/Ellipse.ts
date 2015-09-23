class Ellipse extends egret.Sprite {
    private _x: number;
    private _y: number;
    constructor(x: number, y: number, w: number, h: number) {
        super();
        this._x = x;
        this._y = y;
        this.width = w;
        this.height = h;
    }

    draw($color:number): void {
        this.graphics.clear();
        this.graphics.lineStyle(2, $color);
        this.graphics.beginFill($color, 0.2);
        this.graphics.drawEllipse(this._x, this._y, this.width, this.height);
        this.graphics.endFill();
    }
} 