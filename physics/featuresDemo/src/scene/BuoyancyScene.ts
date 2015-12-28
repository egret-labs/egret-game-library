class BuoyancyScene extends egret.DisplayObjectContainer {
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

        // Create "water surface"
        var planeShape = new p2.Plane();
        var plane = new p2.Body({
            position:[0,0],
            collisionResponse: false
        });
        plane.addShape(planeShape);
        world.addBody(plane);

        var body = new p2.Body({
            mass: 1,
            position: [-2,2],
            angularVelocity: 0.5
        });
        body.addShape(new p2.Circle({ radius: 0.5 }), [0.5,0], 0);
        body.addShape(new p2.Circle({ radius: 0.5 }), [-0.5,0], 0);
        world.addBody(body);

        var body2 = new p2.Body({
            mass: 1,
            position: [1,2],
            angularVelocity: 1
        });
        body2.addShape(new p2.Box({ width: 0.5, height:  2 }), [1,0], 0);
        body2.addShape(new p2.Box({ width: 0.5, height:  2 }), [0.5,0], 0);
        body2.addShape(new p2.Box({ width: 0.5, height:  2 }), [-0.5,0], 0);
        body2.addShape(new p2.Box({ width: 0.5, height:  2 }), [-1,0], 0);
        world.addBody(body2);

        // Add forces every step
        world.on('postStep', function(){
            applyAABBBuoyancyForces(body, plane.position, k, c);
            applyAABBBuoyancyForces(body2, plane.position, k, c);
        });

        var shapePosition = [0,0];
        var centerOfBouyancy = [0,0];
        var liftForce = [0,0];
        var viscousForce = [0,0];
        var shapeAngle = 0;
        var k = 25; // up force per submerged "volume"
        var c = 0.8; // viscosity
        var v = [0,0];
        var aabb = new p2.AABB();
        function applyAABBBuoyancyForces(body, planePosition, k, c){
            for (var i = 0; i < body.shapes.length; i++) {

                var shape = body.shapes[i];

                // Get shape world transform
                body.vectorToWorldFrame(shapePosition, shape.position);
                p2.vec2.add(shapePosition, shapePosition, body.position);
                shapeAngle = shape.angle + body.angle;

                // Get shape AABB
                shape.computeAABB(aabb, shapePosition, shapeAngle);

                var areaUnderWater;
                var isFullyIn=0;
                if(aabb.upperBound[1] < planePosition[1]){
                    // Fully submerged
                    p2.vec2.copy(centerOfBouyancy,shapePosition);
                    areaUnderWater = shape.area;
                    isFullyIn = 1;
                } else if(aabb.lowerBound[1] < planePosition[1]){
                    // Partially submerged
                    var width = aabb.upperBound[0] - aabb.lowerBound[0];
                    var height = 0 - aabb.lowerBound[1];
                    areaUnderWater = width * height;
                    p2.vec2.set(centerOfBouyancy, aabb.lowerBound[0] + width / 2, aabb.lowerBound[1] + height / 2);
                } else {
                    continue;
                }

                // Compute lift force

                //当全没入水中后浮力大小应该就固定了。
                if(isFullyIn==1){
                    p2.vec2.subtract(liftForce, aabb.upperBound, centerOfBouyancy);
                }else{
                    p2.vec2.subtract(liftForce, planePosition, centerOfBouyancy);
                }
                //使用底边长度算
                var w = aabb.upperBound[0] - aabb.lowerBound[0];
                p2.vec2.scale(liftForce, liftForce, w * k);
                liftForce[0] = 0;

                // Make center of bouycancy relative to the body
                p2.vec2.subtract(centerOfBouyancy,centerOfBouyancy,body.position);

                // Viscous force
                body.getVelocityAtPoint(v, centerOfBouyancy);
                p2.vec2.scale(viscousForce, v, -c*(Math.abs(w)));

                // Apply forces
                body.applyForce(viscousForce,centerOfBouyancy);
                body.applyForce(liftForce,centerOfBouyancy);
            }
        }
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