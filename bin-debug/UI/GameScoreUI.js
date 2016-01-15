/**
 *
 * @author
 *
 */
var GameScoreUI = (function (_super) {
    __extends(GameScoreUI, _super);
    function GameScoreUI() {
        _super.call(this);
    }
    var d = __define,c=GameScoreUI,p=c.prototype;
    p.setData = function (str) {
        if (null != this.label_data) {
            this.label_data.text = str;
        }
    };
    return GameScoreUI;
})(eui.Component);
egret.registerClass(GameScoreUI,'GameScoreUI');
//# sourceMappingURL=GameScoreUI.js.map