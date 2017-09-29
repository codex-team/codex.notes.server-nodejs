'use strict';

let user = require('../models/user');

/**
 * Show note IDs for the user specified
 */
module.exports = function() {

    let create = async function (req, res) {
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        let password = req.body.password;

        if (!password) {
            return res.send({'result': 'error', 'message': 'POST field password is empty'});
        }

        let newUser = await user.create(ip, password);

        if (newUser) {
            res.send({'result': 'success', 'data': {'user_id': newUser.uid}})
        }
        else {
            res.send({'result': 'error'})
        }
    };

    let validate = async function (req, res) {
        let uid = req.params.userID,
            password = req.body.password;

        if (!(uid || password)) {
            return res.send({'result': 'error', 'message': 'POST field user_id or password is empty'});
        }

        if (await user.validate(uid, password)) {
            res.send({'result': 'success'})
        }
        else {
            res.send({'result': 'error'})
        }
    };

    return {
        create: create,
        validate: validate
    }

}();