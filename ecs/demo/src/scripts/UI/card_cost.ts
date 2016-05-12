/**
 * Created by jackyanjiaqi on 16-3-21.
 */
ecs.Class(12351,'card_cost', {
    "extends": ecs.Component,
    properties: {
        labelCost:{
            "default":null,
            type:'Label'
        },
        state:{
            set: function(state){
                this._state = state;
                var effector = this.node.getComponent("effect_number");
                if(effector){
                    switch(this._state){
                        case STATE.NORMAL:
                            if(this.haveEffect()){
                                effector.changeColor("cost","green");
                            }else{
                                effector.changeColor("cost","white");
                            }
                            break;
                        case STATE.DISABLE:
                            effector.changeColor("cost","red");
                            break;
                    }
                }
            },
            get: function(){
                return this._state;
            }
        },
        initCost:10,
        cost:{
            set :function(val){
                this._cost = val;
                if(this.labelCost){
                    this.labelCost.text = this._cost;
                }
            },
            get :function(){
                return this._cost;
            }
        },
    },

    addEffect:function(effectName,tagObj){
        this._effects[effectName] = tagObj;
        this.state = this.state;
    },

    haveEffect:function(){
        for(var p in this._effects){
            if(this._effects[p]){
                return true;
            }
        }
        return false;
    },

    removeEffect:function(effectName){
        this._effects[effectName] = null;
        this.state = this.state;
    },

    start:function(){
        this._effects = {};
    }
});