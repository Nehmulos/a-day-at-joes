function Door(target, name, spawn) {
    Door.superclass.constructor.call(this);

    this.sprite = new NamedSprite({name:name || "Door", borderColor:"green"});
    this.addChild(this.sprite);
    this.contentSize = this.sprite.contentSize;
    if (typeof target == "string") {
        this.target = {
            type:"loadOrder",
            id: target,
            spawn: spawn
        };
    } else {
        this.target = target;
    }
}

Door.inherit(PhysicsNode, {
    type:"door",
    defaultCreatePhysics: function(world) {
        this.createPhysics(world, {isStatic:true});
    }
});
