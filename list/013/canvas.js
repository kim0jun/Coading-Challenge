var _canvas,_ctx;
var _grid = [];
var _next = [];

var STAGE_WIDTH = 200;
var STAGE_HEIGHT = 200;


var dA = 1;
var dB = 0.5;
var feed = 0.055;
var k = 0.062;

document.addEventListener("DOMContentLoaded",function(){
    createCanvas();
    setup();
    draw();
})

function createCanvas(){
    _canvas = document.createElement('canvas');
    _canvas.setAttribute("width",STAGE_WIDTH);
    _canvas.setAttribute("height",STAGE_HEIGHT);
    _ctx    = _canvas.getContext('2d');
    document.getElementsByTagName('body')[0].appendChild(_canvas);
}

function setup(){
    for(var x = 0;x < STAGE_WIDTH; x++){
        _grid[x] = [];
        _next[x] = [];
        for(var y= 0; y< STAGE_HEIGHT; y++){
            _grid[x][y] = {a:1,b:0};
            _next[x][y] = {a:1,b:0};
        }
    }
    for(var i = 95; i< 95+10; i++){
        for(var j = 95; j< 95+10; j++){
            _grid[i][j].b = 1;
        }   
    }
}

function draw(){
    
    _ctx.fillStyle = '#fff';
    _ctx.fillRect(0,0,STAGE_WIDTH,STAGE_HEIGHT);
    for(var x = 1; x < STAGE_WIDTH-1; x++){
        for(var y = 1; y < STAGE_HEIGHT-1; y++){
            var a = _grid[x][y].a;
            var b = _grid[x][y].b; 
            _next[x][y].a = a +
                            (dA * laplaceA(x,y)) -
                            (a * b * b) +
                            (feed * (1 -a));
            _next[x][y].b = b +
                            (dB * laplaceB(x,y)) +
                            (a * b * b) -
                            ((k+feed) *b);

            _next[x][y].a = constrain(_next[x][y].a,0,1);
            _next[x][y].b = constrain(_next[x][y].b,0,1);
        }
 
    }


    _imgData = _ctx.getImageData(0,0,STAGE_WIDTH,STAGE_HEIGHT);
    
    for(var x = 0;x < STAGE_WIDTH; x++){
        for(var y= 0; y< STAGE_HEIGHT; y++){
            var pix = (x+ y *STAGE_WIDTH)*4;
            var a = _next[x][y].a;
            var b = _next[x][y].b;
            var c =   Math.floor((a - b) * 255);
            c = constrain(c,0,255);
            _imgData.data[pix + 0] =  c;
            _imgData.data[pix + 1] =  c;
            _imgData.data[pix + 2] =  c ;
            _imgData.data[pix + 3] = 255;
        }
    }
    _ctx.putImageData(_imgData,0,0);
    swap();
    requestAnimationFrame(draw);
}


function laplaceA(x,y){
    var sumA = 0;
    sumA += _grid[x][y].a * -1;
    sumA += _grid[x-1][y].a * 0.2;
    sumA += _grid[x+1][y].a * 0.2;
    sumA += _grid[x][y+1].a * 0.2;
    sumA += _grid[x][y-1].a * 0.2;
    sumA += _grid[x-1][y-1].a * 0.05;
    sumA += _grid[x+1][y-1].a * 0.05;
    sumA += _grid[x-1][y+1].a * 0.05;
    sumA += _grid[x+1][y+1].a * 0.05;
    return sumA;
}

function laplaceB(x,y){
    var sumB = 0;
    sumB += _grid[x][y].b * -1;
    sumB += _grid[x-1][y].b * 0.2;
    sumB += _grid[x+1][y].b * 0.2;
    sumB += _grid[x][y+1].b * 0.2;
    sumB += _grid[x][y-1].b * 0.2;
    sumB += _grid[x-1][y-1].b * 0.05;
    sumB += _grid[x+1][y-1].b * 0.05;
    sumB += _grid[x-1][y+1].b * 0.05;
    sumB += _grid[x+1][y+1].b * 0.05;
    return sumB;
}

function swap(){
    var _temp = _grid;
    _grid = _next;
    _next = _temp;
}

function constrain(v,min,max){
    v = Math.min(v,max);
    v = Math.max(v,min);
    return v;
}