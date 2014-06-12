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
        field.exec(prog);
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
        tr.removeChild(tr.lastChild);
    };
}