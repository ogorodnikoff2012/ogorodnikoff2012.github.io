var DND = {};

DND.drag = function (evt) {
    evt.dataTransfer.setData("Text", evt.target.getAttribute("id"));
};

DND.allowDrop = function (evt) {
    evt.preventDefault();
};

DND.drop = function (evt) {
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
    td.appendChild(img);


    img.onclick = (function (td) {
        return function () {
            removeClass(DND.selectedAction, "selectedAction");
            DND.selectedAction = td;
            addClass(td, "selectedAction");
        }
    })(td);
    
    var tr = div.getElementsByTagName("tr")[0];
    var tds = tr.getElementsByTagName("td");

    var idx = 0;
    for(var i = 0; i < tds.length; i++)
        if(isInClass(tds[i], "selectedAction"))
            idx = i;
    idx++;

    if(idx == tds.length) {
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
    div.ondrop = DND.drop;
    div.ondragover = DND.allowDrop;
}