var View = require("./view");
var Model = require("./model");
var Router = require("./router");

new Promise(function(resolve) {
    window.onload = resolve;
}).then(function() {
    return Model.login(5755764, 2 | 8 | 8192);
}).then(function() {
    return Model.getUser().then(function(users) {
        header.innerHTML = View.render('header', users[0]);
    });
}).then(function () {
    document.addEventListener('click', function (e) {
        var router = e.target.dataset.router;
        if(router){
            Router.handle(router);
        }
    });
}).catch(function(e) {
    console.error(e);
    alert('Ошибка: ' + e.message);
});
