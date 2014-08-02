/**@namespace message
 * */
var message = {};

/**Вывод сообщения о завершении программы. Есть кнопки перехода в гланое меню, на следующий уровень.
 * @param {boolean} flag выполнена ли миссия*/
message.endOfProgram = function (flag) {
    var text = i18n.translate("Mission " + (flag ? "completed" : "failed") + "!");
    var p = document.createElement("p");
    p.innerHTML = "<h1>" + text + "</h1>";
    p.style.fontSize = 20;
    p.style.fontFamily = "sans-serif";
    p.style.display = "table-cell";
    p.style.verticalAlign = "middle";
    msg.appendChild(p);

    var close = document.createElement("button");
    close.onclick = (function (message) {
        return function () {
            message.hideDialog();
            message.clearDialog();
        };
    })(this);
    close.style.position = "absolute";
    close.style.top = "0px";
    close.style.right = "0px";
    close.innerHTML = "X";
    msg.appendChild(close);

    var table = document.createElement("table");
    table.setAttribute("align", "center");
    p.appendChild(table);
    var tr = document.createElement("tr");
    table.appendChild(tr);

    var td = document.createElement("td");
    tr.appendChild(td);
    var menuButton = document.createElement("button");
    menuButton.innerHTML = i18n.translate("Go to main menu");
    menuButton.onclick = (function (message) {
        return function () {
            message.hideDialog();
            message.clearDialog();
            window.open("intro.html", "_self");
        };
    })(this);
    td.appendChild(menuButton);

    if (levelManager.getNextLevel() && flag) {
        td = document.createElement("td");
        tr.appendChild(td);
        var nextLevelButton = document.createElement("button");
        nextLevelButton.innerHTML = i18n.translate("Next level");
        nextLevelButton.onclick = (function (message) {
            return function () {
                message.hideDialog();
                message.clearDialog();
                window.open("game.html", "_self");
            };
        })(this);
        td.appendChild(nextLevelButton);
    }

    td = document.createElement("td");
    tr.appendChild(td);
    var retryButton = document.createElement("button");
    retryButton.innerHTML = i18n.translate("Retry");
    retryButton.onclick = (function (message) {
        return function () {
            message.hideDialog();
            message.clearDialog();
            level.reset();
        };
    })(this);
    td.appendChild(retryButton);

    this.resizeDialog(50, 30);
    this.showDialog();
};

/**Вывод сообщения об ошибке
 * @param {number} cnumber номер команды, на которой произошла ошибка
 * @param {string} message описание ошибки*/
message.badProgram = function (cnumber, message) {
    var p = document.createElement("p");
    p.innerHTML = "<h1>" + i18n.translate("Bad program!") +
        "</h1>" + i18n.translate("Error at command #") + (cnumber + 1) + "<br>" +
        i18n.translate("Error message: ") + message;
    p.style.fontSize = 20;
    p.style.fontFamily = "sans-serif";
    p.style.display = "table-cell";
    p.style.verticalAlign = "middle";
    msg.appendChild(p);

    var close = document.createElement("button");
    close.onclick = (function (message) {
        return function () {
            message.hideDialog();
            message.clearDialog();
            level.reset();
        };
    })(this);
    close.style.position = "absolute";
    close.style.top = "0px";
    close.style.right = "0px";
    close.innerHTML = "X";
    msg.appendChild(close);

    var table = document.createElement("table");
    table.setAttribute("align", "center");
    p.appendChild(table);
    var tr = document.createElement("tr");
    table.appendChild(tr);

    var td = document.createElement("td");
    tr.appendChild(td);
    var okButton = document.createElement("button");
    okButton.innerHTML = i18n.translate("OK");
    okButton.onclick = (function (message) {
        return function () {
            message.hideDialog();
            message.clearDialog();
            level.reset();
        };
    })(this);
    td.appendChild(okButton);

    this.resizeDialog(50, 30);
    this.showDialog();
    //alert("Bad program!");
};

/**Аналог стандартного confirm
 * @param {string} text выводимое сообщение
 * @param {function} [okFunction] действие после нажатия на кнопку OK
 * @param {function} [cancelFunction] действие после нажатия на кнопку Cancel*/
