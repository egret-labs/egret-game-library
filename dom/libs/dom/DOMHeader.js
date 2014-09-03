var egret;
(function (egret) {
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
    (function (dom) {
        dom._header = "0";

        dom._hasTransform = false;
        dom._has3d = false;
        dom._hasTransitionEnd = false;

        function _initTrans() {
            var tempStyle = document.createElement('div').style;
            dom._header = _getHeader(tempStyle);

            dom._hasTransform = _getTrans("transform") in tempStyle;
            dom._has3d = _getTrans("perspective") in tempStyle;
            dom._hasTransitionEnd = _getTrans("transition") in tempStyle;
        }
        dom._initTrans = _initTrans;

        /**
        * 获取当前浏览器的类型
        * @returns {string}
        */
        function _getHeader(tempStyle) {
            if ("transform" in tempStyle) {
                return "";
            }

            var transArr = ["webkit", "ms", "Moz", "O"];
            for (var i = 0; i < transArr.length; i++) {
                var transform = transArr[i] + 'Transform';
                if (transform in tempStyle)
                    return transArr[i];
            }

            return "";
        }
        dom._getHeader = _getHeader;

        /**
        * 获取当前浏览器类型
        * @type {string}
        */
        function _getTrans(type) {
            if (dom._header == "")
                return type;

            return dom._header + type.charAt(0).toUpperCase() + type.substr(1);
        }
        dom._getTrans = _getTrans;
    })(egret.dom || (egret.dom = {}));
    var dom = egret.dom;
})(egret || (egret = {}));
