function Game(root) {
    Game.superclass.constructor.call(this);
    this.root = root;
    this.entities = [];
}

Game.inherit(Observable, {

    init: function() {
        var s = cc.Director.sharedDirector.winSize;
        this.camera = new Camera(cc.Director.sharedDirector.winSize, this);
        
        var startMap = G.restoreJson("checkpoint") || "01";
        if (typeof startMap != "string") {
            startMap.type = "loadOrder";
        }
        
        this.chat = new Chat();
        this.chat.anchorPoint = new cc.Point(0, 1);
        this.chat.position.y = s.height;
        this.chat.zOrder = 99;
        this.root.addChild(this.chat);
        
        this.setMap(startMap);
    },
    
    setMap: function(map) {
        var checkpoint = {};
        
        if (typeof map == "string") {
            map = new Map(map);
        } else if (map.type == "scrollOrder") {
            this.map.cameraStart = {x:map.x, y:map.y};
            this.map.resetCamera();
            this.map.spawn = map.spawn;
            this.map.spawnPlayerAt(map.spawn);
            
            checkpoint.id = this.map.id;
            checkpoint.spawn =  map.spawn || this.map.spawn;
            G.storeJson("checkpoint", checkpoint);
            
            return;
        } else if (map.type == "loadOrder") {
            var spawn = map.spawn;
            map = new Map(map.id);
            map.spawn = spawn;
        }
        
        if (this.map) {
            this.map.parent.removeChild(this.map);
        }
        
        var oldMap = this.map; // store for event
        this.map = map;
        this.root.addChild(this.map);
        this.fireEvent("changeMap", {newMap: map, oldMap: oldMap});
        this.map.start();
        this.map.resetCamera();
        
        checkpoint.id = this.map.id;
        checkpoint.spawn =  this.map.spawn;                
        G.storeJson("checkpoint", checkpoint);
        
        G.storeItem("lastmap", this.map.id);
    },
    
    update: function(dt) {
        if (this.nextMap) {
            this.setMap(this.nextMap);
            this.nextMap = null;
        }
        
        if (this.flavourText) {
            if (this.flavourText.phase == "done") {
                this.flavourText = null;
            } else {
                this.flavourText.update(dt);
            }
        }
        
        this.chat.update(dt);
        this.map.update(dt);
        this.camera.update(dt);
        // to restart map
        if (Input.instance.keysDown[82]) {
            this.restartMap();
        }
    },
    
    death: function(reason) {
        this.nextMap = this.map.id;
        var deathCount = G.restoreJson("deathCount");
        deathCount[reason] = deathCount[reason] +1 || 1;
        G.storeJson("deathCount", deathCount);
    },
    
    showFlavourText: function(text, duration) {
        if (this.flavourText) {
            this.flavourText.label.parent.removeChild(this.flavourText.label);
        }
        this.flavourText = new FlavourText(text, duration || 10, this.root);
    },
    
    restartMap: function() {
        this.setMap(this.map.id);
    },
    
    mouseDragged: function(event) {
        this.draggingMouse = true;
    },
    
    mouseDown: function(event) {

    },
    
    mouseWheel: function(event) {
        this.camera.scaleByDelta(event.wheelDelta, event);
    },
    
    mouseUp: function(event) {
        var isDoubleClick = this.checkDoubleClick(event.which);
    
        if (event.which == G.rightMouseButtonIndex) {
        
        } else if (event.which == G.leftMouseButtonIndex) {
        
        }
    },
    
    checkDoubleClick: function(buttonIndex) {
        var ret = false;
        var currentTime = new Date().getTime();
        if (this.lastClickTime &&
            this.lastMouseButtonIndex == buttonIndex &&
            currentTime - this.lastClickTime < G.doubleClickTime) {

            ret = true;
        }
        this.lastClickTime = currentTime;
        this.lastMouseButtonIndex = buttonIndex;
        return ret;
    }
});

Game.instance = null;
