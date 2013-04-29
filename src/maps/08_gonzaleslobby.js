G.maplist.add("08", "lobby", {
    startPositions:{
        "default": {x:600, y:110, flavour: "The bureau is on the north end"},
        "casino-left": {x:200, y:350, flavour: "The bureau is on the north end"},
        "casino-right": {x:600, y:350, flavour: "The bureau is on the north end"},
    }, 
    walls: [
        // bounding
        {a:{x:50, y:420}, b:{x:50, y:60}, t:10},
        {a:{x:50, y:420}, b:{x:700, y:420}, t:10},
        {a:{x:700, y:420}, b:{x:700, y:60}, t:10},
        {a:{x:700, y:60}, b:{x:50, y:60}, t:10},
    ],
    setup: function(map, world) {
        var doorl = new Door("09", null, "south-left");
        doorl.position = new cc.Point(600, 420);
        doorl.defaultCreatePhysics(world);
        map.addActor(doorl);
        
        var doorr = new Door("09", null, "south-right");
        doorr.position = new cc.Point(200, 420);
        doorr.defaultCreatePhysics(world);
        map.addActor(doorr);
        
        var dooro = new Door("07", null, "door");
        dooro.position = new cc.Point(600, 60);
        dooro.defaultCreatePhysics(world);
        map.addActor(dooro);
        
        var counter = new StaticObject();
        counter.setSprite(new NamedSprite({
            name:"counter",
            borderColor:"orange",
            width: 300,
            height: 50
        }));
        counter.position = new cc.Point(400, 350);
        counter.defaultCreatePhysics(world);
        map.addActor(counter);
        
    },
    update: function() {}
});
