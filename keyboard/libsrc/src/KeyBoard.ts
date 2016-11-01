class KeyBoard extends egret.EventDispatcher{
	private inputs = [];
	/**
	 * 同一时刻按下多个键：则返回多个键的字符串数组。
	 */
	public static onkeydown = "KeyBoardonkeydown";
	public static onkeyup = "KeyBoardonkeyup";

	public static NumLock = "NumLock";
	public static Num_Slash = "num_/";
	public static Num_Mul = "num_*";
	public static Num_Sub = "num_-";
	public static Num_7 = "num_7";
	public static Num_8 = "num_8";
	public static Num_9 = "num_9";
	public static Num_Plus = "num_+";
	public static Num_4 = "num_4";
	public static Num_5 = "num_5";
	public static Num_6 = "num_6";
	public static Num_1 = "num_1";
	public static Num_2 = "num_2";
	public static Num_3 = "num_3";
	public static Num_Enter = "num_Enter";
	public static Num_0 = "num_0";
	public static Num_dot = "num_.";

	//第一行
	public static Esc = "Esc";//27
	public static F1 = "F1";
	public static F2 = "F2";
	public static F3 = "F3";
	public static F4 = "F4";
	public static F5 = "F5";
	public static F6 = "F6";
	public static F7 = "F7";
	public static F8 = "F8";
	public static F9 = "F9";
	public static F10 = "F10";
	public static F11 = "F11";
	public static F12 = "F12";
	public static PrintScreen = "PrintScreen";
	public static ScrollLock = "ScrollLock";
	public static PauseBreak = "PauseBreak";
	//第二行
	public static key_Points = "`";
	public static key_1 = "1";
	public static key_2 = "2";
	public static key_3 = "3";
	public static key_4 = "4";
	public static key_5 = "5";
	public static key_6 = "6";
	public static key_7 = "7";
	public static key_8 = "8";
	public static key_9 = "9";
	public static key_0 = "0";
	public static key_Sub = "-";
	public static key_Plus = "=";
	public static Backspace = "Backspace";
	public static Insert = "Insert";
	public static Home = "Home";
	public static PageUp = "PageUp";

	//第三行
	public static Tab= "Tab";
	public static Q = "Q";
	public static W = "W";
	public static E = "E";
	public static R = "R";
	public static T = "T";
	public static Y = "Y";
	public static U = "U";
	public static I = "I";
	public static O = "O";
	public static P = "P";
	public static brace1 = "[";
	public static brace2 = "]";
	public static CnterEnter = "Enter";
	public static Delete = "Delete";
	public static End = "End";
	public static PageDown = "PageDown";

	//第四行
	public static CapsLock= "CapsLock";
	public static A = "A";
	public static S = "S";
	public static D = "D";
	public static F = "F";
	public static G = "G";
	public static H = "H";
	public static J = "J";
	public static K = "K";
	public static L = "L";
	public static semicolon = ";";
	public static quotes = ",";
	public static bar = "|";

	//第五行
	public static key_Shift= "Shift";
	public static Z = "Z";
	public static X = "X";
	public static C = "C";
	public static V = "V";
	public static B = "B";
	public static N = "N";
	public static M = "M";
	public static key_Semicolon = ",";
	public static key_Dot = ".";
	public static question = "/";
	public static Right_Shift = "Shift";
	public static UpArrow = "up";

	//第六行
	public static left_Ctrl= "Ctrl";
	public static Left_Win = "left_win";
	public static key_Alt = "Alt";
	public static SPACE = "SPACE";
	public static RIGH_Alt= "RIGH_Alt";
	public static RIGHT_WIN = "right_win";
	public static NoteSign = "NoteSign";
	public static RIGHT_Ctrl = "Ctrl";
	public static keyArrow = "left";
	public static DownArrow = "down";
	public static RightArrow = "right";



	private keyValue = {
		"27" : KeyBoard.Esc,
		"112" : KeyBoard.F1,
		"113" : KeyBoard.F2,
		"114" : KeyBoard.F3,
		"115" : KeyBoard.F4,
		"116" : KeyBoard.F5,
		"117" : KeyBoard.F6,
		"118" : KeyBoard.F7,
		"119" : KeyBoard.F8,
		"120" : KeyBoard.F9,
		"121" : KeyBoard.F10,
		"122" : KeyBoard.F11,
		"123" : KeyBoard.F12,
		"42" : KeyBoard.PrintScreen,
		"145" : KeyBoard.ScrollLock,
		"19" : KeyBoard.PauseBreak,

		"192" : KeyBoard.key_Points,
		"49" : KeyBoard.key_1,
		"50" : KeyBoard.key_2,
		"51" : KeyBoard.key_3,
		"52" : KeyBoard.key_4,
		"53" : KeyBoard.key_5,
		"54" : KeyBoard.key_6,
		"55" : KeyBoard.key_7,
		"56" : KeyBoard.key_8,
		"57" : KeyBoard.key_9,
		"48" : KeyBoard.key_0,
		"189" : KeyBoard.key_Sub,
		"187" : KeyBoard.key_Plus,
		"8" : KeyBoard.Backspace,
		"45" : KeyBoard.Insert,
		"36" : KeyBoard.Home,
		"33" : KeyBoard.PageUp,
		"144" : KeyBoard.NumLock,
		"111" : KeyBoard.Num_Slash,
		"106" : KeyBoard.Num_Mul,
		"109" : KeyBoard.Num_Sub,

		"9" : KeyBoard.Tab,
		"81" : KeyBoard.Q,
		"87" : KeyBoard.W,
		"69" : KeyBoard.E,
		"82" : KeyBoard.R,
		"84" : KeyBoard.T,
		"89" : KeyBoard.Y,
		"85" : KeyBoard.U,
		"73" : KeyBoard.I,
		"79" : KeyBoard.O,
		"80" : KeyBoard.P,
		"219" : KeyBoard.brace1,
		"221" : KeyBoard.brace2,
		"13" : KeyBoard.CnterEnter,// "13" : KeyBoard.Num_Enter,
		"46" : KeyBoard.Delete,
		"35" : KeyBoard.End,
		"34" : KeyBoard.PageDown,
		"103" : KeyBoard.Num_7,
		"104" : KeyBoard.Num_8,
		"105" : KeyBoard.Num_9,
		"107" : KeyBoard.Num_Plus,
		
		"20" : KeyBoard.CapsLock,
		"65" : KeyBoard.A,
		"83" : KeyBoard.S,
		"68" : KeyBoard.D,
		"70" : KeyBoard.F,
		"71" : KeyBoard.G,
		"72" : KeyBoard.H,
		"74" : KeyBoard.J,
		"75" : KeyBoard.K,
		"76" : KeyBoard.L,
		"186" : KeyBoard.semicolon,
		"222" : KeyBoard.quotes,
		"220" : KeyBoard.bar,
		"100" : KeyBoard.Num_4,
		"101" : KeyBoard.Num_5,
		"102" : KeyBoard.Num_6,

		"16" : KeyBoard.key_Shift,//"16" : KeyBoard.Right_Shift,
		"90" : KeyBoard.Z,
		"88" : KeyBoard.X,
		"67" : KeyBoard.C,
		"86" : KeyBoard.V,
		"66" : KeyBoard.B,
		"78" : KeyBoard.N,
		"77" : KeyBoard.M,
		"188" : KeyBoard.key_Semicolon,
		"190" : KeyBoard.key_Dot,
		"191" : KeyBoard.question,
		"38" : KeyBoard.UpArrow,
		"97" : KeyBoard.Num_1,
		"98" : KeyBoard.Num_2,
		"99" : KeyBoard.Num_3,
		// "13" : KeyBoard.Num_Enter,

		"17" : KeyBoard.left_Ctrl,//"17" : KeyBoard.Num_Ctrl,
		"91" : KeyBoard.Left_Win,
		"18" : KeyBoard.key_Alt,//"18" : KeyBoard.RIGH_Alt,
		"32" : KeyBoard.SPACE,
		"92" : KeyBoard.RIGHT_WIN,
		"93" : KeyBoard.NoteSign,
		"37" : KeyBoard.keyArrow,
		"40" : KeyBoard.DownArrow,
		"39" : KeyBoard.RightArrow,
		"96" : KeyBoard.Num_0,
		"110" : KeyBoard.Num_dot

	}
	public constructor() {
		super();

		this.init();
	}
	private init(){
		var self = this;
		document.onkeydown = function(event){
            var e = event || window.event || arguments.callee.caller.arguments[0];
            self.handlekeydown(e);
			if(self.inputs.length > 0){
				//console.log(self.inputs.length)
				self.dispatchEventWith(KeyBoard.onkeydown,true,self.inputs,true);
			} 
		}	
        document.onkeyup = function(event){
            var e = event || window.event || arguments.callee.caller.arguments[0];
            self.handlekeyup(e);
			if(self.inputs.length > 0){
				self.dispatchEventWith(KeyBoard.onkeyup,true,self.inputs,true);
			}
        }
		document.onmousedown = function(event){
			self.inputs = [];
		}
	}
	//处理键盘按下对应keycode
	private handlekeydown(e){
		for(var item in this.keyValue){
			if(parseInt(item) == e.keyCode){
				this.checkInput(this.keyValue[item]);
			}
		}
	}
	//处理键盘抬起对应keycode
	private handlekeyup(e){
		for(var item in this.keyValue){
			if(parseInt(item) == e.keyCode){
				this.removeByKey(this.keyValue[item]);
			}
		}
	}
	//通过key添加
	private checkInput(key){
		let isContain = false;
		for(let i=0; i < this.inputs.length; i++){
			if(this.inputs[i] == key){
				isContain = true;
			}
		}
		if(!isContain){
			this.inputs.push(key);
		}
	}
	//通过key删除
	private removeByKey(key){
		for(let i=0; i < this.inputs.length; i++){
			if(this.inputs[i] == key){
				this.inputs.splice(i,1);
			}
		}
	}
	/**
	 * 判断data字符串数组中是否包含某个字符串
	 */
    public isContain(data,keyCode){
        let isContain = false;
		for(let i=0; i < data.length; i++){
			if(data[i] == keyCode){
				isContain = true;
			}
		}
		return isContain;
    }

	

}