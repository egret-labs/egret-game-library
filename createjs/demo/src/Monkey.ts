class Monkey extends createjs.MovieClip {
    public instance:createjs.DisplayObjectContainer;
    public instance_1:createjs.DisplayObjectContainer;
    public instance_2:createjs.DisplayObjectContainer;
    public instance_3:createjs.DisplayObjectContainer;
    public instance_4:createjs.DisplayObjectContainer;
    public instance_5:createjs.DisplayObjectContainer;
    public instance_6:createjs.DisplayObjectContainer;
    public instance_7:createjs.DisplayObjectContainer;
    public instance_8:createjs.DisplayObjectContainer;
    public instance_9:createjs.DisplayObjectContainer;
    public instance_10:createjs.DisplayObjectContainer;
    public instance_11:createjs.DisplayObjectContainer;
    public instance_12:createjs.DisplayObjectContainer;
    public instance_13:createjs.DisplayObjectContainer;
    public instance_14:createjs.DisplayObjectContainer;
    public instance_15:createjs.DisplayObjectContainer;
    public instance_16:createjs.DisplayObjectContainer;
    public instance_17:createjs.DisplayObjectContainer;
    public instance_18:createjs.DisplayObjectContainer;
    public instance_19:createjs.DisplayObjectContainer;
    public instance_20:createjs.DisplayObjectContainer;
    public shape:createjs.Shape;

    public constructor(mode = null, startPostion = 0, loop = null) {
        super(mode, startPostion, loop, {close: 0, open: 32});
        this.init();
    }

    public play():void {
        var fpsTime = 1000 / 24;
        var timer = new egret.Timer(fpsTime);
        timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
        timer.start();
    }

    private onTimer():void {
        this.tick(1);
        this.update();
    }

    public init() {
        var mask = new createjs.Shape();
        mask._off = true;
        var mask_graphics_0 = new createjs.Graphics().p("AFfK9QgtgMgagdQgagcAJgeQAIgdAngNQAmgNAtAMQAuALAaAdQAaAdgJAdQgJAdgmANQgUAHgXAAQgTAAgWgFg");
        var mask_graphics_1 = new createjs.Graphics().p("AFlK9QgtgLgagdQgbgcAJgeQAIgdAmgNQAngNAtALQAuALAaAcQAaAdgIAdQgJAegmANQgVAHgWAAQgUAAgVgFg");
        var mask_graphics_2 = new createjs.Graphics().p("AF4K+QgugKgbgcQgbgcAIgeQAHgdAmgOQAmgOAuAKQAuAKAbAcQAbAcgIAeQgHAdgmAOQgXAIgYAAQgSAAgTgEg");
        var mask_graphics_3 = new createjs.Graphics().p("AGWK/QgvgIgcgbQgcgbAHgeQAHgdAlgQQAmgPAvAJQAuAIAcAbQAcAbgGAdQgHAegmAQQgYAJgcAAQgQAAgQgDg");
        var mask_graphics_4 = new createjs.Graphics().p("AHALBQgvgGgdgZQgegZAFgeQAGgeAlgSQAlgRAvAGQAvAGAeAaQAeAZgGAeQgFAeglARQgcANghAAIgYgCg");
        var mask_graphics_5 = new createjs.Graphics().p("AH3LDQgwgCgfgYQgggXAEgeQADgeAkgUQAlgTAwACQAwADAfAXQAgAYgEAeQgDAeglAUQggARgoAAIgMgBg");
        var mask_graphics_6 = new createjs.Graphics().p("AHoKyQghgVABgeQABgfAjgWQAjgWAxgCQAwgBAiAVQAhAUgBAfQgBAegjAWQgjAXgxABIgFAAQgtAAgggTg");
        var mask_graphics_7 = new createjs.Graphics().p("AIKK2QgigTAAgeQAAgfAigYQAigXAxgEQAxgDAiATQAjATAAAeQAAAfgjAXQgiAYgxAEIgOAAQgnAAgegQg");
        var mask_graphics_8 = new createjs.Graphics().p("AInK6QgjgSgBgeQgBgfAhgZQAigZAxgFQAxgGAjASQAjASABAeQABAeghAaQgiAZgxAFIgVABQgkAAgbgNg");
        var mask_graphics_9 = new createjs.Graphics().p("AI/K8QgkgQgCgeQgCgfAhgaQAigaAwgHQAxgHAkARQAkARACAeQACAegiAaQghAagwAHQgOACgNAAQggAAgagMg");
        var mask_graphics_10 = new createjs.Graphics().p("AJSK+QgkgPgDgeQgDgfAhgbQAggaAxgIQAxgIAkAPQAkAQADAeQADAeghAbQghAbgwAIQgRADgPAAQgdAAgYgLg");
        var mask_graphics_11 = new createjs.Graphics().p("AJfLAQgkgPgEgeQgDgeAhgcQAggbAwgJQAxgJAlAPQAkAPADAeQADAeggAcQggAbgxAJQgSADgQAAQgcAAgXgJg");
        var mask_graphics_12 = new createjs.Graphics().p("AJnLBQglgPgDgeQgDgeAggcQAggcAwgJQAxgJAlAOQAkAPAEAeQADAeggAcQggAcgwAJQgTAEgRAAQgbAAgXgJg");
        var mask_graphics_13 = new createjs.Graphics().p("AJqLBQglgOgDgeQgEgfAggcQAggbAxgKQAwgKAlAPQAlAPADAeQAEAeggAcQggAcgxAJQgTAEgRAAQgbAAgWgJg");
        var mask_graphics_14 = new createjs.Graphics().p("AJlLBQgkgPgEgeQgDgeAggcQAggcAxgJQAwgJAlAOQAlAPADAeQADAeggAcQggAcgwAJQgTAEgRAAQgbAAgXgJg");
        var mask_graphics_15 = new createjs.Graphics().p("AJYK/QgkgPgDgeQgDgeAhgcQAggbAxgIQAwgJAlAQQAkAPADAeQADAeghAcQggAbgxAIQgRADgPAAQgdAAgYgKg");
        var mask_graphics_16 = new createjs.Graphics().p("AJCK9QgkgQgCgfQgCgeAhgaQAhgbAxgHQAxgHAkARQAjAQADAeQACAeghAbQghAagxAHQgPACgNAAQgfAAgagLg");
        var mask_graphics_17 = new createjs.Graphics().p("AIkK5QgjgRgBgfQgBgeAhgZQAigZAxgFQAxgFAjARQAjASABAfQABAegiAZQgiAZgwAFIgVABQgkAAgbgOg");
        var mask_graphics_18 = new createjs.Graphics().p("AH9K1QgigUAAgeQABgeAigYQAjgXAwgDQAxgDAiAUQAiATAAAfQAAAegjAYQgjAXgwADIgMAAQgpAAgegRg");
        var mask_graphics_19 = new createjs.Graphics().p("AIfLFQgxgBgggVQghgWACgeQACgfAkgVQAjgVAxAAQAwAAAhAWQAgAWgCAeQgCAegjAWQgjAVgwAAIgBAAg");
        var mask_graphics_20 = new createjs.Graphics().p("AHlLDQgwgEgegYQgfgYAEgeQAEgeAkgTQAlgTAwAEQAvAEAfAYQAfAYgEAeQgEAegkATQgfAQgnAAIgPgBg");
        var mask_graphics_21 = new createjs.Graphics().p("AHCLCQgwgGgdgaQgegZAFgeQAFgeAmgRQAlgRAvAFQAvAGAeAZQAeAagGAeQgFAeglARQgcANghAAIgXgBg");
        var mask_graphics_22 = new createjs.Graphics().p("AGkLAQgvgHgdgbQgcgaAGgeQAGgeAmgQQAlgQAvAIQAvAHAcAbQAdAagGAeQgHAeglAQQgaALgdAAQgPAAgOgDg");
        var mask_graphics_23 = new createjs.Graphics().p("AGLK/QgugJgcgbQgcgcAHgdQAIgeAlgPQAmgOAvAIQAuAJAcAcQAbAbgHAeQgHAdgmAPQgXAJgbAAQgRAAgRgDg");
        var mask_graphics_24 = new createjs.Graphics().p("AF4K+QgugKgbgcQgbgcAIgeQAIgdAmgOQAmgOAuAKQAuAKAbAcQAbAcgIAeQgIAdgmAOQgWAIgZAAQgSAAgTgEg");
        var mask_graphics_25 = new createjs.Graphics().p("AFqK9QgtgLgbgcQgagcAIgeQAIgdAmgOQAngNAtALQAuALAaAcQAbAcgIAeQgJAdgmAOQgVAHgXAAQgTAAgVgFg");
        var mask_graphics_26 = new createjs.Graphics().p("AFiK9QgtgLgagdQgbgdAJgdQAJgeAmgNQAmgMAtALQAuALAaAdQAaAcgIAeQgJAdgmANQgVAHgWAAQgUAAgVgFg");
        var mask_graphics_27 = new createjs.Graphics().p("AFfK9QgtgMgagdQgagcAJgeQAIgdAngNQAmgNAtAMQAuALAaAdQAaAdgJAdQgJAdgmANQgUAHgXAAQgTAAgWgFg");

        this.timeline.addTween(egret.Tween.get(mask).to({
            graphics: mask_graphics_0,
            x: 48.5,
            y: 70.6
        }).wait(1).to({graphics: mask_graphics_1, x: 49, y: 70.6}).wait(1).to({
            graphics: mask_graphics_2,
            x: 50.8,
            y: 70.7
        }).wait(1).to({graphics: mask_graphics_3, x: 53.6, y: 70.7}).wait(1).to({
            graphics: mask_graphics_4,
            x: 57.6,
            y: 70.7
        }).wait(1).to({graphics: mask_graphics_5, x: 62.8, y: 70.8}).wait(1).to({
            graphics: mask_graphics_6,
            x: 69.1,
            y: 71
        }).wait(1).to({graphics: mask_graphics_7, x: 72.3, y: 71.1}).wait(1).to({
            graphics: mask_graphics_8,
            x: 75.1,
            y: 71.2
        }).wait(1).to({graphics: mask_graphics_9, x: 77.3, y: 71.3}).wait(1).to({
            graphics: mask_graphics_10,
            x: 79.1,
            y: 71.3
        }).wait(1).to({graphics: mask_graphics_11, x: 80.3, y: 71.4}).wait(1).to({
            graphics: mask_graphics_12,
            x: 81.1,
            y: 71.4
        }).wait(1).to({graphics: mask_graphics_13, x: 81.3, y: 71.4}).wait(1).to({
            graphics: mask_graphics_14,
            x: 80.9,
            y: 71.4
        }).wait(1).to({graphics: mask_graphics_15, x: 79.7, y: 71.4}).wait(1).to({
            graphics: mask_graphics_16,
            x: 77.6,
            y: 71.3
        }).wait(1).to({graphics: mask_graphics_17, x: 74.7, y: 71.2}).wait(1).to({
            graphics: mask_graphics_18,
            x: 71,
            y: 71.1
        }).wait(1).to({graphics: mask_graphics_19, x: 66.5, y: 70.9}).wait(1).to({
            graphics: mask_graphics_20,
            x: 61.1,
            y: 70.8
        }).wait(1).to({graphics: mask_graphics_21, x: 57.8, y: 70.7}).wait(1).to({
            graphics: mask_graphics_22,
            x: 54.9,
            y: 70.7
        }).wait(1).to({graphics: mask_graphics_23, x: 52.6, y: 70.7}).wait(1).to({
            graphics: mask_graphics_24,
            x: 50.8,
            y: 70.7
        }).wait(1).to({graphics: mask_graphics_25, x: 49.5, y: 70.6}).wait(1).to({
            graphics: mask_graphics_26,
            x: 48.7,
            y: 70.6
        }).wait(1).to({graphics: mask_graphics_27, x: 48.5, y: 70.6}).wait(1));

        // m1_mouth_wide
        this.instance = new m1_mouth_wide("synched", 0);
        this.instance.setTransform(78.7, 184.3, 0.892, 0.913, 0, 9.3, 0.1);

        this.timeline.addTween(egret.Tween.get(this.instance).to({
            scaleX: 0.88,
            scaleY: 0.91,
            skewX: -4.8,
            skewY: -11.8,
            x: 127.2,
            y: 185.6
        }, 6, egret.Ease.get(-1)).to({
            scaleX: 0.88,
            scaleY: 0.9,
            skewX: -13.3,
            skewY: -19,
            x: 156.6,
            y: 186.3
        }, 7, egret.Ease.get(1)).to({
            scaleX: 0.89,
            scaleY: 0.91,
            skewX: 0.5,
            skewY: -7.1,
            x: 108.5,
            y: 185.1
        }, 7, egret.Ease.get(-1)).to({
            scaleX: 0.89,
            scaleY: 0.91,
            skewX: 9.3,
            skewY: 0.1,
            x: 78.7,
            y: 184.3
        }, 7, egret.Ease.get(1)).wait(1));

        // m1_pupil
        this.instance_1 = new m1_pupil("synched", 0);
        this.instance_1.setTransform(98.7, 126.6, 1.397, 1.615, 5);

        this.timeline.addTween(egret.Tween.get(this.instance_1).to({
            scaleY: 1.61,
            rotation: -4.5,
            x: 132.4,
            y: 125.3
        }, 6, egret.Ease.get(-1)).to({rotation: -10.5, x: 152.8, y: 124.6}, 7, egret.Ease.get(1)).to({
            rotation: -0.8,
            x: 119.3,
            y: 125.8
        }, 7, egret.Ease.get(-1)).to({scaleY: 1.62, rotation: 5, x: 98.7, y: 126.6}, 7, egret.Ease.get(1)).wait(1));

        // pupil_pupil
        this.instance_2 = new m1_pupil("synched", 0);
        this.instance_2.setTransform(85.4, 124.5, 1.319, 1.583, 5);

        this.timeline.addTween(egret.Tween.get(this.instance_2).to({
            scaleX: 1.32,
            scaleY: 1.58,
            rotation: -4.5,
            x: 119.3,
            y: 126.7
        }, 6, egret.Ease.get(-1)).to({
            scaleX: 1.32,
            rotation: -10.5,
            x: 139.7,
            y: 128
        }, 7, egret.Ease.get(1)).to({
            scaleY: 1.58,
            rotation: -0.8,
            x: 106.2,
            y: 125.9
        }, 7, egret.Ease.get(-1)).to({rotation: 5, x: 85.4, y: 124.5}, 7, egret.Ease.get(1)).wait(1));

        // m1_eyebrow
        this.instance_3 = new m1_eyebrow("synched", 0);
        this.instance_3.setTransform(120.8, 111, 0.832, 0.705, 0, 28.2, -151.8);

        this.timeline.addTween(egret.Tween.get(this.instance_3).to({
            scaleX: 0.73,
            scaleY: 0.67,
            skewX: 13.6,
            skewY: -166.4,
            x: 146.1,
            y: 106.8
        }, 6, egret.Ease.get(-1)).to({
            scaleX: 0.67,
            scaleY: 0.65,
            skewX: 4.9,
            skewY: -175.1,
            x: 161.3,
            y: 104.3
        }, 7, egret.Ease.get(1)).to({
            scaleX: 0.77,
            scaleY: 0.68,
            skewX: 19.3,
            skewY: -160.7,
            x: 136.3,
            y: 108.5
        }, 7, egret.Ease.get(-1)).to({
            scaleX: 0.83,
            scaleY: 0.71,
            skewX: 28.2,
            skewY: -151.8,
            x: 120.8,
            y: 111
        }, 7, egret.Ease.get(1)).wait(1));

        // m1_eyebrow
        this.instance_4 = new m1_eyebrow("synched", 0);
        this.instance_4.setTransform(74.3, 105, 0.682, 0.522, -8.8);

        this.timeline.addTween(egret.Tween.get(this.instance_4).to({
            scaleX: 0.77,
            scaleY: 0.52,
            rotation: -22.5,
            x: 100.4,
            y: 110.7
        }, 6, egret.Ease.get(-1)).to({
            scaleX: 0.83,
            scaleY: 0.52,
            rotation: -30.8,
            x: 116.2,
            y: 114.2
        }, 7, egret.Ease.get(1)).to({
            scaleX: 0.74,
            scaleY: 0.52,
            rotation: -17.1,
            x: 90.3,
            y: 108.5
        }, 7, egret.Ease.get(-1)).to({
            scaleX: 0.68,
            scaleY: 0.52,
            rotation: -8.8,
            x: 74.3,
            y: 105
        }, 7, egret.Ease.get(1)).wait(1));

        // m1_eyeball L
        this.instance_5 = new m1_eyeball("synched", 0);
        this.instance_5.setTransform(101.6, 126.9, 0.824, 0.824, -2);

        this.timeline.addTween(egret.Tween.get(this.instance_5).to({
            scaleX: 0.82,
            scaleY: 0.82,
            rotation: -11.6,
            x: 134.6,
            y: 126.2
        }, 6, egret.Ease.get(-1)).to({
            scaleX: 0.82,
            scaleY: 0.82,
            rotation: -17.6,
            x: 154.5,
            y: 125.8
        }, 7, egret.Ease.get(1)).to({rotation: -7.8, x: 121.9, y: 126.5}, 7, egret.Ease.get(-1)).to({
            rotation: -2,
            x: 101.6,
            y: 126.9
        }, 7, egret.Ease.get(1)).wait(1));

        // m1_eyeball R
        this.instance_6 = new m1_eyeball("synched", 0);
        this.instance_6.setTransform(83.3, 124.9, 0.824, 0.824, 15.5);

        this.timeline.addTween(egret.Tween.get(this.instance_6).to({
            rotation: 5.8,
            x: 116.2,
            y: 127.9
        }, 6, egret.Ease.get(-1)).to({rotation: 0, x: 135.9, y: 129.9}, 7, egret.Ease.get(1)).to({
            rotation: 9.5,
            x: 103.4,
            y: 126.8
        }, 7, egret.Ease.get(-1)).to({rotation: 15.5, x: 83.3, y: 124.9}, 7, egret.Ease.get(1)).wait(1));

        // m1-jaw
        this.instance_7 = new m1jaw("synched", 0);
        this.instance_7.setTransform(88.6, 167.5, 0.548, 0.551, 0, 9.5, 6.4);

        this.timeline.addTween(egret.Tween.get(this.instance_7).to({
            scaleX: 0.54,
            scaleY: 0.55,
            skewX: 1,
            skewY: -5,
            x: 127.6,
            y: 168
        }, 6, egret.Ease.get(-1)).to({
            scaleX: 0.53,
            scaleY: 0.55,
            skewX: -3.9,
            skewY: -12.1,
            x: 151.2,
            y: 168.3
        }, 7, egret.Ease.get(1)).to({
            scaleX: 0.54,
            scaleY: 0.55,
            skewX: 4.3,
            skewY: -0.5,
            x: 112.5,
            y: 167.8
        }, 7, egret.Ease.get(-1)).to({
            scaleX: 0.55,
            skewX: 9.5,
            skewY: 6.4,
            x: 88.6,
            y: 167.5
        }, 7, egret.Ease.get(1)).wait(1));

        // m1_eyeShadow
        this.instance_8 = new m1_eyeshadow("synched", 0);
        this.instance_8.setTransform(95.1, 125.1, 0.515, 0.549, 0, 6.9, 7.5);

        this.timeline.addTween(egret.Tween.get(this.instance_8).to({
            scaleX: 0.51,
            scaleY: 0.55,
            skewX: -7,
            skewY: -5.8,
            x: 125.4,
            y: 126.7
        }, 6, egret.Ease.get(-1)).to({
            scaleX: 0.5,
            skewX: -15.5,
            skewY: -14,
            x: 143.9,
            y: 127.4
        }, 7, egret.Ease.get(1)).to({
            scaleX: 0.51,
            skewX: -1.5,
            skewY: -0.6,
            x: 113.7,
            y: 126.1
        }, 7, egret.Ease.get(-1)).to({
            scaleX: 0.52,
            scaleY: 0.55,
            skewX: 6.9,
            skewY: 7.5,
            x: 95.1,
            y: 125.1
        }, 7, egret.Ease.get(1)).wait(1));

        // m1_head_1
        this.instance_9 = new m1_head_1("synched", 0);
        this.instance_9.setTransform(98.8, 143.2, 0.543, 0.548, 0, 95.6, 97.6);

        this.timeline.addTween(egret.Tween.get(this.instance_9).to({
            skewX: 86,
            skewY: 88,
            x: 124,
            y: 144.6
        }, 6, egret.Ease.get(-1)).to({skewX: 80, skewY: 82, x: 139.2, y: 145.4}, 7, egret.Ease.get(1)).to({
            skewX: 89.7,
            skewY: 91.5,
            x: 114.3,
            y: 144.1
        }, 7, egret.Ease.get(-1)).to({skewX: 95.6, skewY: 97.6, x: 98.8, y: 143.2}, 7, egret.Ease.get(1)).wait(1));

        // m1_hair
        this.instance_10 = new m1_hair("synched", 0);
        this.instance_10.setTransform(105.7, 116.7, 0.506, 0.551, 0, 9.5, 11.5);

        this.timeline.addTween(egret.Tween.get(this.instance_10).to({
            scaleX: 0.53,
            scaleY: 0.55,
            skewX: -3,
            skewY: -6,
            x: 120.2,
            y: 118.2
        }, 6, egret.Ease.get(-1)).to({
            scaleX: 0.54,
            skewX: -10.8,
            skewY: -16.7,
            x: 128.9,
            y: 119
        }, 7, egret.Ease.get(1)).to({
            scaleX: 0.52,
            scaleY: 0.55,
            skewX: 1.6,
            skewY: 0.6,
            x: 114.6,
            y: 117.6
        }, 7, egret.Ease.get(-1)).to({
            scaleX: 0.51,
            scaleY: 0.55,
            skewX: 9.5,
            skewY: 11.5,
            x: 105.7,
            y: 116.7
        }, 7, egret.Ease.get(1)).wait(1));

        // m1_ear L
        this.instance_11 = new m1_ear1("synched", 0);
        this.instance_11.setTransform(153.6, 143.3, 0.595, 0.573, 0, 5, 13.2);

        this.timeline.addTween(egret.Tween.get(this.instance_11).to({
            scaleX: 0.55,
            scaleY: 0.55,
            skewX: -7.5,
            skewY: -3.3,
            x: 169.8,
            y: 133.9
        }, 6, egret.Ease.get(-1)).to({
            scaleX: 0.52,
            scaleY: 0.54,
            skewX: -15.2,
            skewY: -13.5,
            x: 179.6,
            y: 128.2
        }, 7, egret.Ease.get(1)).to({
            scaleX: 0.57,
            scaleY: 0.56,
            skewX: -2.6,
            skewY: 3,
            x: 163.5,
            y: 137.5
        }, 7, egret.Ease.get(-1)).to({
            scaleX: 0.6,
            scaleY: 0.57,
            skewX: 5,
            skewY: 13.2,
            x: 153.6,
            y: 143.3
        }, 7, egret.Ease.get(1)).wait(1));

        // m1_ear R
        this.instance_12 = new m1_ear1("synched", 0);
        this.instance_12.setTransform(65.9, 129.6, 0.55, 0.549, 0, 5, -171.2);

        this.timeline.addTween(egret.Tween.get(this.instance_12).to({
            scaleX: 0.57,
            scaleY: 0.58,
            skewX: -8.5,
            skewY: -191,
            x: 78.3,
            y: 143.1
        }, 6, egret.Ease.get(-1)).to({
            scaleX: 0.59,
            scaleY: 0.59,
            skewX: -16.8,
            skewY: -203.1,
            x: 85.8,
            y: 151.3
        }, 7, egret.Ease.get(1)).to({
            scaleX: 0.56,
            scaleY: 0.57,
            skewX: -3.3,
            skewY: -183.3,
            x: 73.5,
            y: 137.9
        }, 7, egret.Ease.get(-1)).to({
            scaleX: 0.55,
            scaleY: 0.55,
            skewX: 5,
            skewY: -171.2,
            x: 65.9,
            y: 129.6
        }, 7, egret.Ease.get(1)).wait(1));

        // m1-leg L
        this.instance_13 = new m1leg1("synched", 0);
        this.instance_13.setTransform(100.2, 267.3, 0.64, 0.64, 5, 0, 0, -47, -23);

        this.timeline.addTween(egret.Tween.get(this.instance_13).to({
            regY: -22.9,
            scaleX: 0.54,
            scaleY: 0.66,
            rotation: 0,
            skewX: -23.1,
            skewY: -19,
            x: 145.1,
            y: 264.6
        }, 6, egret.Ease.get(-1)).to({
            regX: -46.8,
            scaleX: 0.47,
            scaleY: 0.68,
            skewX: -42.6,
            skewY: -35.6,
            x: 176,
            y: 262.6
        }, 7, egret.Ease.get(1)).to({
            scaleX: 0.57,
            scaleY: 0.66,
            skewX: -13.1,
            skewY: -10.5,
            x: 129.1,
            y: 265.5
        }, 7, egret.Ease.get(-1)).to({
            regX: -47,
            regY: -23,
            scaleX: 0.64,
            scaleY: 0.64,
            rotation: 5,
            skewX: 0,
            skewY: 0,
            x: 100.2,
            y: 267.3
        }, 7, egret.Ease.get(1)).wait(1));

        // m1-foot L
        this.instance_14 = new m1foot1("synched", 0);
        this.instance_14.setTransform(131.1, 308.5, 0.64, 0.64, 5, 0, 0, 3, -47.9);

        this.timeline.addTween(egret.Tween.get(this.instance_14).to({
            scaleX: 0.64,
            scaleY: 0.64,
            rotation: -46.1,
            x: 184.9,
            y: 290.6
        }, 6, egret.Ease.get(-1)).to({rotation: -81.2, x: 222.1, y: 278.3}, 7, egret.Ease.get(1)).to({
            regY: -47.8,
            scaleX: 0.64,
            scaleY: 0.64,
            rotation: -27.8,
            x: 166,
            y: 297
        }, 7, egret.Ease.get(-1)).to({
            regY: -47.9,
            scaleX: 0.64,
            scaleY: 0.64,
            rotation: 5,
            x: 131.1,
            y: 308.5
        }, 7, egret.Ease.get(1)).wait(1));

        // m1-bod
        this.instance_15 = new monkey_bod1("synched", 0);
        this.instance_15.setTransform(95.9, 174.1, 0.623, 0.623, 57.6, 0, 0, -63.3, -45.8);

        this.timeline.addTween(egret.Tween.get(this.instance_15).to({
            regX: -63.2,
            scaleX: 0.62,
            scaleY: 0.62,
            rotation: 48.4,
            x: 124.8,
            y: 175.2
        }, 6, egret.Ease.get(-1)).to({
            regX: -63.4,
            regY: -45.9,
            scaleX: 0.62,
            scaleY: 0.62,
            rotation: 42.1,
            x: 144.7,
            y: 175.8
        }, 7, egret.Ease.get(1)).to({
            regX: -63.5,
            scaleX: 0.62,
            scaleY: 0.62,
            rotation: 51.7,
            x: 114.5,
            y: 174.7
        }, 7, egret.Ease.get(-1)).to({
            regX: -63.3,
            regY: -45.8,
            scaleX: 0.62,
            scaleY: 0.62,
            rotation: 57.6,
            x: 95.9,
            y: 174.1
        }, 7, egret.Ease.get(1)).wait(1));

        // m1-arm/hand R
        this.instance_16 = new m1armhandcombo1("synched", 0);
        this.instance_16.setTransform(98.6, -1.8, 0.639, 0.639, 0, 17.5, -162.5, 10.2, -107.9);

        this.timeline.addTween(egret.Tween.get(this.instance_16).to({
            skewX: 8.3,
            skewY: -171.7,
            x: 99.5,
            y: 2.7
        }, 6, egret.Ease.get(-1)).to({skewX: 2, skewY: -178, x: 100.2, y: 5.8}, 7, egret.Ease.get(1)).to({
            skewX: 11.5,
            skewY: -168.5,
            x: 99.1,
            y: 1.2
        }, 7, egret.Ease.get(-1)).to({skewX: 17.5, skewY: -162.5, x: 98.6, y: -1.8}, 7, egret.Ease.get(1)).wait(1));

        // m1-arm/hand L
        this.instance_17 = new m1armhandcombo1("synched", 0);
        this.instance_17.setTransform(150.8, 5.5, 0.64, 0.64, 5, 0, 0, 4.8, -115.2);

        this.timeline.addTween(egret.Tween.get(this.instance_17).to({
            rotation: -4,
            x: 151.8,
            y: 1.6
        }, 6, egret.Ease.get(-1)).to({
            regY: -115.4,
            rotation: -10.5,
            x: 152.5,
            y: -1.2
        }, 7, egret.Ease.get(1)).to({
            regY: -115.3,
            rotation: -0.8,
            x: 151.5,
            y: 2.9
        }, 7, egret.Ease.get(-1)).to({regY: -115.2, rotation: 5, x: 150.8, y: 5.5}, 7, egret.Ease.get(1)).wait(1));

        // m1-leg R
        this.instance_18 = new m1leg1("synched", 0);
        this.instance_18.setTransform(76.6, 252.2, 0.546, 0.596, 0, 26.2, -137.6, -39.5, -32.5);

        this.timeline.addTween(egret.Tween.get(this.instance_18).to({
            regX: -39.4,
            scaleX: 0.55,
            skewX: 17,
            skewY: -165.5,
            x: 118.3,
            y: 254.8
        }, 6, egret.Ease.get(-1)).to({
            regX: -39.7,
            regY: -32.4,
            scaleX: 0.54,
            skewX: 10.7,
            skewY: -184.7,
            x: 147.2,
            y: 256.4
        }, 7, egret.Ease.get(1)).to({
            scaleX: 0.55,
            skewX: 20.3,
            skewY: -155.7,
            x: 103.6,
            y: 253.8
        }, 7, egret.Ease.get(-1)).to({
            regX: -39.5,
            regY: -32.5,
            scaleX: 0.55,
            skewX: 26.2,
            skewY: -137.6,
            x: 76.6,
            y: 252.2
        }, 7, egret.Ease.get(1)).wait(1));

        // m1-foot R
        this.instance_19 = new m1foot1("synched", 0);
        this.instance_19.setTransform(39, 272.8, 0.64, 0.64, 0, 65, -115, 5.7, -43.8);

        this.timeline.addTween(egret.Tween.get(this.instance_19).to({
            scaleX: 0.64,
            scaleY: 0.64,
            skewX: 30.1,
            skewY: -149.9,
            x: 82.3,
            y: 289.1
        }, 6, egret.Ease.get(-1)).to({
            regY: -43.9,
            scaleX: 0.64,
            scaleY: 0.64,
            skewX: 6.1,
            skewY: -173.9,
            x: 112.3,
            y: 300.3
        }, 7, egret.Ease.get(1)).to({
            regY: -43.8,
            scaleX: 0.64,
            scaleY: 0.64,
            skewX: 42.4,
            skewY: -137.6,
            x: 67.1,
            y: 283.4
        }, 7, egret.Ease.get(-1)).to({
            scaleX: 0.64,
            scaleY: 0.64,
            skewX: 65,
            skewY: -115,
            x: 39,
            y: 272.8
        }, 7, egret.Ease.get(1)).wait(1));

        // m1-tail
        this.instance_20 = new m1tail1("synched", 0);
        this.instance_20.setTransform(88.7, 267.4, 0.937, 1.063, 0, 28.5, 25.7, 44.1, -50);

        this.timeline.addTween(egret.Tween.get(this.instance_20).to({
            regY: -49.9,
            scaleX: 0.97,
            scaleY: 1.03,
            skewX: -69.7,
            skewY: -67.2,
            x: 138.1,
            y: 265.4
        }, 6, egret.Ease.get(-1)).to({
            regX: 44,
            regY: -50,
            scaleX: 1,
            scaleY: 1,
            skewX: -137.4,
            skewY: -131.1,
            x: 169.2,
            y: 258.9
        }, 7, egret.Ease.get(1)).to({
            scaleX: 0.96,
            scaleY: 1.04,
            skewX: -34.9,
            skewY: -34.3,
            x: 119.4,
            y: 264.1
        }, 7, egret.Ease.get(-1)).to({
            regX: 44.1,
            scaleX: 0.94,
            scaleY: 1.06,
            skewX: 28.5,
            skewY: 25.7,
            x: 88.7,
            y: 267.4
        }, 7, egret.Ease.get(1)).wait(1));
    }
}
class m1_mouth_wide extends createjs.DisplayObjectContainer {
    public shape;
    public shape_1;
    public shape_2;
    public shape_3;

