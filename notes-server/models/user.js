'use strict';

let collections = require('../config/collections');
let auth = require('../modules/auth');
let mongo = require('../modules/database');

module.exports = function () {
    const collection = collections.USERS;

    let get = async function (id) {
        return mongo.findOne(collection, {_id: mongo.ObjectId(id)});
    };

    let create = async function (ip) {
        let password = auth.generatePassword(),
            passwordHashed = auth.generateHash(password);

        let user = {
            'password': passwordHashed,
            'ip': ip
        };

        try {
            let result = await mongo.insertOne(collection, user);
            let insertedUser = result.ops[0];
            console.log('Register new user with ID: ' + insertedUser._id);

            return {
                uid: insertedUser._id,
                password: password
            };
        }
        catch (err) {
            console.log('error', 'Cannot insert user because of ', err);
        }
    };

    return {
        create: create,
        get: get
    }

}();