message.confirm = function (text, okFunction, cancelFunction) {
    var p = document.createElement("p");
    p.innerHTML = text;
    p.style.fontSize = 20;
    p.style.fontFamily = "sans-serif";
    p.style.display = "table-cell";
    p.style.verticalAlign = "middle";
    msg.appendChild(p);

    var table = document.createElement("table");
    table.setAttribute("align", "center");
    p.appendChild(table);
    var tr = document.createElement("tr");
    table.appendChild(tr);

    var td = document.createElement("td");
    tr.appendChild(td);
    var okButton = document.createElement("button");
    okButton.innerHTML = i18n.translate("OK");
    okButton.onclick = (function (message, okFunction) {
        return function () {
            message.hideDialog();
            message.clearDialog();
            if (okFunction) {
                okFunction();
            }
        };
    })(this, okFunction);
    td.appendChild(okButton);

    td = document.createElement("td");
    tr.appendChild(td);
    var cancelButton = document.createElement("button");
    cancelButton.innerHTML = i18n.translate("Cancel");
    cancelButton.onclick = (function (message, cancelFunction) {
        return function () {
            message.hideDialog();
            message.clearDialog();
            if (cancelFunction) {
                cancelFunction();
            }
        };
    })(this, cancelFunction);
    td.appendChild(cancelButton);

    this.resizeDialog(50, 30);
    this.showDialog();
};

/**Аналог стандартного alert
 * @param {string} text - выводимое сообщение
 * @param {function} [okFunction] - действие после нажатия на кнопку OK*/
message.alert = function (text, okFunction) {
    var p = document.createElement("p");
    p.innerHTML = text;
    p.style.fontSize = 20;
    p.style.fontFamily = "sans-serif";
    p.style.display = "table-cell";
    p.style.verticalAlign = "middle";
    msg.appendChild(p);

    var table = document.createElement("table");
    table.setAttribute("align", "center");
    p.appendChild(table);
    var tr = document.createElement("tr");
    table.appendChild(tr);

    var td = document.createElement("td");
    tr.appendChild(td);
    var okButton = document.createElement("button");
    okButton.innerHTML = i18n.translate("OK");
    okButton.onclick = (function (message, okFunction) {
        return function () {
            message.hideDialog();
            message.clearDialog();
            if (okFunction) {
                okFunction();
            }
        };
    })(this, okFunction);
    td.appendChild(okButton);

    this.resizeDialog(50, 30);
    this.showDialog();
};

/**Объекты DOM, с которыми работает message*/
message.nodes = {};

/**Инициализация, вызывается один раз в message.js*/
message.init = function () {
    var overlay = document.createElement("div");
    overlay.style.visibility = "hidden";
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "black";
    overlay.style.opacity = 0.5;
    overlay.setAttribute("id", "overlay");
    document.body.appendChild(overlay);
    this.nodes.overlay = overlay;

    var msg = document.createElement("div");
    msg.style.textAlign = "center";
    msg.style.visibility = "hidden";
    msg.style.position = "fixed";
    msg.style.backgroundColor = "white";
    msg.setAttribute("id", "msg");
    msg.setAttribute("align", "center");
    msg.setAttribute("text-align", "center");
    msg.setAttribute("align-content", "center");
    msg.setAttribute("valign", "center");
    msg.style.display = "table";
    document.body.appendChild(msg);
    this.nodes.msg = msg;
};

message.showDialog = function () {
    this.nodes.overlay.style.visibility = "visible";
    this.nodes.msg.style.visibility = "visible";
};

message.hideDialog = function () {
    this.nodes.overlay.style.visibility = "hidden";
    this.nodes.msg.style.visibility = "hidden";
};

message.resizeDialog = function (widthPercents, heightPercents) {
    var msg = this.nodes.msg;
    msg.style.width = widthPercents + "%";
    msg.style.height = heightPercents + "%";
    msg.style.left = (50 - 0.5 * widthPercents) + "%";
    msg.style.top = (50 - 0.5 * heightPercents) + "%";
};

message.clearDialog = function () {
    var msg = this.nodes.msg;
    while (msg.lastChild) msg.removeChild(msg.lastChild);
};

message.init();