    public constructor(a, b) {
        super();
        this.init();
    }

    public init() {
        // Layer 1 (mask)
        var mask = new createjs.Shape();
        mask._off = true;
        mask.graphics.p("AhcDUQh8gUhjgsQhkgrhDg8QhEg6gchGQgchFAThIIAVASQAWASAtAaQAsAbBEAdQBEAeBeAYQBdAYB3AMQCTANBzAAQBygBBNgHQBOgIAngIIAngIQgQA3gtAvQgsAvhDAiQhCAihTAUQhTATheAEIgeAAQhOAAhSgNg");
        mask.setTransform(3.9, -12.6);

        // Layer 4
        this.shape_2 = new createjs.Shape();
        this.shape_2.graphics.rf(["#E63A00", "#000000"], [0.22, 1], -29.7, 29.5, 0, -29.7, 29.5, 108.5).s().p("AhdDXQh7gUhjgsQhkgshEg8QhEg6gchFQgchGAUhHQADgMAbAOQAbAOAxAdQAwAdBFAiQBFAhBYAcQBYAbBqALQBoAKBegDQBegDBNgIQBNgJA3gIQA3gIAcgBQAcgBgDAMQgRA3gsAvQgtAvhCAiQhDAihTAUQhTAUhdADIgjAAQhLAAhRgMg");
        this.shape_2.setTransform(3.9, -12.9);

        // Layer 3
        this.shape_3 = new createjs.Shape();
        this.shape_3.graphics.f("#FCC0A7").s().p("AhdDXQh7gUhjgsQhkgshEg8QhEg6gchFQgchGAUhHQADgMANANQAOANAiAbQAhAcA/AhQA/AhBlAdQBlAcCVAPQCTAOBrgCQBrgBBHgJQBHgKAogJQAogJAPgDQAPgCgEANQgRA3gsAuQgtAvhCAiQhDAjhTATQhTAUhdADIgfABQhNAAhTgNg");
        this.shape_3.setTransform(3.8, -11.5);

        this.addChild(this.shape_3);
        this.addChild(this.shape_2);
    }
}

