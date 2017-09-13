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

class Main extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene2(): void {
        var sky: egret.Bitmap = this.createBitmapByName("bgImage");
        this.addChild(sky);
        var stageW: number = this.stage.stageWidth;
        var stageH: number = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        var icon: egret.Bitmap = this.createBitmapByName("egretIcon");
        this.addChild(icon);
        icon.scaleX = 0.55;
        icon.scaleY = 0.55;
        icon.anchorOffsetX = icon.width / 2;
        icon.anchorOffsetY = icon.height / 2;
        icon.x = stageW / 2;
        icon.y = stageH / 2 - 60;
    }

    private outContainer;
    private inShape;

    public createGameScene() {

        mouse.enable(this.stage);

        this.outContainer = new egret.Sprite();
        this.outContainer.name = "outContainer";
        this.outContainer.graphics.beginFill(0x00ff00);
        this.outContainer.graphics.drawRect(0, 0, 300, 300);
        this.outContainer.graphics.endFill();
        this.addChild(this.outContainer);
        this.outContainer.x = (this.stage.stageWidth - this.outContainer.width) / 2;
        this.outContainer.y = (this.stage.stageHeight - this.outContainer.height) / 2;
        this.inShape = new egret.Sprite();
        this.inShape.name = "inShape";
        this.inShape.graphics.beginFill(0xff0000);
        this.inShape.graphics.drawCircle(0, 0, 50);
        this.inShape.graphics.endFill();
        this.inShape.x = this.outContainer.width / 2;
        this.inShape.y = this.outContainer.height / 2;
        this.outContainer.addChild(this.inShape);
        //
        this.outContainer.touchEnabled = true;
        this.inShape.touchEnabled = true;

        //设置鼠标手型
        mouse.setButtonMode(this.inShape, true);

        this.outContainer.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollOver, this);
        this.outContainer.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
        this.outContainer.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseOver, this);
        this.outContainer.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut, this);

        this.inShape.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollOver2, this);
        this.inShape.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut2, this);
        this.inShape.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseOver2, this);
        this.inShape.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut2, this);

        // this.inShape.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (){
        //     this.outContainer.removeChild(this.inShape);
        // }, this);

        // this.addEventListener(egret.Event.ENTER_FRAME, function (){
        //     this.inShape.x += 0.2;
        // }, this);

        mouse.setMouseMoveEnabled(true);
        this.outContainer.addEventListener(mouse.MouseEvent.MOUSE_MOVE, function () {
            console.log("mouse move");
        }, this);
        
        this.stage.addEventListener(mouse.MouseEvent.MOUSE_WHEEL, function (event) {
            console.log(event.data);
        }, this);
    }

    private onRollOver(e: egret.TouchEvent): void {
        console.log("roll over " + e.target.name + "  " + e.bubbles);
    }

    private onRollOut(e: egret.TouchEvent): void {
        console.log("roll out " + e.target.name + "  " + e.bubbles);
    }

    private onMouseOver(e: egret.TouchEvent): void {
        console.log("mouse over " + e.target.name + "  " + e.bubbles);
    }

    private onMouseOut(e: egret.TouchEvent): void {
        console.log("mouse out " + e.target.name + "  " + e.bubbles);
    }

    private onRollOver2(e: egret.TouchEvent): void {
        console.log("roll over2 " + e.target.name + "  " + e.bubbles);
    }

    private onRollOut2(e: egret.TouchEvent): void {
        console.log("roll out2 " + e.target.name + "  " + e.bubbles);
    }

    private onMouseOver2(e: egret.TouchEvent): void {
        console.log("mouse over2 " + e.target.name + "  " + e.bubbles);
    }

    private onMouseOut2(e: egret.TouchEvent): void {
        console.log("mouse out2 " + e.target.name + "  " + e.bubbles);
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}


