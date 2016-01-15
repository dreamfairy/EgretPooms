/**
 *
 * @author 
 *
 */

const enum GameStateType {
        Start = 0,
        Gameing = 1,
        Over = 2,
}

class GameStateMgr {
    private static m_instance: GameStateMgr = null;
    private m_currentState: IGameState;
    private m_states;
	public constructor() {
    	
	}
	
	public static get Instance() : GameStateMgr
	{
        Main.setDebugInfo("DebugABC create state instance");
        if(null == GameStateMgr.m_instance){
            Main.setDebugInfo("new create state instance");
            GameStateMgr.m_instance = new GameStateMgr();
            Main.setDebugInfo("init create state instance");
            GameStateMgr.m_instance.init();
            Main.setDebugInfo("successfully create state instance");
	    }
	    
        Main.setDebugInfo(GameStateMgr.m_instance == null ? "fuck" : "yes!");
        return GameStateMgr.m_instance;
	}
	
	private init() : void
	{
        Main.setDebugInfo("prenewMapABC create state instance");
        this.m_states = [];
        Main.setDebugInfo("newMap create state instance");
        this.m_states[GameStateType.Gameing] = new GameState();
        Main.setDebugInfo("new GameState");
        this.m_states[GameStateType.Start] = new StartState();
        Main.setDebugInfo("new StartState");
	}
	
	public update(){
	    if(null != this.m_currentState){
	        this.m_currentState.onUpdate(egret.getTimer());
	    }
	}
	
    public changeState(e: number) : void
    {
        if(null != this.m_currentState){
            this.m_currentState.onExit();
        }
        
        var tmpState: IGameState = this.m_states[e];
        if(null != tmpState){
            Main.setDebugInfo("Debug change state");
            Main.setDebugInfo(tmpState.toString());
            Main.setDebugInfo(e.toString());
            tmpState.onEnter();
            this.m_currentState = tmpState;
        }else{
            Main.setDebugInfo("Debug cant find state");
        }
    }
}