class m1_pupil extends createjs.DisplayObjectContainer {
    public shape;

    public constructor(a, b) {
        super();
        this.init();
    }

    public init() {
        this.shape = new createjs.Shape();
        this.shape.graphics.rf(["#BFE7F1", "#000000"], [0, 0.498], -0.2, -0.6, 0, -0.2, -0.6, 2.6).s().p("AgDAWQgJgCgFgIQgFgIACgHQACgJAHgFQAIgFAHABQAJACAFAIQAFAHgCAIQgCAJgHAFQgGAEgGAAIgDAAg");
        this.addChild(this.shape);
    }
}

class m1_eyeball extends createjs.DisplayObjectContainer {
    public shape;

    public constructor(a, b) {
        super();
        this.init();
    }

    public init() {
        // Layer 1
        this.shape = new createjs.Shape();
        this.shape.graphics.rf(["#FFFFFF", "#CBD5E8", "#D9E5F0"], [0.447, 0.898, 1], -1.9, -3.2, 0, -1.9, -3.2, 14.1).s().p("AgWBzQgggHgWgUQgXgVgJgdQgKgdAGgfQAHggAVgXQAUgXAdgKQAcgKAeAGQAgAHAWAUQAWAVAKAdQAKAdgGAfQgHAggVAXQgUAXgdAKQgSAGgSAAQgKAAgMgCg");

        this.addChild(this.shape);
    }
}

