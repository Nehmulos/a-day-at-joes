function Map() {
    Map.superclass.constructor.call(this);
    this.actors = [];
    this.sprites = [];
    this.mapConnections = [];
    this.cameraStart = new cc.Point(0,0);
    this.events = new Observable();
}

Map.inherit(cc.Layer, {

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
    
    addBuilding: function(building) {
        this.buildings.push(building);
        this.addChild(building);
    },
    
    removeActor: function(actor) {
        var index = $.inArray(actor, this.actors);
        if (index != -1) {
            this.actors.splice(index,1);
            this.removeChild(actor);
        }
    },
    
    update: function(dt) {
        for (var i=0; i < this.actors.length; ++i) {
            this.actors[i].update(dt);
        }
    },
    
    getActorOnPosition: function(point) {
        return this.getEntityOnPosition(point, "actor");
    },
    
    // if current is given, loop through all matching entities to find the one after
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
