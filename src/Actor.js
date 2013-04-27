function Actor() {
    Actor.superclass.constructor.call(this);
    this.speed = 1;
}

Actor.inherit(cc.Node, {

    moveTowards: function(position) {
        var xDistance = Math.abs(position.x - this.position.x);
        var yDistance = Math.abs(position.y - this.position.y);
        
        var xStepsRequired = xDistance / this.speed;
        var yStepsRequired = yDistance / this.speed;
        
        var deltaX = this.speed;
        var deltaY = this.speed;
        
        if (xStepsRequired > yStepsRequired && yStepsRequired != 0) {
            deltaY *= yStepsRequired/xStepsRequired;
        } else if (yStepsRequired > xStepsRequired && xStepsRequired != 0) {
            deltaX *= xStepsRequired/yStepsRequired;
        }
        
        if (xDistance < this.speed*2 &&
            yDistance < this.speed*2) {
            
            this.position.x = position.x;
            this.position.y = position.y;
        } else {
            // move
            if (position.x > this.position.x + deltaX) {
                this.position.x += deltaX;
            } else if (position.x < this.position.x - deltaX) {
                this.position.x -= deltaX;
            }
            if (position.y > this.position.y + deltaY) {
                this.position.y += deltaY;
            } else if (position.y < this.position.y - deltaY){
                this.position.y -= deltaY;
            }
        }
        
    },

    draw: function(context) {
        context.beginPath();
        context.lineWidth = 20;
        context.moveTo(this.position.x,this.position.y);
        context.lineTo(this.position.x,this.position.y+5);
        context.stroke();
    }

});
