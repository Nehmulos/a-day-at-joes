function Chat() {
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
        
    }
});

function ChatLine(args) {
    args.padding = args.padding || 4;
    this.nameLabel = new cc.Label({})
    this.textLabel = new cc.Label({string:args.text});
    this.textLabel.position.x = nameLabel.position.x

    this.background = new BoxSprite();    
    this.background.contentSize.width = this.textLabel.contentSize.width + this.nameLabel.contentSize.width + padding;
    
    this.addChild(this.background);
    this.addChild(this.nameLabel);
    this.addChild(this.textLabel);
}

ChatLine.inherit(cc.Node, {

});
