
const STAGE_WIDTH  = 480;
const STAGE_HEIGHT = 300;
const WATER_LENGTH = 300;
var canvas,ctx;
var cells = [];


window.onload = function(){
    setCanvas();
    setItems();
    addKeyEventHandler();
    draw();
}

function addKeyEventHandler(){
    // document.addEventListener("click",mousePressed);
}

function setCanvas(){
    canvas = document.createElement('canvas');
    ctx    = canvas.getContext('2d');
    document.getElementsByTagName('body')[0].appendChild(canvas);
    canvas.setAttribute("width", STAGE_WIDTH);
    canvas.setAttribute("height", STAGE_HEIGHT);   
}

function clearStage(){
    ctx.fillStyle = 'rgb(0,0,0)'; 
    ctx.fillRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
}

function setItems(){
    while(cells.length<10){
        cells.push(new Cell());
    }
    
}

function draw(){
    setTimeout(draw, 40);
    clearStage();
    cells.forEach(function(cell){
        cell.move();
        cell.show();
    })
}


//action

function mousePressed(e){
    var _mouseX = e.clientX;
    var _mouseY = e.clientY;
    
    // cells.forEach(cell=>{
    //     var _dist = Math.sqrt(Math.pow(cell.x-_mouseX,2))+Math.sqrt(Math.pow(cell.y-_mouseY,2));
    //     if(_dist<cell.radius)
    //         cells.push(cell.clicked());
    // })
    for(var i=cells.length;i > 0;i--){
        var cell = cells[i-1];
        var _dist = Math.sqrt(Math.pow(cell.x-_mouseX,2))+Math.sqrt(Math.pow(cell.y-_mouseY,2));
        if(_dist<cell.radius){
            cell.clicked()
            cells.push(cell.clicked());
        }
    }
}