
const STAGE_WIDTH  = 400;
const STAGE_HEIGHT = 400;
var cell_w  = 20 ;
var cell_h  = 20 ;
var cell_length = 10;
var grid = [];
var stack = [];
var current,next,prev,col_length,row_length



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
    ctx.fillStyle = 'rgb(51,51,51)'; 
    ctx.fillRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
}

function setItems(){
    col_length = Math.floor(STAGE_WIDTH/cell_w);
    row_length = Math.floor(STAGE_HEIGHT/cell_h);
    


    for(var i=0;i<col_length;i++)
        for(var j=0;j<row_length;j++)
         grid.push(new Cell(j,i,cell_w,cell_h));
    
    current = grid[0];
}

function draw(){
    setTimeout(draw, 20);
    clearStage();

    current.visited = true;
    next = current.checkNeigbors();
    grid.forEach((cell,i)=>{
        ctx.strokeStyle = "white";
        ctx.fillStyle   = 'rgb(200,50,50)';
        ctx.lineWidth   = 1;
        cell.show();
    })
    if(next){
        stack.push(current);
        prev = current;
        current = next;
        
    }else{
        prev = current;
        if(stack.length > 0)current = stack.pop();
    }
    
}

function getIndex(i,j){
    if(i<0 || j<0 || i>=row_length || j>=col_length) return -1;
    else  return i+j*col_length;
}
