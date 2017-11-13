class Circle{

    constructor(x,y){
        this._growSpeed = 0.5;
        this.x = x;
        this.y = y;
        this.r = 0;
        this.color = `rgba(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},1)`
    }

    update(){
        this.r += this._growSpeed;
        this.edge();
    }

    edge(){
        if(this.x+this.r>width ||
           this.x-this.r<0     || 
           this.y+this.r>width ||
           this.y-this.r<0     ){
               this.stopGrow();
           }
    }

    collision(circles){
        var _collsion = false;
        circles.forEach(function(circle) {
            let _dist = Math.sqrt(Math.pow(this.x - circle.x,2)+Math.pow(this.y - circle.y,2));
            if(circle.r+this.r>_dist  && this != circle){
                _collsion = true;
            }
        },this);
        if(_collsion) this.stopGrow();
    }

    stopGrow(){
        this._growSpeed = 0;
    }

    show(){
       ctx.beginPath();
       ctx.strokeStyle = this.color;
       ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
       ctx.stroke();
    //    ctx.fillStyle = this.color;
    //    ctx.fill();
       ctx.closePath();
    }

}