import Pikaday from 'pikaday';

export default function() {
    const dates = Array.from(document.querySelectorAll('.js-date-input'));

    dates.forEach(date => {
        const target = date.nextElementSibling;
        const targetText = target.querySelector('.modals__modal-window-form-datepicker-target-text');
        console.log('target', target)
        const picker = new Pikaday({
            field: date,
            container: date.parentElement,
            trigger: target,
            format: 'DD-MM-YYYY',
            i18n: {
                previousMonth: 'Предыдущий месяц',
                nextMonth: 'Следующий месяц',
                months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                weekdays: ['Воскресенье', 'Понедельник', 'Чертверг', 'Среда', 'Вторник', 'Пятница', 'Суббота'],
                weekdaysShort: ['Вс', 'Пн', 'Чт', 'Ср', 'Вт', 'Пт', 'Сб']
            },
            onOpen: function() {
                target.classList.add('open');
            },
            onClose: function() {
                target.classList.remove('open');
            },
            onSelect: function() {
                target.classList.remove('with-placeholder')
                targetText.textContent = picker.toString();
                $(date).trigger('input');
            }
        });
        
    });
}
