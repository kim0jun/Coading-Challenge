/****************************************
 * ARSlider ;
 * 
 * Copyright (c) 2017, AnotherRainbow Incorporated.
 * All rights reserved.
*************************************************************/

(function(global){
    //Style Initialize
    var css = `
        #ui-slider              {position: relative;width:150px;height:14px;margin-bottom: 5px;}
		.slider 				{position:absolute;}
		.slider-bg				{position:absolute; top:50%;height: 7px; margin: -3.5px;border-radius: 3.5px;background: #ccc;box-shadow:  inset 0 0 2px #000000;}
		.slider-ball-container  {position:absolute; width:140px; height:100%;left:0%;top:0%;pointer-events:none;}
		.slider-ball 			{position:absolute; border: 1px solid #999;;background: #ddd}
		.slider-hit-area		{position:absolute; width:100%; height:100%;left:0%;top:0%;cursor:pointer;}`,
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    style.type = 'text/css';

    if (style.styleSheet){
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);

    //Module Initialize
    global.ARSlider = function(opts){
        var self = this;
        this.opts = opts;
        this.percent = 0;
        this.value = 0;
        //생성
        this.init = function(){
            var _width = document.querySelector("#"+self.opts.id).offsetWidth;

            document.querySelector("#"+self.opts.id).innerHTML =`
                <div class="slider-bg"></div>
                <div class="slider-ball-container">
                    <div class="slider-ball" ></div>
                </div>
                <div class="slider-hit-area"></div>
            `

            addStyle.call(document.querySelector("#"+self.opts.id+" .slider-bg"),{"width":_width-this.opts.ballRadius*2+"px","left":this.opts.ballRadius+"px"})
            addStyle.call(document.querySelector("#"+self.opts.id+" .slider-ball-container"),{"width":_width-this.opts.ballRadius*2+"px"});
            addStyle.call(document.querySelector("#"+self.opts.id+" .slider-ball"),{"width":opts.ballRadius*2+"px","height":opts.ballRadius*2+"px","border-radius": opts.ballRadius+"px"})
            this.addEventListener();
        }
        //초기화
        this.reset = function(){
            this.percent = 0;

            if(self.opts.update)self.opts.update(0);
            addStyle("#"+self.opts.id+" .slider-ball",{"left":0})
        }
        //이벤트추가
        this.addEventListener = function(){
            document.querySelector("#"+this.opts.id+" .slider-hit-area").addEventListener("mousedown",this.onMouseDownHandler)
        }

        this.onMouseDownHandler = function(e){
            e.preventDefault();
            document.querySelector("#"+self.opts.id+" .slider-hit-area").addEventListener("mousemove",self.onMouseMoveHandler)
            document.addEventListener("mouseup",self.onMouseUpHandler)
            if(opts.onMouseDown) opts.onMouseDown();
            self.updateSlider(e)
        }

        this.onMouseMoveHandler = function(e){
            e.preventDefault();
            self.updateSlider(e)
        }

        this.onMouseUpHandler = function(e){
            e.preventDefault();
            document.querySelector("#"+self.opts.id+" .slider-hit-area").removeEventListener("mousemove",self.onMouseMoveHandler)
            document.removeEventListener("mouseup",self.onMouseUpHandler)
        }

        this.updateSlider = function(e){
            var _currentX 	  = Math.max(e.pageX-e.currentTarget.offsetLeft-e.currentTarget.offsetParent.offsetLeft-e.currentTarget.offsetParent.offsetParent.offsetLeft,self.opts.ballRadius);
            var _currentWdith = e.currentTarget.offsetWidth-self.opts.ballRadius*2;
            self.percent	  = ((_currentX-self.opts.ballRadius)/_currentWdith*100).toFixed(0);
            //최소0 최대100이 되도록 보정
            self.percent      = Math.max(Math.min(100,self.percent),0);
            this.value = Math.min(self.percent/100,1);
            addStyle.call(document.querySelector("#"+self.opts.id+" .slider-ball"),{"left":self.percent+"%"})
            if(self.opts.update)self.opts.update(this.value);
        }

        //function 
        function addStyle(styleObj){
            for(styleNs in styleObj){
                this.style[styleNs] = styleObj[styleNs]
            }
        }

        this.init();
    }
})(this);
