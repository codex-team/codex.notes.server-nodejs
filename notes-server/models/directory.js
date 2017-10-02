'use strict';

let auth = require('../modules/auth');
let mongo = require('../modules/database');

module.exports = function () {

    let create = async function (uid) {
        try {
            let directoryID = auth.generatePassword();
            let collectionName = "dir:" + uid + ":" + directoryID;
            let result = await mongo.createCollection(collectionName);
            return directoryID;
        }
        catch (err) {
            console.log('error', 'Cannot insert user because of ', err);
            return;
        }
    };

    return {
        create: create
    }

}();