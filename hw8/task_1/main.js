(function () {
    let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
    loadCity(url);

    search.addEventListener('input', searchFilter);

    function loadCity(url, filterVal) {
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
                filterCity(dataArray, filterVal);
            });
    }

    function filterCity(data, filterVal) {
        let dataArray = [];
        let searchBool = false;

        if (filterVal !== undefined) {
            searchBool = true;
        }

        for (let item of data) {
            if (searchBool) {
                if (item.name.indexOf(filterVal) + 1) {
                    dataArray.push(item.name);
                }
            }
            else {
                dataArray.push(item.name);
            }
        }

        dataArray = dataArray.sort();

        let template = `
            <ul>
                {{#each cities}}
                <li>{{ this }}</li>
                {{/each}}
            </ul>`;

        let templateCompile = Handlebars.compile(template);
        template = templateCompile({cities: dataArray});

        wrapper.innerHTML = template;
    }

    function searchFilter(e) {
        loadCity(url, e.target.value);
    }
})();
