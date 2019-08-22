import { TweenMax } from "gsap/TweenMax";



export default function() {
    const accordeons = Array.from(document.querySelectorAll('.js-table-accordeon'));

    accordeons.forEach(accordeon => {
        const btn = accordeon.querySelector('.js-accordeon-open');
        const content = accordeon.querySelector('.js-accordeon-content');
        let accordeonOpen = false;

        if (!btn || !content) {
            console.error('No btn or content')
        }

        btn.addEventListener('click', function(event) {
            event.preventDefault();
            btn.classList.toggle('active');
            if (!accordeonOpen) {
                TweenMax.set(content, { clearProps: 'all' });
                TweenMax.set(content, { height: 'auto' });
                TweenMax.from(content, 0.4, { height: 0 });
                accordeonOpen = true;
            } else {
                TweenMax.set(content, { clearProps: 'all' });
                TweenMax.set(content, { height: 'auto' });
                TweenMax.to(content, 0.4, { height: 0 });
                accordeonOpen = false;
            }
        })
    });
}
