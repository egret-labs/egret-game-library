class RayReflectScene extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(): void {
        this.createGameScene();
    }

    private world: p2.World;
    private debugDraw: p2DebugDraw;

    private textField:egret.TextField;
    private textField2:egret.TextField;

    private ray;
    private hitPoint;
    private result;
    private reflect:boolean;

    private createGameScene(): void {
        this.reflect = false;
        this.result = new p2.RaycastResult();
        this.hitPoint = p2.vec2.create();
        this.ray = new p2.Ray({
            mode: p2.Ray.CLOSEST
        });

        this.createUI();

        this.init();
        this.createDebug();

        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);

    }

    private onTouch(e:egret.TouchEvent):void{
        console.log("clicked");
        this.reflect = !this.reflect;
        this.textField.text = "Reflect: "+ (this.reflect==true? "true" : "false");
    }

    private createUI():void{
        this.textField = new egret.TextField();
        this.textField.text = "Reflect: "+ (this.reflect==true? "true" : "false");
        this.textField.x = 50;
        this.textField.y = 50;
        this.addChild(this.textField);

        this.textField2 = new egret.TextField();
        this.textField2.text = "点击切换";
        this.textField2.x = 50;
        this.textField2.y = 100;
        this.addChild(this.textField2);
        this.textField2.touchEnabled = true;
        this.textField2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    private init(){
        var boxShape, boxBody, circleShape, circleBody, capsuleShape, capsuleBody, convexShape, convexBody, planeBody, planeShape, lineBody, lineShape;

        // Init p2.js
        this.world = new p2.World({
            gravity: [0, 0]
        });

        // Add a box
        boxShape = new p2.Box({ width: 2, height: 1 });
        boxBody = new p2.Body({
            mass:1,
            position:[0,2],
            angularVelocity:0,
            angularDamping: 0
        });
        boxBody.addShape(boxShape, [0,0], 0);
        this.world.addBody(boxBody);

        // Add a circle
        circleShape = new p2.Circle({ radius: 0.5 });
        circleBody = new p2.Body({
            mass:1,
            position:[0,-1],
            angularVelocity:1
        });
        circleBody.addShape(circleShape,[0.5,0]);
        this.world.addBody(circleBody);

        // Add a capsule
        capsuleShape = new p2.Capsule({ length: 1, radius: 0.5 });
        capsuleBody = new p2.Body({
            mass:1,
            position:[-1.5,0],
            angularVelocity:1,
            angularDamping: 0
        });
        capsuleBody.addShape(capsuleShape);
        this.world.addBody(capsuleBody);

        // Add a plane
        planeShape = new p2.Plane();
        planeBody = new p2.Body({
            position: [3,0],
            angle: Math.PI / 3
        });
        planeBody.addShape(planeShape, [-1,0], Math.PI / 16);
        this.world.addBody(planeBody);

        // Add a line
        lineShape = new p2.Line({ length: 2 });
        lineBody = new p2.Body({
            position: [2,0],
            angle: Math.PI / 3
        });
        lineBody.addShape(lineShape, [0,0], Math.PI / 16);
        this.world.addBody(lineBody);

        // Add a convex
        var vertices = [];
        var size = 2;
        for(var i=0, N=3; i<N; i++){
            var a = 2*Math.PI / N * i;
            var vertex = [size*0.5*Math.cos(a), size*0.5*Math.sin(a)]; // Note: vertices are added counter-clockwise
            vertices.push(vertex);
        }
        convexShape = new p2.Convex({ vertices: vertices });
        convexBody = new p2.Body({
            mass: 1,
            position: [1,0],
            angle: Math.PI / 3,
            angularVelocity: 1
        });
        convexBody.addShape(convexShape);
        this.world.addBody(convexBody);

        // Heightfield
        var data = [];
        var numDataPoints = 200;
        for(var i=0; i<numDataPoints; i++){
            data.push(0.1*Math.sin(i / numDataPoints * Math.PI * 8));
        }
        var heightfieldShape = new p2.Heightfield({
            heights: data,
            elementWidth: 5 / numDataPoints
        });
        var heightfield = new p2.Body({
            position:[2,-2],
            angle: Math.PI / 2
        });
        heightfield.addShape(heightfieldShape);
        this.world.addBody(heightfield);
    }

    public drawRays(){
        var N = 10;
        for (var i = 0; i < N; i++) {

            this.ray.from[0] = -3;
            this.ray.from[1] = 0;
            var angle = .5 * Math.sin(this.world.time * 1 - 1)-0.005 * (i/N)*10 + 0.1;
            this.ray.direction[0] = Math.cos(angle);
            this.ray.direction[1] = Math.sin(angle);

            this.ray.to[0] = this.ray.from[0] + this.ray.direction[0] * 100;
            this.ray.to[1] = this.ray.from[1] + this.ray.direction[1] * 100;

            this.ray.update();


            var hits = 0;
            while(this.world.raycast(this.result, this.ray) && hits++ < 10){
                this.result.getHitPoint(this.hitPoint, this.ray);
                this.debugDraw.drawRay(this.ray.from, this.hitPoint,0x0000FF);
                //drawRayResult(result);

                // move start to the hit point
                p2.vec2.copy(this.ray.from, this.hitPoint);

                this.ray.update();

                if(this.reflect){
                    // reflect the direction
                    p2.vec2.reflect(this.ray.direction, this.ray.direction, this.result.normal);
                } else {
                    this.refract(this.ray.direction, this.ray.direction, this.result.normal, this.airIndex, this.shapeIndex);
                }

                // move out a bit
                this.ray.from[0] += this.ray.direction[0] * 0.001;
                this.ray.from[1] += this.ray.direction[1] * 0.001;

                this.ray.to[0] = this.ray.from[0] + this.ray.direction[0] * 100;
                this.ray.to[1] = this.ray.from[1] + this.ray.direction[1] * 100;

                this.result.reset();
            }
            this.debugDraw.drawRay(this.ray.from, this.ray.to,0x0000FF);
        }

    }

    private vec2 = p2.vec2;
    private airIndex = 1;
    private shapeIndex = 1.5;
    public refract(out, direction, normal, airIndex, shapeIndex){
        var dot = p2.vec2.dot(normal, direction);
        var tangent = p2.vec2.fromValues(normal[0], normal[1]);
        p2.vec2.rotate(tangent, tangent, -Math.PI / 2);

        var inAngle;
        var outAngle;
        var side = p2.vec2.dot(tangent, direction);
        if(dot < 0){
            // Into the material
            dot = p2.vec2.dot(normal, direction);
            inAngle = Math.acos(dot);
            p2.vec2.scale(normal, normal, -1);
            var a = airIndex / shapeIndex * Math.sin(inAngle);

            if(a <= 1){
                outAngle = Math.asin(a);

                // Construct new refracted direction - just rotate the negative normal
                p2.vec2.rotate(out, normal, outAngle * (side < 0 ? -1 : 1));
            } else {
                p2.vec2.reflect(out, direction, normal);
            }

        } else {

            // Out of the material - flip the indices
            dot = p2.vec2.dot(normal, direction);
            inAngle = Math.acos(dot);

            var a = shapeIndex / airIndex * Math.sin(inAngle);
            if(a <= 1){
                outAngle = Math.asin(a);

                // Construct new refracted direction - just rotate the negative normal
                p2.vec2.rotate(out, normal, outAngle * (side < 0 ? 1 : -1));
            } else {
                p2.vec2.reflect(out, direction, normal);
            }
        }
    }

    private loop(): void {
        this.world.step(1/60);
        this.debugDraw.drawDebug();
        this.drawRays();
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
    }
}
