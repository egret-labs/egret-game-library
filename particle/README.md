## ParticleSystem使用手册

------------------


### 概述
该粒子库是基于egret引擎做的扩展，目前提供了重力系统粒子库GravityParticleSystem。在canvas模式下，建议粒子数量不要超过200个。

------


### 自定义扩展
开发者可以根据自己的业务需求扩展：创建自己的粒子系统类并继承particle.ParticleSystem，重写initParticle和advanceParticle方法即可。其中initParticle用于初始化自己的粒子，advanceParticle用于每个时间间隔使粒子发生变化。
##### initParticle

```
public initParticle(particle:particle.Particle):void {
    //初始化粒子属性
}
```
##### advanceParticle
```
public advanceParticle(particle:particle.Particle, dt:number):void {
    //粒子运动变化
}
```
