class RTC {
  private roomId: string = 'youme_egret'
  private ymrtc: YMRTC

  private static YM_APPKEY: string = "YOUME00AD8574CEB27E309DBBEA4A3BA29B6A2FB804CB";
  private static APIKEY: string = "57cb1ba285b54bee318fe2e1d3db83e4";// 实际使用时，API KEY只需要放到服务器端，用于token计算

  constructor() {
    // 初始化
    this.ymrtc = new YMRTC({
      appKey: RTC.YM_APPKEY,
      video: false // true - 音频+视频，false - 仅语音
    })
    this.initEventListener()
  }

  private E(id: string): HTMLElement {
    return document.getElementById(id);
  }

  // ==================== Token 计算演示 ======================
  private genToken(appkey: string, apikey: string, userid: string) {
    const sha1src = appkey + apikey + userid;
    const token = CryptoJS.SHA1(sha1src).toString(CryptoJS.enc.Hex);
    return token;
  }
  // ==================== End Token 计算演示 ==================

  public login(userId: string): void {
    let token = this.genToken(RTC.YM_APPKEY, RTC.APIKEY, userId);
    // 登录
    this.ymrtc.login(userId, token).catch(() => {
      egret.log('登录失败')
    })
  }

  public joinRoom() {
    // 加入房间，会自动等待登录成功后再加入房间
    if (this.ymrtc.inRoom(this.roomId)) {
      return
    }
    this.ymrtc.joinRoom(this.roomId)
  }

  public startLocalMedia() {
    // 打开本地音频
    this.ymrtc.startLocalMedia()
      .then((stream: MediaStream) => {
        let audioDom: HTMLAudioElement = this.E('localAudio') as HTMLAudioElement
        if (audioDom) {
          audioDom.srcObject = stream
          return
        }
        audioDom = document.createElement('audio')
        audioDom.id = 'localAudio'
        audioDom.autoplay = true
        audioDom.muted = true
        audioDom.srcObject = stream
        document.body.appendChild(audioDom)
      })
      .catch(err => {
        // 浏览器禁用了摄像头和麦克风的访问权限，或者页面没有使用 https 协议，请检查设置。
        // 没有找到摄像头或麦克风，请检查它们的连接。
        if (err.name === 'NotAllowedError') {
          egret.log(
            '浏览器禁用了摄像头和麦克风的访问权限，或者页面没有使用 https 协议'
          )
        } else if (err.name === 'NotFoundError') {
          egret.log('没有找到摄像头或麦克风，请检查它们的连接')
        } else {
          egret.log('错误' + err.name)
        }
      })
  }

  // 打开麦克风
  public openMic(): void {
    if (this.ymrtc.isLocalAudioPaused()) {
      this.ymrtc.resumeLocalAudio()
    }
    egret.log('开启麦克风')
  }

  // 关闭麦克风
  public closeMic(): void {
    if (!this.ymrtc.isLocalAudioPaused()) {
      this.ymrtc.pauseLocalAudio()
    }
    egret.log('关闭麦克风')
  }

  public levelRoom() {
    if (this.ymrtc.inRoom(this.roomId)) {
      this.ymrtc.leaveRoom(this.roomId)
    }
    egret.log(`离开房间:${this.roomId}`)
  }

  public quit() {
    this.ymrtc.logout()
    this.ymrtc.stopLocalMedia()
    egret.log('退出房间')
  }

  private initEventListener(): void {
    // 事件监听：登录、登出
    this.ymrtc.on('account.logged', () => {
      egret.log(`登录${this.ymrtc.getMyUserId()}`)
    })

    this.ymrtc.on('account.logout', () => {
      egret.log(`登出`)
    })

    this.ymrtc.on('account.logging', () => {
      egret.log('正在登录')
    })

    // 事件监听：信令状态
    this.ymrtc.on('signaling.status:*', (eventFullName, status) => {
      egret.log(`信令状态：${status}`)
    })

    // 事件监听：本地媒体状态
    this.ymrtc.on('local-media.status:*', (eventFullName, status) => {
      egret.log(`本地媒体状态：${status}`)
    })

    // 事件监听：加入、退出房间
    this.ymrtc.on('room.join:*', (eventFullName, roomId) => {
      // 自己加入了房间
      egret.log(`自己加入房间:${roomId}`)
    })

    this.ymrtc.on('room.leave:*', (eventFullName, roomId) => {
      // 自己退出了房间
      egret.log(`自己退出了房间：${roomId}`)
    })

    // 事件监听：用户进入与、退出房间
    this.ymrtc.on('room.member-join:*', (eventFullName, roomId, memberId) => {
      // 其他用户加入了房间
      egret.log(`事件：${eventFullName} 用户${memberId}加入了房间${roomId}`)
      let memberDom: HTMLAudioElement = this.E('remote-' + memberId) as HTMLAudioElement
      if (!memberDom) {
        memberDom = document.createElement('audio')
        memberDom.autoplay = true
        memberDom.id = 'remote-' + memberId
        memberDom.className = 'remote-stream'
        document.body.appendChild(memberDom)
      }
      // 把 stream 放入 <audio>
      this.ymrtc.requestUserStream(memberId).then((stream: MediaStream) => {
        memberDom.srcObject = stream
      })

      // 更新stream
      this.ymrtc.on(
        'user.update-stream:' + memberId,
        (mId: string, stream: MediaStream) => {
          memberDom.srcObject = stream
        }
      )
    })

    this.ymrtc.on('room.member-leave:*', (eventFullName, roomId, memberId) => {
      // 其他用户离开了房间
      egret.log(`事件：${eventFullName} 用户${memberId}离开了房间${roomId}`)
      const audioDom = this.E('remote-' + memberId)
      // 移除媒体元素
      audioDom.parentNode.removeChild(audioDom)
    })

    // 事件监听：用户状态
    this.ymrtc.on('user.ice-status:*', (eventFullName, userId, status) => {
      egret.log(`用户:${userId}的状态:${status}`)
    })

    this.ymrtc.on(
      'usere.signaling-status:*',
      (eventFullName, userId, status) => {
        // 信令握手状态
        egret.log(`信令握手状态:${status}`)
      }
    )
  }
}
