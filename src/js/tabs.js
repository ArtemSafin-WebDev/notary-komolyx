import queryString from 'query-string';
import URLSearchParams from '@ungap/url-search-params'

export default function() {
    const tabs = Array.from(document.querySelectorAll('.js-tabs'));

    tabs.forEach(item => {
        const tabButtons = Array.from(item.querySelector('.js-tabs-navigation').children);
        const tabItems = Array.from(item.querySelector('.js-tabs-list').children);
        let activeTabIndex;

        if (!tabButtons.legth === 0 || tabItems.length === 0) {
            console.error('Отсутвуют кнопки или табы');
            return;
        } else if (tabButtons.length !== tabItems.length) {
            console.error('Количество элементов управления не равно количеству табов');
            return;
        }

        const parsedQueryString = queryString.parseUrl(window.location.search).query;

        if ('tabname' in parsedQueryString) {
            activeTabIndex = tabItems.findIndex(element => {
                if (element.hasAttribute('data-tabname') && element.getAttribute('data-tabname').toLowerCase() === parsedQueryString.tabname.toLowerCase()) {
                    return true;
                } else {
                    return false;
                }
            });
        } else {
            activeTabIndex = tabButtons.findIndex(element => {
                return element.classList.contains('active');
            });
        }

        if (activeTabIndex === -1) {
            activeTabIndex = 0;
        }

        tabButtons.forEach(button => button.classList.remove('active'))
        tabItems.forEach(item => item.classList.remove('active'))

        setActiveTab(activeTabIndex);

        function setActiveTab(nextIndex, previousIndex) {
            if (arguments.length >= 2) {
                tabButtons[previousIndex].classList.remove('active');
                tabItems[previousIndex].classList.remove('active');
            }
            tabButtons[nextIndex].classList.add('active');
            tabItems[nextIndex].classList.add('active');
            if (tabItems[nextIndex].hasAttribute('data-tabname')) {
                const searchParams = new URLSearchParams(window.location.search)
                searchParams.set("tabname", tabItems[nextIndex].getAttribute('data-tabname'));
                const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
                history.pushState(null, '', newRelativePathQuery);
            }
            activeTabIndex = nextIndex;
        }

        tabButtons.forEach((button, index) => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                if (index === activeTabIndex) {
                    return;
                }
                setActiveTab(index, activeTabIndex);
            });
        });
    });
}
