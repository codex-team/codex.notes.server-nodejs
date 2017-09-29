'use strict';

let collections = require('../config/collections');
let auth = require('../modules/auth');
let mongo = require('../modules/database');

module.exports = function () {

    let create = async function (ip, password) {
        let passwordHashed = auth.generateHash(password);

        let user = {
            'password': passwordHashed,
            'ip': ip
        };

        try {
            let result = await mongo.insertOne(collection, user);
            let insertedUser = result.ops[0];
            console.log('Register new user with ID: ' + insertedUser._id);

            return {
                uid: insertedUser._id
            };
        }
        catch (err) {
            console.log('error', 'Cannot insert user because of ', err);
        }
    };

    return {
        create: create
    }

}();