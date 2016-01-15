/**
 *
 * @author 
 *
 */
class GameScoreUI extends eui.Component{
    private label_data : eui.Label;
	public constructor() {
        super();
	}
	
	public setData(str : string){
	    if(null != this.label_data){
	        this.label_data.text = str;
	    }
	}
}
