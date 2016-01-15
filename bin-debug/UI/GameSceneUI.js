/**
 *
 * @author
 *
 */
var GameSceneUI = (function (_super) {
    __extends(GameSceneUI, _super);
    function GameSceneUI() {
        _super.call(this);
        this.m_sprBackGround = new egret.Shape();
        this.m_sprIconContainer = new egret.DisplayObjectContainer();
        this.m_sprParticleContainer = new egret.DisplayObjectContainer();
        this.m_sprRootContainer = new egret.DisplayObjectContainer();
        this.addChild(this.m_sprRootContainer);
        this.m_sprRootContainer.addChild(this.m_sprBackGround);
        this.m_sprRootContainer.addChild(this.m_sprIconContainer);
        this.m_sprRootContainer.addChild(this.m_sprParticleContainer);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    }
    var d = __define,c=GameSceneUI,p=c.prototype;
    p.onAddToStage = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        if (null != this.label_area) {
            this.m_sprRootContainer.x = this.label_area.x;
            this.m_sprRootContainer.y = this.label_area.y;
            this.label_area.visible = false;
        }
    };
    p.onRemoveFromStage = function (e) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        if (null != this.m_sprBackGround) {
            this.removeChild(this.m_sprBackGround);
        }
    };
    p.createScene = function (col, row) {
        if (null != this.m_sprBackGround) {
            this.m_sprBackGround.graphics.clear();
            for (var i = 0; i < col; i++) {
                for (var j = 0; j < row; j++) {
                    this.m_sprBackGround.graphics.beginFill(Math.random() * 0xFFFFFF, 0.1);
                    this.m_sprBackGround.graphics.lineStyle(1);
                    this.m_sprBackGround.graphics.drawRect(i * GameObject.ICON_WIDTH, j * GameObject.ICON_HEIGHT, GameObject.ICON_WIDTH, GameObject.ICON_HEIGHT);
                    this.m_sprBackGround.graphics.endFill();
                }
            }
        }
    };
    p.createParticle = function (pixelX, pixelY) {
        var tex = RES.getRes("snowBoom_png");
        var cfg = RES.getRes("snowBoom_json");
        var p = new particle.GravityParticleSystem(tex, cfg);
        p.start(200);
        p.x = pixelX;
        p.y = pixelY;
        //p.name = "hello" + egret.getTimer().toString();
        p.addEventListener(egret.Event.COMPLETE, this.removeParticle, this);
        this.m_sprParticleContainer.addChild(p);
    };
    p.removeParticle = function (e) {
        //console.log(e.target.name);
        this.m_sprParticleContainer.removeChild(e.target);
    };
    p.setScore = function (param) {
        if (null != this.eui_score) {
            this.eui_score.setData(param.toString());
        }
    };
    p.setTime = function (param) {
        if (null != this.eui_time) {
            this.eui_time.setData(param.toString());
        }
    };
    p.createIcon = function (col, row, level) {
        var item = new GameObject();
        var skin = new GameItemUI();
        skin.setIcon(Math.ceil(Math.random() * level).toString());
        item.setSkin(skin);
        item.x = col;
        item.y = row;
        this.m_sprIconContainer.addChild(skin);
        return item;
    };
    return GameSceneUI;
})(eui.Component);
egret.registerClass(GameSceneUI,'GameSceneUI');
//# sourceMappingURL=GameSceneUI.js.map