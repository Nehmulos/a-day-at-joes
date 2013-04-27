function Game(root) {
    Game.superclass.constructor.call(this);
    this.root = root;
    this.entities = [];
}

Game.inherit(Observable, {

    init: function() {
        var s = cc.Director.sharedDirector.winSize;
        this.setMap(new Map());
        this.camera = new Camera(cc.Director.sharedDirector.winSize, this);
        
        this.player = new Player();
        this.player.position = new cc.Point(s.width/4,s.height/4);
        this.player.defaultCreatePhysics(Application.instance.world);
        this.map.addActor(this.player);
    },
    
    setMap: function(map) {
        if (this.map) {
            this.root.removeChild(this.map);
        }
        var oldMap = this.map; // store for event
        this.map = map;
        this.map.restCamera();
        this.root.addChild(this.map);
        this.fireEvent("changeMap", {newMap: map, oldMap: oldMap});
    },
    
    update: function(dt) {
        this.map.update(dt);
        this.camera.update(dt);
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
