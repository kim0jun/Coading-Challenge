function Cell(i,j,w,h){
    this.i      = i ;
    this.j      = j ;
    this.width  = w ;
    this.height = h ;
    this.walls  = [true,true,true,true];
    this.visited = false;

    this.checkNeigbors = function(){
        var neigbors = [];
        var _top    = grid[getIndex(i,j-1)];
        var _right  = grid[getIndex(i+1,j)];
        var _bottom = grid[getIndex(i,j+1)];
        var _left   = grid[getIndex(i-1,j)];

        if(_top && _top.visited === false){ 
            neigbors.push(_top);
        }
        if(_right && _right.visited === false){
            neigbors.push(_right);
        }
        if(_bottom && _bottom.visited === false){
            neigbors.push(_bottom);
            
        }
        if(_left && _left.visited === false) {
            neigbors.push(_left);
        }

        if(prev == _top){
            if(prev)prev.walls[2] = false;
            this.walls[0] = false;
        }


        if(prev == _right){
            if(prev)prev.walls[3] = false;
            this.walls[1] = false;
        }

        if(prev == _bottom){
            if(prev)prev.walls[0] = false;
            this.walls[2] = false;
        }

        if(prev == _left){
            if(prev)prev.walls[1] = false;
            this.walls[3] = false;
        }
            
        if(neigbors.length > 0){
            var r = Math.floor(Math.random()*neigbors.length);
            return neigbors[r];
        }else{
            return undefined;
        }

    }

    this.show = function(){
        var _x = this.i*this.width;
        var _y = this.j*this.height;

        
        ctx.fillStyle = 'rgba(200,0,200,0.4)';
        ctx.strokeStyle = "white";
        ctx.lineWidth   = 1;

        if(this.walls[0]) line(_x,_y,_x+this.width, _y);
        if(this.walls[1]) line(_x+this.width, _y,_x+this.width, _y+this.width);
        if(this.walls[2]) line(_x+this.width, _y+this.width,_x           , _y+this.width);
        if(this.walls[3]) line(_x           , _y+this.width,_x           , _y);
        

        
        ctx.beginPath();
        if(this.visited){
            if(this === current) ctx.fillStyle = 'rgba(0,200,0,1)';
            ctx.rect(_x,_y,this.width,this.height)
            ctx.fill();
        }
        ctx.closePath();
    }

    function line(startX,startY,endX,endY){
        ctx.beginPath();
        ctx.moveTo(startX,startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.closePath();
    }
}
