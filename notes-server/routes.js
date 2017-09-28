'use strict';

module.exports = function(app) {
    let user = require('./controllers/user');

    app.route('/user/create')
        .get(user.create);

};