class m1_eyebrow extends createjs.DisplayObjectContainer {
    public shape;

    public constructor(a, b) {
        super();
        this.init();
    }

    public init() {
        // Layer 1
        this.shape = new createjs.Shape();
        this.shape.graphics.f("#482D00").s().p("AELBEQhQhbiBgmQh+gnhvA9QhiA0ggBpIAEgaQAch7Bug8QBug9B/AnQCAAmBIBxQAcAtANAuQgPgcgdghg");
        this.shape.setTransform(11.8, 3.6, 0.431, 0.431);

        this.addChild(this.shape);
    }
}

class m1jaw extends createjs.DisplayObjectContainer {
    public shape;

    public constructor(a, b) {
        super();
        this.init();
    }

    public init() {
        // Layer 1
        this.shape = new createjs.Shape();
        this.shape.graphics.rf(["#FFDFC8", "#FFA360", "#CB5234", "#E1A477"], [0, 0.596, 0.847, 0.988], -3, -9.4, 0, -3, -9.4, 121.5).s().p("AguJGQnLgfk3jBQk3jAAUjvQATjyFTiUQFSiVHJAfQHMAfE3DAQE3DBgUDvQgTDylTCUQkYB7lrAAQhMAAhNgFg");

        this.addChild(this.shape);
    }
}

