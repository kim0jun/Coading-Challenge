var Snake = function(){
    this.x = 0;
    this.y = 0;
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.length = 0;
    this.tails = [];
    
    this.update = function(){

        
        for(var i = this.length-1; i>=0;i--){
            if (i == 0) this.tails[i] = {x:this.x,y:this.y};
            else        this.tails[i] = {x:this.tails[i-1].x,y:this.tails[i-1].y};
        }
        this.x += this.xSpeed*CELL_WIDTH;
        this.y += this.ySpeed*CELL_WIDTH;
        this.x = Math.min(this.x,STAGE_WIDTH-CELL_WIDTH)
        this.x = Math.max(this.x,0);
        this.y = Math.min(this.y,STAGE_WIDTH-CELL_WIDTH)
        this.y = Math.max(this.y,0);
    }

    this.setDirection = function(x,y){
        this.xSpeed = x;
        this.ySpeed = y;
    }

    this.eat = function(obj){
        return (this.x == obj.x) && (this.y == obj.y)
    }

    this.death = function(){
        for(var i=0;i<this.tails.length;i++){
            var pos = this.tails[i];
            if((this.x == pos.x) && (this.y == pos.y)){
                this.length = 0;
                this.tails = [];
            }
        }
    }

    this.show = function(){
        ctx.fillStyle = 'rgb(255,255,255)'; 
        ctx.fillRect(this.x, this.y, 8, 8);
        for(var i=0;i<this.tails.length;i++){
            ctx.fillRect(this.tails[i].x,this.tails[i].y, 8, 8)
        }
    }
}