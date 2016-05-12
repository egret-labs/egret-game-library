class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event){
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json","resource/");
    }

    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onSceneStart,this);
        RES.loadGroup("posters");
    }

    private onSceneStart(event:egret.Event){
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onSceneStart,this);
        console.log('stageWidth:',this.stage.stageWidth);
        console.log('stageHeight:',this.stage.stageHeight);
        //添加背景
        var rollingBackBitmap:egret.Bitmap = new egret.Bitmap();
        rollingBackBitmap.texture = RES.getRes('rollingBack');
        rollingBackBitmap.width = 720;
        rollingBackBitmap.height = 1280;
        this.stage.addChildAt(rollingBackBitmap,0);
        //添加滑动场景
        this.loadScrollScenesTestCase();
    }

    loadScrollScenesTestCase(){
        ecs.scrollScenes(1280,[
            {
                name:'scene1',
                scene:RES.getRes('scroll1')
            },
            {
                name:'scene2',
                scene:RES.getRes('scroll2')
            },
            {
                name:'scene3',
                scene:RES.getRes('scroll3')
            },
            {
                name:'scene4',
                scene:RES.getRes('scroll4')
            },
            {
                name:'scene5',
                scene:RES.getRes('scroll5')
            },
            {
                name:'sceneend',
                scene:RES.getRes('scrollEnd')
            }
        ],this,0);
    }
}