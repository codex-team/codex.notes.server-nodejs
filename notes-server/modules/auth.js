let Crypto = require('crypto');

module.exports = (function () {
    /* Create sha256 hash for inputString */
    let generateHash = function (inputString) {
        let string = inputString + process.env.SALT;

        let hash = Crypto.createHash('sha256').update(string, 'utf8').digest('hex');

        return hash;
    };

    /* Generate 8 symbols password */
    let generatePassword = function (size=8) {
        return Math.random().toString(36).slice(-size);
    };

    return {
        generateHash: generateHash,
        generatePassword: generatePassword
    };
})();