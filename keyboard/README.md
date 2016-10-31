KeyBoard
==================
#1.概述
使用KeyBoard组件，您可以快速实现监听键盘点击事件。
例如实现对某一个按键和同时对某几个按键的监听。
#2.快速上手
###1.工程引用
- 下载本项目，编译，引用即可。
```javascript
		{
      "name": "keyboard",
      "path":"../libsrc"
    	}
```


###2.直接使用
```
class Main extends egret.DisplayObjectContainer {
    private kb:KeyBoard;
    public constructor() {
        super();
        var self = this;

       this.kb = new KeyBoard();
       //添加监听事件
       this.kb.addEventListener(KeyBoard.onkeydown,this.onkeydown,this);
       //移除事件监听
       //kb.removeEventListener(KeyBoard.onkeydown,this.onkeydown,this);
    }
    private onkeydown(event){
    	 //获取的按键数据为一个数组
         console.log(event.data);

        // //监听Esc键被按下事件
        // if(this.kb.isContain(event.data,KeyBoard.Esc)){
        //     console.log(event.data);
        // }

        // //监听F1键被按下事件
        // if(this.kb.isContain(event.data,KeyBoard.F1)){
        //     console.log(event.data);
        // }

        // //监听Esc和F1键同时被按下事件
        // if(this.kb.isContain(event.data,KeyBoard.Esc) && this.kb.isContain(event.data,KeyBoard.F1)){
        //     console.log(event.data);
        // }

    }


}
```

#3.完整代码demo:

请参考本项目中的demo实例源码。














