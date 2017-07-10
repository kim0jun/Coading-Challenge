var canvas,ctx

var width = 400;
var height = 400;
var angle = Math.PI/6;
var len = 100;
var tree = []
var sentence = "F"
var rule = {
    a : "F",
    b : "FF+[+F-F-F]-[-F+F+F]"
};

document.addEventListener("DOMContentLoaded",()=>{
    console.log("ready");
    setup();
    draw();
})

document.addEventListener('click',generate)

function setup(){
     canvas = document.createElement('canvas');
     ctx = canvas.getContext('2d');

     canvas.setAttribute("width",width);
     canvas.setAttribute("height",height);

     document.getElementsByTagName('body')[0].appendChild(canvas);


}
depth = 0;
function generate(){
    nextSentence  = '';
    for(var i = 0 ; i<sentence.length;i++){
        var _this = sentence.charAt(i);
            if(_this  == rule.a){
                nextSentence += rule.b;
            }else{
                nextSentence += _this
            }
    }
    sentence = nextSentence;
    
    turtle();
}

function turtle(){
    len *= 0.5
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    draw();
    ctx.fillRect(0,0,width,height);
    ctx.translate(width/2,height);
    for(var i = 0 ; i<sentence.length;i++){
        var _this = sentence.charAt(i);
        
        switch(_this){
            case "F":
                ctx.strokeStyle = "rgba(255,255,255,30)"
                ctx.beginPath();
                ctx.moveTo(0,0);
                ctx.lineTo(0,-len);
                ctx.translate(0,-len);
                ctx.stroke();
                ctx.closePath();
                break;
            case "-": ctx.rotate(-angle)
                break;
            case "+": ctx.rotate(angle)
                break;
            case "[": ctx.save();
                break;
            case "]": ctx.restore();
                break;
        }
    }
    
}

function draw(){
    
    ctx.fillStyle = "#424242";
    ctx.fillRect(0,0,width,height);
    
}

function createVector(x,y){
    return{
        x: x,
        y: y
    }
}