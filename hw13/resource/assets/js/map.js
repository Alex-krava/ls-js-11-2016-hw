let template = require('./templates');
let mapEventsFunctions = require('./mapEventsFunctions');

module.exports = {
    init: function () {
        //todo инициализация карты
        ymaps.ready(this.mapConfig, this);
    },
    mapConfig: function () {
        let placemark,
            map,
            geolocation = ymaps.geolocation;

        //todo центрирование карты
        map = new ymaps.Map("map", {
            center: [0, 0],
            zoom: 2,
            controls: []
        }, {
            searchControlProvider: 'yandex#search'
        });

        this.events(map);

        //todo добавление метки
        // placemark = this.initPlacemark([55.76, 37.64], {
        //     hintContent: 'Москва!',
        //     balloonContent: 'Столица России'
        // }, this);

        //todo инициализация метки
        // this.addPlacemark(map, placemark);


        this.getGeolocationYa(map, geolocation);
        this.getGeolocationBrowser(map, geolocation);
    },
    initPlacemark: function (coordinates, content) {
        return new ymaps.Placemark(coordinates, content);
    },
    addPlacemark: function (map, placemark) {
        return map.geoObjects.add(placemark);
    },
    getGeolocationYa: function (map, geolocation) {
        geolocation.get({
            provider: 'yandex',
            mapStateAutoApply: true
        }).then(function (result) {

            // Красным цветом пометим положение, вычисленное через ip.
            result.geoObjects.options.set('preset', 'islands#redCircleIcon');
            result.geoObjects.get(0).properties.set({
                balloonContentBody: 'Мое местоположение'
            });
            map.geoObjects.add(result.geoObjects);
        });
    },
    getGeolocationBrowser: function (map, geolocation) {
        geolocation.get({
            provider: 'browser',
            mapStateAutoApply: true
        }).then(function (result) {

            // Синим цветом пометим положение, полученное через браузер.
            // Если браузер не поддерживает эту функциональность, метка не будет добавлена на карту.
            result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
            map.geoObjects.add(result.geoObjects);
        });
    },
    addLocation: function (e, map) {
        if (!map.balloon.isOpen()) {
            let coords = e.get('coords'),
                getAddress = this.getAddress(coords),
                address;

            getAddress.then(function (res) {
                console.log(coords);

                address = res;

                map.balloon.open(coords, {
                    //todo добавление baloon template !!!!
                    contentBody: template.commentsTemplate(address, coords)
                });
            });
        }
        else {
            map.balloon.close();
        }
    },
    getAddress: function (arg) {
        return new Promise(function (resolve) {
            let data = new ymaps.data.Manager({
                    home: {
                        coords: arg
                    }
                }),
                template = new ymaps.Template('{{home.address}}');

            ymaps.geocode(data.get('home.coords')).then(function (res) {
                let description = res.geoObjects.get(0).properties.get('description'),
                    address = res.geoObjects.get(0).properties.get('name');

                data.set('home.address', address + ', ' + description);
                let result = template.build(data);

                let text = result.text;

                resolve(text);
            });
        });
    },
    events: function (map) {
        document.addEventListener('click', function (e) {
            let res = mapEventsFunctions.formIvents(e, map);

            if(res && res.status){
                let coordArray = res.coord.split(',');
                console.log(coordArray);

                //todo добавление метки
                placemark = mapEventsFunctions.initPlacemark(coordArray, {
                    hintContent: 'Моя отметка',
                    balloonContent: 'Мой текст'
                });

                //todo инициализация метки
                mapEventsFunctions.addPlacemark(map, placemark);
            }
        });

        map.events.add('click', function (e) {
            this.addLocation(e, map);
        }, this);

        // Скрываем хинт при открытии балуна.
        map.events.add('balloonopen', function () {
            map.hint.close();
        });
    }
}