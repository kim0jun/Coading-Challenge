var Leaf = function(){
    this.pos = createVector(Math.random()*width,Math.random()*(height-100));
    this.reached = false;

    this.show = function(){
        ctx.beginPath();
        ctx.fillStyle = "#fff"
        ctx.arc(this.pos.x,this.pos.y,2,0,Math.PI*2)
        ctx.fill();
        ctx.closePath();
    }
}