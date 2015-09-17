//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
    
declare module p2 {

    export class AABB {
        upperBound: number[];
        lowerBound: number[];
        constructor(options?: {
            upperBound?: number[];
            lowerBound?: number[];
        });

        setFromPoints(points: number[][], position: number[], angle: number, skinSize: number): void;
        copy(aabb: AABB): void;
        extend(aabb: AABB): void;
        overlaps(aabb: AABB): boolean;

    }

    export class Broadphase {

        static AABB: number;
        static BOUNDING_CIRCLE: number;

        static NAIVE: number;
        static SAP: number;

        static boundingRadiusCheck(bodyA: Body, bodyB: Body): boolean;
        static aabbCheck(bodyA: Body, bodyB: Body): boolean;
        static canCollide(bodyA: Body, bodyB: Body): boolean;

        constructor(type: number);

        type: number;
        result: Body[];
        world: World;
        boundingVolumeType: number;

        setWorld(world: World): void;
        getCollisionPairs(world: World): Body[];
        boundingVolumeCheck(bodyA: Body, bodyB: Body): boolean;

    }

    export class GridBroadphase extends Broadphase {

        constructor(options?: {
            xmin?: number;
            xmax?: number;
            ymin?: number;
            ymax?: number;
            nx?: number;
            ny?: number;
        });

        xmin: number;
        xmax: number;
        ymin: number;
        ymax: number;
        nx: number;
        ny: number;
        binsizeX: number;
        binsizeY: number;

    }

    export class NativeBroadphase extends Broadphase {

    }

    export class Narrowphase {

        contactEquations: ContactEquation[];
        frictionEquations: FrictionEquation[];
        enableFriction: boolean;
        slipForce: number;
        frictionCoefficient: number;
        surfaceVelocity: number;
        reuseObjects: boolean;
        resuableContactEquations: any[];
        reusableFrictionEquations: any[];
        restitution: number;
        stiffness: number;
        relaxation: number;
        frictionStiffness: number;
        frictionRelaxation: number;
        enableFrictionReduction: boolean;
        contactSkinSize: number;

        collidedLastStep(bodyA: Body, bodyB: Body): boolean;
        reset(): void;
        createContactEquation(bodyA: Body, bodyB: Body, shapeA: Shape, shapeB: Shape): ContactEquation;
        createFrictionFromContact(c: ContactEquation): FrictionEquation;

    }

    export class SAPBroadphase extends Broadphase {

        axisList: Body[];
        axisIndex: number;

    }

    export class Constraint {

        static DISTANCE: number;
        static GEAR: number;
        static LOCK: number;
        static PRISMATIC: number;
        static REVOLUTE: number;

        constructor(bodyA: Body, bodyB: Body, type: number, options?: {
            collideConnected?: boolean;
            wakeUpBodies?: boolean;
        });

        type: number;
        equeations: Equation[];
        bodyA: Body;
        bodyB: Body;
        collideConnected: boolean;

        update(): void;
        setStiffness(stiffness: number): void;
        setRelaxation(relaxation: number): void;

    }

    export class DistanceConstraint extends Constraint {

        constructor(bodyA: Body, bodyB: Body, type: number, options?: {
            collideConnected?: boolean;
            wakeUpBodies?: boolean;
            distance?: number;
            localAnchorA?: number[];
            localAnchorB?: number[];
            maxForce?: number;
        });

        localAnchorA: number[];
        localAnchorB: number[];
        distance: number;
        maxForce: number;
        upperLimitEnabled: boolean;
        upperLimit: number;
        lowerLimitEnabled: boolean;
        lowerLimit: number;
        position: number;

        setMaxForce(f: number): void;
        getMaxForce(): number;

    }

    export class GearConstraint extends Constraint {

        constructor(bodyA: Body, bodyB: Body, type: number, options?: {
            collideConnected?: boolean;
            wakeUpBodies?: boolean;
            angle?: number;
            ratio?: number;
            maxTorque?: number;
        });

        ratio: number;
        angle: number;

        setMaxTorque(torque: number): void;
        getMaxTorque(): number;

    }

    export class LockConstraint extends Constraint {

        constructor(bodyA: Body, bodyB: Body, options?: {
            collideConnected?: boolean;
            wakeUpBodies?: boolean;
            localOffsetB?: number[];
            localAngleB?: number;
            maxForce?: number;
        });

        setMaxForce(force: number): void;
        getMaxForce(): number;

    }

    export class PrismaticConstraint extends Constraint {

