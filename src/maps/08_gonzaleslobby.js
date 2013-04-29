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
        
        var status = G.restoreJson("storyProgress");
        if (status["07_gonzales_quest1"] == "escape") {

            Audiomanager.instance.play("win");

            var youWin = new NamedSprite({
                name:"YOU WIN!",
                borderColor:"yellow",
                height:50,
                width: 200
            });
            youWin.position = new cc.Point(400, 300)
            map.addSprite(youWin)
            
            var credits = new NamedSprite({name: "Credits",borderColor:"gray"});
            credits.position = new cc.Point(400, 250)
            map.addSprite(credits);

            var lineA = new NamedSprite({name: "Created by Nehmulos",borderColor:"gray"});
            lineA.position = new cc.Point(400, 220)
            map.addSprite(lineA);
            
            var lineb = new NamedSprite({name: "For Ludum Dare #26 done in 48 hours",borderColor:"gray"});
            lineb.position = new cc.Point(400, 180)
            map.addSprite(lineb);
            
            var linec = new NamedSprite({name: "Thanks to everyone who writes open source software",borderColor:"gray"});
            linec.position = new cc.Point(400, 100)
            map.addSprite(linec);
            
            
            map.showFlavourText({text: "The End"});
        }
        
    },
    update: function() {}
});
