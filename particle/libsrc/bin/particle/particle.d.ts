declare module particle {
    class Particle {
        /**
         * 表示 Particle 实例相对于父级本地坐标的 x 坐标。
         * @member {number} particle.Particle#x
         */
        x: number;
        /**
         * 表示粒子实例相对于父级本地坐标的 y 坐标。
         * @member {number} particle.Particle#y
         */
        y: number;
        /**
         * 表示从注册点开始应用的对象的缩放比例（百分比）。
         * @member {number} particle.Particle#scale
         * @default 1
         */
        scale: number;
        /**
         * 表示 Particle 实例距其原始方向的旋转程度，以度为单位
         * @member {number} particle.Particle#rotation
         * @default 0
         */
        rotation: number;
        /**
         * 表示粒子的 Alpha 透明度值
         * @member {number} particle.Particle#alpha
         * @default 1
         */
        alpha: number;
        /**
         * 表示粒子当前存活时间，以毫秒为单位，取值范围(0,Number.MAX_VALUE]，该值超过 totalTime 时，粒子将会被销毁
         * @member {number} particle.Particle#currentTime
         * @default 0
         */
        currentTime: number;
        /**
         * 表示粒子的存活总时间，以毫秒为单位，取值范围(0,Number.MAX_VALUE]
         * @member {number} particle.Particle#totalTime
         * @default 1000
         */
        totalTime: number;
        /**
         * 表示粒子的混合模式
         * @member {number} particle.Particle#blendMode
         */
        blendMode: number;
        constructor();
        reset(): void;
        private matrix;
        $getMatrix(regX: number, regY: number): egret.Matrix;
    }
}
declare module particle {
    class ParticleSystem extends egret.DisplayObject {
        private _pool;
        private frameTime;
        private particles;
        private _emitterBounds;
        protected relativeContentBounds: egret.Rectangle;
        protected _emitterX: number;
        protected _emitterY: number;
        /**
         * 表示粒子出现总时间，单位毫秒，取值范围(0,Number.MAX_VALUE]，-1表示无限时间
         * @member {number} particle.ParticleSystem#emissionTime
         * @default -1
         */
        emissionTime: number;
        /**
         * 表示粒子出现间隔，单位毫秒，取值范围(0,Number.MAX_VALUE]
         * @member {number} particle.ParticleSystem#emissionRate
         */
        emissionRate: number;
        /**
         * 表示粒子所使用的纹理
         * @member {egret.Texture} particle.ParticleSystem#texture
         */
        texture: egret.Texture;
        /**
         * 表示粒子系统最大粒子数，超过该数量将不会继续创建粒子，取值范围[1,Number.MAX_VALUE]
         * @member {number} particle.ParticleSystem#maxParticles
         * @default 200
         */
        maxParticles: number;
        /**
         * 当前粒子数
         * @member {number} particle.ParticleSystem#numParticles
         */
        private numParticles;
        /**
         * 表示粒子类，如果设置创建粒子时将创建该类
         * @member {number} particle.ParticleSystem#particleClass
         */
        particleClass: any;
        $particleConfig: any;
        constructor(texture: egret.Texture, emissionRate: number);
        protected createNativeDisplayObject(): void;
        initConfig(emissionRate: number, emitterX: number, emitterY: number): void;
        private getParticle();
        private removeParticle(particle);
        initParticle(particle: Particle): void;
        /**
         * 更新当前显示对象坐标系下的边框界限
         * @param emitterRect {egret.Rectangle} 相对发射点坐标系下的界限
         */
        private updateRelativeBounds(emitterRect);
        /**
         * 表示当前粒子系统中发射粒子的渲染边界范围，使用以发射点为基准的坐标系
         * @member {egret.Rectangle} particle.ParticleSystem#emitterBounds
         */
        emitterBounds: egret.Rectangle;
        onPropertyChanges(): void;
        /**
         * 表示粒子出现点X坐标，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.ParticleSystem#emitterX
         * @default 0
         */
        emitterX: number;
        /**
         * 表示粒子出现点Y坐标，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.ParticleSystem#emitterY
         * @default 0
         */
        emitterY: number;
        /**
         * 开始创建粒子
         * @param duration {number} 粒子出现总时间
         */
        start(duration?: number): void;
        /**
         * 停止创建粒子
         * @param clear {boolean} 是否清除掉现有粒子
         */
        stop(clear?: boolean): void;
        private timeStamp;
        private update(timeStamp);
        private particleMeasureRect;
        private transformForMeasure;
        private lastRect;
        $measureContentBounds(bounds: egret.Rectangle): void;
        setCurrentParticles(num: number): void;
        /**
         * 更换粒子纹理
         * @param texture {egret.Texture} 新的纹理
         */
        changeTexture(texture: egret.Texture): void;
        private clear();
        private addOneParticle();
        advanceParticle(particle: Particle, dt: number): void;
        private bitmapNodeList;
        $updateRenderNode(): void;
        private appendTransform(matrix, x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY);
    }
}
declare let regionPool: Region[];
/**
 * @private
 */
