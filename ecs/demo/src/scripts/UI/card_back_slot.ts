/**
 * Created by jackyanjiaqi on 16-3-16.
 */
ecs.Class(12346,"card_back_slot",
    {
        "extends":ecs.Component,
        properties:{
            numbers:-1
        },
        onLoad: function (){
            console.log("this is card_back_slot",this);
        },
        start: function (){
            console.log("this.numbers",this.numbers);
            this.setCardNum(this.numbers);
        },
        setCardNum:function(cardNum){
            if(cardNum>=0 && cardNum<=7){
                this.numbers = cardNum;
                console.log(this.node);
                //var children = this.node.getChildren();
                for(var i=1;i<=7;i++){
                    var cardNode = this.node.getChildByName("card_back_"+i);
                    // console.log("number "+i,cardNode);
                    if(i<=cardNum){
                        cardNode.alpha = 1;
                    }else{
                        cardNode.alpha = 0;
                    }
                }
            }
        },
    }
)