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

                let citesArray = dataArray.reduce(function (values, item) {
                    values.push(item.name);
                    return values;
                }, []);

                filterCity(citesArray, filterVal);
            });
    }

    function filterCity(data, filterVal) {
        let filterArray = [];

        if (filterVal !== undefined) {
            filterArray = data.filter(function (item) {
                return item.toLowerCase().indexOf(filterVal.toLowerCase()) + 1;
            });
            filterArray = filterArray.sort();
        }
        else {
            filterArray = data.sort();
        }

        renderHTML(filterArray)
    }

    function renderHTML(data) {
        let template = `
            <ul>
                {{#each cities}}
                <li>{{ this }}</li>
                {{/each}}
            </ul>`;

        let templateCompile = Handlebars.compile(template);
        template = templateCompile({cities: data});

        wrapper.innerHTML = template;
    }

    function searchFilter(e) {
        loadCity(url, e.target.value);
    }
})();
