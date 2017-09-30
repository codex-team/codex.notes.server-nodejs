'use strict';

let user = require('../models/user');
let directory = require('../models/directory');

/**
 * Show note IDs for the user specified
 */
module.exports = function() {

    let create = async function (req, res) {

        console.log("create new directory for user: ", req.user.user_id);

        try {
            // TODO: add transactions
            let directoryID = await directory.create(req.user.user_id);
            if (await user.addDirectory(req.user, directoryID)) {
                res.send({'result': 'success', 'data': {'directoryID': directoryID}});
            }
            else {
                res.send({'result': 'error'});
            }
        }
        catch (err) {
            console.log("directory create error", err);
            res.send({'result': 'error'});
        }
    };

    return {
        create: create
    }

}();