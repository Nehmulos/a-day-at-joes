function Actor(name) {
    Actor.superclass.constructor.call(this);
    this.speed = 3;
    this.contentSize.width = 20;
    this.contentSize.height = 20;
    
    this.boxSprite = new BoxSprite();
    this.boxSprite.zOrder = 2;
    this.addChild(this.boxSprite);
    
    this.name = name || "Bob";
}

Actor.inherit(PhysicsNode, {
    blockSight: true,

    defaultCreatePhysics:function(world) {
        this.createPhysics(world, {fixedRotation: true, damping:4});
        //this.moveTowards({x: this.position.x+1, y: this.position.y+1});
    },

    moveTowards: function(position) {
        //console.log(position);
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
            
            if (this.position.x != position.x || 
                this.position.y != position.y) {
                
                this.body.SetPosition(new b2Vec2(position.x/PhysicsNode.physicsScale, position.y/PhysicsNode.physicsScale));
                this.body.SetLinearVelocity(new b2Vec2(0,0));
            }
        } else {
            // move
            if (position.x > this.position.x + deltaX) {
            } else if (position.x < this.position.x - deltaX) {
                deltaX *=-1.0;                
            } else {
                deltaX = 0.0;
            }
            if (position.y > this.position.y + deltaY) {
            } else if (position.y < this.position.y - deltaY){
                deltaY *= -1.0;
            } else {
                deltaY = 0.0;
            }

            // things can get stuck when velocity is set to 0,0
            // give em a flick to fix it
            var vel = this.body.GetLinearVelocity();
            if (vel.x != 0 || vel.y != 0) {
                this.body.ApplyImpulse(
                    new b2Vec2(0.001/PhysicsNode.physicsScale,
                               0.001/PhysicsNode.physicsScale),
                    this.body.GetWorldCenter()
                );
            }
            
            this.body.SetLinearVelocity(new b2Vec2(deltaX,deltaY));
        }
        // may enable rotation
        //this.body.SetAngle(Utils.rotationToPoint(this.position, position));
    },
    
    update: function(dt) {
        Actor.superclass.update.call(this, dt);
        var vel = this.body.GetLinearVelocity();
        if (vel.x != 0 || vel.y != 0) {
            if (null == this.boxSprite.getAction({tag:"walk"})) {
                this.boxSprite.runAction(this.boxSprite.walkAnimation);
                Audiomanager.instance.play("walk" + Math.floor(randomInRange(1,5)));
            }
        }
    },
    
    say: function(text) {
        if (text && text.length > 0) {
            Application.instance.game.chat.say(this, text);
            this.boxSprite.runAction(this.boxSprite.talkAnimation);
        }
    }
});

function BoxSprite() {
    BoxSprite.superclass.constructor.call(this);
    this.contentSize.width = 20;
    this.contentSize.height = 20;
    this.color = "black";
    
    var stepUp = new cc.ScaleTo({duration: 0.4, scaleX:0.6, scaleY: 1.6});
    var stepDown = new cc.ScaleTo({duration: 0.4, scaleX:1, scaleY: 1});
    this.walkAnimation = new cc.Sequence({actions:[stepUp, stepDown]});
    this.walkAnimation.tag = "walk";
    
    this.talkAnimation = new cc.Sequence({actions:[stepUp, stepDown]});
    this.talkAnimation.tag = "talk";
    //this.runAction(new cc.RepeatForever(this.walkAnimation));
}

BoxSprite.inherit(cc.Node, {

    draw: function(context) {
        context.fillStyle = this.color;
        context.fillRect(
            this.position.x - this.contentSize.width/2,
            this.position.y - this.contentSize.height/2,
            this.contentSize.width,
            this.contentSize.height
        );
    },
    
});

