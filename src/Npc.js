function Npc(name) {
    Npc.superclass.constructor.call(this, name);
    this.bumpLines = []; // say when player bumps into
    this.patrolPath = [];
    this.patrolNode = null;
    this.patrolReverse = false;
    this.patrolTimer = 0;
    this.bumpMessageTimer = 0;
}

Npc.inherit(Actor, {
    type: "npc",
    update: function(dt) {
        Npc.superclass.update.call(this, dt);
        if (this.bumpMessageTimer > 0) {
            this.bumpMessageTimer -= dt
        }
        
        if (this.follow) {
            var targetDeg = Utils.degreesToPoint(this.follow.position, this.position)
            var target = Utils.pointOnCircle(this.follow.position, this.contentSize.width*3, Math.floor(targetDeg));
            this.moveTowards({x:Math.floor(target.x), y:Math.floor(target.y)});
        }
        
        if (this.patrolPath.length > 0) {
            if (!this.patrolNode) {
                this.patrolNode = this.nextPatrolNode();
            }
            
            this.moveTowards({
                x:Math.floor(this.patrolNode.x),
                y:Math.floor(this.patrolNode.y)
            });
        
            if (Utils.distance(this.patrolNode, this.position) == 0) {
                this.patrolTimer += dt;
                if (this.patrolTimer > this.patrolNode.duration) {
                    this.patrolNode = this.nextPatrolNode();
                    this.patrolTimer = 0;
                }
            }
        }
    },
    
    onBump: function(player) {
        if (this.bumpMessageTimer <= 0) {
            this.bumpMessageTimer = randomInRange(1, 2);
            this.say(randomElementInArray(this.bumpLines));
        }
    },
    
    // headache devvan WTF am i doin? I don't even know while writing this.
    nextPatrolNode: function() {
        if (!this.patrolNode) {
            return this.patrolPath[0];
        }
    
        if (this.patrolNode == this.patrolPath[0]) {
            this.patrolReverse = false;
        } else if (this.patrolNode == this.patrolPath[this.patrolPath.length-1]) {
            this.patrolReverse = true;
        }
        
        for (var i=0; i < this.patrolPath.length; ++i) {
            var node = this.patrolPath[i];
            if (this.patrolNode == node) {
                if (node.remove) {
                    this.patrolPath.splice(i,1);
                    --i;
                }
            
                if (!this.patrolReverse) {
                    if (i+1 < this.patrolPath.length) {
                        return this.patrolPath[i+1];
                    }
                } else {
                    if (i-1 >= 0) {
                        return this.patrolPath[i-1];
                    }
                }
                return node;
            }
        }
        return null;
    }
});
