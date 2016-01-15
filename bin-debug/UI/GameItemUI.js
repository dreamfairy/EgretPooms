/**
 *
 * @author
 *
 */
var GameItemUI = (function (_super) {
    __extends(GameItemUI, _super);
    function GameItemUI() {
        _super.call(this);
    }
    var d = __define,c=GameItemUI,p=c.prototype;
    p.destroy = function () {
        var p = this.parent;
        if (null != p) {
            p.removeChild(this);
        }
    };
    p.setIcon = function (str) {
        this.m_skin = str;
        var spritesheet = RES.getRes("poom_icon_spritesheet");
        if (null != spritesheet) {
            this.texture = spritesheet.getTexture(str);
        }
    };
    p.getSkinName = function () {
        return this.m_skin;
    };
    return GameItemUI;
})(egret.Bitmap);
egret.registerClass(GameItemUI,'GameItemUI');
//# sourceMappingURL=GameItemUI.js.map