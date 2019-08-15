import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

export default function() {
    const burgerBtn = document.querySelector('.js-burger-btn');
    const burgerMenu = document.querySelector('.js-burger-menu');

    if (!burgerBtn || !burgerMenu) {
        console.error('Отсутствует бургер меню или кнопка');
        return;
    };

    let menuOpen = false;
    let scrollLocked = false;

    burgerBtn.addEventListener('click', function(event) {
        event.preventDefault();
        if (!menuOpen) {
            burgerBtn.classList.add('active');
            burgerMenu.classList.add('shown');
            disableBodyScroll(burgerMenu);
            scrollLocked = true;
            menuOpen = true;
        } else {
            burgerBtn.classList.remove('active');
            burgerMenu.classList.remove('shown');
            clearAllBodyScrollLocks();
            scrollLocked = false;
            menuOpen = false;
        }
    })


    if (matchMedia) {
        const mq = window.matchMedia(`(max-width: 968px)`);
        mq.addListener(widthChange);
        widthChange(mq);
    }

    function widthChange(mq) {
        if (mq.matches && menuOpen && !scrollLocked) {
            disableBodyScroll(burgerMenu);
            scrollLocked = true;
        } else if (!mq.matches && menuOpen && scrollLocked) {
            clearAllBodyScrollLocks();
            scrollLocked = false;
        }
    }
}