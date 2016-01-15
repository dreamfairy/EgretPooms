/**
 *
 * @author
 *
 */
var GameState = (function () {
    function GameState() {
        this.num_col = 10;
        this.num_row = 12;
    }
    var d = __define,c=GameState,p=c.prototype;
    p.onEnter = function () {
        Main.setDebugInfo("Debug enter game state");
        UIManager.Instance.openUI(4 /* GameScene */);
        this.m_gameScene = new GameScene(this.num_col, this.num_row);
    };
    p.onExit = function () {
        this.m_gameScene = null;
        UIManager.Instance.closeUI(4 /* GameScene */);
    };
    p.onUpdate = function (dt) {
        if (null != this.m_gameScene) {
            this.m_gameScene.onUpdate(dt);
        }
    };
    p.toString = function () {
        return "GameState";
    };
    return GameState;
})();
egret.registerClass(GameState,'GameState',["IGameState"]);
//# sourceMappingURL=GameState.js.map