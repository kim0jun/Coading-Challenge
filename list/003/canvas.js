var canvas,ctx,snake,food,score;
const STAGE_WIDTH  = 400;
const STAGE_HEIGHT = 400;
const CELL_WIDTH = 10;


window.onload = function(){
    setCanvas();
    setItems();
    frameUpdate();
    addKeyEventHandler();
}

function addKeyEventHandler(){
    document.addEventListener("keydown",function(e){
        e.preventDefault();
        switch(e.keyCode){
            case 37 : snake.setDirection(-1,0); break;
            case 38 : snake.setDirection(0,-1); break;
            case 39 : snake.setDirection(1,0); break;
            case 40 : snake.setDirection(0,1); break;
            
        }
    })
}

function setCanvas(){
    canvas = document.createElement('canvas');
    ctx    = canvas.getContext('2d');
    document.getElementsByTagName('body')[0].appendChild(canvas);
    canvas.setAttribute("width", STAGE_WIDTH);
    canvas.setAttribute("height", STAGE_HEIGHT);

    
}

function clearStage(){
    ctx.fillStyle = 'rgb(20,20,20)'; 
    ctx.fillRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
}

function setItems(){
    score = 0;
    snake = new Snake();
    food = new Food();
}

function frameUpdate(){
    setTimeout(frameUpdate, 100);
    clearStage();
    food.show();
    snake.death
    snake.update();
    snake.show();    
    if(snake.eat(food)){
        snake.length += 1;
        food.reset();
        console.log(snake.length)
    }
}


