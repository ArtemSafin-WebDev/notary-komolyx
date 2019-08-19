
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

export default function() {
    const modalOpenButtons = Array.from(document.querySelectorAll('.js-modal-open'));
    const modalCloseButtons = Array.from(document.querySelectorAll('.js-modal-close'));
    const modals = Array.from(document.querySelectorAll('.js-modal'));

    modalOpenButtons.forEach(button => {
        const hash = button.hash;
        if (!hash) {
            console.error('Button has no hash');
            return;
        }
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const modal = modals.find(element => {
                if (element.matches(hash.toString())) {
                    return true;
                } else {
                    return false;
                }
            });
            if (!modal) return;
            if (window.matchMedia("(max-width: 768px)").matches) {
                modal.classList.add('scroll-locked');
                disableBodyScroll(modal);
            }
            modal.classList.add('shown');
        });
    });

    modalCloseButtons.forEach(button => {
        const hash = button.hash;
        if (!hash) {
            console.error('Button has no hash');
            return;
        }
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const modal = modals.find(element => {
                if (element.matches(hash.toString())) {
                    return true;
                } else {
                    return false;
                }
            });
            if (!modal) return;
           
            modal.classList.remove('shown');
            if (modal.classList.contains('scroll-locked')) {
                enableBodyScroll(modal);
            }
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === this) {
                modal.classList.remove('shown');
                if (modal.classList.contains('scroll-locked')) {
                    enableBodyScroll(modal);
                }
            }
        })
    })
}
