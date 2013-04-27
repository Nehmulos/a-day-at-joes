G.maplist.add("02", "streets", {
    setup: function(map, world) {
        var wall = new Wall({x:380, y:200},{x:400, y:300}, 1);
        wall.defaultCreatePhysics(world);
        map.addActor(wall);
    }
});
