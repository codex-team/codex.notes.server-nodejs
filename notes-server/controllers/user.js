'use strict';

let user = require('../models/user');

/**
 * Show note IDs for the user specified
 */
module.exports = function() {

    var create = function (req, res) {
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        let newUser = user.create(ip);

        if (newUser) {
            res.send({'result': 'success', 'data': {'user_id': newUser.insertedUser, 'password': newUser.password}})
        }
        else {
            res.send({'result': 'error'})
        }
    };

    return {
        create: create
    }

}();