function NamedSprite(args) {
    NamedSprite.superclass.constructor.call(this);
   
    this.nameLabel = new cc.Label({
        string: args.name || "Object",
        fontColor: args.fontColor || "black"
    });
    this.nameLabel.anchorPoint = new cc.Point(0.5,0.5)
    this.addChild(this.nameLabel);
   
    this.borderColor = args.borderColor || "red";
    this.borderSize = args.borderSize || 3;
    this.padding = args.padding || 0;
    
    var width = args.width || this.nameLabel.contentSize.width;
    var height = args.height || this.nameLabel.contentSize.height;
    this.contentSize = new cc.Size(
         width + this.borderSize*2 + this.padding*2,
         height + this.borderSize*2 + this.padding*2
    );
    
    //args.align = "tl";
    if (args.align == "tl") {
        this.nameLabel.anchorPoint = new cc.Point(0,1)
        this.nameLabel.position.y = this.contentSize.height/2 - this.borderSize/2;
        this.nameLabel.position.x = -this.contentSize.width/2 + this.borderSize/2;
    }
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
