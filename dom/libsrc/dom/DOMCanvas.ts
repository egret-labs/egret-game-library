/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
module egret.dom {

    export class DOMCanvas extends DOMDiv {
        private initWorldTransform;

        private _doc:egret.DisplayObjectContainer;
        private _render:egret.RendererContext;

        constructor(displayObject:egret.DisplayObjectContainer, id:string) {
            super("canvas", id);

            this._doc = displayObject;

            this._render = new (egret.getDefinitionByName("egret.HTML5CanvasRenderer"))(this._currentDiv);

            this.initWorldTransform = new egret.Matrix();

            this.changeProperty("width", this._doc.width);
            this.changeProperty("height", this._doc.height);

            this.setWidth(this._doc.width);
            this.setHeight(this._doc.height);

            this._overrideFunctions();

        }

        public _overrideFunctions():void {
            super._overrideFunctions();

            var self = this;

            this._doc._draw = function (renderContext:egret.RendererContext) {
                self._draw.call(self, renderContext);
            };

            var tempAddToStage = this._doc._onAddToStage;
            this._doc._onAddToStage = function () {
                egret.dom._alwaysRenderDisplays.push(this);
                tempAddToStage.call(this);
            };

            var tempRemoveFromStage = this._doc._onRemoveFromStage;
            this._doc._onRemoveFromStage = function () {
                var index:number = egret.dom._alwaysRenderDisplays.indexOf(this);
                if (index >= 0) {
                    egret.dom._alwaysRenderDisplays.splice(index, 1);
                }
                tempRemoveFromStage.call(this);
            };
        }

        public _draw(renderContext:egret.RendererContext):void {
            var do_props = this._doc._DO_Props_;
            if (!do_props._visible) {
                this.hide();
                _clear(this._doc);
                return;
            }

            if (this._doc.getDirty()) {
                _renderObject(this._doc, this);
            }

            this._render.onRenderStart();
            this._render.clearScreen();
            //子元件通过canvas渲染
            for (var i:number = 0, length = this._doc._children.length; i < length; i++) {
                var child:egret.DisplayObject = this._doc._children[i];
                child._draw(this._render);
            }
            this._render.onRenderFinish();
        }
    }
}