var WaterDrop = function(){
    this.x = random(0,STAGE_WIDTH);
    this.y = random(-500,-100);
    this.z = random(0,20)
    this.width = map(this.z,0,20,1,4);
    this.height = 5;
    this.ySpeed = map(this.z,0,20,4,10);
    this.len = map(this.z,0,20,10,20);
    

    this.fall = function(){
        this.y += this.ySpeed;
        this.ySpeed += map(this.z,0,20,0.15,0.7);
        if(this.y >= STAGE_HEIGHT){
            this.x = random(0,STAGE_WIDTH);
            this.y = random(-500,-100);
            this.ySpeed = map(this.z,0,20,4,10);
        }
    }

    this.show = function(){
        ctx.fillStyle = 'rgb(138,43,226)'; 
        ctx.fillRect(this.x, this.y, this.width, this.height+this.len);
    }
}