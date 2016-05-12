/**
 * Created by jackyanjiaqi on 16-3-21.
 */
ecs.Class(12352,'card_soldier', {
    "extends": ecs.Component,
    properties: {
        labelLife:{
            "default":null,
            type:"Label"
        },
        labelAttack:{
            "default":null,
            type:"Label"
        },
        life:{
            set :function(val){
                this._life = val;
                if(this.labelLife){
                    this.labelLife.text = this._life;
                }
            },
            get :function(){
                return this._life;
            }
        },
        attack:{
            set :function(val){
                this._attack = val;
                if(this.labelAttack){
                    this.labelAttack.text = this._attack;
                }
            },
            get :function(){
                return this._attack;
            }
        }
    }
});