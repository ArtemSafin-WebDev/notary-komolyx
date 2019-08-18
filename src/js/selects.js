
import Choices from 'choices.js';

export default function() {
    const selects = Array.from(document.querySelectorAll('.js-select-block'));

    selects.forEach(select => {
        const nativeSelect = select.querySelector('select');
        if (!nativeSelect) return;

        nativeSelect.addEventListener('change', function() {
            this.blur();
        })

        // const choice = new Choices(nativeSelect, {
        //     searchEnabled: false,
        //     itemSelectText: '',
        //     placeholder: true,
            
        // });
    })
}