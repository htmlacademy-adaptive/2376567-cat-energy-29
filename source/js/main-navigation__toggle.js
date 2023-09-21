// Берём кнопку

let btnMenu = document.querySelector(".main-header__toggle");

// Берём меню

let ulMenu = document.querySelector(".main-header__main-navigation");

// Берём значок бургера

let burgerMenu = document.querySelector(".logo-burger__menu");

//Берем значок крестика

let crossMenu = document.querySelector(".logo-burger__cross");

// Функция при срабатывании скрипта для загрузки крестика

async function runBeforeScriptLoads() {
  crossMenu.classList.toggle("visually-hidden");
}
runBeforeScriptLoads();

// Функция для пререключения класса меню

function toggleMobileMenu() {
  ulMenu.classList.toggle("main-navigation__site-navigation--hidden");
}

// Функция для переключения кнопки

function toggleBtnMenu() {
  burgerMenu.classList.toggle("visually-hidden");
  crossMenu.classList.toggle("visually-hidden");
}

// Обработка события нажатия на кнопку

btnMenu.addEventListener("click", function () {
    // Переключаем класс меню
    toggleMobileMenu();
    // Переключаем класс кнопки
    toggleBtnMenu();
});

//Функция после прогрузки скрипта для закрытия меню

async function runAfterScriptLoads() {
  toggleMobileMenu();
  toggleBtnMenu();
}
runAfterScriptLoads();
