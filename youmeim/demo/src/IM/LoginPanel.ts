namespace youme {
  export class LoginPanel extends egret.DisplayObjectContainer {
    private userNameInput: eui.TextInput
    private userTokenInput: eui.TextInput
    private _yim: YoumeIM
    private userRoomInput: eui.TextInput
    private myGroup: eui.Group
    private testUsers: { [userid: string]: string } // 测试账号,账号生成请看Rest Api文档

    public constructor() {
      super()
      this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
      // 测试账号；如何生成用户请看后端接口文档
      this.testUsers = {
        sanji: '10001',
        zoro3000: '10002',
        youme_test201701: '201701',
        youme_test201702: '201702'
      }

      // 获取IM utils实例, 单例
      this._yim = YoumeIM.getInstance
    }

    private onAddToStage(event: egret.Event) {
      this.startCreateScene()
    }

    protected startCreateScene(): void {
      let stageW = this.stage.stageWidth
      let stageH = this.stage.stageHeight

      let topMask = new egret.Shape()
      topMask.graphics.beginFill(0x000000, 0.5)
      topMask.graphics.drawRect(0, 0, stageW, stageH)
      topMask.graphics.endFill()
      this.addChild(topMask)

      let icon: egret.Bitmap = this.createBitmapByName('egret_icon_png')
      this.addChild(icon)
      icon.x = stageW / 2 - 180
      icon.y = 80

      let icon_ym: egret.Bitmap = this.createBitmapByName('youmilogo_png')
      this.addChild(icon_ym)
      icon_ym.scaleX = 1.5
      icon_ym.scaleY = 1.5
      icon_ym.x = stageW / 2 + 70
      icon_ym.y = 123

      let line = new egret.Shape()
      line.graphics.lineStyle(2, 0xffffff)
      line.graphics.moveTo(0, 0)
      line.graphics.lineTo(0, 117)
      line.graphics.endFill()
      line.x = stageW / 2
      line.y = 104
      this.addChild(line)

      const myGroup = new eui.Group()
      myGroup.x = 0
      myGroup.y = 0
      myGroup.width = stageW

      const vLayout = new eui.VerticalLayout()
      vLayout.gap = 30
      vLayout.paddingTop = 300
      vLayout.horizontalAlign = egret.HorizontalAlign.CENTER
      myGroup.layout = vLayout
      this.myGroup = myGroup
      this.addChild(this.myGroup)

      // ==============  标题 ===================
      const titleLabel = new eui.Label()
      titleLabel.text = '登录'
      this.myGroup.addChild(titleLabel)

      // ==============  用户名输入 ===================
      const nameHLayout = new eui.HorizontalLayout()
      nameHLayout.gap = 20
      const nameGroup = new eui.Group()
      nameGroup.layout = nameHLayout

      const nameLabel = new eui.Label()
      nameLabel.text = '用户ID'
      nameGroup.addChild(nameLabel)

      const nameInput = new eui.TextInput()
      nameInput.prompt = '请输入用户名'
      this.userNameInput = nameInput
      nameGroup.addChild(this.userNameInput)
      this.myGroup.addChild(nameGroup)

      // ==============  用户名Radio ===================
      const radioGroup = new eui.Group()
      const tLayout = new eui.TileLayout()
      tLayout.horizontalGap = 10
      tLayout.verticalGap = 10
      tLayout.columnAlign = eui.ColumnAlign.JUSTIFY_USING_WIDTH
      tLayout.rowAlign = eui.RowAlign.JUSTIFY_USING_HEIGHT
      tLayout.paddingTop = 5
      tLayout.paddingRight = 30
      tLayout.paddingLeft = 30
      tLayout.paddingBottom = 10
      tLayout.requestedColumnCount = 2
      radioGroup.layout = tLayout
      this.myGroup.addChild(radioGroup)

      // 监听Radio组change事件
      const radioBtnGrp = new eui.RadioButtonGroup()
      radioBtnGrp.addEventListener(eui.UIEvent.CHANGE, this.onRadioChange, this)

      // 创建用户名radio
      Object.keys(this.testUsers).forEach((userid: string) => {
        const radio = new eui.RadioButton()
        radio.label = userid
        radio.value = userid
        radio.group = radioBtnGrp
        radioGroup.addChild(radio)
      })

      // ==============  token输入 ===================
      const tokenHLayout = new eui.HorizontalLayout()
      tokenHLayout.gap = 20
      const tokenGroup = new eui.Group()
      tokenGroup.layout = tokenHLayout
      this.myGroup.addChild(tokenGroup)

      const tokenLabel = new eui.Label()
      tokenLabel.text = 'Token'
      tokenGroup.addChild(tokenLabel)

      const tokenInput = new eui.TextInput()
      tokenInput.prompt = '请输入token'
      tokenInput.displayAsPassword = true
      this.userTokenInput = tokenInput
      tokenGroup.addChild(this.userTokenInput)

      // ==============  房间输入 ===================
      const roomHLayout = new eui.HorizontalLayout()
      roomHLayout.gap = 20
      const roomGroup = new eui.Group()
      roomGroup.layout = roomHLayout
      this.myGroup.addChild(roomGroup)

      const roomLabel = new eui.Label()
      roomLabel.text = '房间'
      roomGroup.addChild(roomLabel)

      const roomInput = new eui.TextInput()
      roomInput.prompt = '请输入房间号'
      roomInput.text = 'benz'
      this.userRoomInput = roomInput
      roomGroup.addChild(this.userRoomInput)

      // ==============  登录按钮 ===================
      const loginBtn = new eui.Button()
      loginBtn.label = '登录'
      loginBtn.addEventListener(
        egret.TouchEvent.TOUCH_TAP,
        this.onLoginBtnClick,
        this
      )
      this.myGroup.addChild(loginBtn)
    }

    // 登录按钮click事件Handler
    private onLoginBtnClick(event: egret.TouchEvent): void {
      const userId = this.userNameInput.text.trim()
      const token = this.userTokenInput.text.trim()
      const roomId = this.userRoomInput.text.trim()
      if (!userId || !token || !roomId) {
        egret.log('用户名、用户token及room不能为空')
        return
      }
      // IM SDK 登录
      this._yim.userId = userId
      this._yim.roomId = roomId
      this._yim.login(userId, token, roomId)
    }

    // radio组change事件Handler
    private onRadioChange(event: eui.UIEvent): void {
      const radioGroup: eui.RadioButtonGroup = event.target
      const userId: string = radioGroup.selectedValue
      const token: string = this.testUsers[userId]
      this.userNameInput.text = userId
      this.userTokenInput.text = token
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
      let result = new egret.Bitmap()
      let texture: egret.Texture = RES.getRes(name)
      result.texture = texture
      return result
    }
  }
}
