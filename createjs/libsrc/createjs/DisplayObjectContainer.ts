module createjs {
    export class DisplayObjectContainer extends egret.DisplayObjectContainer {
        public constructor() {
            super();
        }

        public setTransform(x:number, y:number, scaleX:number, scaleY:number, rotation:number, skewX:number = 0, skewY:number = 0, regX:number = 0, regY:number = 0):createjs.DisplayObjectContainer {
            this.x = x;
            this.y = y;
            this.scaleX = scaleX == null ? 1 : scaleX;
            this.scaleY = scaleY == null ? 1 : scaleY;
            this.rotation = rotation || 0;
            this.skewX = skewX;
            this.skewY = skewY;
            this.anchorOffsetX = regX;
            this.anchorOffsetY = regY;
            return this;
        }
    }
}

createjs["Container"] = createjs.DisplayObjectContainer;