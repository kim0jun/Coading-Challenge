var canvas,ctx

var width = 400;
var height = 400;
var angle = Math.PI/6;
var len = 100;
var tree ;

var max_dist = 100;
var min_dist = 10;

document.addEventListener("DOMContentLoaded",()=>{
    console.log("ready");
    setup();
    draw();
})

// document.addEventListener('click',generate)

function setup(){
     canvas = document.createElement('canvas');
     ctx = canvas.getContext('2d');

     canvas.setAttribute("width",width);
     canvas.setAttribute("height",height);

     document.getElementsByTagName('body')[0].appendChild(canvas);

     tree = new Tree();
}

function draw(){
    
    ctx.fillStyle = "#424242";
    ctx.fillRect(0,0,width,height);
    tree.show();
    tree.grow();
    requestAnimationFrame(draw);
}


//vectors

function createVector(x,y){
    return{
        x: x,
        y: y
    }
}

function dist(a,b){
    return Math.sqrt(Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2));
}

function add(a,b){
    return{
        x:a.x+b.x,
        y:a.y+b.y
    }
}

function sub(a,b){
    return{
        x:a.x-b.x,
        y:a.y-b.y,
        normalize:function(){
            var z = Math.sqrt(this.x*this.x+this.y*this.y)
            this.x = this.x/z
            this.y = this.y/z
        }
    }
}

function div(a,b){
    return{
        x:a.x/b,
        y:a.y/b 
    }
}

function mult(a,b){
    return{
        x:a.x*b,
        y:a.y*b 
    }
}

function copy(obj){
    return Object.assign({},obj);
}