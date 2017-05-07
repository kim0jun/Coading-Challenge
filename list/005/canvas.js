const STAGE_WIDTH  = 480;
const STAGE_HEIGHT = 400;
var canvas,ctx,ship,flowers;
var drops = [];



window.onload = function(){
    setCanvas();
    setItems();
    addKeyEventHandler();
    draw();
}

function addKeyEventHandler(){
    document.addEventListener("keydown",function(e){
        e.preventDefault();
        switch(e.keyCode){
            case 32 : drops.push(new Drop(ship.x+ship.width/2,ship.y));break;
            //방향키 좌,상,우,하 
            case 37 : ship.move(-1,0); break;
            case 38 : ship.move(0,-1); break;
            case 39 : ship.move(1,0); break;
            case 40 : ship.move(0,1); break;
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
    ctx.fillStyle = 'rgb(30,30,30)'; 
    ctx.fillRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
}

function setItems(){
    ship = new Ship();
    drop = new Drop(STAGE_WIDTH/2,STAGE_HEIGHT);
    flowers = [];
    for(var i = 0 ; i<6; i++){
        flowers[i] = new Flower(60+60*i);
    }
}

function draw(){
    setTimeout(draw, 40);
    clearStage();
    ship.show(); 
    drops.forEach((drop)=>{
        var _hit = false;
        drop.move();
        for(var i = 0; i<flowers.length;i++){
            if(hitCircleToCircle(drop,flowers[i])){
                drop.remove();
                flowers[i].grow();
                _hit = true;
            }
        }
        if(!_hit)drop.show();
    })
    var _hitEdge = flowers.reduce((p,c)=>p||c.x>STAGE_WIDTH||c.x<0,false);
    flowers.forEach((flower)=>{if(_hitEdge)flower.shiftDown();flower.move();flower.show();})
    
}

//============================================================

  //* UTILS */

//============================================================
function random(start,end){
    return (end-start)*Math.random() + start;
}

function map(value,start0,end0,start1,end1){
    return start1 + (end1-start1)*(value-start0)/(end0-start0);
}

function hitCircleToCircle(a,b){
    return a.radius+b.radius >=  Math.sqrt(Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2));
}