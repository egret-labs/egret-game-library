module createjs {
    export class MovieClip extends createjs.DisplayObjectContainer {
        public static INDEPENDENT:string = "independent";
        public static SINGLE_FRAME:string = "single";
        public static SYNCHED:string = "synched";
        public timeline:Timeline;
        public mode:string;
        public loop:boolean = true;
        public startPosition:number = 0;
        public labels:Object;
        public paused:boolean = false;
        public actionsEnabled:boolean = true;
        private _synchOffset:number = 0;
        private _prevPos:number = -1;
        private _prevPosition:number = 0;
        private _managed:Object;

        public constructor(mode:string, startPosition:number, loop:boolean, labels:Object) {
            super();
            this.mode = mode || MovieClip.INDEPENDENT;
            this.startPosition = startPosition || 0;
            this.loop = loop;
            var props = {paused: true, position: startPosition, useTicks: true, loop: this.loop};
            this.timeline = new Timeline(null, labels, props);
            this.timeline.movie = this;
            this._managed = {};
        }

        public initialize() {
        }

        public isVisible  () {
            return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0;
        }

        public update() {
            this._updateTimeline();
            var child:any;
            for (var i = 0, l = this.numChildren; i < l; i++) {
                child = this.getChildAt(i);
                if (child instanceof createjs.MovieClip) {
                    if (!child.isVisible())continue;
                    child.update();
                }
            }
        }

        //public play() {
        //    this.paused = false;
        //}

        public stop() {
            this.paused = true;
        }

        public gotoAndPlay(positionOrLabel:any) {
            this.paused = false;
            this._goto(positionOrLabel);
        }

        public gotoAndStop(positionOrLabel:any) {
            this.paused = true;
            this._goto(positionOrLabel);
        }

        public tick(params) {
            if (!this.paused && this.mode == MovieClip.INDEPENDENT) {
                this._prevPosition = (this._prevPos < 0) ? 0 : this._prevPosition + 1;
            }
            for (var i = this.numChildren - 1; i >= 0; i--) {
                var child:any = this.getChildAt(i);
                if (child.tick) {
                    child.tick(params);
                }
            }
        }

        private _goto(positionOrLabel:any) {
            var pos = this.timeline.resolve(positionOrLabel);
            if (pos == null) {
                return;
            }
            this._prevPosition = pos;
            this._updateTimeline();
        }

        private _reset() {
            this._prevPos = -1;
        }

        private _updateTimeline() {
            var tl = this.timeline;
            var tweens = tl._tweens;
            var synched = this.mode != MovieClip.INDEPENDENT;
            tl.loop = this.loop == null ? true : this.loop;

            // update timeline position, ignoring actions if this is a graphic.
            if (synched) {
                tl.setPosition(this.startPosition + (this.mode == MovieClip.SINGLE_FRAME ? 0 : this._synchOffset), 0);
            } else {
                tl.setPosition(this._prevPosition, this.actionsEnabled ? null : 0);
            }

            this._prevPosition = tl._prevPosition;
            if (this._prevPos == tl._prevPos) {
                return;
            }
            this._prevPos = tl._prevPos;

            for (var n in this._managed) {
                this._managed[n] = 1;
            }

            for (var i = tweens.length - 1; i >= 0; i--) {
                var tween = tweens[i];
                var target = tween._target;
                if (target == this) {
                    continue;
                }
                var offset = tween._stepPosition;

                if (target instanceof egret.DisplayObject) {
                    // motion tween.
                    this._addManagedChild(target, offset);
                } else {
                    // state tween.
                    this._setState(target.state, offset);
                }
            }

            for (i = this.numChildren - 1; i >= 0; i--) {
                var child:any = this.getChildAt(i);
                if (this._managed[child.id] == 1) {
                    this.removeChildAt(i);
                    delete(this._managed[child]);
                }
            }
        }

        private _setState(state, offset) {
            if (!state) {
                return;
            }
            for (var i = 0, l = state.length; i < l; i++) {
                var o = state[i];
                var target = o.t;
                var props = o.p;
                for (var n in props) {
                    target[n] = props[n];
                }
                this._addManagedChild(target, offset);
            }
        }

        private _addManagedChild(child, offset) {
            if (child._off) {
                return;
            }
            this.addChild(child);
            if (child instanceof MovieClip) {
                child._synchOffset = offset;
                if (child.mode == MovieClip.INDEPENDENT && (!this._managed[child.id] || this._prevPos == 0)) {
                    child._reset();
                }
            }
            this._managed[child.id] = 2;
        }

    }

    export class MovieClipPlugin {
        public constructor() {
        }

        public static priority = 100;

        public static init(tween, prop, value) {
            if (prop == "startPosition" || !(tween._target instanceof createjs.MovieClip)) {
                return value;
            }
        }

        public static tween = function (tween, prop, value, startValues, endValues, ratio, position, end) {
            if (!(tween._target instanceof createjs.MovieClip)) {
                return value;
            }
            return (ratio == 1 ? endValues[prop] : startValues[prop]);
        }
    }
}