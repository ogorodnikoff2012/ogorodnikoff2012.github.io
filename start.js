var field = new Field();
var fieldWrapper = document.getElementById("fieldWrapper");
fieldWrapper.style.width = (20 + Math.min(800, level.width * CELL_SIZE.width)) + "px";
fieldWrapper.style.height = (20 + Math.min(600, level.height * CELL_SIZE.height)) + "px";

if(!localStorage["level"]) {
	localStorage["level"] = level.player.level = 1;
} else {
	level.player.level = +localStorage["level"];
}

var programDiv = document.getElementById("program");
programDiv.style.width = fieldWrapper.style.width;
programDiv.style.height = 20 + 64;

loadAvailableCommands();
loadDragAndDrop();
initControls();
level.loadData();

updateLevelIndicator()
updateMoneyIndicator();