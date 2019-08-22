export default function() {
    const headerTopRow = document.querySelector('.js-header-top-row');
    const headerBottomRow = document.querySelector('.js-header-bottom-row');

    if (!headerTopRow || !headerBottomRow) return;

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > headerTopRow.offsetHeight) {
            document.documentElement.classList.add('header-fixed');
        } else {
            document.documentElement.classList.remove('header-fixed');
        }
    })
}