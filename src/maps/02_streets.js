G.maplist.add("02", "streets", {
    startPositions:{"default": {x:120, y:280}},
    walls: [
        {a:{x:50, y:420}, b:{x:50, y:60}, t:10},
        {a:{x:50, y:420}, b:{x:0, y:420}, t:10},
        {a:{x:50, y:60}, b:{x:0, y:60}, t:10},
    ], 
    setup: function(map, world) {
        var pavementl = new NamedSprite({
            name:"pavement", 
            borderColor:"gray",
            height:420,
            width: 100
        });
        pavementl.position = new cc.Point(110, 260);
        map.addSprite(pavementl);    
        
        var pavementr = new NamedSprite({
            name:"pavement", 
            borderColor:"gray",
            height:420,
            width: 100
        });
        pavementr.position = new cc.Point(700, 260);
        map.addSprite(pavementr);
    
        var grass1 = new NamedSprite({
            name:"grass",
            borderColor:"darkgreen",
            height:100,
            width: 65
        });
        grass1.position = new cc.Point(400, 400);
        map.addSprite(grass1);
        
        var grass2 = new NamedSprite({
            name:"grass",
            borderColor:"darkgreen",
            height:100,
            width: 65
        });
        grass2.position = new cc.Point(400, 170);
        map.addSprite(grass2);
        
        var door = new Door("01");
        door.position = new cc.Point(50, 350);
        door.defaultCreatePhysics(world);
        map.addActor(door);
    },
    flavour: "The traffic here is dangerous",
    flavourDuration: 10
});
