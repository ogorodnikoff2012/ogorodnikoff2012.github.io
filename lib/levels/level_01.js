var level = {
	width: 10,
	height: 10,
	cells: [], 
	player: new Actor()
};

level.init = function() {
	for (var x = 0; x < this.width; x++) {
		this.cells[x] = [];
		for (var y = 0; y < this.height; y++) {
			this.cells[x][y] = Cell.EMPTY_CELL;
		}
	}
	/*
	this.player.reqX = 5;
	this.player.reqY = 5;
	this.player.curX = 5;
	this.player.curY = 5;
	this.player.reqOrientation = Actor.WEST;
	*/
}

level.init();