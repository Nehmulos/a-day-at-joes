function Actor() {
    Actor.superclass.constructor.call(this);
    this.speed = 3;
    this.contentSize.width = 20;
    this.contentSize.height = 5;
    
    var boxSprite = new BoxSprite();
    this.addChild(boxSprite);
}

Actor.inherit(PhysicsNode, {

    defaultCreatePhysics:function(world) {
        this.createPhysics(world, {});
    },

    moveTowards: function(position) {
        var xDistance = Math.abs(position.x - this.position.x);
        var yDistance = Math.abs(position.y - this.position.y);
        
        var xStepsRequired = xDistance / this.speed;
        var yStepsRequired = yDistance / this.speed;
        
        var deltaX = this.speed;
        var deltaY = this.speed;
        
        if (xStepsRequired > yStepsRequired && yStepsRequired != 0) {
            deltaY *= yStepsRequired/xStepsRequired;
        } else if (yStepsRequired > xStepsRequired && xStepsRequired != 0) {
            deltaX *= xStepsRequired/yStepsRequired;
        }
        
        if (xDistance < this.speed &&
            yDistance < this.speed) {
            
            //this.position.x = position.x;
            //this.position.y = position.y;
            
            //this.body.SetLinearVelocity(new b2Vec2(xDistance,yDistance));
            this.body.SetPosition(new b2Vec2(position.x/PhysicsNode.physicsScale, position.y/PhysicsNode.physicsScale));
        } else {
            // move
            if (position.x > this.position.x + deltaX) {
            } else if (position.x < this.position.x - deltaX) {
                deltaX *=-1;                
            } else {
                deltaX = 0;
            }
            if (position.y > this.position.y + deltaY) {
            } else if (position.y < this.position.y - deltaY){
                deltaY *= -1;
            } else {
                deltaY = 0;
            }
            //this.body.ApplyForce(new b2Vec2(deltaX/PhysicsNode.physicsScale,deltaY/PhysicsNode.physicsScale), this.body.GetWorldCenter());
            this.body.SetLinearVelocity(new b2Vec2(deltaX,deltaY));
            //console.log(this.body.GetLinearVelocity());
        }
        
    },

});

function BoxSprite() {
    BoxSprite.superclass.constructor.call(this);
    this.contentSize.width = 20;
    this.contentSize.height = 5;
    
    var stepUp = new cc.ScaleTo({duration: 0.4, scaleX:0.5, scaleY: 2});
    var stepDown = new cc.ScaleTo({duration: 0.4, scaleX:1, scaleY: 1});
    this.walkAnimation = new cc.Sequence({actions:[stepUp, stepDown]});
    this.runAction(new cc.RepeatForever(this.walkAnimation));
}

BoxSprite.inherit(cc.Node, {

    draw: function(context) {
        context.beginPath();
        context.lineWidth = 20;
        context.moveTo(this.position.x,this.position.y);
        context.lineTo(this.position.x,this.position.y+5);
        context.stroke();
    }
});

