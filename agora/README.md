# agora 声网实时语音 SDK 使用说明
### 一.去声网官网注册账号，获取 `Appid`
[https://www.agora.io/cn/](https://www.agora.io/cn/)



### 二. 在 Egret 项目中使用声网 SDK
#### 1) 添加第三方库
在 Egret 工程中打开 `egretProperties.json`,添加声网的配置。可以参考示例 demo。

```
"modules": [
    {
      "name": "agora",
      "path": "../libsrc"
    }
]
```

在命令行中运行 `egret build -e` ，声网的 sdk 就自动引入了。

#### 2) 修改游戏页面
打开 `index.html` 文件，把下面这段代码添加进入。声网 SDK 需要增加一个 `div` 标签来播放语音。

```
<div id="agora_local"></div>
```


### 三. 注意事项
* 声网语音 SDK 必须在 `https` 环境下使用
* 如果使用没有麦克风和摄像头的电脑运行和调试，可能会报错。
* 对 `iOS` 系统支持不完善。


