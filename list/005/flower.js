var Flower = function(x){
    this.x = x;
    this.y = 30;
    this.radius = 25;
    this.xDirection = 2;

    this.move = function(){
        this.x += this.xDirection;
    }

    this.shiftDown = function(){
        this.xDirection *= -1;
        this.y += this.radius;
    }

    this.show = function(){
        ctx.fillStyle = 'rgb(230,50,230)'; 
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2 * Math.PI)
        ctx.fill();
        ctx.closePath();
    }

    this.grow = function(){
        this.radius += 2;
    }
}