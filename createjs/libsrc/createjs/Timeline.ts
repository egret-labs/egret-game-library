module createjs {
    export class Timeline {
        public _tweens:Array<any>;
        public ignoreGlobalPause:boolean = false;
        public duration:number = 0;
        public loop:boolean = false;
        public onChange:Function = null;
        public position:number = null;
        public _paused:boolean = false;
        public _labels:Object;
        public _prevPosition:number = 0;
        public _prevPos:number = -1;
        public _useTicks:boolean = false;
        public movie:createjs.MovieClip;
        public _target:any;

        public constructor(tweens, labels, props) {
            this._tweens = [];
            this._target = this;
            if (props) {
                this._useTicks = props.useTicks;
                this.loop = props.loop;
                this.ignoreGlobalPause = props.ignoreGlobalPause;
                this.onChange = props.onChange;
            }
            if (tweens) {
                this.addTween.apply(this, tweens);
            }
            this.setLabels(labels);
            if (props && props.paused) {
                this._paused = true;
            } else {
                egret.Tween["_register"](this, true);
            }
            if (props && props.position != null) {
                this.setPosition(props.position, 0);
            }
        }

        public addTween(tween) {
            var l = arguments.length;
            if (l > 1) {
                for (var i = 0; i < l; i++) {
                    this.addTween(arguments[i]);
                }
                return arguments[0];
            } else if (l == 0) {
                return null;
            }
            this.removeTween(tween);
            this._tweens.push(tween);
            tween.setPaused(true);
            tween._paused = false;
            tween._useTicks = this._useTicks;
            tween.loop = this.loop;
            if (tween.duration > this.duration) {
                this.duration = tween.duration;
            }
            if (this._prevPos >= 0) {
                tween.setPosition(this._prevPos, 0);
            }
            return tween;
        }

        public removeTween(tween) {
            var l = arguments.length;
            if (l > 1) {
                var good = true;
                for (var i = 0; i < l; i++) {
                    good = good && this.removeTween(arguments[i]);
                }
                return good;
            } else if (l == 0) {
                return false;
            }
            var index = this._tweens.indexOf(tween);
            if (index != -1) {
                this._tweens.splice(index, 1);
                if (tween.duration >= this.duration) {
                    this.updateDuration();
                }
                return true;
            } else {
                return false;
            }
        }

        public addLabel(label, position) {
            this._labels[label] = position;
        }

        public setLabels(o) {
            this._labels = o ? o : {};
        }

        public gotoAndPlay(positionOrLabel) {
            this.setPaused(false);
            this._goto(positionOrLabel);
        }

        public gotoAndStop(positionOrLabel) {
            this.setPaused(true);
            this._goto(positionOrLabel);
        }

        public setPosition(value, actionsMode?) {
            if (value < 0) {
                value = 0;
            }
            if (this.duration <= 0) return false;
            var t = this.loop ? value % this.duration : value;
            var end = !this.loop && value >= this.duration;
            if (t == this._prevPos) {
                return end;
            }
            this._prevPosition = value;
            this.position = this._prevPos = t; // in case an action changes the current frame.
            for (var i = 0, l = this._tweens.length; i < l; i++) {
                this._tweens[i].setPosition(t, actionsMode);
                if (t != this._prevPos) {
                    return false;
                } // an action changed this timeline's position.
            }
            if (end) {
                this.setPaused(true);
            }
            this.onChange && this.onChange(this);
            return end;
        }

        public setPaused(value) {
            this._paused = value;
            egret.Tween["_register"](this, !value);
        }

        public updateDuration() {
            this.duration = 0;
            for (var i = 0, l = this._tweens.length; i < l; i++) {
                var tween = this._tweens[i];
                if (tween.duration > this.duration) {
                    this.duration = tween.duration;
                }
            }
        }

        public tick(delta) {
            this.setPosition(this._prevPosition + delta);
        }

        public resolve(positionOrLabel) {
            var pos = parseFloat(positionOrLabel);
            if (isNaN(pos)) {
                pos = this._labels[positionOrLabel];
            }
            return pos;
        }

        private _goto(positionOrLabel) {
            var pos = this.resolve(positionOrLabel);
            if (pos != null) {
                this.setPosition(pos);
            }
        }
    }
}