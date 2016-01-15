/**
 *
 * @author 
 *
 */
class GameItemUI extends egret.Bitmap{
    private m_skin : string;
    
	public constructor() {
    	super();
	}
	
	public destroy(){
	    var p  = this.parent;
	    if(null != p){
	        p.removeChild(this);
	    }
	}
	
	public setIcon(str : string){
	    this.m_skin = str;
	    
        var spritesheet: egret.SpriteSheet = RES.getRes("poom_icon_spritesheet");
        if(null != spritesheet){
            this.texture = spritesheet.getTexture(str);
        }
	}
	
	public getSkinName() : string
	{
	    return this.m_skin;
	}
}
