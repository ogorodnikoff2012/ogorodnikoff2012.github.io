var DND = {};

DND.dragToProgram = function (evt) {
    evt.dataTransfer.setData("Text", evt.target.getAttribute("id"));
};

DND.dragFromProgram = function (img) {
    return function (evt) {
        var div = document.getElementById("program");
        var imgs = div.getElementsByTagName("img");
        evt.dataTransfer.setData("Text", [].indexOf.call(imgs, img));
    };
};

DND.allowDrop = function (evt) {
    evt.preventDefault();
};

DND.resetDrop = function(evt) {
    evt.preventDefault();
    var data = evt.dataTransfer.getData("Text");
    if (!data) return;
    var div = document.getElementById("program");
    var img = div.getElementsByTagName("img")[+data];
    img.onclick();
    var backspace = document.getElementById("backspace");
    backspace.onclick();
};

DND.programDrop = function (evt) {
    evt.preventDefault();
    var data = evt.dataTransfer.getData("Text");
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
            //var cBtn = DND.selectedAction.getElementsByTagName("button")[0];
            //cBtn.style.visibility = "hidden";

            DND.selectedAction = td;
            addClass(td, "selectedAction");
            //cBtn = DND.selectedAction.getElementsByTagName("button")[0];
            //cBtn.style.visibility = "visible";
        }
    })(td);

    img.ondragstart = DND.dragFromProgram(img);

    /*var closeButton = document.createElement("button");
     closeButton.innerHTML = "<b>X</b>";
     closeButton.style.backgroundColor = "rgba(0, 0, 0, 0)";
     closeButton.style.position = "absolute";
     //closeButton.style.visibility = "hidden";
     closeButton.onclick = (function(img) {
     return function(){
     img.onclick();
     var rem = document.getElementById("backspace");
     rem.onclick();
     };
     })(img);
     td.appendChild(closeButton);*/
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


function loadDragAndDrop() {
    var div = document.getElementById("program");
    div.ondrop = DND.programDrop;
    div.ondragover = DND.allowDrop;
}