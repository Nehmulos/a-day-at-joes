function Conversation(lines) {
    
    this.lines = lines;
    this.latestLine = null;
    
    this.start = function() {
        
    }
    
    this.update = function(dt) {
        if (this.lines.length < 0 && !this.latestLine) {
            this.destroyed = true;
            return;
        }
        if (!this.latestLine) {
            this.sayNextLine();
        }
        
        if (this.latestLine.destroyed) {
            this.lines.splice(0,1);
            
            if (this.lines.length > 0) {
                this.sayNextLine();
            }
            return;
        }
        this.latestLine.update(dt);
    }
    
    this.sayNextLine = function() {
        this.latestLine = this.lines[0];
        this.latestLine.say();
    }
}

function ConversationLine(args) {
    this.actor = args.actor;
    this.text = args.text;
    this.duration = args.duration;
    this.nextDuration = args.next || 3;
    this.nextCallback = args.nextCallback;
    
    this.timer = 0;
    
    this.update = function(dt) {
        this.timer += dt;
        if (!this.destroyed && this.timer > this.nextDuration) {
            if (this.nextCallback) {
                this.nextCallback();
            }
            this.destroyed = true;
        }
    }
    
    this.say = function() {
        if (this.actor && this.text) {
            this.actor.say(this.text, this.duration);
        }
    }
}
