/**
 * Created by jackyanjiaqi on 16-3-20.
 */
var cards = data.CardStack;
var STATE = data.STATE;

ecs.Class(12348,"CardManager",
    {
        "extends":ecs.Component,
        properties:{
            crystalSystem:{
                "default":null,
                type:ecs.Node
            },
            enemyCardSlot:{
                "default":null,
                type:ecs.Node
            },
            myCardSlot:{
                "default":null,
                type:ecs.Node
            },
            drawCardAnimShower:{
                "default":null,
                type:ecs.Node
            },
            soldierPrefab:{
                "default":null,
                type:ecs.Node
            },
            magicPrefab:{
                "default":null,
                type:ecs.Node
            },
            cardBackPrefab:{
                "default":null,
                type:ecs.Node
            },
            toast:{
                "default":null,
                type:ecs.Node
            }
        },
        start:function(){
            this.__cardSlots = {};
            this.__cardSlots.me = this.myCardSlot.getComponent("card_slot");
            this.__cardSlots.enemy = this.enemyCardSlot.getComponent("card_slot");
            this.toast = this.toast.getComponent("toast");
            this.toast.show("Welcome to HeartStone!",1);
        },

        drawCard:function(times,userTurn,fromUserIndex,next){
            var roles = userTurn;
            var isTakeTurn = roles.length>1;
            var index = fromUserIndex;
            var total = 0;
            //轮流发牌
            console.log("times:",++total);
            var slot = this.__cardSlots[roles[index]];
            var newCard = this.createCardPrefabFromStack();
            newCard.position = new egret.Point(0,0);

            var cardID = slot.addCard(newCard);
            if(cardID === 0){
                //没有位置放置卡牌
                if(next){
                    next({msg:"no more card slot!"});
                }
                return;
            }
            //此处关联水晶系统
            var cardCost = newCard.getComponent("card_cost");
            this.crystalSystem.registerCost(roles[index],cardCost);

            var self = this;
            //对方的牌需要翻面显示
            if(roles[index] === "enemy"){
                newCard = ecs.instantiate(self.cardBackPrefab);
                newCard.position = new egret.Point(0,0);
                cardID = 0;
            }
            this.drawCardAnimShower.getComponent("draw_a_card").playADrawingAnim(
                newCard,cardID,callBack);


            function callBack(){
                console.log("index:",index);
                if(roles[index] === "me"){
                    self.__cardSlots.me.refresh();
                }else
                if(roles[index] === "enemy"){
                    //与card_back_slot关联
                    var back_comp = self.__cardSlots.enemy.node.getComponent("card_back_slot");
                    if(back_comp){
                        back_comp.setCardNum(self.__cardSlots.enemy.getCount());
                    }
                }
                if(total<times){
                    if(isTakeTurn){
                        index = (index + 1)%roles.length;
                    }
                    console.log("times:",++total);
                    slot = self.__cardSlots[roles[index]];
                    newCard = self.createCardPrefabFromStack();
                    newCard.position = new egret.Point(0,0);
                    cardID = slot.addCard(newCard);
                    if(cardID === 0){
                        //没有位置放置卡牌
                        if(next){
                            next({msg:"no more card slot!"});
                        }
                        return;
                    }
                    //此处关联水晶系统
                    var cardCost = newCard.getComponent("card_cost");
                    self.crystalSystem.registerCost(roles[index],cardCost);
                    //对方的牌需要翻面显示
                    if(roles[index] === "enemy"){
                        newCard = ecs.instantiate(self.cardBackPrefab);
                        newCard.position = new egret.Point(0,0);
                        cardID = 0;
                    }
                    self.drawCardAnimShower.getComponent("draw_a_card").playADrawingAnim(newCard,cardID,callBack);
                    // index = (index + 1)%2;
                }else{
                    if(next)setTimeout(next,10);
                }
            }
        },

        releaseACard:function(fromWhoId,cardId,next){
            console.log("release start");
            var self = this;
            var slot = this.__cardSlots[fromWhoId];
            var card = slot.getCardById(cardId);
            // var card = slot.removeCard(cardId);
            if(card === null){
                if(next){
                    next({msg:"cardId:"+cardId+" don't exist!"});
                }
                return;
            }
            if(!self.crystalSystem.isCostable(fromWhoId,card.getComponent("card_cost"))){
                if(next){
                    next({msg:"Not enough crystal!"});
                }
                return;
            }
            card = slot.removeCard(cardId);
            self.crystalSystem.cost(fromWhoId,card.getComponent("card_cost"));
            // console.log("slot left:",slot.__cards.length);
            // slot.refresh();
            // setTimeout(next,1000);

            var playingId = -1;
            if(fromWhoId === "me"){
                playingId = cardId;
            }else
            if(fromWhoId === 'enemy'){
                //与card_back_slot关联
                var back_comp = self.__cardSlots.enemy.node.getComponent("card_back_slot");
                if(back_comp){
                    back_comp.setCardNum(self.__cardSlots.enemy.getCount());
                }
                playingId = 0;
            }
            self.__cardSlots[fromWhoId].refresh();
            console.log("release begin");

            self.drawCardAnimShower.getComponent("draw_a_card").playAReleaseAnim(card,playingId,function(){
                //结束动画后再更新牌堆
                // self.__cardSlots[fromWhoId].refresh();
                if(next)setTimeout(next,10);
            });
        },

        createCardPrefabFromStack:function (){
            var cardIndex = Math.floor(Math.random()*cards.length);
            var card = cards[cardIndex];
            var ret:ecs.Node = null;
            if(card.type == "soldier"){
                ret = ecs.instantiate(this.soldierPrefab);
                var component_card_base = ret.getComponent("card_base");
                component_card_base.description = "I am a soldier";

                var component_card_cost = ret.getComponent("card_cost");

                component_card_cost.initCost = card.cost;
                component_card_cost.cost = card.cost;
                component_card_cost.state = STATE.NORMAL;

                var component_card_soldier = ret.getComponent("card_soldier");
                component_card_soldier.attack = card.attack;
                component_card_soldier.life = card['life'];
            }else
            if(card.type == "magic"){
                ret = ecs.instantiate(this.magicPrefab);
                var component_card_base = ret.getComponent("card_base");
                component_card_base.title = "life:-"+card.attack;
                component_card_base.description = card['target'];

                var component_card_cost = ret.getComponent("card_cost");
                component_card_cost.initCost = card.cost;
                component_card_cost.cost = card.cost;
                component_card_cost.state = STATE.NORMAL;
            }
            return ret;
        }
    }
);