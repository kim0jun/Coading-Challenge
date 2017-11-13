var canvas,ctx

var width  = 800;
var height = 600;
var scl    = 5;
var cols   = width/scl;
var rows   = height/scl;

var time   = 0 ;
var inc    = 0.1;

var partilces = [];
var flowField = [];

document.addEventListener("DOMContentLoaded",()=>{
    console.log("ready");
    setup();
    draw();
})

function setup(){
     canvas = document.createElement('canvas');
     ctx = canvas.getContext('2d');

     canvas.setAttribute("width",width);
     canvas.setAttribute("height",height);

     document.getElementsByTagName('body')[0].appendChild(canvas);
     noise.seed(Math.random());
     
     for(var i = 0 ; i< 3500; i++){
        var __x = Math.floor(Math.random()*width);
        var __y = Math.floor(Math.random()*height);
        partilces.push( new Particle(__x,__y));
     }

     ctx.fillStyle = "rgba(255,255,255,0.001)";
    // ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillRect(0,0,width,height);
    ctx.fill();
     
}

function draw(){
    
    let yOff = 0;
    for(var y = 0;y<rows;y++){
        let xOff = 0; 
        for(var x = 0;x<cols;x++){
            ctx.beginPath();
            
            let angle = (noise.simplex3(xOff , yOff ,time)+1)*Math.PI;
            let v     = new Vector(Math.cos(angle),Math.sin(angle));
            v.mult(0.05);
            var index = (x+y*cols);
            
            flowField[index] = v;
            ctx.rect(x*scl,y*scl,scl,scl);
            // ctx.fillStyle = "#505050";
            // ctx.fill();
            ctx.closePath();
            xOff += inc;
            ctx.save();
            ctx.strokeStyle ="#000";
            ctx.beginPath();
            ctx.translate(x*scl,y*scl);
            ctx.rotate(angle);
            ctx.moveTo(0,0);
            ctx.lineTo(scl,0);
            
            // ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
        yOff += inc;
    }

    partilces.forEach((particle)=>{
        particle.follow(flowField);
        particle.update();
        particle.show();
        particle.edge();
    })

    // time += 0.005;
    requestAnimationFrame(draw);
}


