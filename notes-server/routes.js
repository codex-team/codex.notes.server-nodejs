'use strict';

module.exports = function(app) {
    let user = require('./controllers/user');
    let directory = require('./controllers/directory');

    app.route('/user/create')
        .post(user.create);

    // Middleware for auth. Check password and add user identity to the req.user
    app.route('/user/:userID/*')
        .post(async function (req, res, next) {
            let model =  require('./models/user');
            console.log("checking access");

            try {
                // TODO: validate if there can be mongoDb injection in uid parameter
                let userObject = await model.get(req.params.userID);

                if (!await model.validate(userObject, req.body.password)) {
                    res.send({'result': 'error'});
                }
                else {
                    req.user = userObject;
                    next('route');
                }
            }
            catch (err) {
                console.log("error in middware", err);
                res.send({'result': 'error'});
            }
        });

    app.route('/user/:userID/directory/create')
        .post(async function (req, res, next) {
            next('route');
        }, async function (req, res, next) {
            res.send({'result': 'error', 'data': {'message': 'user or password invalid'}});
        });

    app.route('/user/:userID/directory/create')
        .post(directory.create);


};