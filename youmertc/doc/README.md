# 游密科技 WebRTC SDK for HTML5

本 SDK 对 WebRTC 和游密信令服务器、游密 turn 服务器进行统一封装，开发者申请了游密 appKey 后，使用本 SDK 即可简单快速地实现实时视频和实时语音功能。

## 用法

使用本 SDK 只要四步。

### 第一步：引入 js 文件

**方法一：** 直接引入 `ymrtc.bundle.min.js`：

```html
<script src="path/to/ymrtc.bundle.min.js"></script>
```

**方法二：** 使用 npm ：

```sh
$ npm install youme-webrtc --save
```

### 第二步：初始化

本 SDK 只有一个类：`YMRTC`，只要实例化这个类，就可以使用本 SDK 的全部功能。

若使用**方法一**直接引入 js 文件，可以直接访问 `YMRTC` 类：

```javascript
var rtc = new YMRTC({
    appKey: '[您所申请的 appKey 字符串]',
    video: true  // true 为视频+语音通讯，false 为仅语音通讯
});
```

本 SDK 同时支持 CommonJS 或 AMD 标准，除了上述直接引用，也可以使用这些标准方法初始化：

```javascript
// CommonJS 规范
var YMRTC = require('path/to/ymrtc.bundle.min.js');
var rtc = new YMRTC({
    appKey: '[您所申请的 appKey 字符串]',
    video: true  // true 为视频+语音通讯，false 为仅语音通讯
});
```

或者

```javascript
// AMD 规范
require(['path/to/ymrtc.bundle.min.js'], function(YMRTC) {
    var rtc = new YMRTC({
        appKey: '[您所申请的 appKey 字符串]',
        video: true  // true 为视频+语音通讯，false 为仅语音通讯
    });
});
```

或者，若使用 ES6 或 TypeScript，可以使用 `import`：

```javascript
import YMRTC from 'path/to/ymrtc.bundle.min';

const rtc = new YMRTC({
    appKey: '[您所申请的 appKey 字符串]',
    video: true  // true 为视频+语音通讯，false 为仅语音通讯
});
```

或者，若使用**方法二**使用 npm 引入，则使用本 SDK 的 npm 名称：

```typescript
import YMRTC from 'youme-webrtc';

const rtc = new YMRTC({
    appKey: '[您所申请的 appKey 字符串]',
    video: true  // true 为视频+语音通讯，false 为仅语音通讯
});
```

### 第三步：用户登录、加入房间、初始化本地媒体（本地摄像头和麦克风）

```javascript
// 登录
rtc.login('[用户名]', '[密码]');
// 加入房间，会自动等待登录成功再加入房间
rtc.joinRoom('[房间号]');
// 初始化本地媒体，然后把本地媒体放入 <video>（或 <audio>）
rtc.startLocalMedia().then((stream) => {
    document.getElementById('[<video> 标签的 id]').srcObject = stream;
});
```

更多控制 API 请参看下文的 API 文档，亦可以参看示例代码。

### 第四步：监听事件，播放其他用户传来的视频和语音

```javascript
// 当房间有人加入，或者当你自己刚刚加入了房间
rtc.on('room.update:[房间号]', function (roomId, memberIdList) {
    // memberIdList 为用户ID数组
    memberIdList.forEach(function(memberId) {
        // 监听该位用户的媒体流(stream)变化，若有变则用 <video> （或 <audio>）播放该流
        rtc.on('user.update-stream:' + memberId, function(mId, stream) {
            // 此处省略为该用户新建 <video> 标签的代码
            document.getElementById('[用户 mId 所属 <video> 标签的 id]').srcObject = stream;
        });
    });
});

// 当房间有人退出
rtc.on('room.member-leave:[房间号]', function (roomId, memberId) {
    // memberId 为离开房间的用户ID
    // 此处省略删除该用户所属的 <video> 标签的代码
});
```

本 SDK 含有丰富的事件，并支持“*”通配符来描述一组事件名称。更多事件请参看下文的 API 文档，亦可以参看示例代码。

## 事件机制

本 SDK 提供丰富的事件接口，方便满足不同的需求。同时本 SDK 支持后缀通配符“*”以匹配多种事件。