        constructor(bodyA: Body, bodyB: Body, type: number, options?: {
            collideConnected?: boolean;
            wakeUpBodies?: boolean;
            maxForce?: number;
            localAnchorA?: number[];
            localAnchorB?: number[];
            localAxisA?: number[];
            disableRotationalLock?: boolean;
            upperLimit?: number;
            lowerLimit?: number;
        });

        localAnchorA: number[];
        localAnchorB: number[];
        localAxisA: number[];
        position: number;
        velocity: number;
        lowerLimitEnabled: boolean;
        upperLimitEnabled: boolean;
        lowerLimit: number;
        upperLimit: number;
        upperLimitEquation: ContactEquation;
        lowerLimitEquation: ContactEquation;
        motorEquation: Equation;
        motorEnabled: boolean;
        motorSpeed: number;

        enableMotor(): void;
        disableMotor(): void;
        setLimits(lower: number, upper: number): void;

    }

    export class RevoluteConstraint extends Constraint {

        constructor(bodyA: Body, bodyB: Body, type: number, options?: {
            collideConnected?: boolean;
            wakeUpBodies?: boolean;
            worldPivot?: number[];
            localPivotA?: number[];
            localPivotB?: number[];
            maxForce?: number;
        });

        pivotA: number[];
        pivotB: number[];
        motorEquation: RotationalVelocityEquation;
        motorEnabled: boolean;
        angle: number;
        lowerLimitEnabled: boolean;
        upperLimitEnabled: boolean;
        lowerLimit: number;
        upperLimit: number;
        upperLimitEquation: ContactEquation;
        lowerLimitEquation: ContactEquation;

        enableMotor(): void;
        disableMotor(): void;
        motorIsEnabled(): boolean;
        setLimits(lower: number, upper: number): void;
        setMotorSpeed(speed: number): void;
        getMotorSpeed(): number;

    }

    export class AngleLockEquation extends Equation {

        constructor(bodyA: Body, bodyB: Body, options?: {
            angle?: number;
            ratio?: number;
        });

        computeGq(): number;
        setRatio(ratio: number): number;
        setMaxTorque(torque: number): number;

    }

    export class ContactEquation extends Equation {

        constructor(bodyA: Body, bodyB: Body);

        contactPointA: number[];
        penetrationVec: number[];
        contactPointB: number[];
        normalA: number[];
        restitution: number;
        firstImpact: boolean;
        shapeA: Shape;
        shapeB: Shape;

        computeB(a: number, b: number, h: number): number;

    }

    export class Equation {

        static DEFAULT_STIFFNESS: number;
        static DEFAULT_RELAXATION: number;

        constructor(bodyA: Body, bodyB: Body, minForce?: number, maxForce?: number);

        minForce: number;
        maxForce: number;
        bodyA: Body;
        bodyB: Body;
        stiffness: number;
        relaxation: number;
        G: number[];
        offset: number;
        a: number;
        b: number;
        epsilon: number;
        timeStep: number;
        needsUpdate: boolean;
        multiplier: number;
        relativeVelocity: number;
        enabled: boolean;

        gmult(G: number[], vi: number[], wi: number[], vj: number[], wj: number[]): number;
        computeB(a: number, b: number, h: number): number;
        computeGq(): number;
        computeGW(): number;
        computeGWlambda(): number;
        computeGiMf(): number;
        computeGiMGt(): number;
        addToWlambda(deltalambda: number): number;
        computeInvC(eps: number): number;

    }

    export class FrictionEquation extends Equation {

        constructor(bodyA: Body, bodyB: Body, slipForce: number);

        contactPointA: number[];
        contactPointB: number[];
        t: number[];
        shapeA: Shape;
        shapeB: Shape;
        frictionCoefficient: number;

        setSlipForce(slipForce: number): number;
        getSlipForce(): number;
        computeB(a: number, b: number, h: number): number;

    }

    export class RotationalLockEquation extends Equation {

        constructor(bodyA: Body, bodyB: Body, options?: {
            angle?: number;
        });

        angle: number;

        computeGq(): number;

    }

    export class RotationalVelocityEquation extends Equation {

        constructor(bodyA: Body, bodyB: Body);

        computeB(a: number, b: number, h: number): number;

    }

    export class EventEmitter {

        on(type: string, listener: Function, context: any): EventEmitter;
        has(type: string, listener: Function): boolean;
        off(type: string, listener: Function): EventEmitter;
        emit(event: any): EventEmitter;

    }

    export class ContactMaterialOptions {

        friction: number;
        restitution: number;
        stiffness: number;
        relaxation: number;
        frictionStiffness: number;
        frictionRelaxation: number;
        surfaceVelocity: number;

    }

    export class ContactMaterial {

        static idCounter: number;

