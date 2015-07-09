module createjs {
    export class Shape extends egret.DisplayObject {
        private _graphics:createjs.Graphics;
        public _off:boolean = false;

        public constructor() {
            super();
        }

        public setTransform(x:number, y:number, scaleX:number = 1, scaleY:number = 1, rotation:number = 0, skewX:number = 0, skewY:number = 0, regX:number = 0, regY:number = 0):createjs.Shape {
            this.x = x || 0;
            this.y = y || 0;
            this.scaleX = scaleX == null ? 1 : scaleX;
            this.scaleY = scaleY == null ? 1 : scaleY;
            this.rotation = rotation || 0;
            this.skewX = skewX || 0;
            this.skewY = skewY || 0;
            this.anchorX = (regX || 0 ) / this.width;
            this.anchorY = (regY || 0) / this.height;
            return this;
        }

        public set graphics(value:createjs.Graphics) {
            if (this._graphics != value) {
                this._graphics = value;
                if (value) {
                    this.needDraw = true;
                } else {
                    this.needDraw = false;
                }
            }
        }

        public get graphics():createjs.Graphics {
            if (!this._graphics) {
                this._graphics = new createjs.Graphics();
                this.needDraw = true;
            }
            return this._graphics;
        }

        public _render(renderContext:egret.RendererContext):void {
            if (this._graphics) {
                var ctx;
                if (egret.MainContext.runtimeType == egret.MainContext.RUNTIME_HTML5) {
                    ctx = renderContext["drawCanvasContext"];
                    renderContext["_transformTx"] = renderContext["_transformTy"] = 0;
                    var worldTransform = this._worldTransform;
                    ctx.setTransform(worldTransform.a, worldTransform.b, worldTransform.c, worldTransform.d, worldTransform.tx, worldTransform.ty);
                    this._graphics.draw(ctx);
                }
                else {
                    ctx = __global["egret_native"]["rastergl"];
                    this._graphics.draw(ctx);
                }
            }
        }

        public _measureBounds():egret.Rectangle {
            if (this._graphics) {
                return this._graphics._measureBounds();
            }
            return super._measureBounds();
        }
    }
}
