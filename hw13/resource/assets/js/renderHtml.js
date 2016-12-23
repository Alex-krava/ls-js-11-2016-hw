let Handlebars = require('./foundation.js');

module.exports = {
    renderHTML: function(data, idElem, templateHtml) {
        let template = templateHtml;
        let templateCompile = Handlebars.compile(template);
        template = templateCompile({items: data});
        idElem.innerHTML = template;
    }
}