以上文提及的**成员媒体流更新**事件 `user.update-stream:[成员ID]` 为例，假设需要监听的成员ID名称为 `zhang3`，那么事件名称就是 `user.update-stream:zhang3`。我们可以使用 `on` 接口监听这个事件：

```javascript
ymrtc.on('user.update-stream:zhang3', function(memberId, stream) {
    console.log(memberId); // "zhang3"
    console.log(stream);   // [Object]
});
```

事件名称支持后缀通配符“*”。假设你需要监听所有成员的媒体流更新，可以这么写：

```javascript
ymrtc.on('user.update-stream:*', function(eventFullName, memberId, stream) {
    console.log(eventFullName); // "user.update-stream:zhang3"
    console.log(memberId); // "zhang3"
    console.log(stream);   // [Object]
});
```

如上述代码所示，若使用了通配符，那么回调函数中**第一个参数将会传入这个事件的完整名称**。从第二个参数开始才是事件参数。

如果需要监听所有事件，也可以这么写：

```javascript
ymrtc.on('*', function(eventFullName) {
    console.log(eventFullName); // 事件完整名称，例如 "user.update-stream:zhang3"
    console.log(arguments);  // Array [事件完整名称, 事件参数1, 事件参数2, ...]
});
```

**注：事件名称仅支持把通配符放在最后。** 例如 `user.*:zhang3` 是不能识别的。

本 SDK 在事件名称的设计上多数采用了 `[事件分类].[事件名称]:[某个重要参数]` 的格式，以方便后缀通配符的使用。

# API 文档

以下是完整的 API 文档。

<a name="YMRTC"></a>

## YMRTC
RTC 类

**类型**: 全局类(class)  

