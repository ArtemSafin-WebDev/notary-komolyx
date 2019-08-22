import { debounce, throttle } from 'lodash';

export default function() {
    const headerTopRow = document.querySelector('.js-header-top-row');
    const headerBottomRow = document.querySelector('.js-header-bottom-row');
    const pageHeader = document.querySelector('.page-header');

    if (!headerTopRow || !headerBottomRow || !pageHeader) return;

    let initialScrollTop = window.pageYOffset;
    let threshold = pageHeader.offsetHeight;

    window.addEventListener('resize', function() {
        threshold = pageHeader.offsetHeight;
    });

    const debouncedScrollHandler = throttle(function() {
        const run = initialScrollTop - window.pageYOffset;
        if (run > 0) {
            document.documentElement.classList.remove('header-hidden');
            console.log('Scrolled up');
        } 
        else {
            console.log('Scrolled down');
            if (window.pageYOffset >= threshold) {
                document.documentElement.classList.add('header-hidden');
                console.log('Threshold reached');
            }
        }
        initialScrollTop = window.pageYOffset;
    }, 100);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset < threshold || window.pageYOffset === 0) {
            document.documentElement.classList.remove('header-hidden');
            console.log('Returned to top');
        }

        debouncedScrollHandler();
    });
}