        constructor(materialA: Material, materialB: Material, options?: ContactMaterialOptions);

        id: number;
        materialA: Material;
        materialB: Material;
        friction: number;
        restitution: number;
        stiffness: number;
        relaxation: number;
        frictionStuffness: number;
        frictionRelaxation: number;
        surfaceVelocity: number;
        contactSkinSize: number;

    }

    export class Material {

        static idCounter: number;

        constructor(id: number);

        id: number;

    }

    export class vec2 {

        static crossLength(a: number[], b: number[]): number;
        static crossVZ(out: number[], vec: number[], zcomp: number): number;
        static crossZV(out: number[], zcomp: number, vec: number[]): number;
        static rotate(out: number[], a: number[], angle: number): void;
        static rotate90cw(out: number[], a: number[]): number;
        static centroid(out: number[], a: number[], b: number[], c: number[]): number[];
        static create(): number[];
        static clone(a: number[]): number[];
        static fromValues(x: number, y: number): number[];
        static copy(out: number[], a: number[]): number[];
        static set(out: number[], x: number, y: number): number[];
        static toLocalFrame(out: number[], worldPoint: number[], framePosition: number[], frameAngle: number): void;
        static toGlobalFrame(out: number[], localPoint: number[], framePosition: number[], frameAngle: number): void;
        static add(out: number[], a: number[], b: number[]): number[];
        static subtract(out: number[], a: number[], b: number[]): number[];
        static sub(out: number[], a: number[], b: number[]): number[];
        static multiply(out: number[], a: number[], b: number[]): number[];
        static mul(out: number[], a: number[], b: number[]): number[];
        static divide(out: number[], a: number[], b: number[]): number[];
        static div(out: number[], a: number[], b: number[]): number[];
        static scale(out: number[], a: number[], b: number): number[];
        static distance(a: number[], b: number[]): number;
        static dist(a: number[], b: number[]): number;
        static squaredDistance(a: number[], b: number[]): number;
        static sqrDist(a: number[], b: number[]): number;
        static length(a: number[]): number;
        static len(a: number[]): number;
        static squaredLength(a: number[]): number;
        static sqrLen(a: number[]): number;
        static negate(out: number[], a: number[]): number[];
        static normalize(out: number[], a: number[]): number[];
        static dot(a: number[], b: number[]): number;
        static str(a: number[]): string;

    }

//    export class BodyOptions {
//
//        mass: number;
//        position: number[];
//        velocity: number[];
//        angle: number;
//        angularVelocity: number;
//        force: number[];
//        angularForce: number;
//        fixedRotation: number;
//
//    }

    /**
     * 刚体。有质量、位置、速度等属性以及一组被用于碰撞的形状
     *
     * @class Body
     * @constructor
     * @extends EventEmitter
     * @param {Object}              [options]
     * @param {Number}              [options.mass=0]    一个大于0的数字。如果设置成0，其type属性将被设置为 Body.STATIC.
     * @param {Array}               [options.position]
     * @param {Array}               [options.velocity]
     * @param {Number}              [options.angle=0]
     * @param {Number}              [options.angularVelocity=0]
     * @param {Array}               [options.force]
     * @param {Number}              [options.angularForce=0]
     * @param {Number}              [options.fixedRotation=false]
     *
     * @example
     *     // 创建一个刚体
     *     var body = new Body({
     *         mass: 1,
     *         position: [0, 0],
     *         angle: 0,
     *         velocity: [0, 0],
     *         angularVelocity: 0
     *     });
     *
     *     // 将一个圆形形状添加到刚体
     *     body.addShape(new Circle(1));
     *
     *     // 将刚体加入 world
     *     world.addBody(body);
     */
    export class Body extends EventEmitter {

        sleepyEvent: {
            type: string;
        };

        sleepEvent: {
            type: string;
        };

        wakeUpEvent: {
            type: string;
        };

        static DYNAMIC: number;
        static STATIC: number;
        static KINEMATIC: number;
        static AWAKE: number;
        static SLEEPY: number;
        static SLEEPING: number;

        constructor(options?);

