import Inputmask from 'inputmask';
import 'parsleyjs';
// import moment from 'moment';

export default function() {
    const phoneNumbers = Array.from(document.querySelectorAll('.js-phone-input'));

    phoneNumbers.forEach(input => {
        Inputmask({ mask: '+7 (999) 999-99-99' }).mask(input);
    });

    // window.Parsley.addValidator('moment', {
    //     requirementType: 'string',
    //     validateString: function(value) {
    //         return moment(value, 'DD-MM-YYYY', true).isValid();
    //     },
    //     messages: {
    //         en: 'Please enter a valid date in format DD-MM-YYYY.',
    //         ru: 'Укажите правильную дату в формате ДД-ММ-ГГГГ'
    //     }
    // });

    window.Parsley.addValidator('phone', {
        requirementType: 'string',
        validateString: function(value) {
            return /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(value);
        },
        messages: {
            en: 'This value should be a mobile number',
            ru: 'Введите правильный номер мобильного телефона'
        }
    });

    Parsley.addMessages('ru', {
        defaultMessage: 'Некорректное значение.',
        type: {
            email: 'В данном поле может быть только E-mail',
            url: 'Введите URL адрес.',
            number: 'Введите число.',
            integer: 'Введите целое число.',
            digits: 'Введите только цифры.',
            alphanum: 'Введите буквенно-цифровое значение.'
        },
        notblank: 'Это поле должно быть заполнено.',
        required: 'Обязательное поле',
        pattern: 'Это значение некорректно.',
        min: 'Это значение должно быть не менее чем %s.',
        max: 'Это значение должно быть не более чем %s.',
        range: 'Это значение должно быть от %s до %s.',
        minlength: 'Это значение должно содержать не менее %s символов.',
        maxlength: 'Это значение должно содержать не более %s символов.',
        length: 'Это значение должно содержать от %s до %s символов.',
        mincheck: 'Выберите не менее %s значений.',
        maxcheck: 'Выберите не более %s значений.',
        check: 'Выберите от %s до %s значений.',
        equalto: 'Это значение должно совпадать.'
    });

    Parsley.setLocale('ru');

    var parsleyConfig = {
        errorsContainer: function(parsleyField) {
            var formColumn = parsleyField.$element.closest('.modals__modal-window-form-column');

            if (formColumn.length > 0) {
                return formColumn.find('.modals__modal-window-select-error-container');
            }

            return parsleyField;
        },
        classHandler: function(el) {
            var selectBlock = el.$element.closest('.modals__modal-window-select-block');

            if (selectBlock.length > 0) {
                return selectBlock;
            }

            return el;
        }
    };

    $('form').parsley(parsleyConfig);
}
