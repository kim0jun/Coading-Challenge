var canvas,ctx

var width = 400;
var height = 400;
var angle = 0;
var mosaicScale = 1;
var tree = [];
var fruits = [];
var depth = 0;

document.addEventListener("DOMContentLoaded",()=>{
    console.log("ready");
    setup();
    draw();
})

document.addEventListener('click',addBranch)

function setup(){
     canvas = document.createElement('canvas');
     ctx = canvas.getContext('2d');

     canvas.setAttribute("width",width);
     canvas.setAttribute("height",height);

     document.getElementsByTagName('body')[0].appendChild(canvas);

     var start = createVector(width/2,height)
     var end = createVector(width/2,height-100)

     var root = new Branch(start,end)
     tree.push(root)

}

function addBranch(){
    if(depth < 5){
        var _count = Math.pow(2,depth);
        var _start = tree.length-_count;
        for(var i=0;i<_count;i++){
            var _this = tree[_start+i]
            a = _this.branchA();
            b = _this.branchB();
            tree.push(a);
            tree.push(b);
        }
        depth++;
    }else{
        var _count = Math.pow(2,depth);
        var _start = tree.length-_count;
        for(var i=0;i<_count;i++){
            var _this = tree[_start+i]
            var _fruit = _this.fruit();
            fruits.push(_fruit)
        }
    }
    
}

function draw(){
    
    ctx.fillStyle = "#424242";
    ctx.fillRect(0,0,width,height);
    tree.forEach((tree)=>{
        tree.show();
    })

    fruits.forEach((fruit)=>{
        
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,155,100,0.5)"
        ctx.arc(fruit.x,fruit.y,5,0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
        fruit.y += Math.random()*2;
        if(fruit.y > height+10) fruits = fruits.filter((a)=>a!=fruit);
    })
    requestAnimationFrame(draw);
}

function createVector(x,y){
    
    return{
        x: x,
        y: y
    }
}