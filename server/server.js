'use strict';
var express = require('express');
var path = require('path');

var pathSettings = require('./settings/settings').app;
var port = process.env.PORT || portDefault;
//var enviroment = process.env.NODE_ENV;

var app = express();

app.use(express.static(path.join(__dirname, '../' + pathSettings.pageBuild)));
//app.use(express.static(path.join(__dirname, '../' + pathSettings.assets)));
app.use('/lib', express.static(path.join(__dirname, '../' + pathSettings.lib)));

app.listen(port, function () {
    console.log('Express app started on port:' + port);
});

