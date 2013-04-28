G.maplist.add("03", "joes", {
    startPositions:{
        "default": {x:500, y:100, flavour:"but I'm not in catering business"}
    },
    walls: [
        // bounding
        {a:{x:50, y:420}, b:{x:50, y:60}, t:10},
        {a:{x:50, y:420}, b:{x:700, y:420}, t:10},
        {a:{x:700, y:420}, b:{x:700, y:60}, t:10},
        {a:{x:700, y:60}, b:{x:50, y:60}, t:10},
    ],
    setup: function(map, world) {
        var door = new Door({
            type:"loadOrder",
            id:"02",
            spawn:"pavementJoe"
        });
        door.position = new cc.Point(500, 60);
        door.defaultCreatePhysics(world);
        map.addActor(door);
        
        var staffdoor = new Door({
            type:"loadOrder",
            id:"04",
        }, "staff door");
        staffdoor.position = new cc.Point(200, 420);
        staffdoor.defaultCreatePhysics(world);
        map.addActor(staffdoor);
        
        
        for (var i=0; i < 5; ++i) {
            var x = 250 - (i%2)*150;
            var y = 250 - (i>2)*125;
        
            var table = new StaticObject();
            table.setSprite(new NamedSprite({
                name:"table",
                borderColor:"teal",
                height:40
            }));
            table.position = new cc.Point(x+60, y);
            table.defaultCreatePhysics(world);
            map.addActor(table);
            
            var chairl = new NamedSprite({name:"chair", borderColor:"darkblue"});
            chairl.position = new cc.Point(x, y)
            map.addActor(chairl);
            
            /* TO MUCH ENTROPY
            var chairt = new NamedSprite({name:"chair", borderColor:"darkblue"});
            chairt.position = new cc.Point(x+60, y+60);
            chairt.rotation = 90;
            map.addActor(chairt);
            */
        }
        
        var guest = new Npc("Bob");
        guest.position = new cc.Point(360, 250)
        guest.defaultCreatePhysics(world);
        guest.bumpLines = ["hey, watch where you're going!"];
        map.addActor(guest);
        
        
        var counter = new StaticObject();
        counter.setSprite(new NamedSprite({
            name:"counter",
            borderColor:"orange",
            width: 300,
            height: 50
        }));
        counter.position = new cc.Point(540, 300);
        counter.defaultCreatePhysics(world);
        map.addActor(counter);
        
        var counterBlock = new StaticObject();
        counterBlock.setSprite(new NamedSprite({
            name:"counter",
            borderColor:"orange",
            width: 78,
            height: 16
        }));
        counterBlock.position = new cc.Point(398, 372);
        counterBlock.rotation = 90;
        counterBlock.defaultCreatePhysics(world);
        map.addActor(counterBlock);
    },
    update: function() {},
    flavour: "I've got to get going",
    flavourDuration: 10
});
