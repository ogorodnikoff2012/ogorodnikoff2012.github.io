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
    reset.ondrop = DND.resetDrop;
    reset.ondragover = DND.allowDrop;

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
        img.ondragstart = DND.dragToProgram;

        img.ondblclick = (function (img) {
            return function () {
                var evt = {};
                evt.preventDefault = function () {
                };
                evt.dataTransfer = {};
                evt.dataTransfer.getData = function () {
                    return img.getAttribute("id");
                };
                DND.programDrop(evt);
            };
        })(img);

        img.addEventListener("touchstart", (function (img) {
            return function (evt) {
                evt.preventDefault(); 
                var touchobj = evt.changedTouches[0];
                var sprite = DND.actionSprite = img.cloneNode(true);
                sprite.style.opacity = 0.5; 
                sprite.style.position = "absolute"; 
                sprite.style.left = (touchobj.pageX - (sprite.width / 2)) + "px";
                sprite.style.top = (touchobj.pageY - (sprite.height / 2)) + "px";
                document.body.appendChild(sprite); 
            };
        })(img), false);

        img.addEventListener("touchmove", function (evt) {
            evt.preventDefault(); 
            var touchobj = evt.changedTouches[0];
            var sprite = DND.actionSprite; 
            sprite.style.left = (touchobj.pageX - (sprite.width / 2)) + "px";
            sprite.style.top = (touchobj.pageY - (sprite.height / 2)) + "px";
        }, false);

        img.addEventListener("touchend", (function (img) {
            return function (evt) {
                var touchobj = evt.changedTouches[0]; 
                document.body.removeChild(DND.actionSprite);
                var div = document.getElementById("program");
                var rect = div.getClientRects()[0]; 
                var x = touchobj.clientX, y = touchobj.clientY;
                //message.alert("X: " + x + "<br>Y: " + y + "<br>" + JSON.stringify(rect));
                if (x < rect.right && x > rect.left && y < rect.bottom && y > rect.top) {
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