G.maplist.add("07", "home", {
    startPositions:{
        "default": {x:200, y:380, flavour: "I've got to get going"},
        "door": {x:600, y:350, flavour: "I've got to get going"}
    }, 
    walls: [
        // bounding
        {a:{x:50, y:420}, b:{x:50, y:60}, t:10},
        {a:{x:50, y:420}, b:{x:700, y:420}, t:10},
        {a:{x:700, y:420}, b:{x:700, y:60}, t:10},
        {a:{x:700, y:60}, b:{x:50, y:60}, t:10},
        // kitchen
        {a:{x:320, y:420}, b:{x:320, y:160}, t:10},
        {a:{x:470, y:420}, b:{x:470, y:160}, t:10},
        {a:{x:320, y:160}, b:{x:400, y:160}, t:10},
        // misc bottom r
        {a:{x:600, y:60}, b:{x:600, y:275}, t:10},
        {a:{x:600, y:275}, b:{x:700, y:275}, t:10},
    ],
    setup: function(map, world) {
        var door = new Door("02");
        door.position = new cc.Point(700, 350);
        door.defaultCreatePhysics(world);
        map.addActor(door);
        
        var bed = new NamedSprite({name:"bed", borderColor:"blue"});
        bed.position = new cc.Point(80, 400)
        map.addActor(bed);
        
        var kitchen = new NamedSprite({name:"kitchen", borderColor:"orange"});
        kitchen.position = new cc.Point(400, 400)
        map.addActor(kitchen);
    },
    update: function() {}
});
