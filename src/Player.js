function Player() {
    Player.superclass.constructor.call(this);
    this.lastTarget = {x:0, y:0};
}

Player.inherit(Actor, {

    update: function(dt) {
        Player.superclass.update.call(this,dt);
        //console.log(this.position);
        var mouse = Application.instance.game.camera.mouseToCamera(Input.instance.mouse);
        if (mouse.x != this.lastTarget.x && mouse.y != this.lastTarget.y) {
            this.moveTowards(mouse);
        }
        
    }

});
