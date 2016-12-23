let yandexMap = require('./map');

new Promise(function(resolve) {
    window.onload = resolve;
}).then(function() {
    yandexMap.init();
});
