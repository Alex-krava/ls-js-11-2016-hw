(function () {
    let ipId = 5755764;

    let dataVkLeft = [],
        dataVkRight = [];

    document.addEventListener('click', addAndRemoveFriends);
    document.addEventListener('input', searchFriend);
    buttonSave.addEventListener('click', saveFriend);

    vk(ipId);

    function vk(id) {

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
                VK.api('friends.get', {'fields': 'photo_100', 'order': 'name'}, function (response) {

                    if(localStorage.getItem('dataVkRight')){
                        dataVkLeft = JSON.parse(localStorage.getItem('dataVkLeft'));
                        dataVkRight = JSON.parse(localStorage.getItem('dataVkRight'));
                    }
                    else{
                        dataVkLeft = response.response;
                        dataVkRight = [];
                    }

                    renderHTML(dataVkLeft, leftItems, template('left'));
                    renderHTML(dataVkRight, rightItems, template('right'));

                    rightItems.addEventListener('drop', drop);
                    rightItems.addEventListener('dragover', allowDrop);
                    document.addEventListener('dragstart', drag);
                });
            });
    }

    function template(position) {
        if (position === 'left') {
            return `
                <div class="content-right_item-title">Ваши друзья</div>
                <ul class="content-left_items">
                    {{#each users}}
                    <li class="content-left_item" data-id="{{this.user_id}}" draggable="true" id="itemFriend">
                        <span class="content-left_item-photo">
                            <img src="{{this.photo_100}}" alt="photo">
                        </span>
                        <span class="content-left_item-name">{{this.first_name}} {{this.last_name}}</span>
                        <span class="content-left_item-icon">
                            <i class="fa fa-plus" data-button="add" aria-hidden="true"></i>
                        </span>
                    </li>
                    {{/each}} 
                </ul>
            `;
        }
        if (position === 'right') {
            return `
                <div class="content-right_item-title">Друзья в списке</div>
                <ul class="content-right_items" id="containerDrop">
                    {{#each users}}
                    <li class="content-right_item" data-id="{{this.user_id}}">
                        <span class="content-right_item-photo">
                            <img src="{{this.photo_100}}" alt="photo">
                        </span>
                        <span class="content-right_item-name">{{this.first_name}} {{this.last_name}}</span>
                        <span class="content-right_item-icon">
                            <i class="fa fa-times" data-button="remove" aria-hidden="true"></i>
                        </span>
                    </li>
                    {{/each}}
                </ul>`;
        }
    }

    function renderHTML(data, idElem, templateHtml) {
        let template = templateHtml;
        let templateCompile = Handlebars.compile(template);
        template = templateCompile({users: data});
        idElem.innerHTML = template;
    }

    function addAndRemoveFriends(e) {
        if(e.target.dataset.button === 'add'){
            let idEvent = e.target.parentNode.parentNode.dataset.id;
            let elem = dataVkLeft.filter(function (elem) {
                return elem.user_id == idEvent;
            });
            dataVkLeft = dataVkLeft.filter(function (elem) {
                return elem.user_id != idEvent;
            });

            dataVkRight.push(elem[0]);

            renderHTML(dataVkLeft, leftItems, template('left'));
            renderHTML(dataVkRight, rightItems, template('right'));
        }

        if(e.target.dataset.button === 'remove'){
            let idEvent = e.target.parentNode.parentNode.dataset.id;
            let elem = dataVkRight.filter(function (elem) {
                return elem.user_id == idEvent;
            });
            dataVkRight = dataVkRight.filter(function (elem) {
                return elem.user_id != idEvent;
            });

            dataVkLeft.push(elem[0]);

            dataVkLeft.sort(function (a, b) {
                if (a.first_name > b.first_name) {
                    return 1;
                }
                if (a.first_name < b.first_name) {
                    return -1;
                }
                return 0;
            });

            renderHTML(dataVkRight, rightItems, template('right'));
            renderHTML(dataVkLeft, leftItems, template('left'));
        }
    }

    function searchFriend(e) {
        let elem = e.target;
        if(elem.dataset.search === 'left'){
            let dataVkLeftFilter;
            dataVkLeftFilter = dataVkLeft.filter(function (item) {
                return item.first_name.toLowerCase().indexOf(elem.value.toLowerCase()) + 1 || item.last_name.toLowerCase().indexOf(elem.value.toLowerCase()) + 1;
             });
            renderHTML(dataVkLeftFilter, leftItems, template('left'));
        }
        if(elem.dataset.search === 'right'){
            let dataVkRightFilter;
            dataVkRightFilter = dataVkRight.filter(function (item) {
                return item.first_name.toLowerCase().indexOf(elem.value.toLowerCase()) + 1 || item.last_name.toLowerCase().indexOf(elem.value.toLowerCase()) + 1;
            });
            renderHTML(dataVkRightFilter, rightItems, template('right'));
        }
    }

    function saveFriend() {
        localStorage.setItem('dataVkLeft', JSON.stringify(dataVkLeft));
        localStorage.setItem('dataVkRight', JSON.stringify(dataVkRight));
        alert('Сохранено');
    }

    function allowDrop(e) {
        e.preventDefault();
    }

    function drag(e) {
        e.dataTransfer.setData("drag", e.target.dataset.id);
    }

    function drop(e) {
        e.preventDefault();
        let friendPushRight = dataVkLeft.filter(function (item) {
            return item.user_id == e.dataTransfer.getData("drag");
        });
        dataVkLeft = dataVkLeft.filter(function (item) {
            return item.user_id != e.dataTransfer.getData("drag");
        });

        dataVkRight.push(friendPushRight[0]);

        renderHTML(dataVkRight, rightItems, template('right'));
        renderHTML(dataVkLeft, leftItems, template('left'));
    }

})();