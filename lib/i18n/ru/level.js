var translation = {
    "Level": "Уровень",
    "Money:": "Счёт:",
    "Main menu": "Главное меню",
    "Choose level": "Выберите уровень"};
if (!i18n.ru) {
    i18n.ru = translation;
} else {
    i18n.ru = i18n.ru.concat(translation);
}