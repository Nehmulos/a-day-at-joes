function Npc() {
    Npc.superclass.constructor.call(this);
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
    },
    
    onBump: function(player) {
        if (this.bumpMessageTimer <= 0) {
            this.bumpMessageTimer = randomInRange(1, 2);
            this.say(randomElementInArray(this.bumpLines));
        }
    }
});