declare class Region {
    /**
     * @private
     * 释放一个Region实例到对象池
     */
    static release(region: Region): void;
    /**
     * @private
     * 从对象池中取出或创建一个新的Region对象。
     * 建议对于一次性使用的对象，均使用此方法创建，而不是直接new一个。
     * 使用完后调用对应的release()静态方法回收对象，能有效减少对象创建数量造成的性能开销。
     */
    static create(): Region;
    /**
     * @private
     */
    minX: number;
    /**
     * @private
     */
    minY: number;
    /**
     * @private
     */
    maxX: number;
    /**
     * @private
     */
    maxY: number;
    /**
     * @private
     */
    width: number;
    /**
     * @private
     */
    height: number;
    /**
     * @private
     */
    area: number;
    /**
     * @private
     */
    private setEmpty();
    /**
     * @private
     */
    updateRegion(bounds: egret.Rectangle, matrix: egret.Matrix): void;
}
declare module particle {
    class GravityParticle extends Particle {
        startX: number;
        startY: number;
        velocityX: number;
        velocityY: number;
        radialAcceleration: number;
        tangentialAcceleration: number;
        rotationDelta: number;
        scaleDelta: number;
        alphaDelta: number;
        reset(): void;
    }
}
declare module particle {
    class GravityParticleSystem extends ParticleSystem {
        /**
         * 表示粒子初始坐标 x 差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#emitterXVariance
         */
        private emitterXVariance;
        /**
         * 表示粒子初始坐标 y 差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#emitterYVariance
         */
        private emitterYVariance;
        /**
         * 表示粒子存活时间，单位毫秒，取值范围(0,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#lifespan
         */
        private lifespan;
        /**
         * 表示粒子存活时间差值，单位毫秒，取值范围(0,Number.MAX_VALUE]且不大于 lifespan
         * @member {number} particle.GravityParticleSystem#lifespanVariance
         */
        private lifespanVariance;
        /**
         * 表示粒子出现时大小，取值范围(0,Number.MAX_VALUE]，粒子将会在存活时间内由 startSize 慢慢变为 endSize
         * @member {number} particle.GravityParticleSystem#startSize
         */
        private startSize;
        /**
         * 表示粒子出现时大小差值，取值范围(0,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#startSizeVariance
         */
        private startSizeVariance;
        /**
         * 表示粒子消失时大小，取值范围(0,Number.MAX_VALUE]，粒子将会在存活时间内由 startSize慢慢变为 endSize
         * @member {number} particle.GravityParticleSystem#endSize
         */
        private endSize;
        /**
         * 表示粒子消失时大小差值，取值范围(0,Number.MAX_VALUE]，且不大于endSize
         * @member {number} particle.GravityParticleSystem#endSizeVariance
         */
        private endSizeVariance;
        /**
         * 表示粒子出现时的角度，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#emitAngle
         */
        private emitAngle;
        /**
         * 表示粒子出现时的角度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#emitAngleVariance
         */
        private emitAngleVariance;
        /**
         * 表示粒子出现时旋转值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]，粒子将会在存活时间内由 startRotation 慢慢变为 endRotation
         * @member {number} particle.GravityParticleSystem#startRotation
         */
        private startRotation;
        /**
         * 表示粒子出现时旋转值差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#startRotationVariance
         */
        private startRotationVariance;
        /**
         * 表示粒子消失时旋转值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]，粒子将会在存活时间内由 startRotation 慢慢变为 endRotation
         * @member {number} particle.GravityParticleSystem#endRotation
         */
        private endRotation;
        /**
         * 表示粒子消失时旋转值差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#endRotationVariance
         */
        private endRotationVariance;
        /**
         * 表示粒子出现时速度，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#speed
         */
        private speed;
        /**
         * 表示粒子出现时速度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#speedVariance
         */
        private speedVariance;
        /**
         * 表示粒子水平重力，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#gravityX
         */
        private gravityX;
        /**
         * 表示粒子垂直重力，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#gravityX
         */
        private gravityY;
        /**
         * 表示粒子径向加速度，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#radialAcceleration
         */
        private radialAcceleration;
        /**
         * 表示粒子径向加速度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#radialAccelerationVariance
         */
        private radialAccelerationVariance;
        /**
         * 表示粒子切向加速度，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#tangentialAcceleration
         */
        private tangentialAcceleration;
        /**
         * 表示粒子切向加速度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#tangentialAccelerationVariance
         */
        private tangentialAccelerationVariance;
        /**
         * 表示粒子出现时的 Alpha 透明度值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]，粒子将会在存活时间内由 startAlpha 慢慢变为 endAlpha
         * @member {number} particle.GravityParticleSystem#startAlpha
         */
        private startAlpha;
        /**
         * 表示粒子出现时的 Alpha 透明度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#startAlphaVariance
         */
        private startAlphaVariance;
        /**
         * 表示粒子消失时的 Alpha 透明度值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]，粒子将会在存活时间内由 startAlpha 慢慢变为 endAlpha
         * @member {number} particle.GravityParticleSystem#endAlpha
         */
        private endAlpha;
        /**
         * 表示粒子消失时的 Alpha 透明度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
         * @member {number} particle.GravityParticleSystem#endAlphaVariance
         */
        private endAlphaVariance;
        /**
         * 表示粒子使用的混合模式
         * @member {number} particle.GravityParticleSystem#blendMode
         */
        private particleBlendMode;
        /**
         * 是否完成解析json数据
         */
        private $init;
        constructor(texture: egret.Texture, config: any);
        start(duration?: number): void;
        setCurrentParticles(num: number): void;
        onPropertyChanges(): void;
        private parseConfig(config);
        initParticle(particle: Particle): void;
        private static getValue(base, variance);
        advanceParticle(particle: Particle, dt: number): void;
    }
}
