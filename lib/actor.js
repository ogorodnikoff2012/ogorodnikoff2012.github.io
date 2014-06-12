function Actor(x, y, orientation) {
    this.reqX = x;
    this.reqY = y;
    this.reqOrientation = orientation;
    this.curX = x;
    this.curY = y;
    this.curOrientation = orientation;
    this.level = 1;
    this.SPEED_QUANT = 0.025;
    //this.memory = [];
    this.image = new Image();
    this.image.src = "./img/player.png";

    this.isReady = function () {
        return this.reqX == this.curX && this.reqY == this.curY
            && this.reqOrientation == this.curOrientation;
    };

    this.move = function()	{
		var speed = this.SPEED_QUANT * this.level;
		var dx = this.reqX - this.curX;
		var dy = this.reqY - this.curY;
		var da = this.reqOrientation - this.curOrientation;
		if (Math.abs(dx) < speed)
			this.curX = this.reqX;
		else
			this.curX += speed * this.signum(dx);

		if (Math.abs(dy) < speed)
			this.curY = this.reqY;
		else
			this.curY += speed * this.signum(dy);

		if (Math.abs(da) < speed)
			this.curOrientation = this.reqOrientation;
		else
			this.curOrientation += speed * this.signum(da);
    };

    this.signum = function(a) {
		return a > 0 ? 1 : a == 0 ? 0 : -1;
    };
}

Actor.NORTH = 0;
Actor.EAST = 1;
Actor.SOUTH = 2;
Actor.WEST = 3;
Actor.MAX_LEVEL = 5;