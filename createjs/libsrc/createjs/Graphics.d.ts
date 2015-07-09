declare module createjs {
    class Graphics {
        draw(ctx):void;
        beginFill(color:string):Graphics;
        drawRect(x:number,y:number,w:number,h:number):Graphics;
        beginLinearGradientFill(colors:string[],alphas:number[],x0:number,y0:number,x1:number,y1:number):Graphics;
        endFill():Graphics;
        beginStroke():Graphics;
        moveTo(x:number, y:number):Graphics;
        lineTo(x:number, y:number):Graphics;
        curveTo(controlX:number, controlY:number, anchorX:number, anchorY:number):Graphics;
        closePath():Graphics;
        bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y):Graphics;
        beginRadialGradientFill(colors, ratios, x0, y0, r0, x1, y1, r1):Graphics;
        decodePath(str):Graphics;
        quadraticCurveTo(cp1x:number, cp1y:number, x:number, y:number):Graphics;
        _measureBounds():egret.Rectangle;
        drawCircle(x, y, radius):Graphics;
        s:Function;
        ss:Function;
        f:Function;
        p:Function;
        cp:Function;
        dr:Function;
        lf:Function;
        rf:Function;
    }
}