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
        
        //////////
        // ACTORS
        //////////
        var status = G.restoreJson("storyProgress");
        if (status["03_joes_keyQuest"] == "got") {
            var guard = new NpcGuard();
            guard.position = new cc.Point(90, 320)
            guard.defaultCreatePhysics(world);
            map.addChild(guard);
        } else {
            // lock garage
            garageDoor.target = null;
        
            var eddie = new Npc("Eddie");
            eddie.position = new cc.Point(250, 220)
            eddie.defaultCreatePhysics(world);
            map.addChild(eddie);
            
            var richard = new Npc("Richard");
            richard.position = new cc.Point(400, 220)
            richard.defaultCreatePhysics(world);
            map.addChild(richard);
            
            var richardFollow = function() {
                richard.follow = map.player;
                garageDoor.target = "05";
                status["03_joes_keyQuest"] = "unaware";
                G.storeJson("storyProgress", status);
            }
            
            var c = new Conversation([
                new ConversationLine({next:1}),
                new ConversationLine({actor:richard, text:"Hi", next:6}),
                new ConversationLine({actor:eddie, text:"I'm very busy today.", next:3}),
                new ConversationLine({actor:eddie, text:"You've gotta to take the freshman for a ride.", next:3}),
                new ConversationLine({actor:richard, text:"I won't be a burden.", next:3, nextCallback: richardFollow}),
            ]);
            map.addCustomActor(c);
            c.start();
        }

    },
    update: function() {}
});
