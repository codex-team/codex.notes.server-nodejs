'use strict';

module.exports = function(app) {
    let user = require('./controllers/user');

    app.route('/user/create')
        .post(user.create);

    app.route('/user/:userID/validate')
        .post(user.validate)

};