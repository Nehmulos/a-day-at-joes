G.maplist.add("09", "casino", {
    startPositions:{
        "south-left": {x:600, y:110, flavour: "Gonzales missed a delivery"},
        "south-right": {x:200, y:110, flavour: "Gonzales missed a delivery"},
        "north-bureau": {x:600, y:360, flavour: "The guards are armed"},
    }, 
    walls: [
        // bounding
        {a:{x:50, y:420}, b:{x:50, y:60}, t:10},
        {a:{x:50, y:420}, b:{x:700, y:420}, t:10},
        {a:{x:700, y:420}, b:{x:700, y:60}, t:10},
        {a:{x:700, y:60}, b:{x:50, y:60}, t:10},
        // other
        {a:{x:550, y:200}, b:{x:650, y:250}, t:10},
        {a:{x:550, y:205}, b:{x:575, y:150}, t:10},
        {a:{x:640, y:255}, b:{x:670, y:200}, t:10},
    ],
    setup: function(map, world) {
        this.world = world;
        this.map = map;
        var doorl = new Door("08", null, "casino-right");
        doorl.position = new cc.Point(600, 60);
        doorl.defaultCreatePhysics(world);
        map.addActor(doorl);
        
        var doorr = new Door("08", null, "casino-left");
        doorr.position = new cc.Point(200, 60);
        doorr.defaultCreatePhysics(world);
        map.addActor(doorr);
        
        var dooro = new Door("10");
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
        
        var status = G.restoreJson("storyProgress");
        if (status["07_gonzales_quest1"] == "escape") {
            
            
            var guard = this.createGuard(new cc.Point(130,150));
            guard.viewCone.rotation = 45;
            guard.viewCone.angle = 60;
            guard.viewCone.distance = 350/PhysicsNode.physicsScale;
            guard.patrolPath = [
                new PatrolNode({x:130,y:150, duration: 2}),
                new PatrolNode({x:330,y:150}),
            ];
            
            var guardbs = this.createGuard(new cc.Point(350,210));
            guardbs.viewCone.rotation = 60;
            guardbs.viewCone.angle = 35;
            
            var guarbm = this.createGuard(new cc.Point(320,350));
            guarbm.viewCone.rotation = 90;
            guarbm.viewCone.angle = 35;
            
            var guardt = this.createGuard(new cc.Point(130,300));
            guardt.viewCone.rotation = 55;
            guardt.viewCone.angle = 60;
            guardt.viewCone.distance = 250/PhysicsNode.physicsScale;
            guardt.patrolPath = [
                new PatrolNode({x:130,y:300}),
                new PatrolNode({x:530,y:300, duration:4.5}),
            ];
            
            var guardtt = this.createGuard(new cc.Point(80,390));
            guardtt.viewCone.rotation = 100;
            guardtt.viewCone.distance = 250/PhysicsNode.physicsScale;
            guardtt.patrolPath = [
                new PatrolNode({x:80,y:390, duration: 0}),
                new PatrolNode({x:570,y:390, duration: 0}),
                new PatrolNode({x:570,y:290, duration: 0}),
                new PatrolNode({x:682,y:290, duration: 0}),
                new PatrolNode({x:682,y:90, duration: 2}),
            ];
        }
    },
    createGuard: function(pos) {
        var self = this;
        var guard = new NpcGuard("Guard");
        
        var playerShot = function() {
            Application.instance.game.death("shotByGuard");
            Audiomanager.instance.play("shoot");
        }
        
        guard.position = pos;
        guard.viewCone.rotation = 12;
        guard.viewCone.distance = 310/PhysicsNode.physicsScale;
        guard.defaultCreatePhysics(self.world);
        guard.viewCone.onPlayerEnter = function() {
            var c = new Conversation([
                new ConversationLine({actor:guard, text:"Open fire!", next:3, nextCallback:playerShot}),
            ]);
            self.map.addCustomActor(c);
            c.start();
        }
        self.map.addActor(guard);
        return guard;
    },
    update: function() {}
});
