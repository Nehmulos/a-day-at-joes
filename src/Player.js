function Player() {
    Player.superclass.constructor.call(this);
}

Player.inherit(Actor, {

    update: function(dt) {
        Player.superclass.update.call(this,dt);
        //console.log(this.position);
        this.moveTowards(Application.instance.game.camera.mouseToCamera(Input.instance.mouse));
    }

});
