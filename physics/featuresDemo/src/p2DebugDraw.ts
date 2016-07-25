//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
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
//////////////////////////////////////////////////////////////////////////////
class p2DebugDraw {

    private sprite: egret.Sprite;
    private world: p2.World;
    private COLOR_D_SLEEP: number = 0x999999;
    private COLOR_D_WAKE: number = 0xe5b2b2;
    private COLOR_K: number = 0x9d9df5;
    private COLOR_S: number = 0x7fe57f;

    private lineWidth:number = 1;

    public constructor(world: p2.World) {
        this.world = world;
    }
    public setSprite(sprite: egret.Sprite) {
        this.sprite = sprite;
    }
    public setLineWidth(value:number):void{
        this.lineWidth = value;
    }
    public drawDebug(): void {
        this.sprite.graphics.clear();

        var l: number = this.world.bodies.length;
        for (var i: number = 0; i < l; i++) {
            var body: p2.Body = this.world.bodies[i];
            for (var j: number = 0; j < body.shapes.length; j++) {
                var shape: p2.Shape = body.shapes[j];
                if (shape instanceof p2.Box) {
                    this.drawBox(<p2.Box>shape, body);
                }else if (shape instanceof p2.Convex) {
                    this.drawConvex(<p2.Convex>shape, body);
                } else if (shape instanceof p2.Circle) {
                    this.drawCircle(<p2.Circle>shape, body);
                } else if (shape instanceof p2.Line) {
                    this.drawLine(<p2.Line>shape, body);
                } else if (shape instanceof p2.Particle) {
                    this.drawParticle(<p2.Particle>shape, body);
                } else if (shape instanceof p2.Plane) {
                    this.drawPlane(<p2.Plane>shape, body);
                } else if (shape instanceof p2.Capsule) {
                    this.drawCapsule(<p2.Capsule>shape, body);
                } else if (shape instanceof p2.Heightfield) {
                    this.drawHeightfield(<p2.Heightfield>shape, body);
                }
            }
        }
    }
    public drawRay(start, end, color?){
        // Draw line
        var g: egret.Graphics = this.sprite.graphics;

        g.lineStyle(this.lineWidth, color);
        g.moveTo(start[0], start[1]);
        g.lineTo(end[0], end[1]);

        g.endFill();
    }

    private drawBox(shape: p2.Box, b: p2.Body): void {
        this.drawConvex(shape,b);
    }

