function get(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search)) return decodeURIComponent(name[1]);
}

function loadJS(filename) {
    document.write("<script src=" + filename + "></script>");
}

function addClass(element, className) {
    try {
        var hasClass = element.hasAttribute("class");
        if (!hasClass) {
            element.setAttribute("class", className);
        } else {
            var classes = element.getAttribute("class").split(" ");
            if (classes.indexOf(className) < 0) {
                classes.push(className);
                element.setAttribute("class", classes.join(" "));
            }
        }
    } catch (err) {
        console.log(err);
    }
}

function removeClass(element, className) {
    try {
        var hasClass = element.hasAttribute("class");
        if (hasClass) {
            var classes = element.getAttribute("class").split(" ");
            var idx = classes.indexOf(className);
            if (idx >= 0) {
                classes.splice(idx, 1);
                if (classes.length > 0) {
                    element.setAttribute("class", classes.join(" "));
                } else {
                    element.removeAttribute("class");
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
}

function isInClass(element, className) {
    try {
        var hasClass = element.hasAttribute("class");
        if (hasClass) {
            var classes = element.getAttribute("class").split(" ");
            var idx = classes.indexOf(className);
            return idx >= 0;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

function updateLevelIndicator(isGlobal) {
    var levelIndicator = document.getElementById("levelIndicator");
    if (!isGlobal || levelManager.numOfLevels > +localStorage["maxLevel"]) {
        levelIndicator.parentElement.style.visibility = "visible";
        levelIndicator.innerHTML = i18n.translate("Level:") + " " + (isGlobal ? (+localStorage["maxLevel"] + 1) : level.levelName);
    } else {
        levelIndicator.innerHTML = "";
        levelIndicator.parentElement.style.visibility = "hidden";
    }
}

function updateMoneyIndicator(isGlobal) {
    var moneyIndicator = document.getElementById("moneyIndicator");
    if (!isGlobal || localStorage["coins"]) {
        moneyIndicator.parentElement.style.visibility = "visible";
        moneyIndicator.innerHTML = i18n.translate("Money:") + " " + (isGlobal ? localStorage["coins"] : level.collectedCoins);
    } else {
        moneyIndicator.innerHTML = "";
        moneyIndicator.parentElement.style.visibility = "hidden";
    }
}