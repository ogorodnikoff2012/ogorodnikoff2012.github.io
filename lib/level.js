function Level() {
    this.width = 0;
    this.height = 0;
    this.cells = [];
    this.coins = [];
    this.player = new Actor(0, 0, Actor.NORTH);
    this.collectedCoins = 0;
    this.previousCoins = 0;
    this.levelName = 1;

    this.update = (function (level) {
        return function () {
            level.player.move();
            if (level.player.isReady()) {
                var x = level.player.curX;
                var y = level.player.curY;
                if (level.coins[x] && level.coins[x][y]) {
                    level.coins[x][y] = false;
                    level.collectedCoins++;
                    updateMoneyIndicator();
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

                        var flag = level.check();
                        if (flag) {
                            level.saveData();
                            //localStorage["finished_" + level.levelName] = true;
                        }

                        message.endOfProgram(flag);
                    } else {

                        if (this.td) removeClass(this.td, "currentAction");

                        var div = document.getElementById("program");
                        this.td = div.getElementsByTagName("td")[program.currentActionIndex()];
                        addClass(this.td, "currentAction");

                        var ans = action.action();
                        if (ans) {
                            level.stop();
                            message.badProgram(program.currentActionIndex(), ans);
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

    this.check = function () {
        return true;
    };

    this.loadData = function () {
        if (localStorage["coins"] == undefined) {
            localStorage["coins"] = this.previousCoins = 0;
        } else {
            this.previousCoins = +localStorage["coins"];
        }
        if (localStorage["level"] == undefined) {
            localStorage["level"] = this.player.level = 0;
        } else {
            this.player.level = +localStorage["level"];
        }
        /*if (localStorage["finished_" + this.levelName]) {
         for (var x = 0; x < this.width; x++) {
         for (var y = 0; y < this.height; y++) {
         this.coins[x][y] = false;
         }
         }
         }*/
    };

    this.saveData = function () {
        localStorage["coins"] = this.previousCoins + this.collectedCoins;
        localStorage["lastLevel"] = this.levelName;
        localStorage["level"] = this.player.level;
        if (!localStorage["maxLevel"] || +localStorage["maxLevel"] < this.levelName) {
            localStorage["maxLevel"] = this.levelName;
        }
    };

    this.def_reset = function () {
        this.collectedCoins = 0;
        updateMoneyIndicator();
    };

    this.reset = function () {
        this.def_reset();
    };

}