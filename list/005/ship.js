function Ship(){
    var speed = 5;
    this.width = 10;
    this.height = 30;
    this.x = STAGE_WIDTH/2-this.width/2;
    this.y = STAGE_HEIGHT-this.height;
    
    


    this.move = function(x,y){
        this.x += x*speed;
        this.y += y*speed;
    }

    this.show = function(){
        ctx.fillStyle = 'rgb(255,255,255)'; 
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}