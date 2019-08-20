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
import datePicker from './datePicker';
import modals from './modals';
import faqAccordeons from './faqAccordeons';

document.addEventListener('DOMContentLoaded', function() {
    // Полифилл .contains для IE 11

    if (!SVGElement.prototype.contains) {
        SVGElement.prototype.contains = HTMLDivElement.prototype.contains;
    }

    // Полифилл для CSS свойства ObjectFit (заполнение контейнера изображением)

    objectFitImages();

    // Полифилл для метода element.matches();

    (function() {
        // проверяем поддержку
        if (!Element.prototype.matches) {
            // определяем свойство
            Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
        }
    })();

    // Полифилл метода element.closest();

    (function(ELEMENT) {
        ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
        ELEMENT.closest =
            ELEMENT.closest ||
            function closest(selector) {
                if (!this) return null;
                if (this.matches(selector)) return this;
                if (!this.parentElement) {
                    return null;
                } else return this.parentElement.closest(selector);
            };
    })(Element.prototype);

    // Полифилл для кастомных событий

    (function() {
        if (typeof window.CustomEvent === 'function') return false;

        function CustomEvent(event, params) {
            params = params || { bubbles: false, cancelable: false, detail: null };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }

        window.CustomEvent = CustomEvent;
    })();

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

    // Датапикер

    datePicker();

    // Модальные окна

    modals();

    // Аккордеоны Вопрос-ответ

    faqAccordeons();
});
