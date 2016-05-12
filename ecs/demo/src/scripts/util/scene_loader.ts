/**
 * Created by jackyanjiaqi on 16-4-1.
 */
ecs.Class(12355,"scene_loader",{

    "extends":ecs.Component,
    properties:{
        //要加载的资源组
        groupName:"game",
        //要加载的场景名
        targetSceneName:"nothing",
        //要加载的场景资源名称
        targetSceneResourceName:'nothing',
        //显示进度的label
        label:{
            "default":null,
            type:'egret.TextField'
        }
    },

    start:function(){
        if(this.groupName && this.targetSceneName && this.targetSceneResourceName){
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onProgress,this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onLoadErr,this);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onLoadComplete,this);
            RES.loadGroup(this.groupName);
        }
    },

    onLoadErr:function (err){
        console.log("load err",err);
        if(this.label){
            this.label.text = err;
        }
    },

    onProgress: function (progressEvent) {
        let progress = Math.floor(progressEvent.itemsLoaded*100/progressEvent.itemsTotal);
        console.log("progress",progress);
        if(this.label){
            this.label.text = `加载中${progress}%`;
        }
    },
    //
    onLoadComplete: function (){
        if(this.label){
            this.label.text = `1s后转向${this['targetSceneName']}场景`;
        }
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onProgress,this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onLoadComplete,this);
        egret.setTimeout(()=>{
            ecs.switchScene(this['sceneName'],this.targetSceneName,this.targetSceneResourceName);
        },this,1000);

    }
});