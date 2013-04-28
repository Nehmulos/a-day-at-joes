function Chat() {
    Chat.superclass.constructor.call(this);
    this.lines = [];
}

Chat.inherit(cc.Node, {
    say: function(actor, text) {
        actor = actor || {};
        var line = new ChatLine({
            actor: actor,
            text: text,
            actorName: actor.name || "somebody",
            actorColor: actor.nameColor || "#444",
            textColor: actor.textColor || actor.nameColor || "#444",
        });
        line.position = this.newLinePosition();
        this.addChild(line);
        this.lines.push(line);
    },
    
    newLinePosition: function() {
        if (this.lines.length > 0) {
            var latestLine = this.lines[this.lines.length-1];
            return new cc.Point(0, latestLine.position.y - latestLine.contentSize.height);
        }
        return new cc.Point(0,0);
    },
    
    update: function(dt) {
        for (var i=0; i < this.lines.length; ++i) {
            if (this.lines[i].phase == "done") {
                this.moveUpLines(this.lines[i].contentSize.height);
                this.removeChild(this.lines[i]);
                this.lines.splice(i,1);
                --i;
                continue;
            }
            this.lines[i].update(dt);
        }
    },
    
    moveUpLines: function(height) {
        for (var i=0; i < this.lines.length; ++i) {
            var moveUp = new cc.MoveBy({
                position: new cc.Point(0,height),
                duration: 0.2
            });
            this.lines[i].runAction(moveUp);
        }
    }
    
});

function ChatLine(args) {
    ChatLine.superclass.constructor.call(this);
    args.padding = args.padding || 4;
    
    this.nameLabel = new cc.Label({string:args.actorName + ":"})
    this.nameLabel.anchorPoint = new cc.Point(0,1);
    
    this.textLabel = new cc.Label({string:args.text});
    this.textLabel.position.x = args.padding + this.nameLabel.contentSize.width
    this.textLabel.anchorPoint = new cc.Point(0,1);

    this.background = new BoxSprite();
    this.background.color = "rgba(22,22,22,0.8)";
    this.background.contentSize.width = this.textLabel.contentSize.width + this.nameLabel.contentSize.width + args.padding*3;
    this.background.contentSize.height = this.textLabel.contentSize.height + args.padding;
    this.background.position.x = this.background.contentSize.width / 4;
    this.background.position.y = -this.background.contentSize.height / 4;

    this.contentSize = new cc.Size(
        this.background.contentSize.width,    
        this.background.contentSize.height
    );
    this.addChild(this.background);
    this.addChild(this.nameLabel);
    this.addChild(this.textLabel);
    
    this.duration = args.duration || 5;
    this.phase = "none";
}

ChatLine.inherit(cc.Node, {
    update: function(dt) {
        if (this.duration < 0) {
            if (this.phase == "fadeOut") {
                this.phase = "done";
            } else { 
                this.duration = 1.2
                var move = new cc.MoveBy({
                    position: new cc.Point(this.contentSize.width/2,0),
                    duration: this.duration
                });
                var fade = new cc.FadeOut({duration: this.duration});
                this.background.runAction(fade);
                this.runAction(move);
                this.phase = "fadeOut";
            }
        }
        this.duration -= dt;
    }
});
