function Door(target) {
    Door.superclass.constructor.call(this);

    this.sprite = new NamedSprite({name:"Door", borderColor:"green"});
    this.addChild(this.sprite);
    this.contentSize = this.sprite.contentSize;
    this.target = target;
}

Door.inherit(PhysicsNode, {
    type:"door",
    defaultCreatePhysics: function(world) {
        this.createPhysics(world, {isStatic:true});
    }
});