class m1_eyeshadow extends createjs.DisplayObjectContainer {
    public shape;

    public constructor(a, b) {
        super();
        this.init();
    }

    public init() {
        // Layer 1
        this.shape = new createjs.Shape();
        this.shape.graphics.lf(["#964D25", "#FE8849", "#FFDFC8"], [0, 0.482, 1], 1.3, -31.8, -1.2, 31.8).s().p("ACkEOQhDgIgzgpQgbgWgTgdQgSAdgbAWQgzAphDAIQhFAHg5gfQg6gegng6Qglg5gIhMQgHhJAahAQAbhCAzgoQAzgrBDgIQBDgGA6AeQA4AdAjA2QAkg2A4gdQA6geBDAGQBDAIAzArQAzAoAbBCQAaBAgHBJQgIBMgmA5QgmA6g6AeQgvAZg1AAIgagBg");

        this.addChild(this.shape);
    }
}

class m1_head_1 extends createjs.DisplayObjectContainer {
    public shape;

    public constructor(a, b) {
        super();
        this.init();
    }

    public init() {
        // Layer 1
        this.shape = new createjs.Shape();
        this.shape.graphics.rf(["#FED3AB", "#FE9156", "#333333"], [0, 0.596, 1], -6.6, 0.7, 0, -6.6, 0.7, 84.2).s().p("AAyKJQm1gBjZitQjaiuAIktQAIk0EVitQEPioFNAKQHglBBcJTQB7BjAfCRQBFE3j9FjQiUDQipAAQh4AAiChog");
        this.shape.setTransform(-7.7, -0.9);

        this.addChild(this.shape);
    }
}

