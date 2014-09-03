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
var egret;
(function (egret) {
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
    var XML = (function () {
        function XML() {
        }
        /**
        * 解析一个XML字符串为JSON对象。
        * @method egret.XML.parse
        * @param value {string} 要解析的XML字符串。
        * @returns {any}
        */
        XML.parse = function (value) {
            var xmlDoc = egret.SAXParser.getInstance().parserXML(value);
            if (!xmlDoc || !xmlDoc.childNodes) {
                return null;
            }
            var length = xmlDoc.childNodes.length;
            var found = false;
            for (var i = 0; i < length; i++) {
                var node = xmlDoc.childNodes[i];
                if (node.nodeType == 1) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                return null;
            }
            var xml = XML.parseNode(node);
            return xml;
        };

        XML.parseNode = function (node) {
            if (!node || node.nodeType != 1) {
                return null;
            }
            var xml = {};
            xml.localName = node.localName;
            xml.name = node.nodeName;
            if (node.namespaceURI)
                xml.namespace = node.namespaceURI;
            if (node.prefix)
                xml.prefix = node.prefix;
            var attributes = node.attributes;
            var length = attributes.length;
            for (var i = 0; i < length; i++) {
                var attrib = attributes[i];
                var key = attrib.name;
                if (key.indexOf("xmlns:") == 0) {
                    continue;
                }
                xml["$" + key] = attrib.value;
            }
            var children = node.childNodes;
            length = children.length;
            for (i = 0; i < length; i++) {
                var childNode = children[i];
                var childXML = XML.parseNode(childNode);
                if (childXML) {
                    if (!xml.children) {
                        xml.children = [];
                    }
                    childXML.parent = xml;
                    xml.children.push(childXML);
                }
            }
            if (!xml.children) {
                var text = node.textContent.trim();
                if (text) {
                    xml.text = text;
                }
            }
            return xml;
        };

        /**
        * 查找xml上符合节点路径的所有子节点。
        * @method egret.XML.findChildren
        * @param xml {any} 要查找的XML节点。
        * @param path {string} 子节点路径，例如"item.node"
        * @param result {egret.Array<any>} 可选参数，传入一个数组用于存储查找的结果。这样做能避免重复创建对象。
        * @returns {any}
        */
        XML.findChildren = function (xml, path, result) {
            if (!result) {
                result = [];
            } else {
                result.length = 0;
            }
            XML.findByPath(xml, path, result);
            return result;
        };

        /**
        * @method egret.XML.findByPath
        * @param xml {any}
        * @param path {string}
        * @param result {egret.Array<any>}
        */
        XML.findByPath = function (xml, path, result) {
            var index = path.indexOf(".");
            var key;
            var end;
            if (index == -1) {
                key = path;
                end = true;
            } else {
                key = path.substring(0, index);
                path = path.substring(index + 1);
                end = false;
            }
            var children = xml.children;
            if (!children) {
                return;
            }
            var length = children.length;
            for (var i = 0; i < length; i++) {
                var child = children[i];
                if (child.localName == key) {
                    if (end) {
                        result.push(child);
                    } else {
                        XML.findByPath(child, path, result);
                    }
                }
            }
        };

        /**
        * 获取一个XML节点上的所有属性名列表
        * @method egret.XML.getAttributes
        * @param xml {any} 要查找的XML节点。
        * @param result {egret.Array<any>} 可选参数，传入一个数组用于存储查找的结果。这样做能避免重复创建对象。
        * @returns {string}
        */
        XML.getAttributes = function (xml, result) {
            if (!result) {
                result = [];
            } else {
                result.length = 0;
            }
            for (var key in xml) {
                if (key.charAt(0) == "$") {
                    result.push(key.substring(1));
                }
            }
            return result;
        };
        return XML;
    })();
    egret.XML = XML;
    XML.prototype.__class__ = "egret.XML";
})(egret || (egret = {}));
