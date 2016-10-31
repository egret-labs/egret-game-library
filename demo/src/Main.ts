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
        //console.log(event.data);
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