        /**
         * 刚体id
         * @property id
         * @type {Number}
         */
        id: number;
        /**
         * 刚体被添加到的 world。如果没有被添加到 world 该属性将被设置为 null
         * @property world
         * @type {World}
         */
        world: World;
        /**
         * 刚体的碰撞形状
         *
         * @property shapes
         * @type {Array}
         */
        shapes: Shape[];
        /**
         * 碰撞形状相对于刚体中心的偏移
         * @property shapeOffsets
         * @type {Array}
         */
        shapeOffsets: number[][];
        /**
         * 碰撞形状的角度变换
         * @property shapeAngles
         * @type {Array}
         */
        shapeAngles: number[];
        /**
         * 质量
         * @property mass
         * @type {number}
         */
        mass: number;
        /**
         * 惯性
         * @property inertia
         * @type {number}
         */
        inertia: number;
        /**
         * 是否固定旋转
         * @property fixedRotation
         * @type {Boolean}
         */
        fixedRotation: boolean;
        /**
         * 位置
         * @property position
         * @type {Array}
         */
        position: number[];
        /**
         * 位置插值
         * @property interpolatedPosition
         * @type {Array}
         */
        interpolatedPosition: number[];
        /**
         * 角度插值
         * @property interpolatedAngle
         * @type {Number}
         */
        interpolatedAngle: number;
        /**
         * 速度
         * @property velocity
         * @type {Array}
         */
        velocity: number[];
        /**
         * 角度
         * @property angle
         * @type {number}
         */
        angle: number;
        /**
         * 力
         * @property force
         * @type {Array}
         */
        force: number[];
        /**
         * 角力
         * @property angularForce
         * @type {number}
         */
        angularForce: number;
        /**
         * 限行阻尼。取值区间[0,1]
         * @property damping
         * @type {Number}
         * @default 0.1
         */
        damping: number;
        /**
         * 角阻尼。取值区间[0,1]
         * @property angularDamping
         * @type {Number}
         * @default 0.1
         */
        angularDamping: number;
        /**
         * 运动类型。 应该是Body.STATIC，Body.DYNAMIC，Body.KINEMATIC之一
         *
         * * Static 刚体不会动，不响应力或者碰撞
         * * Dynamic 刚体会动，响应力和碰撞
         * * Kinematic 刚体仅根据自身属性运动，不响应力或者碰撞
         *
         * @property type
         * @type {number}
         *
         * @example
         *     // 默认值是STATIC
         *     var body = new Body();
         *     console.log(body.type == Body.STATIC); // true
         *
         * @example
         *     // 将质量设置为非0的值，会变为DYNAMIC
         *     var dynamicBody = new Body({
     *         mass : 1
     *     });
         *     console.log(dynamicBody.type == Body.DYNAMIC); // true
         *
         * @example
         *     // KINEMATIC刚体只会运动，如果你改变它的速度
         *     var kinematicBody = new Body({
     *         type: Body.KINEMATIC
     *     });
         */
        type: number;
        /**
         * 边界圆半径
         * @property boundingRadius
         * @type {Number}
         */
        boundingRadius: number;
        /**
         * 边框
         * @property aabb
         * @type {AABB}
         */
        aabb: AABB;
        /**
         * 设置AABB是否会更新。通过调用 updateAABB 方法更新它
         * @property aabbNeedsUpdate
         * @type {Boolean}
         * @see updateAABB
         *
         * @example
         *     body.aabbNeedsUpdate = true;
         *     body.updateAABB();
         *     console.log(body.aabbNeedsUpdate); // false
         */
        aabbNeedsUpdate: boolean;
        /**
         * 设置为true，刚体会自动进入睡眠。需要在 World 中允许刚体睡眠
         * @property allowSleep
         * @type {Boolean}
         * @default true
         */
        allowSleep: boolean;
        wantsToSleep: boolean;
        /**
         * Body.AWAKE，Body.SLEEPY，Body.SLEEPING之一
         *
         * 默认值是 Body.AWAKE。如果刚体速度低于 sleepSpeedLimit，该属性将变为 Body.SLEEPY。如果持续 Body.SLEEPY 状态 sleepTimeLimit 秒，该属性将变为 Body.SLEEPY。
         *
         * @property sleepState
         * @type {Number}
         * @default Body.AWAKE
         */
        sleepState: number;
        /**
         * 如果速度小于该值，sleepState 将变为 Body.SLEEPY 状态
         * @property sleepSpeedLimit
         * @type {Number}
         * @default 0.2
         */
        sleepSpeedLimit: number;
        /**
         * 如果持续 Body.SLEEPY 状态 sleepTimeLimit 秒，sleepState 将变为 Body.SLEEPING
         * @property sleepTimeLimit
         * @type {Number}
         * @default 1
         */
        sleepTimeLimit: number;
        /**
         * 重力缩放因子。如果你想忽略刚体重心，设置为零。如果你想反转重力，将其设置为-1。
         * @property {Number} gravityScale
         * @default 1
         */
        gravityScale: number;
        /**
         * 与每个形状对应的显示对象
         */
        displays: egret.DisplayObject[];

