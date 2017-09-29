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
            'ip': ip,
            'directories': []
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

    let validate = async function (userObject, password) {
        try {
            if (!userObject) {
                return 0;
            }

            let checkHash = auth.generateHash(password, userObject.password.localSalt);

            return userObject.password.hash === checkHash.hash;
        }
        catch (err) {
            console.log('error', 'Cannot validate user because of ', err);
            return 0;
        }
    };

    let getDirectory = function (userObject, did) {
        return userObject.directories.find(o => o.did === did);
    };

    let addDirectory = async function (userObject, did) {
        if (getDirectory(userObject, did)) {
            console.log("directory exists", did);
            return 0;
        }
        else {
            userObject.directories.push(did);
            await mongo.updateOne(collection, {'_id': userObject._id}, userObject);
            return 1;
        }
    };

    return {
        create: create,
        get: get,
        validate: validate,
        getDirectory: getDirectory,
        addDirectory: addDirectory
    }

}();