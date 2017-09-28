'use strict';

module.exports = function(app) {
    let user = require('./controllers/user');

    app.route('/users/create')
        .get(user.create);

};