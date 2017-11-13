var canvas,ctx

var width = 400;
var height = 400;
// var angle = 0;
var mosaicScale = 1;
var n = 2;
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
        n = value*10;
        draw();
    }})
}

function draw(){
    ctx.fillStyle = "#f0f0f0";
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillRect(0,0,width,height);
    ctx.translate(width/2,height/2);


    var length = 8
    var angle = Math.PI/length;
    var r = 100;
    var a = 100;
    var b = 100;
    

    ctx.fillStyle = "#0bbbbb";
    ctx.strokeStyle = "#0bbbbb";
    ctx.beginPath();
    for(var i = 0; i<Math.PI*2;i+=angle){
        var na = 2/n;
         var _x  = Math.pow(Math.abs(Math.cos(i)),na) * a * Math.sign(Math.cos(i));
         var _y = Math.pow(Math.abs(Math.sin(i)),na) * b * Math.sign(Math.sin(i));

        ctx.lineTo(_x,_y);
        
    }
    ctx.closePath();
    ctx.stroke();
    
}