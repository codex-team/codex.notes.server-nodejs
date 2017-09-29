'use strict';

let user = require('../models/directory');

/**
 * Show note IDs for the user specified
 */
module.exports = function() {

    let create = async function (req, res) {

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

    return {
        create: create
    }

}();