/**
 *
 * @author
 *
 */
var GameStateMgr = (function () {
    function GameStateMgr() {
    }
    var d = __define,c=GameStateMgr,p=c.prototype;
    d(GameStateMgr, "Instance"
        ,function () {
            Main.setDebugInfo("DebugABC create state instance");
            if (null == GameStateMgr.m_instance) {
                Main.setDebugInfo("new create state instance");
                GameStateMgr.m_instance = new GameStateMgr();
                Main.setDebugInfo("init create state instance");
                GameStateMgr.m_instance.init();
                Main.setDebugInfo("successfully create state instance");
            }
            Main.setDebugInfo(GameStateMgr.m_instance == null ? "fuck" : "yes!");
            return GameStateMgr.m_instance;
        }
    );
    p.init = function () {
        Main.setDebugInfo("prenewMapABC create state instance");
        this.m_states = [];
        Main.setDebugInfo("newMap create state instance");
        this.m_states[1 /* Gameing */] = new GameState();
        Main.setDebugInfo("new GameState");
        this.m_states[0 /* Start */] = new StartState();
        Main.setDebugInfo("new StartState");
    };
    p.update = function () {
        if (null != this.m_currentState) {
            this.m_currentState.onUpdate(egret.getTimer());
        }
    };
    p.changeState = function (e) {
        if (null != this.m_currentState) {
            this.m_currentState.onExit();
        }
        var tmpState = this.m_states[e];
        if (null != tmpState) {
            Main.setDebugInfo("Debug change state");
            Main.setDebugInfo(tmpState.toString());
            Main.setDebugInfo(e.toString());
            tmpState.onEnter();
            this.m_currentState = tmpState;
        }
        else {
            Main.setDebugInfo("Debug cant find state");
        }
    };
    GameStateMgr.m_instance = null;
    return GameStateMgr;
})();
egret.registerClass(GameStateMgr,'GameStateMgr');
//# sourceMappingURL=GameStateMgr.js.map