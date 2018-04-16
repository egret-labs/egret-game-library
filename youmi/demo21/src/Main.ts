class Main extends egret.DisplayObjectContainer {
    private im: IM;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(event: egret.Event) {
        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        let sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        var btnLogin = this.getButton('用户登陆!');
        btnLogin.x = 250;
        btnLogin.y = 100;
        this.addChild(btnLogin);
        btnLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            var userName = 'user' + Math.floor(Math.random() * 1000);
            egret.log('用户登陆:' + userName);
            this.im = new IM(userName);
        }, this)


        var btnOpen = this.getButton('打开麦克风');
        btnOpen.x = 250;
        btnOpen.y = 200;
        this.addChild(btnOpen);
        btnOpen.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.im.openMic();
        }, this)

        var btnClose = this.getButton('关闭麦克风');
        btnClose.x = 250;
        btnClose.y = 300;
        this.addChild(btnClose);
        btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.im.closeMic();
        }, this)

    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private getButton(label: string = ""): egret.Sprite {
        var ct = new egret.Sprite();

        var t = new egret.TextField();
        t.text = label;
        t.x = 10;
        t.y = 10;

        var sp = new egret.Shape();
        sp.graphics.beginFill(0x000000);
        sp.graphics.drawRect(0, 0, t.width + 20, t.height + 20);
        sp.touchEnabled = true;

        ct.addChild(sp);
        ct.addChild(t);

        return ct;
    }
}