        updateSolveMassProperties(): void;
        /**
         * 设置刚体总密度
         * @method setDensity
         */
        setDensity(density: number): void;
        /**
         * 得到所有形状的总面积
         * @method getArea
         * @return {Number}
         */
        getArea(): number;
        /**
         * 获得AABB
         * @method getAABB
         */
        getAABB(): AABB;
        /**
         * 更新AABB
         * @method updateAABB
         */
        updateAABB(): void;
        /**
         * 更新外边界
         * @method updateBoundingRadius
         */
        updateBoundingRadius(): void;
        /**
         * 添加一个形状
         *
         * @method addShape
         * @param  {Shape} shape 形状
         * @param  {Array} [offset] 偏移
         * @param  {Number} [angle] 角度
         *
         * @example
         *     var body = new Body(),
         *         shape = new Circle();
         *
         *     // 位于中心
         *     body.addShape(shape);
         *
         *     // 偏移量为x轴一个单位
         *     body.addShape(shape,[1,0]);
         *
         *     // 偏移量为y轴一个单位，同时逆时针旋转90度
         *     body.addShape(shape,[0,1],Math.PI/2);
         */
        addShape(shape: Shape, offset?: number[], angle?: number): void;
        /**
         * 移除形状
         * @method removeShape
         * @param  {Shape}  shape
         * @return {Boolean}
         */
        removeShape(shape: Shape): boolean;
        /**
         * 更新属性，结构或者质量改变时会被调用
         *
         * @method updateMassProperties
         *
         * @example
         *     body.mass += 1;
         *     body.updateMassProperties();
         */
        updateMassProperties(): void;
        /**
         * 相对于 world 中的一个点施加力
         * @method applyForce
         * @param {Array} force 力
         * @param {Array} worldPoint world 中的点
         */
        applyForce(force: number[], worldPoint: number[]): void;
        /**
         * Wake the body up. Normally you should not need this, as the body is automatically awoken at events such as collisions.
         * Sets the sleepState to {{#crossLink "Body/AWAKE:property"}}Body.AWAKE{{/crossLink}} and emits the wakeUp event if the body wasn't awake before.
         * @method wakeUp
         */
        wakeUp(): void;
        /**
         * Force body sleep
         * @method sleep
         */
        sleep(): void;
        /**
         * Called every timestep to update internal sleep timer and change sleep state if needed.
         * @method sleepTick
         * @param {number} time The world time in seconds
         * @param {boolean} dontSleep
         * @param {number} dt
         */
        sleepTick(time: number, dontSleep: boolean, dt: number): void;
        getVelocityFromPosition(story: number[], dt: number): number[];
        getAngularVelocityFromPosition(timeStep: number): number;
        /**
         * Check if the body is overlapping another body. Note that this method only works if the body was added to a World and if at least one step was taken.
         * @method overlaps
         * @param  {Body} body
         * @return {boolean}
         */
        overlaps(body: Body): boolean;
    }

    export class Spring {

        constructor(bodyA: Body, bodyB: Body, options?: {

            stiffness?: number;
            damping?: number;
            localAnchorA?: number[];
            localAnchorB?: number[];
            worldAnchorA?: number[];
            worldAnchorB?: number[];

        });

        stiffness: number;
        damping: number;
        bodyA: Body;
        bodyB: Body;

        applyForce(): void;

    }

    export class LinearSpring extends Spring {

        localAnchorA: number[];
        localAnchorB: number[];
        restLength: number;

        setWorldAnchorA(worldAnchorA: number[]): void;
        setWorldAnchorB(worldAnchorB: number[]): void;
        getWorldAnchorA(result: number[]): number[];
        getWorldAnchorB(result: number[]): number[];
        applyForce(): void;

    }

    export class RotationalSpring extends Spring {

        constructor(bodyA: Body, bodyB: Body, options?: {
            restAngle?: number;
            stiffness?: number;
            damping?: number;
        });

        restAngle: number;

    }

    export class Capsule extends Shape {

        constructor(length?: number, radius?: number);

        length: number;
        radius: number;

    }

    export class Circle extends Shape {

        constructor(radius: number);

        /**
         * 半径
         * @property radius
         * @type {number}
         */
        radius: number;

    }

    export class Convex extends Shape {

        static triangleArea(a: number[], b: number[], c: number[]): number;

        constructor(vertices: number[][], axes: number[]);

        vertices: number[][];
        axes: number[];
        centerOfMass: number[];
        triangles: number[];
        boundingRadius: number;

        projectOntoLocalAxis(localAxis: number[], result: number[]): void;
        projectOntoWorldAxis(localAxis: number[], shapeOffset: number[], shapeAngle: number, result: number[]): void;

