module.exports = (function () {

    var mongodb = (function () {

        var protocol = 'mongodb://',
            host = 'mongodb',
            port = '27017',
            dbname = "notes-server";

        var connection = protocol + host + ':' + port + "/" + dbname;

        return {
            connection: connection
        }

    })();

    return {
        mongodb: mongodb,
    }

})();