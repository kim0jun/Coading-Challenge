var Branch = function(parent,pos,dir){
    this.parent = parent;
    this.pos = pos;
    this.dir = dir;
    this.count = 0;
    this.origDir = Object.assign({},this.dir)
    this.len = 5

    this.reset = function(){
        this.dir = Object.assign({},this.origDir);
        this.count = 0; 
    }

    this.next = function(){
        var nextDirection = mult(this.dir,this.len)
        var nextPos = add(this.pos,nextDirection)
        var nextBranch = new Branch(this, nextPos , copy(this.dir))
        return nextBranch;
    }

    this.show = function(){
        if(!this.parent) return
        ctx.beginPath();
        ctx.strokeStyle = "#fff";
        ctx.moveTo(this.pos.x,this.pos.y);
        ctx.lineTo(this.parent.pos.x,this.parent.pos.y);
        
        
        
        ctx.stroke();
        ctx.closePath();
    }

}