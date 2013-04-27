function Game(root) {
    Game.superclass.constructor.call(this);
    this.root = root;
    this.entities = [];
}

Game.inherit(Observable, {

    init: function() {
        var s = cc.Director.sharedDirector.winSize;
        this.camera = new Camera(cc.Director.sharedDirector.winSize, this);
        this.setMap(new Map("01"));
    },
    
    setMap: function(map) {
        if (this.map) {
            this.map.parent.removeChild(this.map);
        }
        
        if (typeof map == "string") {
            map = new Map(map);
        }
    
        
        var oldMap = this.map; // store for event
        this.map = map;
        this.root.addChild(this.map);
        this.fireEvent("changeMap", {newMap: map, oldMap: oldMap});
        this.map.start();
        this.map.resetCamera();
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
    
        //this.map.update(dt);
        this.camera.update(dt);
        // to restart map
        if (Input.instance.keysDown[82]) {
            this.restartMap();
        }
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

function FlavourText(text, duration, parent) {
    var self = this;
    var s = cc.Director.sharedDirector.winSize;
    this.timer = 0.0;
    this.duration = duration;
    this.label = new cc.Label({
        string:text,
        fontName:'"Courier New", Courier, monospace bold',
        fontColor: "#333",
        fontSize: "40",
        fontStyle: "bold"
    });
    this.label.position = new cc.Point(s.width/2, this.label.contentSize.height/2 + 10);
    this.label.zOrder = 100;
    this.phase = "none";
    parent.addChild(this.label);
    
    this.update = function(dt) {
        self.timer += dt;
        if (self.timer >= self.duration) {
            if (self.phase == "fadeout") {
                self.phase = "done";
                //self.label.parent.removeChild(self.label);
            } else {
                Application.instance.game.nextMap = "01";
                self.phase = "fadeout";
                self.duration = 1.2;
                var move = new cc.MoveBy({
                    duration: this.duration, 
                    position: new cc.Point(0, 40)
                });
                var fade = new cc.FadeOut({duration: self.duration});
                //var seq = new cc.Sequence({actions:[move,fade]});
                self.label.runAction(move);
                self.label.runAction(fade);
                self.timer = 0.0;
            }
        }
    }
}
