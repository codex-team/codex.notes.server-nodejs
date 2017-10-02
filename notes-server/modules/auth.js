let Crypto = require('crypto');

module.exports = (function () {
    /* Create sha256 hash for inputString */
    let generateHash = function (inputString, localSalt="") {
        // TODO: process.env.SALT
        const globalSalt = "salt";

        if (!localSalt) {
            localSalt = generatePassword();
        }
        let hash = Crypto.createHmac('sha256', globalSalt + localSalt).update(inputString.toString()).digest('hex');

        return {hash: hash, localSalt: localSalt};
    };

    /* Generate 8 symbols password */
    let generatePassword = function (size=8) {
        return Math.random().toString(36).slice(-size);
    };

    let validateCredentials = function (userId, password) {
        if (!userId || !password) {
            return 0;
        }

    };

    return {
        generateHash: generateHash,
        generatePassword: generatePassword
    };
})();