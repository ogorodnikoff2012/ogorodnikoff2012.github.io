var translation = {
    "Remove<br>selected<br>command": "Удалить<br>текущую<br>команду",
    "I cannot walk through walls!": "Я не умею проходить сквозь стены!",
    "Bad program!": "Плохая программа!",
    "Error at command #": "Ошибка на команде №",
    "Error message: ": "Сообщение об ошибке: ",
    "Mission failed!":"Задание провалено!",
    "Go to main menu": "В главное меню",
    "Next level": "Следующий уровень",
    "Retry": "Попробовать еще раз",
    "Mission completed!": "Задание выполнено!",
    "You have passed all levels!": "Вы прошли все уровни!"};
if (!i18n.ru) {
    i18n.ru = translation;
} else {
    i18n.ru = i18n.ru.concat(translation);
}