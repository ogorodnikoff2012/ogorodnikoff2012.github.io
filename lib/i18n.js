var i18n = {};
i18n.work = function (lang, node) {
    this.setLanguage(lang);
    var stack = [];
    var currentNode = node ? node : document.body;
    var markedNodes = [];
    stack.push(currentNode);

    var i = 0;

    while (i < stack.length) {
        var ch = stack[i].children;
        for (var j = 0; j < ch.length; j++) {
            stack.push(ch[j]);
        }
        if (isInClass(stack[i], "i18n")) {
            markedNodes.push(stack[i]);
        }
        i++;
    }

    for (i = 0; i < markedNodes.length; i++) {
        markedNodes[i].innerText = this.translate(markedNodes[i].innerText);
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
    if (this[this.lang][text] == undefined) {
        this[this.lang][text] = text;
    }
    return this[this.lang][text];
};