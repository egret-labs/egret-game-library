//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
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

    /**
     * 加载进度界面
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    }

    /**
     * preload资源组加载进度
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private _isDebug:boolean = false;

    /**
     * 创建游戏场景
     */
    private createGameScene():void {
        egret.Profiler.getInstance().run();
        var factor:number = 50;

        //创建world
        var world:p2.World = new p2.World();
        world.sleepMode = p2.World.BODY_SLEEPING;

        //创建plane
        var planeShape:p2.Plane = new p2.Plane();
        var planeBody:p2.Body = new p2.Body();
        planeBody.addShape(planeShape);
        planeBody.displays = [];
        world.addBody(planeBody);

        egret.Ticker.getInstance().register(function (dt) {
            if (dt < 10) {
                return;
            }
            if (dt > 1000) {
                return;
            }
            world.step(dt / 1000);

            if (!self._isDebug) {
                var stageHeight:number = egret.MainContext.instance.stage.stageHeight;
                var l = world.bodies.length;
                for (var i:number = 0; i < l; i++) {
                    var boxBody:p2.Body = world.bodies[i];
                    var box:egret.DisplayObject = boxBody.displays[0];
                    if (box) {
                        box.x = boxBody.position[0] * factor;
                        box.y = stageHeight - boxBody.position[1] * factor;
                        box.rotation = 360 - boxBody.angle * 180 / Math.PI;
                        if (boxBody.sleepState == p2.Body.SLEEPING) {
                            box.alpha = 0.5;
                        }
                        else {
                            box.alpha = 1;
                        }
                    }
                }
            }
        }, this);

        //鼠标点击添加刚体
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, addOneBox, this);
        var self = this;

        function addOneBox(e:egret.TouchEvent):void {
            var positionX:number = Math.floor(e.stageX / factor);
            var positionY:number = Math.floor((egret.MainContext.instance.stage.stageHeight - e.stageY) / factor);

            if (Math.random() > 0.5) {
                //添加方形刚体
                var boxShape:p2.Shape = new p2.Rectangle(2, 1);
                var boxBody:p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 1});
                boxBody.addShape(boxShape);
                world.addBody(boxBody);

                var display:egret.DisplayObject = self.createBitmapByName("rect");
                display.width = (<p2.Rectangle>boxShape).width * factor;
                display.height = (<p2.Rectangle>boxShape).height * factor;
            }
            else {
                //添加圆形刚体
                var boxShape:p2.Shape = new p2.Circle(1);
                var boxBody:p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY]});
                boxBody.addShape(boxShape);
                world.addBody(boxBody);

                var display:egret.DisplayObject = self.createBitmapByName("circle");
                display.width = (<p2.Circle>boxShape).radius * 2 * factor;
                display.height = (<p2.Circle>boxShape).radius * 2 * factor;
            }

            if (!self._isDebug) {
                display.anchorX = display.anchorY = .5;
                boxBody.displays = [display];
                self.addChild(display);
            }
        }

        if (this._isDebug) {
            //开启debug模式，使用图形绘制
            this.debug(world);
        }
    }

    /**
     * debug模式，使用图形绘制
     */
    private debug(world:p2.World):void {
        var factor:number = 50;

        var canvas:HTMLCanvasElement = document.createElement("canvas");
        var stage:egret.Stage = egret.MainContext.instance.stage;
        var stageWidth:number = stage.stageWidth;
        var stageHeight:number = stage.stageHeight;
        canvas.width = stageWidth;
        canvas.height = stageHeight;
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgba(" + 255 + "," + 255 + "," + 0 + "," + 1 + ")";
        ctx.strokeStyle = "rgba(" + 255 + "," + 0 + "," + 0 + "," + 1 + ")";
        ctx.lineWidth = 1;

        var rendererContext = egret.MainContext.instance.rendererContext;
        var f = rendererContext.onRenderFinish;
        rendererContext.onRenderFinish = function () {
            ctx.clearRect(0, 0, stageWidth, stageHeight);
            var l:number = world.bodies.length;
            for (var i:number = 0; i < l; i++) {
                var boxBody:p2.Body = world.bodies[i];
                if (boxBody.sleepState == p2.Body.SLEEPING) {
                    ctx.globalAlpha = 0.5;
                }
                else {
                    ctx.globalAlpha = 1;
                }
                for (var j:number = 0; j < boxBody.shapes.length; j++) {
                    var boxShape:p2.Shape = boxBody.shapes[j];
                    if (boxShape instanceof p2.Rectangle) {
                        var x:number = (boxBody.position[0] + +boxBody.shapeOffsets[j][0]) * factor;
                        var y:number = stageHeight - (boxBody.position[1] + +boxBody.shapeOffsets[j][1]) * factor;
                        var w:number = (<p2.Rectangle>boxShape).width * factor;
                        var h:number = (<p2.Rectangle>boxShape).height * factor;
                        var matrix:egret.Matrix = egret.Matrix.identity.identity();
                        matrix.prependTransform(x, y, 1, 1, 360 - boxBody.angle * 180 / Math.PI, 0, 0, 0, 0);
                        ctx.save();
                        ctx.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
                        ctx.beginPath();
                        ctx.rect(-(<p2.Rectangle>boxShape).width / 2 * factor, -(<p2.Rectangle>boxShape).height / 2 * factor, w, h);
                        ctx.fill();
                        ctx.closePath();
                        ctx.restore();
                    }
                    else if (boxShape instanceof p2.Plane) {
                        ctx.save();
                        ctx.setTransform(1, 0, 0, 1, 0, stageHeight - (boxBody.position[1] + boxBody.shapeOffsets[j][1]) * factor);
                        ctx.beginPath();
                        ctx.moveTo(0, 0);
                        ctx.lineTo(stageWidth, 0);
                        ctx.stroke();
                        ctx.closePath();
                        ctx.restore();
                    }
                    else if (boxShape instanceof p2.Circle) {
                        var x:number = (boxBody.position[0] + boxBody.shapeOffsets[j][0]) * factor;
                        var y:number = stageHeight - (boxBody.position[1] + boxBody.shapeOffsets[j][1]) * factor;
                        var matrix:egret.Matrix = egret.Matrix.identity.identity();
                        matrix.prependTransform(x, y, 1, 1, 360 - boxBody.angle * 180 / Math.PI, 0, 0, 0, 0);
                        ctx.save();
                        ctx.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
                        ctx.beginPath();
                        ctx.arc(0, 0, (<p2.Circle>boxShape).radius * factor, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.closePath();
                        ctx.restore();
                    }
                }
            }
            rendererContext["_cacheCanvasContext"].drawImage(canvas, 0, 0, stageWidth, stageHeight, 0, 0, stageWidth, stageHeight);
            f.call(rendererContext);
        };
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}


