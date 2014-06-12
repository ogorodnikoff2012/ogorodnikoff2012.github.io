function Action(minLevel, action) {
	this.minLevel = minLevel;
	this.action = action;
}

Action.MOVE_FORWARD = new Action(1, function() {
	var player = level.player;
	var reqX = player.reqX;
	var reqY = player.reqY;
	switch (((player.reqOrientation % 4) + 4) % 4) {
		case Actor.NORTH:
			--reqY;
			break;
		case Actor.EAST:
			++reqX;
			break;
		case Actor.SOUTH:
			++reqY;
			break;
		case Actor.WEST:
			--reqX;
			break;
	}
		if (!field.canPlayerMoveTo(reqX, reqY))	return false;
	player.reqX = reqX;
	player.reqY = reqY;
	return true;
});

function Program(actions) {
	this.actions = actions;
	this.counter = 0;
		
	this.nextAction = function() {
		if (this.counter == this.actions.length) {
			return null;
		}
		return this.actions[this.counter++];
	}

    this.resetProgram = function() {
        this.counter = 0;
    }
}