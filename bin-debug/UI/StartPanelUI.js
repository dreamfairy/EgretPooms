/**
 *
 * @author
 *
 */
var StartPanelUI = (function (_super) {
    __extends(StartPanelUI, _super);
    function StartPanelUI() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        UIManager.Instance.Root.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
    }
    var d = __define,c=StartPanelUI,p=c.prototype;
    p.onResize = function (e) {
        var root = UIManager.Instance.Root;
        this.x = root.width - this.width >> 1;
        this.y = root.height - this.height >> 1;
    };
    p.onRemoveFromStage = function (e) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.btn_enter.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickEnter, this);
        UIManager.Instance.Root.removeEventListener(egret.Event.RESIZE, this.onResize, this);
    };
    p.onAddtoStage = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
        this.btn_enter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickEnter, this);
        this.Label_Tittle.text = "很不科学";
        this.label_info.text = "大壮试玩版";
        var root = UIManager.Instance.Root;
        this.x = root.width - this.width >> 1;
        this.y = root.height - this.height >> 1;
    };
    p.onClickEnter = function (e) {
        console.log("i dont like it");
        GameStateMgr.Instance.changeState(1 /* Gameing */);
    };
    d(p, "Label_Tittle"
        ,function () {
            return this.label_tittle;
        }
    );
    d(p, "Label_Info"
        ,function () {
            return this.label_info;
        }
    );
    d(p, "Btn_Enter"
        ,function () {
            return this.btn_enter;
        }
    );
    return StartPanelUI;
})(eui.Component);
egret.registerClass(StartPanelUI,'StartPanelUI');
//# sourceMappingURL=StartPanelUI.js.map