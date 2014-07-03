var level = new Level();

level.reset = function () {
    this.def_reset();
    this.player.reqX = this.player.curX = 0;
    this.player.reqY = this.player.curY = 0;
    this.player.reqOrientation = this.player.curOrientation = Actor.EAST;
    this.coins[4][4] = true;
};

level.init = function () {
    this.player = new Actor(0, 0, Actor.EAST);
    this.width = 10;
    this.height = 10;
    this.cells = [];
    this.levelName = 3;
    for (var x = 0; x < this.width; x++) {
        this.cells[x] = [];
        this.coins[x] = [];
        for (var y = 0; y < this.height; y++) {
            this.cells[x][y] = Cell.EMPTY_CELL;
            this.coins[x][y] = false;
        }
    }

    this.cells[0][0] = Cell.START_CELL;
    this.cells[1][1] = Cell.WALL_CELL;
    this.cells[2][2] = Cell.WALL_CELL;
    this.cells[3][3] = Cell.WALL_CELL;
    this.cells[5][5] = Cell.WALL_CELL;
    this.cells[6][6] = Cell.WALL_CELL;
    this.cells[7][7] = Cell.WALL_CELL;
    this.cells[8][8] = Cell.WALL_CELL;
    this.cells[9][9] = Cell.END_CELL;

    this.coins[4][4] = true;
};

level.check = function () {
    return this.cells[this.player.reqX][this.player.reqY] == Cell.END_CELL;
}

level.init();





