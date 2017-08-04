var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 实体组件系统插件体系架构
 * @author yanjiaqi
 *
 */
var ecs;
(function (ecs) {
    //引用池
    ecs.global_ref = {
        listeners: {}
    };
    var global_temp = {};
    //逻辑节点,负责组织整个场景结构
    var Node = (function () {
        function Node(obj) {
            this._visualable = false;
            this._prefab = false;
            if (obj) {
                this._wrap_obj = obj;
                this.type = obj.type;
                this.name = obj.name;
                this._prefab = obj.prefab ? true : false;
            }
            this.id = 0;
            this.parent = null;
            this.children = [];
            this.components = [];
        }
        Object.defineProperty(Node.prototype, "visualable", {
            get: function () {
                return this._visualable;
            },
            set: function (val) {
                if (val !== this._visualable) {
                    this._visualable = val;
                    if (val) {
                        //组件可视化
                        if (!this._raw) {
                            assembleContainer(this);
                        }
                        //属性向上传递确保父对象也可视化了
                        if (this.parent) {
                            this.parent.visualable = true;
                        }
                        /**
                         * step3.属性注入
                         */
                        injectNodeProperties(this._wrap_obj.properties, this);
                        if (this.parent && this.parent._raw) {
                            //核心是添加
                            this.parent._raw.addChild(this._raw);
                        }
                    }
                    else {
                        //检查所有孩子必须可视化，若没有可视化元素则向上传递
                        this.active = false;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Node.prototype.getChildren = function () {
        };
        Node.prototype.getChildByName = function (childName) {
            for (var i = 0; i < this.children.length; i++) {
                if (this.children[i].name === childName) {
                    return this.children[i];
                }
            }
            return null;
        };
        Node.prototype.getComponent = function (componentName) {
            for (var i = 0; i < this.components.length; i++) {
                if (this.components[i].name === componentName) {
                    return this.components[i];
                }
            }
            return null;
        };
        Node.prototype.addComponent = function (component) {
            if (this._relative && component.single) {
                return false;
            }
            this.components.push(component);
            component.node = this;
            return true;
        };
        Node.prototype.setPosition = function (x, y) {
            if (this._wrap_obj && this._wrap_obj.properties) {
                this._wrap_obj.properties.x = x;
                this._wrap_obj.properties.y = y;
            }
        };
        /**
         * 此处的Node必须是经过实体可视化的
         * 对场景中已有的preFab通过instantiate产生的都是实体可视化的
         * 加入添加之后或之前需要setPosition(egret.Point(0,0));
         * 因为坐标点从preFab一并复制过来了
         **/
        Node.prototype.addChild = function (child) {
            //关联node
            child.parent = this;
            this.children.push(child);
            //可视化
            if (child.visualable) {
                this.visualable = true;
                console.log("node.addChild", this._raw);
                /**
                 * step3.属性注入
                 */
                //关联实体
                if (this._raw) {
                    this._raw.addChild(child._raw);
                    //需要重置位置
                    child.x = child.x;
                    child.y = child.y;
                    //injectNodeProperties(this._wrap_obj.properties,this);
                    //injectNodeProperties(child._wrap_obj.properties,child);
                }
            }
        };
        Node.prototype.removeChild = function (child) {
        };
        Node.prototype.removeAllChildren = function () {
            //var temp = this.children;
            this.children.length = 0;
            if (this.visualable) {
                this._raw.removeChildren();
                this.visualable = false;
            }
        };
        return Node;
    }());
    ecs.Node = Node;
    __reflect(Node.prototype, "ecs.Node");
    //逻辑组件,具有生命周期函数
    var Component = (function () {
        function Component(obj) {
            /**
             * single属性与所在node节点的_relative相对应
             * single同为true的Component在同一个Node上互斥
            ***/
            this.single = false;
            this._raw = null;
            if (obj) {
                this._wrap_obj = obj;
                this.type = obj.type;
                this.name = obj.name;
            }
            this.id = 0;
            this.node = null;
        }
        Component.prototype.getComponent = function (componentName) {
            return this.node.getComponent(componentName);
        };
        Component.prototype.onLoad = function () {
        };
        Component.prototype.start = function () {
        };
        Component.prototype.onStop = function () {
        };
        return Component;
    }());
    ecs.Component = Component;
    __reflect(Component.prototype, "ecs.Component");
    function setScrollingEvents(target) {
        target.touchEnabled = true;
        target.addEventListener(egret.TouchEvent.TOUCH_BEGIN, onTouchBegin, target);
        target.addEventListener(egret.TouchEvent.TOUCH_CANCEL, onTouchCancel, target);
        target.addEventListener(egret.TouchEvent.TOUCH_END, onTouchEnd, target);
        target.addEventListener(egret.TouchEvent.TOUCH_MOVE, onTouchMove, target);
        target.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, onTouchReleaseOutside, target);
        target.addEventListener(egret.TouchEvent.TOUCH_TAP, onTouchTap, target);
    }
    function removeScrollingEvents(target) {
        target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, onTouchBegin, target);
        target.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, onTouchCancel, target);
        target.removeEventListener(egret.TouchEvent.TOUCH_END, onTouchEnd, target);
        target.removeEventListener(egret.TouchEvent.TOUCH_MOVE, onTouchMove, target);
        target.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, onTouchReleaseOutside, target);
        target.removeEventListener(egret.TouchEvent.TOUCH_TAP, onTouchTap, target);
    }
    function onTouchBegin(event) {
        //
        console.log("tounch begin", event);
        //this['touchBeginX'] = event.localX;
        this['touchBeginY'] = event.localY;
    }
    function onTouchCancel(event) {
        console.log("tounch cancel", event);
    }
    function onTouchEnd(event) {
        console.log("tounch end", event);
    }
    function onTouchMove(event) {
        console.log("touch move currentTarget.y", event.currentTarget.y);
        //event.currentTarget.x += event.localX - this['touchBeginX'];
        event.currentTarget.y += event.localY - this['touchBeginY'];
        testYofSceneTopContainer(event.currentTarget.y);
        //var designHeight = global_ref['scrollings'].designHeight;
        //var index = Math.floor(-event.currentTarget.y/designHeight)+1;
        //var progress = (-event.currentTarget.y % designHeight)*100/designHeight;
        //console.log("index, progress",index,progress);
        //global_ref['listeners']['scene'+(index+1)](progress,true);
        //var progress =
    }
    function onTouchReleaseOutside(event) {
        console.log("touch release outside", event);
    }
    function onTouchTap(event) {
        console.log("touch tap", event);
    }
    function setSceneScrollingListener(sceneName, handler) {
        ecs.global_ref.listeners[sceneName] = handler;
    }
    ecs.setSceneScrollingListener = setSceneScrollingListener;
    function removeSceneScrollingListener(sceneName) {
        delete ecs.global_ref.listener[sceneName];
    }
    ecs.removeSceneScrollingListener = removeSceneScrollingListener;
    function scrollScenes(designHeight, scenes, topContainer, initIndex, isVertical) {
        if (initIndex === void 0) { initIndex = 0; }
        if (isVertical === void 0) { isVertical = true; }
        console.log('invoke by scrollScenes', scenes);
        //setScrollingEvents(topContainer);
        ecs.global_ref['scrollings'] = {
            designHeight: designHeight,
            scenes: scenes,
            topContainer: topContainer
        };
        //计算所有场景的视口范围(y坐标)
        var newViewPortY = 0;
        var stageHeight = topContainer.stage.stageHeight;
        var initHeight = -(designHeight - stageHeight) / 2;
        scenes.forEach(function (scene, rankId) {
            var sceneReference = {};
            ecs.global_ref[scene.name] = { reference: sceneReference };
            var topIds = parseBegin(scene.scene, ecs.global_ref[scene.name].reference, null, scene.name);
            ecs.global_ref[scene.name].topIds = topIds;
            topIds.forEach(function (topId) {
                if (sceneReference[topId].visualable &&
                    !sceneReference[topId]._prefab) {
                    sceneReference[topId]._raw.y = sceneReference[topId]._raw.y + initHeight + designHeight * rankId;
                    topContainer.addChild(sceneReference[topId]._raw);
                }
            });
            //topIds.forEach(topId=>{
            //    invokeComponentsCallBack(sceneReference[topId]);
            //});
        });
        scrollTo(initIndex);
    }
    ecs.scrollScenes = scrollScenes;
    function getSceneNameByIndex(index) {
        if (ecs.global_ref.scrollings && ecs.global_ref.scrollings.scenes) {
            if (index < ecs.global_ref.scrollings.scenes.length) {
                return ecs.global_ref.scrollings.scenes[index].name;
            }
        }
        return null;
    }
    ecs.getSceneNameByIndex = getSceneNameByIndex;
    function getIndexBySceneName(sceneName) {
        if (ecs.global_ref.scrollings && ecs.global_ref.scrollings.scenes) {
            for (var i = 0; i < ecs.global_ref.scrollings.scenes.length; i++) {
                if (ecs.global_ref.scrollings.scenes[i].name === sceneName) {
                    return i;
                }
            }
        }
        return -1;
    }
    ecs.getIndexBySceneName = getIndexBySceneName;
    //切换场景
    function switchScene(oldSceneName, newSceneName, newSceneResourceName) {
        if (newSceneResourceName) {
            var sceneReference = {};
            ecs.global_ref[newSceneName] = { reference: sceneReference };
            var topIds = parseBegin(RES.getRes(newSceneResourceName), ecs.global_ref[newSceneName].reference, null, newSceneName);
            ecs.global_ref[newSceneName].topIds = topIds;
        }
        //hack
        var topNode = ecs.global_ref[oldSceneName].reference[1];
        var topContainer = topNode._raw;
        if (topContainer.parent) {
            var sceneReference_1 = ecs.global_ref[newSceneName].reference;
            var x = topContainer.x;
            var y = topContainer.y;
            var topIds = ecs.global_ref[newSceneName].topIds;
            topIds.forEach(function (topId) {
                if (sceneReference_1[topId].visualable &&
                    !sceneReference_1[topId]._prefab) {
                    sceneReference_1[topId]._raw.y = y;
                    sceneReference_1[topId]._raw.x = x;
                    topContainer.parent.addChild(sceneReference_1[topId]._raw);
                }
            });
            topIds.forEach(function (topId) {
                invokeComponentsCallBack(sceneReference_1[topId]);
            });
        }
    }
    ecs.switchScene = switchScene;
    function testYofSceneTopContainer(y, handler) {
        if (global_temp.stageHeight === undefined) {
            global_temp.stageHeight = ecs.global_ref.scrollings.topContainer.stage.stageHeight;
        }
        if (global_temp.designHeight === undefined) {
            global_temp.designHeight = ecs.global_ref.scrollings.designHeight;
        }
        var rangeIndex = Math.floor(-y / global_temp.designHeight);
        //rangeIndex场景的离场范围
        var leaveFrom0 = -global_temp.designHeight * rangeIndex;
        var leaveFrom100 = leaveFrom0 - global_temp.stageHeight;
        if (y < leaveFrom0 && y >= leaveFrom100) {
            var progress = (y - leaveFrom0) * 100 / (leaveFrom100 - leaveFrom0);
            console.log("scene" + (rangeIndex + 1) + 'leaving progress:' + progress);
            var sceneName = getSceneNameByIndex(rangeIndex);
            if (sceneName && ecs.global_ref.listeners[sceneName]) {
                ecs.global_ref.listeners[sceneName](progress, false);
            }
        }
        //rangeIndex+1场景的入场范围
        var enterFrom100 = -global_temp.designHeight * (rangeIndex + 1);
        var enterFrom0 = enterFrom100 + global_temp.stageHeight;
        if (y < enterFrom0 && y >= enterFrom100) {
            var progress = (y - enterFrom0) * 100 / (enterFrom100 - enterFrom0);
            console.log("scene" + (rangeIndex + 2) + 'entering progress:' + progress);
            var sceneName = getSceneNameByIndex(rangeIndex + 1);
            if (sceneName && ecs.global_ref.listeners[sceneName]) {
                ecs.global_ref.listeners[sceneName](progress, true);
            }
        }
    }
    function scrollToByName(sceneName, callBack) {
        scrollTo(getIndexBySceneName(sceneName), callBack);
    }
    ecs.scrollToByName = scrollToByName;
    function scrollTo(sceneIndex, callBack) {
        var animator = ecs.global_ref['scrollings'].topContainer;
        var sceneHeight = ecs.global_ref['scrollings'].designHeight;
        egret.Tween.get(animator, { onChange: onChange, onChangeObj: animator }).to({ y: -sceneIndex * sceneHeight }, 800, egret.Ease.cubicInOut).call(onEnd, animator);
        function onEnd() {
            var sceneName = getSceneNameByIndex(sceneIndex);
            console.log(sceneName + ' start');
            ecs.global_ref[sceneName].topIds.forEach(function (topId) { return invokeComponentsCallBack(ecs.global_ref[sceneName].reference[topId]); });
            if (callBack) {
                callBack();
            }
        }
        function onChange() {
            testYofSceneTopContainer(this.y);
        }
    }
    ecs.scrollTo = scrollTo;
    function parseScene(scene, topContainer, sceneName) {
        if (!sceneName) {
            sceneName = genSceneName();
        }
        ecs.global_ref[sceneName] = {
            reference: {},
            topIds: null
        };
        var topIds = parseBegin(scene, ecs.global_ref[sceneName].reference, topContainer, sceneName);
        ecs.global_ref.topIds = topIds;
        return ecs.global_ref[sceneName];
    }
    ecs.parseScene = parseScene;
    function genSceneName() {
        var i = 0;
        while ('scene' + i in ecs.global_ref) {
            i++;
        }
        return 'scene' + i;
    }
    //场景解析入口函数
    function parseBegin(scene, references, topContainer, sceneName) {
        var topIds = [];
        scene.forEach(function (nodeWrapper) { return topIds.push(nodeWrapper.id); });
        /**
         * step1.第一遍遍历从静态json格式的数据转化成Node类型和Component类型的实体数据
         *       确定id和引用关系并将引用添加到引用库。
         */
        scene.forEach(function (node) { return parseGenNode(node, references, sceneName); });
        /**
         * step2.第二遍遍历Node节点以及其下的Component建立对应类型的可视化实体
         * 与实体组件属性绑定(通过node和component就能访问可视化实体的各种方法和属性)
         */
        topIds.forEach(function (topId) { return assembleNodeComponents(references[topId], references); });
        console.log("references", references);
        /**
         *  step3.所有组件可视化后将顶级组件添加到场景并触发全部组件回调
         */
        if (topContainer) {
            topIds.forEach(function (topId) {
                if (references[topId].visualable &&
                    !references[topId]._prefab) {
                    topContainer.addChild(references[topId]._raw);
                }
            });
            topIds.forEach(function (topId) {
                invokeComponentsCallBack(references[topId]);
            });
        }
        return topIds;
    }
    //从json配置生成逻辑节点
    function parseGenNode(nodeWrapper, references, sceneName) {
        var instance = new Node(nodeWrapper);
        references[nodeWrapper.id] = instance;
        if (nodeWrapper.parent) {
            instance.parent = references[nodeWrapper.parent];
        }
        nodeWrapper.components.forEach(function (component) { return parseGenComponent(component, references, sceneName); });
        nodeWrapper.children.forEach(function (child) { return parseGenNode(child, references, sceneName); });
        if (instance.parent) {
            instance.parent.children.push(instance);
        }
    }
    //从json配置生成逻辑组件
    function parseGenComponent(componentWrapper, references, sceneName) {
        var instance = new Component(componentWrapper);
        if (sceneName) {
            instance['sceneName'] = sceneName;
        }
        references[componentWrapper.id] = instance;
        var cnode = references[componentWrapper.node];
        if (cnode) {
            cnode.addComponent(instance);
        }
    }
    //保存场景文件
    function saveScene() {
        return false;
    }
    ecs.saveScene = saveScene;
    //可视化组件列表
    var ui_components = { Label: 1, Sprite: 1, Animation: 1 };
    //根据组件类型装配组件
    function assembleNodeComponents(currentNode, references) {
        //遍历组件列表
        currentNode.components.forEach(function (component) {
            if (component._wrap_obj.name in ui_components) {
                switch (component._wrap_obj.name) {
                    case "Label":
                        component.single = true;
                        assembleLabel(component);
                        //可视化组件 将触发整个自下而上的可视化过程
                        component.node.visualable = true;
                        /**
                         * 属性注入
                         */
                        injectProperties(component._wrap_obj.properties, component);
                        console.log("set text color:", component.node.color);
                        injectProperties({ color: component.node.color }, component.node);
                        //将可视化组件添加到实体化后的可视化节点容器上
                        currentNode._raw.addChild(component._raw);
                        break;
                    case "Sprite":
                        component.single = true;
                        assembleSprite(component);
                        //可视化组件 将触发整个自下而上的可视化过程
                        component.node.visualable = true;
                        //将可视化组件添加到实体化后的可视化节点容器上
                        currentNode._raw.addChild(component._raw);
                        break;
                    case "Animation":
                        assembleAnimation(component);
                        //可视化组件 将触发整个自下而上的可视化过程
                        component.node.visualable = true;
                        break;
                }
            }
            else 
            //非可视化组件 不触发自顶而下的可视化过程
            if (component.name === "Canvas") {
                assembleCanvas(component);
            }
            else {
                assembleScript(component, references);
            }
        });
        currentNode.children.forEach(function (childNode) { return assembleNodeComponents(childNode, references); });
    }
    /**
     * 节点可视化
     * @param node
     */
    function assembleContainer(node) {
        /**
         * step1.创建可视化实体并赋给节点_raw
         */
        var container = new egret.DisplayObjectContainer();
        node._raw = container;
        /**
         * step2.绑定节点属性到可视化实体
         */
        bindBasicNodeProperties(node);
    }
    /**
     * 装配标签组件
     * @param component
     */
    function assembleLabel(component) {
        var labelNode = new egret.TextField();
        component._raw = labelNode;
        component.node._relative = labelNode;
        component.aligns = {
            "LEFT_TOP": [0, 0],
            "RIGHT_BOTTOM": [1, 1],
            "RIGHT_TOP": [1, 0],
            "LEFT_BOTTOM": [0, 1],
            "CENTER": [0.5, 0.5],
            "TOP": [0.5, 0],
            "LEFT": [0, 0.5],
            "BOTTOM": [0.5, 1],
            "RIGHT": [1, 0.5]
        };
        component.resize = function () {
            console.log(this.node.width, this.node.height, this._raw.textWidth, this._raw.textHeight);
            /**
             * step1.把用户设定的宽度设置给egret.TextField用于计算文本宽高
             */
            this._raw.width = this.node.width;
            this._raw.height = this.node.height;
            /**
             * step2.把计算后的文字宽高设置给egret.TextField用于包裹
             * @type {number}
             */
            this._raw.width = this._raw.textWidth;
            this._raw.height = this._raw.textHeight;
            this.node.anchorX = this.node.anchorX;
            this.node.anchorY = this.node.anchorY;
            this.node.x = this.node.x;
            this.node.y = this.node.y;
            this.textAlign = this.textAlign;
        };
        /**
         * 将组件自身的text,size属性绑定至可视化对象上
         */
        Object.defineProperties(component, {
            stroke: {
                get: function () {
                    return this._raw.stroke;
                },
                set: function (stroke) {
                    this._raw.stroke = stroke;
                }
            },
            strokeColor: {
                get: function () {
                    return this._raw.strokeColor;
                },
                set: function (strokeColor) {
                    this._raw.strokeColor = strokeColor;
                }
            },
            text: {
                get: function () {
                    return this._raw.text;
                },
                set: function (text) {
                    this._raw.text = text;
                    //引起宽高变化
                    this.resize();
                }
            },
            size: {
                get: function () {
                    return this._raw.size;
                },
                set: function (size) {
                    this._raw.size = size;
                    //引起宽高变化
                    this.resize();
                }
            },
            textAlign: {
                get: function () {
                    return this._align;
                },
                set: function (align) {
                    this._align = align;
                    this._raw.anchorOffsetX = this._raw.textWidth * this.aligns[align][0];
                    this._raw.anchorOffsetY = this._raw.textHeight * this.aligns[align][1];
                    if (this.node._raw) {
                        this._raw.x = this.node._raw.anchorOffsetX;
                        this._raw.y = this.node._raw.anchorOffsetY;
                    }
                }
            }
        });
        /**
         * 将节点的color属性绑定至可视化对象上使之可以设置文字颜色
         * 这是可视化组件被设置为single的原因
         */
        Object.defineProperties(component.node, {
            color: {
                get: function () {
                    return this._relative.textColor;
                },
                set: function (color) {
                    this._relative.textColor = color;
                }
            }
        });
    }
    /**
     * 装配精灵组件
     * @param component
     */
    function assembleSprite(component) {
        var spriteNode = new egret.Bitmap();
        component._raw = spriteNode;
        component.node._relative = spriteNode;
        Object.defineProperties(component, {
            texture: {
                get: function () {
                    return this._texture;
                },
                set: function (texture) {
                    this._texture = texture;
                    this._raw.texture = RES.getRes(this._texture);
                    //this._raw.texture = texture;
                }
            }
        });
        spriteNode.texture = RES.getRes(component._wrap_obj.properties.texture);
    }
    /**
     * 装配动画组件
     * @param component
     */
    function assembleAnimation(component) {
        var animatorContainer = component.node;
        var tw = egret.Tween.get(animatorContainer);
        component._raw = tw;
        component.onPlayEnd = function (clipName, keyframe) {
            console.log(clipName, keyframe);
            console.log(this._callBack, this._callBack_end_flag);
            if (this._callBack && this._callBack_end_flag === keyframe) {
                var endCall = this._callBack;
                delete this._callBack;
                endCall();
            }
        };
        component.playReverse = function (clipName, onPlayEnd) {
            var self = this;
            //动画剪辑结构
            var clip = null;
            for (var i = 0; i < this._wrap_obj.properties.clips.length; i++) {
                clip = this._wrap_obj.properties.clips[i];
                if (clip.name === clipName) {
                    break;
                }
                else {
                    clip = null;
                }
            }
            if (clip) {
                for (var i = clip.keyframes.length - 1; i >= 0; i--) {
                    var keyframe = clip.keyframes[i];
                    self._raw.to(keyframe, clip.durations[i]).call(self.onPlayEnd, null, [clip.name, i]);
                }
            }
        };
        component.play = function (clipName, callBack) {
            var _this = this;
            var animator = egret.Tween.get(this.node);
            //var self = this;
            //动画剪辑结构
            var clip = null;
            for (var i = 0; i < this._wrap_obj.properties.clips.length; i++) {
                clip = this._wrap_obj.properties.clips[i];
                if (clip.name === clipName) {
                    break;
                }
                else {
                    clip = null;
                }
            }
            if (clip) {
                if (callBack) {
                    this._callBack = callBack;
                    this._callBack_end_flag = clip.keyframes.length - 1;
                }
                console.log("keyframes", clip.keyframes);
                clip.keyframes.forEach(function (keyframe, i) {
                    //self._raw.to(keyframe,clip.durations[i-1]).call(self.onPlayEnd,self,[clip.name,i]);
                    animator.to(keyframe, clip.durations[i - 1]).call(_this.onPlayEnd, _this, [clip.name, i]);
                });
                //self._raw.to(clip.keyframes[0][0],null);
                //self._raw.to(clip.keyframes[1][0],500);
                //self._raw.to(clip.keyframes[2][0],1500);
                //self._raw.set(clip.keyframes[0]).to(clip.keyframes[1][0],clip.keyframes[1][1]);
                //clip.keyframes.forEach((keyframe,i,keyframes)=>{
                //    if(i === 0){
                //        self._raw.set(clip.keyframes[0]);
                //    }else
                //    //最后一段有回调
                //    if(i === keyframes.length-1){
                //        self._raw.to.apply(clip.keyframes[i]).call(self.onPlayEnd,self,[clip.name]);
                //    }else{
                //        self._raw.to.apply(clip.keyframes[i]);
                //    }
                //});
            }
        };
    }
    ;
    /**
     * 装配画布组件
     * @param component
     */
    function assembleCanvas(component) {
    }
    /**
     * 装配脚本组件
     * @param component
     */
    function assembleScript(component, references) {
        console.log("assembleScript", component.name, component.node.name);
        if (component.name) {
            var scriptid = references[component.name];
            //取得组件原型对象
            var protoCompObj = references[scriptid];
            if (protoCompObj === undefined) {
                console.log('protoCompObj undefined');
                scriptid = ecs.global_ref[component.name];
                protoCompObj = ecs.global_ref[scriptid];
            }
            //取得属性声明
            var declarationObj = protoCompObj.properties;
            console.log("declarationObj", declarationObj);
            if (declarationObj) {
                injectScriptProperties(declarationObj, component._wrap_obj.properties, component, references);
            }
            //忽略extends
            //拷贝函数
            for (var funcName in protoCompObj) {
                if (funcName !== 'properties') {
                    component[funcName] = protoCompObj[funcName];
                }
            }
            //触发回调
            component.onLoad();
        }
    }
    function injectNodeProperties(propsWrapper, target) {
        //设置属性有顺序
        var props = [
            'width',
            'height',
            'anchorX',
            'anchorY',
            'x',
            'y',
            'scaleX',
            'scaleY',
            'rotation',
            'alpha',
            'color'
        ];
        props.forEach(function (prop) {
            if (prop in propsWrapper) {
                target[prop] = propsWrapper[prop];
            }
        });
    }
    /**
     * 为节点和组件注入通用属性
     * @param propsWrapper
     * @param target
     */
    function injectProperties(propsWrapper, target) {
        for (var pname in propsWrapper) {
            target[pname] = propsWrapper[pname];
        }
    }
    /**
     * 为脚本组件专用的引用注入
     * @param propsWrapper
     * @param component
     */
    function injectScriptProperties(propsDeclaration, propsWrapper, component, references) {
        console.log("injectScriptProperties", component.name, component.node.name);
        for (var pname in propsDeclaration) {
            var valueStyle = propsDeclaration[pname];
            //基本类型
            if (typeof valueStyle === 'number' ||
                typeof valueStyle === 'string' ||
                typeof valueStyle === 'boolean') {
                component[pname] = pname in propsWrapper ?
                    propsWrapper[pname] : valueStyle;
            }
            else {
                //引用类型和数组
                if (valueStyle.type) {
                    //引用类型
                    if (typeof valueStyle.type === 'string' || typeof valueStyle.type === 'function') {
                        component[pname] = pname in propsWrapper ? (propsWrapper[pname] ? references[propsWrapper[pname]] : null) : valueStyle.default;
                    }
                    else 
                    //数组类型
                    if (valueStyle.type instanceof Array) {
                        //没有指定数组内的类型
                        if (valueStyle.type.length === 0) {
                            component[pname] = pname in propsWrapper ?
                                propsWrapper[pname] : valueStyle.default;
                        }
                        else {
                            var innerType = valueStyle.type[0];
                            switch (innerType) {
                                case 'string':
                                case 'number':
                                case 'boolean':
                                    //指定了数组内容为基本类型
                                    component[pname] = pname in propsWrapper ?
                                        propsWrapper[pname] : valueStyle.default;
                                    break;
                                default:
                                    //指定了数组内容为引用类型
                                    if (pname in propsWrapper) {
                                        component[pname] = [];
                                        propsWrapper[pname].forEach(function (pointerNum) {
                                            component[pname].push(references[pointerNum]);
                                        });
                                    }
                                    else {
                                        component[pname] = valueStyle.default;
                                    }
                                    break;
                            }
                        }
                    }
                    else 
                    //支持定义存取器
                    if ('set' in valueStyle || 'get' in valueStyle) {
                        Object.defineProperty(component, pname, valueStyle);
                    }
                }
                //var pointerOrArr = component._wrap_obj[pname];
                //if(typeof pointerOrArr === 'number'){
                //    component[pname] = references[pointerOrArr];
                //}else{
                //    component[pname] = [];
                //    pointerOrArr.forEach(pointer=>{
                //        component[pname].push(references[pointer]);
                //    })
                //}
            }
        }
    }
    //迭代访问节点下的所有组件
    function iterateNodeComponents(currentNode, handler) {
        currentNode.components.forEach(handler);
        currentNode.children.forEach(function (childNode) { return iterateNodeComponents(childNode, handler); });
    }
    //递归调用组件生命周期函数
    function invokeComponentsCallBack(currentNode) {
        currentNode.components.forEach(function (component) { return component.start(); });
        currentNode.children.forEach(function (childNode) { return invokeComponentsCallBack(childNode); });
    }
    //递归设置场景名称
    function setupSceneName(currentNode, sceneName) {
        currentNode.components.forEach(function (components) { return components['sceneName'] = sceneName; });
        currentNode.children.forEach(function (childNode) { return setupSceneName(childNode, sceneName); });
    }
    //属性绑定
    function bindBasicNodeProperties(node) {
        //将node的基本属性关联
        Object.defineProperties(node, {
            width: {
                get: function () {
                    //if(this._relative){
                    //    return this._relative.width;
                    //}else
                    //    return this._raw.width;
                    return this._width;
                },
                set: function (width) {
                    this._width = width;
                    if (this._relative) {
                        this._relative.width = width;
                    }
                    this._raw.width = width;
                }
            },
            height: {
                get: function () {
                    //if(this._relative){
                    //    return this._relative.height;
                    //}else
                    //    return this._raw.height;
                    return this._height;
                },
                set: function (height) {
                    this._height = height;
                    if (this._relative) {
                        this._relative.height = height;
                    }
                    this._raw.height = height;
                }
            },
            anchorX: {
                get: function () {
                    if (this.width !== 0) {
                        return this._raw.anchorOffsetX / this.width;
                    }
                    else {
                        return this._anchorX;
                    }
                },
                set: function (number) {
                    this._anchorX = number;
                    this._raw.anchorOffsetX = number * this.width;
                }
            },
            anchorY: {
                get: function () {
                    if (this.height !== 0) {
                        return this._raw.anchorOffsetY / this.height;
                    }
                    else {
                        return this._anchorY;
                    }
                    //return 1 - this._raw.anchorOffsetY/this.height;
                },
                set: function (number) {
                    //var offsetY = (1-number)*this.height;
                    this._anchorY = number;
                    this._raw.anchorOffsetY = number * this.height;
                }
            },
            x: {
                get: function () {
                    return this._x;
                },
                set: function (x) {
                    this._x = x;
                    if (this.parent && this.parent._raw) {
                        this._raw.x = this.parent._raw.anchorOffsetX + x;
                    }
                    else {
                        this._raw.x = x;
                    }
                }
            },
            y: {
                get: function () {
                    return this._y;
                },
                set: function (y) {
                    this._y = y;
                    if (this.parent && this.parent._raw) {
                        this._raw.y = this.parent._raw.anchorOffsetY + y;
                    }
                    else {
                        this._raw.y = y;
                    }
                }
            },
            position: {
                get: function () {
                    return { x: this.x, y: this.y };
                },
                set: function (point) {
                    this.x = point.x;
                    this.y = point.y;
                }
            },
            scaleX: {
                get: function () {
                    return this._raw.scaleX;
                },
                set: function (scaleX) {
                    this._raw.scaleX = scaleX;
                }
            },
            scaleY: {
                get: function () {
                    return this._raw.scaleY;
                },
                set: function (scaleY) {
                    this._raw.scaleY = scaleY;
                }
            },
            rotation: {
                get: function () {
                    return this._raw.rotation;
                },
                set: function (rotation) {
                    this._raw.rotation = rotation;
                }
            },
            //color:{
            //    get: function (){
            //        //return this._raw.color;
            //        return
            //    },
            //    set: function (color){
            //        //this._raw.color = color;
            //    }
            //},
            alpha: {
                get: function () {
                    return this._raw.alpha;
                },
                set: function (alpha) {
                    this._raw.alpha = alpha;
                }
            }
        });
    }
    //使用此函数创建的类可以被序列化
    function Class(id, name, raw) {
        ecs.global_ref[id] = raw;
        ecs.global_ref[name] = id;
    }
    ecs.Class = Class;
    /**
     * 使用此函数深度拷贝并返回一个新的节点
     */
    function instantiate(prefab) {
        /**
         * step1.开启一个空白的临时引用空间（避免引用污染）
         */
        var tempReference = {};
        /**
         * step2.检查是否包含了已有空间的属性注入，并将其移入临时空间
         */
        /**
         * step2.获得prefab节点的_wrap_obj的副本
         */
        var _wrap_obj_copy = JSON.parse(JSON.stringify([prefab._wrap_obj]));
        /**
         * step3.修改副本为顶级节点
         */
        var topId = _wrap_obj_copy[0].id;
        _wrap_obj_copy.parent = null;
        /**
         * step4.执行解析并返回顶级节点
         */
        parseBegin(_wrap_obj_copy, tempReference);
        return tempReference[topId];
    }
    ecs.instantiate = instantiate;
    //自上而下修改id
    function fixId(node) {
        //所有节点和组件重新命名id并设置引用关系
    }
})(ecs || (ecs = {}));
