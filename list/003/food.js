var Food = function(){
    this.x = createRandomPosition();
    this.y = createRandomPosition();


    this.show  = function(){
        ctx.fillStyle = 'rgb(200,50,50)';
        ctx.fillRect(this.x,this.y,8,8);
    }

    this.reset = function(){
        this.x = createRandomPosition();
        this.y = createRandomPosition();
    }

    function createRandomPosition(){
        return Math.floor(Math.random()*STAGE_WIDTH/CELL_WIDTH)*CELL_WIDTH;
    }
}