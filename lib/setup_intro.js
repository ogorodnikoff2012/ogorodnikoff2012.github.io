i18n.setLanguage("ru");

if (!window.localStorage) {
    alert("Your browser is too old. This game won't work properly.");
}

var newGame = document.getElementById("newGame");
var resumeGame = document.getElementById("resumeGame");
var chooseLevel = document.getElementById("chooseLevel");

function openNewGame() {
    localStorage.clear();
    localStorage["maxLevel"] = 0;
    window.open("game.html", "_self");
}

newGame.onclick = function () {
    if (localStorage.length > 0) {
        message.confirm(i18n.translate("Do you want to start new game?"), openNewGame);
    } else {
        openNewGame();
    }
};

resumeGame.onclick = function () {
    localStorage["lastLevel"] = localStorage["maxLevel"];
    window.open("game.html", "_self");
};

chooseLevel.onclick = function () {
    window.open("level.html", "_self");
};

updateLevelIndicator(ON_INTRO_PAGE);
updateMoneyIndicator(ON_INTRO_PAGE);