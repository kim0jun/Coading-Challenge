var canvas,ctx,img

var width  = 512;
var height = 512;


var time   = 0 ;


var circles = [];
var spots   = [];
let textImageData = undefined;


document.addEventListener("DOMContentLoaded",()=>{
    console.log("ready");
    img = new Image();
    img.onload = ()=>{
        setup();
        draw();
    };
    img.src = "photo.jpeg"
    img.crossOrigin = "Anonymous";
    
})

function setup(){
     canvas = document.createElement('canvas');
     ctx = canvas.getContext('2d');

     canvas.setAttribute("width",width);
     canvas.setAttribute("height",height);

     document.getElementsByTagName('body')[0].appendChild(canvas);

     getTextImageData();
     
     
    
    // document.querySelector('body').appendChild(img);
}

function getTextImageData(){
    var _canvas = document.createElement('canvas');
    var _ctx = _canvas.getContext('2d');
    _ctx.fillStyle = "#000";
    _ctx.rect(0,0,width,height);
    _ctx.fill();

    _canvas.setAttribute("width",width);
    _canvas.setAttribute("height",height);
    console.log(img.width);
    _ctx.drawImage(img, 0, 0, img.width/2, img.height/2
                      , 0, 0, width, height);

    textImageData = _ctx.getImageData(0,0,width,height);
    ctx.putImageData(textImageData,0,0);
    for(var y=0;y<height;y++){
         for(var x=0;x<width;x++){
             var _index = x*4+y*width*4;
             let _r = textImageData.data[_index];
             let _g = textImageData.data[_index+1];
             let _b = textImageData.data[_index+2];
             let _a= textImageData.data[_index+3];
             if(_r+_g+_b != 0) spots.push({x:x,y:y});
         }
     }
}



function draw(){
    
    ctx.fillStyle = "#000";
    ctx.rect(0,0,width,height);
    ctx.fill();
    // newCircle();
    // ctx.drawImage(img,0,0)
    let _total = 0;
    let _count = 0;
    while(_total < 50 && _count < 200){
        var _newC = newCircle();
        if(_newC != undefined){
            circles.push(_newC);
            _total += 1;
        }
        ++_count;
    }
    

    for(var i=0;i<circles.length;i++){
        var _circle = circles[i];
        var _stop = false;
        _circle.collision(circles);
        _circle.update();
        _circle.show();   
    }

    
    if(_count>=500){
        console.log("is full");
    }else{
        
        setTimeout(function(){
            requestAnimationFrame(draw);
        },30)
    }
    
}



function newCircle(){
    let _r = spots[Math.floor(spots.length*Math.random())];
    let _x = Math.floor(width*Math.random());
    let _y = Math.floor(height*Math.random());
    
    let _i = _x*4+_y*width*4;
    let __r = textImageData.data[_i];
    let __g = textImageData.data[_i+1];
    let __b = textImageData.data[_i+2];

    var _collsion = false;
    circles.forEach(function(circle) {
        let _dist = Math.sqrt(Math.pow(_x - circle.x,2)+Math.pow(_y - circle.y,2));
        if(circle.r+2>_dist){
            _collsion = true;
        }
    },this);
    if(!_collsion)
        return new Circle(_x,_y,__r,__g,__b);
    else
        return undefined;
}


