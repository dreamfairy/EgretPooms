/**
 *
 * @author
 *
 */
var StartState = (function () {
    function StartState() {
    }
    var d = __define,c=StartState,p=c.prototype;
    p.onEnter = function () {
        Main.setDebugInfo("Debug enter startState");
        UIManager.Instance.openUI(0 /* StartPanel */);
    };
    p.onUpdate = function (dt) {
    };
    p.onExit = function () {
        UIManager.Instance.closeUI(0 /* StartPanel */);
        Main.setDebugInfo("Debug exit startState");
    };
    p.toString = function () {
        return "StartState";
    };
    return StartState;
})();
egret.registerClass(StartState,'StartState',["IGameState"]);
//# sourceMappingURL=StartState.js.map