function StaticObject() {
    StaticObject.superclass.constructor.call(this);
}

StaticObject.inherit(PhysicsNode, {
    type:"staticObject",

    defaultCreatePhysics: function(world) {
        this.createPhysics(world, {isStatic:true});
    },
    
    setSprite: function(sprite) {
        this.addChild(sprite);
        this.contentSize.width = sprite.contentSize.width;
        this.contentSize.height = sprite.contentSize.height;
    }
});
