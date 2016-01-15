
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/particle/particle.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Logic/GameObject/GameObject.js",
	"bin-debug/Logic/GameState/GameState.js",
	"bin-debug/Logic/GameState/GameStateMgr.js",
	"bin-debug/Logic/GameState/IGameState.js",
	"bin-debug/Logic/GameState/StartState.js",
	"bin-debug/Main.js",
	"bin-debug/Show/GameScene.js",
	"bin-debug/Show/UIManager.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/UI/GameItemCountUI.js",
	"bin-debug/UI/GameItemUI.js",
	"bin-debug/UI/GameSceneUI.js",
	"bin-debug/UI/GameScoreUI.js",
	"bin-debug/UI/GameTimerUI.js",
	"bin-debug/UI/StartPanelUI.js",
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
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 960,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0xFFFFFF,bgAlpha:0.5",
		showLog: true,
		logFilter: "Debug",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};