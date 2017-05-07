var Drop = function(x,y){
    this.x = x;
    this.y = y;
    this.radius = 3;

    this.move = function(){
        this.y -= 5;
        if(this.y < -this.radius) 
            this.remove();
            
    }
    
    this.remove = function(){
        drops = drops.filter((drop)=> this != drop)
    }

    this.show = function(){
        ctx.fillStyle = 'rgb(255,200,00)'; 
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2 * Math.PI)
        ctx.fill();
        ctx.closePath();
    }
}