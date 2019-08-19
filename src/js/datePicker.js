import Pikaday from 'pikaday';

export default function() {
    const dates = Array.from(document.querySelectorAll('.js-date-input'));

    dates.forEach(date => {
        const picker = new Pikaday({
            field: date,
            container: date.parentElement,
            format: 'DD-MM-YYYY',
            i18n: {
                previousMonth: 'Предыдущий месяц',
                nextMonth: 'Следующий месяц',
                months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                weekdays: ['Воскресенье', 'Понедельник', 'Чертверг', 'Среда', 'Вторник', 'Пятница', 'Суббота'],
                weekdaysShort: ['Вс', 'Пн', 'Чт', 'Ср', 'Вт', 'Пт', 'Сб']
            }
        });
        
    });
}
