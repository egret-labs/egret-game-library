class GameUser extends egret.Sprite {
    private id: number;
    private otherID: number;
    private container: egret.Sprite;
    private container2: egret.Sprite;
    private sendMessage: Function;
    private intervalID: number;
    private text: egret.TextField;
    private text2: egret.TextField;
    private startTime: number;
    constructor(id: number, sendMessage: Function) {
        super();
        this.id = id;
        if (this.id == 0) {
            this.otherID = 1;
        } else {
            this.otherID = 0;
        }
        this.sendMessage = sendMessage;

        this.once(egret.Event.ADDED_TO_STAGE, this.init, this)
    }
    private init() {
        var container = new egret.Sprite();
        this.container = container;
        this.addChild(container);
        var container2 = new egret.Sprite();
        this.container2 = container2;
        this.addChild(container2);


        var bmp = new egret.Bitmap();
        var bmp2 = new egret.Bitmap();
        if (this.id == 0) {
            bmp.texture = RES.getRes('user1_png');
            container.x = (this.stage.stageWidth / 2) - 300;

            bmp2.texture = RES.getRes('user2_png');
            container2.x = (this.stage.stageWidth / 2) + 100;
        } else {
            bmp.texture = RES.getRes('user2_png');
            container.x = (this.stage.stageWidth / 2) + 100;

            bmp2.texture = RES.getRes('user1_png');
            container2.x = (this.stage.stageWidth / 2) - 300;

        }
        container.y = this.stage.stageHeight - 100;
        container.addChild(bmp);

        container2.y = this.stage.stageHeight - 100;
        container2.addChild(bmp2);


        var text = new egret.TextField();
        this.text = text;
        text.x = bmp.x;
        container.addChild(text);

        var text2 = new egret.TextField();
        this.text2 = text2;
        text2.x = bmp2.x;
        container2.addChild(text2);



        this.intervalID = setInterval(() => {
            this.sendEventMessage("msgInit");
        }, 500)

    }
    private words0 = ['你好', '我是白鹭，你呢？', '白日依山尽', '欲穷千里目', '再见!'];
    private words1 = ['你好', '我是MatchVs', '黄河入海流', '更上一层楼', '再见!'];

    public getMessage(info: string) {
        console.log('收到消息', info)
        if (info.indexOf("msgInit") > -1) {
            if (this.id == 0) {//0号先说话
                clearInterval(this.intervalID);
                this.sendWord(0);
                this.showWord(0);
                // setTimeout(() => {
                //     this.showWord2(0);
                // }, 500)
            }
        } else if (info.indexOf('wordID') > -1) {
            clearInterval(this.intervalID);
            var msg = JSON.parse(info);
            var wordID = msg.wordID;

            this.showWord2(wordID);

            // if (this.id == 1) {
            //     this.showWord2(wordID);
            // }
            if (this.id == 0) {
                wordID += 1;
            }
            if (wordID == 0) {
                this.text.text = "";
                this.text2.text = "";

                if (this.id == 1) {
                    this.showWord2(0);
                }
            } else if (wordID > 4) {
                wordID = 0;
            }

            // this.showWord(wordID);

            setTimeout(() => {
                // if (this.id == 0) {
                //     this.showWord2(wordID);
                // }
                if (wordID == 0 && this.id == 0) {
                    this.text.text = "";
                    this.text2.text = "";
                }

                this.showWord(wordID);
                this.sendWord(wordID);
            }, 500)
        } else if (info.indexOf('moveDir') > -1) {//移动
            var msg = JSON.parse(info);
            var moveDir = msg.moveDir;
            this.startMove(moveDir);
        }
    }
    private sendWord(wordID: number) {
        this.sendEventMessage(JSON.stringify({ wordID: wordID }))
    }
    private showWord(wordID: number) {
        // egret.log('显示文字：', this.id, wordID, this['words' + this.id][wordID])
        this.text.text += '\r\n' + this['words' + this.id][wordID];
        this.text.y = - this.text.height;
    }
    private showWord2(wordID: number) {
        // egret.log('显示文字：', this.id, wordID, this['words' + this.id][wordID])
        this.text2.text += '\r\n' + this['words' + this.otherID][wordID];
        this.text2.y = - this.text2.height;
    }
    public sendMove(dir: number) {
        this.sendEventMessage(JSON.stringify({ moveDir: dir }))
        var tx = this.container2.x + dir * 100;
        egret.Tween.get(this.container2).to({ x: tx }, 500);
    }
    private startMove(dir: number) {
        var tx = this.container.x + dir * 100;
        egret.Tween.get(this.container).to({ x: tx }, 500);
    }
    private sendEventMessage(msg: string) {
        // console.log('发送消息：', msg)
        this.sendMessage(msg)
    }

}