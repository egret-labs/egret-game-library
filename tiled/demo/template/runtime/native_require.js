
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/tiled/tiled.js",
	"bin-debug/testEntries/TerrainExample.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/testEntries/CuteExample.js",
	"bin-debug/testEntries/DesertExample.js",
	"bin-debug/testEntries/HexagonaExample.js",
	"bin-debug/testEntries/MapExample.js",
	"bin-debug/testEntries/SewersExample.js",
	"bin-debug/Main.js",
	"bin-debug/testEntries/Test2Example.js",
	"bin-debug/testEntries/TestExample.js",
	"bin-debug/testEntries/TilesheetExample.js",
	"bin-debug/testEntries/TurretExample.js",
	"bin-debug/testEntries/VillageExample.js",
	"bin-debug/testEntries/WallsExample.js",
	"bin-debug/testEntries/WaterExample.js",
	//----auto game_file_list end----
];

var window = {};

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
		frameRate: 60,
		scaleMode: "noScale",
		contentWidth: 480,
		contentHeight: 800,
		showPaintRect: false,
		showFPS: true,
		fpsStyles: "x:0,y:0,size:12",
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