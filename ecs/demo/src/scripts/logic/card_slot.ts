/**
 * Created by jackyanjiaqi on 16-3-21.
 */
ecs.Class(12349,"card_slot",{
    "extends":ecs.Component,
    properties:{
        isShow:false,
        slots:{
            "default":[],
            type:[ecs.Node]
        }
    },
    start:function(){
        console.log("card_slot start");
        this.__cards = {1:null,2:null,3:null,4:null,5:null,6:null,7:null,
            forEach:function(it){
                for(var i=1;i<=7;i++){
                    if(this[i]){
                        it(this[i],i);
                    }
                }
            },
            length:function(){
                var total = 0;
                for(var i=1;i<=7;i++){
                    if(this[i]){
                        total++;
                    }
                }
                return total;
            },
            reorder:function(){
                var fromId = this.getBlankId();
                if(fromId<=6){
                    for(var i=fromId+1;i<=7;i++){
                        if(this[i]){
                            this[fromId] = this[i];
                            this[i] = null;
                            return this.reorder();
                        }
                    }
                }
            },
            getBlankId:function(){
                for(var i=1;i<=7;i++){
                    if(!this[i])
                        return i;
                }
                return 0;
            }
        };
        this.testCase1();
    },

    testCase1: function () {
        for(var i=0;i<5;i++){
            var node:ecs.Node = ecs.instantiate(ecs.global_ref[this['sceneName']].reference[202]);
            node.position = new egret.Point(0,0);
            this.addCard(node);
            //node._raw.touchEnabled = true;
            //node._raw.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
            //node._raw.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onTouchCancel,this);
            //node._raw.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
            //node._raw.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
            //node._raw.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onTouchReleaseOutside,this);
            //node._raw.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
        }
        this.refresh();
    },

    onTouchBegin:function(event:egret.TouchEvent){
        //
        console.log("touch begin",event.localX,event.localY);
        this.touchBeginX = event.localX;
        this.touchBeginY = event.localY;
    },

    onTouchCancel:function(event:egret.TouchEvent){
        //
        console.log("touch cancel",event);
    },

    onTouchEnd:function(event:egret.TouchEvent) {
        //
        console.log("touch end",event.localX,event.localY);
    },

    onTouchMove: function (event:egret.TouchEvent) {
        console.log("touch move",event.localX,event.localY);
        event.currentTarget.x += event.localX - this.touchBeginX;
        event.currentTarget.y += event.localY - this.touchBeginY;
    },

    onTouchReleaseOutside: function (event:egret.TouchEvent) {
        console.log("touch release outside",event);
    },

    onTouchTap:function(event:egret.TouchEvent){
        console.log("touch tap",event);
    },

    getIdByCard:function (cardPrefab){
        for(var i=1;i<=7;i++){
            if(cardPrefab && this.__cards[i] === cardPrefab){
                return i;
            }
        }
        return -1;
    },
    getCardById: function (id){
        return this.__cards[id];
    },
    removeCard: function (id){
        var card = null;
        if(id>=1 && id<=7){
            card = this.__cards[id];
            this.__cards[id] = null;
        }
        return card;
    },
    addCardAndRefresh:function(card){
        var id = this.addCard(card);
        this.refresh();
    },
    addCard: function (card){
        var id = this.__cards.getBlankId();
        if(id){
            this.__cards[id] = card;
        }
        return id;
    },
    refresh: function (){
        var cards = this.__cards;
        console.log("cards",this.__cards,this.isShow,this.slots);
        for(var i=0;i<this.__cards.length;i++){
            console.log("index "+i+":",this.__cards[i]);
        }
        if(this.isShow){
            this.slots.forEach(
                function(node,i){
                    console.log("node "+i+":")
                    node.removeAllChildren();
                    var item = cards[i+1];
                    if(item){
                        node.addChild(item);
                    }
                });
            console.log("slots:",this.slots);
            console.log("cards:",this.__cards);

        }
    }
});