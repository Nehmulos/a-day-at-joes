G.maplist.add("03", "joes", {
    startPositions:{
        "default": {x:500, y:100, flavour:"but I'm not in catering business"}
    },
    walls: [
        // bounding
        {a:{x:50, y:420}, b:{x:50, y:60}, t:10},
        {a:{x:50, y:420}, b:{x:700, y:420}, t:10},
        {a:{x:700, y:420}, b:{x:700, y:60}, t:10},
        {a:{x:700, y:60}, b:{x:50, y:60}, t:10},
    ],
    setup: function(map, world) {
        var door = new Door({
            type:"loadOrder",
            id:"02",
            spawn:"pavementJoe"
        });
        door.position = new cc.Point(500, 60);
        door.defaultCreatePhysics(world);
        map.addActor(door);
        
        var staffdoor = new Door({
            type:"loadOrder",
            id:"02",
            spawn:"pavementJoe"
        }, "staff door");
        staffdoor.position = new cc.Point(200, 420);
        staffdoor.defaultCreatePhysics(world);
        map.addActor(staffdoor);
        
        var table = new NamedSprite({name:"table", borderColor:"teal", height:40});
        table.position = new cc.Point(140, 100)
        map.addActor(table);
        
        var chairl = new NamedSprite({name:"chair", borderColor:"darkblue"});
        chairl.position = new cc.Point(80, 100)
        map.addActor(chairl);
        
        var counter = new NamedSprite({
            name:"counter",
            borderColor:"orange",
            width: 300,
            height: 50
        });
        counter.position = new cc.Point(540, 300);
        map.addActor(counter);
        
        var guest = new Npc("Bob");
        guest.position = new cc.Point(200, 100)
        guest.defaultCreatePhysics(world);
        guest.bumpLines = ["hey, watch where you're going!"];
        map.addActor(guest);
    },
    update: function() {},
    flavour: "I've got to get going",
    flavourDuration: 10
});
