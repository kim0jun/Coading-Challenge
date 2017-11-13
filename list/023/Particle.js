class Particle{
    constructor(x,y){
        this.pos = new Vector(x,y);
        this.prevPos = new Vector(x,y);
        this.vel = new Vector(0,0);
        this.acc = new Vector(0,0);
        this.maxSpeed = 0;
    }

    update(){ 
        this.vel.add(this.acc);
        this.vel.limit(1);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    applyForce(force){
        this.acc.add(force);
    }

    follow(vectors){
        let _x     = Math.floor(this.pos.x/scl)
        let _y     = Math.floor(this.pos.y/scl)
        let _index = _x + _y * cols;
        let _force  = vectors[_index];
        this.applyForce(_force);

    }

    show(){
        ctx.fillStyle = "rgba(0,0,0,0.03)";
        ctx.moveTo(this.pos.x,this.pos.y)
        ctx.lineTo(this.prevPos.x,this.prevPos.y)
        ctx.fillRect(this.pos.x,this.pos.y,1,1);
    }

    updatePrev(){
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    edge(){
        if(this.pos.x<0) this.pos.x      = width;
        if(this.pos.x>width) this.pos.x  = 0;
        if(this.pos.y<0) this.pos.y      = height;
        if(this.pos.y>height) this.pos.y = 0;
    }
}


class Vector{
    constructor(x,y,z){
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }

    add(vector){
        vector = typeof vector === "object" ?  vector : new Vector(vector,vector,vector);
        this.x += vector.x || 0;
        this.y += vector.y || 0;
        this.z += vector.z || 0;
    }

    mult(vector){
        vector = typeof vector === "object" ?  vector : new Vector(vector,vector,vector);
        this.x *= vector.x || 0;
        this.y *= vector.y || 0;
        this.z *= vector.z || 0;
    }

    limit(num){
        this.x = Math.max(Math.min(num,this.x),-num);
        this.y = Math.max(Math.min(num,this.y),-num);
    }
    

}