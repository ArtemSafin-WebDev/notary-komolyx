import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

export default function() {
    const burgerBtn = document.querySelector('.js-burger-btn');
    const burgerMenu = document.querySelector('.js-burger-menu');
    const modalBtn = burgerMenu.querySelector('.js-modal-open');

    if (!burgerBtn || !burgerMenu) {
        console.error('Отсутствует бургер меню или кнопка');
        return;
    }

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
            enableBodyScroll(burgerMenu);
            scrollLocked = false;
            menuOpen = false;
        }
    });

    modalBtn.addEventListener('click', function(event) {
        event.preventDefault();
        burgerBtn.classList.remove('active');
        burgerMenu.classList.remove('shown');
        enableBodyScroll(burgerMenu);
        scrollLocked = false;
        menuOpen = false;
    });

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
            enableBodyScroll(burgerMenu);
            scrollLocked = false;
        }
    }
}
