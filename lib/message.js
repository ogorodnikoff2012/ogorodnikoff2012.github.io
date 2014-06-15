var message = {};

message.endOfProgram = function(flag) {
    alert("Mission " + (flag ? "completed" : "failed") + "!");
};

message.badProgram = function() {
    alert("Bad program!");
};

message.nodes = {};

message.init = function() {
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
    msg.style.visibility = "hidden";
    msg.style.position = "fixed";
    msg.style.backgroundColor = "white";
    msg.setAttribute("id", "msg");
    document.body.appendChild(msg);
    this.nodes.msg = msg;
};

message.showDialog = function() {
    this.nodes.overlay.style.visibility = "visible";
    this.nodes.msg.style.visibility = "visible";
};

message.hideDialog = function() {
    this.nodes.overlay.style.visibility = "hidden";
    this.nodes.msg.style.visibility = "hidden";
};

message.resizeDialog = function(widthPercents, heightPercents) {
    var msg = this.nodes.msg;
    msg.style.width = widthPercents + "%";
    msg.style.height = heightPercents + "%";
    msg.style.left = (50 - 0.5 * widthPercents) + "%";
    msg.style.top = (50 - 0.5 * heightPercents) + "%";
};

message.clearDialog = function() {
    var msg = this.nodes.msg;
    while(msg.lastChild) msg.removeChild(msg.lastChild);
};

message.init();