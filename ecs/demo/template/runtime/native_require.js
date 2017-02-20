
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"libs/modules/game/game.js",
	"libs/modules/ecs/ecs.js",
	"polyfill/promise.js",
	"bin-debug/scripts/data/CardStack.js",
	"bin-debug/scripts/data/STATE.js",
	"bin-debug/scripts/logic/CardManager.js",
	"bin-debug/Main.js",
	"bin-debug/scripts/anim/label_anim_sets.js",
	"bin-debug/scripts/interact/switch_to_next_scene.js",
	"bin-debug/scripts/logic/card_slot.js",
	"bin-debug/scripts/anim/draw_a_card.js",
	"bin-debug/scripts/UI/card_back_slot.js",
	"bin-debug/scripts/UI/card_base.js",
	"bin-debug/scripts/UI/card_cost.js",
	"bin-debug/scripts/UI/card_soldier.js",
	"bin-debug/scripts/util/scene_loader.js",
	"bin-debug/scripts/util/toast.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "fixedWidth",
		contentWidth: 720,
		contentHeight: 1280,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};