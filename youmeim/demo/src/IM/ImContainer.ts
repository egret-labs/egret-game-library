namespace youme {
  /**
   * IM 主类
   *
   * @export
   * @class IMContainer
   * @extends {egret.DisplayObjectContainer}
   */
  export class IMContainer extends egret.DisplayObjectContainer {
    // 登录页面
    private loginPanel: youme.LoginPanel
    // 聊天页面
    private roomPanel: youme.RoomPanel
    // IM工具实例
    private _yim: YoumeIM

    constructor() {
      super()
      this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
      // 获取游密SDK utils实例，单例
      this._yim = YoumeIM.getInstance
    }

    private onAddToStage(event: egret.Event) {
      this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
      this.bindImEvents()
      this.createScene()
    }

    private bindImEvents(): void {
      // ========= 监听一些游密IM SDK转发到egret的事件 ======
      // 成功加入房间
      this._yim.addEventListener(youme.ImEvent.ROOM_JOIN_ALL, this.onImJoinRoom, this)
      // 被踢下线事件
      this._yim.addEventListener(youme.ImEvent.ACCOUNT_KICKOFF, this.onImKickoff, this)
      // 成功退出登录事件
      this._yim.addEventListener(youme.ImEvent.ACCOUNT_LOGOUT, this.onImLogout, this)
      // 成功离开房间事件
      this._yim.addEventListener(youme.ImEvent.ROOM_LEAVE_ALL, this.onImLeaveRoom, this)
    }

    private createScene(): void {
      this.loginPanel = new LoginPanel()
      this.addChild(this.loginPanel)
      this.roomPanel = new RoomPanel()
    }

    // 加入房间成功
    private onImJoinRoom(event: youme.ImEvent): void {
      if (this.loginPanel.parent === this) {
        this.removeChild(this.loginPanel)
      }
      this.addChild(this.roomPanel)
    }

    // IM 被踢下线
    private onImKickoff(event: youme.ImEvent): void {
      if (this.roomPanel.parent === this) {
        this.removeChild(this.roomPanel)
      } 
      this.addChild(this.loginPanel)
      alert('你被踢下线')
    }

    // IM 成功退出登录
    private onImLogout(event: youme.ImEvent): void {
      if (this.roomPanel.parent === this) {
        this.removeChild(this.roomPanel)
      }
      this.addChild(this.loginPanel)
    }

    // IM 离开房间
    private onImLeaveRoom(event: youme.ImEvent): void {
      if (this.roomPanel.parent === this) {
        this.removeChild(this.roomPanel)
      }
      this.addChild(this.loginPanel)
    }
  }
}
