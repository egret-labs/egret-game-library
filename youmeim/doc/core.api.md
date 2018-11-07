## 类 (class)

<dl>
<dt><a href="#YIM">YIM</a></dt>
<dd><p>YIM 类</p>
</dd>
</dl>

## 自定义类型 (typedef)

<dl>
<dt><a href="#InitConfig">InitConfig</a></dt>
<dd><p>初始化 YIM 对象的配置</p>
</dd>
<dt><a href="#MessageObject">MessageObject</a></dt>
<dd><p>消息对象</p>
</dd>
</dl>

<a name="YIM"></a>

## YIM
YIM 类

**类型**: 全局类(class)  

* [YIM](#YIM)
    * _instance_
        * [.init(config)](#YIM+init) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.uninit()](#YIM+uninit)
        * [.isLogging()](#YIM+isLogging) ⇒ <code>boolean</code>
        * [.isLogged()](#YIM+isLogged) ⇒ <code>boolean</code>
        * _信令服务器连接_
            * ["event:signaling.status:[status]"](#YIM+event_signaling.status_[status])
            * ["event:this._signaling.ready"](#YIM+event_this._signaling.ready)
        * _房间控制_
            * [.joinRoom(roomId)](#YIM+joinRoom) ⇒ <code>Promise.&lt;void&gt;</code>
            * [.leaveRoom(roomId)](#YIM+leaveRoom) ⇒ <code>Promise.&lt;void&gt;</code>
            * [.inRoom(roomId)](#YIM+inRoom) ⇒ <code>boolean</code>
            * [.getRoomIdList()](#YIM+getRoomIdList) ⇒ <code>Array.&lt;string&gt;</code>
            * ["event:room.joining:[roomId]"](#YIM+event_room.joining_[roomId])
            * ["event:room.join:[roomId]"](#YIM+event_room.join_[roomId])
            * ["event:room.join-error:[errorName]"](#YIM+event_room.join-error_[errorName])
            * ["event:room.leave:[roomId]"](#YIM+event_room.leave_[roomId])
            * ["event:room.leave-error:[errorName]"](#YIM+event_room.leave-error_[errorName])
        * _消息控制_
            * [.registerMessageType(MsgClass)](#YIM+registerMessageType)
            * [.sendToRoom(roomId, msg, silent)](#YIM+sendToRoom) ⇒ <code>Promise.&lt;void&gt;</code>
            * [.sendToUser(userId, msg, silent)](#YIM+sendToUser) ⇒ <code>Promise.&lt;void&gt;</code>
            * [.requestHistoryMessage(userOrRoomId, minMsgId, maxMsgId, day)](#YIM+requestHistoryMessage) ⇒ <code>Promise.&lt;Array.&lt;MessageObject&gt;&gt;</code>
            * ["event:message:send:[user|group]:[userId|roomId]"](#YIM+event_message_send_[user|group]_[userId|roomId])
            * ["event:message:send-failed:MessageTooLongError:[user|group]:[userId|roomId]"](#YIM+event_message_send-failed_MessageTooLongError_[user|group]_[userId|roomId])
            * ["event:message:send-failed:NotLoginError:[user|group]:[userId|roomId]"](#YIM+event_message_send-failed_NotLoginError_[user|group]_[userId|roomId])
            * ["event:message:receive:[user|group]:[userId|roomId]"](#YIM+event_message_receive_[user|group]_[userId|roomId])
        * _用户帐户控制_
            * [.login(userId, token, silent)](#YIM+login) ⇒ <code>Promise.&lt;void&gt;</code>
            * [.logout()](#YIM+logout)
            * [.getMyUserId()](#YIM+getMyUserId) ⇒ <code>string</code>
            * ["event:account.login"](#YIM+event_account.login)
            * ["event:account.logging"](#YIM+event_account.logging)
            * ["event:account.logout"](#YIM+event_account.logout)
            * ["event:account.kickoff"](#YIM+event_account.kickoff)
            * ["event:account.error:UsernameOrTokenError"](#YIM+event_account.error_UsernameOrTokenError)
            * ["event:account.error:[errorName]"](#YIM+event_account.error_[errorName])
    * _static_
        * [.WildEmitter](#YIM.WildEmitter)
            * [new YIM.WildEmitter()](#new_YIM.WildEmitter_new)
        * _消息控制_
            * [.Message](#YIM.Message)
                * [new YIM.Message()](#new_YIM.Message_new)

<a name="YIM+init"></a>

### yim.init(config) ⇒ <code>Promise.&lt;void&gt;</code>
初始化

**类型**: 实例方法(function)，来自 [<code>YIM</code>](#YIM)  
**返回值**: <code>Promise.&lt;void&gt;</code> - 完成初始化
  - 若设定了用户名和密码，则登录成功后回调
  - 若同时设定了用户名、密码、房间号，则加入房间后回调
  - 若没有用户名和密码，则无论是否设定房间号，都立即回调，不等待加入房间  

| 参数 | 类型 |
| --- | --- |
| config | [<code>InitConfig</code>](#InitConfig) | 

<a name="YIM+uninit"></a>

### yim.uninit()
反初始化，相当于 logout()

**类型**: 实例方法(function)，来自 [<code>YIM</code>](#YIM)  
<a name="YIM+isLogging"></a>

### yim.isLogging() ⇒ <code>boolean</code>
是否正在进行登录中（请求了登录，但尚未成功登录）

**类型**: 实例方法(function)，来自 [<code>YIM</code>](#YIM)  
<a name="YIM+isLogged"></a>

### yim.isLogged() ⇒ <code>boolean</code>
是否已经完成登录

**类型**: 实例方法(function)，来自 [<code>YIM</code>](#YIM)  
<a name="YIM+event_signaling.status_[status]"></a>

### "event:signaling.status:[status]"
信令连接状态改变。

**类型**: 事件，由 [<code>YIM</code>](#YIM) 触发  
**分类**: 信令服务器连接  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| status | <code>string</code> | 新的状态值，状态的取值：<br>  - `disconnected`: 未连接；<br>  - `connecting`: 正在尝试连接；<br>  - `connected`: 已连接；<br>  - `reconnecting`: （掉线后）重新连接；<br>  - `ended`: 用户主动结束了连接。<br> |

<a name="YIM+event_this._signaling.ready"></a>

### "event:this._signaling.ready"
信令服务器已经成功连接，等同于事件 `signaling.status:connected`

**类型**: 事件，由 [<code>YIM</code>](#YIM) 触发  
**分类**: 信令服务器连接  
<a name="YIM+joinRoom"></a>

### yim.joinRoom(roomId) ⇒ <code>Promise.&lt;void&gt;</code>
加入房间

**类型**: 实例方法(function)，来自 [<code>YIM</code>](#YIM)  
**分类**: 房间控制  

| 参数 | 类型 |
| --- | --- |
| roomId | <code>string</code> \| <code>number</code> | 

<a name="YIM+leaveRoom"></a>

### yim.leaveRoom(roomId) ⇒ <code>Promise.&lt;void&gt;</code>
退出房间

**类型**: 实例方法(function)，来自 [<code>YIM</code>](#YIM)  
**返回值**: <code>Promise.&lt;void&gt;</code> - 完成退出  
**分类**: 房间控制  

| 参数 | 类型 |
| --- | --- |
| roomId | <code>string</code> \| <code>number</code> | 

<a name="YIM+inRoom"></a>

### yim.inRoom(roomId) ⇒ <code>boolean</code>
检测是否在房间里

**类型**: 实例方法(function)，来自 [<code>YIM</code>](#YIM)  
**分类**: 房间控制  

| 参数 | 类型 |
| --- | --- |
| roomId | <code>string</code> \| <code>number</code> | 

<a name="YIM+getRoomIdList"></a>

### yim.getRoomIdList() ⇒ <code>Array.&lt;string&gt;</code>
已加入的房间列表

**类型**: 实例方法(function)，来自 [<code>YIM</code>](#YIM)  
**分类**: 房间控制  
<a name="YIM+event_room.joining_[roomId]"></a>

### "event:room.joining:[roomId]"
本帐户正在请求进入房间[roomId]。

**类型**: 事件，由 [<code>YIM</code>](#YIM) 触发  
**分类**: 房间控制  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| roomId | <code>string</code> | 房间ID |

<a name="YIM+event_room.join_[roomId]"></a>

### "event:room.join:[roomId]"
本帐户进入了房间[roomId]。

**类型**: 事件，由 [<code>YIM</code>](#YIM) 触发  
**分类**: 房间控制  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| roomId | <code>string</code> | 房间ID |

<a name="YIM+event_room.join-error_[errorName]"></a>

### "event:room.join-error:[errorName]"
进入房间出错。

**类型**: 事件，由 [<code>YIM</code>](#YIM) 触发  
**分类**: 房间控制  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| e | <code>Error</code> | 错误对象 |
| roomId | <code>string</code> | 房间ID |

<a name="YIM+event_room.leave_[roomId]"></a>

### "event:room.leave:[roomId]"
本帐户离开了房间[roomId]。

**类型**: 事件，由 [<code>YIM</code>](#YIM) 触发  
**分类**: 房间控制  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| roomId | <code>string</code> | 房间ID |

<a name="YIM+event_room.leave-error_[errorName]"></a>

### "event:room.leave-error:[errorName]"
离开房间出错。

**类型**: 事件，由 [<code>YIM</code>](#YIM) 触发  
**分类**: 房间控制  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| e | <code>Error</code> | 错误对象 |
| roomId | <code>string</code> | 房间ID |

<a name="YIM+registerMessageType"></a>

### yim.registerMessageType(MsgClass)
注册一个或多个消息类型（不注册则收取不到该类型的消息）

**类型**: 实例方法(function)，来自 [<code>YIM</code>](#YIM)  
**分类**: 消息控制  

| 参数 | 类型 |
| --- | --- |
| MsgClass | <code>Object</code> \| <code>Array.&lt;{new: Message}&gt;</code> | 

**示例**  
```js
YIM.registerMessageType([ TextMessage, VoiceMessage ]);
```
<a name="YIM+sendToRoom"></a>

### yim.sendToRoom(roomId, msg, silent) ⇒ <code>Promise.&lt;void&gt;</code>
群发消息到指定房间

**类型**: 实例方法(function)，来自 [<code>YIM</code>](#YIM)  
**分类**: 消息控制  

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| roomId | <code>string</code> |  |  |
| msg | <code>Message</code> |  |  |
| silent | <code>boolean</code> | <code>false</code> | 若 true，则发送失败时不抛出错误（关闭 catch） |

<a name="YIM+sendToUser"></a>

### yim.sendToUser(userId, msg, silent) ⇒ <code>Promise.&lt;void&gt;</code>
私发消息给某人

**类型**: 实例方法(function)，来自 [<code>YIM</code>](#YIM)  
**分类**: 消息控制  

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| userId | <code>string</code> |  |  |
| msg | <code>Message</code> |  |  |
| silent | <code>boolean</code> | <code>false</code> | 若 true，则发送失败时不抛出错误（关闭 catch） |

<a name="YIM+requestHistoryMessage"></a>

### yim.requestHistoryMessage(userOrRoomId, minMsgId, maxMsgId, day) ⇒ <code>Promise.&lt;Array.&lt;MessageObject&gt;&gt;</code>
获取历史消息列表

**类型**: 实例方法(function)，来自 [<code>YIM</code>](#YIM)  
**分类**: 消息控制  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| userOrRoomId | <code>string</code> | 接收者用户ID |
| minMsgId | <code>string</code> | 消息范围开始ID |
| maxMsgId | <code>string</code> | 消息范围结束ID |
| day | <code>number</code> | 消息天数 |

<a name="YIM+event_message_send_[user|group]_[userId|roomId]"></a>

### "event:message:send:[user|group]:[userId|roomId]"
成功发送了消息

**类型**: 事件，由 [<code>YIM</code>](#YIM) 触发  
**分类**: 消息控制  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| msgObj | [<code>MessageObject</code>](#MessageObject) | 消息对象 |

<a name="YIM+event_message_send-failed_MessageTooLongError_[user|group]_[userId|roomId]"></a>

### "event:message:send-failed:MessageTooLongError:[user|group]:[userId|roomId]"
发送消息失败：长度超限

**类型**: 事件，由 [<code>YIM</code>](#YIM) 触发  
**分类**: 消息控制  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| msgInstance | <code>Message</code> | 消息对象 |

<a name="YIM+event_message_send-failed_NotLoginError_[user|group]_[userId|roomId]"></a>

### "event:message:send-failed:NotLoginError:[user|group]:[userId|roomId]"
发送消息失败：未登录

**类型**: 事件，由 [<code>YIM</code>](#YIM) 触发  
**分类**: 消息控制  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| msgInstance | <code>Message</code> | 消息对象 |

<a name="YIM+event_message_receive_[user|group]_[userId|roomId]"></a>

### "event:message:receive:[user|group]:[userId|roomId]"
接收到消息

**类型**: 事件，由 [<code>YIM</code>](#YIM) 触发  
**分类**: 消息控制  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| msgObj | [<code>MessageObject</code>](#MessageObject) | 消息对象 |

<a name="YIM+login"></a>

### yim.login(userId, token, silent) ⇒ <code>Promise.&lt;void&gt;</code>
登录

**类型**: 实例方法(function)，来自 [<code>YIM</code>](#YIM)  
**分类**: 用户帐户控制  

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| userId | <code>string</code> |  |  |
| token | <code>string</code> |  |  |
| silent | <code>boolean</code> | <code>false</code> | 若 true，则登录失败时不抛出错误（关闭 catch） |

<a name="YIM+logout"></a>

### yim.logout()
退出登录，同时清空内存中的聊天记录，并退出所有房间

**类型**: 实例方法(function)，来自 [<code>YIM</code>](#YIM)  
**分类**: 用户帐户控制  
<a name="YIM+getMyUserId"></a>

### yim.getMyUserId() ⇒ <code>string</code>
获得当前用户ID。

**类型**: 实例方法(function)，来自 [<code>YIM</code>](#YIM)  
**返回值**: <code>string</code> - - 用户ID。若未登录，则返回空字符串 ''。  
**分类**: 用户帐户控制  
<a name="YIM+event_account.login"></a>

### "event:account.login"
用户登录成功。

**类型**: 事件，由 [<code>YIM</code>](#YIM) 触发  
**分类**: 用户帐户控制  
<a name="YIM+event_account.logging"></a>

### "event:account.logging"
正在登录。

**类型**: 事件，由 [<code>YIM</code>](#YIM) 触发  
**分类**: 用户帐户控制  
<a name="YIM+event_account.logout"></a>

### "event:account.logout"
已登出。

**类型**: 事件，由 [<code>YIM</code>](#YIM) 触发  
**分类**: 用户帐户控制  
<a name="YIM+event_account.kickoff"></a>

### "event:account.kickoff"
被踢下线。

**类型**: 事件，由 [<code>YIM</code>](#YIM) 触发  
**分类**: 用户帐户控制  
<a name="YIM+event_account.error_UsernameOrTokenError"></a>

### "event:account.error:UsernameOrTokenError"
用户名或密码错误

**类型**: 事件，由 [<code>YIM</code>](#YIM) 触发  
**分类**: 用户帐户控制  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| e | <code>Error</code> | 错误对象，e.name = 'UsernameOrTokenError' |

<a name="YIM+event_account.error_[errorName]"></a>

### "event:account.error:[errorName]"
登录出错

**类型**: 事件，由 [<code>YIM</code>](#YIM) 触发  
**分类**: 用户帐户控制  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| e | <code>Error</code> | 错误对象 |

<a name="YIM.WildEmitter"></a>

### YIM.WildEmitter
**类型**: 静态类(class)，来自 [<code>YIM</code>](#YIM)  
<a name="new_YIM.WildEmitter_new"></a>

#### new YIM.WildEmitter()
放出 WildEmitter 类，供扩展插件选择使用
详情参阅：https://github.com/HenrikJoreteg/wildemitter

<a name="YIM.Message"></a>

### YIM.Message
**类型**: 静态类(class)，来自 [<code>YIM</code>](#YIM)  
**分类**: 消息控制  
<a name="new_YIM.Message_new"></a>

#### new YIM.Message()
消息基类，供继承扩展

<a name="InitConfig"></a>

## InitConfig
初始化 YIM 对象的配置

**类型**: 全局自定义类型(typedef)  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| appKey | <code>string</code> | appKey |
| [userId] | <code>string</code> | 用户ID |
| [token] | <code>string</code> | 用户token |
| [roomId] | <code>string</code> | 房间号 |
| [useMessageType] | <code>Array.&lt;{new: Message}&gt;</code> | 注册消息类型 |

<a name="MessageObject"></a>

## MessageObject
消息对象

**类型**: 全局自定义类型(typedef)  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| senderId | <code>string</code> | 发送者ID |
| receiverId | <code>string</code> | 接收者ID |
| withPeer | <code>string</code> | 对方ID，若为群聊则为房间号，若为私聊则为对方用户ID |
| isFromMe | <code>boolean</code> | 是否为自己发出 |
| chatType | <code>&#x27;user&#x27;</code> \| <code>&#x27;group&#x27;</code> | 'user' 为私聊，'group' 为群聊 |
| time | <code>Date</code> | 发送时间 |
| serverId | <code>string</code> | 服务器提供的唯一序号，可用于判断两个消息是否为同一个 |
| message | <code>Message</code> | Message 类的派生类，包含消息内容 |

