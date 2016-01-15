/**
 *
 * @author 
 *
 */

class GameObject {
    private m_x : number = 0;
    private m_y : number = 0;
    
    private m_skin : GameItemUI;
    
    public static ICON_WIDTH: number = 31; //单个图标宽
    public static ICON_HEIGHT: number = 31; //单个图标高
    
	public constructor() {
	}
	
	public destroy() {
	    if(null != this.m_skin){
	        this.m_skin.destroy();
	        this.m_skin = null;
	    }
	}
	
	public getIndex() : egret.Point
	{
	    return new egret.Point(this.m_x, this.m_y);
	}
	
	public getSkinName() : string
	{
	    return this.m_skin ? this.m_skin.getSkinName() : "";
	}
	
	public setSkin(item : GameItemUI){
        this.m_skin = item;
	}
	
	public set x(param : number){
	    this.m_x = param;
        this.m_skin.x = param * GameObject.ICON_WIDTH;
	}
	
	public set y(param : number){
	    this.m_y = param;
	    this.m_skin.y = param * GameObject.ICON_HEIGHT;
	}
}
