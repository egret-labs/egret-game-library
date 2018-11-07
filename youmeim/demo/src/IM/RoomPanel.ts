namespace youme {

  export class RoomPanel extends egret.DisplayObjectContainer {

    private scroller: eui.Scroller; // 滚动面板
    private list: eui.List; // 滚动面板viewport, 用来存放消息
    private arrayCollection: eui.ArrayCollection;
    private msgInput: eui.TextInput; // 文本消息输入框
    private _yim: YoumeIM;
    private currentVoiceMsg: VoiceMessage; // 当前正在录制的语音
    private playingVoiceMsg: VoiceMessage; // 当前正在播放的语音

    constructor() {
      super();
      // 获取到IM工具类的实例，单例
      this._yim = YoumeIM.getInstance;

      this._yim.addEventListener(youme.ImEvent.MESSAGE_ALL, this.onImMessage, this);
      this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
      const stageW = this.stage.stageWidth;
      const stageH = this.stage.stageHeight;
      const bgImg = new eui.Image(RES.getRes("bg_jpg"));
      this.addChild(bgImg);

      // ============= 顶部操作栏 =============
      const topGroup = new eui.Group();
      topGroup.width = stageW;
      const userNameLabel = new eui.Label();
      userNameLabel.text = "用户名：" + this._yim.userId;
      userNameLabel.size = 18;
      topGroup.addChild(userNameLabel);

      const leaveRoomBtn = new eui.Button();
      leaveRoomBtn.label = "离开房间";
      leaveRoomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeaveRoomBtnClick, this);
      topGroup.addChild(leaveRoomBtn);

      const roomNameLabel = new eui.Label();
      roomNameLabel.text = "房间号：" + this._yim.roomId;
      roomNameLabel.size = 18;
      topGroup.addChild(roomNameLabel);

      const logoutBtn = new eui.Button();
      logoutBtn.label = "退出登录";
      logoutBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLogoutBtnClick, this);
      topGroup.addChild(logoutBtn);

      const topHLayout = new eui.HorizontalLayout();
      topHLayout.gap = 20;
      topHLayout.paddingTop = 8;
      topHLayout.verticalAlign = egret.VerticalAlign.MIDDLE;
      topHLayout.horizontalAlign = egret.HorizontalAlign.JUSTIFY;
      topGroup.layout = topHLayout;

      // ============= 底部操作栏 =============
      const bottomGroup = new eui.Group();
      bottomGroup.width = stageW;
      const micImg = new eui.Image(RES.getRes("contact_mic_png"));
      bottomGroup.addChild(micImg);
      micImg.width = 40;
      micImg.height = 40;
      micImg.left = 10;
      micImg.verticalCenter = 0;
      micImg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.sendVoiceMsgStart, this);
      micImg.addEventListener(egret.TouchEvent.TOUCH_END, this.sendVoiceMsgStop, this);
      micImg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.sendVoiceMsgCancel, this);

      const sendBtn = new eui.Button();
      bottomGroup.addChild(sendBtn);
      sendBtn.label = "发送";
      sendBtn.width = 100;
      sendBtn.right = 10;
      sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendTextMsg, this);

      const msgInput = new eui.TextInput();
      msgInput.prompt = "请输入消息";
      msgInput.width = stageW - micImg.width - sendBtn.width - 40;
      msgInput.horizontalCenter = -30;
      msgInput.verticalCenter = 0;
      this.msgInput = msgInput;
      bottomGroup.addChild(msgInput);

      // ========= 消息中心 ==============
      const scroller = new eui.Scroller();
      this.list = new eui.List();
      this.arrayCollection = new eui.ArrayCollection([]);
      this.list.dataProvider = this.arrayCollection;
      this.list.itemRenderer = youme.MessageRenderer;
      this.list.percentHeight = 100;
      this.list.percentWidth = 100;
      this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onImMessageTaped, this);

      scroller.width = stageW;
      const scrollerHeight = stageH - topGroup.height - bottomGroup.height - 100;
      scroller.height = scrollerHeight;
      scroller.viewport = this.list;
      this.scroller = scroller;

      const group = new eui.Group();
      this.addChild(group);
      group.width = stageW;
      group.addChild(topGroup);
      group.addChild(scroller);
      group.addChild(bottomGroup);

      const vLayout = new eui.VerticalLayout();
      group.layout = vLayout;
    }

    // 点击消息(点击语音消息播放)
    private onImMessageTaped(event: eui.PropertyEvent): void {
      const item = <youme.Tip | MessageObject>this.list.selectedItem;

      if (!(item instanceof youme.Tip)) { // IM消息
        if (item.message.getType() === 'voice') { // 语音消息
          // 停止正在播放的语音消息
          if (this.playingVoiceMsg && this.playingVoiceMsg.isPlaying()) {
            this.playingVoiceMsg.stop();
          }
          const voiceMsg = item.message as VoiceMessage;
          this.playingVoiceMsg = voiceMsg;
          voiceMsg.once('play', evt => {
            const tip = new youme.Tip('开始播放语音');
            this.arrayCollection.addItem(tip);
            egret.log('开始播放语音');
          });

          voiceMsg.once('end-play', evt => {
            const tip = new youme.Tip('语音播放完毕');
            this.arrayCollection.addItem(tip);
            egret.log('语音播放完毕');
          });

          voiceMsg.once('stop', evt => {
            const tip = new youme.Tip('主动停止播放语音');
            this.arrayCollection.addItem(tip);
            egret.log('主动停止播放语音');
          });

          /////////////////////// 播放语音 ////////////////////////////
          voiceMsg.play();
        }
      }
    }

    // IM 收/发消息都在这里接收
    private onImMessage(event: youme.ImEvent) {
      const msg = <MessageObject>event.getContent();
      this.arrayCollection.addItem(msg);
      if (msg.message.getType() === 'voice' && !msg.isFromMe) { // 如果收到语音消息，则自动播放
        const voiceMsg = msg.message as VoiceMessage;
        
        voiceMsg.once('begin-play', evet => {
          const tip = new youme.Tip('开始自动播放一条语音消息');
          this.arrayCollection.addItem(tip);
        });

        voiceMsg.once('end-play', evet => {
          const tip = new youme.Tip('自动播放完一条语音消息');
          this.arrayCollection.addItem(tip);
        });

        voiceMsg.once('next', evet => {
          const tip = new youme.Tip('准备自动播放下一条语音消息');
          this.arrayCollection.addItem(tip);
        });
        //////////////////// 把语音消息加入到自动播放列表 //////////////////
        VoiceMessage.addToAutoPlayQueue(voiceMsg);
      }
    }

    // 发送文本消息
    private sendTextMsg(): void {
      const text: string = this.msgInput.text;
      if (!text) {
        const tip = new youme.Tip('要发送的消息不能为空');
        this.arrayCollection.addItem(tip);
        return;
      }
      const msg = new TextMessage(text);
      this._yim.sendToRoom(this._yim.roomId, msg).catch(e => {
        egret.log(YoumeIM.getErrorMsg(e.name));
        const tip = new youme.Tip(e.name + ': ' + YoumeIM.getErrorMsg(e.name));
        this.arrayCollection.addItem(tip);
      });
    }

    // 发送语音消息(按下语音键)
    private sendVoiceMsgStart(): void {
      const tip = new youme.Tip('开始录音');
      this.arrayCollection.addItem(tip);

      this.currentVoiceMsg = new VoiceMessage();
      if (this.currentVoiceMsg) {
        this.currentVoiceMsg.startRecord().catch(e => {
          const tip = new youme.Tip(e.name + ': ' + YoumeIM.getErrorMsg(e.name));
          this.arrayCollection.addItem(tip);
        });
      }
    } 

    // 结束发送语音消息(松开语音键)
    private sendVoiceMsgStop(): void {
      if (this.currentVoiceMsg) {
        const tip = new youme.Tip('结束录音');
        this.arrayCollection.addItem(tip);
        this.currentVoiceMsg.finishRecord().catch(e => {
          const tip = new youme.Tip(e.name + ": " + YoumeIM.getErrorMsg(e.name));
          this.arrayCollection.addItem(tip);
        });
        this._yim.sendToRoom(this._yim.roomId, this.currentVoiceMsg).catch(e => {
          const tip = new youme.Tip(e.name + ": " + YoumeIM.getErrorMsg(e.name));
          this.arrayCollection.addItem(tip);
        });
      }
    }

    // 取消发送语音消息
    private sendVoiceMsgCancel(): void {
      if (this.currentVoiceMsg) {
        this.currentVoiceMsg.cancelRecord();
        const tip = new youme.Tip('取消录音');
        this.arrayCollection.addItem(tip);
      }
    }

    // 离开房间
    private onLeaveRoomBtnClick(event: egret.TouchEvent): void {
      this._yim.leaveRoom(this._yim.roomId);
    }

    // 退出登录
    private onLogoutBtnClick(event: egret.TouchEvent): void {
      this._yim.logout();
    }
  }
}
