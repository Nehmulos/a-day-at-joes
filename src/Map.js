function Map() {
    Map.superclass.constructor.call(this);
    this.actors = [];
    this.sprites = [];
    this.mapConnections = [];
    this.cameraStart = new cc.Point(0,0);
    this.startPosition = new cc.Point(0,0);
    this.events = new Observable();
}

Map.inherit(cc.Layer, {

    start: function() {
        Application.instance.createWorld();
    
        this.player = new Player();
        
        this.player.position = new cc.Point(
            this.startPosition.x,
            this.startPosition.y
        );
        this.player.defaultCreatePhysics(Application.instance.world);
        this.addActor(this.player);
        
        var c = new NamedSprite({name:"Door", borderColor:"green"});
        this.addActor(c);
        c. position = new cc.Point(400, 200);
        
        this.placeObjects();
    },
    
    placeObjects: function() {
        var wall = new Wall({x:200, y:200},{x:180, y:300}, 1);
        wall.defaultCreatePhysics(Application.instance.world);
        this.addActor(wall);
    },

    restCamera: function() {
        this.position = new cc.Point(this.cameraStart.x, this.cameraStart.y)
    },
    
    addSprite: function(sprite) {
        this.sprites.push(sprite);
        this.addChild(sprite);
    },
    
    addActor: function(actor) {
        this.actors.push(actor);
        this.addChild(actor);
    },
    
    removeActor: function(actor) {
        var index = $.inArray(actor, this.actors);
        if (index != -1) {
            this.actors.splice(index,1);
            this.removeChild(actor);
        }
    },
    
    update: function(dt) {
        //for (var i=0; i < this.actors.length; ++i) {
        //    this.actors[i].update(dt);
        //}
    },
    
    getActorOnPosition: function(point) {
        return this.getEntityOnPosition(point, "actor");
    },
    
    // if current is given, loop through all matching entities to find the one
    // after the currently selected
    getEntityOnPosition: function(point, entityType, current) {
        entityType = entityType || "actor";
        var entities;
        if (entityType == "actor") {
            entities = this.actors;
        } else if (entityType == "building") {
            entities = this.buildings;
        } else if (entityType == "node") {
            entities = this.nodes;
        }
        
        var firstMatch = null;
        var entity = null;
        var foundCurrent = false;
        $.each(entities, function() {
            var xDistance = Math.abs(point.x - this.position.x);
            var yDistance = Math.abs(point.y - this.position.y);
            if (xDistance < this.contentSize.width/2 &&
                yDistance < this.contentSize.height/2) {
                
                if (!firstMatch) {
                    firstMatch = this;
                }

                if (foundCurrent && !entity) {
                    entity = this;
                    return;
                } else if (this == current) {
                    foundCurrent = true;
                }
            }
        });
        
        return entity || firstMatch;
    }
})
