/**
 * Created by jackyanjiaqi on 16-3-21.
 */
ecs.Class(12350,'card_base',{
    "extends":ecs.Component,
    properties:{
        labelTitle:{
            "default":null,
            type:'Label'
        },
        labelSubtitle:{
            "default":null,
            type:'Label'
        },
        labelDescription:{
            "default":null,
            type:'Label'
        },
        title:{
            set: function(val){
                this._title = val;
                if(this.labelTitle){
                    this.labelTitle.text = this._title;
                }
            },
            get: function(){
                return this._title;
            }
        },
        subtitle:{
            set: function(val){
                this._subtitle = val;
                if(this.labelSubtitle){
                    this.labelSubtitle.text = this._subtitle;
                }
            },
            get: function(){
                return this._subtitle;
            }
        },
        description:{
            set: function(val){
                this._description = val;
                if(this.labelDescription){
                    this.labelDescription.text = this._description;
                }
            },
            get: function(){
                return this._description;
            }
        }
    },
});