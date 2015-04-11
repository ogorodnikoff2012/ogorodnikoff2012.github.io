/**
 * @deprecated
 * Эта функция разбирает GET-запрос
 * @param {string} name - ключ
 * @returns {string} значение, соответствующее данному ключу
 * */
function get(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search)) return decodeURIComponent(name[1]);
}

/**
 * Эта функция дописывает тег <script> после текущего скрпта, аналогична #include в C++
 * Не работает после полной загрузки страницы (из консоли и т.д.)
 * @param {string} filename - название подключаемого JS-файла
 * */
function includeJS(filename) {
    document.write("<script src=" + filename + "></script>");
}

/**
 * Эта функция подгружает JS-файл с помощью AJAX и запускает его асинхронно
 * @param {string} filename - название подключаемого JS-файла
 */
function execJS(filename) {
    var STATE_READY = 4;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", filename, true);

    xhr.onreadystatechange = function() {
        if(xhr.readyState != STATE_READY) return;
        var text = xhr.responseText;
        window.eval(text);
    };

    xhr.send(null);
}

/**
 * Эта функция помечает element как принадлежащий классу className
 * @param {HTMLElement} element
 * @param {string} className
 */
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

/**
 * Эта функция помечает element как не принадлежащий классу className
 * @param {HTMLElement} element
 * @param {string} className
 */
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

/**
 * Эта функция проверяет, принадлежит ли element классу className
 * @param {HTMLElement} element
 * @param {string} className
 * @returns {boolean}
 */
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

/**
 * Определяет тип информации, отображаемой на индикаторах
 * @const
 * @type {boolean}
 * @see updateLevelIndicator
 * @see updateMoneyIndicator
 */
var ON_INTRO_PAGE = true;

/**
 * Определяет тип информации, отображаемой на индикаторах
 * @const
 * @type {boolean}
 * @see updateLevelIndicator
 * @see updateMoneyIndicator
 */
var ON_LEVEL_PAGE = true;

/**
 * Определяет тип информации, отображаемой на индикаторах
 * @const
 * @type {boolean}
 * @see updateLevelIndicator
 * @see updateMoneyIndicator
 */
var ON_GAME_PAGE = false;

/**
 * Обновляет индикатор, показывающий текущий уровень (game.html) или уровень, с которого буде продолжена игра (intro.html)
 * @param isGlobal определяет, как именно нужно отображать информацию
 * @see ON_INTRO_PAGE
 * @see ON_LEVEL_PAGE
 * @see ON_GAME_PAGE
 */
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

/**
 * Обновляет индикатор, показывающий количество монет, собранных на данном уровне (game.html) или за все время игры(intro.html)
 * @param isGlobal определяет, как именно нужно отображать информацию
 * @see ON_INTRO_PAGE
 * @see ON_LEVEL_PAGE
 * @see ON_GAME_PAGE
 */
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