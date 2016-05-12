/**
 * Created by jackyanjiaqi on 16-3-25.
 */
ecs.Class(12354,"switch_to_next_scene",{
    "extends":ecs.Component,
    properties:{
        isLoop:false
    },

    onLoad:function(){
        this.node._raw.touchEnabled = true;
        this.node._raw.addEventListener(egret.TouchEvent.TOUCH_TAP,this.nextScene,this);
    },

    nextScene:function(){
        var currentSceneIndex:number = ecs.getIndexBySceneName(this['sceneName']);
        console.log("currentSceneIndex",currentSceneIndex);
        if(currentSceneIndex !== -1){
            var nextSceneName = ecs.getSceneNameByIndex(currentSceneIndex+1);
            console.log("nextSceneName",nextSceneName);
            console.log("nextSceneIndex",currentSceneIndex+1);
            //if(currentSceneIndex+1 !== 0 )
            ecs.scrollTo(currentSceneIndex+1);
        }
        //if(currentSceneIndex !== -1 && ecs.getSceneNameByIndex(currentSceneIndex+1)){
        //    ecs.scrollTo(currentSceneIndex+1);
        //}
        //else
        //if(this.isLoop){
        //    ecs.scrollTo(0);
        //}
    }
});