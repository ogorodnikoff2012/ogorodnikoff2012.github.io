var DND = {};

DND.dragToProgram = function (evt) {
    DND.dataTransfer["Text"] = evt.target.getAttribute("id");
};

DND.dataTransfer = {};

DND.dragFromProgram = function (img) {
    return function (evt) {
        var div = document.getElementById("program");
        var imgs = div.getElementsByTagName("img");
        DND.dataTransfer["Text"] = [].indexOf.call(imgs, img);
        img.onclick();
    };
};

DND.allowDrop = function (evt) {
    evt.preventDefault();
};

DND.resetDrop = function (evt) {
    evt.preventDefault();
    var data = "" + DND.dataTransfer["Text"];
    if (!data) return;
    var div = document.getElementById("program");
    var img = div.getElementsByTagName("img")[+data];
    img.onclick();
    var backspace = document.getElementById("backspace");
    backspace.onclick();
};

DND.programDrop = function (evt) {
    evt.preventDefault();
    var data = DND.dataTransfer["Text"];
    if (!data) return;
    //console.log(data);
    var div = document.getElementById("program");
    var img = document.getElementById(data).cloneNode(true);
    img.removeAttribute("id");
    img.removeAttribute("draggable");
    img.setAttribute("data-action", data);

    //img.style.display = "inline";
    var td = document.createElement("td");

    img.onclick = (function (td) {
        return function () {
            removeClass(DND.selectedAction, "selectedAction");
            DND.selectedAction = td;
            addClass(td, "selectedAction");
        }
    })(td);

    img.ondragstart = DND.dragFromProgram(img);

    img.addEventListener("touchstart", (function(img) {
        return function(evt) {
            DND.dragFromProgram(img)(evt);
            DND.touchStart(img)(evt);
        };
    })(img), false);

    img.addEventListener("touchmove", DND.touchMove, false);

    img.addEventListener("touchend", function(evt) {
            var touchobj = evt.changedTouches[0];
            document.body.removeChild(DND.actionSprite);
            var btn = document.getElementById("reset");
            var rect = btn.getClientRects()[0];
            var x = touchobj.clientX, y = touchobj.clientY;
            if (x < rect.right && x > rect.left && y < rect.bottom && y > rect.top) {
                DND.resetDrop(evt);
            }
        }, false);

    td.appendChild(img);

    var tr = div.getElementsByTagName("tr")[0];
    var tds = tr.getElementsByTagName("td");

    var idx = 0;
    for (var i = 0; i < tds.length; i++)
        if (isInClass(tds[i], "selectedAction"))
            idx = i;
    idx++;

    if (idx == tds.length) {
        tr.appendChild(td);
    } else {
        tr.insertBefore(td, tds[idx]);
    }

    setTimeout(function () {
        div.scrollLeft = td.offsetLeft - 20;
    }, 50);

    if (DND.selectedAction) removeClass(DND.selectedAction, "selectedAction");
    DND.selectedAction = td;
    addClass(td, "selectedAction");
};

DND.touchStart = function (img) {
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
};

DND.touchMove = function (evt) {
    evt.preventDefault();
    var touchobj = evt.changedTouches[0];
    var sprite = DND.actionSprite;
    sprite.style.left = (touchobj.pageX - (sprite.width / 2)) + "px";
    sprite.style.top = (touchobj.pageY - (sprite.height / 2)) + "px";
};

DND.touchEnd = function (img) {
    return function (evt) {
        var touchobj = evt.changedTouches[0];
        document.body.removeChild(DND.actionSprite);
        var div = document.getElementById("program");
        var rect = div.getClientRects()[0];
        var x = touchobj.clientX, y = touchobj.clientY;
        if (x < rect.right && x > rect.left && y < rect.bottom && y > rect.top) {
          img.ondblclick();
        }
    };
};


function loadDragAndDrop() {
    var div = document.getElementById("program");
    div.ondrop = DND.programDrop;
    div.ondragover = DND.allowDrop;
}