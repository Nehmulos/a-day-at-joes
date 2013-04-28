function Map(id) {
    Map.superclass.constructor.call(this);
    this.actors = [];
    this.customActors = []; // without physics or graphics
    this.sprites = [];
    this.mapConnections = [];
    this.walls = [];
    //this.cameraStart = new cc.Point(0,0);
    this.events = new Observable();
    this.dynamic = G.maplist.get(id);
    this.id = id;
}

Map.inherit(cc.Layer, {

    start: function() {
        Application.instance.createWorld();
        var world = Application.instance.world;
    
        this.player = new Player();
        this.player.zOrder = 5;
        
        this.spawnPlayerAt(this.spawn);
        
        this.player.defaultCreatePhysics(world);
        this.addActor(this.player);
        
        this.createWalls(this.dynamic.walls, world);
                
        this.dynamic.setup(this, world);
    },
    
    spawnPlayerAt: function(spawnPoint) {
        var startPos;
        if (this.dynamic.startPositions) {
            spawnPoint = spawnPoint || "default";
            startPos = this.dynamic.startPositions[spawnPoint];
            
            this.showFlavourText(this.dynamic.startPositions[spawnPoint]);
            this.resetCamera(this.dynamic.startPositions[spawnPoint].scroll);
        } else {
            startPos = new cc.Point(0,0);
        }
        
        this.player.position = new cc.Point(
            startPos.x,
            startPos.y
        );
        
        if (this.player.body) {
            this.player.body.SetPosition(new b2Vec2(
                startPos.x/PhysicsNode.physicsScale, 
                startPos.y/PhysicsNode.physicsScale
            ));
        }
    },
    
    showFlavourText: function(object) {
        Application.instance.game.showFlavourText(
            object.flavour,
            object.flavourDuration
        );
    },
    
    createWalls: function(dataArray, world) {
        for (var i=0; i < dataArray.length; ++i) {
            var data = dataArray[i];
            var wall = new Wall(data.a,data.b, data.t);
            wall.defaultCreatePhysics(world);
            
            if (data.alias) {
                wall.alias = data.alias;
            }
            
            this.addActor(wall);
        }
        this.walls.push(wall);
    },
    
    removeWall: function(alias) {
        for (var i=0; i < this.walls.length; ++i) {
            if (this.walls[i].alias == alias) {
                this.removeChild(this.walls[i]);
                this.walls[i].destroyed = true;
                this.walls.splice(i, 1);
            }
        }
    },
    
    resetCamera: function(scroll) {
        if (scroll) {
            Application.instance.game.camera.centerAt(scroll);
         }
        //this.position = new cc.Point(this.cameraStart.x, this.cameraStart.y);
        //Application.instance.game.camera.trackedEntity = this.player;
    },
    
    addSprite: function(sprite) {
        this.sprites.push(sprite);
        this.addChild(sprite);
    },
    
    addActor: function(actor) {
        this.actors.push(actor);
        this.addChild(actor);
    },
    
    addCustomActor: function(actor) {
        this.customActors.push(actor);
    },
    
    removeActor: function(actor) {
        var index = $.inArray(actor, this.actors);
        if (index != -1) {
            this.actors.splice(index,1);
            this.removeChild(actor);
            actor.destroyed = true;
        }
    },
    
    update: function(dt) {
        for (var i=0; i < this.customActors.length; ++i) {
            if (this.customActors[i].destroyed) {
                this.customActors.splice(i,1);
                --i;
                continue;
            }
            this.customActors[i].update(dt);
        }
        this.dynamic.update(dt);
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