* [YMRTC](#YMRTC)
    * [new YMRTC(config)](#new_YMRTC_new)
    * _信令服务器连接_
        * ["event:signaling.status:[status]"](#YMRTC+event_signaling.status_[status])
        * ["event:signaling.ready"](#YMRTC+event_signaling.ready)
    * _成员控制_
        * [.requestUserStream(userId)](#YMRTC+requestUserStream) ⇒ <code>Promise</code>
        * [.getMute(userId)](#YMRTC+getMute) ⇒ <code>boolean</code>
        * [.setMute(userId, isMuted)](#YMRTC+setMute)
        * [.setAllMute(isMuted)](#YMRTC+setAllMute)
        * ["event:user.ice-status:[memberId]:[status]"](#YMRTC+event_user.ice-status_[memberId]_[status])
        * ["event:user.signaling-status:[memberId]:[status]"](#YMRTC+event_user.signaling-status_[memberId]_[status])
        * ["event:user.update-stream:[memberId]"](#YMRTC+event_user.update-stream_[memberId])
        * ["event:user.remove-stream:[memberId]"](#YMRTC+event_user.remove-stream_[memberId])
    * _房间控制_
        * [.joinRoom(roomId)](#YMRTC+joinRoom) ⇒ <code>Promise</code>
        * [.leaveRoom([roomId])](#YMRTC+leaveRoom)
        * [.inRoom(roomId)](#YMRTC+inRoom) ⇒ <code>boolean</code>
        * [.getRoomIdList()](#YMRTC+getRoomIdList) ⇒ <code>Array.&lt;string&gt;</code>
        * [.getRoomMemberIdList(roomId)](#YMRTC+getRoomMemberIdList) ⇒ <code>Array.&lt;string&gt;</code>
        * ["event:room.update:[roomId]"](#YMRTC+event_room.update_[roomId])
        * ["event:room.member-join:[roomId]"](#YMRTC+event_room.member-join_[roomId])
        * ["event:room.member-leave:[roomId]"](#YMRTC+event_room.member-leave_[roomId])
        * ["event:room.join:[roomId]"](#YMRTC+event_room.join_[roomId])
        * ["event:room.join:[roomId]"](#YMRTC+event_room.join_[roomId])
    * _本地媒体控制_
        * [.startLocalMedia()](#YMRTC+startLocalMedia) ⇒ <code>Promise</code>
        * [.pauseLocalMedia()](#YMRTC+pauseLocalMedia)
        * [.pauseLocalVideo()](#YMRTC+pauseLocalVideo)
        * [.pauseLocalAudio()](#YMRTC+pauseLocalAudio)
        * [.resumeLocalMedia()](#YMRTC+resumeLocalMedia)
        * [.resumeLocalVideo()](#YMRTC+resumeLocalVideo)
        * [.resumeLocalAudio()](#YMRTC+resumeLocalAudio)
        * [.isLocalVideoPaused()](#YMRTC+isLocalVideoPaused) ⇒ <code>boolean</code>
        * [.isLocalAudioPaused()](#YMRTC+isLocalAudioPaused) ⇒ <code>boolean</code>
        * [.stopLocalMedia()](#YMRTC+stopLocalMedia)
        * [.getLocalMediaStatus()](#YMRTC+getLocalMediaStatus) ⇒ <code>string</code>
        * [.requestLocalMediaStream()](#YMRTC+requestLocalMediaStream) ⇒ <code>Promise</code>
        * ["event:local-media.status:[status]"](#YMRTC+event_local-media.status_[status])
        * ["event:local-media.has-stream"](#YMRTC+event_local-media.has-stream)
        * ["event:local-media.remove-stream"](#YMRTC+event_local-media.remove-stream)
        * ["event:local-media.pause-video"](#YMRTC+event_local-media.pause-video)
        * ["event:local-media.pause-audio"](#YMRTC+event_local-media.pause-audio)
        * ["event:local-media.resume-video"](#YMRTC+event_local-media.resume-video)
        * ["event:local-media.resume-audio"](#YMRTC+event_local-media.resume-audio)
    * _用户帐户控制_
        * [.login(userId, token)](#YMRTC+login) ⇒ <code>Promise</code>
        * [.logout()](#YMRTC+logout)
        * [.getMyUserId()](#YMRTC+getMyUserId) ⇒ <code>string</code>
        * ["event:account.logged"](#YMRTC+event_account.logged)
        * ["event:account.logging"](#YMRTC+event_account.logging)
        * ["event:account.logout"](#YMRTC+event_account.logout)

<a name="new_YMRTC_new"></a>

### new YMRTC(config)
新建一个游密 RTC 对象。


| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| config | <code>Object</code> |  | 配置 |
| config.appKey | <code>string</code> |  | 游密分配的 appKey |
| [config.userId] | <code>string</code> |  | 可选。用户登录 ID，若在此处直接输入用户ID和密码，则初始化后自动登录 |
| [config.token] | <code>string</code> |  | 可选。用户登录密码，若在此处直接输入用户ID和密码，则初始化后自动登录 |
| [config.roomId] | <code>string</code> |  | 可选。要加入的房间ID，若输入此值，则初始化并登录（自动或手动登录均可）之后自动加入房间 |
| [config.video] | <code>boolean</code> | <code>true</code> | 是否为视频聊天，若为 `false` 则为仅语音聊天 |
| [config.localMediaConstraints] | <code>MediaStreamConstraints</code> |  | 可选。自定义本地媒体的配置，配置项可参看 [mdn 文档](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints) |

<a name="YMRTC+event_signaling.status_[status]"></a>

### "event:signaling.status:[status]"
信令连接状态改变。

**类型**: 事件，由 [<code>YMRTC</code>](#YMRTC) 触发  
**分类**: 信令服务器连接  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| status | <code>string</code> | 新的状态值，状态的取值：<br>  - `disconnected`: 未连接；<br>  - `connecting`: 正在尝试连接；<br>  - `connected`: 已连接；<br>  - `reconnecting`: （掉线后）重新连接；<br>  - `ended`: 用户主动结束了连接。<br> |

<a name="YMRTC+event_signaling.ready"></a>

### "event:signaling.ready"
信令服务器已经成功连接，等同于事件 `signaling.status:connected`

**类型**: 事件，由 [<code>YMRTC</code>](#YMRTC) 触发  
**分类**: 信令服务器连接  
<a name="YMRTC+requestUserStream"></a>

### ymrtc.requestUserStream(userId) ⇒ <code>Promise</code>
异步请求一个成员的媒体流（stream）。若未与此成员建立连接，则等待连接完成，否则直接回调已存在的媒体流。**注意**：中途媒体流对象可能会发生改变，请监听“`user.update-stream`”事件以对界面做出相应的改变。

**类型**: 实例方法(method)，来自 [<code>YMRTC</code>](#YMRTC)  
**分类**: 成员控制  
**完成回调**: <code>MediaStream</code> - 得到的媒体流对象，赋值给 `<video>` 或 `<audio>` 的 `srcObject` 属性即可播放。关于此对象的更多资料，可参阅 [mdn 文档](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream)  
**拒绝回调**: <code>void</code> - 由于会一直等待媒体流，因此暂时未设定请求失败的情况  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| userId | <code>string</code> | 成员ID |

<a name="YMRTC+getMute"></a>

### ymrtc.getMute(userId) ⇒ <code>boolean</code>
获取一个成员的静音状态。

**类型**: 实例方法(method)，来自 [<code>YMRTC</code>](#YMRTC)  
**返回值**: <code>boolean</code> - 是否静音  
**分类**: 成员控制  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| userId | <code>string</code> | 成员ID |

<a name="YMRTC+setMute"></a>

### ymrtc.setMute(userId, isMuted)
为一个成员的音频流设置静音。

**类型**: 实例方法(method)，来自 [<code>YMRTC</code>](#YMRTC)  
**分类**: 成员控制  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| userId | <code>string</code> | 成员ID |
| isMuted | <code>boolean</code> | 是否静音 |

<a name="YMRTC+setAllMute"></a>

### ymrtc.setAllMute(isMuted)
为所有成员的音频流设置静音。

**类型**: 实例方法(method)，来自 [<code>YMRTC</code>](#YMRTC)  
**分类**: 成员控制  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| isMuted | <code>boolean</code> | 是否静音 |

<a name="YMRTC+event_user.ice-status_[memberId]_[status]"></a>

### "event:user.ice-status:[memberId]:[status]"
原生 ICE (RTC.iceConnectionState) 状态有改变，可参阅 [mdn 文档](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/iceConnectionState)

**类型**: 事件，由 [<code>YMRTC</code>](#YMRTC) 触发  
**分类**: 成员控制  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| memberId | <code>string</code> | 状态有改变的成员ID |
| status | <code>string</code> | 新状态，状态的取值请参阅 [mdn 文档](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/iceConnectionState) |

<a name="YMRTC+event_user.signaling-status_[memberId]_[status]"></a>

### "event:user.signaling-status:[memberId]:[status]"
与成员之间的连接协商状态有改变。

**类型**: 事件，由 [<code>YMRTC</code>](#YMRTC) 触发  
**分类**: 成员控制  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| memberId | <code>string</code> | 状态有改变的成员ID |
| status | <code>string</code> | 新状态，状态的取值: <br>  - `new`: 未连接；<br>  - `waiting`: 等待对方连接过来；<br>  - `negotiating`: 正在协商（交换视频格式信息等等）；<br>  - `negotiated`: 协商完成（成功）；<br>  - `failed`: 连接失败。<br> |

<a name="YMRTC+event_user.update-stream_[memberId]"></a>

### "event:user.update-stream:[memberId]"
成员的媒体流有改变，这时需要更新对应成员的 `<video>` 或 `<audio>` 的 srcObject 属性。

**类型**: 事件，由 [<code>YMRTC</code>](#YMRTC) 触发  
**分类**: 成员控制  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| memberId | <code>string</code> | 有改变的成员ID |
| stream | <code>MediaStream</code> | 新的媒体流，把此值赋值给 `<video>` 或 `<audio>` 的 srcObject 属性即可更新媒体流。 |

<a name="YMRTC+event_user.remove-stream_[memberId]"></a>

### "event:user.remove-stream:[memberId]"
成员的媒体流被对方移除，这时对应成员的 `<video>` 或 `<audio>` 的视频或音频播放可能会突然定格或停止，忽略它而不做处理并无大碍，此事件用于防备不时之需。

**类型**: 事件，由 [<code>YMRTC</code>](#YMRTC) 触发  
**分类**: 成员控制  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| memberId | <code>string</code> | 有改变的成员ID |

<a name="YMRTC+joinRoom"></a>

### ymrtc.joinRoom(roomId) ⇒ <code>Promise</code>
加入房间，会自动等待登录成功以及本地媒体初始化完成再加入房间。

**类型**: 实例方法(method)，来自 [<code>YMRTC</code>](#YMRTC)  
**分类**: 房间控制  
**完成回调**: <code>void</code> - 加入房间成功  
**拒绝回调**: <code>void</code> - 由于自动等待登录和本地媒体，因此暂时没有定义失败的情况  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| roomId | <code>string</code> | 房间ID |

<a name="YMRTC+leaveRoom"></a>

### ymrtc.leaveRoom([roomId])
退出房间，并断开房间内成员之间的连接。强制退出，无返回值。

**类型**: 实例方法(method)，来自 [<code>YMRTC</code>](#YMRTC)  
**分类**: 房间控制  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| [roomId] | <code>string</code> | 可选。指定要退出的房间ID，若不指定则退出所有房间 |

<a name="YMRTC+inRoom"></a>

### ymrtc.inRoom(roomId) ⇒ <code>boolean</code>
返回目前是否正在某个房间之内。

**类型**: 实例方法(method)，来自 [<code>YMRTC</code>](#YMRTC)  
**返回值**: <code>boolean</code> - - 是否在房间内  
**分类**: 房间控制  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| roomId | <code>string</code> | 房间ID |

<a name="YMRTC+getRoomIdList"></a>

### ymrtc.getRoomIdList() ⇒ <code>Array.&lt;string&gt;</code>
返回当前已经加入的房间ID列表。

**类型**: 实例方法(method)，来自 [<code>YMRTC</code>](#YMRTC)  
**返回值**: <code>Array.&lt;string&gt;</code> - - 房间ID数组  
**分类**: 房间控制  
<a name="YMRTC+getRoomMemberIdList"></a>

### ymrtc.getRoomMemberIdList(roomId) ⇒ <code>Array.&lt;string&gt;</code>
返回房间内所有成员的ID列表。

**类型**: 实例方法(method)，来自 [<code>YMRTC</code>](#YMRTC)  
**返回值**: <code>Array.&lt;string&gt;</code> - - 成员ID数组  
**分类**: 房间控制  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| roomId | <code>string</code> | 房间ID |

<a name="YMRTC+event_room.update_[roomId]"></a>

### "event:room.update:[roomId]"
房间[roomId]中的成员有更新（有人加入或者离开）。

**类型**: 事件，由 [<code>YMRTC</code>](#YMRTC) 触发  
**分类**: 房间控制  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| roomId | <code>string</code> | 房间ID |
| members | <code>Array.&lt;string&gt;</code> | 房间内所有成员的ID列表 |

<a name="YMRTC+event_room.member-join_[roomId]"></a>

### "event:room.member-join:[roomId]"
一位成员加入了房间[roomId]。

**类型**: 事件，由 [<code>YMRTC</code>](#YMRTC) 触发  
**分类**: 房间控制  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| roomId | <code>string</code> | 房间ID |
| member | <code>string</code> | 加入房间的成员ID |

<a name="YMRTC+event_room.member-leave_[roomId]"></a>

### "event:room.member-leave:[roomId]"
一位成员离开了房间[roomId]。

**类型**: 事件，由 [<code>YMRTC</code>](#YMRTC) 触发  
**分类**: 房间控制  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| roomId | <code>string</code> | 房间ID |
| member | <code>string</code> | 离开房间的成员ID |

<a name="YMRTC+event_room.join_[roomId]"></a>

### "event:room.join:[roomId]"
本帐户进入了房间[roomId]。

**类型**: 事件，由 [<code>YMRTC</code>](#YMRTC) 触发  
**分类**: 房间控制  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| roomId | <code>string</code> | 房间ID |

<a name="YMRTC+event_room.join_[roomId]"></a>

### "event:room.join:[roomId]"
本帐户离开了房间[roomId]。

**类型**: 事件，由 [<code>YMRTC</code>](#YMRTC) 触发  
**分类**: 房间控制  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| roomId | <code>string</code> | 房间ID |

<a name="YMRTC+startLocalMedia"></a>

### ymrtc.startLocalMedia() ⇒ <code>Promise</code>
启动本地媒体。

**类型**: 实例方法(method)，来自 [<code>YMRTC</code>](#YMRTC)  
**分类**: 本地媒体控制  
**完成回调**: <code>MediaStream</code> - 启动成功，获得本地媒体流对象，赋值给 `<video>` 或 `<audio>` 的 `srcObject` 属性即可播放。关于此对象的更多资料，可参阅 [mdn 文档](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream)  
**拒绝回调**: <code>DOMException</code> - 启动失败，获得原生的错误对象。                         具体错误可参见 [mdn 文档](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Return_value)。  
<a name="YMRTC+pauseLocalMedia"></a>

### ymrtc.pauseLocalMedia()
暂停本地媒体（屏蔽摄像头、关闭麦克风）。

**类型**: 实例方法(method)，来自 [<code>YMRTC</code>](#YMRTC)  
**分类**: 本地媒体控制  
<a name="YMRTC+pauseLocalVideo"></a>

### ymrtc.pauseLocalVideo()
暂停本地视频（只屏蔽摄像头，麦克风不变）。

**类型**: 实例方法(method)，来自 [<code>YMRTC</code>](#YMRTC)  
**分类**: 本地媒体控制  
<a name="YMRTC+pauseLocalAudio"></a>

### ymrtc.pauseLocalAudio()
暂停本地视频（只屏蔽麦克风，摄像头不变）。

**类型**: 实例方法(method)，来自 [<code>YMRTC</code>](#YMRTC)  
**分类**: 本地媒体控制  
<a name="YMRTC+resumeLocalMedia"></a>

### ymrtc.resumeLocalMedia()
恢复本地媒体（取消屏蔽摄像头、取消关闭麦克风）。

**类型**: 实例方法(method)，来自 [<code>YMRTC</code>](#YMRTC)  
**分类**: 本地媒体控制  
<a name="YMRTC+resumeLocalVideo"></a>

### ymrtc.resumeLocalVideo()
恢复本地视频（只取消屏蔽摄像头、麦克风不变）。

**类型**: 实例方法(method)，来自 [<code>YMRTC</code>](#YMRTC)  
**分类**: 本地媒体控制  
<a name="YMRTC+resumeLocalAudio"></a>

### ymrtc.resumeLocalAudio()
恢复本地音频（只取消屏蔽麦克风、摄像头不变）。

**类型**: 实例方法(method)，来自 [<code>YMRTC</code>](#YMRTC)  
**分类**: 本地媒体控制  
<a name="YMRTC+isLocalVideoPaused"></a>

### ymrtc.isLocalVideoPaused() ⇒ <code>boolean</code>
返回摄像头是否为屏蔽状态。

**类型**: 实例方法(method)，来自 [<code>YMRTC</code>](#YMRTC)  
**返回值**: <code>boolean</code> - - true: 屏蔽了，false: 没屏蔽  
**分类**: 本地媒体控制  
<a name="YMRTC+isLocalAudioPaused"></a>

### ymrtc.isLocalAudioPaused() ⇒ <code>boolean</code>
返回麦克风是否为屏蔽状态。

**类型**: 实例方法(method)，来自 [<code>YMRTC</code>](#YMRTC)  
**返回值**: <code>boolean</code> - - true: 屏蔽了，false: 没屏蔽  
**分类**: 本地媒体控制  
<a name="YMRTC+stopLocalMedia"></a>

### ymrtc.stopLocalMedia()
停止本地媒体（关掉摄像头和麦克风的电源）。

**类型**: 实例方法(method)，来自 [<code>YMRTC</code>](#YMRTC)  
**分类**: 本地媒体控制  
<a name="YMRTC+getLocalMediaStatus"></a>

### ymrtc.getLocalMediaStatus() ⇒ <code>string</code>
获取本地媒体的当前状态。

**类型**: 实例方法(method)，来自 [<code>YMRTC</code>](#YMRTC)  
**返回值**: <code>string</code> - - `stop`: 未启动，<br>`starting`: 正在尝试启动，`recording`: 已经启动，正在录音和/或录像，`failed`: 启动失败  
**分类**: 本地媒体控制  
<a name="YMRTC+requestLocalMediaStream"></a>

### ymrtc.requestLocalMediaStream() ⇒ <code>Promise</code>
异步请求本地媒体流 (stream)。若本地媒体尚未启动，则等待启动成功，否则直接回调已存在的媒体流。

**类型**: 实例方法(method)，来自 [<code>YMRTC</code>](#YMRTC)  
**分类**: 本地媒体控制  
**完成回调**: <code>MediaStream</code> - 获得本地媒体流赋值给 `<video>` 或 `<audio>` 的 `srcObject` 属性即可播放。关于此对象的更多资料，可参阅 [mdn 文档](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream)  
**拒绝回调**: <code>DOMException</code> - 启动失败，获得原生的错误对象。  
<a name="YMRTC+event_local-media.status_[status]"></a>

### "event:local-media.status:[status]"
本地媒体状态改变。

**类型**: 事件，由 [<code>YMRTC</code>](#YMRTC) 触发  
**分类**: 本地媒体控制  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| status | <code>string</code> | 新的状态值，状态的取值：<br>  - `stop`: 本地媒体已经停止（摄像头和麦克风都已经关掉了）；<br>  - `starting`: 正在尝试启动本地媒体（包括请求权限和初始化设备）；<br>  - `recording`: 本地媒体已经成功启动，正在录像和/或录音；<br>  - `failed`: 失败（可能设备出错，或者用户禁止了摄像头和麦克风权限）。<br> |

<a name="YMRTC+event_local-media.has-stream"></a>

### "event:local-media.has-stream"
本地媒体流已经准备就绪。

**类型**: 事件，由 [<code>YMRTC</code>](#YMRTC) 触发  
**分类**: 本地媒体控制  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| stream | <code>MediaStream</code> | 本地媒体流对象。 |

<a name="YMRTC+event_local-media.remove-stream"></a>

### "event:local-media.remove-stream"
本地媒体流被移除。

**类型**: 事件，由 [<code>YMRTC</code>](#YMRTC) 触发  
**分类**: 本地媒体控制  
<a name="YMRTC+event_local-media.pause-video"></a>

### "event:local-media.pause-video"
本地媒体视频暂停（屏蔽了摄像头，对方只能看到黑屏）。

**类型**: 事件，由 [<code>YMRTC</code>](#YMRTC) 触发  
**分类**: 本地媒体控制  
<a name="YMRTC+event_local-media.pause-audio"></a>

### "event:local-media.pause-audio"
本地媒体音频暂停（关闭了麦克风，使对方听不到声音）。

**类型**: 事件，由 [<code>YMRTC</code>](#YMRTC) 触发  
**分类**: 本地媒体控制  
<a name="YMRTC+event_local-media.resume-video"></a>

### "event:local-media.resume-video"
本地媒体视频恢复（取消暂停状态，摄像头重新亮起来）。

**类型**: 事件，由 [<code>YMRTC</code>](#YMRTC) 触发  
**分类**: 本地媒体控制  
<a name="YMRTC+event_local-media.resume-audio"></a>

### "event:local-media.resume-audio"
本地媒体音频暂停（取消暂停状态，麦克风重新开始采集声音）。

**类型**: 事件，由 [<code>YMRTC</code>](#YMRTC) 触发  
**分类**: 本地媒体控制  
<a name="YMRTC+login"></a>

### ymrtc.login(userId, token) ⇒ <code>Promise</code>
用户登录。

**类型**: 实例方法(method)，来自 [<code>YMRTC</code>](#YMRTC)  
**分类**: 用户帐户控制  
**完成回调**: <code>void</code> - 登录成功  
**拒绝回调**: <code>string</code> - 登录失败，回调失败信息  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| userId | <code>string</code> | 用户ID |
| token | <code>string</code> | 用户密码 |

<a name="YMRTC+logout"></a>

### ymrtc.logout()
用户退出登录，断开所有连接。

**类型**: 实例方法(method)，来自 [<code>YMRTC</code>](#YMRTC)  
**分类**: 用户帐户控制  
<a name="YMRTC+getMyUserId"></a>

### ymrtc.getMyUserId() ⇒ <code>string</code>
获得当前用户ID。

**类型**: 实例方法(method)，来自 [<code>YMRTC</code>](#YMRTC)  
**返回值**: <code>string</code> - - 用户ID。若未登录，则返回空字符串 ''。  
**分类**: 用户帐户控制  
<a name="YMRTC+event_account.logged"></a>

### "event:account.logged"
用户登录成功。

**类型**: 事件，由 [<code>YMRTC</code>](#YMRTC) 触发  
**分类**: 用户帐户控制  
<a name="YMRTC+event_account.logging"></a>

### "event:account.logging"
正在登录。

**类型**: 事件，由 [<code>YMRTC</code>](#YMRTC) 触发  
**分类**: 用户帐户控制  
<a name="YMRTC+event_account.logout"></a>

### "event:account.logout"
已登出。

**类型**: 事件，由 [<code>YMRTC</code>](#YMRTC) 触发  
**分类**: 用户帐户控制  
