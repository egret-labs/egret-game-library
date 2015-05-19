//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

module egret {
    /**
     * @class egret.HTML5DOMRenderer
     * @classdesc
     * @extends egret.RendererContext
     */
    export class HTML5DOMRenderer extends RendererContext {

        private canvas;
        /**
         * @member egret.HTML5DOMRenderer#canvasContext
         */
        public canvasContext;

        constructor() {
            super();
            this.canvas = document.createElement("canvas");
            this.canvasContext = this.canvas.getContext("2d");

            egret.dom.initStage();
        }

        clearScreen() {

        }

        clearRect(x:number, y:number, w:number, h:number) {

        }

        drawImage(texture:Texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight) {

        }

        setTransform(matrix:egret.Matrix) {
        }

        setAlpha(alpha:number, blendMode:egret.BlendMode) {

        }

        setupFont(textField:TextField):void {
            var ctx = this.canvasContext;
            var font = textField.italic ? "italic " : "normal ";
            font += textField.bold ? "bold " : "normal ";
            font += textField.size + "px " + textField.fontFamily;
            ctx.font = font;
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
        }


        measureText(text:string):number {
            var result = this.canvasContext.measureText(text);
            return result.width;
        }


        drawText(textField:egret.TextField, text:string, x:number, y:number, maxWidth:number) {
        }

        strokeRect(x, y, w, h, color) {
        }


        public pushMask(mask:Rectangle):void {
        }

        public popMask():void {
        }


        //WebGL API
    }
}
