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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var egret;
(function (egret) {
    /**
    * @class egret.WebGLRenderer
    * @classdesc
    * @extends egret.RendererContext
    */
    var WebGLRenderer = (function (_super) {
        __extends(WebGLRenderer, _super);
        function WebGLRenderer(canvas) {
            _super.call(this);
            this.size = 2000;
            this.vertSize = 6;
            this.contextLost = false;
            this.glContextId = 0;
            this.currentBlendMode = "";
            this.currentBaseTexture = null;
            this.currentBatchSize = 0;
            this.maskList = [];
            this.maskDataFreeList = [];
            this.canvasContext = document.createElement("canvas").getContext("2d");
            console.log("使用WebGL模式");
            this.canvas = canvas;
            canvas.addEventListener("webglcontextlost", this.handleContextLost.bind(this), false);
            canvas.addEventListener("webglcontextrestored", this.handleContextRestored.bind(this), false);

            this.projectionX = canvas.width / 2;
            this.projectionY = -canvas.height / 2;

            var numVerts = this.size * 4 * this.vertSize;
            var numIndices = this.size * 6;

            this.vertices = new Float32Array(numVerts);
            this.indices = new Uint16Array(numIndices);

            for (var i = 0, j = 0; i < numIndices; i += 6, j += 4) {
                this.indices[i + 0] = j + 0;
                this.indices[i + 1] = j + 1;
                this.indices[i + 2] = j + 2;
                this.indices[i + 3] = j + 0;
                this.indices[i + 4] = j + 2;
                this.indices[i + 5] = j + 3;
            }
            this.initWebGL();

            this.shaderManager = new egret.WebGLShaderManager(this.gl);

            this.worldTransform = new egret.Matrix();

            this.initBlendMode();

            egret.MainContext.instance.addEventListener(egret.Event.FINISH_RENDER, this._draw, this);

            egret.TextField.prototype._draw = function (renderContext) {
                var textField = this;
                if (textField.getDirty()) {
                    textField.cacheAsBitmap = true;
                }
                egret.DisplayObject.prototype._draw.call(textField, renderContext);
            };
        }
        WebGLRenderer.prototype.handleContextLost = function () {
            this.contextLost = true;
        };

        WebGLRenderer.prototype.handleContextRestored = function () {
            this.initWebGL();
            this.shaderManager.setContext(this.gl);
            this.contextLost = false;
        };

        WebGLRenderer.prototype.initWebGL = function () {
            var options = {
                stencil: true
            };
            var gl;
            var names = ["experimental-webgl", "webgl"];
            for (var i = 0; i < names.length; i++) {
                try  {
                    gl = this.canvas.getContext(names[i], options);
                } catch (e) {
                }
                if (gl) {
                    break;
                }
            }
            if (!gl) {
                throw new Error("当前浏览器不支持webgl");
            }
            this.setContext(gl);
        };

        WebGLRenderer.prototype.setContext = function (gl) {
            this.gl = gl;
            gl.id = this.glContextId++;
            this.vertexBuffer = gl.createBuffer();
            this.indexBuffer = gl.createBuffer();

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);

            gl.disable(gl.DEPTH_TEST);
            gl.disable(gl.CULL_FACE);
            gl.enable(gl.BLEND);
            gl.colorMask(true, true, true, true);
        };

        WebGLRenderer.prototype.initBlendMode = function () {
            WebGLRenderer.blendModesWebGL[egret.BlendMode.NORMAL] = [this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA];
            WebGLRenderer.blendModesWebGL[egret.BlendMode.ADD] = [this.gl.SRC_ALPHA, this.gl.DST_ALPHA];
        };

        WebGLRenderer.prototype.start = function () {
            if (this.contextLost) {
                return;
            }
            var gl = this.gl;

            gl.activeTexture(gl.TEXTURE0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

            var shader = this.shaderManager.defaultShader;
            gl.uniform2f(shader.projectionVector, this.projectionX, this.projectionY);

            var stride = this.vertSize * 4;
            gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, stride, 0);
            gl.vertexAttribPointer(shader.aTextureCoord, 2, gl.FLOAT, false, stride, 2 * 4);
            gl.vertexAttribPointer(shader.colorAttribute, 2, gl.FLOAT, false, stride, 4 * 4);
        };

        WebGLRenderer.prototype.clearScreen = function () {
            var gl = this.gl;
            gl.colorMask(true, true, true, true);
            var list = egret.RenderFilter.getInstance().getDrawAreaList();
            for (var i = 0, l = list.length; i < l; i++) {
                var area = list[i];
                gl.viewport(area.x, area.y, area.width, area.height);
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                gl.clearColor(0, 0, 0, 0);
                gl.clear(gl.COLOR_BUFFER_BIT);
            }
            this.renderCost = 0;
        };

        WebGLRenderer.prototype.setBlendMode = function (blendMode) {
            if (!blendMode) {
                blendMode = egret.BlendMode.NORMAL;
            }
            if (this.currentBlendMode != blendMode) {
                var blendModeWebGL = WebGLRenderer.blendModesWebGL[blendMode];
                if (blendModeWebGL) {
                    this.gl.blendFunc(blendModeWebGL[0], blendModeWebGL[1]);
                    this.currentBlendMode = blendMode;
                }
            }
        };

        WebGLRenderer.prototype.drawImage = function (texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight) {
            if (this.contextLost) {
                return;
            }

            var texture_scale_factor = egret.MainContext.instance.rendererContext.texture_scale_factor;
            sourceX = sourceX / texture_scale_factor;
            sourceY = sourceY / texture_scale_factor;
            sourceWidth = sourceWidth / texture_scale_factor;
            sourceHeight = sourceHeight / texture_scale_factor;

            this.createWebGLTexture(texture);

            if (texture.webGLTexture !== this.currentBaseTexture || this.currentBatchSize >= this.size) {
                this._draw();
                this.currentBaseTexture = texture.webGLTexture;
            }

            //计算出绘制矩阵，之后把矩阵还原回之前的
            var locWorldTransform = this.worldTransform;
            var originalA = locWorldTransform.a;
            var originalB = locWorldTransform.b;
            var originalC = locWorldTransform.c;
            var originalD = locWorldTransform.d;
            var originalTx = locWorldTransform.tx;
            var originalTy = locWorldTransform.ty;
            if (destX != 0 || destY != 0) {
                locWorldTransform.append(1, 0, 0, 1, destX, destY);
            }
            if (sourceWidth / destWidth != 1 || sourceHeight / destHeight != 1) {
                locWorldTransform.append(destWidth / sourceWidth, 0, 0, destHeight / sourceHeight, 0, 0);
            }
            var a = locWorldTransform.a;
            var b = locWorldTransform.b;
            var c = locWorldTransform.c;
            var d = locWorldTransform.d;
            var tx = locWorldTransform.tx;
            var ty = locWorldTransform.ty;

            locWorldTransform.a = originalA;
            locWorldTransform.b = originalB;
            locWorldTransform.c = originalC;
            locWorldTransform.d = originalD;
            locWorldTransform.tx = originalTx;
            locWorldTransform.ty = originalTy;

            var width = texture._sourceWidth;
            var height = texture._sourceHeight;

            var w = sourceWidth;
            var h = sourceHeight;

            sourceX = sourceX / width;
            sourceY = sourceY / height;
            sourceWidth = sourceWidth / width;
            sourceHeight = sourceHeight / height;

            var vertices = this.vertices;
            var index = this.currentBatchSize * 4 * this.vertSize;
            var alpha = this.worldAlpha;
            var tint = 0xFFFFFF;

            // xy
            vertices[index++] = tx;
            vertices[index++] = ty;

            // uv
            vertices[index++] = sourceX;
            vertices[index++] = sourceY;

            // color
            vertices[index++] = alpha;
            vertices[index++] = tint;

            // xy
            vertices[index++] = a * w + tx;
            vertices[index++] = b * w + ty;

            // uv
            vertices[index++] = sourceWidth + sourceX;
            vertices[index++] = sourceY;

            // color
            vertices[index++] = alpha;
            vertices[index++] = tint;

            // xy
            vertices[index++] = a * w + c * h + tx;
            vertices[index++] = d * h + b * w + ty;

            // uv
            vertices[index++] = sourceWidth + sourceX;
            vertices[index++] = sourceHeight + sourceY;

            // color
            vertices[index++] = alpha;
            vertices[index++] = tint;

            // xy
            vertices[index++] = c * h + tx;
            vertices[index++] = d * h + ty;

            // uv
            vertices[index++] = sourceX;
            vertices[index++] = sourceHeight + sourceY;

            // color
            vertices[index++] = alpha;
            vertices[index++] = tint;

            this.currentBatchSize++;
        };

        WebGLRenderer.prototype._draw = function () {
            if (this.currentBatchSize == 0 || this.contextLost) {
                return;
            }
            var beforeDraw = egret.getTimer();
            this.start();
            var gl = this.gl;
            gl.bindTexture(gl.TEXTURE_2D, this.currentBaseTexture);
            var view = this.vertices.subarray(0, this.currentBatchSize * 4 * this.vertSize);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, view);
            gl.drawElements(gl.TRIANGLES, this.currentBatchSize * 6, gl.UNSIGNED_SHORT, 0);
            this.currentBatchSize = 0;
            this.renderCost += egret.getTimer() - beforeDraw;
            egret.Profiler.getInstance().onDrawImage();
        };

        WebGLRenderer.prototype.setTransform = function (matrix) {
            var locWorldTransform = this.worldTransform;
            locWorldTransform.a = matrix.a;
            locWorldTransform.b = matrix.b;
            locWorldTransform.c = matrix.c;
            locWorldTransform.d = matrix.d;
            locWorldTransform.tx = matrix.tx;
            locWorldTransform.ty = matrix.ty;
        };

        WebGLRenderer.prototype.setAlpha = function (value, blendMode) {
            this.worldAlpha = value;
            this.setBlendMode(blendMode);
        };

        WebGLRenderer.prototype.createWebGLTexture = function (texture) {
            if (!texture.webGLTexture) {
                var gl = this.gl;
                texture.webGLTexture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, texture.webGLTexture);
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture._bitmapData);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                gl.bindTexture(gl.TEXTURE_2D, null);
            }
        };

        WebGLRenderer.prototype.pushMask = function (mask) {
            this._draw();
            var gl = this.gl;
            if (this.maskList.length == 0) {
                gl.enable(gl.STENCIL_TEST);
                gl.stencilFunc(gl.ALWAYS, 1, 1);
            }

            var maskData = this.maskDataFreeList.pop();
            if (!maskData) {
                maskData = { x: mask.x, y: mask.y, w: mask.width, h: mask.height };
            } else {
                maskData.x = mask.x;
                maskData.y = mask.y;
                maskData.w = mask.width;
                maskData.h = mask.height;
            }
            this.maskList.push(maskData);

            gl.colorMask(false, false, false, false);
            gl.stencilOp(gl.KEEP, gl.KEEP, gl.INCR);

            this.renderGraphics(maskData);

            gl.colorMask(true, true, true, true);
            gl.stencilFunc(gl.NOTEQUAL, 0, this.maskList.length);
            gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
        };

        WebGLRenderer.prototype.popMask = function () {
            this._draw();
            var gl = this.gl;
            var maskData = this.maskList.pop();
            if (maskData) {
                gl.colorMask(false, false, false, false);
                gl.stencilOp(gl.KEEP, gl.KEEP, gl.DECR);
                this.renderGraphics(maskData);
                gl.colorMask(true, true, true, true);
                gl.stencilFunc(gl.NOTEQUAL, 0, this.maskList.length);
                gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
                this.maskDataFreeList.push(maskData);
            }
            if (this.maskList.length == 0) {
                gl.disable(gl.STENCIL_TEST);
            }
        };

        WebGLRenderer.prototype.setupFont = function (textField) {
            var ctx = this.canvasContext;
            var font = textField.italic ? "italic " : "normal ";
            font += textField.bold ? "bold " : "normal ";
            font += textField.size + "px " + textField.fontFamily;
            ctx.font = font;
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
        };

        WebGLRenderer.prototype.measureText = function (text) {
            var result = this.canvasContext.measureText(text);
            return result.width;
        };

        WebGLRenderer.prototype.renderGraphics = function (graphics) {
            var gl = this.gl;
            var shader = this.shaderManager.primitiveShader;

            if (!this.graphicsPoints) {
                this.graphicsPoints = [];
                this.graphicsIndices = [];
                this.graphicsBuffer = gl.createBuffer();
                this.graphicsIndexBuffer = gl.createBuffer();
            } else {
                this.graphicsPoints.length = 0;
                this.graphicsIndices.length = 0;
            }

            this.updateGraphics(graphics);

            this.shaderManager.activateShader(shader);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            gl.uniformMatrix3fv(shader.translationMatrix, false, this.worldTransform.toArray(true));

            gl.uniform2f(shader.projectionVector, this.projectionX, -this.projectionY);
            gl.uniform2f(shader.offsetVector, 0, 0);

            gl.uniform3fv(shader.tintColor, [1, 1, 1]);

            gl.uniform1f(shader.alpha, this.worldAlpha);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.graphicsBuffer);

            gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 4 * 6, 0);
            gl.vertexAttribPointer(shader.colorAttribute, 4, gl.FLOAT, false, 4 * 6, 2 * 4);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.graphicsIndexBuffer);

            gl.drawElements(gl.TRIANGLE_STRIP, this.graphicsIndices.length, gl.UNSIGNED_SHORT, 0);

            this.shaderManager.activateShader(this.shaderManager.defaultShader);
        };

        WebGLRenderer.prototype.updateGraphics = function (graphics) {
            var gl = this.gl;

            this.buildRectangle(graphics);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.graphicsBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.graphicsPoints), gl.STATIC_DRAW);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.graphicsIndexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.graphicsIndices), gl.STATIC_DRAW);
        };

        WebGLRenderer.prototype.buildRectangle = function (graphicsData) {
            var x = graphicsData.x;
            var y = graphicsData.y;
            var width = graphicsData.w;
            var height = graphicsData.h;

            var r = 0;
            var g = 0;
            var b = 0;
            var alpha = 1;

            var verts = this.graphicsPoints;
            var indices = this.graphicsIndices;
            var vertPos = verts.length / 6;

            verts.push(x, y);
            verts.push(r, g, b, alpha);

            verts.push(x + width, y);
            verts.push(r, g, b, alpha);

            verts.push(x, y + height);
            verts.push(r, g, b, alpha);

            verts.push(x + width, y + height);
            verts.push(r, g, b, alpha);

            indices.push(vertPos, vertPos, vertPos + 1, vertPos + 2, vertPos + 3, vertPos + 3);
        };
        WebGLRenderer.blendModesWebGL = {};
        return WebGLRenderer;
    })(egret.RendererContext);
    egret.WebGLRenderer = WebGLRenderer;
    WebGLRenderer.prototype.__class__ = "egret.WebGLRenderer";
})(egret || (egret = {}));