        updateCenterOfMass(): void;

    }

    export class Heightfield extends Shape {

        constructor(data: number[], options?: {
            minValue?: number;
            maxValue?: number;
            elementWidth: number;
        });

        data: number[];
        maxValue: number;
        minValue: number;
        elementWidth: number;

    }

    export class Shape {

        static idCounter: number;
        static CIRCLE: number;
        static PARTICLE: number;
        static PLANE: number;
        static CONVEX: number;
        static LINE: number;
        static RECTANGLE: number;
        static CAPSULE: number;
        static HEIGHTFIELD: number;

        constructor(type?: number);

        type: number;
        id: number;
        boundingRadius: number;
        collisionGroup: number;
        collisionMask: number;
        material: Material;
        area: number;
        sensor: boolean;

        computeMomentOfInertia(mass: number): number;
        updateBoundingRadius(): number;
        updateArea(): void;
        computeAABB(out: AABB, position: number[], angle: number): void;

    }

    export class Line extends Shape {

        constructor(length?: number);

        length: number;

    }

    export class Particle extends Shape {

    }

    export class Plane extends Shape {

    }

    export class Rectangle extends Shape {

        constructor(width?: number, height?: number);

        width: number;
        height: number;

    }

    export class Solver extends EventEmitter {

        static GS: number;
        static ISLAND: number;

        constructor(options?: {}, type?: number);

        type: number;
        equations: Equation[];
        equationSortFunction: Equation; //Equation | boolean

        solve(dy: number, world: World): void;
        solveIsland(dy: number, island: Island): void;
        sortEquations(): void;
        addEquation(eq: Equation): void;
        addEquations(eqs: Equation[]): void;
        removeEquation(eq: Equation): void;
        removeAllEquations(): void;

    }

    export class GSSolver extends Solver {

        constructor(options?: {
            iterations?: number;
            tolerance?: number;
        });

        iterations: number;
        tolerance: number;
        useZeroRHS: boolean;
        frictionIterations: number;
        usedIterations: number;

        solve(h: number, world: World): void;

    }

    export class OverlapKeeper {

        constructor(bodyA: Body, shapeA: Shape, bodyB: Body, shapeB: Shape);

        shapeA: Shape;
        shapeB: Shape;
        bodyA: Body;
        bodyB: Body;

        tick(): void;
        setOverlapping(bodyA: Body, shapeA: Shape, bodyB: Body, shapeB: Body): void;
        bodiesAreOverlapping(bodyA: Body, bodyB: Body): boolean;
        set(bodyA: Body, shapeA: Shape, bodyB: Body, shapeB: Shape): void;

    }

    export class TupleDictionary {

        data: number[];
        keys: number[];

        getKey(id1: number, id2: number): string;
        getByKey(key: number): number;
        get(i: number, j: number): number;
        set(i: number, j: number, value: number): number;
        reset(): void;
        copy(dict: TupleDictionary): void;

    }

    export class Utils {

        static appendArray<T>(a: Array<T>, b: Array<T>): Array<T>;
        static splice<T>(array: Array<T>, index: number, howMany: number): void;
        static extend(a: any, b: any): void;
        static defaults(options: any, defaults: any): any;

    }

    export class Island {

        equations: Equation[];
        bodies: Body[];

        reset(): void;
        getBodies(result: any): Body[];
        wantsToSleep(): boolean;
        sleep(): boolean;

    }

    export class IslandManager extends Solver {

        static getUnvisitedNode(nodes: Node[]): IslandNode; // IslandNode | boolean

        equations: Equation[];
        islands: Island[];
        nodes: IslandNode[];

        visit(node: IslandNode, bds: Body[], eqs: Equation[]): void;
        bfs(root: IslandNode, bds: Body[], eqs: Equation[]): void;
        split(world: World): Island[];

    }

    export class IslandNode {

        constructor(body: Body);

        body: Body;
        neighbors: IslandNode[];
        equations: Equation[];
        visited: boolean;

        reset(): void;

    }

    /**
     * world，包含所有刚体
     *
     * @class World
     * @constructor
     * @param {Object}          [options]
     * @param {Solver}          [options.solver]            默认值 GSSolver.
     * @param {Array}           [options.gravity]           默认值 [0,-9.78]
     * @param {Broadphase}      [options.broadphase]        默认值 NaiveBroadphase
     * @param {Boolean}         [options.islandSplit=false]
     * @param {Boolean}         [options.doProfiling=false]
     * @extends EventEmitter
     *
     * @example
     *     var world = new World({
     *         gravity: [0, -9.81],
     *         broadphase: new SAPBroadphase()
     *     });
     */
    export class World extends EventEmitter {

