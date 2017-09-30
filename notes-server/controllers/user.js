'use strict';

let user = require('../models/user');

module.exports = function() {

    /* Create new user collection */
    let create = async function (req, res) {
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        let password = req.body.password;

        if (!password) {
            return res.send({'result': 'error', 'message': 'POST field password is empty'});
        }

        let newUser = await user.create(ip, password);

        if (newUser) {
            res.send({'result': 'success', 'data': {'user_id': newUser.uid.toString()}});
        }
        else {
            res.send({'result': 'error'});
        }
    };

    return {
        create: create
    }

}();