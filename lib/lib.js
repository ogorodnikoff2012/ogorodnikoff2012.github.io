function get(name) {
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search)) return decodeURIComponent(name[1]);
}

function loadJS(filename) {
	document.write("<script src="+filename+"></script>");
}

function addClass(element, className) {
	var hasClass = element.hasAttribute("class");
	if(!hasClass) {
		element.setAttribute("class", className);
	} else {
		var classes = element.getAttribute("class").split(" ");
		if(classes.indexOf(className) < 0) {
			classes.push(className);
			element.setAttribute("class", classes.join(" "));
		}
	}
}

function removeClass(element, className) {
	var hasClass = element.hasAttribute("class");
	if(hasClass) {
		var classes = element.getAttribute("class").split(" ");
		var idx = classes.indexOf(className);
		if(idx >= 0) {
			classes.splice(idx, 1);
			if(classes.length > 0) {
				element.setAttribute("class", classes.join(" "));
			} else {
				element.removeAttribute("class");
			}
		}
	}
}