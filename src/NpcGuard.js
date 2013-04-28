function NpcGuard() {
    NpcGuard.superclass.constructor.call(this);
    this.bumpLines = []; // say when player bumps into
    this.bumpMessageTimer = 0;
    this.viewCone = new ViewCone();
    this.addChild(this.viewCone);
}

NpcGuard.inherit(Npc, {

    defaultCreatePhysics: function(world) {
        NpcGuard.superclass.defaultCreatePhysics.call(this, world);
        this.viewCone.fixture = this.body.GetFixtureList();
        this.viewCone.body = this.body;
    },

    update: function(dt) {
        NpcGuard.superclass.update.call(this, dt);
        this.viewCone.update(dt);
    },
    
    onPlayerInView: function() {
        console.log("see ya");
    }
});

function ViewCone(fixture) {
    ViewCone.superclass.constructor.call(this);
    this.nodes = [];
    this.angle = 45;
    this.tests = 10;
    this.distance = 200/PhysicsNode.physicsScale
}

ViewCone.inherit(cc.Node, {
    update: function() {
        ViewCone.superclass.constructor.call(this);
        this.nodes = [];

        var p1 = new b2Vec2(this.body.GetWorldCenter().x,
        this.body.GetWorldCenter().y);
        
        var output = new b2RayCastOutput();

        for (var i=0; i < this.tests+1; ++i) {
        
            var closestFraction = 1.0;
            var rot = this.angle * (i/this.tests);
            var p2 = Utils.pointOnCircle(p1,this.distance,rot);
            
            // test for all bodies
            
            var input = new b2RayCastInput();
            input.p1 = p1;
            input.p2 = new b2Vec2(p2.x, p2.y);
            input.maxFraction = closestFraction;
            
            for (var b = this.body.m_world.GetBodyList(); b; b=b.m_next) {
                if (b == this.body) {
                    continue;
                }
            
                for (var f = b.GetFixtureList(); f; f=f.m_next) {
                    
                    if (f.RayCast(output, input) &&
                        output.fraction < closestFraction
                    ) {
                        closestFraction = output.fraction;
                        console.log("closer");
                    }
                }
            }
            
            /*this.body.m_world.RayCast(function(fixture, normal, fraction) {
                console.log("call");
            }, p1, p2);
            */
            
            
            this.nodes.push(new cc.Point(
                p1.x - closestFraction * (p1.x - p2.x) - p1.x,
                p1.y - closestFraction * (p1.y - p2.y) - p1.y
            ));
        }
    },
    
    draw: function(context) {
        context.strokeStyle = "rgba(150, 50, 50, 1)";
        context.fillStyle = "rgba(200, 50, 50, 0.3)";
        context.beginPath();
        context.moveTo(0,0);
        for (var i=0; i < this.nodes.length; ++i) {
            context.lineTo(
                this.nodes[i].x*PhysicsNode.physicsScale,
                this.nodes[i].y*PhysicsNode.physicsScale
         );
        }
        context.lineTo(0,0);
        context.fill();
        context.stroke();
    }
});
