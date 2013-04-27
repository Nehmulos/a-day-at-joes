G.maplist.add("02", "streets", {
    startPositions:{
        "default": {x:120, y:280},
        "pavementJoe": {x:700, y:0}
    },
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
        
        var scrollDown = new Door({
            x:900,
            y:100,
            type:"scrollOrder",
            spawn:"pavementJoe"
        }, "↓↓↓↓");
        scrollDown.position = new cc.Point(700, 50);
        scrollDown.defaultCreatePhysics(world);
        map.addActor(scrollDown);
        this.timers = [5, 2, 1, 4];
        this.spawnPositions = [
            {x: 200, y: 480},
            {x: 300, y: 0},
            {x: 470, y: 480},
            {x: 570, y: 0},
        ];
        this.world = world;
        this.map = map;
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
    },
    flavour: "The traffic here is dangerous",
    flavourDuration: 10
});
