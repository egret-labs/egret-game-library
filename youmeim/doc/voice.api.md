<a name="VoiceMessage"></a>

## VoiceMessage
VoiceMessage 语音消息类

**类型**: 全局类(class)  

* [VoiceMessage](#VoiceMessage)
    * _instance_
        * [.getErrorName()](#VoiceMessage+getErrorName) ⇒ <code>string</code>
        * _录音控制_
            * [.initRecord()](#VoiceMessage+initRecord) ⇒ <code>Promise.&lt;void&gt;</code>
            * [.startRecord(silent)](#VoiceMessage+startRecord) ⇒ <code>Promise.&lt;void&gt;</code>
            * [.finishRecord(silent)](#VoiceMessage+finishRecord) ⇒ <code>Promise.&lt;void&gt;</code>
            * [.cancelRecord()](#VoiceMessage+cancelRecord)
            * [.isRecording()](#VoiceMessage+isRecording) ⇒ <code>boolean</code>
            * [.isError()](#VoiceMessage+isError)
            * ["event:start-record"](#VoiceMessage+event_start-record)
            * ["event:finishing-record"](#VoiceMessage+event_finishing-record)
            * ["event:finish-record"](#VoiceMessage+event_finish-record)
            * ["event:cancel-record"](#VoiceMessage+event_cancel-record)
            * ["event:error:DeviceNotSupportedError"](#VoiceMessage+event_error_DeviceNotSupportedError)
            * ["event:error:PermissionDeniedError"](#VoiceMessage+event_error_PermissionDeniedError)
            * ["event:error:AlreadyReadyError"](#VoiceMessage+event_error_AlreadyReadyError)
            * ["event:error:CanceledError"](#VoiceMessage+event_error_CanceledError)
            * ["event:error:RecorderNotStartedError"](#VoiceMessage+event_error_RecorderNotStartedError)
            * ["event:error:RecorderBusyError"](#VoiceMessage+event_error_RecorderBusyError)
            * ["event:error:RecordTooShortError"](#VoiceMessage+event_error_RecordTooShortError)
        * _播放控制_
            * [.play()](#VoiceMessage+play)
            * [.stop()](#VoiceMessage+stop)
            * [.isPlaying()](#VoiceMessage+isPlaying) ⇒ <code>boolean</code>
            * [.getDuration()](#VoiceMessage+getDuration) ⇒ <code>number</code>
            * ["event:play"](#VoiceMessage+event_play)
            * ["event:stop"](#VoiceMessage+event_stop)
            * ["event:end-play"](#VoiceMessage+event_end-play)
        * _自动播放列表_
            * ["event:all-ended"](#VoiceMessage+event_all-ended)
            * ["event:begin-play"](#VoiceMessage+event_begin-play)
            * ["event:end-play"](#VoiceMessage+event_end-play)
            * ["event:next"](#VoiceMessage+event_next)
            * ["event:add"](#VoiceMessage+event_add)
    * _static_
        * [.Recorder](#VoiceMessage.Recorder) : <code>Recorder</code>
        * [.registerRecorder(RecClass)](#VoiceMessage.registerRecorder)
        * _录音控制_
            * [.isEnvSupport()](#VoiceMessage.isEnvSupport) ⇒ <code>boolean</code>
            * [.initRecorder()](#VoiceMessage.initRecorder) ⇒ <code>Promise.&lt;void&gt;</code>
        * _自动播放列表_
            * [.addToAutoPlayQueue(msg)](#VoiceMessage.addToAutoPlayQueue)
            * [.getAutoPlayQueueLength()](#VoiceMessage.getAutoPlayQueueLength) ⇒ <code>number</code>
            * [.getCurrentAutoPlayingMessage()](#VoiceMessage.getCurrentAutoPlayingMessage) ⇒ [<code>VoiceMessage</code>](#VoiceMessage) \| <code>undefined</code>
            * [.nextAutoPlay()](#VoiceMessage.nextAutoPlay)
            * [.stopAndClearAutoPlayQueue()](#VoiceMessage.stopAndClearAutoPlayQueue)
            * [.bindAutoPlayEvent(event, cb)](#VoiceMessage.bindAutoPlayEvent)
            * [.unbindAutoPlayEvent(event, [cb])](#VoiceMessage.unbindAutoPlayEvent)

<a name="VoiceMessage+getErrorName"></a>

### voice.getErrorName() ⇒ <code>string</code>
若有错误则返回错误名称，否则返回空字符串

**类型**: 实例方法(function)，来自 [<code>VoiceMessage</code>](#VoiceMessage)  
<a name="VoiceMessage+initRecord"></a>

### voice.initRecord() ⇒ <code>Promise.&lt;void&gt;</code>
初始化录音
正常情况下可以直接调用 startRecord 开始录音，然后用户若尚未授权，系统会向用户询问授权
若需要提前取得授权，可以调用此方法

**类型**: 实例方法(function)，来自 [<code>VoiceMessage</code>](#VoiceMessage)  
**分类**: 录音控制  
<a name="VoiceMessage+startRecord"></a>

### voice.startRecord(silent) ⇒ <code>Promise.&lt;void&gt;</code>
开始录音，若尚未初始化，会先自动初始化
另外，视系统而定，两个 VoiceMessage 实例不一定可以同时录音。
若另一 VoiceMessage 尚未结束录音，本实例调用 startRecord 可能会报错。
目前，AMR、MP3 可支持多实例同时录音，微信不支持。

**类型**: 实例方法(function)，来自 [<code>VoiceMessage</code>](#VoiceMessage)  
**分类**: 录音控制  

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| silent | <code>boolean</code> | <code>false</code> | 若不使用 catch，请把此参数设为 true，否则 js 会报错 |

<a name="VoiceMessage+finishRecord"></a>

### voice.finishRecord(silent) ⇒ <code>Promise.&lt;void&gt;</code>
结束录音

**类型**: 实例方法(function)，来自 [<code>VoiceMessage</code>](#VoiceMessage)  
**分类**: 录音控制  

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| silent | <code>boolean</code> | <code>false</code> | 若不使用 catch，请把此参数设为 true，否则 js 会报错 |

<a name="VoiceMessage+cancelRecord"></a>

### voice.cancelRecord()
放弃录音

**类型**: 实例方法(function)，来自 [<code>VoiceMessage</code>](#VoiceMessage)  
**分类**: 录音控制  
<a name="VoiceMessage+isRecording"></a>

### voice.isRecording() ⇒ <code>boolean</code>
是否正在录音

**类型**: 实例方法(function)，来自 [<code>VoiceMessage</code>](#VoiceMessage)  
**分类**: 录音控制  
<a name="VoiceMessage+isError"></a>

### voice.isError()
是否发生过错误

**类型**: 实例方法(function)，来自 [<code>VoiceMessage</code>](#VoiceMessage)  
**分类**: 录音控制  
<a name="VoiceMessage+event_start-record"></a>

### "event:start-record"
开始录音

**类型**: 事件，由 [<code>VoiceMessage</code>](#VoiceMessage) 触发  
**分类**: 录音控制  
<a name="VoiceMessage+event_finishing-record"></a>

### "event:finishing-record"
正在完成录音（开始做转码、上传等）

**类型**: 事件，由 [<code>VoiceMessage</code>](#VoiceMessage) 触发  
**分类**: 录音控制  
<a name="VoiceMessage+event_finish-record"></a>

### "event:finish-record"
完成录音（包括转码、上传等，已经可以播放）

**类型**: 事件，由 [<code>VoiceMessage</code>](#VoiceMessage) 触发  
**分类**: 录音控制  
<a name="VoiceMessage+event_cancel-record"></a>

### "event:cancel-record"
取消录音，此实例作废

**类型**: 事件，由 [<code>VoiceMessage</code>](#VoiceMessage) 触发  
**分类**: 录音控制  
<a name="VoiceMessage+event_error_DeviceNotSupportedError"></a>

### "event:error:DeviceNotSupportedError"
错误：设备不支持录音

**类型**: 事件，由 [<code>VoiceMessage</code>](#VoiceMessage) 触发  
**分类**: 录音控制  
<a name="VoiceMessage+event_error_PermissionDeniedError"></a>

### "event:error:PermissionDeniedError"
错误：没有录音设备权限

**类型**: 事件，由 [<code>VoiceMessage</code>](#VoiceMessage) 触发  
**分类**: 录音控制  
<a name="VoiceMessage+event_error_AlreadyReadyError"></a>

### "event:error:AlreadyReadyError"
错误：此实例已经拥有录音（若要新建录音则需要 new 一个新的实例）

**类型**: 事件，由 [<code>VoiceMessage</code>](#VoiceMessage) 触发  
**分类**: 录音控制  
<a name="VoiceMessage+event_error_CanceledError"></a>

### "event:error:CanceledError"
错误：此实例已经取消了录音，实例作废（若要新建录音则需要 new 一个新的实例）

**类型**: 事件，由 [<code>VoiceMessage</code>](#VoiceMessage) 触发  
**分类**: 录音控制  
<a name="VoiceMessage+event_error_RecorderNotStartedError"></a>

### "event:error:RecorderNotStartedError"
错误：未曾开始录音（却调用了完成录音的接口）

**类型**: 事件，由 [<code>VoiceMessage</code>](#VoiceMessage) 触发  
**分类**: 录音控制  
<a name="VoiceMessage+event_error_RecorderBusyError"></a>

### "event:error:RecorderBusyError"
错误：录音系统忙碌（有其他实例正在录音或录音系统在处理数据）

**类型**: 事件，由 [<code>VoiceMessage</code>](#VoiceMessage) 触发  
**分类**: 录音控制  
<a name="VoiceMessage+event_error_RecordTooShortError"></a>

### "event:error:RecordTooShortError"
错误：录音时间太短

**类型**: 事件，由 [<code>VoiceMessage</code>](#VoiceMessage) 触发  
**分类**: 录音控制  
<a name="VoiceMessage+play"></a>

### voice.play()
播放
视系统而定，不一定支持两个 VoiceMessage 实例同时播放。
这时若另一实例仍在播放中，可能另一实例会被强制停止播放。
目前，AMR、MP3 支持多个实例同时混音播放，微信不支持。

**类型**: 实例方法(function)，来自 [<code>VoiceMessage</code>](#VoiceMessage)  
**分类**: 播放控制  
<a name="VoiceMessage+stop"></a>

### voice.stop()
停止

**类型**: 实例方法(function)，来自 [<code>VoiceMessage</code>](#VoiceMessage)  
**分类**: 播放控制  
<a name="VoiceMessage+isPlaying"></a>

### voice.isPlaying() ⇒ <code>boolean</code>
是否正在播放

**类型**: 实例方法(function)，来自 [<code>VoiceMessage</code>](#VoiceMessage)  
**分类**: 播放控制  
<a name="VoiceMessage+getDuration"></a>

### voice.getDuration() ⇒ <code>number</code>
获取录音长度，（单位：秒），可能会有小数

**类型**: 实例方法(function)，来自 [<code>VoiceMessage</code>](#VoiceMessage)  
**分类**: 播放控制  
<a name="VoiceMessage+event_play"></a>

### "event:play"
开始播放

**类型**: 事件，由 [<code>VoiceMessage</code>](#VoiceMessage) 触发  
**分类**: 播放控制  
<a name="VoiceMessage+event_stop"></a>

### "event:stop"
停止播放

**类型**: 事件，由 [<code>VoiceMessage</code>](#VoiceMessage) 触发  
**分类**: 播放控制  
<a name="VoiceMessage+event_end-play"></a>

### "event:end-play"
播放结束，包括调用 stop() 结束和播放到结尾自动结束

**类型**: 事件，由 [<code>VoiceMessage</code>](#VoiceMessage) 触发  
**分类**: 播放控制  
<a name="VoiceMessage+event_all-ended"></a>

### "event:all-ended"
播放列表全部播放完毕

**类型**: 事件，由 [<code>VoiceMessage</code>](#VoiceMessage) 触发  
**分类**: 自动播放列表  
<a name="VoiceMessage+event_begin-play"></a>

### "event:begin-play"
播放列表开始播放某一条语音

**类型**: 事件，由 [<code>VoiceMessage</code>](#VoiceMessage) 触发  
**分类**: 自动播放列表  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| msg | [<code>VoiceMessage</code>](#VoiceMessage) | 刚开始的语音消息对象 |

<a name="VoiceMessage+event_end-play"></a>

### "event:end-play"
播放列表结束播放某一条语音（包括播放到结尾和手动停止）

**类型**: 事件，由 [<code>VoiceMessage</code>](#VoiceMessage) 触发  
**分类**: 自动播放列表  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| msg | [<code>VoiceMessage</code>](#VoiceMessage) | 刚结束的语音消息对象 |

<a name="VoiceMessage+event_next"></a>

### "event:next"
播放列表跳到下一条语音（包括自动跳和手动跳）

**类型**: 事件，由 [<code>VoiceMessage</code>](#VoiceMessage) 触发  
**分类**: 自动播放列表  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| msg | [<code>VoiceMessage</code>](#VoiceMessage) | 下一条语音消息对象 |

<a name="VoiceMessage+event_add"></a>

### "event:add"
播放列表新增一条语音

**类型**: 事件，由 [<code>VoiceMessage</code>](#VoiceMessage) 触发  
**分类**: 自动播放列表  
**属性**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| msg | [<code>VoiceMessage</code>](#VoiceMessage) | 新增的语音消息对象 |

<a name="VoiceMessage.Recorder"></a>

### VoiceMessage.Recorder : <code>Recorder</code>
放出 Recorder 基类，所有 Recorder 基于此基类开发

**类型**: 静态属性(property)，来自 [<code>VoiceMessage</code>](#VoiceMessage)  
<a name="VoiceMessage.registerRecorder"></a>

### VoiceMessage.registerRecorder(RecClass)
注册一个 Recorder

**类型**: 静态方法(function)，来自 [<code>VoiceMessage</code>](#VoiceMessage)  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| RecClass | <code>Array.&lt;{new: Recorder}&gt;</code> | 数组，Recorder 类列表（直接传入，不要 new 和括号） |

<a name="VoiceMessage.isEnvSupport"></a>

### VoiceMessage.isEnvSupport() ⇒ <code>boolean</code>
设备是否支持录音

**类型**: 静态方法(function)，来自 [<code>VoiceMessage</code>](#VoiceMessage)  
**分类**: 录音控制  
<a name="VoiceMessage.initRecorder"></a>

### VoiceMessage.initRecorder() ⇒ <code>Promise.&lt;void&gt;</code>
提前初始化录音，用于像“按住说话”之类的场景，提前让用户授权

**类型**: 静态方法(function)，来自 [<code>VoiceMessage</code>](#VoiceMessage)  
**分类**: 录音控制  
<a name="VoiceMessage.addToAutoPlayQueue"></a>

### VoiceMessage.addToAutoPlayQueue(msg)
加入自动播放列表

**类型**: 静态方法(function)，来自 [<code>VoiceMessage</code>](#VoiceMessage)  
**分类**: 自动播放列表  

| 参数 | 类型 |
| --- | --- |
| msg | [<code>VoiceMessage</code>](#VoiceMessage) | 

<a name="VoiceMessage.getAutoPlayQueueLength"></a>

### VoiceMessage.getAutoPlayQueueLength() ⇒ <code>number</code>
获取自动播放列表待播放的数量

**类型**: 静态方法(function)，来自 [<code>VoiceMessage</code>](#VoiceMessage)  
**返回值**: <code>number</code> - 数量  
**分类**: 自动播放列表  
<a name="VoiceMessage.getCurrentAutoPlayingMessage"></a>

### VoiceMessage.getCurrentAutoPlayingMessage() ⇒ [<code>VoiceMessage</code>](#VoiceMessage) \| <code>undefined</code>
获取当前自动播放中正在播放的 VoiceMessage

**类型**: 静态方法(function)，来自 [<code>VoiceMessage</code>](#VoiceMessage)  
**返回值**: [<code>VoiceMessage</code>](#VoiceMessage) \| <code>undefined</code> - 返回 Message，没有自动播放则返回 undefined  
**分类**: 自动播放列表  
<a name="VoiceMessage.nextAutoPlay"></a>

### VoiceMessage.nextAutoPlay()
跳到下一音频

**类型**: 静态方法(function)，来自 [<code>VoiceMessage</code>](#VoiceMessage)  
**分类**: 自动播放列表  
<a name="VoiceMessage.stopAndClearAutoPlayQueue"></a>

### VoiceMessage.stopAndClearAutoPlayQueue()
停止播放并清空播放列表

**类型**: 静态方法(function)，来自 [<code>VoiceMessage</code>](#VoiceMessage)  
**分类**: 自动播放列表  
<a name="VoiceMessage.bindAutoPlayEvent"></a>

### VoiceMessage.bindAutoPlayEvent(event, cb)
绑定自动播放事件

**类型**: 静态方法(function)，来自 [<code>VoiceMessage</code>](#VoiceMessage)  
**分类**: 自动播放列表  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| event | <code>string</code> | 事件名 |
| cb | <code>function</code> | 事件 Function |

<a name="VoiceMessage.unbindAutoPlayEvent"></a>

### VoiceMessage.unbindAutoPlayEvent(event, [cb])
解绑自动播放事件

**类型**: 静态方法(function)，来自 [<code>VoiceMessage</code>](#VoiceMessage)  
**分类**: 自动播放列表  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| event | <code>string</code> | 事件名 |
| [cb] | <code>function</code> | 事件 Function，若不填则清空所有事件 |

