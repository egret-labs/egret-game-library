class HeightfieldScene extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(): void {
        this.createGameScene();
    }

    private world: p2.World;
    private debugDraw: p2DebugDraw;

    private dragHelper:DragHelper;

    private createGameScene(): void {

        this.init();
        this.createDebug();

        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);

    }

    private init(){
        var world = new p2.World({
            gravity : [0,-10]
        });

        this.world = world;

        (<p2.GSSolver>world.solver).tolerance = 0.01;

        // Set large friction - needed for powerful vehicle engine!
        world.defaultContactMaterial.friction = 10;

        // Create ground
        var data = [];
        var numDataPoints = 200;
        for(var i=0; i<numDataPoints; i++){
            data.push(0.5*Math.cos(0.2*i) * Math.sin(0.5*i) + 0.6*Math.sin(0.1*i) * Math.sin(0.05*i));
        }
        var heightfieldShape = new p2.Heightfield({
            heights: data,
            elementWidth: 1
        });
        var heightfield = new p2.Body({
            position:[-10,-1]
        });
        heightfield.addShape(heightfieldShape);
        world.addBody(heightfield);

        // Create chassis
        var chassisBody = new p2.Body({ mass : 1, position:[-4,1] }),
            chassisShape = new p2.Box({ width: 1, height: 0.5 });
        chassisBody.addShape(chassisShape);
        world.addBody(chassisBody);

        // Create wheels
        var wheelBody1 = new p2.Body({ mass : 1, position:[chassisBody.position[0] - 0.5,0.7] }),
            wheelBody2 = new p2.Body({ mass : 1, position:[chassisBody.position[0] + 0.5,0.7] }),
            wheelShapeLeft = new p2.Circle({ radius: 0.3 }),
            wheelShapeRight = new p2.Circle({ radius: 0.3 });
        wheelBody1.addShape(wheelShapeLeft);
        wheelBody2.addShape(wheelShapeRight);
        world.addBody(wheelBody1);
        world.addBody(wheelBody2);

        // Disable collisions between chassis and wheels
        var WHEELS =  1, // Define bits for each shape type
            CHASSIS = 2,
            GROUND =  4,
            OTHER =   8;
        wheelShapeLeft.collisionGroup = wheelShapeRight.collisionGroup = WHEELS; // Assign groups
        chassisShape.collisionGroup =   CHASSIS;
        heightfieldShape  .collisionGroup =   GROUND;

        wheelShapeLeft.collisionMask = wheelShapeRight.collisionMask = GROUND | OTHER;             // Wheels can only collide with ground
        chassisShape.collisionMask = GROUND | OTHER;             // Chassis can only collide with ground
        heightfieldShape.collisionMask = WHEELS | CHASSIS | OTHER;   // Ground can collide with wheels and chassis

        // Constrain wheels to chassis
        var c1 = new p2.PrismaticConstraint(chassisBody,wheelBody1,{
            localAnchorA : [-0.5,-0.3],
            localAnchorB : [0,0],
            localAxisA : [0,1],
            disableRotationalLock : true,
        });
        var c2 = new p2.PrismaticConstraint(chassisBody,wheelBody2,{
            localAnchorA : [ 0.5,-0.3],
            localAnchorB : [0,0],
            localAxisA : [0,1],
            disableRotationalLock : true,
        });
        c1.setLimits(-0.4, 0.2);
        c2.setLimits(-0.4, 0.2);
        world.addConstraint(c1);
        world.addConstraint(c2);

        // Add springs for the suspension
        var stiffness = 100,
            damping = 5,
            restLength = 0.5;
        // Left spring
        world.addSpring(new p2.LinearSpring(chassisBody, wheelBody1, {
            restLength : restLength,
            stiffness : stiffness,
            damping : damping,
            localAnchorA : [-0.5,0],
            localAnchorB : [0,0],
        }));
        // Right spring
        world.addSpring(new p2.LinearSpring(chassisBody, wheelBody2, {
            restLength : restLength,
            stiffness : stiffness,
            damping : damping,
            localAnchorA : [0.5,0],
            localAnchorB : [0,0],
        }));

        // Apply current engine torque after each step
        var torque = 0;
        world.on("postStep",function(evt){
            wheelBody1.angularForce += torque;
            wheelBody2.angularForce += torque;
        });

        // Change the current engine torque with the left/right keys
        document.addEventListener("keydown",function(evt:KeyboardEvent){
            var t = 5;
            switch(evt.keyCode){
                case 39: // right
                    torque = -t;
                    break;
                case 37: // left
                    torque = t;
                    break;
            }
        });
        document.addEventListener("keyup",function(){
            torque = 0;
        });

        world.on("addBody",function(evt){
            evt.body.setDensity(1);
        });
    }

    private loop(): void {
        this.world.step(1 / 60);
        this.debugDraw.drawDebug();
    }

    private createDebug(): void {
        //创建调试试图
        this.debugDraw = new p2DebugDraw(this.world);
        var sprite: egret.Sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw.setSprite(sprite);

        this.debugDraw.setLineWidth(0.02);
        sprite.x = this.stage.stageWidth/2;
        sprite.y = this.stage.stageHeight/2;
        sprite.scaleX = 50;
        sprite.scaleY = -50;

        this.dragHelper = new DragHelper(this.stage, sprite, this.world);

    }
}