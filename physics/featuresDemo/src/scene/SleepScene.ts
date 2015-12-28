class SleepScene extends egret.DisplayObjectContainer {
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
        var radius = 0.15,
            N = 20;

        var world = new p2.World({
            gravity : [0,-10]
        });

        this.world = world;

        for(var i=0; i<N; i++){
            var circleBody = new p2.Body({
                mass: 1,
                position: [0,i*2*radius],
            });
            circleBody.allowSleep = true;
            circleBody.sleepSpeedLimit = 1; // Body will feel sleepy if speed<1 (speed is the norm of velocity)
            circleBody.sleepTimeLimit =  1; // Body falls asleep after 1s of sleepiness
            circleBody.addShape(new p2.Circle({ radius: radius }));
            circleBody.damping = 0.2;
            world.addBody(circleBody);
        }

        // Create ground
        var planeShape = new p2.Plane();
        var plane = new p2.Body({
            position:[0,-1],
        });
        plane.addShape(planeShape);
        world.addBody(plane);

        // Allow sleeping
        world.sleepMode = p2.World.BODY_SLEEPING;
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