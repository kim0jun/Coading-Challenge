function ARSlider(opts){
    var self = this;
    this.opts = opts;
    this.percent = 0;
    this.value = 0;
    //생성
    this.init = function(){
        var _width = $("#"+self.opts.id).width();

        $("#"+self.opts.id).html(
            `
            <div class="slider-bg"></div>
            <div class="slider-ball-container">
                <div class="slider-ball" ></div>
            </div>
            <div class="slider-hit-area"></div>
            `
        )

        $("#"+self.opts.id+" .slider-bg").css({"width":_width-this.opts.ballRadius*2+"px","left":this.opts.ballRadius+"px"})
        $("#"+self.opts.id+" .slider-ball-container").css({"width":_width-this.opts.ballRadius*2+"px"});
        $("#"+self.opts.id+" .slider-ball").css({"width":opts.ballRadius*2+"px","height":opts.ballRadius*2+"px","border-radius": opts.ballRadius+"px"})
        this.addEventListener();
    }
    //초기화
    this.reset = function(){
        this.percent = 0;

        if(self.opts.update)self.opts.update(0);
        $("#"+self.opts.id+" .slider-ball").css({"left":0})
    }
    //이벤트추가
    this.addEventListener = function(){
        $("#"+this.opts.id+" .slider-hit-area").on("mousedown",this.onMouseDownHandler)
    }

    this.onMouseDownHandler = function(e){
        e.preventDefault();
        $("#"+self.opts.id+" .slider-hit-area").on("mousemove",self.onMouseMoveHandler)
        $(document).on("mouseup",self.onMouseUpHandler)
        if(opts.onMouseDown) opts.onMouseDown();
        self.updateSlider(e)
    }

    this.onMouseMoveHandler = function(e){
        e.preventDefault();
        self.updateSlider(e)
    }

    this.onMouseUpHandler = function(e){
        e.preventDefault();
        $("#"+self.opts.id+" .slider-hit-area").off("mousemove",self.onMouseMoveHandler)
        $(document).off("mouseup",self.onMouseUpHandler)
    }

    this.updateSlider = function(e){
        var _currentX 	  = Math.max(e.pageX-e.currentTarget.offsetLeft-e.currentTarget.offsetParent.offsetLeft-e.currentTarget.offsetParent.offsetParent.offsetLeft,self.opts.ballRadius);
        var _currentWdith = e.currentTarget.offsetWidth-self.opts.ballRadius*2;
        self.percent	  = ((_currentX-self.opts.ballRadius)/_currentWdith*100).toFixed(0);
        //최소0 최대100이 되도록 보정
        self.percent      = Math.max(Math.min(100,self.percent),0);
        this.value = Math.min(self.percent/100,1);
        $("#"+self.opts.id+" .slider-ball").css({"left":self.percent+"%"});
        if(self.opts.update)self.opts.update(this.value);
    }

    this.init();
}