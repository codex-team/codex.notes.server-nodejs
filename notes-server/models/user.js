'use strict';

let collections = require('../config/collections');
let auth = require('../modules/auth');
let mongo = require('../modules/database');

module.exports = function () {
    const collection = collections.USERS;

    var get = function (id) {
        return mongo.findOne(collection, {_id: mongo.ObjectId(id)});
    };

    var create = async function (ip) {
        let password = auth.generatePassword(),
            token =  auth.generatePassword(),
            passwordHashed = auth.generateHash(password);

        let user = {
            'token': token,
            'password': passwordHashed,
            'ip': ip
        };

        try {
            let result = await mongo.insertOne(collection, user);
            console.log('Register new user with ID: ' + token);

            let insertedUser = result.ops[0];

            return {
                insertedUser,
                password
            };
        }
        catch (err) {
            console.log('error', 'Cannot insert user because of ', err);
        }
        //
        // return mongo.insertOne(collection, user)
        //     .then(function (result) {
        //         logger.info('Register new user with ID: ' + token);
        //
        //         let insertedUser = result.ops[0];
        //
        //         return {
        //             insertedUser,
        //             password
        //         };
        //     }).catch(function (err) {
        //         logger.log('error', 'Cannot insert user because of ', err);
        //     });
    };

    return {
        create: create,
        get: get
    }

}();