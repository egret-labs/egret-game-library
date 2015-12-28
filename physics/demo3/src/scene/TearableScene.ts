class TearableScene extends egret.DisplayObjectContainer {
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
            gravity : [0,-15]
        });

        this.world = world;

        (<p2.GSSolver>world.solver).iterations = 30;
        (<p2.GSSolver>world.solver).tolerance = 0.001;

        // Create circle rope
        var N=10,  // Number of circles
            r=0.1; // Radius of circle
        var lastBody,
            constraints = [];
        for(var i=N-1; i>=0; i--){
            var x = 0,
                y = (N-i - N/2)*r*2.1;
            var p = new p2.Body({
                mass: i==0 ? 0 : 1, // top body has mass=0 and is static
                position: [x,y],
                angularDamping:0.5,
            });
            p.addShape(new p2.Circle({ radius: r }));
            if(lastBody){
                // Create a DistanceConstraint, it will constrain the
                // current and the last body to have a fixed distance from each other
                var dist = Math.abs(p.position[1]-lastBody.position[1]),
                    c = new p2.DistanceConstraint(p,lastBody,{
                        distance: dist
                    });
                world.addConstraint(c);
                constraints.push(c);
            } else {
                // Set horizontal velocity of the last body
                p.velocity[0] = 1;
            }
            lastBody = p;
            world.addBody(p);
        }

        // Create ground
        var planeShape = new p2.Plane();
        var plane = new p2.Body({
            position:[0,(-N/2)*r*2.1],
        });
        plane.addShape(planeShape);
        world.addBody(plane);

        // After each physics step, we check the constraint force
        // applied. If it is too large, we remove the constraint.
        world.on("postStep",function(evt){
            for(var i=0; i<constraints.length; i++){
                var c = constraints[i],
                    eqs = c.equations;
                // Equation.multiplier can be seen as the magnitude of the force
                if(Math.abs(eqs[0].multiplier) > 1500){
                    // Constraint force is too large... Remove the constraint.
                    world.removeConstraint(c);
                    constraints.splice(constraints.indexOf(c),1);
                }
            }
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

        this.debugDraw.setLineWidth(0.01);
        sprite.x = this.stage.stageWidth/2;
        sprite.y = this.stage.stageHeight/2;
        sprite.scaleX = 100;
        sprite.scaleY = -100;

        this.dragHelper = new DragHelper(this.stage, sprite, this.world);

    }
}
