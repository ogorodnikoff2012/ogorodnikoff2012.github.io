var i18n = {};
i18n.work = function (node) {
    var stack = [];
    var currentNode = node ? node : document.body;
    var markedNodes = [];
    stack.push(currentNode);

    while (stack.length > 0) {
        currentNode = stack.pop();
        var ch = currentNode.children;
        for (var j = 0; j < ch.length; j++) {
            stack.push(ch[j]);
        }
        if (isInClass(currentNode, "i18n")) {
            markedNodes.push(currentNode);
        }
    }

    for (var i = 0; i < markedNodes.length; i++) {
        markedNodes[i].innerHTML = this.translate(markedNodes[i].innerHTML);
    }
};

i18n.setLanguage = (function (i18n) {
    return function (lang) {
        i18n.lang = lang;
        if (!i18n[lang]) {
            i18n[lang] = {};
        }
    }
})(i18n);

i18n.translate = function (text) {
    text = text.trim();
    if (this[this.lang][text] == undefined) {
        this[this.lang][text] = text;
    }
    return this[this.lang][text];
};