module tiled{
	export class Ellipse extends egret.Sprite {
		
		/**
		 * 创建1个椭圆形状实例
		 * @param x 水平坐标（单位：像素）
		 * @param y 垂直坐标（单位：像素）
		 * @param w 椭圆宽
		 * @param h 椭圆高
		 * @version Egret 3.0.3
		 */
		constructor(x: number, y: number, w: number, h: number) {
			super();
			this.x      = x;
			this.y      = y;
            this.width  = w;
            this.height = h;
		}

		
		/**
		 * 根据参数<code>color</code>绘制椭圆，参数为16进制表示形式，例如：0xff0000
		 * @param color 颜色值
		 * @version Egret 3.0.3
		 */
		draw(color:number): void {
			this.graphics.clear();
			this.graphics.lineStyle(2, color);
			this.graphics.beginFill(color, 0.2);
			this.graphics.drawEllipse(0, 0, this.width, this.height);
			this.graphics.endFill();
		}
	} 
}
