function Player() {
    Player.superclass.constructor.call(this, "I");
    this.lastTarget = {x:0, y:0};
}

Player.inherit(Actor, {
    type:"player",
    
    defaultCreatePhysics:function(world) {
        this.createPhysics(world, {fixedRotation: true, damping:0});
        this.moveTowards({x: this.position.x+1, y: this.position.y+1});
    },
    
    update: function(dt) {
        Player.superclass.update.call(this,dt);
        //console.log(this.position);
        var mouse = Application.instance.game.camera.mouseToCamera(Input.instance.mouse);
        
        if (mouse.x != this.lastTarget.x && mouse.y != this.lastTarget.y) {
            //if (Math.abs(mouse.x - this.position.x) > this.contentSize.width/2 &&
            //    Math.abs(mouse.y - this.position.y) > this.contentSize.height/2) {
                this.moveTowards(mouse);
            //}
        }
    }
});
