//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


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
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;
    private user: GameUser;
    private matchvs: MatchvsDemo;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;

        let topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, stageH);
        topMask.graphics.endFill();
        this.addChild(topMask);

        let icon: egret.Bitmap = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 110;
        icon.y = 80;

        let icon2: egret.Bitmap = this.createBitmapByName("matchvs_png");
        this.addChild(icon2);
        icon2.scaleX = 0.6;
        icon2.scaleY = 0.6;
        icon2.x = 380;
        icon2.y = 130;

        let line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = stageW / 2;
        line.y = 104
        this.addChild(line);

        var gp = new eui.Group();
        gp.horizontalCenter = 0;
        gp.verticalCenter = 0;
        var ly = new eui.VerticalLayout();
        ly.horizontalAlign = egret.HorizontalAlign.CENTER;
        ly.gap = 20;
        gp.layout = ly;
        this.addChild(gp);

        var matchvs = new MatchvsDemo();
        this.matchvs = matchvs;

        var wid = 200;

        var btnRegister = new eui.Button();
        btnRegister.width = wid;
        btnRegister.label = '注册 Matchvs';
        gp.addChild(btnRegister);
        btnRegister.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            matchvs.registerUser();
        }, this)

        var btnLogin = new eui.Button();
        btnLogin.width = wid;
        btnLogin.label = '登陆';
        gp.addChild(btnLogin);
        btnLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            matchvs.login();
        }, this)

        var btnJoin = new eui.Button();
        btnJoin.width = wid;
        btnJoin.label = '加入房间';
        gp.addChild(btnJoin);
        btnJoin.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            matchvs.joinRandomRoom((id) => {
                this.user = new GameUser(id, (msg) => { this.matchvs.sendEvent(msg) });
                this.matchvs.messageCallBack = (info) => {this.user.getMessage(info)}
                this.addChild(this.user);
            });
        }, this)

        var btnStopJoin = new eui.Button();
        btnStopJoin.width = wid;
        btnStopJoin.label = '停止加入';
        gp.addChild(btnStopJoin);
        btnStopJoin.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            matchvs.stopJoin();
        }, this)

        var btnLogout = new eui.Button();
        btnLogout.width = wid;
        btnLogout.label = '游戏登出';
        gp.addChild(btnLogout);
        btnLogout.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            matchvs.logout();
        }, this)

        var btnUninit = new eui.Button();
        btnUninit.width = wid;
        btnUninit.label = '反初始化';
        gp.addChild(btnUninit);
        btnUninit.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            matchvs.uninit();
        }, this)

        var btnClearUser = new eui.Button();
        btnClearUser.width = wid;
        btnClearUser.label = '清理缓存';
        gp.addChild(btnClearUser);
        btnClearUser.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            LocalStore_Clear();
        }, this)

        var gp2 = new eui.Group();
        gp.addChild(gp2);

        var btnLeft = new eui.Button();
        btnLeft.width = 160;
        btnLeft.label = '向左移动';
        gp2.addChild(btnLeft);
        btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.user.sendMove(-1);
        }, this)

        var btnRight = new eui.Button();
        btnRight.width = 160;
        btnRight.x = 200;
        btnRight.label = '向右移动';
        gp2.addChild(btnRight);
        btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.user.sendMove(1);
        }, this)



    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}
