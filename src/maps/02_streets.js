G.maplist.add("02", "streets", {
    startPositions:{"default": {x:200, y:200}},
    walls: [
        {a:{x:200, y:200}, b:{x:180, y:300}},
        {a:{x:380, y:200}, b:{x:400, y:300}}
    ], 
    setup: function(map, world) {
        
    
    },
    flavour: "The traffic here is dangerous",
    flavourDuration: 10
});
