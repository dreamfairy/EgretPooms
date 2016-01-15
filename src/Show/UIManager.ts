/**
 *
 * @author 
 *
 */
declare module UIManager
{
    const enum UIType {
        StartPanel,
        GameScore,
        GameTimer,
        GameCombo,
        GameScene,
    }
}


class UIManager {
    private static m_instance: UIManager;
    private m_root: eui.UILayer;
    private m_ui;
    private m_uiSkin;
	public constructor() {
	}
	
	public static get Instance() : UIManager
	{
        if(null == this.m_instance){
            this.m_instance = new UIManager();
            this.m_instance.init();
        }
        
        return this.m_instance;
	}
	
	public init() : void
	{
        this.m_ui = [];
        this.m_uiSkin = [];
        
        this.m_uiSkin[UIManager.UIType.StartPanel] = "resource/eui_skins/StartPanelSkin.exml";
        this.m_uiSkin[UIManager.UIType.GameScene] = "resource/eui_skins/GameSceneSkin.exml";
	}
	
    public set Root(root: eui.UILayer)
	{
        this.m_root = root;
	}
	
    public get Root(): eui.UILayer
	{
        return this.m_root;
	}
	
    public openUI(e: UIManager.UIType) : void
	{
        Main.setDebugInfo("open UI");
        if(null == this.m_root) return;
        Main.setDebugInfo("root UI");
        var tmpUI: eui.Component;
	    switch(e)
    	    {
            case UIManager.UIType.StartPanel:
                    tmpUI = new StartPanelUI();
                    Main.setDebugInfo("create startUI");
                break;
            case UIManager.UIType.GameScore:
                break;
            case UIManager.UIType.GameTimer:
                break;
            case UIManager.UIType.GameCombo:
                break;
            case UIManager.UIType.GameScene:
                    tmpUI = new GameSceneUI();
                break;
    	    }
    	    
    	   if(null != tmpUI){
            tmpUI.skinName = this.m_uiSkin[e];
            this.m_ui[e] = tmpUI;
            this.m_root.addChild(tmpUI);
    	   }
	}
	
	public getOpenedUI(e: UIManager.UIType) : eui.Component
	{
        return this.m_ui[e];
	}
	
    public closeUI(e: UIManager.UIType) : void
	{
        if(null == this.m_root) return;
        
        var tmpUI: eui.Component = this.m_ui[e];
        if(null != tmpUI){
            this.m_root.removeChild(tmpUI);
            delete this.m_ui[e];
        }
	}
}
