namespace youme {
  /**
   * IM 事件（是游密SDK中的事件转换为egret事件）
   *
   * @export
   * @class IMEvent
   * @extends {egret.Event}
   */
  export class ImEvent extends egret.Event {
    // 消息内容
    private content: any = null
    // 异常消息包括Error对象
    private error: Error = null

    // 一些感兴趣的游密IM 事件名, 具体事件机制请看文档中关于事件机制介绍
    public static ACCOUNT_LOGIN = 'account.login';
    public static ACCOUNT_LOGGING = 'account.logging';
    public static ACCOUNT_LOGOUT = 'account.logout';
    public static ACCOUNT_ERROR_ALL = 'account.error:*';
    public static ACCOUNT_KICKOFF = 'account.kickoff';
    public static ROOM_JOINING_ALL = 'room.joining:*';
    public static ROOM_JOIN_ALL = 'room.join:*';
    public static ROOM_LEAVE_ALL = 'room.leave:*';
    public static ROOM_JOIN_ERROR_ALL = 'room.join-error:*';
    public static ROOM_LEAVE_ERROR_ALL = 'room.leave-error:*';
    public static MESSAGE_ALL = 'message:*';

    constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
      super(type, bubbles, cancelable);
    }

    public setContent(content: any): void {
      this.content = content;
    }

    public getContent(): any {
      return this.content;
    }

    public setError(error: Error): void {
      this.error = error;
    }

    public getError(): Error {
      return this.error;
    }
    
  }
}
