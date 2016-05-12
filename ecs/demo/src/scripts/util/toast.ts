/**
 * Created by jackyanjiaqi on 16-3-7.
 */
ecs.Class(12345,"toast",
    {
        "extends":ecs.Component,
        properties:{
            tipsLabel:{
                "default":null,
                type:"egret.TextField"
            }
        },
        onLoad: function () {

        },
        start: function(){
            console.log('scene component start:',this['sceneName']);
            var self = this;
            this.show("This is a demonstration",4000,function () {
                self.show("How to mix a game into H5page.",4000,function (){
                    self.tipsLabel.node.color = 0xff0000;
                    self.show("Using Scene and ECS module!",0);
                })
            });
        },
        show: function(text,time,next){
            this.tipsLabel.text = text;
            if(time>0){
                egret.setTimeout(function(){
                    console.log("time end:");
                    this.unshow();
                    if(next){
                        next();
                    }
                },this,time);
            }
        },
        unshow: function(){
            this.tipsLabel.text = "";
        }
    }
);