class m1_hair extends createjs.DisplayObjectContainer {
    public shape;

    public constructor(a, b) {
        super();
        this.init();
    }

    public init() {
        // Layer 1
        this.shape = new createjs.Shape();
        this.shape.graphics.rf(["#000000", "#FF6600"], [0.478, 1], 0.4, 49.9, 0, 0.4, 49.9, 91.5).s().p("AskHXQgSh5BygSQg1iphVB1QASjdCYAdQgKhahjgSQBYhvBGACQgxh+BWhtQBDCSAvgJQg1iFCUh9QA1CNBLhJQBKhKhhhBQByiACDCuQBbi4CQBSQhiBiBMBAQBMBAAzjUQC1BMhKDDQBxg7Afg6QCmCCiACgQCdAGAXCsQhtgTAVCNQAVCMBxhtQA2DqiHgKQALBsBdhKQAHDckTgYIztAIQArjgilA4g");
        this.shape.setTransform(0, 0.2);

        this.addChild(this.shape);
    }
}

class m1_ear1 extends createjs.DisplayObjectContainer {
    public shape;
    public shape_1;

    public constructor(a, b) {
        super();
        this.init();
    }

    public init() {
        // Layer 1
        this.shape = new createjs.Shape();
        this.shape.graphics.rf(["#964D25", "#FE8849", "#FFDFC8"], [0, 0.482, 1], -38, -0.6, 0, -38, -0.6, 50).s().p("AkMEZQgpgWggglIg3g/QAKikBfiFQCAi0DdgJQAqgDAsAEQCiAQBFCLQAeA9gLBFQgXCIhlBhQhsBmiTAcQgqAHgqAAQhqAAhdgwg");
        this.shape.setTransform(2.3, -1.4);

        // Layer 2
        this.shape_1 = new createjs.Shape();
        this.shape_1.graphics.f("#FEC8AB").s().p("AmpDXQAJg7AQg6QASg+Ajg0QAig2AxgtQAsgmAygcQA1gdA5gRQA+gQBCgCQA9gCA9AHQA/AKAxAWQAyAVAcApQAcApAVA8QAVA6m3ByQj1BBh0AoIhPAPIAEggg");
        this.shape_1.setTransform(-2.7, -10.3);

        this.addChild(this.shape_1);
        this.addChild(this.shape);
    }
}

