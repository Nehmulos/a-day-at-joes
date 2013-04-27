function NamedSprite(args) {
    NamedSprite.superclass.constructor.call(this);
   
    this.nameLabel = new cc.Label({
        string: args.name || "Object",
        fontColor: args.fontColor || "black"
    });
    this.nameLabel.anchorPoint = new cc.Point(0,1)
    this.addChild(this.nameLabel);
   
    this.borderColor = args.borderColor || "red";
    this.borderSize = args.borderSize || 3;
    this.padding = args.padding || 0;
    this.contentSize = args.contentSize || new cc.Size(
        this.nameLabel.contentSize.width + this.borderSize*2 + this.padding*2,
        this.nameLabel.contentSize.height + this.borderSize*2 + this.padding*2
    );
    
    
    this.nameLabel.position.y = this.contentSize.height/2 - this.borderSize/2;
    this.nameLabel.position.x = -this.contentSize.width/2 + this.borderSize/2;
}

NamedSprite.inherit(PhysicsNode, {

    draw: function(context) {
        context.fillStyle = "white"
        context.fillRect(
            -this.contentSize.width/2,
            -this.contentSize.height/2,
            this.contentSize.width,
            this.contentSize.height
        );
    
        context.lineWidth = this.borderSize;
        context.strokeStyle = this.borderColor;
        context.strokeRect(
            -this.contentSize.width/2,
            -this.contentSize.height/2,
            this.contentSize.width,
            this.contentSize.height
        );
    }
});
