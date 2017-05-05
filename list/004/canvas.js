var canvas,ctx,waterDrops;
const STAGE_WIDTH  = 640;
const STAGE_HEIGHT = 360;
const WATER_LENGTH = 300;


window.onload = function(){
    setCanvas();
    setItems();
    draw();
}

function setCanvas(){
    canvas = document.createElement('canvas');
    ctx    = canvas.getContext('2d');
    document.getElementsByTagName('body')[0].appendChild(canvas);
    canvas.setAttribute("width", STAGE_WIDTH);
    canvas.setAttribute("height", STAGE_HEIGHT);   
}

function clearStage(){
    ctx.fillStyle = 'rgb(230,230,250)'; 
    ctx.fillRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
}

function setItems(){
    waterDrops = [];
    for(var i = 0; i < WATER_LENGTH; i++){
        waterDrops.push(new WaterDrop());
    }
}

function draw(){
    setTimeout(draw, 40);
    clearStage();
    waterDrops.forEach(function(WaterDrop) {
        WaterDrop.fall();
        WaterDrop.show();
    }, this);
}


function random(start,end){
    return (end-start)*Math.random() + start;
}

function map(value,start0,end0,start1,end1){
    return start1 + (end1-start1)*(value-start0)/(end0-start0);
}