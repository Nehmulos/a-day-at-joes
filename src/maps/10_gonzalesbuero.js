G.maplist.add("10", "b", {
    startPositions:{
        "default": {x:600, y:110, flavour: " "},
    }, 
    walls: [
        // bounding
        {a:{x:350, y:420}, b:{x:350, y:60}, t:10},
        {a:{x:350, y:420}, b:{x:700, y:420}, t:10},
        {a:{x:700, y:420}, b:{x:700, y:60}, t:10},
        {a:{x:700, y:60}, b:{x:350, y:60}, t:10},
    ],
    setup: function(map, world) {
        
        var door = new Door("09", null, "north-bureau");
        door.position = new cc.Point(600, 60);
        door.defaultCreatePhysics(world);
        map.addActor(door);
        
        var escapeDoor = new StaticObject();
        escapeDoor.setSprite(new NamedSprite({
            name:"door",
            borderColor:"darkgreen",
        }));
        escapeDoor.rotation = 90
        escapeDoor.position = new cc.Point(350, 350);
        escapeDoor.defaultCreatePhysics(world);
        map.addActor(escapeDoor);
        
        var poola = new StaticObject();
        poola.setSprite(new NamedSprite({
            name:"desk",
            borderColor:"orange",
            width: 100,
            height: 50
        }));
        poola.position = new cc.Point(460, 350);
        poola.defaultCreatePhysics(world);
        map.addActor(poola);
        
        this.gonazalesTimer = null;
        var status = G.restoreJson("storyProgress");
        if (status["07_gonzales_quest1"] != "escape" &&
            status["07_gonzales_quest1"] != "end") {
            var gonzales = new Npc("Gonzales");
            gonzales.position = new cc.Point(460, 390)
            gonzales.defaultCreatePhysics(world);
            gonzales.bumpLines = ["Let me!"];
            map.addChild(gonzales);
            this.gonzales = gonzales;
            
            var self = this;
            var gonzalesRun = function() {
                gonzales.follow = escapeDoor;
                self.gonazalesTimer = 2;
                var status = G.restoreJson("storyProgress");
                status["07_gonzales_quest1"] = "escape";
                G.storeJson("storyProgress", status);
            }
            
            var c = new Conversation([
                new ConversationLine({next:1}),
                new ConversationLine({actor:map.player, text:"You missed a delivery.", next:3}),
                new ConversationLine({actor:gonzales, text:"I will never pay you!", next:3, nextCallback: gonzalesRun}),
                new ConversationLine({actor:map.player, text:"Stop!", next:0.5}),
                new ConversationLine({actor:gonzales, text:"Guards! Guards!", next:3}),
                new ConversationLine({actor:map.player, text:"Damn it, I must leave again.", next:3}),
            ]);
            map.addCustomActor(c);
            c.start();
        }
    },
    update: function(dt) {
        if (this.gonazalesTimer != null) {
            this.gonazalesTimer -= dt;
            if (this.gonazalesTimer < 0) {
                this.gonazalesTimer = null;
                this.gonzales.parent.removeChild(this.gonzales);
            }      
        }
    }
});
