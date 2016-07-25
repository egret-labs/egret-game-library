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
//////////////////////////////////////////////////////////////////////////////////////
class p2DebugDraw {

    private sprite: egret.Sprite;
    private world: p2.World;
    private COLOR_D_SLEEP: number = 0x999999;
    private COLOR_D_WAKE: number = 0xe5b2b2;
    private COLOR_K: number = 0x7f7fe5;
    private COLOR_S: number = 0x7fe57f;

    public constructor(world: p2.World) {
        this.world = world;
    }
    public setSprite(sprite: egret.Sprite) {
        this.sprite = sprite;
    }
    public drawDebug(): void {
        this.sprite.graphics.clear();

        var l: number = this.world.bodies.length;
        for (var i: number = 0; i < l; i++) {
            var body: p2.Body = this.world.bodies[i];
            for (var j: number = 0; j < body.shapes.length; j++) {
                var shape: p2.Shape = body.shapes[j];
                if (shape instanceof p2.Convex) {
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
                }
            }
        }
    }
    private drawCircle(shape: p2.Circle, b: p2.Body): void {
        var color: number = this.getColor(b);

        var g: egret.Graphics = this.sprite.graphics;
        g.lineStyle(1, color);
        g.beginFill(color, 0.5);
        g.drawCircle(b.position[0], b.position[1], shape.radius);

        var edge: number[] = new Array();
        b.toWorldFrame(edge, [shape.radius, 0]);
        g.moveTo(b.position[0], b.position[1]);
        g.lineTo(edge[0], edge[1]);

        g.endFill();
    }
    private drawCapsule(shape: p2.Capsule, b: p2.Body): void {
        var color: number = this.getColor(b);

        var len: number = shape.length;
        var radius: number = shape.radius;

        var p1: number[] = new Array(), p2: number[] = new Array(), p3: number[] = new Array(), p4: number[] = new Array();
        var a1: number[] = new Array(), a2: number[] = new Array();

        b.toWorldFrame(p1, [-len / 2, -radius]);
        b.toWorldFrame(p2, [len / 2, -radius]);
        b.toWorldFrame(p3, [len / 2, radius]);
        b.toWorldFrame(p4, [-len / 2, radius]);
        b.toWorldFrame(a1, [len / 2, 0]);
        b.toWorldFrame(a2, [-len / 2, 0]);

        var g: egret.Graphics = this.sprite.graphics;
        g.lineStyle(1, color);
        g.beginFill(color, 0.5);
        g.drawCircle(a1[0], a1[1], radius);
        g.endFill();
        g.lineStyle(1, color);
        g.beginFill(color, 0.5);
        g.drawCircle(a2[0], a2[1], radius);
        g.endFill();

        g.lineStyle(1, color);
        g.beginFill(color, 0.5);
        g.moveTo(p1[0], p1[1]);
        g.lineTo(p2[0], p2[1]);
        g.lineTo(p3[0], p3[1]);
        g.lineTo(p4[0], p4[1]);

        g.endFill();
    }
    private drawLine(shape: p2.Line, b: p2.Body): void {
        var color: number = this.getColor(b);

        var len: number = shape.length;

        var p1: number[] = new Array(), p2: number[] = new Array();

        b.toWorldFrame(p1, [-len / 2, 0]);
        b.toWorldFrame(p2, [len / 2, 0]);

        var g: egret.Graphics = this.sprite.graphics;

        g.lineStyle(1, color);
        g.moveTo(p1[0], p1[1]);
        g.lineTo(p2[0], p2[1]);

        g.endFill();
    }
    private drawParticle(shape: p2.Particle, b: p2.Body): void {
        var color: number = this.getColor(b);

        var g: egret.Graphics = this.sprite.graphics;
        g.lineStyle(1, color);
        g.beginFill(color, 0.5);
        g.drawCircle(b.position[0], b.position[1], 1);
        g.endFill();

        g.lineStyle(1, color);
        g.drawCircle(b.position[0], b.position[1], 5);
        g.endFill();
    }
    private drawConvex(shape: p2.Convex, b: p2.Body): void {
        var color: number = this.getColor(b);

        var l: number = shape.vertices.length;
        var g: egret.Graphics = this.sprite.graphics;
        g.lineStyle(1, color);
        g.beginFill(color, 0.5);

        var worldPoint: number[] = new Array();
        b.toWorldFrame(worldPoint, shape.vertices[0]);
        //g.moveTo(worldPoint[0], worldPoint[1]);
        g.moveTo(b.position[0], b.position[1]);
        g.lineTo(worldPoint[0], worldPoint[1]);
        for (var i: number = 1; i <= l; i++) {
            b.toWorldFrame(worldPoint, shape.vertices[i % l]);
            g.lineTo(worldPoint[0], worldPoint[1]);
        }


        g.endFill();
    }

    private drawPlane(shape: p2.Plane, b: p2.Body): void {
        var color: number = this.COLOR_D_SLEEP;
        var g: egret.Graphics = this.sprite.graphics;
        g.lineStyle(1, color);
        g.beginFill(color, 1);

        var start: number[] = new Array();
        var end: number[] = new Array();
        b.toWorldFrame(start, [-1000, 0]);
        g.moveTo(start[0], start[1]);

        b.toWorldFrame(end, [1000, 0]);
        g.lineTo(end[0], end[1]);

        b.toWorldFrame(end, [1000, -1000]);
        g.lineTo(end[0], end[1]);

        b.toWorldFrame(end, [-1000, -1000]);
        g.lineTo(end[0], end[1]);

        b.toWorldFrame(end, [-1000, -0]);
        g.lineTo(end[0], end[1]);

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
