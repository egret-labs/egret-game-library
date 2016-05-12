/**
 * Created by jackyanjiaqi on 16-3-17.
 */
ecs.Class(12347,"draw_a_card",
    {
        "extends":ecs.Component,
        properties:{
        },

        onLoad: function (){
            console.log("this is draw_a_card",this);
            this.player = this.getComponent('Animation');
            var self = this;
            //this.player.onPlayEnd = function (clipName,keyframe) {
            //    self.onPlayEnd.bind(self,clipName,keyframe);
            //};
        },

        start: function (){
            //this.node.removeAllChildren();
            //for(var i=201;i<204;i++){
            //    var newNode:ecs.Node = ecs.instantiate(ecs.references[i]);
            //    newNode.position = new egret.Point((i-202)*100,0);
            //    this.node.addChild(newNode);
            //}
            //this.player.play('draw_a_card');
            this.testCase();
            //this.testContinuesAnim(true);
            //var tw:egret.Tween = egret.Tween.get(newNode).to({x:-300,y:-300},1500).call(function () {
            //    egret.Tween.get(newNode).to({x:0,y:0},1000);
            //});
        },

        testContinuesAnim:function (isContinues:boolean){
            this.node.removeAllChildren();
            var newNode:ecs.Node = ecs.instantiate(ecs.global_ref[202]);
            newNode.position = new egret.Point(0,0);
            this.node.addChild(newNode);
            this.player.play('place_to_slot1',isContinues?()=>this.testContinuesAnim(false):null);
            //if(isContinues){
            //    this.testContinuesAnim(false);
            //}
        },

        testCase: function () {
            var hackReference = ecs.global_ref[this['sceneName']].reference;
            this.node.removeAllChildren();
            this.playADrawingAnim(hackReference[202],1,()=>{
                this.playADrawingAnim(hackReference[201],2,()=>{
                    this.playADrawingAnim(hackReference[203],6);
                });
            });
        },

        onPlayEnd: function (clipName:string,keyframe:number) {
            console.log("onPlayEnd("+clipName+","+keyframe+")");
            if(clipName === 'draw_a_card' && keyframe === 2){
                this.onDrawEnd();
            }else
            if(clipName.indexOf('place_to_slot')!== -1 && keyframe === 1){
                this.onPlaceEnd();
            }
        },

        playAReleaseAnim:function (cardPrefab:ecs.Node,fromPlace:number,callBack:Function){
            this.__playingId = 2;
            this.__temp_prefab = cardPrefab;
            this.__temp_callback = callBack;

            var preview_fab = ecs.instantiate(cardPrefab);
            preview_fab.position = new egret.Point(0,0);
            this.node.addChild(preview_fab);
            this.player.playReverse("place_to_slot"+fromPlace);

            // this.node.opacity = 0;
            // controller.speed = -1;
        },

        onAnimStart:function (){
            if(this.__playingId === 2){
                console.log("anim release end");

                this.__playingId = 0;
                this.node.removeAllChildren();
                if(this.__temp_callback){
                    this.__temp_callback(null,this.__temp_prefab);
                }

            }else
            if(this.__playingId === 1){
                console.log("anim draw start");
            }
        },

        playADrawingAnim: function (cardPrefab:ecs.Node,placeTo:number,callBack?:Function) {
            this.__playingId = 1;
            this.__temp_prefab = cardPrefab;
            var preview_fab:ecs.Node = ecs.instantiate(cardPrefab);
            preview_fab.position = new egret.Point(0,0);
            this.node.addChild(preview_fab);
            var controller = this.player.play("draw_a_card",()=>this.onDrawEnd());
            this.__temp_index = placeTo;
            this.__temp_callback = callBack;
        },

        onDrawEnd: function(){
            console.log('onDrawEnd',this.__playingId);
            if(this.__playingId === 1){
                this.player.play("place_to_slot"+this.__temp_index,()=>this.onPlaceEnd());
            }
        },

        onPlaceEnd: function(){
            if(this.__playingId === 1){
                console.log("anim draw end");
                this.__playingId = 0;
                this.node.removeAllChildren();
                if(this.__temp_callback){
                    this.__temp_callback(null,this.__temp_prefab);
                }
            }else
            if(this.__playingId === 2){
                console.log("anim release start");
                // this.node.opacity = 255;
            }
        },

    }
)