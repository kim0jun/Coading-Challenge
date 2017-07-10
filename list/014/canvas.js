var canvas,ctx

var width = 400;
var height = 400;
var angle = 0;
var mosaicScale = 1;
document.addEventListener("DOMContentLoaded",()=>{
    console.log("ready");
    setup();
    draw();
})

function setup(){
     canvas = document.createElement('canvas');
     slider = document.createElement('div');
     ctx = canvas.getContext('2d');

     canvas.setAttribute("width",width);
     canvas.setAttribute("height",height);
     slider.setAttribute("id","ui-slider");

     document.getElementsByTagName('body')[0].appendChild(canvas);
     document.getElementsByTagName('body')[0].appendChild(slider);

         

    new ARSlider({id:"ui-slider",ballRadius:7,update:function(value){
        angle = Math.PI*value;
    }})
}

function draw(){
    ctx.fillStyle = "#fff";
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillRect(0,0,width,height);
    ctx.translate(width/2,height);

    

    brench(100);
    requestAnimationFrame(draw);
}

function brench(len){
    // ctx.strokeStyle = (len > 10)? "#000":"#d55"
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0,-len);
    ctx.translate(0,-len);
    ctx.stroke();
    ctx.closePath();
    

    if(len>4){
        ctx.save();
        ctx.rotate(angle);
        brench(len * 0.7);
        ctx.restore();
        ctx.save();
        ctx.rotate(-angle);
        brench(len * 0.7);
        ctx.restore();
    }
    
    
    
}

angleSpeed = 0.05;

// setInterval(function(){
//     angle += angleSpeed;
//     if(angle >  Math.PI || angle < 0 ) angleSpeed = -angleSpeed;
// },50)

