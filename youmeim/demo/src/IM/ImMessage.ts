/*
 * @Author: fan.li 
 * @Date: 2018-10-18 17:02:42 
 * @Last Modified by: fan.li
 * @Last Modified time: 2018-10-18 19:04:21
 * 
 * 文本气泡，发送/接收文本消息后上屏显示
 */

namespace youme {

  export class ImMessage extends eui.Group {
    private _msg: MessageObject;

    public constructor(msg: MessageObject) {
      super();
      this._msg = msg;
      this.touchChildren = true;
      this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addMessageUI, this);
    }

    private addMessageUI(): void {
      switch(this._msg.message.getType()) {
        case 'text':
          this._addTextMessage();
          break;
        case 'voice':
          this._addVoiceMessage();
          break;
        default:
          this._addUnknowMessage();
      }
    }

    // 文本消息上屏
    private _addTextMessage(): void {
      if (this._msg.isFromMe) {
        this.right = 0;
      } else {
        this.left = 0;
      }

      const userNameLabel = new eui.Label();
      this.addChild(userNameLabel);
      userNameLabel.text = this._msg.senderId;
      userNameLabel.size = 18;

      const msgText = new eui.Label();
      this.addChild(msgText);

      const textMsg = <TextMessage>this._msg.message;
      msgText.text = textMsg.getContent();
      msgText.size = 20;
      msgText.textColor = 0x000000; msgText.y = userNameLabel.height + 18;

      const shape = new egret.Shape();
      this.addChild(shape);
      shape.alpha = 0.2;
      shape.graphics.beginFill(0xf08080);
      shape.graphics.drawRoundRect(0, 0, this.width, this.height, 10,  10);
      shape.graphics.endFill();
    }

    // 语音消息上屏(并自动播放)
    private _addVoiceMessage(): void {
      if (this._msg.isFromMe) {
        this.right = 0;
      } else {
        this.left = 0;
      }

      const userNameLabel = new eui.Label();
      this.addChild(userNameLabel);
      userNameLabel.text = this._msg.senderId;
      userNameLabel.size = 18;

      const voiceMsg = <VoiceMessage>this._msg.message;
      const msgText = new eui.Label();
      this.addChild(msgText);
      msgText.size = 22;
      msgText.textColor = 0xFF6347;
      msgText.text = voiceMsg.getDuration() + '秒语音';
      msgText.y = userNameLabel.height + 18;

      const shape = new egret.Shape();
      this.addChild(shape);
      shape.alpha = 0.2;
      shape.graphics.beginFill(0x33ff00);
      shape.graphics.drawRoundRect(0, 0, this.width, this.height, 10, 10);
      shape.graphics.endFill();
    }

    // 未知消息信息上屏(可能是用户自定义的消息)
    private _addUnknowMessage(): void {
      if (this._msg.isFromMe) {
        this.right = 0;
      } else {
        this.left = 0;
      }

      const label = new eui.Label();
      this.addChild(label);
      label.text = '未知格式的消息' + this._msg.message.getType();
      label.size = 18;

      const shape = new egret.Shape();
      this.addChild(shape);
      shape.alpha = 0.2;
      shape.graphics.beginFill(0x33ff00);
      shape.graphics.drawRoundRect(0, 0, this.width, this.height, 10, 10);
      shape.graphics.endFill();
    }
  }
}
