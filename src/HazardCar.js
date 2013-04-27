function HazardCar() {
    HazardCar.superclass.constructor.call(this);
    this.sprite = new NamedSprite({
        name:"car", 
        borderColor:"red",
        height:70,
        width: 50
    });
    this.addChild(this.sprite);
    this.contentSize = this.sprite.contentSize;
    this.directionMultiplier = {y:1, x:1};
    this.speed = 7;
}

HazardCar.inherit(PhysicsNode, {
    type: "car",
    defaultCreatePhysics: function(world) {
        this.createPhysics(world,{});
        
        this.body.SetLinearVelocity(new b2Vec2(
            this.speed*this.directionMultiplier.x,
            this.speed*this.directionMultiplier.y
        ));
    }
});

