function Wall(positionA, positionB, thickness) {
    Wall.superclass.constructor.call(this);
    this.position = new cc.Point((positionA.x+positionB.x)/2, 
                                 (positionA.y+positionB.y)/2);
                                 
    this.contentSize = new cc.Size(thickness || 10,
                                   Math.abs(this.position.y - positionA.y)*2);
     
    var xDiff = Math.abs(this.position.x - positionB.x);
    var yDiff = Math.abs(this.position.y - positionB.y);
    var degmod;
    if (yDiff > xDiff) {
        this.contentSize = new cc.Size(thickness || 10, yDiff*2);
        degmod = 0;
    } else {
        this.contentSize = new cc.Size(xDiff*2, thickness || 10);
        degmod = 90;
    }
    
    this.rotation = Utils.degreesToPoint(positionA, positionB) - degmod;
}

Wall.inherit(PhysicsNode, {
    blockSight: true,

    defaultCreatePhysics:function(world) {
        this.createPhysics(world,{isStatic:true});
    },
    
    draw: function(context) {
        /*
        context.beginPath();
        context.lineWidth = 20;
        context.moveTo(0, 0);
        context.lineTo(0, 0);
        context.stroke();
        */
        
        context.fillStyle = "black";
        context.fillRect(
            -this.contentSize.width/2,
            -this.contentSize.height/2,
            this.contentSize.width,
            this.contentSize.height
        );
    }
});

Wall.createWallsFromLine = function(nodes) {
    if (nodes.length <= 1) {
        return [];
    }
    
    var walls = [];
    var lastPos = nodes[0];
    for (var i=1; i < nodes.length; ++i) {
        var node = nodes[i];
        var wall = new Wall(lastPos, node);
        wall.defaultCreatePhysics();
        walls.push(wall);
    }
    return walls;
}
