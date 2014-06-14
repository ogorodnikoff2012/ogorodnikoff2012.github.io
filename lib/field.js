function Dimension(width, height) {
    this.width = width;
    this.height = height;
}

var CELL_SIZE = new Dimension(40, 40);

function Field() {

    var canvas = document.getElementById("field");
    canvas.width = CELL_SIZE.width * level.width;
    canvas.height = CELL_SIZE.height * level.height;


    this.paint = function () {
        var canvas = document.getElementById("field");
        var context = canvas.getContext("2d");
        for (var x = 0; x < level.width; ++x)
            for (var y = 0; y < level.height; ++y)
                context.drawImage(level.cells[x][y].image,
                    x * CELL_SIZE.width, y * CELL_SIZE.height);

        context.translate(level.player.curX * CELL_SIZE.width, level.player.curY * CELL_SIZE.height);
        context.translate(CELL_SIZE.width / 2, CELL_SIZE.height / 2);
        context.rotate(level.player.curOrientation * Math.PI / 2);
        context.translate(-CELL_SIZE.width / 2, -CELL_SIZE.height / 2);
        context.drawImage(level.player.image, 0, 0);
        context.setTransform(1, 0, 0, 1, 0, 0);
    };
    this.repaintInterval = setInterval(this.paint, 25);
}