
class DragHelper extends egret.EventDispatcher{

    private world: p2.World;
    private stage: egret.Stage;
    private sceneCtn: egret.DisplayObjectContainer;

    private nullBody: p2.Body;
    private mouseConstraint:p2.RevoluteConstraint;

    private pickPrecision:number = 5;

    public constructor(stageRef:egret.Stage, pSceneCtn:egret.DisplayObjectContainer, pWorld:p2.World) {
        super();
        this.stage = stageRef;
        this.world = pWorld;
        this.sceneCtn = pSceneCtn;

        this.nullBody = new p2.Body();

        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onStageTouchBegin,this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onStageTouchMove,this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onStageTouchEnd,this);
    }

    private onStageTouchBegin(e:egret.TouchEvent):void{
        var point:egret.Point = new egret.Point();
        this.sceneCtn.globalToLocal(e.stageX,e.stageY,point);

        var physicsPosition:number[] = [point.x,point.y];

        // Check if the clicked point overlaps bodies
        var result = this.world.hitTest(physicsPosition, this.world.bodies, this.pickPrecision);

        // Remove static bodies
        var b;
        while(result.length > 0){
            b = result.shift();
            if(b.type === p2.Body.STATIC){
                b = null;
            } else {
                break;
            }
        }

        if(b){
            b.wakeUp();
            // Add mouse joint to the body
            var localPoint = p2.vec2.create();
            b.toLocalFrame(localPoint,physicsPosition);
            this.world.addBody(this.nullBody);
            this.mouseConstraint = new p2.RevoluteConstraint(this.nullBody, b, {
                localPivotA: physicsPosition,
                localPivotB: localPoint
            });
            this.world.addConstraint(this.mouseConstraint);
        }

    }

    private onStageTouchMove(e:egret.TouchEvent):void{
        var point:egret.Point = new egret.Point();
        this.sceneCtn.globalToLocal(e.stageX,e.stageY,point);

        var physicsPosition:number[] = [point.x,point.y];

        if(this.mouseConstraint){
            p2.vec2.copy(this.mouseConstraint.pivotA, physicsPosition);
            this.mouseConstraint.bodyA.wakeUp();
            this.mouseConstraint.bodyB.wakeUp();
        }
    }

    private onStageTouchEnd(e:egret.TouchEvent):void{
        this.world.removeConstraint(this.mouseConstraint);
        this.mouseConstraint = null;
        this.world.removeBody(this.nullBody);
    }
}