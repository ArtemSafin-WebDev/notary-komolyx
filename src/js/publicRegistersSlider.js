import Swiper from 'swiper/dist/js/swiper.js';

export default function() {
    const publicRegisters = document.querySelector('.js-public-registers');
    if (!publicRegisters) return;

    const sliderContainer = publicRegisters.querySelector('.swiper-container');
    if (!sliderContainer) return;

    const arrowPrev = publicRegisters.querySelector('.js-public-registers-prev-btn');
    const arrowNext = publicRegisters.querySelector('.js-public-registers-next-btn');

    const slider = new Swiper(sliderContainer, {
        slidesPerView: 4,
        spaceBetween: 25,
        navigation: {
            nextEl: arrowNext,
            prevEl: arrowPrev
        },
        breakpoints: {
            768: {
                slidesPerView: 'auto',
                spaceBetween: 20
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 20
            }
        },
        on: {
            beforeResize() {
                if (window.innerWidth <= 768) {
                    slider.slides.css('width', '');
                }
            }
        }
    });
}
