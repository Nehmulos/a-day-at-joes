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
    },
    update: function() {}
});
