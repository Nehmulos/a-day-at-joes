window.G = {}
window.G.debug = window.location.hash.match(/#debug/) ? true : false;
window.G.noSound = window.location.hash.match(/#noSound/) ? true : false;

window.G.leftMouseButtonIndex = 1;
window.G.rightMouseButtonIndex = 3;
window.G.doubleClickTime = 300;

window.G.connectionLineZ = -1;
window.G.interiorZ = -2;

window.G.maplist = {
    add: function(id, alias, map) {this.maps[id] = map},
    maps: {},
    get: function(id) {return this.maps[id] || console.error("missin map "+id);}
}
