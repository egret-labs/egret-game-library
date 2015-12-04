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

        containsPoint(point: number[]): boolean;
        setFromPoints(points: number[][], position: number[], angle: number, skinSize: number): void;
        copy(aabb: AABB): void;
        extend(aabb: AABB): void;
        overlaps(aabb: AABB): boolean;
        overlapsRay(ray:Ray): number;

    }

    export class Broadphase {

        static AABB: number;
        static BOUNDING_CIRCLE: number;

        static boundingRadiusCheck(bodyA: Body, bodyB: Body): boolean;
        static aabbCheck(bodyA: Body, bodyB: Body): boolean;
        static canCollide(bodyA: Body, bodyB: Body): boolean;

        constructor(type: number);

        result: Body[];
        world: World;
        boundingVolumeType: number;

        setWorld(world: World): void;
        getCollisionPairs(world: World): Body[];
        boundingVolumeCheck(bodyA: Body, bodyB: Body): boolean;

    }

    export class NaiveBroadphase extends Broadphase {

        aabbQuery(world: World, aabb: AABB, result: Body[]): Body[];

    }

    export class Narrowphase {

        static findSeparatingAxis(c1:Convex, offset1:number[], angle1:number, c2:Convex, offset2:number[], angle2:number, sepAxis:number[]): boolean;
        static getClosestEdge(c:Convex, angle:number, axis:number[], flip:boolean): number;
        static projectConvexOntoAxis(convexShape:Convex, convexOffset:number[], convexAngle:number, worldAxis:number[], result:number[]): void;


        contactEquationPool: ContactEquationPool;
        contactEquations: ContactEquation[];
        contactSkinSize: number;
        enabledEquations: boolean;
        enableFriction: boolean;
        frictionCoefficient: number;
        frictionEquationPool: FrictionEquationPool;
        frictionEquations: FrictionEquation[];
        frictionRelaxation: number;
        frictionStiffness: number;
        restitution: number;
        slipForce: number;
        stiffness: number;
        surfaceVelocity: number;
        //官方不赞成使用的属性
        enableFrictionReduction: boolean;


        bodiesOverlap(bodyA: Body, bodyB: Body): boolean;
        capsuleCapsule(bi: Body, si: Capsule, xi: number[], ai: number, bj: Body, sj: Capsule, xj: number[], aj: number): void;
        circleCapsule(bi: Body, si: Circle, xi: number[], ai: number, bj: Body, sj: Line, xj: number[], aj: number): void;
        circleCircle(bodyA: Body, shapeA: Circle, offsetA: number[], angleA: number, bodyB: Body, shapeB: Circle, offsetB: number[], angleB: number, justTest: boolean, radiusA?:number, radiusB?:number): void;
        circleConvex(circleBody:Body, circleShape:Circle, circleOffset:number[], circleAngle:number, convexBody:Body, convexShape:Convex, convexOffset:number[], convexAngle:number, justTest:boolean, circleRadius:number): void;
        circleHeightfield(bi:Body, si:Circle, xi:number[], bj:Body, sj:Heightfield, xj:number[], aj:number): void;
        circleLine(circleBody:Body, circleShape:Circle, circleOffset:number[], circleAngle:number, lineBody:Body, lineShape:Line, lineOffset:number[], lineAngle:number, justTest:boolean, lineRadius:number, circleRadius:number): void;
        circleParticle(circleBody:Body, circleShape:Circle, circleOffset:number[], circleAngle:number, particleBody:Body, particleShape:Particle, particleOffset:number[], particleAngle:number, justTest:boolean): void;
        circlePlane(bi:Body, si:Circle, xi:number[], bj:Body, sj:Plane, xj:number[], aj:number): void;
        collidedLastStep(bodyA: Body, bodyB: Body): boolean;
        convexCapsule(convexBody:Body, convexShape:Convex, convexPosition:number[], convexAngle:number, capsuleBody:Body, capsuleShape:Capsule, capsulePosition:number[], capsuleAngle:number): void;
        convexConvex(bi:Body, si:Convex, xi:number[], ai:number, bj:Body, sj:Convex, xj:number[], aj:number): void;
        convexLine(convexBody:Body, convexShape:Convex, convexOffset:number[], convexAngle:number, lineBody:Body, lineShape:Line, lineOffset:number[], lineAngle:number, justTest:boolean): void;
        createContactEquation(bodyA: Body, bodyB: Body): ContactEquation;
        createFrictionEquation(bodyA: Body,bodyB: Body): FrictionEquation;
        createFrictionFromContact(contactEquation: ContactEquation): FrictionEquation;
        lineBox(lineBody:Body, lineShape:Line, lineOffset:number[], lineAngle:number, boxBody:Body, boxShape:Box, boxOffset:number[], boxAngle:number, justTest:boolean): void;
        lineCapsule(lineBody:Body, lineShape:Line, linePosition:number[], lineAngle:number, capsuleBody:Body, capsuleShape:Capsule, capsulePosition:number[], capsuleAngle:number): void;
        lineLine(bodyA:Body, shapeA:Line, positionA:number[], angleA:number, bodyB:Body, shapeB:Line, positionB:number[], angleB:number): void;
        particleConvex(particleBody:Body, particleShape:Particle, particleOffset:number[], particleAngle:number, convexBody:Body, convexShape:Convex, convexOffset:number[], convexAngle:number, justTest:boolean): void;
        particlePlane(particleBody:Body, particleShape:Particle, particleOffset:number[], particleAngle:number, planeBody:Body, planeShape:Plane, planeOffset:number[], planeAngle:number, justTest:boolean): void;
        planeCapsule(planeBody:Body, planeShape:Circle, planeOffset:number[], planeAngle:number, capsuleBody:Body, capsuleShape:Particle, capsuleOffset:number[], capsuleAngle:number, justTest:boolean): void;
        planeConvex(planeBody:Body, planeShape:Plane, planeOffset:number[], planeAngle:number, convexBody:Body, convexShape:Convex, convexOffset:number[], convexAngle:number, justTest:boolean): void;
        planeLine(planeBody:Body, planeShape:Plane, planeOffset:number[], planeAngle:number, lineBody:Body, lineShape:Line, lineOffset:number[], lineAngle:number): void;
        reset(): void;
    }

    export class SAPBroadphase extends Broadphase {

        axisIndex: number;
        axisList: Body[];

        aabbQuery(world: World, aabb: AABB, result: Body[]): Body[];
        sortAxisList(a: Body[], axisIndex: number): Body[];

    }

    export class Constraint {

        static DISTANCE: number;
        static GEAR: number;
        static LOCK: number;
        static PRISMATIC: number;
        static REVOLUTE: number;

        constructor(bodyA: Body, bodyB: Body, type: number, options?: {
            collideConnected?: boolean;
        });

        type: number;
        equations: Equation[];
        bodyA: Body;
        bodyB: Body;
        collideConnected: boolean;

        update(): void;
        setStiffness(stiffness: number): void;
        setRelaxation(relaxation: number): void;

    }

    export class DistanceConstraint extends Constraint {

        constructor(bodyA: Body, bodyB: Body, options?: {
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

        setMaxForce(maxForce: number): void;
        getMaxForce(): number;

    }

    export class GearConstraint extends Constraint {

        constructor(bodyA: Body, bodyB: Body, options?: {
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
            localOffsetB?: number[];
            localAngleB?: number;
            maxForce?: number;
        });

        localAngleB: number;
        localOffsetB: number[];

        setMaxForce(force: number): void;
        getMaxForce(): number;

    }

    export class PrismaticConstraint extends Constraint {

        constructor(bodyA: Body, bodyB: Body, options?: {
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
        lowerLimit: number;
        lowerLimitEnabled: boolean;
        motorEnabled: boolean;
        motorEquation: Equation;
        motorSpeed: number;
        position: number;
        upperLimit: number;
        upperLimitEnabled: boolean;

        disableMotor(): void;
        enableMotor(): void;
        setLimits(lower: number, upper: number): void;

    }

    export class RevoluteConstraint extends Constraint {

        constructor(bodyA: Body, bodyB: Body, options?: {
            worldPivot?: number[];
            localPivotA?: number[];
            localPivotB?: number[];
            maxForce?: number;
        });

        angle: number;
        lowerLimit: number;
        lowerLimitEnabled: boolean;
        motorEnabled: boolean;
        pivotA: number[];
        pivotB: number[];
        upperLimit: number;
        upperLimitEnabled: boolean;

        disableMotor(): void;
        enableMotor(): void;
        getMotorSpeed(): number;
        //官方不赞成使用了
        motorIsEnabled(): boolean;
        setLimits(lower: number, upper: number): void;
        setMotorSpeed(speed: number): void;

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
        contactPointB: number[];
        normalA: number[];
        restitution: number;
        firstImpact: boolean;
        shapeA: Shape;
        shapeB: Shape;

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
        needsUpdate: boolean;
        multiplier: number;
        relativeVelocity: number;
        enabled: boolean;

        gmult(): number;
        computeB(): number;
        computeGq(): number;
        computeGW(): number;
        computeGWlambda(): number;
        computeGiMf(): number;
        computeGiMGt(): number;
        addToWlambda(deltalambda: number): void;
        computeInvC(eps: number): number;
        update(): void;

    }

    export class FrictionEquation extends Equation {

        constructor(bodyA: Body, bodyB: Body, slipForce: number);

        contactEquations: ContactEquation;
        contactPointA: number[];
        contactPointB: number[];
        t: number[];
        shapeA: Shape;
        shapeB: Shape;
        frictionCoefficient: number;

        setSlipForce(slipForce: number): void;
        getSlipForce(): number;

    }

    export class RotationalLockEquation extends Equation {

        constructor(bodyA: Body, bodyB: Body, options?: {
            angle?: number;
        });

        angle: number;

    }

    export class RotationalVelocityEquation extends Equation {

        constructor(bodyA: Body, bodyB: Body);

    }

    export class EventEmitter {

        on(type: string, listener: Function, context?: any): EventEmitter;
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

        constructor(id: number);

        id: number;

    }

    export class vec2 {

        static add(out: number[], a: number[], b: number[]): number[];
        static centroid(out: number[], a: number[], b: number[], c: number[]): number[];
        static clone(a: number[]): number[];
        static copy(out: number[], a: number[]): number[];
        static create(): number[];
        static crossLength(a: number[], b: number[]): number;
        static crossVZ(out: number[], vec: number[], zcomp: number): number;
        static crossZV(out: number[], zcomp: number, vec: number[]): number;
        static dist(a: number[], b: number[]): number;
        static distance(a: number[], b: number[]): number;
        static div(out: number[], a: number[], b: number[]): number[];
        static divide(out: number[], a: number[], b: number[]): number[];
        static dot(a: number[], b: number[]): number;
        static fromValues(x: number, y: number): number[];
        static getLineSegmentsIntersection(out: number[], p0: number[], p1: number[], p2: number[], p3: number[]): boolean;
        static getLineSegmentsIntersectionFraction(p0: number[], p1: number[], p2: number[], p3: number[]): number;
        static len(a: number[]): number;
        static length(a: number[]): number;
        static lerp(out: number[], a: number[], b: number[], t: number): void;
        static mul(out: number[], a: number[], b: number[]): number[];
        static multiply(out: number[], a: number[], b: number[]): number[];
        static negate(out: number[], a: number[]): number[];
        static normalize(out: number[], a: number[]): number[];
        static reflect(out: number[], vector: number[], normal: number[]): void;
        static rotate(out: number[], a: number[], angle: number): void;
        static rotate90cw(out: number[], a: number[]): void;
        static scale(out: number[], a: number[], b: number): number[];
        static set(out: number[], x: number, y: number): number[];
        static sqrDist(a: number[], b: number[]): number;
        static squaredDistance(a: number[], b: number[]): number;
        static sqrLen(a: number[]): number;
        static squaredLength(a: number[]): number;
        static str(vec: number[]): string;
        static sub(out: number[], a: number[], b: number[]): number[];
        static subtract(out: number[], a: number[], b: number[]): number[];
        static toGlobalFrame(out: number[], localPoint: number[], framePosition: number[], frameAngle: number): void;
        static toLocalFrame(out: number[], worldPoint: number[], framePosition: number[], frameAngle: number): void;
        static vectorToLocalFrame(out: number[], worldVector: number[], frameAngle: number): void;

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
     * @param {Array}               [options.force]
     * @param {Array}               [options.position]
     * @param {Array}               [options.velocity]
     * @param {Boolean}             [options.allowSleep]
     * @param {Boolean}             [options.collisionResponse]
     * @param {Number}              [options.angle=0]
     * @param {Number}              [options.angularForce=0]
     * @param {Number}              [options.angularVelocity=0]
     * @param {Number}              [options.ccdIterations=10]
     * @param {Number}              [options.ccdSpeedThreshold=-1]
     * @param {Number}              [options.fixedRotation=false]
     * @param {Number}              [options.gravityScale]
     * @param {Number}              [options.id]
     * @param {Number}              [options.mass=0]    一个大于0的数字。如果设置成0，其type属性将被设置为 Body.STATIC.
     * @param {Number}              [options.sleepSpeedLimit]
     * @param {Number}              [options.sleepTimeLimit]
     * @param {Object}              [options]
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
     *     body.addShape(new Circle({ radius: 1 }));
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
         * The angular velocity of the body, in radians per second.
         * @property angularVelocity
         * @type {number}
         */
        angularVelocity: number;
        /**
         * The inverse inertia of the body.
         * @property invInertia
         * @type {number}
         */
        invInertia: number;
        /**
         * The inverse mass of the body.
         * @property invMass
         * @type {number}
         */
        invMass: number;
        /**
         * The previous angle of the body.
         * @property previousAngle
         * @type {number}
         */
        previousAngle: number;
        /**
         * The previous position of the body.
         * @property previousPosition
         * @type {Array}
         */
        previousPosition: number[];
        /**
         * Constraint velocity that was added to the body during the last step.
         * @property vlambda
         * @type {Array}
         */
        vlambda: number[];
        /**
         * Angular constraint velocity that was added to the body during last step.
         * @property wlambda
         * @type {Array}
         */
        wlambda: number[];

        /**
         * The number of iterations that should be used when searching for the time of impact during CCD. A larger number will assure that there's a small penetration on CCD collision, but a small number will give more performance.
         * @property {Number} ccdIterations
         * @default 10
         */
        ccdIterations: number;
        /**
         * If the body speed exceeds this threshold, CCD (continuous collision detection) will be enabled. Set it to a negative number to disable CCD completely for this body.
         * @property {Number} ccdSpeedThreshold
         * @default -1
         */
        ccdSpeedThreshold: number;
        /**
         * Whether to produce contact forces when in contact with other bodies. Note that contacts will be generated, but they will be disabled. That means that this body will move through other bodies, but it will still trigger contact events, etc.
         * @property collisionResponse
         * @type {Boolean}
         */
        collisionResponse: boolean;
        /**
         * Set to true if you want to fix the body movement along the X axis. The body will still be able to move along Y.
         * @property fixedX
         * @type {Boolean}
         */
        fixedX: boolean;
        /**
         * Set to true if you want to fix the body movement along the Y axis. The body will still be able to move along X.
         * @property fixedY
         * @type {Boolean}
         */
        fixedY: boolean;
        /**
         * How long the body has been sleeping.
         * @property idleTime
         * @type {Number}
         */
        idleTime: number;

        /**
         * 与每个形状对应的显示对象
         */
        displays: egret.DisplayObject[];

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
         * @param {Array} relativePoint 以物体中心点为基准的点
         */
        applyForce(force: number[], relativePoint: number[]): void;
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
        /**
         * Check if the body is overlapping another body. Note that this method only works if the body was added to a World and if at least one step was taken.
         * @method overlaps
         * @param  {Body} body
         * @return {boolean}
         */
        overlaps(body: Body): boolean;


        /**
         * Moves the shape offsets so their center of mass becomes the body center of mass.
         * @method adjustCenterOfMass
         */
        adjustCenterOfMass(): void;

        /**
         * Apply damping.
         * @method applyDamping
         * @param  {number} dt Current time step
         */
        applyDamping(dt: number): void;

        /**
         * Reads a polygon shape path, and assembles convex shapes from that and puts them at proper offset points.
         * @method fromPolygon
         * @param {Array} path An array of 2d vectors, e.g. [[0,0],[0,1],...] that resembles a concave or convex polygon. The shape must be simple and without holes.
         * @param {Object} [options]
         * @param {Boolean} [options.optimalDecomp=false]   Set to true if you need optimal decomposition. Warning: very slow for polygons with more than 10 vertices.
         * @param {Boolean} [options.skipSimpleCheck=false] Set to true if you already know that the path is not intersecting itself.
         * @param {Boolean|Number} [options.removeCollinearPoints=false] Set to a number (angle threshold value) to remove collinear points, or false to keep all points.
         * @return {Boolean} True on success, else false.
         */
        fromPolygon(path:number[][], options?: {
            optimalDecomp?: boolean;
            skipSimpleCheck?: boolean;
            removeCollinearPoints?: boolean;  // Boolean | Number
        }): boolean;

        /**
         * Sets the force on the body to zero.
         * @method setZeroForce
         */
        setZeroForce(): void;

        /**
         * Transform a world point to local body frame.
         * @method toLocalFrame
         * @param  {Array} out          The vector to store the result in
         * @param  {Array} worldPoint   The input world point
         */
        toLocalFrame(out: number[], worldPoint: number[]): void;

        /**
         * Transform a local point to world frame.
         * @method toWorldFrame
         * @param  {Array} out          The vector to store the result in
         * @param  {Array} localPoint   The input local point
         */
        toWorldFrame(out: number[], localPoint: number[]): void;

        /**
         * Apply force to a body-local point.
         * @method applyForceLocal
         * @param  {Array} localForce The force vector to add, oriented in local body space.
         * @param  {Array} localPoint A point relative to the body in world space. If not given, it is set to zero and all of the impulse will be excerted on the center of mass.
         */
        applyForceLocal(localForce: number[], localPoint: number[]): void;

        /**
         * Apply impulse to a point relative to the body. This could for example be a point on the Body surface. An impulse is a force added to a body during a short period of time (impulse = force * time). Impulses will be added to Body.velocity and Body.angularVelocity.
         * @method applyImpulse
         * @param  {Array} impulse The impulse vector to add, oriented in world space.
         * @param  {Array} relativePoint A point relative to the body in world space. If not given, it is set to zero and all of the impulse will be excerted on the center of mass.
         */
        applyImpulse(impulse: number[], relativePoint: number[]): void;

        /**
         * Apply impulse to a point relative to the body. This could for example be a point on the Body surface. An impulse is a force added to a body during a short period of time (impulse = force * time). Impulses will be added to Body.velocity and Body.angularVelocity.
         * @method applyImpulseLocal
         * @param  {Array} impulse The impulse vector to add, oriented in world space.
         * @param  {Array} relativePoint A point relative to the body in world space. If not given, it is set to zero and all of the impulse will be excerted on the center of mass.
         */
        applyImpulseLocal(impulse: number[], relativePoint: number[]): void;

        /**
         * Get velocity of a point in the body.
         * @method getVelocityAtPoint
         * @param  {Array} result A vector to store the result in
         * @param  {Array} relativePoint A world oriented vector, indicating the position of the point to get the velocity from
         * @return {Array}
         */
        getVelocityAtPoint(result: number[], relativePoint: number[]): number[];

        /**
         * Move the body forward in time given its current velocity.
         * @method integrate
         * @param  {number} dt
         */
        integrate(dt: number): void;

        /**
         * Transform a world point to local body frame.
         * @method vectorToLocalFrame
         * @param  {Array} out The vector to store the result in
         * @param  {Array} worldVector The input world vector
         */
        vectorToLocalFrame(out: number[], worldVector: number[]): void;

        /**
         * Transform a local point to world frame.
         * @method vectorToWorldFrame
         * @param  {Array} out The vector to store the result in
         * @param  {Array} localVector The input local vector
         */
        vectorToWorldFrame(out: number[], localVector: number[]): void;

    }

    /**
     * Box shape class.
     *
     * @class Box
     * @constructor
     * @extends Convex
     * @param {Object}              [options]        (Note that this options object will be passed on to the Shape constructor.)
     * @param {Number}              [options.width=1]        Total width of the box
     * @param {Number}              [options.height=1]        Total height of the box
     */
    export class Box extends Convex {

        constructor(options?: Object);

        width: number;
        height: number;
    }

    export class Pool {

        objects: any[];

        get(): Object;
        release(object: Object): Pool;
        resize(size: number): Pool;

    }


    export class OverlapKeeperRecordPool extends Pool {

    }

    export class IslandPool extends Pool {

    }

    export class IslandNodePool extends Pool {

    }

    export class ContactEquationPool extends Pool {

    }

    export class FrictionEquationPool extends Pool {

    }

    export class Ray {

        static ALL: number;
        static ANY: number;
        static CLOSEST: number;

        constructor(options?: {
            from?: number[];
            to?: number[];
            checkCollisionResponse?: boolean;
            skipBackfaces?: boolean;
            collisionMask?: number;
            collisionGroup?: number;
            mode?: number;
            callback?: number;
        });

        callback: Function;
        checkCollisionResponse: boolean;
        collisionGroup: number;
        collisionMask: number;
        direction: number[];
        from: number[];
        length: number;
        mode: number;
        skipBackfaces: boolean;
        to: number[];

        getAABB(aabb: AABB): void;
        intersectBodies(bodies: Body[]): void;
        update(): void;

    }

    export class RaycastResult {

        body: Body;
        faceIndex: number;
        fraction: number;
        isStopped: boolean;
        normal: number[];
        shape: Shape;

        getHitDistance(ray: Ray): void;
        getHitPoint(out:number[], ray: Ray): void;
        hasHit():boolean;
        reset(): void;
        stop(): void;

    }

    export class TopDownVehicle {

        constructor(chassisBody: Body, options?: Object);

        chassisBody: Body;
        wheels: WheelConstraint[];

        addToWorld(world: World): void;
        addWheel(wheelOptions?: Object): WheelConstraint;
        removeFromWorld(world: World): void;
        update(): void;

    }

    export class WheelConstraint extends Constraint {

        constructor(vehicle: TopDownVehicle, options?: {
            localForwardVector?: number[];
            localPosition?: number[];
            sideFriction?: number;
        });

        engineForce: number;
        localForwardVector: number[];
        localPosition: number[];
        steerValue: number;

        getSpeed(): number;
        update(): void;

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

        bodyA: Body;
        bodyB: Body;
        damping: number;
        stiffness: number;

        applyForce(): void;

    }

    export class LinearSpring extends Spring {

        constructor(bodyA: Body, bodyB: Body, options?: {
            restLength?: number;
            stiffness?: number;
            damping?: number;
            worldAnchorA?: number[];
            worldAnchorB?: number[];
            localAnchorA?: number[];
            localAnchorB?: number[];

        });

        localAnchorA: number[];
        localAnchorB: number[];
        restLength: number;

        setWorldAnchorA(worldAnchorA: number[]): void;
        setWorldAnchorB(worldAnchorB: number[]): void;
        getWorldAnchorA(result: number[]): void;
        getWorldAnchorB(result: number[]): void;

    }

    export class RotationalSpring extends Spring {

        constructor(bodyA: Body, bodyB: Body, options?: {
            restAngle?: number;
            stiffness?: number;
            damping?: number;
        });

        restAngle: number;

    }

    /**
     * Capsule shape class.
     *
     * @class Capsule
     * @constructor
     * @extends Shape
     * @param {Object}              [options]        (Note that this options object will be passed on to the Shape constructor.)
     * @param {Number}              [options.length=1]        The distance between the end points
     * @param {Number}              [options.radius=1]        Radius of the capsule
     */
    export class Capsule extends Shape {

        constructor(options?: Object);

        length: number;
        radius: number;

        conputeMomentOfInertia(mass: number): number;

    }

    /**
     * Circle shape class.
     *
     * @class Circle
     * @constructor
     * @extends Shape
     * @param {Object}              [options]        (Note that this options object will be passed on to the Shape constructor.)
     * @param {Number}              [options.radius=1]        The radius of this circle
     * @example
     *     var circleShape = new Circle({ radius: 1 });
     *     body.addShape(circleShape);
     */
    export class Circle extends Shape {

        constructor(options?: Object);

        /**
         * 半径
         * @property radius
         * @type {number}
         */
        radius: number;

    }

    /**
     * Convex shape class.
     *
     * @class Convex
     * @constructor
     * @extends Shape
     * @param {Object}              [options]        (Note that this options object will be passed on to the Shape constructor.)
     * @param {Array}              [options.vertices]        An array of vertices that span this shape. Vertices are given in counter-clockwise (CCW) direction.
     * @param {Array}              [options.axes]        An array of unit length vectors, representing the symmetry axes in the convex.
     * @example
     *     var vertices = [[-1,-1], [1,-1], [1,1], [-1,1]];
     *     var convexShape = new Convex({ vertices: vertices });
     *     body.addShape(convexShape);
     */
    export class Convex extends Shape {

        static projectOntoAxis(offset: number[], localAxis: number[], result: number[]): void;
        static triangleArea(a: number[], b: number[], c: number[]): number;

        constructor(options?: Object);

        vertices: number[][];
        axes: number[];
        centerOfMass: number[];
        triangles: number[];

        updateCenterOfMass(): void;
        updateTriangles(): void;

    }

    export class Heightfield extends Shape {

        constructor(options?: {
            heights?: number[];
            minValue?: number;
            maxValue?: number;
            elementWidth?: number;
        });

        heights: number[];
        maxValue: number;
        minValue: number;
        elementWidth: number;

        getLineSegment(start:number[], end:number[], i:number): void;
        updateMaxMinValues(): void;

    }

    export class Shape {

        static BOX: number;
        static CAPSULE: number;
        static CIRCLE: number;
        static CONVEX: number;
        static HEIGHTFIELD: number;
        static LINE: number;
        static PARTICLE: number;
        static PLANE: number;

        constructor(options?:  {
            position?: number[];
            angle?: number;
            collisionGroup?: number;
            collisionMask?: number;
            sensor?: boolean;
            collisionResponse?: boolean;
            type?: number;
        });

        angle: number;
        area: number;
        body: Body;
        boundingRadius: number;
        collisionGroup: number;
        collisionMask: number;
        collisionResponse: boolean;
        id: number;
        material: Material;
        position: number[];
        sensor: boolean;
        type: number;

        computeAABB(out: AABB, position: number[], angle: number): void;
        computeMomentOfInertia(mass: number): number;
        raycast(result: RaycastResult, ray: Ray, position: number[], angle: number): void;
        updateArea(): void;
        updateBoundingRadius(): number;

    }

    export class Line extends Shape {

        constructor(options?: {
            length?: number;
        });

        length: number;

    }

    export class Particle extends Shape {

    }

    export class Plane extends Shape {

    }

    export class Solver extends EventEmitter {

        constructor();

        equations: Equation[];
        equationSortFunction: Function; //Function | boolean

        addEquation(eq: Equation): void;
        addEquations(eqs: Equation[]): void;
        removeAllEquations(): void;
        removeEquation(eq: Equation): void;
        solve(dt: number, world: World): void;
        solveIsland(dt: number, island: Island): void;
        sortEquations(): void;

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

        constructor();

        recordPool: OverlapKeeperRecordPool;

        tick(): void;
        setOverlapping(bodyA: Body, shapeA: Body, bodyB: Body, shapeB: Body): void;
        bodiesAreOverlapping(bodyA: Body, bodyB: Body): boolean;

    }

    export class OverlapKeeperRecord {

        constructor(bodyA: Body, shapeA: Shape, bodyB: Body, shapeB: Shape);

        bodyA: Body;
        bodyB: Body;
        shapeA: Shape;
        shapeB: Shape;

        set(bodyA: Body, shapeA: Shape, bodyB: Body, shapeB: Shape): void;

    }

    export class TupleDictionary {

        data: Object;
        keys: number[];

        copy(dict: TupleDictionary): void;
        get(i: number, j: number): number;
        getByKey(key: number): Object;
        getKey(i: number, j: number): string;
        reset(): void;
        set(i: number, j: number, value: number): void;

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
        getBodies(): Body[];
        wantsToSleep(): boolean;
        sleep(): void;

    }

    export class IslandManager extends Solver {

        static getUnvisitedNode(nodes: Node[]): IslandNode; // IslandNode | boolean

        constructor(options?: Object);

        islands: Island[];
        nodes: IslandNode[];
        islandPool: IslandPool;
        nodePool: IslandNodePool;

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
            body: Body;
        };

        /**
         * Body移除时调用
         * @event removeBody
         * @param {Body} body
         */
        removeBodyEvent: {
            type: string;
            body: Body;
        };

        /**
         * Spring 加入时调用
         * @event addSpring
         * @param {Spring} spring
         */
        addSpringEvent: {
            type: string;
            spring: Spring;
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
        });

        /**
         * For keeping track of what time step size we used last step
         * @property lastTimeStep
         * @type {number}
         */
        lastTimeStep: number;
        overlapKeeper: OverlapKeeper;
        /**
         * If the length of .gravity is zero, and .useWorldGravityAsFrictionGravity=true, then switch to using .frictionGravity for friction instead. This fallback is useful for gravityless games.
         * @property {boolean} useFrictionGravityOnZeroGravity
         * @default true
         */
        useFrictionGravityOnZeroGravity: boolean;


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
         * @param {Constraint} constraint
         */
        addConstraint(constraint: Constraint): void;
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
         * @param {Constraint} constraint
         */
        removeConstraint(constraint: Constraint): void;
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
         * @param {Spring} spring
         */
        addSpring(spring: Spring): void;
        /**
         * 移除一个 Spring
         *
         * @method removeSpring
         * @param {Spring} spring
         */
        removeSpring(spring: Spring): void;
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
         * @method disableBodyCollision
         * @param {Body} bodyA
         * @param {Body} bodyB
         */
        disableBodyCollision(bodyA: Body, bodyB: Body): void;
        /**
         * 两个刚体之间启用碰撞
         * @method enableBodyCollision
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
         * Test if a world point overlaps bodies
         * @method hitTest
         * @param  {Array}  worldPoint  Point to use for intersection tests
         * @param  {Array}  bodies      A list of objects to check for intersection
         * @param  {number} precision   Used for matching against particles and lines. Adds some margin to these infinitesimal objects.
         * @return {Array}              Array of bodies that overlap the point
         */
        hitTest(worldPoint: number[], bodies: Body[], precision: number): Body[];

        /**
         * Ray cast against all bodies in the world.
         * @method raycast
         * @param  {RaycastResult} result
         * @param  {Ray} ray
         * @return {boolean} True if any body was hit.
         */
        raycast(result: RaycastResult, ray: Ray): boolean;

        /**
         * Runs narrowphase for the shape pair i and j.
         * @method runNarrowphase
         * @param  {Narrowphase} np
         * @param  {Body} bi
         * @param  {Shape} si
         * @param  {Array} xi
         * @param  {number} ai
         * @param  {Body} bj
         * @param  {Shape} sj
         * @param  {Array} xj
         * @param  {number} aj
         * @param  {number} mu
         */
        runNarrowphase(np:Narrowphase, bi:Body, si:Shape, xi:number[], ai:number, bj:Body, sj:Shape, xj:number[], aj:number, mu:number): void;

        /**
         * Set the relaxation for all equations and contact materials.
         * @method setGlobalRelaxation
         * @param {number} relaxation
         */
        setGlobalRelaxation(relaxation: number): void;

        /**
         * Set the stiffness for all equations and contact materials.
         * @method setGlobalStiffness
         * @param {Number} stiffness
         */
        setGlobalStiffness(stiffness: number): void;

    }

}