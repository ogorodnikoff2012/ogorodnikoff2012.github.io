var message = {};

message.endOfProgram = function(flag) {
    var text = "Mission " + (flag ? "completed" : "failed") + "!";
	var p = document.createElement("p");
	p.innerHTML = "<h1>" + text + "</h1>";
	p.style.fontSize = 20;
	p.style.fontFamily = "sans-serif";
	p.style.display = "table-cell";
	p.style.verticalAlign = "middle";
	msg.appendChild(p);
	
	var close = document.createElement("button");
	close.onclick = (function(message) {
		return function() {
			message.hideDialog();
			message.clearDialog();
		};
	})(this);
	close.style.position = "absolute";
	close.style.top = "0px";
	close.style.right = "0px";
	close.innerText = "X";
	msg.appendChild(close);
	
	var table = document.createElement("table");
	p.appendChild(table);
	var tr = document.createElement("tr");
	table.appendChild(tr);
	var td = document.createElement("td");
	tr.appendChild(td);
	var menuButton = document.createElement("button");
	menuButton.innerText = "Go to main menu";
	menuButton.onclick = (function(message, flag) {
		return function() {
			message.hideDialog();
			message.clearDialog();
			level.saveData();
			if(flag) {
				localStorage["finished_" + level.levelName] = true;
			}
			window.open("intro.html", "_self");
		};
	})(this, flag);
	td.appendChild(menuButton);
	
	this.resizeDialog(50, 30);
	this.showDialog();
};

message.badProgram = function(cnumber, message) {
	var p = document.createElement("p");
	p.innerHTML = "<h1>Bad program!</h1>Error at command #"+(cnumber+1)+"<br>Error message: "+message;
	p.style.fontSize = 20;
	p.style.fontFamily = "sans-serif";
	p.style.display = "table-cell";
	p.style.verticalAlign = "middle";
	msg.appendChild(p);
	
	var close = document.createElement("button");
	close.onclick = (function(message) {
		return function() {
			message.hideDialog();
			message.clearDialog();
		};
	})(this);
	close.style.position = "absolute";
	close.style.top = "0px";
	close.style.right = "0px";
	close.innerText = "X";
	msg.appendChild(close);
	
	this.resizeDialog(50, 30);
	this.showDialog();
    //alert("Bad program!");
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
	msg.setAttribute("align", "center");
	msg.setAttribute("valign", "center");
	msg.style.display = "table";
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