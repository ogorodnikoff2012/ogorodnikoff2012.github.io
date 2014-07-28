function Cell(filename) {

    this.isWall = function () {
        return "";
    };

    this.stepIn = function() {

    }

    this.stepOut = function() {

    }

    this.image = new Image();
    this.image.src = filename;
}

Cell.EMPTY_CELL = new Cell("./img/cells/empty.png");
Cell.START_CELL = new Cell("./img/cells/start.png");
Cell.END_CELL = new Cell("./img/cells/end.png");
Cell.WALL_CELL = new Cell("./img/cells/wall.png");
Cell.OPENED_TRAP_CELL = new Cell("./img/cells/open.png");
Cell.CLOSED_TRAP_CELL = new Cell("./img/cells/close.png");

Cell.CLOSED_TRAP_CELL.stepOut = function() {
	var x = level.player.curX, y = level.player.curY;
    setTimeout((function(x, y) {
		return function() {
			level.cells[x][y] = Cell.OPENED_TRAP_CELL;
		};
	})(x, y), 200);
}

Cell.OPENED_TRAP_CELL.isWall = function () {
    return i18n.translate("There is a hole here!");
}

Cell.WALL_CELL.isWall = function () {
    return i18n.translate("I cannot walk through walls!");
};