function Cell(filename) {

	this.isWall = function() {
		return false;
	}
	
	this.image = new Image();
	this.image.src = filename;
}

Cell.EMPTY_CELL = new Cell("./img/empty.png");