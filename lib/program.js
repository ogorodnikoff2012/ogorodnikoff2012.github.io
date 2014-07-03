function Action(minLevel, action, filename) {
    this.minLevel = minLevel;
    this.action = action;
    this.filename = filename;
}

Action.MOVE_FORWARD = new Action(1, function () {
    var player = level.player;
    var reqX = player.reqX;
    var reqY = player.reqY;
    var dx = 0;
    var dy = 0;
    switch (((player.reqOrientation % 4) + 4) % 4) {
        case Actor.NORTH:
            dy = -1;
            break;
        case Actor.EAST:
            dx = 1;
            break;
        case Actor.SOUTH:
            dy = 1;
            break;
        case Actor.WEST:
            dx = -1;
            break;
    }

    if (!level.canPlayerMoveTo(reqX + dx, reqY + dy)) {
        player.reqX = reqX + 0.2 * dx;
        player.reqY = reqY + 0.2 * dy;
        return level.getErrorMessage();
    }
    player.reqX = reqX + dx;
    player.reqY = reqY + dy;
    return "";
}, "img/actions/forward.png");

Action.MOVE_BACKWARD = new Action(1, function () {
    var player = level.player;
    var reqX = player.reqX;
    var reqY = player.reqY;
    var dx = 0;
    var dy = 0;
    switch (((player.reqOrientation % 4) + 4) % 4) {
        case Actor.NORTH:
            dy = 1;
            break;
        case Actor.EAST:
            dx = -1;
            break;
        case Actor.SOUTH:
            dy = -1;
            break;
        case Actor.WEST:
            dx = 1;
            break;
    }

    if (!level.canPlayerMoveTo(reqX + dx, reqY + dy)) {
        player.reqX = reqX + 0.2 * dx;
        player.reqY = reqY + 0.2 * dy;
        return level.getErrorMessage();
    }
    player.reqX = reqX + dx;
    player.reqY = reqY + dy;
    return "";
}, "img/actions/backward.png");

Action.TURN_CLOCKWISE = new Action(1, function () {
    var player = level.player;
    if (!level.canPlayerTurn()) return false;
    player.reqOrientation++;
    return "";
}, "img/actions/turn_clockwise.png");

Action.TURN_ANTICLOCKWISE = new Action(1, function () {
    var player = level.player;
    if (!level.canPlayerTurn()) return false;
    player.reqOrientation--;
    return "";
}, "img/actions/turn_anticlockwise.png");

function Program(actions) {
    this.actions = actions;
    this.counter = -1;

    this.nextAction = function () {
        this.counter++;
        if (this.counter == this.actions.length) {
            return null;
        }
        return this.actions[this.counter];
    };

    this.resetProgram = function () {
        this.counter = -1;
    };

    this.currentActionIndex = function () {
        return this.counter;
    }
}