// Берём кнопку
let btnMenu = document.querySelector(".main-header__toggle");
// Берём меню
let ulMenu = document.querySelector(".main-header__main-navigation");

// Обработка события нажатия на кнопку
btnMenu.addEventListener("click", function () {
    // Переключаем класс меню
    ulMenu.classList.toggle("main-navigation__site-navigation--hidden");
    // Переключаем класс кнопки
    // btnMenu.classList.toggle("btn-show-menu")
})
