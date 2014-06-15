var level = new Level();

level.reset = function () {
    this.player.reqX = this.player.curX = 0;
    this.player.reqY = this.player.curY = 0;
    this.player.reqOrientation = this.player.curOrientation = Actor.NORTH;
};

level.init = function() {
    this.player = new Actor(0, 0, Actor.NORTH);
    this.width = 10;
    this.height = 10;
    this.cells = [];
    for (var x = 0; x < this.width; x++) {
        this.cells[x] = [];
		for (var y = 0; y < this.height; y++) {
			this.cells[x][y] = Cell.EMPTY_CELL;
		}
	}

    this.cells[0][0] = Cell.START_CELL;
    this.cells[5][5] = Cell.END_CELL;
};

level.check = function() {
    return this.cells[this.player.reqX][this.player.reqY] == Cell.END_CELL;
}

level.init();