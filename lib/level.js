function Level() {
    this.width = 0;
    this.height = 0;
    this.cells = [];
    this.coins = [];
    this.player = new Actor(0, 0, Actor.NORTH);
    this.collectedCoins = 0;
    this.levelName = "01";

    this.update = (function (level) {
        return function () {
            level.player.move();
            if(level.player.isReady()) {
                var x = level.player.curX;
                var y = level.player.curY;
                if(level.coins[x] && level.coins[x][y])
                {
                    level.coins[x][y] = false;
                    level.collectedCoins++;
                }
            }
        }
    })(this);

    this.updateInterval = setInterval(this.update, 25);

    this.canPlayerMoveTo = function (x, y) {
        return !(x < 0 || y < 0 || x >= this.width || y >= this.height || this.cells[x][y].isWall());
    };

    this.canPlayerTurn = function () {
        return true;
    };

    this.execLock = false;
    this.execInterval = 0;

    this.exec = function (program) {
        if (this.execLock) return;
        this.execLock = true;
        program.resetProgram();
        this.reset();
        var execFunction = (function (level) {

            return function () {
                if (level.player.isReady()) {
                    var action = program.nextAction();
                    if (!action) {
                        level.stop();
                        if (this.td) removeClass(this.td, "currentAction");
                        message.endOfProgram(level.check());
                    } else {

                        if (this.td) removeClass(this.td, "currentAction");

                        var div = document.getElementById("program");
                        this.td = div.getElementsByTagName("td")[program.currentActionIndex()];
                        addClass(this.td, "currentAction");

                        if (!action.action()) {
                            level.stop();
                            message.badProgram();
                        }
                    }
                }
                setTimeout(function () {
                    var div = document.getElementById("program");
                    var tds = div.getElementsByTagName("td");
                    var idx = -1;
                    for (var i = 0; i < tds.length; i++)
                        if (isInClass(tds[i], "currentAction"))
                            idx = i;
                    if (idx < 0) return;
                    var td = tds[idx];
                    div.scrollLeft = td.offsetLeft - 20;
                }, 50);
            }
        })(this);

        this.execInterval = setInterval(execFunction, 50);
    };

    this.stop = function () {
        if (this.execInterval) {
            clearInterval(this.execInterval);
            this.execLock = false;
        }
    };

    this.check = function() {
        return true;
    }

    this.loadData = function() {
        this.collectedCoins = +getCookie("coins", 0);
    }

    this.saveData = function() {
        setCookie("coins", this.collectedCoins, 30);
        setCookie("lastLevel", this.levelName, 30);
    }
}