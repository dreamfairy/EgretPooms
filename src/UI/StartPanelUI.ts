/**
 *
 * @author 
 *
 */
class StartPanelUI extends eui.Component{
    
    private label_tittle : eui.Label;
    private label_info : eui.Label;
    private btn_enter: eui.Button;
    
	public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddtoStage,this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoveFromStage,this);
        UIManager.Instance.Root.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
	}
	
	private onResize(e:egret.Event){
        var root = UIManager.Instance.Root;
        this.x = root.width - this.width >> 1;
        this.y = root.height - this.height >> 1;
	}
	
	private onRemoveFromStage(e:egret.Event) : void
	{
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoveFromStage,this);
        this.btn_enter.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickEnter,this);
        UIManager.Instance.Root.removeEventListener(egret.Event.RESIZE,this.onResize,this);
	}
	
	private onAddtoStage(e:egret.Event) : void
	{
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddtoStage,this);
        this.btn_enter.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickEnter,this);
        
        this.Label_Tittle.text = "很不科学";
        this.label_info.text = "大壮试玩版";
        var root = UIManager.Instance.Root;
        this.x = root.width - this.width >> 1;
        this.y = root.height - this.height >> 1;
	}
	
    private onClickEnter(e: egret.TouchEvent) {
        console.log("i dont like it");
        GameStateMgr.Instance.changeState(GameStateType.Gameing);
    }
	
	public get Label_Tittle() : eui.Label
	{
        return this.label_tittle;
	}
	
	public get Label_Info() : eui.Label
	{
        return this.label_info;
	}
	
	public get Btn_Enter() : eui.Button
	{
        return this.btn_enter;
	}
}
