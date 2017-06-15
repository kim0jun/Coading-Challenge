var Cell = function(x,y,r,c,xS,yS){
    this.x = x || random(0,STAGE_WIDTH);
    this.y = y || random(0,STAGE_HEIGHT);
    this.radius = r || 30;
    this.color = c || `rgba(${random(0,255,true)},0,${random(0,255,true)},0.4)`
    this.Xspeed = xS || random(-1,1);
    this.Yspeed = yS || random(-1,1);

    this.clicked = function(){
        console.log(Math.atan2(-this.Yspeed,this.Xspeed)-Math.PI/4);
        this.Yspeed = 3*Math.cos((Math.atan2(this.Yspeed,this.Xspeed)-Math.PI/2));
        this.Xspeed = 3*Math.sin((Math.atan2(this.Yspeed,this.Xspeed)-Math.PI/2));
        return this.mitosis();
    }

    this.move = function(){
        this.x  += this.Xspeed;
        this.y  += this.Yspeed;

        if(this.x+this.radius<0)
            this.x = STAGE_WIDTH+this.radius;
        else if(this.x-this.radius>STAGE_WIDTH)
            this.x = -this.radius;

        if(this.y+this.radius<0)
            this.y = STAGE_HEIGHT+this.radius;
        else if(this.y-this.radius>STAGE_HEIGHT)
            this.y = -this.radius;

    }

    this.mitosis = function(){
        this.radius /= 2;
        return new Cell(this.x,this.y,this.radius,this.color,-this.Xspeed,-this.Yspeed);
    }
    
    this.show = function(){
        ctx.fillStyle = this.color; 
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2 * Math.PI)
        ctx.fill();
        ctx.closePath();
    }
}