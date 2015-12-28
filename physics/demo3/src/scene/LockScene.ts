class LockScene extends egret.DisplayObjectContainer {
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
        // Create physics world
        var world = new p2.World({
            gravity : [0,-10]
        });

        this.world = world;

        (<p2.GSSolver>world.solver).iterations = 100;
        (<p2.GSSolver>world.solver).tolerance = 0.001;

        // Create two circles
        var bodyA = new p2.Body({
            mass: 5,
            position: [-1, 1],
        });
        bodyA.addShape(new p2.Circle({ radius: 0.5 }));
        world.addBody(bodyA);
        var bodyB = new p2.Body({
            mass: 5,
            position: [1, 1],
        });
        bodyB.addShape(new p2.Circle({ radius: 0.5 }));
        world.addBody(bodyB);

        // Create constraint.
        // This will lock bodyB to bodyA
        var constraint = new p2.LockConstraint(bodyA, bodyB);
        world.addConstraint(constraint);

        // Create a beam made of locked rectangles
        var r = 1,
            lastBody,
            N = 10;
        for(var i=0; i<N; i++){
            var body = new p2.Body({
                mass:1,
                position:[i*0.5*r - N*0.5*r/2,3]
            });
            body.addShape(new p2.Box({ width: 0.5, height: 0.5 }));
            world.addBody(body);
            if(lastBody){
                // Connect current body to the last one
                var constraint = new p2.LockConstraint(lastBody, body, {
                    collideConnected : false
                });
                world.addConstraint(constraint);
            }
            lastBody = body;
        }

        // Create ground
        var planeShape = new p2.Plane();
        var plane = new p2.Body({
            position : [0,-1],
        });
        plane.addShape(planeShape);
        world.addBody(plane);
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
