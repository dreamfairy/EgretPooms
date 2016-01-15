/**
 *
 * @author 
 *
 */
class StartState implements IGameState {
    
	public constructor() {
	}
	
	public onEnter() : void
	{
        Main.setDebugInfo("Debug enter startState");
        UIManager.Instance.openUI(UIManager.UIType.StartPanel);
	}
	
	public onUpdate(dt : number)
	{
	    
	}
	
	public onExit() : void
	{
        UIManager.Instance.closeUI(UIManager.UIType.StartPanel);
        Main.setDebugInfo("Debug exit startState");
	}
	
	public toString() : string
	{
	    return "StartState";
	}
}
