import detectIt from 'detect-it';

export default function() {
    ymaps.ready(init);
    function init() {
        const mapElement = document.getElementById('map');
        if (!mapElement) return;

        const coords = mapElement.getAttribute('data-coords').split(',');
        const pin = mapElement.getAttribute('data-pin');
        const pinSize = [66, 66];

        const myMap = new ymaps.Map(mapElement, {
            center: coords,
            zoom: 17,
            controls: []
        });

        const myPlacemark = new ymaps.Placemark(
            coords,
            {},
            {
                iconLayout: 'default#image',
                iconImageHref: pin,
                iconImageSize: pinSize,
                iconImageOffset: [-pinSize[0] / 2, -pinSize[1] / 2]
            }
        );

        myMap.geoObjects.add(myPlacemark);

        myMap.behaviors.disable('scrollZoom');

        if (detectIt.hasTouch) {
            myMap.behaviors.disable('drag');
        }

        // Создадим пользовательский макет ползунка масштаба.
        const ZoomLayout = ymaps.templateLayoutFactory.createClass(
            `<div class="map-zoom-controls">
                    <button class="map-zoom-button" id="zoom-in">
                        <svg width="60" height="60" aria-hidden="true" class="icon-zoom-in">
                            <use xlink:href="#zoom-in" />
                        </svg>
                    </button>
                    <button class="map-zoom-button id="zoom-out">
                        <svg width="60" height="60" aria-hidden="true" class="icon-zoom-out">
                            <use xlink:href="#zoom-out" />
                        </svg>
                    </button>
                </div>`,
            {
                // Переопределяем методы макета, чтобы выполнять дополнительные действия
                // при построении и очистке макета.
                build: function() {
                    // Вызываем родительский метод build.
                    ZoomLayout.superclass.build.call(this);

                    // Привязываем функции-обработчики к контексту и сохраняем ссылки
                    // на них, чтобы потом отписаться от событий.
                    this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
                    this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

                    // Начинаем слушать клики на кнопках макета.
                    document.querySelector('#zoom-in').addEventListener('click', this.zoomInCallback);
                    document.querySelector('#zoom-out').addEventListener('click', this.zoomOutCallback);
                },

                clear: function() {
                    // Снимаем обработчики кликов.
                    document.querySelector('#zoom-in').removeEventListener('click', this.zoomInCallback);
                    document.querySelector('#zoom-out').removeEventListener('click', this.zoomOutCallback);

                    // Вызываем родительский метод clear.
                    ZoomLayout.superclass.clear.call(this);
                },

                zoomIn: function() {
                    var map = this.getData().control.getMap();
                    map.setZoom(map.getZoom() + 1, { checkZoomRange: true });
                },

                zoomOut: function() {
                    var map = this.getData().control.getMap();
                    map.setZoom(map.getZoom() - 1, { checkZoomRange: true });
                }
            }
        );
        const zoomControl = new ymaps.control.ZoomControl({ options: { layout: ZoomLayout, position: { left: window.matchMedia('(max-width: 768px)').matches ? 20 : 50, top: mapElement.offsetHeight / 2 } } });

        window.addEventListener('resize', function() {
            myMap.controls.remove(zoomControl);
            zoomControl.options._options.position.top = mapElement.offsetHeight / 2;
            if (window.matchMedia('(max-width: 768px)').matches) {
                zoomControl.options._options.position.left = 20;
            } else {
                zoomControl.options._options.position.left = 50;
            }
            myMap.controls.add(zoomControl);
        });

        myMap.controls.add(zoomControl);
    }
}
