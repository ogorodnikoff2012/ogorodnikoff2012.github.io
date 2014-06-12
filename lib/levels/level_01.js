var level = new Level();

level.reset = function () {
    this.player = new Actor(0, 0, Actor.NORTH);
};

level.init = function() {
    level.reset();
    this.width = 10;
    this.height = 10;
    this.cells = [];
    for (var x = 0; x < this.width; x++) {
        this.cells[x] = [];
		for (var y = 0; y < this.height; y++) {
			this.cells[x][y] = Cell.EMPTY_CELL;
		}
	}
};

level.init();