        /**
         * step() 执行之后调用
         * @event postStep
         */
        postStepEvent: {
            type: string;
        };

        /**
         * Body 加入时调用
         * @event addBody
         * @param {Body} body
         */
        addBodyEvent: {
            type: string;
        };

        /**
         * Body移除时调用
         * @event removeBody
         * @param {Body} body
         */
        removeBodyEvent: {
            type: string;
        };

        /**
         * Spring 加入时调用
         * @event addSpring
         * @param {Spring} spring
         */
        addSpringEvent: {
            type: string;
        };

        /**
         * 当两个刚体第一次碰撞时调用。调用时碰撞步骤已经完成
         * @event impact
         * @param {Body} bodyA
         * @param {Body} bodyB
         */
        impactEvent: {
            type: string;
            bodyA: Body;
            bodyB: Body;
            shapeA: Shape;
            shapeB: Shape;
            contactEquation: ContactEquation;
        };

        /**
         * 当 Broadphase 手机对碰之后被调用
         * @event postBroadphase
         * @param {Array} 对碰数组
         */
        postBroadphaseEvent: {
            type: string;
            pairs: Body[];
        };

        /**
         * 当两个形状重叠时调用
         * @event beginContact
         * @param {Shape} shapeA
         * @param {Shape} shapeB
         * @param {Body}  bodyA
         * @param {Body}  bodyB
         * @param {Array} contactEquations
         */
        beginContactEvent: {
            type: string;
            shapeA: Shape;
            shapeB: Shape;
            bodyA: Body;
            bodyB: Body;
            contactEquations: ContactEquation[];
        };

        /**
         * 当两个形状停止重叠时调用
         * @event endContact
         * @param {Shape} shapeA
         * @param {Shape} shapeB
         * @param {Body}  bodyA
         * @param {Body}  bodyB
         * @param {Array} contactEquations
         */
        endContactEvent: {
            type: string;
            shapeA: Shape;
            shapeB: Shape;
            bodyA: Body;
            bodyB: Body;
        };

        /**
         * Fired just before equations are added to the solver to be solved. Can be used to control what equations goes into the solver.
         * @event preSolve
         * @param {Array} contactEquations  An array of contacts to be solved.
         * @param {Array} frictionEquations An array of friction equations to be solved.
         */
        preSolveEvent: {
            type: string;
            contactEquations: ContactEquation[];
            frictionEquations: FrictionEquation[];
        };

        /**
         * 从不让刚体睡眠
         * @static
         * @property {number} NO_SLEEPING
         */
        static NO_SLEEPING: number;
        /**
         * 刚体睡眠
         * @static
         * @property {number} BODY_SLEEPING
         */
        static BODY_SLEEPING: number;
        /**
         * 取消激活在接触中的刚体，如果所有刚体都接近睡眠。必须设置 World.islandSplit
         * @static
         * @property {number} ISLAND_SLEEPING
         */
        static ISLAND_SLEEPING: number;

        constructor(options?: {
            solver?: Solver;
            gravity?: number[];
            broadphase?: Broadphase;
            islandSplit?: boolean;
            doProfiling?: boolean;
        });

