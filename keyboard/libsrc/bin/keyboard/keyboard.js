var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var KeyBoard = (function (_super) {
    __extends(KeyBoard, _super);
    function KeyBoard() {
        var _this = _super.call(this) || this;
        _this.inputs = [];
        _this.keyValue = {
            "27": KeyBoard.Esc,
            "112": KeyBoard.F1,
            "113": KeyBoard.F2,
            "114": KeyBoard.F3,
            "115": KeyBoard.F4,
            "116": KeyBoard.F5,
            "117": KeyBoard.F6,
            "118": KeyBoard.F7,
            "119": KeyBoard.F8,
            "120": KeyBoard.F9,
            "121": KeyBoard.F10,
            "122": KeyBoard.F11,
            "123": KeyBoard.F12,
            "42": KeyBoard.PrintScreen,
            "145": KeyBoard.ScrollLock,
            "19": KeyBoard.PauseBreak,
            "192": KeyBoard.key_Points,
            "49": KeyBoard.key_1,
            "50": KeyBoard.key_2,
            "51": KeyBoard.key_3,
            "52": KeyBoard.key_4,
            "53": KeyBoard.key_5,
            "54": KeyBoard.key_6,
            "55": KeyBoard.key_7,
            "56": KeyBoard.key_8,
            "57": KeyBoard.key_9,
            "48": KeyBoard.key_0,
            "189": KeyBoard.key_Sub,
            "187": KeyBoard.key_Plus,
            "8": KeyBoard.Backspace,
            "45": KeyBoard.Insert,
            "36": KeyBoard.Home,
            "33": KeyBoard.PageUp,
            "144": KeyBoard.NumLock,
            "111": KeyBoard.Num_Slash,
            "106": KeyBoard.Num_Mul,
            "109": KeyBoard.Num_Sub,
            "9": KeyBoard.Tab,
            "81": KeyBoard.Q,
            "87": KeyBoard.W,
            "69": KeyBoard.E,
            "82": KeyBoard.R,
            "84": KeyBoard.T,
            "89": KeyBoard.Y,
            "85": KeyBoard.U,
            "73": KeyBoard.I,
            "79": KeyBoard.O,
            "80": KeyBoard.P,
            "219": KeyBoard.brace1,
            "221": KeyBoard.brace2,
            "13": KeyBoard.CnterEnter,
            "46": KeyBoard.Delete,
            "35": KeyBoard.End,
            "34": KeyBoard.PageDown,
            "103": KeyBoard.Num_7,
            "104": KeyBoard.Num_8,
            "105": KeyBoard.Num_9,
            "107": KeyBoard.Num_Plus,
            "20": KeyBoard.CapsLock,
            "65": KeyBoard.A,
            "83": KeyBoard.S,
            "68": KeyBoard.D,
            "70": KeyBoard.F,
            "71": KeyBoard.G,
            "72": KeyBoard.H,
            "74": KeyBoard.J,
            "75": KeyBoard.K,
            "76": KeyBoard.L,
            "186": KeyBoard.semicolon,
            "222": KeyBoard.quotes,
            "220": KeyBoard.bar,
            "100": KeyBoard.Num_4,
            "101": KeyBoard.Num_5,
            "102": KeyBoard.Num_6,
            "16": KeyBoard.key_Shift,
            "90": KeyBoard.Z,
            "88": KeyBoard.X,
            "67": KeyBoard.C,
            "86": KeyBoard.V,
            "66": KeyBoard.B,
            "78": KeyBoard.N,
            "77": KeyBoard.M,
            "188": KeyBoard.key_Semicolon,
            "190": KeyBoard.key_Dot,
            "191": KeyBoard.question,
            "38": KeyBoard.UpArrow,
            "97": KeyBoard.Num_1,
            "98": KeyBoard.Num_2,
            "99": KeyBoard.Num_3,
            // "13" : KeyBoard.Num_Enter,
            "17": KeyBoard.left_Ctrl,
            "91": KeyBoard.Left_Win,
            "18": KeyBoard.key_Alt,
            "32": KeyBoard.SPACE,
            "92": KeyBoard.RIGHT_WIN,
            "93": KeyBoard.NoteSign,
            "37": KeyBoard.keyArrow,
            "40": KeyBoard.DownArrow,
            "39": KeyBoard.RightArrow,
            "96": KeyBoard.Num_0,
            "110": KeyBoard.Num_dot
        };
        _this.init();
        return _this;
    }
    KeyBoard.prototype.init = function () {
        var self = this;
        document.onkeydown = function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            self.handlekeydown(e);
            if (self.inputs.length > 0) {
                //console.log(self.inputs.length)
                self.dispatchEventWith(KeyBoard.onkeydown, true, self.inputs, true);
            }
        };
        document.onkeyup = function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            self.handlekeyup(e);
            if (self.inputs.length > 0) {
                self.dispatchEventWith(KeyBoard.onkeyup, true, self.inputs, true);
            }
        };
        document.onmousedown = function (event) {
            self.inputs = [];
        };
    };
    //处理键盘按下对应keycode
    KeyBoard.prototype.handlekeydown = function (e) {
        for (var item in this.keyValue) {
            if (parseInt(item) == e.keyCode) {
                this.checkInput(this.keyValue[item]);
            }
        }
    };
    //处理键盘抬起对应keycode
    KeyBoard.prototype.handlekeyup = function (e) {
        for (var item in this.keyValue) {
            if (parseInt(item) == e.keyCode) {
                this.removeByKey(this.keyValue[item]);
            }
        }
    };
    //通过key添加
    KeyBoard.prototype.checkInput = function (key) {
        var isContain = false;
        for (var i = 0; i < this.inputs.length; i++) {
            if (this.inputs[i] == key) {
                isContain = true;
            }
        }
        if (!isContain) {
            this.inputs.push(key);
        }
    };
    //通过key删除
    KeyBoard.prototype.removeByKey = function (key) {
        for (var i = 0; i < this.inputs.length; i++) {
            if (this.inputs[i] == key) {
                this.inputs.splice(i, 1);
            }
        }
    };
    /**
     * 判断data字符串数组中是否包含某个字符串
     */
    KeyBoard.prototype.isContain = function (data, keyCode) {
        var isContain = false;
        for (var i = 0; i < data.length; i++) {
            if (data[i] == keyCode) {
                isContain = true;
            }
        }
        return isContain;
    };
    /**
     * 同一时刻按下多个键：则返回多个键的字符串数组。
     */
    KeyBoard.onkeydown = "KeyBoardonkeydown";
    KeyBoard.onkeyup = "KeyBoardonkeyup";
    KeyBoard.NumLock = "NumLock";
    KeyBoard.Num_Slash = "num_/";
    KeyBoard.Num_Mul = "num_*";
    KeyBoard.Num_Sub = "num_-";
    KeyBoard.Num_7 = "num_7";
    KeyBoard.Num_8 = "num_8";
    KeyBoard.Num_9 = "num_9";
    KeyBoard.Num_Plus = "num_+";
    KeyBoard.Num_4 = "num_4";
    KeyBoard.Num_5 = "num_5";
    KeyBoard.Num_6 = "num_6";
    KeyBoard.Num_1 = "num_1";
    KeyBoard.Num_2 = "num_2";
    KeyBoard.Num_3 = "num_3";
    KeyBoard.Num_Enter = "num_Enter";
    KeyBoard.Num_0 = "num_0";
    KeyBoard.Num_dot = "num_.";
    //第一行
    KeyBoard.Esc = "Esc"; //27
    KeyBoard.F1 = "F1";
    KeyBoard.F2 = "F2";
    KeyBoard.F3 = "F3";
    KeyBoard.F4 = "F4";
    KeyBoard.F5 = "F5";
    KeyBoard.F6 = "F6";
    KeyBoard.F7 = "F7";
    KeyBoard.F8 = "F8";
    KeyBoard.F9 = "F9";
    KeyBoard.F10 = "F10";
    KeyBoard.F11 = "F11";
    KeyBoard.F12 = "F12";
    KeyBoard.PrintScreen = "PrintScreen";
    KeyBoard.ScrollLock = "ScrollLock";
    KeyBoard.PauseBreak = "PauseBreak";
    //第二行
    KeyBoard.key_Points = "`";
    KeyBoard.key_1 = "1";
    KeyBoard.key_2 = "2";
    KeyBoard.key_3 = "3";
    KeyBoard.key_4 = "4";
    KeyBoard.key_5 = "5";
    KeyBoard.key_6 = "6";
    KeyBoard.key_7 = "7";
    KeyBoard.key_8 = "8";
    KeyBoard.key_9 = "9";
    KeyBoard.key_0 = "0";
    KeyBoard.key_Sub = "-";
    KeyBoard.key_Plus = "=";
    KeyBoard.Backspace = "Backspace";
    KeyBoard.Insert = "Insert";
    KeyBoard.Home = "Home";
    KeyBoard.PageUp = "PageUp";
    //第三行
    KeyBoard.Tab = "Tab";
    KeyBoard.Q = "Q";
    KeyBoard.W = "W";
    KeyBoard.E = "E";
    KeyBoard.R = "R";
    KeyBoard.T = "T";
    KeyBoard.Y = "Y";
    KeyBoard.U = "U";
    KeyBoard.I = "I";
    KeyBoard.O = "O";
    KeyBoard.P = "P";
    KeyBoard.brace1 = "[";
    KeyBoard.brace2 = "]";
    KeyBoard.CnterEnter = "Enter";
    KeyBoard.Delete = "Delete";
    KeyBoard.End = "End";
    KeyBoard.PageDown = "PageDown";
    //第四行
    KeyBoard.CapsLock = "CapsLock";
    KeyBoard.A = "A";
    KeyBoard.S = "S";
    KeyBoard.D = "D";
    KeyBoard.F = "F";
    KeyBoard.G = "G";
    KeyBoard.H = "H";
    KeyBoard.J = "J";
    KeyBoard.K = "K";
    KeyBoard.L = "L";
    KeyBoard.semicolon = ";";
    KeyBoard.quotes = ",";
    KeyBoard.bar = "|";
    //第五行
    KeyBoard.key_Shift = "Shift";
    KeyBoard.Z = "Z";
    KeyBoard.X = "X";
    KeyBoard.C = "C";
    KeyBoard.V = "V";
    KeyBoard.B = "B";
    KeyBoard.N = "N";
    KeyBoard.M = "M";
    KeyBoard.key_Semicolon = ",";
    KeyBoard.key_Dot = ".";
    KeyBoard.question = "/";
    KeyBoard.Right_Shift = "Shift";
    KeyBoard.UpArrow = "up";
    //第六行
    KeyBoard.left_Ctrl = "Ctrl";
    KeyBoard.Left_Win = "left_win";
    KeyBoard.key_Alt = "Alt";
    KeyBoard.SPACE = "SPACE";
    KeyBoard.RIGH_Alt = "RIGH_Alt";
    KeyBoard.RIGHT_WIN = "right_win";
    KeyBoard.NoteSign = "NoteSign";
    KeyBoard.RIGHT_Ctrl = "Ctrl";
    KeyBoard.keyArrow = "left";
    KeyBoard.DownArrow = "down";
    KeyBoard.RightArrow = "right";
    return KeyBoard;
}(egret.EventDispatcher));
__reflect(KeyBoard.prototype, "KeyBoard");