    private drawCircle(shape: p2.Circle, b: p2.Body): void {
        var color: number = this.getColor(b);

        var g: egret.Graphics = this.sprite.graphics;
        g.lineStyle(this.lineWidth, color);
        g.beginFill(color, 0.5);

        //支持复合刚体
        var x:number = shape.position[0];
        var y:number = shape.position[1];
        var p:number[] = [];
        b.toWorldFrame(p, [x, y]);
        g.drawCircle(p[0], p[1], shape.radius);

        var edgeX:number = x + shape.radius;
        var edgeY:number = y + 0;
        var edge: number[] = new Array();
        b.toWorldFrame(edge, [edgeX, edgeY]);
        g.moveTo(p[0], p[1]);
        g.lineTo(edge[0], edge[1]);

        g.endFill();
    }
    private drawCapsule(shape: p2.Capsule, b: p2.Body): void {
        var color: number = this.getColor(b);

        //支持复合刚体
        var x:number = shape.position[0];
        var y:number = shape.position[1];
        var angle:number = shape.angle;
        var len: number = shape.length;
        var radius: number = shape.radius;

        var pt1: number[] = new Array(), pt2: number[] = new Array(), pt3: number[] = new Array(), pt4: number[] = new Array();
        var a1: number[] = new Array(), a2: number[] = new Array();

        //支持Shape内部的旋转变换
        p2.vec2.rotate(pt1, [-len / 2, -radius], angle);
        p2.vec2.rotate(pt2, [len / 2, -radius], angle);
        p2.vec2.rotate(pt3, [len / 2, radius], angle);
        p2.vec2.rotate(pt4, [-len / 2, radius], angle);
        p2.vec2.rotate(a1, [len / 2, 0], angle);
        p2.vec2.rotate(a2, [-len / 2, 0], angle);

        var globalpt1: number[] = new Array(), globalpt2: number[] = new Array(), globalpt3: number[] = new Array(), globalpt4: number[] = new Array();
        var globala1: number[] = new Array(), globala2: number[] = new Array();

        b.toWorldFrame(globalpt1, [x + pt1[0], y + pt1[1]]);
        b.toWorldFrame(globalpt2, [x + pt2[0], y + pt2[1]]);
        b.toWorldFrame(globalpt3, [x + pt3[0], y + pt3[1]]);
        b.toWorldFrame(globalpt4, [x + pt4[0], y + pt4[1]]);
        b.toWorldFrame(globala1, [x + a1[0], y + a1[1]]);
        b.toWorldFrame(globala2, [x + a2[0], y + a2[1]]);

        var g: egret.Graphics = this.sprite.graphics;
        g.lineStyle(this.lineWidth, color);
        g.beginFill(color, 0.5);
        g.drawCircle(globala1[0], globala1[1], radius);
        g.endFill();
        g.lineStyle(this.lineWidth, color);
        g.beginFill(color, 0.5);
        g.drawCircle(globala2[0], globala2[1], radius);
        g.endFill();

        g.lineStyle(this.lineWidth, color);
        g.beginFill(color, 0.5);
        g.moveTo(globalpt1[0], globalpt1[1]);
        g.lineTo(globalpt2[0], globalpt2[1]);
        g.lineTo(globalpt3[0], globalpt3[1]);
        g.lineTo(globalpt4[0], globalpt4[1]);

        g.endFill();
    }
    private drawLine(shape: p2.Line, b: p2.Body): void {
        var color: number = this.getColor(b);

        //支持复合刚体
        var x:number = shape.position[0];
        var y:number = shape.position[1];
        var angle:number = shape.angle;
        var len: number = shape.length;

        var point1: number[] = new Array(), point2: number[] = new Array();
        //支持Shape内部的旋转变换
        p2.vec2.rotate(point1, [-len / 2, 0], angle);
        p2.vec2.rotate(point2, [len / 2, 0], angle);

        var finalpoint1:number[]=[];
        var finalpoint2:number[]=[];
        b.toWorldFrame(finalpoint1, [x+point1[0], y+point1[1]]);
        b.toWorldFrame(finalpoint2, [x+point2[0], y+point2[1]]);
        var g: egret.Graphics = this.sprite.graphics;

        g.lineStyle(this.lineWidth, color);

        g.moveTo(finalpoint1[0], finalpoint1[1]);
        g.lineTo(finalpoint2[0], finalpoint2[1]);

        g.endFill();
    }
    private drawHeightfield(shape: p2.Heightfield, b: p2.Body): void {
        var color: number = this.getColor(b);
        var heights:number[] = shape.heights;
        var len:number = heights.length;
        var elementWidth = shape.elementWidth;

        if(len>0){
            //支持复合刚体
            var x:number = shape.position[0];
            var y:number = shape.position[1];

            var p:number[]=[];
            var initP:number[]=[];
            var initX = 0;

            var g: egret.Graphics = this.sprite.graphics;
            g.lineStyle(this.lineWidth, color);
            g.beginFill(color, 0.5);
            //底部的左侧起点
            b.toWorldFrame(initP, [x + initX, y - 100]);
            g.moveTo(initP[0], initP[1]);
            //遍历上部的每个点
            for(var i=0;i<len;i++){
                var tmpY = heights[i];
                b.toWorldFrame(p, [x + initX + i*elementWidth, y + tmpY]);
                g.lineTo(p[0], p[1]);
            }
            //底部右侧的最后一个点
            b.toWorldFrame(p, [x + initX + len*elementWidth, y - 100]);
            g.lineTo(p[0], p[1]);
            //填充形成闭合的块
            g.endFill();
        }
    }
    private drawParticle(shape: p2.Particle, b: p2.Body): void {
        var color: number = this.getColor(b);

        var g: egret.Graphics = this.sprite.graphics;
        g.lineStyle(this.lineWidth, color);
        g.beginFill(color, 0.5);

        //支持复合刚体
        var x:number = shape.position[0];
        var y:number = shape.position[1];
        var centerX:number = b.position[0] + x;
        var centerY:number = b.position[1] + y;

        g.drawCircle(centerX, centerY, this.lineWidth);
        g.endFill();

        g.lineStyle(this.lineWidth, color);
        g.drawCircle(centerX, centerY, this.lineWidth*5);
        g.endFill();
    }
    private drawConvex(shape: p2.Convex, b: p2.Body): void {
        var color: number = this.getColor(b);

        var l: number = shape.vertices.length;
        var g: egret.Graphics = this.sprite.graphics;
        g.lineStyle(this.lineWidth, color);
        g.beginFill(color, 0.5);

        //支持复合刚体
        var x:number = shape.position[0];
        var y:number = shape.position[1];
        var centerP: number[] = new Array();
        b.toWorldFrame(centerP, [x,y]);

        var localP:number[] = shape.vertices[0];
        var p:number[] = [x + localP[0], y + localP[1]];

        var worldPoint: number[] = new Array();
        b.toWorldFrame(worldPoint, p);
        g.moveTo(centerP[0], centerP[1]);
        g.lineTo(worldPoint[0], worldPoint[1]);
        for (var i: number = 1; i <= l; i++) {
            localP = shape.vertices[i % l];
            p = [x + localP[0], y + localP[1]];
            b.toWorldFrame(worldPoint, p);
            g.lineTo(worldPoint[0], worldPoint[1]);
        }

        g.endFill();
    }

