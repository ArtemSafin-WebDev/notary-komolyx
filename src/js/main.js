// import "core-js/stable";
// import "regenerator-runtime/runtime";

import objectFitImages from 'object-fit-images';
import detectIt from 'detect-it';
import publicRegistersSlider from './publicRegistersSlider';
import forms from './forms';
import burgerMenu from './burgerMenu';
import map from './map';
import tabs from './tabs';
import newsSlider from './newsSlider';
import tableAccordeons from './tableAccordeons';
import selects from './selects';

document.addEventListener('DOMContentLoaded', function() {
    // Полифилл .contains для IE 11

    if (!SVGElement.prototype.contains) {
        SVGElement.prototype.contains = HTMLDivElement.prototype.contains;
    }

    // Полифилл для CSS свойства ObjectFit (заполнение контейнера изображением)
    objectFitImages();

    // Определение тач устройств

    if (detectIt.hasTouch) {
        document.body.classList.remove('no-touch');
        document.body.classList.add('touch');
    }

    // Слайдер публичных реестров

    publicRegistersSlider();

    // Бургер меню

    burgerMenu();

    // Карта

    map();

    // Табы

    tabs();

    // Слайдер новостей

    newsSlider();

    // Аккордеоны таблиц

    tableAccordeons();

    // Селекты

    selects();

    // Валидация форм и маски ввода

    forms();
});
