/**
 *
 * @author 
 *
 */
class GameState implements IGameState {
    public num_col: number = 10;
    public num_row: number = 12;
    
    private m_gameScene : GameScene;
    public constructor() {
    }

    public onEnter(): void {
        Main.setDebugInfo("Debug enter game state");
        UIManager.Instance.openUI(UIManager.UIType.GameScene);
        this.m_gameScene = new GameScene(this.num_col,this.num_row);
    }

    public onExit(): void {
        this.m_gameScene = null;
        UIManager.Instance.closeUI(UIManager.UIType.GameScene);
    }
    
    public onUpdate(dt: number) {
        if(null != this.m_gameScene){
            this.m_gameScene.onUpdate(dt);
        }
    }
    
    public toString() : string{
        return "GameState";
    }
}