    private drawPlane(shape: p2.Plane, b: p2.Body): void {
        var color: number = this.COLOR_D_SLEEP;
        var g: egret.Graphics = this.sprite.graphics;
        g.lineStyle(this.lineWidth, color);
        g.beginFill(color, 1);

        //支持复合刚体
        var x:number = shape.position[0];
        var y:number = shape.position[1];
        var angle:number = shape.angle;

        var start: number[] = new Array();
        var end: number[] = new Array();
        var startGlobal: number[] = [];
        var endGlobal: number[] = [];

        //支持Shape内部的旋转变换
        p2.vec2.rotate(start, [-1000, 0], angle);
        b.toWorldFrame(startGlobal, [x+start[0], y+start[1]]);
        g.moveTo(startGlobal[0], startGlobal[1]);

        p2.vec2.rotate(end, [1000, 0], angle);
        b.toWorldFrame(endGlobal, [x+end[0], y+end[1]]);
        g.lineTo(endGlobal[0], endGlobal[1]);

        p2.vec2.rotate(end, [1000, -1000], angle);
        b.toWorldFrame(endGlobal, [x+end[0], y+end[1]]);
        g.lineTo(endGlobal[0], endGlobal[1]);

        p2.vec2.rotate(end, [-1000, -1000], angle);
        b.toWorldFrame(endGlobal, [x+end[0], y+end[1]]);
        g.lineTo(endGlobal[0], endGlobal[1]);

        p2.vec2.rotate(end, [-1000, -0], angle);
        b.toWorldFrame(endGlobal, [x+end[0], y+end[1]]);
        g.lineTo(endGlobal[0], endGlobal[1]);

        g.endFill();

    }

    private getColor(b: p2.Body): number {
        var color: number = this.COLOR_D_SLEEP;
        if (b.type == p2.Body.KINEMATIC) {
            color = this.COLOR_K;
        } else if (b.type == p2.Body.STATIC) {
            color = this.COLOR_S;
        } else if (b.sleepState == p2.Body.AWAKE) {
            color = this.COLOR_D_WAKE;
        }

        return color;
    }
}
