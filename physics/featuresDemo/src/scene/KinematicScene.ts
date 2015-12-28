class KinematicScene extends egret.DisplayObjectContainer {
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
        // Create a World
        var world = new p2.World({
            gravity : [0, -10]
        });

        this.world = world;

        // Create ground
        var planeShape = new p2.Plane();
        var plane = new p2.Body({
            position: [0,-2]
        });
        plane.addShape(planeShape);
        world.addBody(plane);

        // Create kinematic, moving box
        var kinematicBody = new p2.Body({
            type: p2.Body.KINEMATIC,
            position: [0, 0.5]
        });
        var boxShape = new p2.Box({ width: 2, height: 0.5 });
        kinematicBody.addShape(boxShape);
        world.addBody(kinematicBody);

        // Create dynamic box
        var boxBody = new p2.Body({
            mass: 1,
            position: [0,2]
        });
        boxBody.addShape(new p2.Box({ width: 0.5, height: 0.5 }));
        world.addBody(boxBody);

        // Create dynamic circle connected to the kinematic body
        var circleBody = new p2.Body({
            mass: 1,
            position: [0,-0.5],
            velocity: [-1,0]
        });
        circleBody.addShape(new p2.Circle({ radius: 0.25 }));
        world.addBody(circleBody);

        world.addConstraint(new p2.DistanceConstraint(kinematicBody, circleBody));

        world.on("postStep", function(){
            // Kinematic bodies are controlled via velocity.
            kinematicBody.velocity[1] = 2 * Math.sin(world.time * 2);
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
