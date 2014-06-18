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
    stop.onclick = function () {
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

        img.ondblclick = (function (img) {
            return function () {
                var evt = {};
                evt.preventDefault = function () {
                };
                evt.dataTransfer = {};
                evt.dataTransfer.getData = function () {
                    return img.getAttribute("id");
                };
                DND.drop(evt);
            };
        })(img);

        img.addEventListener("touchmove", function(evt){
            evt.preventDefault();
        }, false);

        img.addEventListener("touchend", (function(img) {
            return function(evt){
                var touchobj = evt.changedTouches[0];
                var div = document.getElementById("program");
                var rect = div.getClientRects()[0];
                var x = touchobj.screenX, y = touchobj.screenY;
                //message.alert("X: " + x + "<br>Y: " + y + "<br>" + JSON.stringify(rect));
                if(x < rect.right && x > rect.left && y < rect.bottom && y > rect.top){
                    img.ondblclick();
                    /*if(!localStorage["touchScreenAlertFlag"]){
                        localStorage["touchScreenAlertFlag"] = true;
                        message.alert("Avoid using touch screen");
                    }*/
                }
            };
        })(img), false);
    }
}