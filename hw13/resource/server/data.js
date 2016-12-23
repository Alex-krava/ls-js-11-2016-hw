let fs = require('fs');
let http = require('http');
let path = require('path');
let utils = require('./utils');
let config = require('./config.json');

let data = {
    'id': '34,25',
    'name': 'Alex',
    'loc': 'Где-то там',
    'text': 'Тестовый текст формы'
}


let server = http.createServer(function(req, res) {

    let ext = path.extname('../index.html');
    let mimeType = config.mime[ext].type;
    let encoding = config.mime[ext].encoding;


    utils.readFile('../index.html', encoding).then((content) => {

        res.setHeader('Content-Type', `${mimeType}; charset=utf-8`);

        console.log(content);

        res.write(content);
        res.end();
    });

});

server.listen(3000);


