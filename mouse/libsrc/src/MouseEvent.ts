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

namespace mouse {
    export class MouseEvent {
        /**
         * @language en_US
         * When the user mouse movements are called.
         * @version Egret 3.1.0
         * @platform Web
         */
        /**
         * @language zh_CN
         * 当用户鼠标移动时被调用。
         * @version Egret 3.1.0
         * @platform Web
         */
        public static MOUSE_MOVE:string = "mouseMove";
        
         /**
         * @language en_US
         * Called when the mouse is within the area where the object (not covered by other object).
         * @version Egret 3.1.0
         * @platform Web
         */
        /**
         * @language zh_CN
         * 当鼠标正在对象所在区域内（没有被其他对象覆盖）时调用。
         * @version Egret 3.1.0
         * @platform Web
         */
        public static MOUSE_OVER:string = "mouseOver";
        
        /**
         * @language en_US
         * Called when the mouse out of the object within the Area.
         * @version Egret 3.1.0
         * @platform Web
         */
        /**
         * @language zh_CN
         * 当鼠标移出对象所在区域内时调用。
         * @version Egret 3.1.0
         * @platform Web
         */
        public static MOUSE_OUT:string = "mouseOut";
        
        /**
         * @language en_US
         * When the mouse enters an object within the Area calls.
         * @version Egret 3.1.0
         * @platform Web
         */
        /**
         * @language zh_CN
         * 当鼠标进入对象所在区域内调用。
         * @version Egret 3.1.0
         * @platform Web
         */
        public static ROLL_OVER:string = "rollOver";
        
        /**
         * @language en_US
         * Called when the mouse out of the object within the Area.
         * @version Egret 3.1.0
         * @platform Web
         */
        /**
         * @language zh_CN
         * 当鼠标移出对象所在区域内时调用。
         * @version Egret 3.1.0
         * @platform Web
         */
        public static ROLL_OUT:string = "rollOut";

        /**
         * @language en_US
         * Called when the mouse wheel scrolls.
         * @version Egret 5.1.0
         * @platform Web
         */
        /**
         * @language zh_CN
         * 当鼠标滚轮滚动时调用。
         * @version Egret 5.1.0
         * @platform Web
         */
        public static MOUSE_WHEEL:string = "mouseWheel";
    }
}