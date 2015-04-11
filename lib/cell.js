/**
 * Клетка поля
 * @param {string} filename - файл с текстурой
 * @constructor
 */
function Cell(filename) {

    /**
     * Возвращает пустую строку, если через эту клетку можно пройти, иначе сообщение об ошибке
     * @returns {string}
     */
    this.isWall = function () {
        return "";
    };

    /**
     * Обработчик события входа в данную клетку
     * @param {Actor} actor - сущность, вышедшая с клетки
     */
    this.stepIn = function (actor) {

    };

    /**
     * Обработчик события выхода из данной клетки
     * @param {Actor} actor - сущность, вышедшая с клетки
     */
    this.stepOut = function (actor) {

    };

    /**
     * Текстура
     * @type {Image}
     */
    this.image = new Image();
    this.image.src = filename;
}

Cell.EMPTY_CELL = new Cell("./img/cells/empty.png");
Cell.START_CELL = new Cell("./img/cells/start.png");
Cell.END_CELL = new Cell("./img/cells/end.png");
Cell.WALL_CELL = new Cell("./img/cells/wall.png");
Cell.OPENED_TRAP_CELL = new Cell("./img/cells/open.png");
Cell.CLOSED_TRAP_CELL = new Cell("./img/cells/close.png");

/**
 * @see Cell.stepOut()
 * @param {Actor} actor - сущность, вышедшая с клетки
 */
Cell.CLOSED_TRAP_CELL.stepOut = function (actor) {
    var x = actor.curX, y = actor.curY;
    setTimeout((function (x, y) {
        return function () {
            level.cells[x][y] = Cell.OPENED_TRAP_CELL;
        };
    })(x, y), 200);
};

Cell.OPENED_TRAP_CELL.isWall = function () {
    return i18n.translate("There is a hole here!");
};

Cell.WALL_CELL.isWall = function () {
    return i18n.translate("I cannot walk through walls!");
};