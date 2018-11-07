<a name="TextMessage"></a>

## TextMessage
TextMessage 文本消息类

**类型**: 全局类(class)  

* [TextMessage](#TextMessage)
    * [new TextMessage([text])](#new_TextMessage_new)
    * _instance_
        * [.setText(text)](#TextMessage+setText)
        * [.getText()](#TextMessage+getText) ⇒ <code>string</code>
    * _static_
        * [.filterDirty(text, [replace])](#TextMessage.filterDirty)
        * [.setDirtyWords(wordsArray)](#TextMessage.setDirtyWords)

<a name="new_TextMessage_new"></a>

### new TextMessage([text])
新建一个文本消息对象，可以传入需要传输的文本，也可以后续再用 setText 传入


| 参数 | 类型 |
| --- | --- |
| [text] | <code>string</code> | 

<a name="TextMessage+setText"></a>

### text.setText(text)
传入需要传输的文本

**类型**: 实例方法(function)，来自 [<code>TextMessage</code>](#TextMessage)  

| 参数 | 类型 |
| --- | --- |
| text | <code>string</code> | 

<a name="TextMessage+getText"></a>

### text.getText() ⇒ <code>string</code>
获取文本

**类型**: 实例方法(function)，来自 [<code>TextMessage</code>](#TextMessage)  
<a name="TextMessage.filterDirty"></a>

### TextMessage.filterDirty(text, [replace])
按事先设置的脏字数组

**类型**: 静态方法(function)，来自 [<code>TextMessage</code>](#TextMessage)  

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| text | <code>string</code> |  | 原始消息 |
| [replace] | <code>string</code> | <code>&quot;**&quot;</code> |  |

<a name="TextMessage.setDirtyWords"></a>

### TextMessage.setDirtyWords(wordsArray)
设置过滤脏字，若传入 null 则取消过滤

**类型**: 静态方法(function)，来自 [<code>TextMessage</code>](#TextMessage)  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| wordsArray | <code>Array.&lt;string&gt;</code> \| <code>null</code> | 脏字数组 |

