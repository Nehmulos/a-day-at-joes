G.maplist.add("02", "streets", {
    startPositions:{
        "default": {x:120, y:280, flavour: "The traffic here is dangerous"},
        "pavementJoe": {x:700, y:0, flavour: "I work at Joe's", scroll:{x:900,
            y:100,}}
    },
    walls: [
        {a:{x:50, y:420}, b:{x:50, y:60}, t:10},
        {a:{x:50, y:420}, b:{x:0, y:420}, t:10},
        {a:{x:50, y:60}, b:{x:0, y:60}, t:10},
        // joes
        {a:{x:760, y:480}, b:{x:760, y:60}, t:10},
        {a:{x:760, y:60}, b:{x:1400, y:60}, t:10},
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
        
        var pavementj = new NamedSprite({
            name:"pavement", 
            borderColor:"gray",
            height:100,
            width: 700
        });
        pavementj.position = new cc.Point(1000, 0);
        map.addSprite(pavementj);
        
        var scrollDown = new Door({
            type:"scrollOrder",
            spawn:"pavementJoe"
        }, "↓↓↓↓");
        scrollDown.position = new cc.Point(700, 50);
        scrollDown.defaultCreatePhysics(world);
        map.addActor(scrollDown);
        
        
        var joesSign = new NamedSprite({
            name:"Joe's Dinner & Coffee",
            borderColor:"brown",
            height:100,
            width: 200
        });
        joesSign.position = new cc.Point(1000, 270);
        map.addSprite(joesSign);
        
        this.timers = [5, 2, 1, 4];
        this.spawnPositions = [
            {x: 200, y: 480},
            {x: 300, y: 0},
            {x: 470, y: 480},
            {x: 570, y: 0},
        ];
        this.world = world;
        this.map = map;
        
        var door = new Door("03");
        door.position = new cc.Point(1000, 60);
        door.defaultCreatePhysics(world);
        map.addActor(door);
    },
    spawnCar: function(i) {
        var yMod = i % 2 ? 1 : -1;
        var car = new HazardCar();
        car.directionMultiplier.y = yMod;
        car.directionMultiplier.x = 0;
        car.position = new cc.Point(
            this.spawnPositions[i].x, 
            this.spawnPositions[i].y
        );
        car.defaultCreatePhysics(this.world);
        this.map.addChild(car);
    },
    
    update: function(dt) {
        for (var i=0; i < this.timers.length; ++i) {
            this.timers[i] -= dt;
            if (this.timers[i] < 0) {
                this.timers[i] = randomInRange(0.5, 3);
                this.spawnCar(i);
            }
        }
    }
});
