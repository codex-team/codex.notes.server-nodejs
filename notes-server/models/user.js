'use strict';

let auth = require('../modules/auth');
let mongo = require('../modules/database');

module.exports = function () {

    let get = async function (id) {
        try {
            let userCollection = "user:" + id;
            return await mongo.findOne(userCollection, {});
        }
        catch (err) {
            return;
        }
    };

    let create = async function (ip, password) {
        let userID = auth.generatePassword(),
            passwordHashed = auth.generateHash(password),
            userCollection = "user:" + userID;

        let user = {
            'user_id': userID,
            'password': passwordHashed,
            'ip': ip,
            'directories': []
        };

        try {
            let result = await mongo.insertOne(userCollection, user);
            let insertedUser = result.ops[0];
            console.log('Register new user with ID: ' + userID);

            return {
                uid: userID
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
        let userCollection = "user:" + userObject.user_id;
        if (getDirectory(userObject, did)) {
            console.log("directory exists", did);
            return 0;
        }
        else {
            userObject.directories.push(did);
            await mongo.updateOne(userCollection, {}, userObject);
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