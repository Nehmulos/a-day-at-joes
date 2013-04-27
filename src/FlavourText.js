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
