var Tree = function(){
    this.leaves = [];
    this.branches = [];

    for(var i=0;i<500;i++){
        this.leaves.push(new Leaf());
    }

    var pos = createVector(width/2,height)
    var dir = createVector(0,-1)
    var root = new Branch(null,pos,dir);
    var current = root;
    var found = false;


    this.branches.push(root);
    
    while (!found){
        for(var i=0;i<this.leaves.length;i++){
            var d = dist(current.pos,this.leaves[i].pos);
            if(d<max_dist){
                found = true;
            }
        }

        if(!found){
            var branch = current.next();
            current = branch;
            this.branches.push(current);
        }
    }

    this.grow = function(){
        for(var i=0;i<this.leaves.length;i++){
            var leaf = this.leaves[i];

            // v
            var closestBranch = null
            var record = 10000
            for(var j=0;j<this.branches.length;j++){
                var branch = this.branches[j]
                d = dist(leaf.pos,branch.pos);
                if(d<min_dist){
                    leaf.reached  = true; 
                    closestBranch = null ;
                    // break;
                }else if(d<record){
                    closestBranch = branch;
                    record = d;
                }
            }
            
            if(closestBranch != null){
                var newDir = sub(leaf.pos,closestBranch.pos)
                newDir.normalize();
                closestBranch.dir = add(closestBranch.dir,newDir);
                closestBranch.count++
            }
            
        }

        for(var i = 0;i<this.leaves.length;i++){
            if(this.leaves[i].reached == true) this.leaves.splice(i,1)
        }

        for(var i = this.branches.length-1;i>= 0;i--){
            var _branch = this.branches[i]
            if(_branch.count>0){
                _branch.dir  = div(_branch.dir,_branch.count+1)
                this.branches.push(_branch.next());   
            }
            _branch.reset();
        }
    }

    this.show = function(){
        for(var i=0;i<this.leaves.length;i++){
            this.leaves[i].show();
        }

        for(var i=0;i<this.branches.length;i++){
            ctx.moveTo(root.pos.x,root.pos.y)
            this.branches[i].show();
        }   
    }
    
}