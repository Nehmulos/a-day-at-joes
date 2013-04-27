G.maplist.add("01", "home", {
    startPositions:{"default": {x:200, y:200}},
    walls: [
        {a:{x:200, y:200}, b:{x:180, y:300}, t:1}
    ], 
    setup: function(map, world) {
        var wall = new Wall({x:200, y:200},{x:180, y:300}, 1);
        wall.defaultCreatePhysics(world);
        map.addActor(wall);
        
        var door = new Door("02");
        door.position = new cc.Point(400, 200);
        door.defaultCreatePhysics(world);
        map.addActor(door);
    },
    flavour: "I've got to get going",
    flavourDuration: 10
});
