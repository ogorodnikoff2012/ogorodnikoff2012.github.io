function Action(minLevel, action, filename) {
    this.minLevel = minLevel;
    this.action = action;
    this.filename = filename;
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
}, "img/forward.png");

Action.MOVE_BACKWARD = new Action(1, function () {
    var player = level.player;
    var reqX = player.reqX;
    var reqY = player.reqY;
    switch (((player.reqOrientation % 4) + 4) % 4) {
        case Actor.NORTH:
            ++reqY;
            break;
        case Actor.EAST:
            --reqX;
            break;
        case Actor.SOUTH:
            --reqY;
            break;
        case Actor.WEST:
            ++reqX;
            break;
    }
    if (!field.canPlayerMoveTo(reqX, reqY))    return false;
    player.reqX = reqX;
    player.reqY = reqY;
    return true;
}, "img/backward.png");

Action.TURN_CLOCKWISE = new Action(1, function () {
    var player = level.player;
    if (!field.canPlayerTurn()) return false;
    player.reqOrientation++;
    return true;
}, "img/turn_clockwise.png");

Action.TURN_ANTICLOCKWISE = new Action(1, function () {
    var player = level.player;
    if (!field.canPlayerTurn()) return false;
    player.reqOrientation--;
    return true;
}, "img/turn_anticlockwise.png");

function Program(actions) {
	this.actions = actions;
    this.counter = -1;

    this.nextAction = function() {
        this.counter++;
        if (this.counter == this.actions.length) {
			return null;
		}
        return this.actions[this.counter];
    };

    this.resetProgram = function() {
        this.counter = -1;
    };

    this.currentActionIndex = function () {
        return this.counter;
    }
}