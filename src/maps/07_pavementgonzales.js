G.maplist.add("07", "pavementgonzales", {
    startPositions:{
        "default": {x:100, y:100, flavour: "Time for work"},
        "door": {x:750, y:120, flavour: "Why did I go out again?"}
    }, 
    walls: [
        // bounding
        {a:{x:0, y:480}, b:{x:0, y:220}, t:10},
        {a:{x:800, y:480}, b:{x:800, y:220}, t:10},
        {a:{x:800, y:220}, b:{x:0, y:220}, t:10},
    ],
    setup: function(map, world) {
        var pavement = new NamedSprite({
            name:"pavement", 
            borderColor:"gray",
            height:100,
            width: 800
        });
        pavement.position = new cc.Point(400, 160);
        map.addSprite(pavement);
        
        var car = new StaticObject();
        car.setSprite(new NamedSprite({
            name:"Car",
            borderColor: "red",
            width: 70,
            height: 50
        }));
        car.position = new cc.Point(100, 75);
        car.defaultCreatePhysics(world);
        map.addActor(car);
        
        var sign = new NamedSprite({
            name:"Gonzales' Hotel Casino", 
            borderColor:"brown",
            height:100,
            width: 300
        });
        sign.position = new cc.Point(500, 360);
        map.addSprite(sign);
        
        var door = new Door("08", "    Door     ");
        door.position = new cc.Point(750, 220);
        door.defaultCreatePhysics(world);
        map.addActor(door);
        
        var status = G.restoreJson("storyProgress");
        if (!status["07_gonzales_quest1"]) {
        
            var richard = new Npc("Richard");
            richard.position = new cc.Point(150, 150);
            richard.defaultCreatePhysics(world);
            map.addChild(richard);
            
            var markProgress = function() {
                status["07_gonzales_quest1"] = "started";
                G.storeJson("storyProgress", status);
                richard.bumpLines = ["Okay... I'll just wait here."];
                richard.follow = door;         
            }
            
            var c = new Conversation([
                new ConversationLine({next:0.5}),
                new ConversationLine({actor:map.player, text:"You wait outside.", next:3}),
                new ConversationLine({actor:richard, text:"What? I want to help!", next:3}),
                new ConversationLine({actor:map.player, text:"And the best place for you to be helpful is here.", next:3}),
                new ConversationLine({actor:richard, text:"...", next:3, nextCallback: markProgress}),
                new ConversationLine({actor:map.player, text:"When you see a fat guy hasting outside, tackle him.", next:1}),
            ]);
            map.addCustomActor(c);
            c.start();
        } else {
            var richard = new Npc("Richard");
            richard.position = new cc.Point(700, 170);
            richard.defaultCreatePhysics(world);
            richard.follow = door;
            richard.bumpLines = ["Okay... I'll just wait here."];
            map.addChild(richard);
        }
        
    },
    update: function() {}
});