class m1leg1 extends createjs.DisplayObjectContainer {
    public shape;

    public constructor(a, b) {
        super();
        this.init();
    }

    public init() {
        // Layer 1
        this.shape = new createjs.Shape();
        this.shape.graphics.rf(["#FFDFC8", "#FFA360", "#CB5234", "#482D00"], [0, 0.596, 0.847, 0.988], -6.2, 2.2, 0, -6.2, 2.2, 45).s().p("AAwGgQgegTABgrIAAgBQAAgHAFgGQGMm3hsiEIAAAAQh4iDp9CpIAAAAQgHACgGgDIgBAAQgGgDgDgGIAAgBQgDgGABgHIAAAAQAWhtCfhNIAAAAIAGgCIAAAAQJ0hVBoDUIgBAAQBvDQmlHtQgFAGgIABIAAAAIgTABQglAAgVgPg");
        this.shape.setTransform(-0.7, -0.7);

        this.addChild(this.shape);
    }
}

class m1foot1 extends createjs.DisplayObjectContainer {
    public instance;
    public instance_1;
    public instance_2;
    public instance_3;
    public shape;

    public constructor(a, b) {
        super();
        this.init();
    }

    public init() {
        // Layer 4
        this.instance = new m1finger("synched", 0);
        this.instance.setTransform(-15.1, -31.8, 0.807, 0.471, 0, -47.5, -65.6);

        // Layer 1
        this.shape = new createjs.Shape();
        this.shape.graphics.rf(["#FFDFC8", "#FFA360", "#CB5234", "#E1A477"], [0, 0.596, 0.847, 0.988], 2.7, 9.1, 0, 2.7, 9.1, 26.5).s().p("AiKFbQg3kZgVjGQgLicAuhVQBWh5BoCbIC+HUQAmCOgyA+QgNAfhpAmQhEAZgtAAQhTAAgNhQg");
        this.shape.setTransform(8, -9.6);

        // Layer 3
        this.instance_1 = new m1finger("synched", 0);
        this.instance_1.setTransform(11.1, 38.8, 0.637, 0.841, 0, 18.6, 22.1);

        this.instance_2 = new m1finger("synched", 0);
        this.instance_2.setTransform(26, 31.8, 0.518, 0.765, 0, -1, 6.1);

        this.instance_3 = new m1finger("synched", 0);
        this.instance_3.setTransform(30.7, 22.5, 0.507, 0.569, 0, -4, -0.6);

        this.addChild(this.instance_3);
        this.addChild(this.instance_2);
        this.addChild(this.instance_1);
        this.addChild(this.shape);
        this.addChild(this.instance);
    }
}

