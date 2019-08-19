
import Choices from 'choices.js';

export default function() {
    const selects = Array.from(document.querySelectorAll('.js-select-block'));

    selects.forEach((select, index) => {
        const nativeSelect = select.querySelector('select');
        if (!nativeSelect) return;

        let nativeSelectChildren;
        
    
        nativeSelect.addEventListener('change', function() {
            this.blur();
        });
        nativeSelect.addEventListener('click', function() {
            this.classList.toggle('open');
        })
        nativeSelect.addEventListener('blur', function() {
            this.classList.remove('open');
        })



        let customSelect = null;

        if (matchMedia) {
            const mq = window.matchMedia('(max-width: 768px)');
            mq.addListener(WidthChange);
            WidthChange(mq);
        }
        function WidthChange(mq) {
            if (!mq.matches) {
                
               
                if (!customSelect) {
                    nativeSelectChildren = Array.from(nativeSelect.cloneNode(true).children)
                    customSelect = new Choices(nativeSelect, {
                        searchEnabled: false,
                        itemSelectText: '',
                        placeholder: true,
                    });
                }
            } else if (customSelect) {
                customSelect.destroy();
                customSelect = null;
                nativeSelect.append(...nativeSelectChildren);
            }
        }


        
    })
}