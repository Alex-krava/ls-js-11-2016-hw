(function () {
    let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
    loadCity(url);

    function loadCity(url) {
        new Promise(function (resolve) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);

            xhr.addEventListener('load', function () {
                resolve(xhr.response);

            });
            xhr.send();
        })
            .then(function (data) {
                let dataArray = JSON.parse(data);
                filterCity(dataArray);
            });
    }

    function filterCity(data) {
        let dataArray = [];

        for (let item of data) {
            dataArray.push(item.name);
        }

        dataArray = dataArray.sort();
        let elem = document.querySelector('body');
        let newElem = document.createElement('ul');
        elem.appendChild(newElem);
        let items = document.querySelector('ul');
        let item;

        for (let name of dataArray) {
            item = document.createElement('li');
            items.appendChild(item).innerText = name;
        }
    }
})();
