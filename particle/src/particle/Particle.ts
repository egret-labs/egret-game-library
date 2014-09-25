/**
 * Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
 * to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

module particle {
    export class Particle {

        /**
         * 表示 Particle 实例相对于父级本地坐标的 x 坐标。
         * @member {number} particle.Particle#x
         */
        public x:number;

        /**
         * 表示粒子实例相对于父级本地坐标的 y 坐标。
         * @member {number} particle.Particle#y
         */
        public y:number;

        /**
         * 表示从注册点开始应用的对象的缩放比例（百分比）。
         * @member {number} particle.Particle#scale
         * @default 1
         */
        public scale:number;

        /**
         * 表示 Particle 实例距其原始方向的旋转程度，以度为单位
         * @member {number} particle.Particle#rotation
         * @default 0
         */
        public rotation:number;

        /**
         * 表示粒子的 Alpha 透明度值
         * @member {number} particle.Particle#alpha
         * @default 1
         */
        public alpha:number;

        /**
         * 表示粒子当前存活时间，以毫秒为单位，取值范围(0,Number.MAX_VALUE]，该值超过 totalTime 时，粒子将会被销毁
         * @member {number} particle.Particle#currentTime
         * @default 0
         */
        public currentTime:number;

        /**
         * 表示粒子的存活总时间，以毫秒为单位，取值范围(0,Number.MAX_VALUE]
         * @member {number} particle.Particle#totalTime
         * @default 1000
         */
        public totalTime:number;

        constructor() {
            this.reset();
        }

        public reset():void {
            this.x = 0;
            this.y = 0;
            this.scale = 1;
            this.rotation = 0;
            this.alpha = 1;
            this.currentTime = 0;
            this.totalTime = 1000;
        }
    }
}