        /**
         * 所有 Spring
         * @property springs
         * @type {Array}
         */
        springs: Spring[];
        /**
         * 所有 Body
         * @property {Array} bodies
         */
        bodies: Body[];
        /**
         * 所使用的求解器，以满足约束条件和接触。 默认值是 GSSolver
         * @property {Solver} solver
         */
        solver: Solver;
        /**
         * @property narrowphase
         * @type {Narrowphase}
         */
        narrowphase: Narrowphase;
        /**
         * The island manager of this world.
         * @property {IslandManager} islandManager
         */
        islandManager: IslandManager;
        /**
         * 重力。在每个 step() 开始对所有刚体生效
         *
         * @property gravity
         * @type {Array}
         */
        gravity: number[];
        /**
         * 重力摩擦
         * @property {Number} frictionGravity
         */
        frictionGravity: number;
        /**
         * 设置为true，frictionGravity 会被自动设置为 gravity 长度.
         * @property {Boolean} useWorldGravityAsFrictionGravity
         */
        useWorldGravityAsFrictionGravity: boolean;
        /**
         * @property broadphase
         * @type {Broadphase}
         */
        broadphase: Broadphase;
        /**
         * 用户添加限制
         *
         * @property constraints
         * @type {Array}
         */
        constraints: Constraint[];
        /**
         * 默认材料，defaultContactMaterial 时使用
         * @property {Material} defaultMaterial
         */
        defaultMaterial: Material;
        /**
         * 使用的默认接触材料，如果没有接触材料被设置为碰撞的材料
         * @property {ContactMaterial} defaultContactMaterial
         */
        defaultContactMaterial: ContactMaterial;
        /**
         * 设置自动使用弹簧力
         * @property applySpringForces
         * @type {Boolean}
         */
        applySpringForces: boolean;
        /**
         * 设置自动使用阻尼
         * @property applyDamping
         * @type {Boolean}
         */
        applyDamping: boolean;
        /**
         * 设置自动使用重力
         * @property applyGravity
         * @type {Boolean}
         */
        applyGravity: boolean;
        /**
         * 使用约束求解
         * @property solveConstraints
         * @type {Boolean}
         */
        solveConstraints: boolean;
        /**
         * 接触材料
         * @property contactMaterials
         * @type {Array}
         */
        contactMaterials: ContactMaterial[];
        /**
         * 世界时间
         * @property time
         * @type {Number}
         */
        time: number;
        /**
         * 是否正在 step 阶段
         * @property {Boolean} stepping
         */
        stepping: boolean;
        /**
         * 是否启用岛内分裂
         * @property {Boolean} islandSplit
         */
        islandSplit: boolean;
        /**
         * 设置为true，world会派发 impact 事件，关闭可以提高性能
         * @property emitImpactEvent
         * @type {Boolean}
         */
        emitImpactEvent: boolean;
        /**
         * 刚体睡眠策略。取值是 World.NO_SLEEPING，World.BODY_SLEEPING，World.ISLAND_SLEEPING 之一
         * @property sleepMode
         * @type {number}
         * @default World.NO_SLEEPING
         */
        sleepMode: number;

        /**
         * 添加约束
         * @method addConstraint
         * @param {Constraint} c
         */
        addConstraint(c: Constraint): void;
        /**
         * 添加触点材料
         * @method addContactMaterial
         * @param {ContactMaterial} contactMaterial
         */
        addContactMaterial(contactMaterial: ContactMaterial): void;
        /**
         * 移除触点材料
         * @method removeContactMaterial
         * @param {ContactMaterial} cm
         */
        removeContactMaterial(cm: ContactMaterial): void;
        /**
         * 通过2个材料获得触点材料
         * @method getContactMaterial
         * @param {Material} materialA
         * @param {Material} materialB
         * @return {ContactMaterial} 获得的触点材料或者false
         */
        getContactMaterial(materialA: Material, materialB: Material): ContactMaterial;
        /**
         * 移除约束
         * @method removeConstraint
         * @param {Constraint} c
         */
        removeConstraint(c: Constraint): void;
        /**
         * 使物理系统向前经过一定时间
         *
         * @method step
         * @param {Number} dt                       时长
         * @param {Number} [timeSinceLastCalled=0]
         * @param {Number} [maxSubSteps=10]
         *
         * @example
         *     var world = new World();
         *     world.step(0.01);
         */
        step(dt: number, timeSinceLastCalled?: number, maxSubSteps?: number): void;
        /**
         * 添加一个 Spring
         *
         * @method addSpring
         * @param {Spring} s
         */
        addSpring(s: Spring): void;
        /**
         * 移除一个 Spring
         *
         * @method removeSpring
         * @param {Spring} s
         */
        removeSpring(s: Spring): void;
        /**
         * 添加一个 Body
         *
         * @method addBody
         * @param {Body} body
         *
         * @example
         *     var world = new World(),
         *         body = new Body();
         *     world.addBody(body);
         */
        addBody(body: Body): void;
        /**
         * 移除一个 Body。如果在 step()阶段调用，将会在阶段之后移除
         *
         * @method removeBody
         * @param {Body} body
         */
        removeBody(body: Body): void;
        /**
         * 通过id获取一个 Body
         * @method getBodyById
         * @return {Body|Boolean} 得到的刚体或者false
         */
        getBodyByID(id: number): Body;
        /**
         * 两个刚体之间禁用碰撞
         * @method disableCollision
         * @param {Body} bodyA
         * @param {Body} bodyB
         */
        disableBodyCollision(bodyA: Body, bodyB: Body): void;
        /**
         * 两个刚体之间启用碰撞
         * @method enableCollision
         * @param {Body} bodyA
         * @param {Body} bodyB
         */
        enableBodyCollision(bodyA: Body, bodyB: Body): void;
        /**
         * 重置 world
         * @method clear
         */
        clear(): void;
        /**
         * 获得克隆
         * @method clone
         * @return {World}
         */
        clone(): World;
    }

}