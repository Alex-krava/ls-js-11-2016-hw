(function () {
    document.cookie = 'firstCookie=testText1';
    document.cookie = 'secondCookie=testText2';
    document.cookie = 'thirdCookie=testText3';
    addTable();

    document.addEventListener('click', deleteCookie);
    number.addEventListener('keydown', inputNumber);
    form.addEventListener('submit', formSubmit);

    function addTable() {
        if (document.cookie) {
            let cookies = document.cookie.split(';');

            let bodyElem = document.querySelector('body');
            let tableElem = document.createElement('table');
            let rowElem = document.createElement('tr');
            let headName = [
                'Имя',
                'Значение',
                'Действие'
            ];

            let elemHead = bodyElem.appendChild(tableElem).appendChild(rowElem);

            for (let i = 0; i < 3; i++) {
                elemHead.appendChild(document.createElement('th')).innerText = headName[i];
            }

            for (let cookie of cookies) {
                let cookieArray = cookie.split('=');
                let elemBody = bodyElem.appendChild(tableElem).appendChild(document.createElement('tr'));

                elemBody.appendChild(document.createElement('td')).innerText = cookieArray[0];
                elemBody.appendChild(document.createElement('td')).innerText = cookieArray[1];
                let buttonSection = elemBody.appendChild(document.createElement('td'));
                let button = buttonSection.appendChild(document.createElement('button'));
                button.innerText = 'Удалить';
                button.id = cookieArray[0].replace(/^\s*(.*)\s*$/, '$1');
                button.className = 'buttonDelete';
            }
        }
    }

    function deleteCookie(e) {
        if (e.target.className === 'buttonDelete') {
            let id = e.target.id;

            let bool = confirm(`Удалить cookie с именем ${id}?`);

            if (bool) {
                let cookieDate = new Date();
                cookieDate.setTime(cookieDate.getTime() - 1);
                document.cookie = `${id}=;expires=${cookieDate.toGMTString()}`;
                let elem = document.getElementById(id).parentNode.parentNode;
                elem.remove();
            }
        }
    }

    function inputNumber(e) {
        if (!(e.key >= 0) && !(e.key <= 9) && !(e.key === 'Backspace') && !(e.key === 'ArrowLeft') && !(e.key === 'ArrowRight')) {
            e.preventDefault();
        }
    }

    function formSubmit(e) {
        e.preventDefault();

        let inputs = form.children;
        let valid = formValidate(inputs);

        if(valid){
            let cookieDate = new Date();
            cookieDate.setTime(cookieDate.getTime() + (number.value * 1000 * 60 * 60 * 24));
            document.cookie = `${nameCookie.value}=${valueCookie.value};expires=${cookieDate.toGMTString()}`;

            if(document.querySelector('table')){
                document.querySelector('table').remove();
                addTable();
                clearForm(inputs);
            }
            else{
                addTable();
                clearForm(inputs);
            }
        }
    }

    function clearForm(inputs) {
        for (let input of inputs) {
            if(input.type === 'text'){
                input.value = '';
            }
        }
    }

    function formValidate(inputs) {
        for (let input of inputs) {
            if(input.type === 'text'){
                if(input.value === ''){
                    alert('Заполните все поля формы');
                    return false;
                }
            }
        }
        return true;
    }
})();