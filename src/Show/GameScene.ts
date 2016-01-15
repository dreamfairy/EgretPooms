/**
 *
 * @author 
 *
 */
class GameScene {
    private m_sceneUI : GameSceneUI;
    private m_col : number;
    private m_row : number;
    private m_timer : egret.Timer;
    private m_score : number = 0;
    private m_gamePause : boolean = false;
    
    //自动下落开关
    private m_autoDropCacheTime : number = 0;
    private m_autoDropCacheSwitch : boolean = false;
    
    private MAX_TIME : number = 120;
    private m_timeDT : number = 0;
    private CURRENT_TIME : number = this.MAX_TIME;
    private LEVEL : number = 2;
    private MAX_LEVEL : number = 10;
    private ICON_NUM: number = 1; //关卡图标数
    private ICON_DROP_SPEED : number = 1000; //掉落速度
    private m_remainDropList : any = [];
    private m_mapIconList : any = [];
    private m_mapIconData :any = [];
    
    private m_currentControlItem : GameObject;
    
    //touch cache
    private m_touchBeginPos : egret.Point = new egret.Point();
    private m_touchEndPos : egret.Point = new egret.Point();
    
    //Search dir
    private static SEARCH_LEFT : egret.Point = new egret.Point(-1,0);
    private static SEARCH_RIGHT: egret.Point = new egret.Point(1,0);
    private static SEARCH_UP: egret.Point = new egret.Point(0,-1);
    private static SEARCH_DOWN: egret.Point = new egret.Point(0,1);
    
