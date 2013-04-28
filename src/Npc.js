function Npc(name) {
    Npc.superclass.constructor.call(this, name);
    this.bumpLines = []; // say when player bumps into
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
    },
    
    onBump: function(player) {
        if (this.bumpMessageTimer <= 0) {
            this.bumpMessageTimer = randomInRange(1, 2);
            this.say(randomElementInArray(this.bumpLines));
        }
    }
});
