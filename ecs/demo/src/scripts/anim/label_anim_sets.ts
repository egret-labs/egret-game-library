/**
 * Created by jackyanjiaqi on 16-3-24.
 */
ecs.Class(12353,"label_anim_sets",{

    "extends":ecs.Component,
    properties:{
        "animType":"fadeIn",
        "fromPlaceX":0,
        "fromPlaceY":0,
        "label":{
            "default":null,
            type:'Label'
        }
    },

    onLoad:function(){
        console.log("label_anim_sets onLoad:",this);
        ecs.setSceneScrollingListener(this['sceneName'],(progress:number,isScrollIn:boolean)=>{
            console.log('on scrolling:',progress,isScrollIn);
            if(isScrollIn){
                this.label.node.y = -1000 + 10*progress;
                this.label.node.alpha = progress/100;
                this.label.node.scaleX = progress/100;
                this.label.node.scaleY = progress/100;
            }else{
                this.label.node.y = 10*progress;
                this.label.node.alpha = - progress/100 + 1;
                this.label.node.scaleX = - progress/100 + 1;
                this.label.node.scaleY = - progress/100 + 1;
            }
        })
    }
});