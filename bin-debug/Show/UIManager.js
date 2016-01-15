var UIManager = (function () {
    function UIManager() {
    }
    var d = __define,c=UIManager,p=c.prototype;
    d(UIManager, "Instance"
        ,function () {
            if (null == this.m_instance) {
                this.m_instance = new UIManager();
                this.m_instance.init();
            }
            return this.m_instance;
        }
    );
    p.init = function () {
        this.m_ui = [];
        this.m_uiSkin = [];
        this.m_uiSkin[0 /* StartPanel */] = "resource/eui_skins/StartPanelSkin.exml";
        this.m_uiSkin[4 /* GameScene */] = "resource/eui_skins/GameSceneSkin.exml";
    };
    d(p, "Root"
        ,function () {
            return this.m_root;
        }
        ,function (root) {
            this.m_root = root;
        }
    );
    p.openUI = function (e) {
        Main.setDebugInfo("open UI");
        if (null == this.m_root)
            return;
        Main.setDebugInfo("root UI");
        var tmpUI;
        switch (e) {
            case 0 /* StartPanel */:
                tmpUI = new StartPanelUI();
                Main.setDebugInfo("create startUI");
                break;
            case 1 /* GameScore */:
                break;
            case 2 /* GameTimer */:
                break;
            case 3 /* GameCombo */:
                break;
            case 4 /* GameScene */:
                tmpUI = new GameSceneUI();
                break;
        }
        if (null != tmpUI) {
            tmpUI.skinName = this.m_uiSkin[e];
            this.m_ui[e] = tmpUI;
            this.m_root.addChild(tmpUI);
        }
    };
    p.getOpenedUI = function (e) {
        return this.m_ui[e];
    };
    p.closeUI = function (e) {
        if (null == this.m_root)
            return;
        var tmpUI = this.m_ui[e];
        if (null != tmpUI) {
            this.m_root.removeChild(tmpUI);
            delete this.m_ui[e];
        }
    };
    return UIManager;
})();
egret.registerClass(UIManager,'UIManager');
//# sourceMappingURL=UIManager.js.map