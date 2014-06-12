var field = new Field();
var fieldWrapper = document.getElementById("fieldWrapper");
fieldWrapper.style.width = (20 + Math.min(800, level.width * CELL_SIZE.width)) + "px";
fieldWrapper.style.height = (20 + Math.min(600, level.height * CELL_SIZE.height)) + "px";