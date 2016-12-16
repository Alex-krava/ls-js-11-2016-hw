var Controller = require("./controller");

module.exports = {
    handle: function(route) {
        var routeName = route + 'Route';

        Controller[routeName]();
    }
};
