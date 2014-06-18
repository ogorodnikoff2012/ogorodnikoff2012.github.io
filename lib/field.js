/**Класс для хранения ширины и высоты объекта
 * @constructor
 * @param width ширина объекта
 * @param height высота объекта
 * */
function Dimension(width, height) {
    this.width = width;
    this.height = height;
}

/**Размер клетки
 * @constant*/
var CELL_SIZE = new Dimension(40, 40);

/**Класс, отвечающий за отрисовку уровня, игроков и так далее
 * @constructor*/
function Field() {

    var canvas = document.getElementById("field");
    canvas.width = CELL_SIZE.width * level.width;
    canvas.height = CELL_SIZE.height * level.height;

    /**Метод отрисовки*/
    this.paint = function () {
        var canvas = document.getElementById("field");
        var context = canvas.getContext("2d");
        for (var x = 0; x < level.width; ++x) {
            for (var y = 0; y < level.height; ++y) {
                context.drawImage(level.cells[x][y].image,
                    x * CELL_SIZE.width, y * CELL_SIZE.height);
                if (level.coins[x][y]) {
                    context.drawImage(coin.getCurrentFrame(),
                        x * CELL_SIZE.width, y * CELL_SIZE.height);
                }
            }
        }

        coin.update();

        context.translate(level.player.curX * CELL_SIZE.width, level.player.curY * CELL_SIZE.height);
        context.translate(CELL_SIZE.width / 2, CELL_SIZE.height / 2);
        context.rotate(level.player.curOrientation * Math.PI / 2);
        context.translate(-CELL_SIZE.width / 2, -CELL_SIZE.height / 2);
        context.drawImage(level.player.image, 0, 0);
        context.setTransform(1, 0, 0, 1, 0, 0);
    };

    /**Интервал таймера отрисовки*/
    this.repaintInterval = setInterval(this.paint, 25);
}