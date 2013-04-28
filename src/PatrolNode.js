function PatrolNode(args) {
    this.x = args.x;
    this.y = args.y;
    if (args.duration != undefined && args.duration != null) {
        this.duration = args.duration;
    } else {
        this.duration = 3;
    }
    this.rotation = args.rotation || 0;
    this.remove = args.remove || false;
}
