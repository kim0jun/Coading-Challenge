
var random = (start,end,isInteger) => (isInteger)?
    Math.floor(start + (end-start)*Math.random()):
    start + (end-start)*Math.random();
var map = (value,start0,end0,start1,end1) => 
    start1 + (end1-start1)*(value-start0)/(end0-start0);