	public constructor(col : number, row : number) {
        this.m_sceneUI = <GameSceneUI>UIManager.Instance.getOpenedUI(UIManager.UIType.GameScene);
        
        if(egret.Capabilities.isMobile){
            this.m_sceneUI.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch,this);
            this.m_sceneUI.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouch,this);
        }else{
            var that = this;
            document.addEventListener("keydown",function(e: KeyboardEvent) { that.onKeyBoard(e)});
        }
        
        this.m_col = col;
        this.m_row = row;
        
        this.m_timer = new egret.Timer(this.ICON_DROP_SPEED);
        this.m_timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
       
        this.reset();
	}
	
	private gamewin(){
	    
	}
	
    private gameover() {
        this.m_gamePause = true;
        this.m_timer.stop();
        this.LEVEL = (this.LEVEL++ % this.MAX_LEVEL) + 1; //loop
        this.ICON_NUM = (this.ICON_NUM++ % this.m_row) + 1; //loop
        this.CURRENT_TIME = this.MAX_TIME * this.LEVEL;
    }

    private reset() {
        this.m_gamePause = false;
        this.m_timer.start();
        this.m_mapIconData = [];
        this.m_mapIconList = [];
        this.m_remainDropList = [];
        this.createScene(this.m_col,this.m_row);
        this.createMapData();
    }
    
    private startCountAutoDropTime(){
        this.m_autoDropCacheSwitch = true;
        this.m_autoDropCacheTime = egret.getTimer();
    }
    
    private closeCountAutoDrop(){
        this.m_timer.delay = this.ICON_DROP_SPEED;
        this.m_autoDropCacheSwitch = false;
    }
    
    public onUpdate(dt : number){
        this.onCountTimer(dt);
        if(this.m_autoDropCacheSwitch){
            if(dt - this.m_autoDropCacheTime > 1000 && this.m_timer.delay == this.ICON_DROP_SPEED){
                this.m_timer.delay = 66.6;
            }
        }
    }
	
	public destroy(){
	    if(null != this.m_timer){
	        this.m_timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
	        this.m_timer = null;
	    }
	    
	    if(null != this.m_sceneUI){
            this.m_sceneUI.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
            this.m_sceneUI.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
	        this.m_sceneUI = null;
	    }
	}
	
    private onTouch(e: egret.TouchEvent){
        if(this.m_gamePause) return;
        
	    var handleTouch = false;
	    switch(e.type){
	        case "touchBegin":
	        this.m_touchBeginPos.x = e.localX;
	        this.m_touchBeginPos.y = e.localY;
            this.startCountAutoDropTime();
	        break;
	        case "touchEnd":
	        this.m_touchEndPos.x = e.localX;
	        this.m_touchEndPos.y = e.localY;
	        this.closeCountAutoDrop();
            handleTouch = true; 
	        break;
	    }
	    
        if(handleTouch){
            var isMoveLeft : number = this.m_touchBeginPos.x - this.m_touchEndPos.x;
            var isMoveUp: number = this.m_touchBeginPos.y - this.m_touchEndPos.y;
            
            var inxPos: egret.Point = this.m_currentControlItem.getIndex();
            var needCheckDrop: Boolean = false;
            
            if(Math.abs(isMoveLeft) > GameObject.ICON_WIDTH){
                if(isMoveLeft > 0) {
                    inxPos.x -= 1;
                } else {
                    inxPos.x += 1;
                }
            }
            
            if(Math.abs(isMoveUp) > GameObject.ICON_HEIGHT){
                if(isMoveUp > 0) {
                    //inxPos.y -= 1;
                } else {
                    inxPos.y += 1;
                    needCheckDrop = true;
                }
            }
            
            this.moveCurrentIcon(inxPos,needCheckDrop);
        }
	}
	
    private moveCurrentIcon(inxPos: egret.Point,needCheckDrop:Boolean){
        if(this.checkBound(inxPos)) {
    	    
            //如果是落下，且下一步是挡格，则创建新下落
            if(this.checkBlock(inxPos)) {
                if(needCheckDrop) {
                    this.calcScore(this.m_currentControlItem);
                    this.m_currentControlItem = null;
                }
            } else {
                this.deleteIconPosData(this.m_currentControlItem);
                this.m_currentControlItem.x = inxPos.x;
                this.m_currentControlItem.y = inxPos.y;
                this.addIconPosData(this.m_currentControlItem);
            }
        }
	}
	
	private onKeyBoard(e:KeyboardEvent){
    	if(null == this.m_currentControlItem || this.m_gamePause) return;
    	
        var inxPos: egret.Point = this.m_currentControlItem.getIndex();
        var needCheckDrop : Boolean = false;
	    switch(e.keyCode){
	        case 37:
                inxPos.x -= 1;
	        break;
	        case 38:
                inxPos.y -= 1;
	        break;
	        case 39:
                inxPos.x += 1;
	        break;
	        case 40:
                inxPos.y += 1;
                needCheckDrop = true;
	        break;
	    }
	    
        this.moveCurrentIcon(inxPos,needCheckDrop);
	}
	
	private findSameSkinByDir(target : GameObject, dir : egret.Point, input : GameObject[])
	{
        if(null == GameObject) return ;
	    
	    var startPos : egret.Point = target.getIndex();
        var nextPos = { x : startPos.x + dir.x, y : startPos.y + dir.y};
        
        if(!this.checkBound(nextPos)) return;
        
        var nextObj: GameObject = this.m_mapIconData[nextPos.x][nextPos.y];
        
        if(input.indexOf(nextObj) != -1) return;
        
        //只要下一个目标不为空，且皮肤相同就继续找
        while(nextObj != null && nextObj.getSkinName() == target.getSkinName()){
            input.push(nextObj);
            //遇到满足条件的，需要递归查找
            this.findSameTarget(nextObj,input);
	        nextPos.x += dir.x;
	        nextPos.y += dir.y;
	        nextObj = null;
	        if(this.checkBound(nextPos)){
                nextObj = this.m_mapIconData[nextPos.x][nextPos.y];
                //如果同一方向的前方有相同的目标，说明后面的都找过了，不用再找了
                if(input.indexOf(nextObj) != -1) return;
	        }
	    }
	}
	
	/**
	 * return true is in bound
	 */ 
	private checkBound(idxPos : {x : number, y : number}) : Boolean
	{
	    if(idxPos.x < 0 || idxPos.x >= this.m_col || idxPos.y < 0 || idxPos.y >= this.m_row) return false;
	    return true;
	}
	
	/**
	 * return true is block
	 */ 
	private checkBlock(idxPos : {x : number, y : number}) : Boolean
	{
    	  if(!this.checkBound(idxPos)) return true;
	    return this.m_mapIconData[idxPos.x][idxPos.y] != null;
	}
	
	private getIcon(col : number, row : number) : GameObject
	{
	    return this.m_mapIconData[col][row];
	}
	
    private onTimer(e:egret.TimerEvent){
        this.onCreateNewDropItem();
        this.onRemainListDrop();
    }
    
    private onRemainListDrop(){
        for(var key in this.m_remainDropList){
            var obj = this.m_remainDropList[key];
            
            //每次起跳往下一格
            var inxPos: egret.Point = obj.getIndex();
            var nexPos: egret.Point = new egret.Point(inxPos.x,inxPos.y + 1);
            
            if(this.checkBlock(nexPos)) {
                this.calcScore(obj);
                var idx = this.m_remainDropList.indexOf(obj);
                if(idx != -1){
                    this.m_remainDropList.splice(idx,1);
                }
                return;
            } else {
                this.deleteIconPosData(obj);
                obj.x = nexPos.x;
                obj.y = nexPos.y;
                this.addIconPosData(obj);
            }
        }
    }
    
    private onCreateNewDropItem(){
        //下落过程中不创建新坠落物体
        var remainDropItemLen = this.m_remainDropList.length;
        if(remainDropItemLen > 0) return;
        
        if(null == this.m_currentControlItem){
            var col: number = Math.ceil((this.m_col - 1) * Math.random());
            var row : number = 0;
            this.m_currentControlItem = this.m_sceneUI.createIcon(col,row,this.LEVEL);
            this.m_mapIconData[col][row] = this.m_currentControlItem;
            this.m_mapIconList.push(this.m_currentControlItem);
            this.closeCountAutoDrop();
            return;
        }
        
        //每次起跳往下一格
        var inxPos : egret.Point = this.m_currentControlItem.getIndex();
        var nexPos : egret.Point = new egret.Point(inxPos.x, inxPos.y + 1);
        
        if(this.checkBlock(nexPos)){
            this.calcScore(this.m_currentControlItem);
            this.m_currentControlItem = null;
        }else{
            this.deleteIconPosData(this.m_currentControlItem);
            this.m_currentControlItem.x = nexPos.x;
            this.m_currentControlItem.y = nexPos.y;
            this.addIconPosData(this.m_currentControlItem);
        }
    }
    
    /**
     * 计算分数
     */ 
    private calcScore(item : GameObject){
        var result: GameObject[] = [item];
        
        this.findSameTarget(item, result);
        
        console.log(result.toString());
        var addScore = result.length;
        
        if(addScore >= 3){
            this.m_score += addScore;
            
            while(result.length) {
                var target = result.pop();
                //play particle
                var targetIdxPos = target.getIndex();
                this.m_sceneUI.createParticle(targetIdxPos.x * GameObject.ICON_WIDTH + GameObject.ICON_WIDTH / 2,
                    targetIdxPos.y * GameObject.ICON_HEIGHT + GameObject.ICON_HEIGHT / 2);
                //remove target
                this.deleteIconPosData(target);
                
                var idx = this.m_mapIconList.indexOf(target);
                if(idx != -1){
                    this.m_mapIconList.splice(idx,1);
                }
                target.destroy();
            }
            //add score
            this.m_sceneUI.setScore(this.m_score);
            
            if(this.m_mapIconList.length > 0){
                this.m_remainDropList = []; //clear
                this.findRemainIcon(this.m_remainDropList);
            }else{
                this.gameover();
                this.reset();
            }
            
        }else{
            //如果没有发生消除，连剩余的图标不计算
        }
    }
    
    //算分后，需要查找是否有新的图标可以下落，有些图标的下方图标可能被清除了
    private findRemainIcon(output : GameObject[]){
        for(var key in this.m_mapIconList){
            var obj = this.m_mapIconList[key]
            var idxPos = obj.getIndex();
            
            var hasPlace = false;
            while(idxPos.y++ < this.m_row){
                if(!this.checkBlock(idxPos)) {
                    hasPlace = true;
                    break;
                }
            }
            
            if(hasPlace){
                output.push(obj);
            }
        }
    }
    
    private findSameTarget(item : GameObject, result : GameObject[])
    {
        //search left;
        this.findSameSkinByDir(item,GameScene.SEARCH_LEFT,result);
        //search up;
        this.findSameSkinByDir(item,GameScene.SEARCH_UP,result);
        //search right;
        this.findSameSkinByDir(item,GameScene.SEARCH_RIGHT,result);
        //search down;
        this.findSameSkinByDir(item,GameScene.SEARCH_DOWN,result);
    }
    
    /**
     * 删除Icon的位置数据和挡格数据
     */ 
    private deleteIconPosData(item : GameObject){
        var idxPos : egret.Point = item.getIndex();
        this.m_mapIconData[idxPos.x][idxPos.y] = null;
    }
    
    /**
     * 添加Icon的位置数据和挡格数据
     */ 
    private addIconPosData(item : GameObject){
        var idxPos : egret.Point = item.getIndex();
        this.m_mapIconData[idxPos.x][idxPos.y] = item;
    }
    
    private onCountTimer(dt : number){
        if(this.m_gamePause) return;
        
        if(dt - this.m_timeDT > 1000){
            this.m_timeDT = dt;
            if(--this.CURRENT_TIME < 0){
                this.gameover();
                return;
            }
            this.m_sceneUI.setTime(this.CURRENT_TIME);
        }
    }
	
	private createScene(col : number, row : number)
	{
	    if(null == this.m_sceneUI) return;
	    this.m_sceneUI.createScene(col, row);
	}
	
	private createMapData()
    {
    	    for(var i = 0; i < this.m_col; i++)
         {
             this.m_mapIconData[i] = [];
             for(var j  = 0; j < this.m_row; j++)
             {
                 if(j < this.m_row - this.ICON_NUM){
                     //to do 
                 }else{
                     var obj = this.m_sceneUI.createIcon(i,j,this.LEVEL);
                     this.m_mapIconData[i][j] = obj;
                     this.m_mapIconList.push(obj);
                 }
             }
         }
    }
}
