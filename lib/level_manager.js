var levelManager = {};

levelManager.numOfLevels = 4;

levelManager.getNextLevel = function () {
    var lastLevel = localStorage["lastLevel"];
    if (lastLevel) {
        var num = +lastLevel + 1;
        if (num > this.numOfLevels) {
            return null;
        }
        return num;
    }
    return 1;
};