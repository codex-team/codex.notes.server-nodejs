'use strict';

const express = require('express');
const bodyParser = require('body-parser');

var app = express(),
    port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let routes = require('./routes');
routes(app);

let server = app.listen(port);

console.log('Server started on: ' + port);
module.exports = {
    'app': app,
    'server': server
};