import Swiper from 'swiper/dist/js/swiper.js';

export default function() {
    const newsSliders = Array.from(document.querySelectorAll('.js-news-slider'));

    newsSliders.forEach(slider => {
        const swiperContainer = slider.querySelector('.swiper-container');
        const arrowPrev = slider.querySelector('.js-news-slider-prev-btn')
        const arrowNext = slider.querySelector('.js-news-slider-next-btn')
        const pagination = slider.querySelector('.js-news-slider-pagination')

        new Swiper(swiperContainer, {
            slidesPerView: 1,
            pagination: {
                el: pagination,
                type: 'fraction',
            },
            navigation: {
                nextEl: arrowNext,
                prevEl: arrowPrev
            }
        });
    });
}
