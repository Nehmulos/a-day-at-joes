G.maplist.add("04", "joesback", {
    startPositions:{
        "default": {x:300, y:100, flavour: "Eddie is my boss around here"}
    }, 
    walls: [
        // bounding
        {a:{x:50, y:420}, b:{x:50, y:60}, t:10},
        {a:{x:50, y:420}, b:{x:500, y:420}, t:10},
        {a:{x:500, y:420}, b:{x:500, y:60}, t:10},
        {a:{x:500, y:60}, b:{x:50, y:60}, t:10},
        // misc bottom l
        {a:{x:200, y:60}, b:{x:200, y:275}, t:10},
        {a:{x:200, y:275}, b:{x:100, y:275}, t:10},
    ],
    setup: function(map, world) {
        var garageDoor = new Door("05", "garage");
        garageDoor.position = new cc.Point(400, 420);
        garageDoor.defaultCreatePhysics(world);
        map.addActor(garageDoor);
        
        var door = new Door("03", "door");
        door.position = new cc.Point(300, 60);
        door.defaultCreatePhysics(world);
        map.addActor(door);
        
        var workbenchr = new StaticObject();
        workbenchr.setSprite(new NamedSprite({
            name:"workbench", 
            borderColor:"brown",
            height: 35
        }));
        workbenchr.position = new cc.Point(185, 325);
        workbenchr.rotation = 90;
        workbenchr.defaultCreatePhysics(world);
        map.addActor(workbenchr);
    },
    update: function() {}
});
