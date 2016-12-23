let render = require('./renderHtml');
let template = require('./templates');
let data = require('./model');

module.exports = {
    formIvents: function (e, map) {
        //close balloon
        if(e.target.dataset.btn === 'close'){
            e.preventDefault();
            map.balloon.close();
        }
        // add comment
        if(e.target.dataset.btn === 'addComment'){
            e.preventDefault();
            let inputs = document.querySelectorAll('.add-comments_form-inputs'),
                form = document.querySelector('.add-comments_form-inputs').parentNode,
                elems = {
                    valid: false
                },
                comentsContainer = document.querySelector('.add-comments_comment');

            elems = this.validationForm(inputs);

            if(elems.valid){
                for(input of inputs){
                    input.value = '';
                }
                let coords = form.dataset.coord;
                addComment(elems.value, comentsContainer, coords);
                return {status:true, coord: coords};
            }

            function addComment(comments, commentContainer, coords) {
                let name = comments[0];
                let loc = comments[1];
                let text = comments[2];
                let date = new Date().getDate() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getFullYear();

                let comment = [];
                comment['id'] = coords;
                comment['name'] = name;
                comment['loc'] = loc;
                comment['text'] = text;
                comment['date'] = date;

                console.log(comment);

                let templateRender = template.commentSection();

                let getData = data.getData();
                let dataRender = [];
                dataRender.push(getData);
                dataRender.push(comment);

                //todo
                render.renderHTML(dataRender, commentContainer, templateRender);

            }
            return {status:false};
        }
    },
    validationForm: function (elems) {
        let elemValue = {
            valid: false,
            value: []
        };
        for(elem of elems){
            if(!elem.value){
                elemValue = {};
                return elemValue.valid = false;
            }
            else{
                elemValue.value.push(elem.value);
            }
        };
        elemValue.valid = true;
        return elemValue;
    },
    initPlacemark: function (coordinates, content) {
        return new ymaps.Placemark(coordinates, content);
    },
    addPlacemark: function (map, placemark) {
        return map.geoObjects.add(placemark);
    }
}
