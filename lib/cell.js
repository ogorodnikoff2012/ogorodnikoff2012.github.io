function Cell(filename) {

    this.isWall = function () {
        return false;
    };

    this.image = new Image();
    this.image.src = filename;
}

Cell.EMPTY_CELL = new Cell("./img/cells/empty.png");
Cell.START_CELL = new Cell("./img/cells/start.png");
Cell.END_CELL = new Cell("./img/cells/end.png");
Cell.WALL_CELL = new Cell("./img/cells/wall.png");

Cell.WALL_CELL.isWall = function () {
    return true;
};