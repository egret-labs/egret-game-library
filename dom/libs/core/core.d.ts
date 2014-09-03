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
declare module egret {
    /**
    * @classdesc
    * IHashObject是哈希对象接口。引擎内所有接口的基类,为对象实例提供唯一的hashCode值,提高对象比较的性能。
    * 注意：自定义对象请直接继承HashObject，而不是实现此接口。否则会导致hashCode不唯一。
    * @interface
    * @class egret.IHashObject
    */
    interface IHashObject {
        /**
        * 返回此对象唯一的哈希值,用于唯一确定一个对象。hashCode为大于等于1的整数。
        * @member {number} egret.IHashObject#hashCode
        */
        hashCode: number;
    }
}
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
/**
* @namespace egret
*/
declare module egret {
    /**
    * @class egret.HashObject
    * @classdesc
    * @implements egret.IHashObject
    */
    class HashObject implements IHashObject {
        /**
        * @method egret.HashObject#constructor
        * @class egret.HashObject
        * @classdesc 哈希对象。引擎内所有对象的基类，为对象实例提供唯一的hashCode值,提高对象比较的性能。
        */
        constructor();
        /**
        * 哈希计数
        */
        private static hashCount;
        private _hashCode;
        /**
        * 返回此对象唯一的哈希值,用于唯一确定一个对象。hashCode为大于等于1的整数。
        * @member {number} egret.HashObject#hashCode
        */
        public hashCode : number;
    }
}
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
declare module egret {
    /**
    * @class egret.Recycler
    * @classdesc
    * 对象缓存复用工具类，可用于构建对象池，一段时间后会自动回收对象。
    * @extends egret.HashObject
    */
    class Recycler extends HashObject {
        /**
        * @method egret.Recycler#constructor
        * @param autoDisposeTime {number}
        */
        constructor(autoDisposeTime?: number);
        static _callBackList: any[];
        /**
        * 多少帧后自动销毁对象。
        */
        private autoDisposeTime;
        private frameCount;
        public _checkFrame(): void;
        private objectPool;
        private _length;
        /**
        * 缓存的对象数量
        * @member {number} egret.Recycler#length
        */
        public length : number;
        /**
        * 缓存一个对象以复用
        * @method egret.Recycler#push
        * @param object {any}
        */
        public push(object: any): void;
        /**
        * 获取一个缓存的对象
        * @method egret.Recycler#pop
        * @returns {any}
        */
        public pop(): any;
        /**
        * 立即清空所有缓存的对象。
        * @method egret.Recycler#dispose
        */
        public dispose(): void;
    }
}
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
declare module egret {
    var __START_TIME: number;
    /**
    * 用于计算相对时间。此方法返回自启动 Egret 引擎以来经过的毫秒数。
    * @method egret.getTimer
    * @returns {number} 启动 Egret 引擎以来经过的毫秒数。
    */
    function getTimer(): number;
}
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
declare module egret {
    var __callLaterFunctionList: any[];
    var __callLaterThisList: any[];
    var __callLaterArgsList: any[];
    /**
    * 延迟函数到屏幕重绘前执行。
    * @method egret.callLater
    * @param method {Function} 要延迟执行的函数
    * @param thisObject {any} 回调函数的this引用
    * @param ...args {any} 函数参数列表
    */
    function callLater(method: Function, thisObject: any, ...args: any[]): void;
}
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
declare module egret_dom {
    var header: string;
    /**
    * 获取当前浏览器的类型
    * @returns {string}
    */
    function getHeader(): string;
    /**
    * 获取当前浏览器类型
    * @type {string}
    */
    function getTrans(type: string): string;
}
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
declare module egret {
    class Event extends HashObject {
        /**
        * @class egret.Event
        * @classdesc
        * Event 类作为创建 Event 对象的基类，当发生事件时，Event 对象将作为参数传递给事件侦听器。
        *
        * Event 类的属性包含有关事件的基本信息，例如事件的类型或者是否可以取消事件的默认行为。
        *
        * 对于许多事件（如由 Event 类常量表示的事件），此基本信息就足够了。但其他事件可能需要更详细的信息。
        * 例如，与触摸关联的事件需要包括有关触摸事件的位置以及在触摸事件期间是否按下了任何键的其他信息。
        * 您可以通过扩展 Event 类（TouchEvent 类执行的操作）将此类其他信息传递给事件侦听器。
        * Egret API 为需要其他信息的常见事件定义多个 Event 子类。与每个 Event 子类关联的事件将在每个类的文档中加以介绍。
        *
        * Event 类的方法可以在事件侦听器函数中使用以影响事件对象的行为。
        * 某些事件有关联的默认行为，通过调用 preventDefault() 方法，您的事件侦听器可以取消此行为。
        * 可以通过调用 stopPropagation() 或 stopImmediatePropagation() 方法，将当前事件侦听器作为处理事件的最后一个事件侦听器。
        * @param {string} type 事件的类型，可以作为 Event.type 访问。
        * @param bubbles{boolean} 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
        * @param cancelable{boolean} 确定是否可以取消 Event 对象。默认值为 false。
        */
        constructor(type: string, bubbles?: boolean, cancelable?: boolean);
        /**
        * 在将显示对象直接添加到舞台显示列表或将包含显示对象的子树添加至舞台显示列表中时调度。
        * 以下方法会触发此事件：DisplayObjectContainer.addChild()、DisplayObjectContainer.addChildAt()。
        * @constant {string} egret.Event.ADDED_TO_STAGE
        */
        static ADDED_TO_STAGE: string;
        /**
        * 在从显示列表中直接删除显示对象或删除包含显示对象的子树时调度。DisplayObjectContainer 类的以下两个方法会生成此事件：removeChild() 和 removeChildAt()。
        * 如果必须删除某个对象来为新对象提供空间，则 DisplayObjectContainer 对象的下列方法也会生成此事件：addChild()、addChildAt() 和 setChildIndex()。
        * @constant {string} egret.Event.REMOVED_FROM_STAGE
        */
        static REMOVED_FROM_STAGE: string;
        /**
        * 将显示对象添加到显示列表中时调度。以下方法会触发此事件：
        * DisplayObjectContainer.addChild()、DisplayObjectContainer.addChildAt()。
        * @constant {string} egret.Event.ADDED
        */
        static ADDED: string;
        /**
        * 将要从显示列表中删除显示对象时调度。DisplayObjectContainer 类的以下两个方法会生成此事件：removeChild() 和 removeChildAt()。
        * 如果必须删除某个对象来为新对象提供空间，则 DisplayObjectContainer 对象的下列方法也会生成此事件：addChild()、addChildAt() 和 setChildIndex()。
        * @constant {string} egret.Event.REMOVED
        */
        static REMOVED: string;
        /**
        * 完成
        * @constant {string} egret.Event.COMPLETE
        */
        static COMPLETE: string;
        /**
        * 主循环：进入新的一帧
        * @constant {string} egret.Event.ENTER_FRAME
        */
        static ENTER_FRAME: string;
        /**
        * 主循环：开始渲染
        * @constant {string} egret.Event.RENDER
        */
        static RENDER: string;
        /**
        * 主循环：渲染完毕
        * @constant {string} egret.Event.FINISH_RENDER
        */
        static FINISH_RENDER: string;
        /**
        * 主循环：updateTransform完毕
        * @constant {string} egret.Event.FINISH_UPDATE_TRANSFORM
        */
        static FINISH_UPDATE_TRANSFORM: string;
        /**
        * 离开舞台，参考Flash的Event.MOUSE_LEAVE
        * @constant {string} egret.Event.LEAVE_STAGE
        */
        static LEAVE_STAGE: string;
        /**
        * 舞台尺寸发生改变
        * @constant {string} egret.Event.RESIZE
        */
        static RESIZE: string;
        /**
        * 状态改变
        * @constant {string} egret.Event.CHANGE
        */
        static CHANGE: string;
        public data: any;
        public _type: string;
        /**
        * 事件的类型。类型区分大小写。
        * @member {string} egret.Event#type
        */
        public type : string;
        public _bubbles: boolean;
        /**
        * 表示事件是否为冒泡事件。如果事件可以冒泡，则此值为 true；否则为 false。
        * @member {boolean} egret.Event#bubbles
        */
        public bubbles : boolean;
        private _cancelable;
        /**
        * 表示是否可以阻止与事件相关联的行为。如果可以取消该行为，则此值为 true；否则为 false。
        * @member {boolean} egret.Event#cancelable
        */
        public cancelable : boolean;
        public _eventPhase: number;
        /**
        * 事件流中的当前阶段。此属性可以包含以下数值：
        * 捕获阶段 (EventPhase.CAPTURING_PHASE)。
        * 目标阶段 (EventPhase.AT_TARGET)。
        * 冒泡阶段 (EventPhase.BUBBLING_PHASE)。
        * @member {boolean} egret.Event#eventPhase
        */
        public eventPhase : number;
        public _currentTarget: any;
        /**
        * 当前正在使用某个事件侦听器处理 Event 对象的对象。例如，如果用户单击“确定”按钮，
        * 则当前目标可以是包含该按钮的节点，也可以是它的已为该事件注册了事件侦听器的始祖之一。
        * @member {any} egret.Event#currentTarget
        */
        public currentTarget : any;
        public _target: any;
        /**
        * 事件目标。此属性包含目标节点。例如，如果用户单击“确定”按钮，则目标节点就是包含该按钮的显示列表节点。
        * @member {any} egret.Event#target
        */
        public target : any;
        public _isDefaultPrevented: boolean;
        /**
        * 检查是否已对事件调用 preventDefault() 方法。
        * @method egret.Event#isDefaultPrevented
        * @returns {boolean} 如果已调用 preventDefault() 方法，则返回 true；否则返回 false。
        */
        public isDefaultPrevented(): boolean;
        /**
        * 如果可以取消事件的默认行为，则取消该行为。
        * 许多事件都有默认执行的关联行为。例如，如果用户在文本字段中键入一个字符，则默认行为就是在文本字段中显示该字符。
        * 由于可以取消 TextEvent.TEXT_INPUT 事件的默认行为，因此您可以使用 preventDefault() 方法来防止显示该字符。
        * 注意：当cancelable属性为false时，此方法不可用。
        * @method egret.Event#preventDefault
        */
        public preventDefault(): void;
        public _isPropagationStopped: boolean;
        /**
        * 防止对事件流中当前节点的后续节点中的所有事件侦听器进行处理。此方法不会影响当前节点 (currentTarget) 中的任何事件侦听器。
        * 相比之下，stopImmediatePropagation() 方法可以防止对当前节点中和后续节点中的事件侦听器进行处理。
        * 对此方法的其它调用没有任何效果。可以在事件流的任何阶段中调用此方法。
        * 注意：此方法不会取消与此事件相关联的行为；有关此功能的信息，请参阅 preventDefault()。
        * @method egret.Event#stopPropagation
        */
        public stopPropagation(): void;
        public _isPropagationImmediateStopped: boolean;
        /**
        * 防止对事件流中当前节点中和所有后续节点中的事件侦听器进行处理。此方法会立即生效，并且会影响当前节点中的事件侦听器。
        * 相比之下，在当前节点中的所有事件侦听器都完成处理之前，stopPropagation() 方法不会生效。
        * 注意：此方法不会取消与此事件相关联的行为；有关此功能的信息，请参阅 preventDefault()。
        * @method egret.Event#stopImmediatePropagation
        */
        public stopImmediatePropagation(): void;
        private isNew;
        public _reset(): void;
        static _dispatchByTarget(EventClass: any, target: IEventDispatcher, type: string, props?: Object, bubbles?: boolean, cancelable?: boolean): boolean;
        static _getPropertyData(EventClass: any): any;
        /**
        * 使用指定的EventDispatcher对象来抛出Event事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
        * @method egret.Event.dispatchEvent
        */
        static dispatchEvent(target: IEventDispatcher, type: string, bubbles?: boolean, data?: any): void;
    }
}
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
declare module egret {
    /**
    * @class egret.IOErrorEvent
    * @classdesc IO流事件，当错误导致输入或输出操作失败时调度 IOErrorEvent 对象。
    * @extends egret.Event
    */
    class IOErrorEvent extends Event {
        /**
        * @constant {string} egret.IOErrorEvent.IO_ERROR
        */
        static IO_ERROR: string;
        /**
        * @method egret.IOErrorEvent#constructor
        * @param type {string}
        * @param bubbles {boolean}
        * @param cancelable {boolean}
        */
        constructor(type: string, bubbles?: boolean, cancelable?: boolean);
        /**
        * 使用指定的EventDispatcher对象来抛出Event事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
        * @method egret.IOErrorEvent.dispatchIOErrorEvent
        * @param target {egret.IEventDispatcher}
        */
        static dispatchIOErrorEvent(target: IEventDispatcher): void;
    }
}
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
declare module egret {
    class TouchEvent extends Event {
        /**
        * 创建一个作为参数传递给事件侦听器的 Event 对象。
        *
        * @class egret.TouchEvent
        * @classdesc
        * TouchEvent事件类
        * @extends egret.Event
        * @constructor egret.TouchEvent
        * @param type {string} 事件的类型，可以作为 Event.type 访问。
        * @param bubbles {boolean} 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
        * @param cancelable {boolean} 确定是否可以取消 Event 对象。默认值为 false。
        * @param touchPointID {number}
        * @param stageX {number}
        * @param stageY {number}
        * @param ctrlKey {boolean}
        * @param altKey {boolean}
        * @param shiftKey {boolean}
        * @param touchDown {boolean}
        */
        constructor(type: string, bubbles?: boolean, cancelable?: boolean, touchPointID?: number, stageX?: number, stageY?: number, ctrlKey?: boolean, altKey?: boolean, shiftKey?: boolean, touchDown?: boolean);
        /**
        * 轻触，参考Flash的MouseEvent.CLICK
        * @constant {string} egret.TouchEvent.TOUCH_TAP
        */
        static TOUCH_TAP: string;
        /**
        * 移动，参考FLash的MouseEvent.MOVE
        * @constant {string} egret.TouchEvent.TOUCH_MOVE
        */
        static TOUCH_MOVE: string;
        /**
        * 开始触摸,参考Flash的MouseEvent.MOUSE_DOWN
        * @constant {string} egret.TouchEvent.TOUCH_BEGIN
        */
        static TOUCH_BEGIN: string;
        /**
        * 在同一对象上结束触摸,参考Flash的MouseEvent.MOUSE_UP
        * @constant {string} egret.TouchEvent.TOUCH_END
        */
        static TOUCH_END: string;
        /**
        * 在对象外部结束触摸，参考Flash的MouseEvent.RELEASE_OUTSIDE
        * @constant {string} egret.TouchEvent.TOUCH_RELEASE_OUTSIDE
        */
        static TOUCH_RELEASE_OUTSIDE: string;
        /**
        * 移动，参考FLash的MouseEvent.MOVE
        * @member egret.TouchEvent.TOUCH_MOVE
        * @constant {string} egret.TouchEvent.TOUCH_ROLL_OUT
        */
        static TOUCH_ROLL_OUT: string;
        /**
        * 移动，参考FLash的MouseEvent.MOVE
        * @member egret.TouchEvent.TOUCH_MOVE
        * @constant {string} egret.TouchEvent.TOUCH_ROLL_OVER
        */
        static TOUCH_ROLL_OVER: string;
        /**
        * 移动，参考FLash的MouseEvent.MOVE
        * @constant {string} egret.TouchEvent.TOUCH_OUT
        */
        static TOUCH_OUT: string;
        /**
        * 移动，参考FLash的MouseEvent.MOVE
        * @member egret.TouchEvent.TOUCH_MOVE
        * @constant {string} egret.TouchEvent.TOUCH_OVER
        */
        static TOUCH_OVER: string;
        public _stageX: number;
        /**
        * 事件发生点在全局舞台坐标中的水平坐标。
        * @member {number} egret.TouchEvent#stageX
        */
        public stageX : number;
        public _stageY: number;
        /**
        * 事件发生点在全局舞台坐标中的垂直坐标。
        * @member {number} egret.TouchEvent#stageY
        */
        public stageY : number;
        /**
        * 事件发生点相对于currentTarget的水平坐标。
        * @member {number} egret.TouchEvent#localX
        */
        public localX : number;
        /**
        * 事件发生点相对于currentTarget的垂直坐标。
        * @member {number} egret.TouchEvent#localY
        */
        public localY : number;
        /**
        * 分配给触摸点的唯一标识号
        * @member {number} egret.TouchEvent#touchPointID
        */
        public touchPointID: number;
        /**
        * 事件发生时ctrl键是否被按下。 (Mac OS下为 Cmd 或 Ctrl)
        * @member {boolean} egret.TouchEvent#ctrlKey
        */
        public ctrlKey: boolean;
        /**
        * 事件发生时shift键是否被按下。
        * @member {boolean} egret.TouchEvent#shiftKey
        */
        public shiftKey: boolean;
        /**
        * 事件发生时alt键是否被按下。
        * @member {boolean} egret.TouchEvent#altKey
        */
        public altKey: boolean;
        /**
        * 表示触摸已按下 (true) 还是未按下 (false)。
        * @member {boolean} egret.TouchEvent#touchDown
        */
        public touchDown: boolean;
        /**
        * 使用指定的EventDispatcher对象来抛出Event事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
        * @method egret.TouchEvent.dispatchTouchEvent
        * @param target {egret.IEventDispatcher}
        * @param type {string}
        * @param touchPointID {number}
        * @param stageX {number}
        * @param stageY {number}
        * @param ctrlKey {boolean}
        * @param altKey {boolean}
        * @param shiftKey {boolean}
        * @param touchDown {boolean}
        */
        static dispatchTouchEvent(target: IEventDispatcher, type: string, touchPointID?: number, stageX?: number, stageY?: number, ctrlKey?: boolean, altKey?: boolean, shiftKey?: boolean, touchDown?: boolean): void;
    }
}
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
/** @namespace egret */
declare module egret {
    /**
    * @class egret.TimerEvent
    * @classdesc
    * 每当 Timer 对象达到由 Timer.delay 属性指定的间隔时，Timer 对象即会调度 TimerEvent 对象。
    * @extends egret.Event
    */
    class TimerEvent extends Event {
        /**
        *
        * @constructor egret.TimerEvent
        * @param type {string} 事件的类型。事件侦听器可以通过继承的 type 属性访问此信息。
        * @param bubbles {boolean} 确定 Event 对象是否冒泡。事件侦听器可以通过继承的 bubbles 属性访问此信息。
        * @param cancelable {boolean} 确定是否可以取消 Event 对象。事件侦听器可以通过继承的 cancelable 属性访问此信息。
        */
        constructor(type: string, bubbles?: boolean, cancelable?: boolean);
        /**
        * 每当 Timer 对象达到根据 Timer.delay 属性指定的间隔时调度。
        * @constant {string} egret.TimerEvent.TIMER
        */
        static TIMER: string;
        /**
        * 每当它完成 Timer.repeatCount 设置的请求数后调度。
        * @constant {string} egret.TimerEvent.TIMER_COMPLETE
        */
        static TIMER_COMPLETE: string;
        /**
        * 使用指定的EventDispatcher对象来抛出Event事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
        * @method egret.TimerEvent.dispatchTimerEvent
        * @param target {egret.IEventDispatcher}
        * @param type {string}
        */
        static dispatchTimerEvent(target: IEventDispatcher, type: string): void;
    }
}
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
declare module egret {
    /**
    * @class egret.EventPhase
    * @classdesc
    * EventPhase 类可为 Event 类的 eventPhase 属性提供值。
    */
    class EventPhase {
        /**
        * 捕获阶段，是事件流的第一个阶段。
        * @constant {number} egret.EventPhase.CAPTURING_PHASE
        */
        static CAPTURING_PHASE: number;
        /**
        * 目标阶段，是事件流的第二个阶段。
        * @constant {number} egret.EventPhase.AT_TARGET
        */
        static AT_TARGET: number;
        /**
        * 冒泡阶段，是事件流的第三个阶段。
        * @constant {number} egret.EventPhase.BUBBLING_PHASE
        */
        static BUBBLING_PHASE: number;
    }
}
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
declare module egret {
    /**
    *
    * @class egret.IEventDispatcher
    * @interface
    * @classdesc IEventDispatcher是egret的事件派发器接口，负责进行事件的发送和侦听。
    */
    interface IEventDispatcher extends IHashObject {
        /**
        * 添加事件侦听器
        * @param type 事件的类型。
        * @param listener 处理事件的侦听器函数。此函数必须接受 Event 对象作为其唯一的参数，并且不能返回任何结果，
        * 如下面的示例所示： function(evt:Event):void 函数可以有任何名称。
        * @param thisObject 侦听函数绑定的this对象
        * @param useCapture 确定侦听器是运行于捕获阶段还是运行于目标和冒泡阶段。如果将 useCapture 设置为 true，
        * 则侦听器只在捕获阶段处理事件，而不在目标或冒泡阶段处理事件。如果 useCapture 为 false，则侦听器只在目标或冒泡阶段处理事件。
        * 要在所有三个阶段都侦听事件，请调用 addEventListener 两次：一次将 useCapture 设置为 true，一次将 useCapture 设置为 false。
        * @param  priority 事件侦听器的优先级。优先级由一个带符号的 32 位整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在
        * 优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
        * @stable A
        */
        addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void;
        /**
        * 移除事件侦听器
        * @param type 事件名
        * @param listener 侦听函数
        * @param thisObject 侦听函数绑定的this对象
        * @param useCapture 是否使用捕获，这个属性只在显示列表中生效。
        * @stable A
        */
        removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean): void;
        /**
        * 检测是否存在监听器
        * @param type 事件名
        * @returns {*}
        * @stable A
        */
        hasEventListener(type: string): boolean;
        /**
        * 派发事件
        * @param type 事件名
        * @param arg 数据对象
        * @returns {*}
        */
        dispatchEvent(event: Event): boolean;
        /**
        * 检查是否用此 EventDispatcher 对象或其任何始祖为指定事件类型注册了事件侦听器。将指定类型的事件调度给此
        * EventDispatcher 对象或其任一后代时，如果在事件流的任何阶段触发了事件侦听器，则此方法返回 true。
        * hasEventListener() 与 willTrigger() 方法的区别是：hasEventListener() 只检查它所属的对象，
        * 而 willTrigger() 方法检查整个事件流以查找由 type 参数指定的事件。
        * @param type 事件名
        */
        willTrigger(type: string): boolean;
    }
}
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
declare module egret {
    /**
    *
    * @class egret.EventDispatcher
    * @classdesc
    * EventDispatcher是egret的事件派发器类，负责进行事件的发送和侦听。
    * @extends egret.HashObject
    * @implements egret.IEventDispatcher
    *
    */
    class EventDispatcher extends HashObject implements IEventDispatcher {
        /**
        * EventDispatcher 类是可调度事件的所有类的基类。EventDispatcher 类实现 IEventDispatcher 接口
        * ，并且是 DisplayObject 类的基类。EventDispatcher 类允许显示列表上的任何对象都是一个事件目标，
        * 同样允许使用 IEventDispatcher 接口的方法。
        */
        constructor(target?: IEventDispatcher);
        /**
        * 事件抛出对象
        */
        private _eventTarget;
        /**
        * 引擎内部调用
        * @private
        */
        public _eventsMap: Object;
        /**
        * 引擎内部调用
        * @private
        */
        public _captureEventsMap: Object;
        /**
        * 添加事件侦听器
        * @method egret.EventDispatcher#addEventListener
        * @param type {string} 事件的类型。
        * @param listener {Function} 处理事件的侦听器函数。此函数必须接受 Event 对象作为其唯一的参数，并且不能返回任何结果，
        * 如下面的示例所示： function(evt:Event):void 函数可以有任何名称。
        * @param thisObject {any} 侦听函数绑定的this对象
        * @param useCapture {boolean} 确定侦听器是运行于捕获阶段还是运行于目标和冒泡阶段。如果将 useCapture 设置为 true，
        * 则侦听器只在捕获阶段处理事件，而不在目标或冒泡阶段处理事件。如果 useCapture 为 false，则侦听器只在目标或冒泡阶段处理事件。
        * 要在所有三个阶段都侦听事件，请调用 addEventListener 两次：一次将 useCapture 设置为 true，一次将 useCapture 设置为 false。
        * @param  priority {number} 事件侦听器的优先级。优先级由一个带符号的 32 位整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在
        * 优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
        */
        public addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void;
        /**
        * 在一个事件列表中按优先级插入事件对象
        */
        public _insertEventBin(list: any[], listener: Function, thisObject: any, priority: number): boolean;
        /**
        * 移除事件侦听器
        * @method egret.EventDispatcher#removeEventListener
        * @param type {string} 事件名
        * @param listener {Function} 侦听函数
        * @param thisObject {any} 侦听函数绑定的this对象
        * @param useCapture {boolean} 是否使用捕获，这个属性只在显示列表中生效。
        */
        public removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean): void;
        /**
        * 在一个事件列表中按优先级插入事件对象
        */
        public _removeEventBin(list: any[], listener: Function, thisObject: any): boolean;
        /**
        * 检测是否存在监听器
        * @method egret.EventDispatcher#hasEventListener
        * @param type {string} 事件类型
        * @returns {boolean}
        * @stable A
        */
        public hasEventListener(type: string): boolean;
        /**
        * 检查是否用此 EventDispatcher 对象或其任何始祖为指定事件类型注册了事件侦听器。将指定类型的事件调度给此
        * EventDispatcher 对象或其任一后代时，如果在事件流的任何阶段触发了事件侦听器，则此方法返回 true。
        * hasEventListener() 与 willTrigger() 方法的区别是：hasEventListener() 只检查它所属的对象，
        * 而 willTrigger() 方法检查整个事件流以查找由 type 参数指定的事件。
        * @method egret.EventDispatcher#willTrigger
        * @param type {string} 事件类型
        * @returns {boolean} 是否发生碰撞，如果发生返回true，如果没有碰撞，返回false
        */
        public willTrigger(type: string): boolean;
        /**
        * 将事件分派到事件流中。事件目标是对其调用 dispatchEvent() 方法的 EventDispatcher 对象。
        * @method egret.EventDispatcher#dispatchEvent
        * @param event {egret.Event} 调度到事件流中的 Event 对象。如果正在重新分派事件，则会自动创建此事件的一个克隆。 在调度了事件后，其 _eventTarget 属性将无法更改，因此您必须创建此事件的一个新副本以能够重新调度。
        * @returns {boolean} 如果成功调度了事件，则值为 true。值 false 表示失败或对事件调用了 preventDefault()。
        */
        public dispatchEvent(event: Event): boolean;
        public _notifyListener(event: Event): boolean;
        /**
        * 派发一个包含了特定参数的事件到所有注册了特定类型侦听器的对象中。 这个方法使用了一个内部的事件对象池因避免重复的分配导致的额外开销。
        * @method egret.EventDispatcher#dispatchEventWith
        * @param type {string} 事件类型
        * @param bubbles {boolean} 是否冒泡，默认false
        * @param data {any}附加数据(可选)
        */
        public dispatchEventWith(type: string, bubbles?: boolean, data?: Object): void;
    }
}
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
declare module egret {
    /**
    * @class egret.MainContext
    * @classdesc
    * MainContext是游戏的核心跨平台接口，组合了多个功能Context，并是游戏启动的主入口
    * @extends egret.EventDispatcher
    */
    class MainContext extends EventDispatcher {
        constructor();
        /**
        * 渲染Context
        * @member egret.MainContext#rendererContext
        */
        public rendererContext: RendererContext;
        /**
        * 触摸Context
        * @member egret.MainContext#touchContext
        */
        public touchContext: TouchContext;
        /**
        * 网络Context
        * @member egret.MainContext#netContext
        */
        public netContext: NetContext;
        /**
        * 设备divice
        * @member egret.MainContext#deviceContext
        */
        public deviceContext: DeviceContext;
        /**
        * 舞台
        * @member egret.MainContext#stage
        */
        public stage: Stage;
        static deviceType: string;
        static DEVICE_PC: string;
        static DEVICE_MOBILE: string;
        /**
        * 游戏启动，开启主循环，参考Flash的滑动跑道模型
        * @method egret.MainContext#run
        */
        public run(): void;
        /**
        * 滑动跑道模型，渲染部分
        */
        private renderLoop(frameTime);
        private reuseEvent;
        /**
        * 广播EnterFrame事件。
        */
        private broadcastEnterFrame(frameTime);
        /**
        * 广播Render事件。
        */
        private broadcastRender();
        /**
        * 执行callLater回调函数列表
        */
        private doCallLaterList(funcList, thisList, argsList);
        /**
        * @member egret.MainContext.instance
        */
        static instance: MainContext;
    }
}
declare var testDeviceType: () => boolean;
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
declare module egret {
    /**
    * @class egret.Profiler
    * @classdesc
    * Profiler是egret的性能检测分析类
    * @todo GitHub文档，如何使用Profiler
    */
    class Profiler {
        private static instance;
        /**
        * 返回系统中唯一的Profiler实例。
        * @returns {Profiler}
        */
        static getInstance(): Profiler;
        private _lastTime;
        private _logicPerformanceCost;
        private _renderPerformanceCost;
        private _updateTransformPerformanceCost;
        private _preDrawCount;
        private _txt;
        private _tick;
        private _maxDeltaTime;
        private _totalDeltaTime;
        /**
        * 启动Profiler
        * @method egret.Profiler#run
        */
        public run(): void;
        /**
        * @private
        */
        private onEnterFrame(event);
        /**
        * @private
        */
        private onStartRender(event);
        private onFinishUpdateTransform(event);
        /**
        * @private
        */
        private onFinishRender(event);
        /**
        * @private
        */
        private update(frameTime);
        /**
        * @method egret.Profiler#onDrawImage
        * @private
        */
        public onDrawImage(): void;
    }
}
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
declare module egret {
    /**
    * @class egret.Ticker
    * @classdesc
    * Ticker是egret引擎的心跳控制器，是游戏唯一的时间处理入口。开发者务必不要使用setTimeout / setInterval 等方法，而是统一使用Ticker
    * @extends egret.EventDispatcher
    */
    class Ticker extends EventDispatcher {
        private _timeScale;
        private _paused;
        /**
        * 启动心跳控制器。
        * 这个函数应只在游戏初始化时调用一次
        * @method egret.Ticker#run
        * @stable A
        */
        public run(): void;
        private update(advancedTime);
        private callBackList;
        /**
        * 注册帧回调事件，同一函数的重复监听会被忽略。
        * @method egret.Ticker#register
        * @param listener {Function} 帧回调函数,参数返回上一帧和这帧的间隔时间。示例：onEnterFrame(frameTime:number):void
        * @param thisObject {any} 帧回调函数的this对象
        * @param priority {any} 事件优先级，开发者请勿传递 Number.NEGATIVE_INFINITY 和 Number.POSITIVE_INFINITY
        * @stable A-
        */
        public register(listener: Function, thisObject: any, priority?: number): void;
        /**
        * 取消侦听enterFrame事件
        * @method egret.Ticker#unregister
        * @param listener {Function} 事件侦听函数
        * @param thisObject {any} 侦听函数的this对象
        * @stable A-
        */
        public unregister(listener: Function, thisObject: any): void;
        /**
        * 在指定的延迟（以毫秒为单位）后运行指定的函数。
        * @method egret.Ticker#setTimeout
        * @param listener {Function}
        * @param thisObject {any}
        * @param delay {number}
        * @param ...parameter {any}
        * @deprecated
        */
        public setTimeout(listener: Function, thisObject: any, delay: number, ...parameters: any[]): void;
        /**
        * @method egret.Ticker#setTimeScale
        * @param timeScale {number}
        */
        public setTimeScale(timeScale: number): void;
        /**
        * @method egret.Ticker#getTimeScale
        */
        public getTimeScale(): number;
        /**
        * @method egret.Ticker#pause
        */
        public pause(): void;
        /**
        * @method egret.Ticker#resume
        */
        public resume(): void;
        private static instance;
        /**
        * @method egret.Ticker.getInstance
        * @returns {Ticker}
        */
        static getInstance(): Ticker;
    }
}
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
declare module egret {
    /**
    * @class egret.HorizontalAlign
    * @classdesc 水平对齐方式
    */
    class HorizontalAlign {
        /**
        * 左对齐
        * @constant egret.HorizontalAlign.LEFT
        */
        static LEFT: string;
        /**
        * 右对齐
        * @constant egret.HorizontalAlign.RIGHT
        */
        static RIGHT: string;
        /**
        * 水平居中对齐
        * @constant egret.HorizontalAlign.CENTER
        */
        static CENTER: string;
        /**
        * 水平两端对齐
        * 注意：TextFiled不支持此对齐方式。
        * @constant egret.HorizontalAlign.JUSTIFY
        */
        static JUSTIFY: string;
        /**
        * 相对于容器对子项进行内容对齐。这会将所有子项的大小统一调整为容器的"内容宽度"。
        * 容器的"内容宽度"是最大子项的大小,如果所有子项都小于容器的宽度，则会将所有子项的大小调整为容器的宽度。
        * 注意：TextFiled不支持此对齐方式。
        * @constant egret.HorizontalAlign.CONTENT_JUSTIFY
        */
        static CONTENT_JUSTIFY: string;
    }
}
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
declare module egret {
    /**
    * @class egret.VerticalAlign
    * @classdesc 垂直对齐方式
    */
    class VerticalAlign {
        /**
        * 顶对齐
        * @constant egret.VerticalAlign.TOP
        */
        static TOP: string;
        /**
        * 底对齐
        * @constant egret.VerticalAlign.BOTTOM
        */
        static BOTTOM: string;
        /**
        * 垂直居中对齐
        * @constant egret.VerticalAlign.MIDDLE
        */
        static MIDDLE: string;
        /**
        * 垂直两端对齐
        * 注意：TextFiled不支持此对齐方式。
        * @constant egret.VerticalAlign.JUSTIFY
        */
        static JUSTIFY: string;
        /**
        * 相对于容器对子项进行内容对齐。这会将所有子项的大小统一调整为容器的"内容高度"。
        * 容器的"内容高度"是最大子项的大小,如果所有子项都小于容器的高度，则会将所有子项的大小调整为容器的高度。
        * 注意：TextFiled不支持此对齐方式。
        * @constant egret.VerticalAlign.CONTENT_JUSTIFY
        */
        static CONTENT_JUSTIFY: string;
    }
}
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
declare module egret {
    /**
    * @class egret.Timer
    * @classdesc
    * @extends egret.EventDispatcher
    */
    class Timer extends EventDispatcher {
        constructor(delay: number, repeatCount?: number);
        /**
        * @member {number} egret.Timer#delay
        */
        public delay: number;
        /**
        * @member {number} egret.Timer#repeatCount
        */
        public repeatCount: number;
        private _currentCount;
        /**
        * @method egret.Timer#currentCount
        * @returns {number}
        */
        public currentCount(): number;
        private _running;
        /**
        * @member {boolean} egret.Timer#running
        */
        public running : boolean;
        /**
        * @method egret.Timer#reset
        */
        public reset(): void;
        /**
        * @method egret.Timer#start
        */
        public start(): void;
        /**
        * @method egret.Timer#stop
        */
        public stop(): void;
        private lastTime;
        private onEnterFrame(frameTime);
    }
}
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
declare module egret {
    /**
    * 返回一个对象的完全限定名<br/>
    * @method egret.getQualifiedClassName
    * @param value {any} 需要完全限定类名称的对象，可以将任何 TypeScript / JavaScript值传递给此方法，包括所有可用的TypeScript / JavaScript类型、对象实例、原始类型（如number）和类对象
    * @returns {string}
    * @example
    *  egret.getQualifiedClassName(egret.DisplayObject) //返回 "egret.DisplayObject"
    */
    function getQualifiedClassName(value: any): string;
}
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
declare module egret {
    /**
    * 返回 name 参数指定的类的类对象引用。
    * @method egret.getDefinitionByName
    * @param name {string} 类的名称。
    * @returns {any}
    * @example
    * egret.getDefinitionByName("egret.DisplayObject") //返回 DisplayObject类定义
    */
    function getDefinitionByName(name: string): any;
}
declare var __global: any;
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
declare module egret {
    /**
    * 在指定的延迟（以毫秒为单位）后运行指定的函数。
    * @method egret.setTimeout
    * @param listener {Function} 侦听函数
    * @param thisObject {any} this对象
    * @param delay {number} 延迟时间，以毫秒为单位
    * @param ...args {any} 参数列表
    * @returns {number} 返回索引，可以用于 clearTimeout
    */
    function setTimeout(listener: Function, thisObject: any, delay: number, ...args: any[]): number;
    /**
    * 清除指定延迟后运行的函数。
    * @method egret.clearTimeout
    * @param key {number}
    */
    function clearTimeout(key: number): void;
}
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
declare module egret {
    /**
    * 检查指定的应用程序域之内是否存在一个公共定义。该定义可以是一个类、一个命名空间或一个函数的定义。
    * @method egret.hasDefinition
    * @param name {string} 定义的名称。
    * @returns {boolean}
    * @example
    * egret.hasDefinition("egret.DisplayObject") //返回 true
    */
    function hasDefinition(name: string): boolean;
}
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
declare module egret {
    /**
    * 转换数字为颜色字符串
    * @method egret.toColorString
    * @param value {number}
    * @returns {string}
    */
    function toColorString(value: number): string;
}
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
declare module egret {
    /**
    * @class egret.Matrix
    * @classdesc
    * 2D矩阵类，包括常见矩阵算法
    * @extends egret.HashObject
    */
    class Matrix extends HashObject {
        public a: number;
        public b: number;
        public c: number;
        public d: number;
        public tx: number;
        public ty: number;
        /**
        * @method egret.Matrix#constructor
        * @constructor
        * @param a {number}
        * @param b {number}
        * @param c {number}
        * @param d {number}
        * @param tx {number}
        * @param ty {number}
        */
        constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
        static identity: Matrix;
        static DEG_TO_RAD: number;
        /**
        * 前置矩阵
        * @method egret.Matrix#prepend
        * @param a {number}
        * @param b {number}
        * @param c {number}
        * @param d {number}
        * @param tx {number}
        * @param ty {number}
        * @returns {egret.Matrix}
        */
        public prepend(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix;
        /**
        * 后置矩阵
        * @method egret.Matrix#append
        * @param a {number}
        * @param b {number}
        * @param c {number}
        * @param d {number}
        * @param tx {number}
        * @param ty {number}
        * @returns {egret.Matrix}
        */
        public append(a: any, b: any, c: any, d: any, tx: any, ty: any): Matrix;
        /**
        * 前置矩阵
        * @method egret.Matrix#prependMatrix
        * @param matrix {number}
        * @returns {egret.Matrix}
        */
        public prependMatrix(matrix: Matrix): Matrix;
        /**
        * 后置矩阵
        * @method egret.Matrix#appendMatrix
        * @param matrix {egret.Matrix}
        * @returns {egret.Matrix}
        */
        public appendMatrix(matrix: Matrix): Matrix;
        /**
        * 前置矩阵
        * @method egret.Matrix#prependTransform
        * @param x {number}
        * @param y {number}
        * @param scaleX {number}
        * @param scaleY {number}
        * @param rotation {number}
        * @param skewX {number}
        * @param skewY {number}
        * @param regX {number}
        * @param regY {number}
        * @returns {egret.Matrix}
        */
        public prependTransform(x: number, y: number, scaleX: number, scaleY: number, rotation: number, skewX: number, skewY: number, regX: number, regY: number): Matrix;
        /**
        * 后置矩阵
        * @method egret.Matrix#appendTransform
        * @param x {number}
        * @param y {number}
        * @param scaleX {number}
        * @param scaleY {number}
        * @param rotation {number}
        * @param skewX {number}
        * @param skewY {number}
        * @param regX {number}
        * @param regY {number}
        * @returns {egret.Matrix}
        */
        public appendTransform(x: number, y: number, scaleX: number, scaleY: number, rotation: number, skewX: number, skewY: number, regX: number, regY: number): Matrix;
        /**
        * 矩阵旋转，以角度制为单位
        * @method egret.Matrix#rotate
        * @param angle {number}
        * @returns {egret.Matrix}
        */
        public rotate(angle: any): Matrix;
        /**
        * 矩阵斜切，以角度值为单位
        * @method egret.Matrix#skew
        * @param skewX {number}
        * @param skewY {number}
        * @returns {egret.Matrix}
        */
        public skew(skewX: any, skewY: any): Matrix;
        /**
        * 矩阵缩放
        * @method egret.Matrix#scale
        * @param x {number}
        * @param y {number}
        * @returns {egret.Matrix}
        */
        public scale(x: any, y: any): Matrix;
        /**
        * 矩阵唯一
        * @method egret.Matrix#translate
        * @param x {number}
        * @param y {number}
        * @returns {egret.Matrix}
        */
        public translate(x: any, y: any): Matrix;
        /**
        * 矩阵重置
        * @method egret.Matrix#identity
        * @returns {egret.Matrix}
        */
        public identity(): Matrix;
        /**
        * 矩阵翻转
        * @method egret.Matrix#invert
        * @returns {egret.Matrix}
        */
        public invert(): Matrix;
        /**
        * 根据一个矩阵，返回某个点在该矩阵上的坐标
        * @method egret.Matrix.transformCoords
        * @param matrix {egret.Matrix}
        * @param x {number}
        * @param y {number}
        * @returns {numberPoint}
        * @stable C 该方法以后可能删除
        */
        static transformCoords(matrix: Matrix, x: number, y: number): Point;
        private array;
        public toArray(transpose: any): any;
    }
}
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
declare module egret {
    /**
    * @class egret.Point
    * @classdesc
    * Point 对象表示二维坐标系统中的某个位置，其中 x 表示水平轴，y 表示垂直轴。
    * @extends egret.HashObject
    */
    class Point extends HashObject {
        static identity: Point;
        /**
        * 创建一个 egret.Point 对象
        * @method egret.Point#constructor
        * @param x {number} 该对象的x属性值，默认为0
        * @param y {number} 该对象的y属性值，默认为0
        */
        constructor(x?: number, y?: number);
        /**
        * 该点的水平坐标。默认值为 0。
        * @constant {number} egret.Point#x
        */
        public x: number;
        /**
        * 该点的垂直坐标。默认值为 0。
        * @constant {number} egret.Point#y
        */
        public y: number;
        /**
        * 克隆点对象
        * @method egret.Point#clone
        * @returns {egret.Point}
        */
        public clone(): Point;
        /**
        * 确定两个点是否相同。如果两个点具有相同的 x 和 y 值，则它们是相同的点。
        * @method egret.Point#equals
        * @param {egret.Point} toCompare 要比较的点。
        * @returns {boolean} 如果该对象与此 Point 对象相同，则为 true 值，如果不相同，则为 false。
        */
        public equals(toCompare: Point): boolean;
        /**
        * 返回 pt1 和 pt2 之间的距离。
        * @method egret.Point#distance
        * @param p1 {egret.Point} 第一个点
        * @param p2 {egret.Point} 第二个点
        * @returns {number} 第一个点和第二个点之间的距离。
        */
        static distance(p1: Point, p2: Point): number;
    }
}
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
declare module egret {
    /**
    * @class egret.Rectangle
    * @classdesc
    * 矩形类
    * @extends egret.HashObject
    */
    class Rectangle extends HashObject {
        constructor(x?: number, y?: number, width?: number, height?: number);
        /**
        * 矩形x坐标
        * @constant {number} egret.Rectangle#x
        */
        public x: number;
        /**
        * 矩形y坐标
        * @constant {number} egret.Rectangle#y
        */
        public y: number;
        /**
        * 矩形宽度
        * @member {number} egret.Rectangle#width
        */
        public width: number;
        /**
        * 矩形高度
        * @member {number} egret.Rectangle#height
        */
        public height: number;
        /**
        * x和width的和
        * @member {number} egret.Rectangle#right
        */
        public right : number;
        /**
        * y和height的和
        * @member {number} egret.Rectangle#bottom
        */
        public bottom : number;
        /**
        * 举行类初始化赋值，开发者尽量调用此方法复用Rectangle对象，而不是每次需要的时候都重新创建
        * @method egret.Rectangle#initialize
        * @param x {number} 矩形的x轴
        * @param y {number} 矩形的y轴
        * @param width {number} 矩形的宽度
        * @param height {number} 矩形的高度
        * @returns {egret.Rectangle}
        */
        public initialize(x: number, y: number, width: number, height: number): Rectangle;
        /**
        * 判断某坐标点是否存在于矩形内
        * @method egret.Rectangle#contains
        * @param x {number} 检测点的x轴
        * @param y {number} 检测点的y轴
        * @returns {boolean} 如果检测点位于矩形内，返回true，否则，返回false
        */
        public contains(x: number, y: number): boolean;
        /**
        * 确定在 toIntersect 参数中指定的对象是否与此 Rectangle 对象相交。此方法检查指定的 Rectangle 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
        * @method egret.Rectangle#intersects
        * @param toIntersect {egret.Rectangle} 要与此 Rectangle 对象比较的 Rectangle 对象。
        * @returns {boolean} 如果两个矩形相交，返回true，否则返回false
        */
        public intersects(toIntersect: Rectangle): boolean;
        /**
        * 克隆矩形对象
        * @method egret.Rectangle#clone
        * @returns {egret.Rectangle} 返回克隆后的矩形
        */
        public clone(): Rectangle;
        /**
        * 引擎内部用于函数传递返回值的全局矩形对象，开发者请勿随意修改此对象
        * @member {egret.Rectangle} egret.Rectangle.identity
        */
        static identity: Rectangle;
        /**
        * 是否包含某个点
        * @method egret.Rectangle#containsPoint
        * @param point {egret.Point} 包含点对象
        * @returns {boolean} 如果包含，返回true，否则返回false
        */
        public containsPoint(point: Point): boolean;
    }
}
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
declare module egret {
    /**
    * @class egret.Logger
    * @classdesc
    * Logger是引擎的日志处理模块入口
    * @stable B 目前Logger的接口设计没有问题，但是考虑到跨平台，需要将其改为一个Context，并且允许开发者自由扩展以实现自身游戏的日志分析收集需求
    * todo:GitHub文档，如何利用日志帮助游戏持续改进
    */
    class Logger {
        /**
        * 表示出现了致命错误，开发者必须修复错误
        * @method egret.Logger.fatal
        * @param actionCode {string} 错误信息
        * @param value {Object} 错误描述信息
        */
        static fatal(actionCode: string, value?: Object): void;
        /**
        * 记录正常的Log信息
        * @method egret.Logger.info
        * @param actionCode {string} 错误信息
        * @param value {Object} 错误描述信息
        */
        static info(actionCode: string, value?: Object): void;
        /**
        * 记录可能会出现问题的Log信息
        * @method egret.Logger.warning
        * @param actionCode {string} 错误信息
        * @param value {Object} 错误描述信息
        */
        static warning(actionCode: string, value?: Object): void;
        /**
        * @private
        * @param type
        * @param actionCode
        * @param value
        */
        private static traceToConsole(type, actionCode, value);
        /**
        * @private
        * @param type
        * @param actionCode
        * @param value
        * @returns {string}
        */
        private static getTraceCode(type, actionCode, value);
    }
}
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
declare module egret {
    /**
    * @deprecated
    */
    class SAXParser extends HashObject {
        static _instance: SAXParser;
        /**
        * @deprecated
        */
        static getInstance(): SAXParser;
        private _parser;
        private _xmlDict;
        private _isSupportDOMParser;
        constructor();
        /**
        * @deprecated
        */
        public parserXML(textxml: string): any;
    }
}
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
declare module egret {
    /**
    * @class egret.StageDelegate
    * @classdesc
    * StageDelegate负责处理屏幕适配策略
    * @extends egret.HashObject
    */
    class StageDelegate extends HashObject {
        private static instance;
        /**
        * @method egret.StageDelegate.getInstance
        * @returns {StageDelegate}
        */
        static getInstance(): StageDelegate;
        /**
        * @member egret.StageDelegate.canvas_name
        */
        static canvas_name: string;
        /**
        * @member egret.StageDelegate.canvas_div_name
        */
        static canvas_div_name: string;
        private _designWidth;
        private _designHeight;
        public _scaleX: number;
        public _scaleY: number;
        private _resolutionPolicy;
        /**
        * @method egret.StageDelegate#constructor
        */
        constructor();
        /**
        * @method egret.StageDelegate#setDesignSize
        * @param width {number}
        * @param height {{number}}
        */
        public setDesignSize(width: number, height: number): void;
        /**
        * @method egret.StageDelegate#_setResolutionPolicy
        * @param resolutionPolic {any}
        */
        public _setResolutionPolicy(resolutionPolicy: ResolutionPolicy): void;
        /**
        * @method egret.StageDelegate#getScaleX
        */
        public getScaleX(): number;
        /**
        * @method egret.StageDelegate#getScaleY
        */
        public getScaleY(): number;
    }
    /**
    * @class egret.ResolutionPolicy
    * @classdesc
    */
    class ResolutionPolicy {
        private _containerStrategy;
        private _contentStrategy;
        constructor(containerStg: any, contentStg: any);
        /**
        * @method egret.ResolutionPolicy#init
        * @param view {egret.StageDelegate}
        */
        public init(view: StageDelegate): void;
        /**
        * @method egret.ResolutionPolicy#_apply
        * @param view {any}
        * @param designedResolutionWidth {any}
        * @param designedResolutionHeigh {any}
        */
        public _apply(view: any, designedResolutionWidth: any, designedResolutionHeight: any): void;
    }
    /**
    * @class egret.ContainerStrategy
    * @classdesc
    */
    class ContainerStrategy {
        /**
        * @constant egret.ContainerStrategy.EQUAL_TO_FRAME
        */
        static EQUAL_TO_FRAME: any;
        /**
        * @method egret.ContainerStrategy.initialize
        */
        static initialize(): void;
        /**
        * @method egret.ContainerStrategy#init
        * @param vie {any}
        */
        public init(view: any): void;
        /**
        * @method egret.ContainerStrategy#_apply
        * @param view {any}
        * @param designedWidth {any}
        * @param designedHeigh {any}
        */
        public _apply(view: any, designedWidth: any, designedHeight: any): void;
        public _setupContainer(): void;
    }
    /**
    * @class egret.EqualToFrame
    * @classdesc
    * @extends egret.ContainerStrategy
    */
    class EqualToFrame extends ContainerStrategy {
        public _apply(view: any): void;
    }
    /**
    * @class egret.ContentStrategy
    * @classdesc
    */
    class ContentStrategy {
        /**
        * @method egret.ContentStrategy#init
        * @param vie {any}
        */
        public init(view: any): void;
        /**
        * @method egret.ContentStrategy#_apply
        * @param delegate {egret.StageDelegate}
        * @param designedResolutionWidth {number}
        * @param designedResolutionHeight {number}
        */
        public _apply(delegate: StageDelegate, designedResolutionWidth: number, designedResolutionHeight: number): void;
    }
    /**
    * @class egret.FixedHeight
    * @classdesc
    * @extends egret.ContentStrategy
    */
    class FixedHeight extends ContentStrategy {
        private minWidth;
        /**
        * 构造函数
        * @param minWidth 最终游戏内适配的最小stageWidth，默认没有最小宽度
        */
        constructor(minWidth?: number);
        /**
        * @method egret.FixedHeight#_apply
        * @param delegate {any}
        * @param designedResolutionWidth {any}
        * @param designedResolutionHeight {any}
        */
        public _apply(delegate: StageDelegate, designedResolutionWidth: number, designedResolutionHeight: number): void;
    }
    /**
    * @class egret.FixedWidth
    * @classdesc
    * @extends egret.ContentStrategy
    */
    class FixedWidth extends ContentStrategy {
        private minHeight;
        /**
        * 构造函数
        * @param minHeight 最终游戏内适配的最小stageHeight，默认没有最小高度
        */
        constructor(minHeight?: number);
        public _apply(delegate: StageDelegate, designedResolutionWidth: number, designedResolutionHeight: number): void;
    }
    /**
    * @class egret.FixedSize
    * @classdesc
    * @extends egret.ContentStrategy
    */
    class FixedSize extends ContentStrategy {
        private width;
        private height;
        constructor(width: any, height: any);
        /**
        * @method egret.FixedSize#_apply
        * @param delegate {egret.StageDelegate}
        * @param designedResolutionWidth {number}
        * @param designedResolutionHeight {number}
        */
        public _apply(delegate: StageDelegate, designedResolutionWidth: number, designedResolutionHeight: number): void;
    }
    /**
    * @class egret.NoScale
    * @classdesc
    * @extends egret.ContentStrategy
    */
    class NoScale extends ContentStrategy {
        constructor();
        /**
        * @method egret.NoScale#_apply
        * @param delegate {egret.StageDelegate}
        * @param designedResolutionWidth {number}
        * @param designedResolutionHeight {number}
        */
        public _apply(delegate: StageDelegate, designedResolutionWidth: number, designedResolutionHeight: number): void;
    }
    class ShowAll extends ContentStrategy {
        constructor();
        /**
        * @method egret.NoScale#_apply
        * @param delegate {egret.StageDelegate}
        * @param designedResolutionWidth {number}
        * @param designedResolutionHeight {number}
        */
        public _apply(delegate: StageDelegate, designedResolutionWidth: number, designedResolutionHeight: number): void;
    }
}
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
declare module egret {
    /**
    * @class egret.RenderFilter
    * @classdesc
    * @extends egret.HashObject
    */
    class RenderFilter extends HashObject {
        constructor();
        private static instance;
        /**
        * @method egret.egret.getInstance
        * @returns {RenderFilter}
        */
        static getInstance(): RenderFilter;
        public _drawAreaList: Rectangle[];
        private _defaultDrawAreaList;
        private _originalData;
        /**
        * @method egret.egret#addDrawArea
        * @param area {egret.Rectangle}
        */
        public addDrawArea(area: Rectangle): void;
        /**
        * @method egret.egret#clearDrawArea
        */
        public clearDrawArea(): void;
        /**
        * 先检查有没有不需要绘制的区域，再把需要绘制的区域绘制出来
        * @method egret.egret#drawImage
        * @param renderContext {any}
        * @param data {RenderData}
        * @param sourceX {any}
        * @param sourceY {any}
        * @param sourceWidth {any}
        * @param sourceHeight {any}
        * @param destX {any}
        * @param destY {any}
        * @param destWidth {any}
        * @param destHeight {any}
        */
        public drawImage(renderContext: RendererContext, data: RenderData, sourceX: number, sourceY: number, sourceWidth: number, sourceHeight: number, destX: number, destY: number, destWidth: number, destHeight: number): void;
        private ignoreRender(data, rect, destX, destY);
        /**
        * @method egret.egret#getDrawAreaList
        * @returns {Rectangle}
        */
        public getDrawAreaList(): Rectangle[];
    }
    /**
    * @class egret.RenderData
    * @interface
    * @classdesc
    */
    interface RenderData {
        /**
        * @member egret.RenderData#worldTransform
        */
        _worldTransform: Matrix;
        /**
        * @member egret.RenderData#worldBounds
        */
        _worldBounds: Rectangle;
        _texture_to_render: Texture;
    }
}
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
declare module egret {
    /**
    * @classdesc 注入器
    * @class egret.Injector
    */
    class Injector {
        /**
        * 储存类的映射规则
        */ 
        private static mapClassDic;
        /**
        * 以类定义为值进行映射注入，当第一次用getInstance()请求它的单例时才会被实例化。
        * @method egret.Injector.mapClass
        * @param whenAskedFor {any} whenAskedFor 传递类定义或类完全限定名作为需要映射的键。
        * @param instantiateClass {any} instantiateClass 传递类作为需要映射的值，它的构造函数必须为空。若不为空，请使用Injector.mapValue()方法直接注入实例。
        * @param named {string} named 可选参数，在同一个类作为键需要映射多条规则时，可以传入此参数区分不同的映射。在调用getInstance()方法时要传入同样的参数。
        */
        static mapClass(whenAskedFor: any, instantiateClass: any, named?: string): void;
        /**
        * 获取完全限定类名
        */ 
        private static getKey(hostComponentKey);
        private static mapValueDic;
        /**
        * 以实例为值进行映射注入,当用getInstance()请求单例时始终返回注入的这个实例。
        * @method egret.Injector.mapValue
        * @param whenAskedFor {any} 传递类定义或类的完全限定名作为需要映射的键。
        * @param useValue {any} 传递对象实例作为需要映射的值。
        * @param named {string} 可选参数，在同一个类作为键需要映射多条规则时，可以传入此参数区分不同的映射。在调用getInstance()方法时要传入同样的参数。
        */ 
        static mapValue(whenAskedFor: any, useValue: any, named?: string): void;
        /**
        * 检查指定的映射规则是否存在
        * @method egret.Injector.hasMapRule
        * @param whenAskedFor {any} 传递类定义或类的完全限定名作为需要映射的键。
        * @param named {string} 可选参数，在同一个类作为键需要映射多条规则时，可以传入此参数区分不同的映射。
        * @returns {boolean}
        */
        static hasMapRule(whenAskedFor: any, named?: string): boolean;
        /**
        * 获取指定类映射的单例，注意:这个方法总是返回全局唯一的实例，不会重复创建。
        * @method egret.Injector.getInstance
        * @param clazz {any} 类定义或类的完全限定名
        * @param named {string} 可选参数，若在调用mapClass()映射时设置了这个值，则要传入同样的字符串才能获取对应的单例
        * @returns {any}
        */ 
        static getInstance(clazz: any, named?: string): any;
    }
}
/**
* Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
* to any person obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish, distribute,
* sublicense, and/or sell copies of the Software, and to permit persons to whom
* the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included
* in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
* INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
* PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
* FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
* ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
declare module egret {
    /**
    * @class egret.BlendMode
    * @classdesc 提供混合模式可视效果的常量值的类。
    */
    class BlendMode {
        /**
        * 将显示对象的原色值添加到它的背景颜色中，上限值为 0xFF。此设置通常用于使两个对象间的加亮溶解产生动画效果。
        * @constant {string} egret.BlendMode.NORMAL
        */
        static NORMAL: string;
        /**
        * 将显示对象的原色值添加到它的背景颜色中，上限值为 0xFF。此设置通常用于使两个对象间的加亮溶解产生动画效果。
        * @constant {string} egret.BlendMode.ADD
        */
        static ADD: string;
        /**
        * 强制为该显示对象创建一个透明度组。这意味着在对显示对象进行进一步处理之前，该对象已在临时缓冲区中预先构成。
        * 在以下情况下将会自动完成预先构成操作：显示对象通过位图缓存进行预缓存，或者显示对象是一个显示对象容器，
        * 该容器至少具有一个带有 blendMode 设置（而不是 "normal"）的子对象。
        * @constant {string} egret.BlendMode.LAYER
        */
        static LAYER: string;
    }
}
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
*       derived from this software without specific prior written pemission.
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
declare module egret {
    /**
    * @class egret.DisplayObject
    * @extends egret.EventDispatcher
    * @classdesc 类是可放在显示列表中的所有对象的基类。该显示列表管理运行时显示的所有对象。使用 DisplayObjectContainer 类排列显示列表中的显示对象。
    *
    * DisplayObjectContainer 对象可以有子显示对象，而其他显示对象是“叶”节点，只有父级和同级，没有子级。
    *
    * DisplayObject 类支持基本功能（如对象的 x 和 y 位置），也支持更高级的对象属性（如它的转换矩阵），所有显示对象都继承自 DisplayObject 类。
    *
    * DisplayObject 类包含若干广播事件。通常，任何特定事件的目标均为一个特定的 DisplayObject 实例。
    *
    * 若只有一个目标，则会将事件侦听器限制为只能放置到该目标上（在某些情况下，可放置到显示列表中该目标的祖代上），这意味着您可以向任何 DisplayObject 实例添加侦听器来侦听广播事件。
    *
    * 任何继承自DisplayObject的类都必须实现以下方法
    * _render();
    * _measureBounds()
    * 不允许重写以下方法
    * _draw();
    * getBounds();
    *
    */
    class DisplayObject extends EventDispatcher implements RenderData {
        constructor();
        private _normalDirty;
        public _setDirty(): void;
        public getDirty(): boolean;
        private _sizeDirty;
        public _setParentSizeDirty(): void;
        public _setSizeDirty(): void;
        public _clearDirty(): void;
        public _clearSizeDirty(): void;
        /**
        * 表示 DisplayObject 的实例名称。
        * @member {string} egret.DisplayObject#name
        */
        public name: string;
        public _texture_to_render: Texture;
        public _parent: DisplayObjectContainer;
        private _cacheAsBitmap;
        /**
        * 表示包含此显示对象的 DisplayObjectContainer 对象
        * @member {egret.DisplayObjectContainer} egret.DisplayObject#parent
        */
        public parent : DisplayObjectContainer;
        public _parentChanged(parent: DisplayObjectContainer): void;
        /**
        * 表示 DisplayObject 实例相对于父级 DisplayObjectContainer 本地坐标的 x 坐标。
        * @member {number} egret.DisplayObject#x
        */
        public _x: number;
        public x : number;
        /**
        * 表示 DisplayObject 实例相对于父级 DisplayObjectContainer 本地坐标的 y 坐标。
        * @member {number} egret.DisplayObject#y
        */
        public _y: number;
        public y : number;
        /**
        * 表示从注册点开始应用的对象的水平缩放比例（百分比）。
        * @member {number} egret.DisplayObject#scaleX
        * @default 1
        */
        public _scaleX: number;
        public scaleX : number;
        /**
        * 表示从对象注册点开始应用的对象的垂直缩放比例（百分比）。
        * @member {number} egret.DisplayObject#scaleY
        * @default 1
        */
        public _scaleY: number;
        public scaleY : number;
        /**
        * 表示从对象绝对锚点X。
        * @member {number} egret.DisplayObject#anchorOffsetX
        * @default 0
        */
        public _anchorOffsetX: number;
        public anchorOffsetX : number;
        /**
        * 表示从对象绝对锚点Y。
        * @member {number} egret.DisplayObject#anchorOffsetY
        * @default 0
        */
        public _anchorOffsetY: number;
        public anchorOffsetY : number;
        /**
        * 表示从对象相对锚点X。
        * @member {number} egret.DisplayObject#anchorX
        * @default 0
        */
        public _anchorX: number;
        public anchorX : number;
        /**
        * 表示从对象相对锚点Y。
        * @member {number} egret.DisplayObject#anchorY
        * @default 0
        */
        public _anchorY: number;
        public anchorY : number;
        /**
        * 显示对象是否可见。
        * @member {boolean} egret.DisplayObject#visible
        */
        public _visible: boolean;
        public visible : boolean;
        /**
        * 表示 DisplayObject 实例距其原始方向的旋转程度，以度为单位
        * @member {number} egret.DisplayObject#rotation
        * @default 0
        */
        public _rotation: number;
        public rotation : number;
        /**
        * 表示指定对象的 Alpha 透明度值
        * @member {number} egret.DisplayObject#alpha
        *  @default 1
        */
        public _alpha: number;
        public alpha : number;
        /**
        * 表示DisplayObject的x方向斜切
        * @member {number} egret.DisplayObject#skewX
        * @default 0
        */
        public _skewX: number;
        public skewX : number;
        /**
        * 表示DisplayObject的y方向斜切
        * @member {number} egret.DisplayObject#skewY
        * @default 0
        */
        public _skewY: number;
        public skewY : number;
        /**
        * 指定此对象是否接收鼠标/触摸事件
        * @member {boolean} egret.DisplayObject#touchEnabled
        * @default false
        */
        public _touchEnabled: boolean;
        public touchEnabled : boolean;
        /**
        * BlendMode 类中的一个值，用于指定要使用的混合模式。
        * @member {BlendMode} egret.DisplayObject#blendMode
        */
        public blendMode: string;
        /**
        * 显示对象的滚动矩形范围。显示对象被裁切为矩形定义的大小，当您更改 scrollRect 对象的 x 和 y 属性时，它会在矩形内滚动。
        *  @member {egret.Rectangle} egret.DisplayObject#scrollRect
        */
        public _scrollRect: Rectangle;
        public scrollRect : Rectangle;
        /**
        * 测量宽度
        * @returns {number}
        */
        public measuredWidth : number;
        /**
        * 测量高度
        * @returns {number}
        */
        public measuredHeight : number;
        /**
        * 显式设置宽度
        * @returns {number}
        */
        public _explicitWidth: number;
        public explicitWidth : number;
        /**
        * 显式设置高度
        * @returns {number}
        */
        public _explicitHeight: number;
        public explicitHeight : number;
        /**
        * 宽度，优先顺序为 显式设置宽度 > 测量宽度
        * @member {number} egret.DisplayObject#width
        * @returns {number}
        */
        /**
        * 显式设置宽度
        * @param value
        */
        public width : number;
        /**
        * 高度，优先顺序为 显式设置高度 > 测量高度
        * @member {number} egret.DisplayObject#height
        * @returns {number}
        */
        /**
        * 显式设置高度
        * @param value
        */
        public height : number;
        public _hasWidthSet: Boolean;
        /**
        * @inheritDoc
        */
        public _setWidth(value: number): void;
        public _hasHeightSet: Boolean;
        /**
        * @inheritDoc
        */
        public _setHeight(value: number): void;
        /**
        * 调用显示对象被指定的 mask 对象遮罩
        */
        public mask: Rectangle;
        public _worldTransform: Matrix;
        public _worldBounds: Rectangle;
        public worldAlpha: number;
        /**
        * @private
        * @param renderContext
        */
        public _draw(renderContext: RendererContext): void;
        private drawCacheTexture(renderContext);
        /**
        * @private
        * @param renderContext
        */
        public _updateTransform(): void;
        /**
        * 计算全局数据
        * @private
        */
        public _calculateWorldform(): void;
        /**
        * @private
        * @param renderContext
        */
        public _render(renderContext: RendererContext): void;
        private _cacheBounds;
        /**
        * 获取显示对象的测量边界
        * @method egret.DisplayObject#getBounds
        * @param resultRect {Rectangle} 可选参数，传入用于保存结果的Rectangle对象，避免重复创建对象。
        * @returns {Rectangle}
        */
        public getBounds(resultRect?: Rectangle): Rectangle;
        private destroyCacheBounds();
        /**
        * @private
        * @returns {Matrix}
        */
        private static identityMatrixForGetConcatenated;
        public _getConcatenatedMatrix(): Matrix;
        /**
        * 将 point 对象从显示对象的（本地）坐标转换为舞台（全局）坐标。
        * @method egret.DisplayObject#localToGlobal
        * @param x {number} 本地x坐标
        * @param y {number} 本地y坐标
        * @param resultPoint {Point} 可选参数，传入用于保存结果的Point对象，避免重复创建对象。
        * @returns {egret.Point}
        */
        public localToGlobal(x?: number, y?: number, resultPoint?: Point): Point;
        /**
        * 将指定舞台坐标（全局）转换为显示对象（本地）坐标。
        * @method egret.DisplayObject#globalToLocal
        * @param x {number} 全局x坐标
        * @param y {number} 全局y坐标
        * @param resultPoint {Point} 可选参数，传入用于保存结果的Point对象，避免重复创建对象。
        * @returns {egret.Point}
        */
        public globalToLocal(x?: number, y?: number, resultPoint?: Point): Point;
        /**
        * 检测指定坐标是否在显示对象内
        * @method egret.DisplayObject#hitTest
        * @param x {number} 检测坐标的x轴
        * @param y {number} 检测坐标的y轴
        * @param ignoreTouchEnabled {boolean} 是否忽略TouchEnabled
        * @returns {*}
        */
        public hitTest(x: number, y: number, ignoreTouchEnabled?: boolean): DisplayObject;
        private _hitTestPointTexture;
        /**
        * 计算显示对象，以确定它是否与 x 和 y 参数指定的点重叠或相交。x 和 y 参数指定舞台的坐标空间中的点，而不是包含显示对象的显示对象容器中的点（除非显示对象容器是舞台）。
        * 注意，不要在大量物体中使用精确碰撞像素检测，这回带来巨大的性能开销
        * @method egret.DisplayObject#hitTestPoint
        * @param x {number}  要测试的此对象的 x 坐标。
        * @param y {number}  要测试的此对象的 y 坐标。
        * @param shapeFlag {boolean} 是检查对象 (true) 的实际像素，还是检查边框 (false) 的实际像素。
        * @returns {boolean} 如果显示对象与指定的点重叠或相交，则为 true；否则为 false。
        */
        public hitTestPoint(x: number, y: number, shapeFlag?: boolean): boolean;
        public _getMatrix(): Matrix;
        public _getSize(resultRect: Rectangle): Rectangle;
        private _rectW;
        private _rectH;
        /**
        * 测量显示对象坐标与大小
        */
        public _measureSize(resultRect: Rectangle): Rectangle;
        /**
        * 测量显示对象坐标，这个方法需要子类重写
        * @returns {egret.Rectangle}
        * @private
        */
        public _measureBounds(): Rectangle;
        public _getOffsetPoint(): Point;
        public _onAddToStage(): void;
        public _onRemoveFromStage(): void;
        public _stage: Stage;
        /**
        * 获取舞台对象。当该显示对象不在舞台上时，此属性返回 null
        * @member {number} egret.DisplayObject#stage
        * @returns {egret.Stage}
        */
        public stage : Stage;
        static _enterFrameCallBackList: any[];
        static _renderCallBackList: any[];
        public addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void;
        public removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean): void;
        public dispatchEvent(event: Event): boolean;
        public _dispatchPropagationEvent(event: Event, list: DisplayObject[], targetIndex: number): void;
        public willTrigger(type: string): boolean;
        public cacheAsBitmap : boolean;
        private renderTexture;
        static getTransformBounds(bounds: Rectangle, mtx: Matrix): Rectangle;
    }
}
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
declare module egret {
    /**
    * @class egret.DisplayObjectContainer
    * @classdesc
    * DisplayObjectContainer 类是显示列表中显示对象容器。
    */
    class DisplayObjectContainer extends DisplayObject {
        static __EVENT__ADD_TO_STAGE_LIST: DisplayObject[];
        static __EVENT__REMOVE_FROM_STAGE_LIST: DisplayObject[];
        constructor();
        public _touchChildren: boolean;
        /**
        * 指定此对象的子项以及子孙项是否接收鼠标/触摸事件
        * @member {boolean} egret.DisplayObjectContainer#touchChildren
        */
        public touchChildren : boolean;
        public _children: DisplayObject[];
        /**
        * 返回此对象的子项数目。
        * @member {number} egret.DisplayObjectContainer#numChildren
        */
        public numChildren : number;
        /**
        * 更改现有子项在显示对象容器中的位置。这会影响子对象的分层。
        * @method egret.DisplayObjectContainer#setChildIndex
        * @param child {egret.DisplayObject} 要为其更改索引编号的 DisplayObject 子实例。
        * @param index {number} 生成的 child 显示对象的索引编号。当新的索引编号小于0或大于已有子元件数量时，新加入的DisplayObject对象将会放置于最上层。
        */
        public setChildIndex(child: DisplayObject, index: number): void;
        private doSetChildIndex(child, index);
        /**
        * 将一个 DisplayObject 子实例添加到该 DisplayObjectContainer 实例中。子项将被添加到该 DisplayObjectContainer 实例中其他所有子项的前（上）面。（要将某子项添加到特定索引位置，请使用 addChildAt() 方法。）
        * @method egret.DisplayObjectContainer#addChild
        * @param child {egret.DisplayObject} 要作为该 DisplayObjectContainer 实例的子项添加的 DisplayObject 实例。
        * @returns {egret.DisplayObject} 在 child 参数中传递的 DisplayObject 实例。
        */
        public addChild(child: DisplayObject): DisplayObject;
        /**
        * 将一个 DisplayObject 子实例添加到该 DisplayObjectContainer 实例中。该子项将被添加到指定的索引位置。索引为 0 表示该 DisplayObjectContainer 对象的显示列表的后（底）部。如果索引值为-1，则表示该DisplayObjectContainer 对象的显示列表的前（上）部。
        * @method egret.DisplayObjectContainer#addChildAt
        * @param child {egret.DisplayObject} 要作为该 DisplayObjectContainer 实例的子项添加的 DisplayObject 实例。
        * @param index {number} 添加该子项的索引位置。 如果指定当前占用的索引位置，则该位置以及所有更高位置上的子对象会在子级列表中上移一个位置。
        * @returns {egret.DisplayObject} 在 child 参数中传递的 DisplayObject 实例。
        */
        public addChildAt(child: DisplayObject, index: number): DisplayObject;
        public _doAddChild(child: DisplayObject, index: number, notifyListeners?: boolean): DisplayObject;
        /**
        * 将一个 DisplayObject 子实例从 DisplayObjectContainer 实例中移除。
        * @method egret.DisplayObjectContainer#removeChild
        * @param child {egret.DisplayObject} 要删除的 DisplayObject 实例。
        * @returns {egret.DisplayObject} 在 child 参数中传递的 DisplayObject 实例。
        */
        public removeChild(child: DisplayObject): DisplayObject;
        /**
        * 从 DisplayObjectContainer 的子列表中指定的 index 位置删除子 DisplayObject。
        * @method egret.DisplayObjectContainer#removeChildAt
        * @param index {number} 要删除的 DisplayObject 的子索引。
        * @returns {egret.DisplayObject} 已删除的 DisplayObject 实例。
        */
        public removeChildAt(index: number): DisplayObject;
        public _doRemoveChild(index: number, notifyListeners?: boolean): DisplayObject;
        /**
        * 返回位于指定索引处的子显示对象实例。
        * @method egret.DisplayObjectContainer#getChildAt
        * @param index {number} 子对象的索引位置。
        * @returns {egret.DisplayObject} 位于指定索引位置处的子显示对象。
        */
        public getChildAt(index: number): DisplayObject;
        /**
        * 确定指定显示对象是 DisplayObjectContainer 实例的子项还是该实例本身。搜索包括整个显示列表（其中包括此 DisplayObjectContainer 实例）。孙项、曾孙项等，每项都返回 true。
        * @method egret.DisplayObjectContainer#contains
        * @param child {egret.DisplayObject} 要测试的子对象。
        * @returns {boolean} 如果指定的显示对象为DisplayObjectContainer该实例本身，则返回true，如果指定的显示对象为当前实例子项，则返回false。
        */
        public contains(child: DisplayObject): boolean;
        /**
        * 在子级列表中两个指定的索引位置，交换子对象的 Z 轴顺序（前后顺序）。显示对象容器中所有其他子对象的索引位置保持不变。
        * @method egret.DisplayObjectContainer#swapChildrenAt
        * @param index1 {number} 第一个子对象的索引位置。
        * @param index2 {number} 第二个子对象的索引位置。
        */
        public swapChildrenAt(index1: number, index2: number): void;
        /**
        * 交换两个指定子对象的 Z 轴顺序（从前到后顺序）。显示对象容器中所有其他子对象的索引位置保持不变。
        * @method egret.DisplayObjectContainer#swapChildren
        * @param child1 {egret.DisplayObject} 第一个子对象。
        * @param child2 {egret.DisplayObject} 第二个子对象。
        */
        public swapChildren(child1: DisplayObject, child2: DisplayObject): void;
        private _swapChildrenAt(index1, index2);
        /**
        * 返回 DisplayObject 的 child 实例的索引位置。
        * @method egret.DisplayObjectContainer#getChildIndex
        * @param child {egret.DisplayObject} 要标识的 DisplayObject 实例。
        * @returns {number} 要标识的子显示对象的索引位置。
        */
        public getChildIndex(child: DisplayObject): number;
        /**
        * 从 DisplayObjectContainer 实例的子级列表中删除所有 child DisplayObject 实例。
        * @method egret.DisplayObjectContainer#removeChildren
        */
        public removeChildren(): void;
        public _updateTransform(): void;
        public _render(renderContext: RendererContext): void;
        /**
        * @see egret.DisplayObject._measureBounds
        * @returns {null}
        * @private
        */
        public _measureBounds(): Rectangle;
        /**
        * 检测指定坐标是否在显示对象内
        * @method egret.DisplayObjectContainer#hitTest
        * @see egret.DisplayObject.hitTest
        * @param x {number} 检测坐标的x轴
        * @param y {number} 检测坐标的y轴
        * @param ignoreTouchEnabled {boolean} 是否忽略TouchEnabled
        * @returns {egret.DisplayObject} 返回所发生碰撞的DisplayObject对象
        */
        public hitTest(x: number, y: number, ignoreTouchEnabled?: boolean): DisplayObject;
        public _onAddToStage(): void;
        public _onRemoveFromStage(): void;
        /**
        * 返回具有指定名称的子显示对象。
        * @method egret.DisplayObjectContainer#getChildByName
        * @param name {string} 要返回的子项的名称。
        * @returns {egret.DisplayObject} 具有指定名称的子显示对象。
        */
        public getChildByName(name: string): DisplayObject;
    }
}
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
declare module egret {
    /**
    * @class egret.Stage
    * @classdesc Stage 类代表主绘图区。
    */
    class Stage extends DisplayObjectContainer {
        private _scaleMode;
        static _invalidateRenderFlag: boolean;
        /**
        * 调用 invalidate() 方法后，在显示列表下次呈现时，Egret 会向每个已注册侦听 render 事件的显示对象发送一个 render 事件。
        * 每次您希望 Egret 发送 render 事件时，都必须调用 invalidate() 方法。
        * @method egret.Stage#invalidate
        */
        public invalidate(): void;
        constructor(width?: number, height?: number);
        public scaleMode : string;
        private _stageWidth;
        /**
        * @member {number} egret.Stage#stageWidth
        * 舞台宽度（坐标系宽度，非设备宽度）
        */
        public stageWidth : number;
        private _stageHeight;
        /**
        * @member {number} egret.Stage#stageHeight
        * 舞台高度（坐标系高度，非设备高度）
        */
        public stageHeight : number;
        /**
        * @member egret.Stage#hitTest
        * @see egret.DisplayObject#hitTest
        * @param x
        * @param y
        * @returns {egret.DisplayObject}
        */
        public hitTest(x: any, y: any): DisplayObject;
        /**
        * 返回舞台尺寸范围
        * @member egret.Stage#getBounds
        * @see egret.DisplayObject#getBounds
        * @param resultRect {egret.Rectangle} 可选参数，传入用于保存结果的Rectangle对象，避免重复创建对象。
        * @returns {egret.Rectangle}
        */
        public getBounds(resultRect?: Rectangle): Rectangle;
        public _updateTransform(): void;
    }
}
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
declare module egret {
    class StageScaleMode {
        static NO_BORDER: string;
        static NO_SCALE: string;
        static SHOW_ALL: string;
    }
}
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
declare module egret {
    /**
    * @class egret.BitmapFillMode
    * @classdesc
    * BitmapFillMode 类定义Bitmap的图像填充方式。
    */
    class BitmapFillMode {
        /**
        * 位图将重复以填充区域
        * @constant {string} egret.BitmapFillMode.REPEAT
        */
        static REPEAT: string;
        /**
        * 位图将拉伸以填充区域
        * @constant {string} egret.BitmapFillMode.SCALE
        */
        static SCALE: string;
    }
}
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
declare module egret {
    /**
    * @class egret.Bitmap
    * @classdesc
    * Bitmap 类表示用于表示位图图像的显示对象。
    * @extends egret.DisplayObject
    */
    class Bitmap extends DisplayObject {
        /**
        * 全部Bitmap是否开启DEBUG模式
        * @member {boolean} egret.Bitmap.debug
        */
        static debug: boolean;
        constructor(texture?: Texture);
        /**
        * 单个Bitmap是否开启DEBUG模式
        * @member {boolean} egret.Bitmap#debug
        */
        public debug: boolean;
        /**
        * debug边框颜色，默认值为红色
        * @member {number} egret.Bitmap#debugColor
        */
        public debugColor: number;
        private _texture;
        /**
        * 渲染纹理
        * @member {egret.Texture} egret.Bitmap#texture
        */
        public texture : Texture;
        /**
        * 矩形区域，它定义位图对象的九个缩放区域。此属性仅当fillMode为BitmapFillMode.SCALE时有效。
        * @member {egret.Texture} egret.Bitmap#scale9Grid
        */
        public scale9Grid: Rectangle;
        /**
        * 确定位图填充尺寸的方式。默认值：BitmapFillMode.SCALE。
        * 设置为 BitmapFillMode.REPEAT时，位图将重复以填充区域。
        * 设置为 BitmapFillMode.SCALE时，位图将拉伸以填充区域。
        * @member {egret.Texture} egret.Bitmap#fillMode
        */
        public fillMode: string;
        public _render(renderContext: RendererContext): void;
        static _drawBitmap(renderContext: RendererContext, destW: number, destH: number, thisObject: any): void;
        /**
        * 绘制平铺位图
        */
        private static drawRepeatImage(renderContext, data, destWidth, destHeight);
        /**
        * 绘制九宫格位图
        */
        private static drawScale9GridImage(renderContext, data, scale9Grid, destWidth, destHeight);
        /**
        * @see egret.DisplayObject.measureBounds
        * @returns {egret.Rectangle}
        * @private
        */
        public _measureBounds(): Rectangle;
    }
}
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
declare module egret {
    /**
    * @classdesc
    * @class egret.BitmapText
    * 位图字体采用了Bitmap+SpriteSheet的方式来渲染文字。
    * @extends egret.DisplayObjectContainer
    */
    class BitmapText extends DisplayObjectContainer {
        /**
        * 设置文本
        */
        private _text;
        private _textChanged;
        /**
        * 显示的文本内容
        * @member {string} egret.BitmapText#text
        *
        */
        public text : string;
        /**
        * BitmapTextSpriteSheet对象，缓存了所有文本的位图纹理
        * @member {egret.BitmapTextSpriteSheet} egret.BitmapText#spriteSheet
        */
        public spriteSheet: BitmapTextSpriteSheet;
        private _bitmapPool;
        constructor();
        public _updateTransform(): void;
        public _renderText(forMeasureContentSize?: boolean): Rectangle;
        public _measureBounds(): Rectangle;
    }
}
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
declare module egret {
    /**
    * @class egret.Graphics
    * @classdesc Graphics 类包含一组可用来创建矢量形状的方法。支持绘制的显示对象包括 Sprite 和 Shape 对象。这些类中的每一个类都包括 graphics 属性，该属性是一个 Graphics 对象。
    */
    class Graphics {
        private canvasContext;
        private commandQueue;
        private renderContext;
        private strokeStyleColor;
        private fillStyleColor;
        constructor();
        /**
        * 指定一种简单的单一颜色填充
        * @method egret.Graphics#beginFill
        * @param color {number} 填充的颜色
        * @param alpha {number} 填充的 Alpha 值
        */
        public beginFill(color: number, alpha?: number): void;
        private _setStyle(colorStr);
        /**
        * 绘制一个矩形
        * @method egret.Graphics#drawRect
        * @param x {number} 圆心相对于父显示对象注册点的 x 位置（以像素为单位）。
        * @param y {number} 相对于父显示对象注册点的圆心的 y 位置（以像素为单位）。
        * @param width {number} 矩形的宽度（以像素为单位）。
        * @param height {number} 矩形的高度（以像素为单位）。
        * @param r? {number} 圆的半径（以像素为单位）,不设置就为直角矩形。
        */
        public drawRect(x: number, y: number, width: number, height: number): void;
        /**
        * 绘制一个圆。
        * @method egret.Graphics#drawCircle
        * @param x {number} 圆心相对于父显示对象注册点的 x 位置（以像素为单位）。
        * @param y {number} 相对于父显示对象注册点的圆心的 y 位置（以像素为单位）。
        * @param r {number} 圆的半径（以像素为单位）。
        */
        public drawCircle(x: number, y: number, r: number): void;
        /**
        * 绘制一个圆角矩形
        * @method egret.Graphics#drawRect
        * @param x {number} 圆心相对于父显示对象注册点的 x 位置（以像素为单位）。
        * @param y {number} 相对于父显示对象注册点的圆心的 y 位置（以像素为单位）。
        * @param width {number} 矩形的宽度（以像素为单位）。
        * @param height {number} 矩形的高度（以像素为单位）。
        * @param ellipseWidth {number} 用于绘制圆角的椭圆的宽度（以像素为单位）。
        * @param ellipseHeight {number} 用于绘制圆角的椭圆的高度（以像素为单位）。 （可选）如果未指定值，则默认值与为 ellipseWidth 参数提供的值相匹配。
        */
        public drawRoundRect(x: number, y: number, width: number, height: number, ellipseWidth: number, ellipseHeight?: number): void;
        /**
        * 绘制一个椭圆。
        * @method egret.Graphics#drawEllipse
        * @param x {number} 一个表示相对于父显示对象注册点的水平位置的数字（以像素为单位）。
        * @param y {number} 一个表示相对于父显示对象注册点的垂直位置的数字（以像素为单位）。
        * @param width {number} 矩形的宽度（以像素为单位）。
        * @param height {number} 矩形的高度（以像素为单位）。
        */
        public drawEllipse(x: number, y: number, width: number, height: number): void;
        /**
        * 指定一种线条样式以用于随后对 lineTo() 或 drawCircle() 等 Graphics 方法的调用。
        * @method egret.Graphics#lineStyle
        * @param thickness {number} 一个整数，以点为单位表示线条的粗细，有效值为 0 到 255。如果未指定数字，或者未定义该参数，则不绘制线条。如果传递的值小于 0，则默认值为 0。值 0 表示极细的粗细；最大粗细为 255。如果传递的值大于 255，则默认值为 255。
        * @param color {number} 线条的十六进制颜色值（例如，红色为 0xFF0000，蓝色为 0x0000FF 等）。如果未指明值，则默认值为 0x000000（黑色）。可选。
        * @param alpha {number} 表示线条颜色的 Alpha 值的数字；有效值为 0 到 1。如果未指明值，则默认值为 1（纯色）。如果值小于 0，则默认值为 0。如果值大于 1，则默认值为 1。
        * @param pixelHinting {boolean} 布尔型值，指定是否提示笔触采用完整像素。它同时影响曲线锚点的位置以及线条笔触大小本身。在 pixelHinting 设置为 true 的情况下，线条宽度会调整到完整像素宽度。在 pixelHinting 设置为 false 的情况下，对于曲线和直线可能会出现脱节。
        * @param scaleMode {string} 用于指定要使用的比例模式
        * @param caps {string} 用于指定线条末端处端点类型的 CapsStyle 类的值。
        * @param joints {string} 指定用于拐角的连接外观的类型。
        * @param miterLimit {number} 用于表示剪切斜接的极限值的数字。
        */
        public lineStyle(thickness?: number, color?: number, alpha?: number, pixelHinting?: boolean, scaleMode?: string, caps?: string, joints?: string, miterLimit?: number): void;
        /**
        * 使用当前线条样式绘制一条从当前绘图位置开始到 (x, y) 结束的直线；当前绘图位置随后会设置为 (x, y)。
        * @method egret.Graphics#lineTo
        * @param x {number} 一个表示相对于父显示对象注册点的水平位置的数字（以像素为单位）。
        * @param y {number} 一个表示相对于父显示对象注册点的垂直位置的数字（以像素为单位）。
        */
        public lineTo(x: number, y: number): void;
        /**
        * 使用当前线条样式和由 (controlX, controlY) 指定的控制点绘制一条从当前绘图位置开始到 (anchorX, anchorY) 结束的二次贝塞尔曲线。当前绘图位置随后设置为 (anchorX, anchorY)。
        * 如果在调用 moveTo() 方法之前调用了 curveTo() 方法，则当前绘图位置的默认值为 (0, 0)。如果缺少任何一个参数，则此方法将失败，并且当前绘图位置不改变。
        * 绘制的曲线是二次贝塞尔曲线。二次贝塞尔曲线包含两个锚点和一个控制点。该曲线内插这两个锚点，并向控制点弯曲。
        * @method egret.Graphics#curveTo
        * @param controlX {number} 一个数字，指定控制点相对于父显示对象注册点的水平位置。
        * @param controlY {number} 一个数字，指定控制点相对于父显示对象注册点的垂直位置。
        * @param anchorX {number} 一个数字，指定下一个锚点相对于父显示对象注册点的水平位置。
        * @param anchorY {number} 一个数字，指定下一个锚点相对于父显示对象注册点的垂直位置。
        */
        public curveTo(controlX: Number, controlY: Number, anchorX: Number, anchorY: Number): void;
        /**
        * 将当前绘图位置移动到 (x, y)。如果缺少任何一个参数，则此方法将失败，并且当前绘图位置不改变。
        * @method egret.Graphics#moveTo
        * @param x {number} 一个表示相对于父显示对象注册点的水平位置的数字（以像素为单位）。
        * @param y {number} 一个表示相对于父显示对象注册点的垂直位置的数字（以像素为单位）。
        */
        public moveTo(x: number, y: number): void;
        /**
        * 清除绘制到此 Graphics 对象的图形，并重置填充和线条样式设置。
        * @method egret.Graphics#clear
        */
        public clear(): void;
        /**
        * 对从上一次调用 beginFill()方法之后添加的直线和曲线应用填充。
        * @method egret.Graphics#endFill
        */
        public endFill(): void;
        public _draw(renderContext: RendererContext): void;
    }
}
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
declare module egret {
    /**
    * @class egret.Shape
    * @classdesc 此类用于使用 Egret 绘图应用程序编程接口 (API) 创建简单形状。Shape 类包括 graphics 属性，该属性使您可以从 Graphics 类访问方法。
    */
    class Shape extends DisplayObject {
        constructor();
        /**
        * 获取 Shape 中的 Graphics 对象。
        * @member {egret.Graphics} egret.Shape#graphics
        */
        private _graphics;
        public graphics : Graphics;
        public _render(renderContext: RendererContext): void;
    }
}
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
declare module egret {
    /**
    * @class egret.Sprite
    * @classdesc Sprite 类是基本显示列表构造块：一个可显示图形并且也可包含子项的显示列表节点。Sprite 对象与影片剪辑类似，但没有时间轴。Sprite 是不需要时间轴的对象的相应基类。例如，Sprite 将是通常不使用时间轴的用户界面 (UI) 组件的逻辑基类。
    */
    class Sprite extends DisplayObjectContainer {
        constructor();
        /**
        * 获取 Sprite 中的 Graphics 对象。
        * @member {egret.Graphics} egret.Sprite#graphics
        */
        private _graphics;
        public graphics : Graphics;
        public _render(renderContext: RendererContext): void;
    }
}
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
declare module egret {
    /**
    * @class egret.TextField
    * @classdesc
    * TextField是egret的文本渲染类，采用浏览器/设备的API进行渲染，在不同的浏览器/设备中由于字体渲染方式不一，可能会有渲染差异
    * 如果开发者希望所有平台完全无差异，请使用BitmapText
    * @extends egret.DisplayObject
    */
    class TextField extends DisplayObject {
        /**
        * 显示文本
        * @member {string} egret.TextField#text
        */
        public _text: string;
        public text : string;
        public _setTextDirty(): void;
        /**
        * 字体
        * @member {any} egret.TextField#fontFamily
        */
        public _fontFamily: string;
        public fontFamily : string;
        /**
        * 字号
        * @member {number} egret.TextField#size
        */
        public _size: number;
        public size : number;
        /**
        * 是否显示为斜体，默认false。
        * @member {boolean} egret.TextField#italic
        */
        public _italic: boolean;
        public italic : boolean;
        /**
        * 是否显示为粗体，默认false。
        * @member {boolean} egret.TextField#bold
        */
        public _bold: boolean;
        public bold : boolean;
        public _textColorString: string;
        private _textColor;
        /**
        * 文字颜色
        * @member {number} egret.TextField#textColor
        */
        public textColor : number;
        public _strokeColorString: string;
        private _strokeColor;
        /**
        * 描边颜色
        * @member {number} egret.TextField#strokeColor
        */
        public strokeColor : number;
        /**
        * 描边宽度，0为没有描边
        * @member {number} egret.TextField#stroke
        */
        public _stroke: number;
        public stroke : number;
        /**
        * 文本水平对齐方式,使用HorizontalAlign定义的常量，默认值HorizontalAlign.LEFT。
        * @member {string} egret.TextField#textAlign
        */
        public _textAlign: string;
        public textAlign : string;
        /**
        * 文本垂直对齐方式,使用VerticalAlign定义的常量，默认值VerticalAlign.TOP。
        * @member {string} egret.TextField#verticalAlign
        */
        public _verticalAlign: string;
        public verticalAlign : string;
        /**
        * @member {any} egret.TextField#maxWidth
        */
        public maxWidth: any;
        /**
        * 行间距
        * @member {number} egret.TextField#lineSpacing
        */
        public _lineSpacing: number;
        public lineSpacing : number;
        private _numLines;
        /**
        * 文本行数
        * @member {number} egret.TextField#numLines
        */
        public numLines : number;
        constructor();
        /**
        * @see egret.DisplayObject._render
        * @param renderContext
        */
        public _render(renderContext: RendererContext): void;
        /**
        * 测量显示对象坐标与大小
        */
        public _measureBounds(): Rectangle;
        /**
        * @private
        * @param renderContext
        * @returns {Rectangle}
        */
        private drawText(renderContext, forMeasure);
        private _textWidth;
        private _textHeight;
        private measuredWidths;
        private getTextLines(renderContext);
    }
}
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
declare module egret {
    /**
    * @class egret.TextFieldType
    * @classdesc
    * TextFieldType 类是在设置 TextField 类的 type 属性时使用的常数值的枚举。
    */
    class TextFieldType {
        /**
        * 用于指定动态文本
        * @constant {string} egret.TextFieldType.DYNAMIC
        */
        static DYNAMIC: string;
        /**
        * 用于指定输入文本
        * @constant {string} egret.TextFieldType.INPUT
        */
        static INPUT: string;
    }
}
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
declare module egret {
    /**
    * @class egret.SpriteSheet
    * @classdesc SpriteSheet是一张由多个子位图拼接而成的集合位图，它包含多个Texture对象。
    * 每一个Texture都共享SpriteSheet的集合位图，但是指向它的不同的区域。
    * 在WebGL / OpenGL上，这种做法可以显著提升性能
    * 同时，SpriteSheet可以很方便的进行素材整合，降低HTTP请求数量
    * SpriteSheet 格式的具体规范可以参见此文档  https://github.com/egret-labs/egret-core/wiki/Egret-SpriteSheet-Specification
    *
    */
    class SpriteSheet extends HashObject {
        constructor(texture: Texture);
        /**
        * 表示bitmapData.width
        */
        public _sourceWidth: number;
        /**
        * 表示bitmapData.height
        */
        public _sourceHeight: number;
        /**
        * 表示这个SpriteSheet的位图区域在bitmapData上的起始位置x。
        */
        private _bitmapX;
        /**
        * 表示这个SpriteSheet的位图区域在bitmapData上的起始位置y。
        */
        private _bitmapY;
        /**
        * 共享的位图数据
        */
        private bitmapData;
        /**
        * 纹理缓存字典
        */
        public _textureMap: Object;
        /**
        * 根据指定纹理名称获取一个缓存的Texture对象
        * @method egret.SpriteSheet#getTexture
        * @param name {string} 缓存这个Texture对象所使用的名称
        * @returns {egret.Texture} Texture对象
        */
        public getTexture(name: string): Texture;
        /**
        * 为SpriteSheet上的指定区域创建一个新的Texture对象并缓存它
        * @method egret.SpriteSheet#createTexture
        * @param name {string} 缓存这个Texture对象所使用的名称，如果名称已存在，将会覆盖之前的Texture对象
        * @param bitmapX {number} 纹理区域在bitmapData上的起始坐标x
        * @param bitmapY {number} 纹理区域在bitmapData上的起始坐标y
        * @param bitmapWidth {number} 纹理区域在bitmapData上的宽度
        * @param bitmapHeight {number} 纹理区域在bitmapData上的高度
        * @param offsetX {number} 原始位图的非透明区域x起始点
        * @param offsetY {number} 原始位图的非透明区域y起始点
        * @param textureWidth {number} 原始位图的高度，若不传入，则使用bitmapWidth的值。
        * @param textureHeight {number} 原始位图的宽度，若不传入，这使用bitmapHeight值。
        * @returns {egret.Texture} 创建的Texture对象
        */
        public createTexture(name: string, bitmapX: number, bitmapY: number, bitmapWidth: number, bitmapHeight: number, offsetX?: number, offsetY?: number, textureWidth?: number, textureHeight?: number): Texture;
    }
}
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
declare module egret {
    class TextInput extends DisplayObject {
        private stageText;
        constructor();
        public _onAddToStage(): void;
        public setText(value: string): void;
        public getText(): string;
        public setTextType(type: string): void;
        public getTextType(): string;
        private onMouseDownHandler(event);
        public _onRemoveFromStage(): void;
        public _measureBounds(): Rectangle;
        public hitTest(x: any, y: any, ignoreTouchEnabled?: boolean): DisplayObject;
        public _updateTransform(): void;
        /**
        * 字号
        * @member {number} egret.TextField#size
        */
        public _size: number;
        public size : number;
        public _textColorString: string;
        private _textColor;
        /**
        * 文字颜色
        * @member {number} egret.TextField#textColor
        */
        public textColor : number;
    }
}
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
declare module egret {
    class BitmapTextSpriteSheet extends SpriteSheet {
        constructor(texture: Texture, fntText: string);
        private charList;
        public getTexture(name: string): Texture;
        private parseConfig(fntText);
        private getConfigByKey(configText, key);
    }
}
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
declare module egret {
    /**
    * @class egret.MovieClip
    * @classdesc 影片剪辑，可以通过影片剪辑播放序列帧动画。
    * @extends egret.DisplayObjectContainer
    */
    class MovieClip extends DisplayObjectContainer {
        private delegate;
        /**
        * @member {number} egret.MovieClip#frameRate
        * 动画的播放帧频
        */
        public frameRate: number;
        constructor(data: any, texture?: Texture);
        /**
        * 播放指定动画
        * @method egret.MovieClip#gotoAndPlay
        * @param frameName {string} 指定帧的帧名称
        
        */
        public gotoAndPlay(frameName: string): void;
        /**
        * 播放并暂停指定动画
        * @method egret.MovieClip#gotoAndStop
        * @param frameName {string} 指定帧的帧名称
        
        */
        public gotoAndStop(frameName: string): void;
        /**
        * 暂停动画
        * @method egret.MovieClip#stop
        */
        public stop(): void;
        /**
        * @method egret.MovieClip#dispose
        */
        public dispose(): void;
        /**
        * 方法名改为 dispose
        * @method egret.MovieClip#release
        * @deprecated
        */
        public release(): void;
        /**
        * @method egret.MovieClip#getCurrentFrameIndex
        * @deprecated
        * @returns {number}
        */
        public getCurrentFrameIndex(): number;
        /**
        * 获取当前影片剪辑的帧频数
        * @method egret.MovieClip#getTotalFrame
        * @deprecated
        * @returns {number}
        */
        public getTotalFrame(): number;
        /**
        * @method egret.MovieClip#setInterval
        * @deprecated
        * @param value {number}
        */
        public setInterval(value: number): void;
        /**
        * @method egret.MovieClip#getIsPlaying
        * @deprecated
        * @returns {boolean}
        */
        public getIsPlaying(): boolean;
    }
    interface MovieClipDelegate {
        gotoAndPlay(frameName: string): void;
        gotoAndStop(frameName: string): void;
        stop(): void;
        dispose(): void;
        setMovieClip(movieclip: MovieClip): void;
    }
    class DefaultMovieClipDelegate implements MovieClipDelegate {
        public data: any;
        private _frameData;
        private _totalFrame;
        private _spriteSheet;
        private _passTime;
        private _currentFrameIndex;
        private _currentFrameName;
        private _isPlaying;
        private movieClip;
        private bitmap;
        constructor(data: any, texture: Texture);
        public setMovieClip(movieClip: MovieClip): void;
        public gotoAndPlay(frameName: string): void;
        public gotoAndStop(frameName: string): void;
        public stop(): void;
        public dispose(): void;
        private checkHasFrame(name);
        private update(advancedTime);
        private playNextFrame(needShow?);
        private getTexture(name);
    }
}
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
declare module egret {
    /**
    * @class egret.StageText
    * @classdesc
    * @extends egret.HashObject
    */
    class StageText extends HashObject {
        private div;
        private inputElement;
        private _size;
        constructor();
        /**
        * @method egret.StageText#getText
        * @returns {string}
        */
        public _getText(): string;
        /**
        * @method egret.StageText#setText
        * @param value {string}
        */
        public _setText(value: string): void;
        /**
        * @method egret.StageText#setTextType
        * @param type {string}
        */
        public _setTextType(type: string): void;
        /**
        * @method egret.StageText#getTextType
        * @returns {string}
        */
        public _getTextType(): string;
        /**
        * @method egret.StageText#open
        * @param x {number}
        * @param y {number}
        * @param width {number}
        * @param height {number}
        */
        public _open(x: number, y: number, width?: number, height?: number): void;
        private getStageDelegateDiv();
        /**
        * @method egret.StageText#add
        */
        public _add(): void;
        /**
        * @method egret.StageText#remove
        */
        public _remove(): void;
        public changePosition(x: number, y: number): void;
        public changeSize(width: number, height: number): void;
        public setSize(value: number): void;
        public setTextColor(value: string): void;
    }
}
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
declare module egret {
    /**
    * @class egret.URLRequestMethod
    * @classdesc URLRequestMethod 类提供了一些值，这些值可指定在将数据发送到服务器时，
    * URLRequest 对象应使用 POST 方法还是 GET 方法。
    */
    class URLRequestMethod {
        /**
        * 表示 URLRequest 对象是一个 GET。
        * @constant {string} egret.URLRequestMethod.GET
        */
        static GET: string;
        /**
        * 表示 URLRequest 对象是一个 POST。
        * @constant {string} egret.URLRequestMethod.POST
        */
        static POST: string;
    }
}
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
declare module egret {
    /**
    * @class egret.URLLoaderDataFormat
    * @classdesc URLLoaderDataFormat 类提供了一些用于指定如何接收已下载数据的值。
    */
    class URLLoaderDataFormat {
        /**
        * 指定以原始二进制数据形式接收下载的数据。
        * @constant {string} egret.URLLoaderDataFormat.BINARY
        */
        static BINARY: string;
        /**
        * 指定以文本形式接收已下载的数据。
        * @constant {string} egret.URLLoaderDataFormat.TEXT
        */
        static TEXT: string;
        /**
        * 指定以 URL 编码变量形式接收下载的数据。
        * @constant {string} egret.URLLoaderDataFormat.VARIABLES
        */
        static VARIABLES: string;
        /**
        * 指定以位图纹理形式接收已下载的数据。
        * @constant {string} egret.URLLoaderDataFormat.TEXTURE
        */
        static TEXTURE: string;
        /**
        * 指定以声音形式接收已下载的数据。
        * @constant {string} egret.URLLoaderDataFormat.SOUND
        */
        static SOUND: string;
    }
}
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
declare module egret {
    /**
    * @class egret.URLVariables
    * @classdesc
    * 使用 URLVariables 类可以在应用程序和服务器之间传输变量。
    * 将 URLVariables 对象与 URLLoader 类的方法、URLRequest 类的 data 属性一起使用。
    * @extends egret.HashObject
    */
    class URLVariables extends HashObject {
        /**
        * @method egret.URLVariables#constructor
        * @param source {String} 包含名称/值对的 URL 编码的字符串。
        */
        constructor(source?: string);
        /**
        * 此 URLVariables 储存的键值对数据对象。
        * @member egret.URLVariables#variables
        */
        public variables: Object;
        /**
        * 将变量字符串转换为此 URLVariables.variables 对象的属性。
        * @method egret.URLVariables#decode
        * @param source {string}
        */
        public decode(source: string): void;
        /**
        * 以 MIME 内容编码格式 application/x-www-form-urlencoded 返回包含所有可枚举变量的字符串。
        * @method egret.URLVariables#toString
        */
        public toString(): string;
    }
}
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
declare module egret {
    /**
    * @class egret.URLRequest
    * @classdesc URLRequest 类可捕获单个 HTTP 请求中的所有信息。
    * @extends egret.HashObject
    */
    class URLRequest extends HashObject {
        /**
        * 实例化一个URLRequest对象
        * @method egret.URLRequest#constructor
        * @param url {string} 进行网络请求的地址
        */
        constructor(url?: string);
        /**
        * 一个对象，它包含将随 URL 请求一起传输的数据。
        * 该属性与 method 属性配合使用。当 method 值为 GET 时，将使用 HTTP 查询字符串语法将 data 值追加到 URLRequest.url 值。
        * 当 method 值为 POST（或 GET 之外的任何值）时，将在 HTTP 请求体中传输 data 值。
        * URLRequest API 支持二进制 POST，并支持 URL 编码变量和字符串。该数据对象可以是 ByteArray、URLVariables 或 String 对象。
        * 该数据的使用方式取决于所用对象的类型：
        * 如果该对象为 ByteArray 对象，则 ByteArray 对象的二进制数据用作 POST 数据。对于 GET，不支持 ByteArray 类型的数据。
        * 如果该对象是 URLVariables 对象，并且该方法是 POST，则使用 x-www-form-urlencoded 格式对变量进行编码，并且生成的字符串会用作 POST 数据。
        * 如果该对象是 URLVariables 对象，并且该方法是 GET，则 URLVariables 对象将定义要随 URLRequest 对象一起发送的变量。
        * 否则，该对象会转换为字符串，并且该字符串会用作 POST 或 GET 数据。
        * @member {any} egret.URLRequest#data
        */
        public data: any;
        /**
        * 请求方式，有效值为URLRequestMethod.GET 或 URLRequestMethod.POST。
        * @member {string} egret.URLRequest#method
        */
        public method: string;
        /**
        * 所请求的 URL。
        * @member {string} egret.URLRequest#url
        */
        public url: string;
    }
}
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
declare module egret {
    /**
    * @class egret.URLLoader
    * @classdesc
    * URLLoader 类以文本、二进制数据或 URL 编码变量的形式从 URL 下载数据。在下载文本文件、XML 或其他用于动态数据驱动应用程序的信息时，它很有用。
    * URLLoader 对象会先从 URL 中下载所有数据，然后才将数据用于应用程序中的代码。它会发出有关下载进度的通知，
    * 通过 bytesLoaded 和 bytesTotal 属性以及已调度的事件，可以监视下载进度。
    * @extends egret.EventDispatcher
    */
    class URLLoader extends EventDispatcher {
        /**
        * @method egret.URLLoader#constructor
        * @param request {URLRequest} 一个 URLRequest 对象，指定要下载的 URL。
        * 如果省略该参数，则不开始加载操作。如果已指定参数，则立即开始加载操作
        */
        constructor(request?: URLRequest);
        /**
        * 控制是以文本 (URLLoaderDataFormat.TEXT)、原始二进制数据 (URLLoaderDataFormat.BINARY) 还是 URL 编码变量 (URLLoaderDataFormat.VARIABLES) 接收下载的数据。
        * 如果 dataFormat 属性的值是 URLLoaderDataFormat.TEXT，则所接收的数据是一个包含已加载文件文本的字符串。
        * 如果 dataFormat 属性的值是 URLLoaderDataFormat.BINARY，则所接收的数据是一个包含原始二进制数据的 ByteArray 对象。
        * 如果 dataFormat 属性的值是 URLLoaderDataFormat.TEXTURE，则所接收的数据是一个包含位图数据的Texture对象。
        * 如果 dataFormat 属性的值是 URLLoaderDataFormat.VARIABLES，则所接收的数据是一个包含 URL 编码变量的 URLVariables 对象。
        * 默认值:URLLoaderDataFormat.TEXT
        * @member {string} egret.URLLoader#dataFormat
        */
        public dataFormat: string;
        /**
        * 从加载操作接收的数据。只有完成加载操作时，才会填充该属性。该数据的格式取决于 dataFormat 属性的设置：
        * 如果 dataFormat 属性是 URLLoaderDataFormat.TEXT，则所接收的数据是一个包含已加载文件文本的字符串。
        * 如果 dataFormat 属性是 URLLoaderDataFormat.BINARY，则所接收的数据是一个包含原始二进制数据的 ByteArray 对象。
        * 如果 dataFormat 属性是 URLLoaderDataFormat.TEXTURE，则所接收的数据是一个包含位图数据的Texture对象。
        * 如果 dataFormat 属性是 URLLoaderDataFormat.VARIABLES，则所接收的数据是一个包含 URL 编码变量的 URLVariables 对象。
        * @member {any} egret.URLLoader#data
        */
        public data: any;
        public _request: URLRequest;
        /**
        * 从指定的 URL 发送和加载数据。可以以文本、原始二进制数据或 URL 编码变量格式接收数据，这取决于为 dataFormat 属性所设置的值。
        * 请注意 dataFormat 属性的默认值为文本。如果想将数据发送至指定的 URL，则可以在 URLRequest 对象中设置 data 属性。
        * @method egret.URLLoader#load
        * @param request {URLRequest}  一个 URLRequest 对象，指定要下载的 URL。
        */
        public load(request: URLRequest): void;
    }
}
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
declare module egret {
    /**
    * @class egret.Texture
    * @classdesc 纹理类是对不同平台不同的图片资源的封装
    * 在HTML5中，资源是一个HTMLElement对象
    * 在OpenGL / WebGL中，资源是一个提交GPU后获取的纹理id
    * Texture类封装了这些底层实现的细节，开发者只需要关心接口即可
    */
    class Texture extends HashObject {
        public webGLTexture: any;
        constructor();
        /**
        * 表示这个纹理在bitmapData上的x起始位置
        */
        public _bitmapX: number;
        /**
        * 表示这个纹理在bitmapData上的y起始位置
        */
        public _bitmapY: number;
        /**
        * 表示这个纹理在bitmapData上的宽度
        */
        public _bitmapWidth: number;
        /**
        * 表示这个纹理在bitmapData上的高度
        */
        public _bitmapHeight: number;
        /**
        * 表示这个纹理显示了之后在x方向的渲染偏移量
        */
        public _offsetX: number;
        /**
        * 表示这个纹理显示了之后在y方向的渲染偏移量
        */
        public _offsetY: number;
        public _textureWidth: number;
        /**
        * 纹理宽度
        * @member {number} egret.Texture#textureWidth
        */
        public textureWidth : number;
        public _textureHeight: number;
        /**
        * 纹理高度
        * @member {number} egret.Texture#textureWidth
        */
        public textureHeight : number;
        /**
        * 表示bitmapData.width
        */
        public _sourceWidth: number;
        /**
        * 表示bitmapData.height
        */
        public _sourceHeight: number;
        public _bitmapData: any;
        /**
        * 纹理对象中得位图数据
        * @member {any} egret.Texture#bitmapData
        */
        public bitmapData : any;
        public _setBitmapData(value: any): void;
        /**
        * 获取某一点像素的颜色值
        * @method egret.Texture#getPixel32
        * @param x 像素点的X轴坐标
        * @param y 像素点的Y轴坐标
        * @returns {number} 指定像素点的颜色值
        */
        public getPixel32(x: any, y: any): number[];
    }
}
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
declare module egret {
    /**
    * @class egret.RenderTexture
    * @classdesc
    * RenderTexture 是动态纹理类，他实现了将显示对象及其子对象绘制成为一个纹理的功能
    * @extends egret.Texture
    */
    class RenderTexture extends Texture {
        private renderContext;
        constructor();
        /**
        * 将制定显示对象绘制为一个纹理
        * @method egret.RenderTexture#drawToTexture
        * @param displayObject {egret.DisplayObject}
        */
        public drawToTexture(displayObject: DisplayObject): void;
    }
}
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
declare module egret {
    /**
    * @class egret.RendererContext
    * @classdesc
    * RenderContext是游戏的渲染上下文。
    * 这是一个抽象基类，制定主要的接口
    * @extends egret.HashObject
    */
    class RendererContext extends HashObject {
        /**
        * 渲染全部纹理的时间开销
        * @member egret.RendererContext#renderCost
        */
        public renderCost: number;
        /**
        * 绘制纹理的缩放比率，默认值为1
        * @member egret.RendererContext#texture_scale_factor
        */
        public texture_scale_factor: number;
        /**
        * @method egret.RendererContext#constructor
        */
        constructor();
        /**
        * @method egret.RendererContext#clearScreen
        * @private
        */
        public clearScreen(): void;
        /**
        * 清除Context的渲染区域
        * @method egret.RendererContext#clearRect
        * @param x {number}
        * @param y {number}
        * @param w {number}
        * @param h {numbe}
        */
        public clearRect(x: number, y: number, w: number, h: number): void;
        /**
        * 绘制图片
        * @method egret.RendererContext#drawImage
        * @param texture {Texture}
        * @param sourceX {any}
        * @param sourceY {any}
        * @param sourceWidth {any}
        * @param sourceHeight {any}
        * @param destX {any}
        * @param destY {any}
        * @param destWidth {any}
        * @param destHeigh {any}
        */
        public drawImage(texture: Texture, sourceX: any, sourceY: any, sourceWidth: any, sourceHeight: any, destX: any, destY: any, destWidth: any, destHeight: any): void;
        /**
        * 变换Context的当前渲染矩阵
        * @method egret.RendererContext#setTransform
        * @param matrix {egret.Matri}
        */
        public setTransform(matrix: Matrix): void;
        /**
        * 设置渲染alpha
        * @method egret.RendererContext#setAlpha
        * @param value {number}
        * @param blendMode {egret.BlendMod}
        */
        public setAlpha(value: number, blendMode: string): void;
        /**
        * 设置渲染文本参数
        * @method egret.RendererContext#setupFont
        * @param textField {TextField}
        */
        public setupFont(textField: TextField): void;
        /**
        * 测量文本
        * @method egret.RendererContext#measureText
        * @param text {string}
        * @returns {number}
        * @stable B 参数很可能会需要调整，和setupFont整合
        */
        public measureText(text: string): number;
        /**
        * 绘制文本
        * @method egret.RendererContext#drawText
        * @param textField {egret.TextField}
        * @param text {string}
        * @param x {number}
        * @param y {number}
        * @param maxWidth {numbe}
        */
        public drawText(textField: TextField, text: string, x: number, y: number, maxWidth: number): void;
        public strokeRect(x: any, y: any, w: any, h: any, color: any): void;
        public pushMask(mask: Rectangle): void;
        public popMask(): void;
        public onRenderStart(): void;
        public onRenderFinish(): void;
        static createRendererContext(canvas: any): RendererContext;
    }
}
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
declare module egret {
    class InteractionMode {
        /**
        * 使用鼠标交互模式。
        */
        static MOUSE: string;
        /**
        * 使用触摸交互模式。
        */
        static TOUCH: string;
        /**
        * 当前Egret使用的交互模式。
        */
        static mode: string;
    }
}
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
declare module egret {
    /**
    *
    * @class egret.TouchContext
    * @classdesc TouchContext是egret的触摸Context
    */
    class TouchContext extends HashObject {
        private _currentTouchTarget;
        public maxTouches: number;
        private touchDownTarget;
        private touchingIdentifiers;
        constructor();
        /**
        * 启动触摸检测
        * @method egret.TouchContext#run
        */
        public run(): void;
        public getTouchData(identifier: any, x: any, y: any): any;
        public dispatchEvent(type: string, data: any): void;
        public onTouchBegan(x: number, y: number, identifier: number): void;
        private lastTouchX;
        private lastTouchY;
        public onTouchMove(x: number, y: number, identifier: number): void;
        public onTouchEnd(x: number, y: number, identifier: number): void;
    }
}
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
declare module egret {
    /**
    * @class egret.NetContext
    * @classdesc
    * @extends egret.HashObject
    */
    class NetContext extends HashObject {
        constructor();
        public proceed(loader: URLLoader): void;
    }
}
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
declare module egret {
    /**
    * @class egret.DeviceContext
    * @classdesc
    * @extends egret.HashObject
    */
    class DeviceContext extends HashObject {
        /**
        * @member egret.DeviceContext#frameRate
        */
        public frameRate: number;
        /**
        * @method egret.DeviceContext#constructor
        */
        constructor();
        /**
        * @method egret.DeviceContext#executeMainLoop
        * @param callback {Function}
        * @param thisObject {any}
        */
        public executeMainLoop(callback: Function, thisObject: any): void;
    }
}
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
declare module egret {
    class ExternalInterface {
        constructor();
        /**
        * 将信息传递给 Egret 外层容器。
        * 如果该容器是 HTML 页，则此方法不可用。
        * 如果该容器是某个 App 容器，该容器将处理该事件。
        * @method egret.ExternalInterface#call
        * @param functionName {string}
        * @param value {string}
        */
        static call(functionName: string, value: string): void;
        /**
        * 添加外层容器调用侦听，该容器将传递一个字符串给 Egret 容器
        * 如果该容器是 HTML 页，则此方法不可用。
        * @method egret.ExternalInterface#addCallBack
        * @param functionName {string}
        * @param listener {Function}
        */
        static addCallback(functionName: string, listener: Function): void;
    }
}
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
declare module egret {
    /**
    * 这个类是HTML5的WebWrapper的第一个版本
    */
    class Browser extends HashObject {
        private static instance;
        private pfx;
        private type;
        private trans;
        private ua;
        private isHD;
        static getInstance(): Browser;
        /**
        * @deprecated
        * @returns {boolean}
        */
        public isMobile : boolean;
        constructor();
        public $new(x: any): any;
        public $(x: any): any;
        public translate: (a: any) => string;
        public rotate: (a: any) => string;
        public scale(a: any): string;
        public skew(a: any): string;
    }
}
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
declare module egret {
    /**
    * @class egret.XML
    * @classdesc
    * XML文件解析工具，它将XML文件解析为标准的JSON对象返回。
    * 用法类似JSON.parse(),传入一个XML字符串给XML.parse()，将能得到一个标准JSON对象。
    * 示例：<root value="abc">
    *          <item value="item0"/>
    *          <item value="item1"/>
    *       </root>
    * 将解析为:
    * {"name":"root","$value":"abc","children":[{"name":"item","$value":"item0"},{"name":"item","$value":"item0"}]};
    * 其中XML上的属性节点都使用$+"属性名"的方式表示,子节点都存放在children属性的列表里，name表示节点名称。
    */
    class XML {
        /**
        * 解析一个XML字符串为JSON对象。
        * @method egret.XML.parse
        * @param value {string} 要解析的XML字符串。
        * @returns {any}
        */
        static parse(value: string): any;
        private static parseNode(node);
        /**
        * 查找xml上符合节点路径的所有子节点。
        * @method egret.XML.findChildren
        * @param xml {any} 要查找的XML节点。
        * @param path {string} 子节点路径，例如"item.node"
        * @param result {egret.Array<any>} 可选参数，传入一个数组用于存储查找的结果。这样做能避免重复创建对象。
        * @returns {any}
        */
        static findChildren(xml: any, path: string, result?: any[]): any[];
        /**
        * @method egret.XML.findByPath
        * @param xml {any}
        * @param path {string}
        * @param result {egret.Array<any>}
        */
        static findByPath(xml: any, path: string, result: any[]): void;
        /**
        * 获取一个XML节点上的所有属性名列表
        * @method egret.XML.getAttributes
        * @param xml {any} 要查找的XML节点。
        * @param result {egret.Array<any>} 可选参数，传入一个数组用于存储查找的结果。这样做能避免重复创建对象。
        * @returns {string}
        */
        static getAttributes(xml: any, result?: any[]): string[];
    }
}
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
declare module egret {
    /**
    * Endian 类中包含一些值，它们表示用于表示多字节数字的字节顺序。
    * 字节顺序为 bigEndian（最高有效字节位于最前）或 littleEndian（最低有效字节位于最前）。
    * @class egret.Endian
    * @classdesc
    */
    class Endian {
        /**
        * 表示多字节数字的最高有效字节位于字节序列的最前面
        * @constant {string} egret.Endian.LITTLE_ENDIAN
        */
        static LITTLE_ENDIAN: string;
        /**
        * 表示多字节数字的最低有效字节位于字节序列的最前面
        * @constant {string} egret.Endian.BIG_ENDIAN
        */
        static BIG_ENDIAN: string;
    }
    /**
    * ByteArray 类提供用于优化读取、写入以及处理二进制数据的方法和属性。
    * @class egret.ByteArray
    * @classdesc
    */
    class ByteArray {
        /**
        * 将文件指针的当前位置（以字节为单位）移动或返回到 ByteArray 对象中。下一次调用读取方法时将在此位置开始读取，或者下一次调用写入方法时将在此位置开始写入
        * @member {number} egret.ByteArray#position
        */
        public position: number;
        /**
        * ByteArray 对象的长度（以字节为单位）。
        * @member {number} egret.ByteArray#length
        */
        public length: number;
        private _mode;
        private maxlength;
        private arraybytes;
        private unalignedarraybytestemp;
        private _endian;
        private isLittleEndian;
        /**
        * @constant {string} egret.ByteArray.DEFAULT_ENDIAN
        */
        static DEFAULT_ENDIAN: string;
        constructor();
        /**
        * 更改或读取数据的字节顺序；egret.Endian.BIG_ENDIAN 或 egret.Endian.LITTLE_ENDIAN。
        * @member {string} egret.ByteArray#endian
        */
        public endian : string;
        /**
        * @method egret.ByteArray#ensureWriteableSpace
        * @param n {number}
        */
        public ensureWriteableSpace(n: number): void;
        /**
        * @method egret.ByteArray#setArrayBuffer
        * @param aBuffer {egret.ArrayBuffer}
        */
        public setArrayBuffer(aBuffer: ArrayBuffer): void;
        /**
        * 可从字节数组的当前位置到数组末尾读取的数据的字节数。
        * 每次访问 ByteArray 对象时，将 bytesAvailable 属性与读取方法结合使用，以确保读取有效的数据。
        * @method egret.ByteArray#getBytesAvailable
        * @returns {number}
        */
        public bytesAvailable : number;
        /**
        * @method egret.ByteArray#ensureSpace
        * @param n {number}
        */
        public ensureSpace(n: number): void;
        /**
        * @method egret.ByteArray#writeByte
        * @param b {number}
        */
        public writeByte(b: number): void;
        /**
        * 从字节流中读取带符号的字节。
        * 返回值的范围是从 -128 到 127。
        * @method egret.ByteArray#readByte
        * @returns {number} 介于 -128 和 127 之间的整数。
        */
        public readByte(): number;
        /**
        * 从字节流中读取 length 参数指定的数据字节数。从 offset 指定的位置开始，将字节读入 bytes 参数指定的 ByteArray 对象中，并将字节写入目标 ByteArray 中。
        * @method egret.ByteArray#readBytes
        * @param bytes {egret.ByteArray} 要将数据读入的 ByteArray 对象。
        * @param offset {number} bytes 中的偏移（位置），应从该位置写入读取的数据。
        * @param length {number} 要读取的字节数。默认值 0 导致读取所有可用的数据。
        
        */
        public readBytes(bytes: ByteArray, offset?: number, length?: number): void;
        /**
        * @method egret.ByteArray#writeUnsignedByte
        * @param b {number}
        */
        public writeUnsignedByte(b: number): void;
        /**
        * @method egret.ByteArray#readUnsignedByte
        */
        public readUnsignedByte(): number;
        /**
        * @method egret.ByteArray#writeUnsignedShort
        * @param b {number}
        */
        public writeUnsignedShort(b: number): void;
        /**
        * @method egret.ByteArray#readUTFBytes
        * @param len {number}
        * @returns {string}
        */
        public readUTFBytes(len: number): string;
        /**
        * @method egret.ByteArray#readInt
        * @returns {number}
        */
        public readInt(): number;
        /**
        * @method egret.ByteArray#readShort
        * @returns {number}
        */
        public readShort(): number;
        /**
        * 从字节流中读取一个 IEEE 754 双精度（64 位）浮点数。
        * @method egret.ByteArray#readDouble
        * @returns {number} 返回双精度（64 位）浮点数。
        */
        public readDouble(): number;
        /**
        * @method egret.ByteArray#readUnsignedShort
        */
        public readUnsignedShort(): number;
        /**
        * @method egret.ByteArray#writeUnsignedInt
        * @param b {number}
        */
        public writeUnsignedInt(b: number): void;
        /**
        * 从字节流中读取一个无符号的 32 位整数。
        * 返回值的范围是从 0 到 4294967295。
        * @method egret.ByteArray#readUnsignedInt
        *  @returns {number} 介于 0 和 4294967295 之间的 32 位无符号整数。
        */
        public readUnsignedInt(): number;
        /**
        * @method egret.ByteArray#writeFloat
        * @param b {number}
        */
        public writeFloat(b: number): void;
        /**
        * 从字节流中读取一个 IEEE 754 单精度（32 位）浮点数。
        * @method egret.ByteArray#readFloat
        * @returns {number} 单精度（32 位）浮点数。
        */
        public readFloat(): number;
    }
}
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
declare module egret {
    /**
    * @class egret.Tween
    * @classdesc
    * Tween是Egret的动画缓动类
    * @extends egret.EventDispatcher
    */
    class Tween extends EventDispatcher {
        /**
        * @constant {any} egret.Tween.NONE
        */
        static NONE: number;
        /**
        * @constant {any} egret.Tween.LOOP
        */
        static LOOP: number;
        /**
        * @constant {any} egret.Tween.REVERSE
        */
        static REVERSE: number;
        private static _tweens;
        private static IGNORE;
        private static _plugins;
        private static _inited;
        private _target;
        private _useTicks;
        private ignoreGlobalPause;
        private loop;
        private pluginData;
        private _curQueueProps;
        private _initQueueProps;
        private _steps;
        private _actions;
        private paused;
        private duration;
        private _prevPos;
        private position;
        private _prevPosition;
        private _stepPosition;
        private passive;
        /**
        * 激活一个显示对象，对其添加 Tween 动画
        * @method egret.Tween.get
        * @param target {egret.DisplayObject} 要激活的显示对象
        */
        static get(target: any, props?: any, pluginData?: any, override?: boolean): Tween;
        /**
        * 删除一个显示对象上的全部 Tween 动画
        * @method egret.Tween.removeTweens
        * @param target {egret.DisplayObject}
        */
        static removeTweens(target: any): void;
        private static tick(delta, paused?);
        private static _register(tween, value);
        /**
        * @method egret.Tween.removeAllTweens
        */
        static removeAllTweens(): void;
        constructor(target: any, props: any, pluginData: any);
        private initialize(target, props, pluginData);
        private setPosition(value, actionsMode?);
        private _runActions(startPos, endPos, includeStart?);
        private _updateTargetProps(step, ratio);
        /**
        * @method egret.Tween#setPaused
        * @param value {boolean}
        * @returns {egret.Tween}
        */
        public setPaused(value: boolean): Tween;
        private _cloneProps(props);
        private _addStep(o);
        private _appendQueueProps(o);
        private _addAction(o);
        private _set(props, o);
        /**
        * 等待指定毫秒后执行下一个动画
        * @method egret.Tween#wait
        * @param duration {number} 要等待的时间，以毫秒为单位
        * @param passive {boolean}
        * @returns {egret.Tween}
        */
        public wait(duration: number, passive?: boolean): Tween;
        /**
        * 将指定显示对象的属性修改为指定值
        * @method egret.Tween#to
        * @param props {Object} 对象的属性集合
        * @param duration {number} 持续时间
        * @param ease {egret.Ease} 缓动算法
        * @returns {egret.Tween}
        */
        public to(props: any, duration: number, ease?: any): Tween;
        /**
        * 执行回调函数
        * @method egret.Tween#call
        * @param callback {Function}
        * @param thisObj {Object}
        * @param params {Object}
        * @returns {egret.Tween}
        */
        public call(callback: Function, thisObj?: any, params?: any): Tween;
        public set(props: any, target?: any): Tween;
        /**
        * @method egret.Tween#play
        * @param tween {egret.Tween}
        * @returns {egret.Tween}
        */
        public play(tween?: Tween): Tween;
        /**
        * @method egret.Tween#pause
        * @param tween {egret.Tween}
        * @returns {egret.Tween}
        */
        public pause(tween?: Tween): Tween;
        /**
        * @method egret.Tween#tick
        * @param delta {number}
        */
        public tick(delta: number): void;
    }
}
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
declare module egret {
    class Ease {
        constructor();
        static get(amount: any): Function;
        static getPowIn(pow: any): Function;
        static getPowOut(pow: any): Function;
        static getPowInOut(pow: any): Function;
        static quadIn: Function;
        static quadOut: Function;
        static quadInOut: Function;
        static cubicIn: Function;
        static cubicOut: Function;
        static cubicInOut: Function;
        static quartIn: Function;
        static quartOut: Function;
        static quartInOut: Function;
        static quintIn: Function;
        static quintOut: Function;
        static quintInOut: Function;
        static sineIn(t: any): number;
        static sineOut(t: any): number;
        static sineInOut(t: any): number;
        static getBackIn(amount: any): Function;
        static backIn: Function;
        static getBackOut(amount: any): Function;
        static backOut: Function;
        static getBackInOut(amount: any): Function;
        static backInOut: Function;
        static circIn(t: any): number;
        static circOut(t: any): number;
        static circInOut(t: any): number;
        static bounceIn(t: any): number;
        static bounceOut(t: any): number;
        static bounceInOut(t: any): number;
        static getElasticIn(amplitude: any, period: any): Function;
        static elasticIn: Function;
        static getElasticOut(amplitude: any, period: any): Function;
        static elasticOut: Function;
        static getElasticInOut(amplitude: any, period: any): Function;
        static elasticInOut: Function;
    }
}
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
declare module egret {
    /**
    * @class egret.Sound
    * @classdesc Sound 类允许您在应用程序中使用声音。
    */
    class Sound {
        static MUSIC: string;
        static EFFECT: string;
        public path: string;
        constructor();
        /**
        * audio音频对象
        * @member {any} egret.Sound#audio
        */
        private audio;
        public type: string;
        /**
        * 播放声音
        * @method egret.Sound#play
        * @param loop {boolean} 是否循环播放，默认为false
        */
        public play(loop?: boolean): void;
        /**
        * 暂停声音
        * @method egret.Sound#pause
        */
        public pause(): void;
        /**
        * 重新加载声音
        * @method egret.Sound#load
        */
        public load(): void;
        /**
        * 添加事件监听
        * @param type 事件类型
        * @param listener 监听函数
        */
        public addEventListener(type: string, listener: Function): void;
        /**
        * 移除事件监听
        * @param type 事件类型
        * @param listener 监听函数
        */
        public removeEventListener(type: string, listener: Function): void;
        /**
        * 设置音量
        * @param value 值需大于0 小于等于 1
        */
        public setVolume(value: number): void;
        /**
        * 获取当前音量值
        * @returns number
        */
        public getVolume(): number;
        public preload(type: string): void;
        public _setAudio(value: any): void;
    }
}
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
declare module egret {
    class NumberUtils {
        static isNumber(value: any): Boolean;
    }
}
/**
* Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
* to any person obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish, distribute,
* sublicense, and/or sell copies of the Software, and to permit persons to whom
* the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included
* in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
* INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
* PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
* FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
* ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
declare module RES {
    /**
    * @class RES.ResourceEvent
    * @classdesc
    * @extends egret.Event
    */
    class ResourceEvent extends egret.Event {
        /**
        * 一个加载项加载失败事件。
        * @constant {string} RES.ResourceEvent.ITEM_LOAD_ERROR
        */
        static ITEM_LOAD_ERROR: string;
        /**
        * 配置文件加载并解析完成事件
        * @constant {string} RES.ResourceEvent.CONFIG_COMPLETE
        */ 
        static CONFIG_COMPLETE: string;
        /**
        * 延迟加载组资源加载进度事件
        * @constant {string} RES.ResourceEvent.GROUP_PROGRESS
        */ 
        static GROUP_PROGRESS: string;
        /**
        * 延迟加载组资源加载完成事件
        * @constant {string} RES.ResourceEvent.GROUP_COMPLETE
        */ 
        static GROUP_COMPLETE: string;
        /**
        * 构造函数
        * @method RES.ResourceEvent#constructor
        * @param type {string}
        * @param bubbles {boolean}
        * @param cancelable {boolean}
        */ 
        constructor(type: string, bubbles?: boolean, cancelable?: boolean);
        /**
        * 已经加载的文件数
        * @member {number} RES.ResourceEvent#itemsLoaded
        */
        public itemsLoaded: number;
        /**
        * 要加载的总文件数
        * @member {number} RES.ResourceEvent#itemsTotal
        */
        public itemsTotal: number;
        /**
        * 资源组名
        * @member {string} RES.ResourceEvent#groupName
        */ 
        public groupName: string;
        /**
        * 一次加载项加载结束的项信息对象
        * @member {egret.ResourceItem} RES.ResourceEvent#resItem
        */ 
        public resItem: ResourceItem;
        /**
        * 使用指定的EventDispatcher对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
        * @method RES.ResourceEvent.dispatchResourceEvent
        * @param target {egret.IEventDispatcher}
        * @param type {string}
        * @param groupName {string}
        * @param resItem {egret.ResourceItem}
        * @param itemsLoaded {number}
        * @param itemsTotal {number}
        */
        static dispatchResourceEvent(target: egret.IEventDispatcher, type: string, groupName?: string, resItem?: ResourceItem, itemsLoaded?: number, itemsTotal?: number): void;
    }
}
/**
* Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
* to any person obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish, distribute,
* sublicense, and/or sell copies of the Software, and to permit persons to whom
* the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included
* in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
* INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
* PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
* FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
* ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
declare module RES {
    /**
    * @class RES.ResourceItem
    * @classdesc
    */
    class ResourceItem {
        /**
        * XML文件
        * @constant {string} RES.ResourceItem.TYPE_XML
        */ 
        static TYPE_XML: string;
        /**
        * 图片文件
        * @constant {string} RES.ResourceItem.TYPE_IMAGE
        */ 
        static TYPE_IMAGE: string;
        /**
        * 二进制流文件
        * @constant {string} RES.ResourceItem.TYPE_BIN
        */ 
        static TYPE_BIN: string;
        /**
        * 文本文件(解析为字符串)
        * @constant {string} RES.ResourceItem.TYPE_TEXT
        */ 
        static TYPE_TEXT: string;
        /**
        * JSON文件
        * @constant {string} RES.ResourceItem.TYPE_JSON
        */
        static TYPE_JSON: string;
        /**
        * SpriteSheet文件
        * @constant {string} RES.ResourceItem.TYPE_SHEET
        */
        static TYPE_SHEET: string;
        /**
        * BitmapTextSpriteSheet文件
        * @constant {string} RES.ResourceItem.TYPE_FONT
        */
        static TYPE_FONT: string;
        /**
        * 声音文件
        * @constant {string} RES.ResourceItem.TYPE_SOUND
        */
        static TYPE_SOUND: string;
        /**
        * 构造函数
        * @method RES.ResourceItem#constructor
        * @param name {string} 加载项名称
        * @param url {string} 要加载的文件地址
        * @param type {string} 加载项文件类型
        */
        constructor(name: string, url: string, type: string);
        /**
        * 加载项名称
        * @member {string} RES.ResourceItem#name
        */
        public name: string;
        /**
        * 要加载的文件地址
        * @member {string} RES.ResourceItem#url
        */
        public url: string;
        /**
        * 加载项文件类型
        * @member {string} RES.ResourceItem#type
        */
        public type: string;
        /**
        * 所属组名
        * @member {string} RES.ResourceItem#groupName
        */
        public groupName: string;
        /**
        * 被引用的原始数据对象
        * @member {any} RES.ResourceItem#data
        */ 
        public data: any;
        private _loaded;
        /**
        * 加载完成的标志
        * @member {boolean} RES.ResourceItem#loaded
        */
        public loaded : boolean;
        /**
        * @method RES.ResourceItem#toString
        * @returns {string}
        */
        public toString(): string;
    }
}
/**
* Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
* to any person obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish, distribute,
* sublicense, and/or sell copies of the Software, and to permit persons to whom
* the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included
* in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
* INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
* PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
* FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
* ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
declare module RES {
    /**
    * @class RES.ResourceConfig
    * @classdesc
    */
    class ResourceConfig {
        constructor();
        /**
        * 根据组名获取组加载项列表
        * @method RES.ResourceConfig#getGroupByName
        * @param name {string} 组名
        * @returns {Array<egret.ResourceItem>}
        */
        public getGroupByName(name: string): ResourceItem[];
        /**
        * 根据组名获取原始的组加载项列表
        * @method RES.ResourceConfig#getRawGroupByName
        * @param name {string} 组名
        * @returns {Array<any>}
        */
        public getRawGroupByName(name: string): any[];
        /**
        * 创建自定义的加载资源组,注意：此方法仅在资源配置文件加载完成后执行才有效。
        * 可以监听ResourceEvent.CONFIG_COMPLETE事件来确认配置加载完成。
        * @method RES.ResourceConfig#createGroup
        * @param name {string} 要创建的加载资源组的组名
        * @param keys {egret.Array<string>} 要包含的键名列表，key对应配置文件里的name属性或sbuKeys属性的一项或一个资源组名。
        * @param override {boolean} 是否覆盖已经存在的同名资源组,默认false。
        * @returns {boolean}
        */
        public createGroup(name: string, keys: string[], override?: boolean): boolean;
        /**
        * 一级键名字典
        */
        private keyMap;
        /**
        * 加载组字典
        */
        private groupDic;
        /**
        * 解析一个配置文件
        * @method RES.ResourceConfig#parseConfig
        * @param data {any} 配置文件数据
        * @param folder {string} 加载项的路径前缀。
        */
        public parseConfig(data: any, folder: string): void;
        /**
        * 添加一个加载项数据到列表
        */
        private addItemToKeyMap(item);
        /**
        * 获取加载项的name属性
        * @method RES.ResourceConfig#getType
        * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
        * @returns {string}
        */
        public getName(key: string): string;
        /**
        * 获取加载项类型。
        * @method RES.ResourceConfig#getType
        * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
        * @returns {string}
        */
        public getType(key: string): string;
        public getRawResourceItem(key: string): any;
        /**
        * 获取加载项信息对象
        * @method RES.ResourceConfig#getResourceItem
        * @param key {string} 对应配置文件里的key属性或sbuKeys属性的一项。
        * @returns {egret.ResourceItem}
        */
        public getResourceItem(key: string): ResourceItem;
        /**
        * 转换Object数据为ResourceItem对象
        */
        private parseResourceItem(data);
    }
}
/**
* Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
* to any person obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish, distribute,
* sublicense, and/or sell copies of the Software, and to permit persons to whom
* the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included
* in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
* INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
* PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
* FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
* ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
declare module RES {
    /**
    * @class RES.ResourceLoader
    * @classdesc
    * @extends egret.EventDispatcher
    */
    class ResourceLoader extends egret.EventDispatcher {
        /**
        * 构造函数
        * @method RES.ResourceLoader#constructor
        */
        constructor();
        /**
        * 最大并发加载数
        */
        public thread: number;
        /**
        * 正在加载的线程计数
        */
        private loadingCount;
        /**
        * 一项加载结束回调函数。无论加载成功或者出错都将执行回调函数。示例：callBack(resItem:ResourceItem):void;
        * @member {Function} RES.ResourceLoader#callBack
        */
        public callBack: Function;
        /**
        * RES单例的引用
        * @member {any} RES.ResourceLoader#resInstance
        */
        public resInstance: any;
        /**
        * 当前组加载的项总个数,key为groupName
        */ 
        private groupTotalDic;
        /**
        * 已经加载的项个数,key为groupName
        */ 
        private numLoadedDic;
        /**
        * 正在加载的组列表,key为groupName
        */ 
        private itemListDic;
        /**
        * 优先级队列,key为priority，value为groupName列表
        */ 
        private priorityQueue;
        /**
        * 检查指定的组是否正在加载中
        * @method RES.ResourceLoader#isGroupInLoading
        * @param groupName {string}
        * @returns {boolean}
        */ 
        public isGroupInLoading(groupName: string): boolean;
        /**
        * 开始加载一组文件
        * @method RES.ResourceLoader#loadGroup
        * @param list {egret.Array<ResourceItem>} 加载项列表
        * @param groupName {string} 组名
        * @param priority {number} 加载优先级
        */ 
        public loadGroup(list: ResourceItem[], groupName: string, priority?: number): void;
        /**
        * 延迟加载队列
        */ 
        private lazyLoadList;
        /**
        * 加载一个文件
        * @method RES.ResourceLoader#loadItem
        * @param resItem {egret.ResourceItem} 要加载的项
        */ 
        public loadItem(resItem: ResourceItem): void;
        /**
        * 资源解析库字典类
        */ 
        private analyzerDic;
        /**
        * 加载下一项
        */ 
        private next();
        /**
        * 当前应该加载同优先级队列的第几列
        */ 
        private queueIndex;
        /**
        * 获取下一个待加载项
        */ 
        private getOneResourceItem();
        /**
        * 加载结束
        */ 
        private onItemComplete(resItem);
        /**
        * 从优先级队列中移除指定的组名
        */ 
        private removeGroupName(groupName);
    }
}
/**
* Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
* to any person obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish, distribute,
* sublicense, and/or sell copies of the Software, and to permit persons to whom
* the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included
* in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
* INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
* PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
* FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
* ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
declare module RES {
    class AnalyzerBase extends egret.HashObject {
        constructor();
        /**
        * 加载一个资源文件
        * @param resItem 加载项信息
        * @param compFunc 加载完成回调函数,示例:compFunc(resItem:ResourceItem):void;
        * @param thisObject 加载完成回调函数的this引用
        */
        public loadFile(resItem: ResourceItem, compFunc: Function, thisObject: any): void;
        /**
        * 同步方式获取解析完成的数据
        * @param name 对应配置文件里的name属性。
        */
        public getRes(name: string): any;
        /**
        * 销毁某个资源文件的二进制数据,返回是否删除成功。
        * @param name 配置文件中加载项的name属性
        */
        public destroyRes(name: string): boolean;
        /**
        * 读取一个字符串里第一个点之前的内容。
        * @param name {string} 要读取的字符串
        */
        static getStringPrefix(name: string): string;
        /**
        * 读取一个字符串里第一个点之后的内容。
        * @param name {string} 要读取的字符串
        */
        static getStringTail(name: string): string;
    }
}
/**
* Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
* to any person obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish, distribute,
* sublicense, and/or sell copies of the Software, and to permit persons to whom
* the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included
* in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
* INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
* PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
* FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
* ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
declare module RES {
    class BinAnalyzer extends AnalyzerBase {
        /**
        * 构造函数
        */ 
        constructor();
        /**
        * 字节流数据缓存字典
        */ 
        public fileDic: any;
        /**
        * 加载项字典
        */ 
        public resItemDic: any[];
        /**
        * @inheritDoc
        */
        public loadFile(resItem: ResourceItem, compFunc: Function, thisObject: any): void;
        public _dataFormat: string;
        /**
        * URLLoader对象池
        */ 
        public recycler: egret.Recycler;
        /**
        * 获取一个URLLoader对象
        */ 
        private getLoader();
        /**
        * 一项加载结束
        */ 
        public onLoadFinish(event: egret.Event): void;
        /**
        * 解析并缓存加载成功的数据
        */
        public analyzeData(resItem: ResourceItem, data: any): void;
        /**
        * @inheritDoc
        */
        public getRes(name: string): any;
        /**
        * @inheritDoc
        */
        public hasRes(name: string): boolean;
        /**
        * @inheritDoc
        */
        public destroyRes(name: string): boolean;
    }
}
/**
* Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
* to any person obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish, distribute,
* sublicense, and/or sell copies of the Software, and to permit persons to whom
* the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included
* in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
* INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
* PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
* FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
* ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
declare module RES {
    class ImageAnalyzer extends BinAnalyzer {
        constructor();
        /**
        * 解析并缓存加载成功的数据
        */
        public analyzeData(resItem: ResourceItem, data: any): void;
    }
}
/**
* Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
* to any person obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish, distribute,
* sublicense, and/or sell copies of the Software, and to permit persons to whom
* the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included
* in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
* INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
* PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
* FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
* ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
declare module RES {
    class JsonAnalyzer extends BinAnalyzer {
        constructor();
        /**
        * 解析并缓存加载成功的数据
        */
        public analyzeData(resItem: ResourceItem, data: any): void;
    }
}
/**
* Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
* to any person obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish, distribute,
* sublicense, and/or sell copies of the Software, and to permit persons to whom
* the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included
* in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
* INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
* PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
* FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
* ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
declare module RES {
    class TextAnalyzer extends BinAnalyzer {
        constructor();
    }
}
/**
* Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
* to any person obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish, distribute,
* sublicense, and/or sell copies of the Software, and to permit persons to whom
* the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included
* in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
* INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
* PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
* FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
* ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
declare module RES {
    /**
    * SpriteSheet解析器
    */
    class SheetAnalyzer extends BinAnalyzer {
        constructor();
        /**
        * @inheritDoc
        */
        public getRes(name: string): any;
        /**
        * 一项加载结束
        */
        public onLoadFinish(event: egret.Event): void;
        public sheetMap: any;
        private textureMap;
        /**
        * 解析并缓存加载成功的数据
        */
        public analyzeData(resItem: ResourceItem, data: any): void;
        private getRelativePath(url, file);
        public parseSpriteSheet(texture: egret.Texture, data: any): egret.SpriteSheet;
    }
}
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
declare module RES {
    class FontAnalyzer extends SheetAnalyzer {
        constructor();
        /**
        * 解析并缓存加载成功的数据
        */
        public analyzeData(resItem: ResourceItem, data: any): void;
        private getTexturePath(url, fntText);
    }
}
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
declare module RES {
    class SoundAnalyzer extends BinAnalyzer {
        constructor();
        public analyzeData(resItem: ResourceItem, data: any): void;
    }
}
/**
* Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
* to any person obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish, distribute,
* sublicense, and/or sell copies of the Software, and to permit persons to whom
* the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included
* in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
* INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
* PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
* FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
* ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
declare module RES {
    class XMLAnalyzer extends BinAnalyzer {
        constructor();
        /**
        * 解析并缓存加载成功的数据
        */
        public analyzeData(resItem: ResourceItem, data: any): void;
    }
}
/**
* Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
* to any person obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish, distribute,
* sublicense, and/or sell copies of the Software, and to permit persons to whom
* the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included
* in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
* INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
* PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
* FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
* ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
declare module RES {
    /**
    * 加载配置文件并解析
    * @method RES.loadConfig
    * @param url {string} 配置文件路径(resource.json的路径)
    * @param resourceRoot {string} 资源根路径。配置中的所有url都是这个路径的相对值。最终url是这个字符串与配置里资源项的url相加的值。
    * @param type {string} 配置文件的格式。确定要用什么解析器来解析配置文件。默认"json"
    */
    function loadConfig(url: string, resourceRoot?: string, type?: string): void;
    /**
    * 根据组名加载一组资源
    * @method RES.loadGroup
    * @param name {string} 要加载资源组的组名
    * @param priority {number} 加载优先级,可以为负数,默认值为0。
    * 低优先级的组必须等待高优先级组完全加载结束才能开始，同一优先级的组会同时加载。
    */
    function loadGroup(name: string, priority?: number): void;
    /**
    * 检查某个资源组是否已经加载完成
    * @method RES.isGroupLoaded
    * @param name {string} 组名
    * @returns {boolean}
    */
    function isGroupLoaded(name: string): boolean;
    /**
    * 根据组名获取组加载项列表
    * @method RES.getGroupByName
    * @param name {string} 组名
    * @returns {egret.ResourceItem}
    */
    function getGroupByName(name: string): ResourceItem[];
    /**
    * 创建自定义的加载资源组,注意：此方法仅在资源配置文件加载完成后执行才有效。
    * 可以监听ResourceEvent.CONFIG_COMPLETE事件来确认配置加载完成。
    * @method RES.createGroup
    * @param name {string} 要创建的加载资源组的组名
    * @param keys {egret.Array<string>} 要包含的键名列表，key对应配置文件里的name属性或sbuKeys属性的一项或一个资源组名。
    * @param override {boolean} 是否覆盖已经存在的同名资源组,默认false。
    * @returns {boolean}
    */
    function createGroup(name: string, keys: string[], override?: boolean): boolean;
    /**
    * 检查配置文件里是否含有指定的资源
    * @method RES.hasRes
    * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
    * @returns {boolean}
    */
    function hasRes(key: string): boolean;
    /**
    * 同步方式获取缓存的已经加载成功的资源。<br/>
    * @method RES.getRes
    * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
    * @returns {any}
    */
    function getRes(key: string): any;
    /**
    * 异步方式获取配置里的资源。只要是配置文件里存在的资源，都可以通过异步方式获取。
    * @method RES.getResAsync
    * @param key {string} 对应配置文件里的name属性或sbuKeys属性的一项。
    * @param compFunc {Function} 回调函数。示例：compFunc(data,key):void。
    * @param thisObject {any} 回调函数的this引用
    */
    function getResAsync(key: string, compFunc: Function, thisObject: any): void;
    /**
    * 通过完整URL方式获取外部资源。
    * @method RES.getResByUrl
    * @param url {string} 要加载文件的外部路径。
    * @param compFunc {Function} 回调函数。示例：compFunc(data,url):void。
    * @param thisObject {any} 回调函数的this引用
    * @param type {string} 文件类型(可选)。请使用ResourceItem类中定义的静态常量。若不设置将根据文件扩展名生成。
    */
    function getResByUrl(url: string, compFunc: Function, thisObject: any, type?: string): void;
    /**
    * 销毁单个资源文件或一组资源的缓存数据,返回是否删除成功。
    * @method RES.destroyRes
    * @param name {string} 配置文件中加载项的name属性或资源组名
    * @returns {boolean}
    */
    function destroyRes(name: string): boolean;
    /**
    * 设置最大并发加载线程数量，默认值是2.
    * @method RES.setMaxLoadingThread
    * @param thread {number} 要设置的并发加载数。
    */
    function setMaxLoadingThread(thread: number): void;
    /**
    * 添加事件侦听器,参考ResourceEvent定义的常量。
    * @method RES.addEventListener
    * @param type {string} 事件的类型。
    * @param listener {Function} 处理事件的侦听器函数。此函数必须接受 Event 对象作为其唯一的参数，并且不能返回任何结果，
    * 如下面的示例所示： function(evt:Event):void 函数可以有任何名称。
    * @param thisObject {any} 侦听函数绑定的this对象
    * @param useCapture {boolean} 确定侦听器是运行于捕获阶段还是运行于目标和冒泡阶段。如果将 useCapture 设置为 true，
    * 则侦听器只在捕获阶段处理事件，而不在目标或冒泡阶段处理事件。如果 useCapture 为 false，则侦听器只在目标或冒泡阶段处理事件。
    * 要在所有三个阶段都侦听事件，请调用 addEventListener 两次：一次将 useCapture 设置为 true，一次将 useCapture 设置为 false。
    * @param priority {number} 事件侦听器的优先级。优先级由一个带符号的 32 位整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在
    * 优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
    */
    function addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void;
    /**
    * 移除事件侦听器,参考ResourceEvent定义的常量。
    * @method RES.removeEventListener
    * @param type {string} 事件名
    * @param listener {Function} 侦听函数
    * @param thisObject {any} 侦听函数绑定的this对象
    * @param useCapture {boolean} 是否使用捕获，这个属性只在显示列表中生效。
    */
    function removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean): void;
}