class monkey_bod1 extends createjs.DisplayObjectContainer {
    public shape;
    public shape_1;

    public constructor(a, b) {
        super();
        this.init();
    }

    public init() {
        // Layer 4
        this.shape = new createjs.Shape();
        this.shape.graphics.f("rgba(72,45,0,0.302)").s().p("AkqBqIFooFQBtgECAAeQgSI2lhDnQiDh0hfi+g");
        this.shape.setTransform(-36.5, -14.9);

        // Layer 2
        this.shape_1 = new createjs.Shape();
        this.shape_1.graphics.rf(["#FFDFC8", "#FFA360", "#CB5234", "#482D00"], [0, 0.596, 0.847, 0.988], -9.6, -3.5, 0, -9.6, -3.5, 52.6).s().p("ADWIzQk2gbkWjdQj4jHg+jnQg2jRCBiAQB6h5DnAIQDtAIDuCKQEJCXCDDiQBCBvAPBjQATB8g8BlQgkA8g2AnQhoBKisAAQgkAAgngDg");

        this.addChild(this.shape_1);
        this.addChild(this.shape);
    }
}

class m1armhandcombo1 extends createjs.DisplayObjectContainer {
    public instance;
    public instance_1;
    public instance_2;
    public instance_3;
    public shape;

    public constructor(a, b) {
        super();
        this.init();
    }

    public init() {
        this.instance = new m1finger("synched", 0);
        this.instance.setTransform(2.1, -85.2, 1, 0.756, -30);

        this.instance_1 = new m1finger("synched", 0);
        this.instance_1.setTransform(-6, -106.9, 0.59, 1.311, 0, -11, -7.6);

        this.instance_2 = new m1finger("synched", 0);
        this.instance_2.setTransform(12.8, -108.3, 0.566, 1.241, 0, -11, -7.6);

        this.instance_3 = new m1finger("synched", 0);
        this.instance_3.setTransform(25, -119.8, 0.514, 1.088, 0, -21.1, -17.6);

        this.shape = new createjs.Shape();
        this.shape.graphics.lf(["#FFDFC8", "#FFA360", "#CB5234", "#482D00"], [0, 0.596, 0.847, 0.988], -8.9, -5, 15.8, -1.5).s().p("AiDUEIAAACIiVhIQEIxyC1yDIAijeIAXANIA7AQIgWDqQh4SYjnSMg");
        this.shape.setTransform(-20.3, 25.1);

        this.addChild(this.shape);
        this.addChild(this.instance_3);
        this.addChild(this.instance_2);
        this.addChild(this.instance_1);
        this.addChild(this.instance);
    }
}

class m1tail1 extends createjs.DisplayObjectContainer {
    public shape;
    public shape_1;

    public constructor(a, b) {
        super();
        this.init();
    }

    public init() {
        // Layer 1
        this.shape = new createjs.Shape();
        this.shape.graphics.rf(["#FFDFC8", "#FFA360", "#CB5234", "#E1A477"], [0, 0.596, 0.847, 0.988], -46, 62.5, 0, -46, 62.5, 66.6).s().p("AAAAAIAAAAIAAAAg");
        this.shape.setTransform(46.4, -58.3);

        this.shape_1 = new createjs.Shape();
        this.shape_1.graphics.rf(["#FFDFC8", "#FFA360", "#7C2C21"], [0, 0.596, 1], -2.1, 7.1, 0, -2.1, 7.1, 60).s().p("Aj3JGQiGgYg/hqQg8hoAkiFQAchnBQhTIAAAAQBmhoCMg1QB2guB1g5QBqg0BYhQIABgBQBOhIgIhZQgCgSANgRQAOgSAUgFIAAAAQAVgHAPAIIAAAAQAQAIACASQANCJh6BuQhoBeh8A+IAAAAQh6A7h8AwIgBABQhuAqhQBRQg6A8gUBLIgBACQgbBkAuBOQAvBRBmATQBWAPBWg4QBeg/ACheIAAgCQABhjhjgUQhRgQgtBHQgLASgUAJIAAAAQgTAIgSgEIgBgBQgRgFgEgRIAAAAQgEgRAKgRQBaiXCiAhIACAAQCdAhgECaQgDCWiXBjIgBAAQhjBChlAAQgcAAgbgFg");

        this.addChild(this.shape_1);
        this.addChild(this.shape);
    }
}

class m1finger extends createjs.DisplayObjectContainer {
    public shape;

    public constructor(a, b) {
        super();
        this.init();
    }

    public init() {
        // Layer 1
        this.shape = new createjs.Shape();
        this.shape.graphics.rf(["#FFDFC8", "#FFA360", "#CB5234", "#482D00"], [0, 0.596, 0.847, 0.988], 2.1, -0.8, 0, 2.1, -0.8, 25.8).s().p("AgcDKQhhgpg8hYQg8hWAMhUQAMhTBNgfQBOgeBfAoQBhApA8BYQA8BWgMBTQgMBUhNAfQghANglAAQgxAAg2gXg");

        this.addChild(this.shape);
    }
}
