'use strict';

let collections = require('../config/collections');
let auth = require('../modules/auth');
let mongo = require('../modules/database');

module.exports = function () {
    const collection = collections.USERS;

    let get = async function (id) {
        try {
            return await mongo.findOne(collection, {_id: mongo.ObjectId(id)});
        }
        catch (err) {
            return;
        }
    };

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

    let validate = async function (uid, password) {
        try {
            // TODO: validate if there can be mongoDb injection in uid parameter
            let user = await get(uid);
            if (!user) {
                return 0;
            }

            let checkHash = auth.generateHash(password, user.password.localSalt);

            return user.password.hash === checkHash.hash;
        }
        catch (err) {
            console.log('error', 'Cannot validate user because of ', err);
            return 0;
        }
    };

    return {
        create: create,
        get: get,
        validate: validate
    }

}();