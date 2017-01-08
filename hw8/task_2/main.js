// ДЗ 2:
// Создать приложение для ВКонтакте, которое загружает список
// ваших друзей и выводит их на страницу в следующем формате: Фото, ФИО, Возраст, Дата рождения.
//
// Друзья должны быть отсортированы по дате рождения в порядке убывания.
// То есть на самом верху списка расположен друг с ближайший датой рождения.
// Использование шаблонизатора приветствуется.

(function () {
    let ipId = 5755764;

    vk(ipId);

    function vk(id) {
        let dataVk = [];

        new Promise(function (resolve, reject) {
            VK.init({
                apiId: id
            });

            let vkResponse = function (response) {
                if (response.status === 'connected') {
                    resolve(response);
                }
                else {
                    reject(new Error('Ошибка авторизации'));
                }
            }

            VK.Auth.login(vkResponse, 2);

        })
            .then(function () {
                return new Promise(function (resolve) {
                    VK.api('friends.get', {'fields': ['bdate', 'photo_100'], 'order': 'name'}, function (response) {
                        resolve(response);
                    });
                });
            })
            .then(function (response) {
                for (user of response.response) {
                    user.age = getAgeFriends(user.bdate);
                }
                dataVk = sortData(response.response);
                viewFriends(dataVk);
            })

        function getAgeFriends(user) {
            let age;

            if (user) {
                age = user.split('.');

                if (age.length === 3) {
                    age = ((new Date().getTime() - new Date(`${age[1]}-${age[0]}-${age[2]}`)) / (24 * 3600 * 365.25 * 1000)) | 0;
                    return age;
                }
                else {
                    return age = -1;
                }
            }
            else {
                return age = -2;
            }
        }

        function sortData(data) {
            let withoutDate = [];
            let usersData = [];

            for (let user of data) {
                if (user.age === -1) {
                    let bDate = user.bdate.split('.');

                    if(Math.round(new Date(2000, new Date().getMonth(), new Date().getDate()).getTime() / 1000) < Math.round(new Date(2000, bDate[1] - 1, bDate[0]).getTime() / 1000)){
                        user.unix = Math.round(new Date(2000, bDate[1] - 1, bDate[0]).getTime() / 1000) - Math.round(new Date(2000, new Date().getMonth(), new Date().getDate()).getTime() / 1000);
                    }
                    else {
                        user.unix = Math.round(new Date(2001, bDate[1] - 1, bDate[0]).getTime() / 1000) - Math.round(new Date(2000, new Date().getMonth(), new Date().getDate()).getTime() / 1000);
                    }

                    user.age = 'Не указал год рождения';
                    usersData.push(user);
                }
                else if (user.age === -2) {
                    user.age = 'Возраст неизвестен';
                    withoutDate.push(user);
                }
                else {
                    let bDate = user.bdate.split('.');

                    if(Math.round(new Date(2000, new Date().getMonth(), new Date().getDate()).getTime() / 1000) < Math.round(new Date(2000, bDate[1] - 1, bDate[0]).getTime() / 1000)){
                        user.unix = Math.round(new Date(2000, bDate[1] - 1, bDate[0]).getTime() / 1000) - Math.round(new Date(2000, new Date().getMonth(), new Date().getDate()).getTime() / 1000);
                    }
                    else {
                        user.unix = Math.round(new Date(2001, bDate[1] - 1, bDate[0]).getTime() / 1000) - Math.round(new Date(2000, new Date().getMonth(), new Date().getDate()).getTime() / 1000);
                    }

                    usersData.push(user);
                }
            }

            usersData.sort(function (a, b) {
                if (a.unix > b.unix) {
                    return 1;
                }
                if (a.unix < b.unix) {
                    return -1;
                }
                return 0;
            });

            if (usersData.length) {
                for (let user of usersData) {
                    dataVk.push(user);
                }
            }
            if (withoutDate.length) {
                for (let user of withoutDate) {
                    dataVk.push(user);
                }
            }
            return dataVk;
        }

        function viewFriends(data) {
            let template = `
                <table>
                    <thead>
                        <tr>
                            <th>Фото</th>
                            <th>ФИО</th>
                            <th>Возраст</th>
                            <th>Дата рождения</th>
                        </td>
                    </thead>
                    <tbody>
                    {{#each users}}
                        <tr style="text-align: center">
                            <td><img src="{{this.photo_100}}" alt="photo"></td>
                            <td>{{this.first_name}} {{this.last_name}}</td>
                            <td>{{this.age}}</td>
                            <td>{{this.bdate}}</td>
                        </tr>
                    {{/each}}    
                    </tbody>
                </table>
            `;
            let templateCompile = Handlebars.compile(template);
            template = templateCompile({users: data});
            wrapper.innerHTML = template;
        }
    }

})();