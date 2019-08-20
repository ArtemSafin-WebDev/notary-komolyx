import { TweenMax } from "gsap/TweenMax";

export default function() {
    const faqAccordeons = Array.from(document.querySelectorAll('.js-faq-accordeon'));

    faqAccordeons.forEach(accordeon => {
        const btn = accordeon.querySelector('.js-faq-accordeon-btn');
        const content = accordeon.querySelector('.js-faq-accordeon-content');
        let accordeonOpen = false;

        if (!btn || !content) {
            console.error('No button or content for accordeon');
            return;
        }

        btn.addEventListener('click', function(event) {
            event.preventDefault();
            accordeon.classList.toggle('active');
            if (!accordeonOpen) {
                TweenMax.set(content, { clearProps: 'all' });
                TweenMax.set(content, { height: 'auto' });
                TweenMax.from(content, 0.7, { height: 0 });
                accordeonOpen = true;
            } else {
                TweenMax.set(content, { clearProps: 'all' });
                TweenMax.set(content, { height: 'auto' });
                TweenMax.to(content, 0.7, { height: 0 });
                accordeonOpen = false;
            }
        })

    })
}