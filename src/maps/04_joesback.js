G.maplist.add("04", "joesback", {
    startPositions:{
        "default": {x:300, y:100, flavour: "Eddie is my boss around here"},
        "garage": {x:400, y:350}
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
        
        var door = new Door("03", "door", "staff");
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
        if (status["03_joes_keyQuest"] == "got" ||
            status["03_joes_keyQuest"] == "end") {
            
            var guard = new NpcGuard("Eddie");
            guard.position = new cc.Point(90, 320)
            guard.viewCone.rotation = 12;
            guard.viewCone.distance = 310/PhysicsNode.physicsScale;
            guard.defaultCreatePhysics(world);
            guard.patrolPath = [
                new PatrolNode({x:130,y:300}),
                new PatrolNode({x:80,y:300, duration:0}),
                new PatrolNode({x:80,y:200, duration:0}),
                new PatrolNode({x:130,y:200}),
            ];
            guard.viewCone.onPlayerEnter = function() {
                var c = new Conversation([
                    new ConversationLine({actor:guard, text:"What the fuck are you still doing here!?", next:3}),
                    new ConversationLine({actor:map.player, text:"I forgot the keys at the counter.", next:3})
                ]);
                map.addCustomActor(c);
                c.start();
            }
            map.addChild(guard);
            
            map.showFlavourText({
                flavour: "He should not see that I'm late.",
            });
            
        } else if (status["03_joes_keyQuest"] == "unaware" ||
                   status["03_joes_keyQuest"] == "aware") {
            
            var eddie = new Npc("Eddie");
            eddie.position = new cc.Point(90, 220)
            eddie.defaultCreatePhysics(world);
            eddie.bumpLines = [
                "What are still doing here!? Get going!",
                "I'm busy working what are you still doing here!?",
                "You better piss off and get into that car, if you like beeing alive."
            ]
            map.addChild(eddie);
            
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
