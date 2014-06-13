var DND = {};

DND.drag = function (evt) {
    evt.dataTransfer.setData("Action", evt.target.getAttribute("id"));
};

DND.allowDrop = function (evt) {
    evt.preventDefault();
};

DND.drop = function (evt) {
    evt.preventDefault();
    var data = evt.dataTransfer.getData("Action");
    if (!data) return;
    //console.log(data);
    var div = document.getElementById("program");
    var img = document.getElementById(data).cloneNode(true);
    img.removeAttribute("id");
    img.removeAttribute("draggable");
    img.setAttribute("data-action", data);

    //img.style.display = "inline";
    var td = document.createElement("td");
    td.appendChild(img);


    img.onclick = (function (td) {
        return function () {
            DND.selectedAction.removeAttribute("class");
            DND.selectedAction = td;
            td.setAttribute("class", "selectedAction");
        }
    })(td);


    if (DND.selectedAction) DND.selectedAction.removeAttribute("class");
    DND.selectedAction = td;
    td.setAttribute("class", "selectedAction");
    var tr = div.getElementsByTagName("tr")[0];
    tr.appendChild(td);
};

function loadAvailableCommands() {
    var commands = document.getElementById("availableCommands");
    for (var action in Action) {
        if (Action[action].minLevel > level.player.level) continue;
        var div = commands.appendChild(document.createElement("div"));
        div.setAttribute("class", "commandDiv");
        var img = div.appendChild(document.createElement("img"));
        img.setAttribute("src", Action[action].filename);
        img.setAttribute("id", action);
        img.setAttribute("draggable", true);
        img.ondragstart = DND.drag;
    }
}
function loadDragAndDrop() {
    var div = document.getElementById("program");
    div.ondrop = DND.drop;
    div.ondragover = DND.allowDrop;
}