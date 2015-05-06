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
var egret;
(function (egret) {
    var dom;
    (function (dom) {
        /**
         * 当前容器是否只在canvas渲染
         * @param displayObjectContainer
         */
        function resetUIAsset() {
            if (egret && egret.gui && egret.gui.UIAsset != null) {
                /**
                 * 皮肤发生改变
                 */
                egret.gui.UIAsset.prototype.contentChanged = function (content, source) {
                    if (source !== this._source)
                        return;
                    if(content instanceof egret.Texture){
                        content = new egret.Bitmap(content);
                        content.scale9Grid = this.scale9Grid;
                    }
                    var oldContent = this._content;
                    this._content = content;
                    if (oldContent !== content) {
                        if (oldContent instanceof egret.DisplayObject) {
                            this._removeFromDisplayList(oldContent);
                        }
                        if (content instanceof egret.DisplayObject) {
                            this._addToDisplayListAt(content, 0);
                        }
                    }
                    this.invalidateSize();
                    this.invalidateDisplayList();
                    this.contentReused = false;
                    if (this.hasEventListener(egret.gui.UIEvent.CONTENT_CHANGED)) {
                        egret.gui.UIEvent.dispatchUIEvent(this, egret.gui.UIEvent.CONTENT_CHANGED);
                    }
                }
            }
        }
        dom.resetUIAsset = resetUIAsset;
    })(dom = egret.dom || (egret.dom = {}));
})(egret || (egret = {}));
