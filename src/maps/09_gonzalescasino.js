G.maplist.add("09", "casino", {
    startPositions:{
        "south-left": {x:600, y:110, flavour: "Gonzales missed a delivery"},
        "south-right": {x:200, y:110, flavour: "Gonzales missed a delivery"},
    }, 
    walls: [
        // bounding
        {a:{x:50, y:420}, b:{x:50, y:60}, t:10},
        {a:{x:50, y:420}, b:{x:700, y:420}, t:10},
        {a:{x:700, y:420}, b:{x:700, y:60}, t:10},
        {a:{x:700, y:60}, b:{x:50, y:60}, t:10},
        // other
        {a:{x:550, y:200}, b:{x:650, y:250}, t:10},
        {a:{x:550, y:200}, b:{x:575, y:150}, t:5},
    ],
    setup: function(map, world) {
        var doorl = new Door("08", null, "casino-right");
        doorl.position = new cc.Point(600, 60);
        doorl.defaultCreatePhysics(world);
        map.addActor(doorl);
        
        var doorr = new Door("08", null, "casino-left");
        doorr.position = new cc.Point(200, 60);
        doorr.defaultCreatePhysics(world);
        map.addActor(doorr);
        
        var dooro = new Door("10", null, "bureau");
        dooro.position = new cc.Point(600, 420);
        dooro.defaultCreatePhysics(world);
        map.addActor(dooro);
        
        var poola = new StaticObject();
        poola.setSprite(new NamedSprite({
            name:"pool table",
            borderColor:"darkgreen",
            width: 100,
            height: 50
        }));
        poola.position = new cc.Point(400, 350);
        poola.defaultCreatePhysics(world);
        map.addActor(poola);
        
    },
    update: function() {}
});
