/**
 *
 * @author
 *
 */
var GameObject = (function () {
    function GameObject() {
        this.m_x = 0;
        this.m_y = 0;
    }
    var d = __define,c=GameObject,p=c.prototype;
    p.destroy = function () {
        if (null != this.m_skin) {
            this.m_skin.destroy();
            this.m_skin = null;
        }
    };
    p.getIndex = function () {
        return new egret.Point(this.m_x, this.m_y);
    };
    p.getSkinName = function () {
        return this.m_skin ? this.m_skin.getSkinName() : "";
    };
    p.setSkin = function (item) {
        this.m_skin = item;
    };
    d(p, "x",undefined
        ,function (param) {
            this.m_x = param;
            this.m_skin.x = param * GameObject.ICON_WIDTH;
        }
    );
    d(p, "y",undefined
        ,function (param) {
            this.m_y = param;
            this.m_skin.y = param * GameObject.ICON_HEIGHT;
        }
    );
    GameObject.ICON_WIDTH = 31; //单个图标宽
    GameObject.ICON_HEIGHT = 31; //单个图标高
    return GameObject;
})();
egret.registerClass(GameObject,'GameObject');
//# sourceMappingURL=GameObject.js.map