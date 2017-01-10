/**
 * 实体组件系统插件体系架构
 * @author yanjiaqi
 *
 */
declare module ecs {
    interface ScrollingHandler {
        (progress: number, isScrollIn: boolean): void;
    }
    interface SceneDomain {
        reference: any;
        topIds: number[];
    }
    var global_ref: any;
    class Node {
        active: boolean;
        id: number;
        type: string;
        name: string;
        parent: Node;
        children: Node[];
        components: any[];
        _wrap_obj: any;
        position: egret.Point;
        rotation: number;
        scale: egret.Point;
        anchor: egret.Point;
        size: egret.Point;
        color: number;
        opacity: number;
        _raw: egret.DisplayObjectContainer;
        _relative: any;
        _visualable: boolean;
        _prefab: boolean;
        visualable: boolean;
        constructor(obj?: any);
        getChildren(): void;
        getChildByName(childName: any): Node;
        getComponent(componentName: string): any;
        addComponent(component: Component): boolean;
        setPosition(x: number, y: number): void;
        /**
         * 此处的Node必须是经过实体可视化的
         * 对场景中已有的preFab通过instantiate产生的都是实体可视化的
         * 加入添加之后或之前需要setPosition(egret.Point(0,0));
         * 因为坐标点从preFab一并复制过来了
         **/
        addChild(child: Node): void;
        removeChild(child: Node): void;
        removeAllChildren(): void;
    }
    class Component {
        id: number;
        type: string;
        name: string;
        node: Node;
        properties: Object;
        /**
         * single属性与所在node节点的_relative相对应
         * single同为true的Component在同一个Node上互斥
        ***/
        single: boolean;
        _raw: any;
        _wrap_obj: any;
        constructor(obj?: any);
        getComponent(componentName: string): any;
        onLoad(): void;
        start(): void;
        onStop(): void;
    }
    function setSceneScrollingListener(sceneName: string, handler: ScrollingHandler): void;
    function removeSceneScrollingListener(sceneName: any): void;
    function scrollScenes(designHeight: number, scenes: {
        name: string;
        scene: any[];
    }[], topContainer: egret.DisplayObjectContainer, initIndex?: number, isVertical?: boolean): void;
    function getSceneNameByIndex(index: number): any;
    function getIndexBySceneName(sceneName: string): number;
    function switchScene(oldSceneName: string, newSceneName: string, newSceneResourceName?: string): void;
    function scrollToByName(sceneName: string, callBack?: Function): void;
    function scrollTo(sceneIndex: number, callBack?: Function): void;
    function parseScene(scene: any[], topContainer?: egret.DisplayObjectContainer, sceneName?: string): SceneDomain;
    function saveScene(): boolean;
    function Class(id: number, name: string, raw: any): void;
    /**
     * 使用此函数深度拷贝并返回一个新的节点
     */
    function instantiate(prefab: Node): Node;
}
