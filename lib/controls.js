function initControls() {

    var play = document.getElementById("play");
    play.onclick = function () {
        var actions = [];
        var images = document.getElementById("program").getElementsByTagName("img");
        for (var i = 0; i < images.length; i++) {
            var img = images[i];
            actions[i] = Action[img.getAttribute("data-action")];
        }
        var prog = new Program(actions);
        level.exec(prog);
    };

    var stop = document.getElementById("stop");
    stop.onclick = function() {
        level.stop();
    };

    var reset = document.getElementById("reset");
    reset.onclick = function () {
        var tr = document.getElementById("program").getElementsByTagName("tr")[0];
        while (tr.firstChild) {
            tr.removeChild(tr.firstChild);
        }
    };

    var backspace = document.getElementById("backspace");
    backspace.onclick = function () {
        var tr = document.getElementById("program").getElementsByTagName("tr")[0];
        if (!tr.hasChildNodes()) return;
        tr.removeChild(DND.selectedAction);
        if (!tr.hasChildNodes()) return;
        DND.selectedAction = tr.lastChild;
        if (!DND.selectedAction.setAttribute) return;
        DND.selectedAction.setAttribute("class", "selectedAction");
    };
}

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

        img.ondblclick = (function(img){
            return function() {
                var evt = {};
                evt.preventDefault = function(){};
                evt.dataTransfer = {};
                evt.dataTransfer.getData = function(){
                    return img.getAttribute("id");
                };
                DND.drop(evt);
            };
        })(img);
    }
}