G.maplist.add("05", "joesgarage", {
    startPositions:{
        "default": {x:300, y:100, flavour: ""}
    },
    walls: [
        // bounding
        {a:{x:50, y:420}, b:{x:50, y:60}, t:10},
        {a:{x:50, y:420}, b:{x:500, y:420}, t:10},
        {a:{x:500, y:420}, b:{x:500, y:60}, t:10},
        {a:{x:500, y:60}, b:{x:50, y:60}, t:10},
        // misc bottom l
        {a:{x:350, y:60}, b:{x:350, y:275}, t:10},
        {a:{x:350, y:275}, b:{x:400, y:275}, t:10},
    ],
    setup: function(map, world) {
        var door = new Door("04", null, "garage");
        door.position = new cc.Point(300, 60);
        door.defaultCreatePhysics(world);
        map.addActor(door);
        
        var car = new StaticObject();
        car.setSprite(new NamedSprite({
            name:"Car",
            borderColor: "red",
            width: 70,
            height: 50
        }));
        car.position = new cc.Point(200, 350);
        car.defaultCreatePhysics(world);
        map.addActor(car);
        
        var gate = new StaticObject();
        gate.setSprite(new NamedSprite({
            name:"Gate",
            borderColor: "green",
            width: 120,
        }));
        gate.rotation = 90;
        gate.position = new cc.Point(50, 350);
        gate.defaultCreatePhysics(world);
        map.addActor(gate);
        
        ////////////
        // ACTORS
        ////////////
        var status = G.restoreJson("storyProgress");
        if (status["03_joes_keyQuest"] == "got") {
            car.onTouch = function(actor) {
                if (actor == map.player) {
                    Application.instance.game.nextMap = {
                        type: "loadOrder",
                        id: "06"
                    }
                }
            }
        } else if (status["03_joes_keyQuest"] == "aware") {
            
        } else {
            car.onTouch = function(actor) {
                if (actor == map.player) {
                    actor.say("I forgot the key's at the counter", 10);
                    
                    status["03_joes_keyQuest"] = "aware";
                    G.storeJson("storyProgress", status);
                    car.onTouch = null;
                }
            }
            
            var richard = new Npc("Richard");
            richard.position = new cc.Point(200, 100)
            richard.defaultCreatePhysics(world);
            richard.follow = car;
            richard.bumpLines = ["Go, unlock the car."];
            map.addChild(richard);
        }
    },
    update: function() {}
});
