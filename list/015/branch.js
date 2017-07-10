function Branch(start,end){
    this.start = start;
    this.end = end;

    this.show = function(){
        ctx.strokeStyle = "#fff"
        ctx.beginPath();
        ctx.moveTo(this.start.x,this.start.y);
        ctx.lineTo(this.end.x,this.end.y);
        ctx.stroke();
        ctx.closePath();
    }

    this.zitter = function(){
        this.end.x += Math.random()*2+-1
        this.end.y += Math.random()*2+-1
    }

    this.branchA = function(){
        var dir = sub(this.end,this.start)
        dir = rotate(dir,-Math.PI/6)
        dir = mult(dir,0.67)
        
        var newEnd = add(this.end,dir)
        return new Branch(this.end,newEnd);
    }

    this.branchB = function(){
        var dir = sub(this.end,this.start)
        dir = rotate(dir,Math.PI/4)
        dir = mult(dir,0.67)
        var newEnd = add(this.end,dir)
        return new Branch(this.end,newEnd);
    }

    this.fruit = function(){
        return {
            x : this.end.x,
            y : this.end.y
        }
    }
}

function sub(a,b){
    return{
        x : a.x-b.x,
        y : a.y-b.y,
        angle : Math.atan2(a.y-b.y,a.x-b.x)
    }
}

function add(a,b){
    return{
        x : a.x+b.x,
        y : a.y+b.y,
    }
}

function rotate(a,degree){
    return{
        x : Math.sqrt(a.x*a.x+a.y*a.y)  * Math.cos(degree+a.angle),
        y : Math.sqrt(a.x*a.x+a.y*a.y)  * Math.sin(degree+a.angle)
    }
}

function mult(vector,value){
    return{
        x : vector.x * value,
        y : vector.y * value
    }
}