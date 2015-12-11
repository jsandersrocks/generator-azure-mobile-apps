// -----------------------------------------------------------
//
// An example Node server for Azure App Service Mobile Apps
//
// -----------------------------------------------------------
var express = require('express'),
    azureMobileApps = require('azure-mobile-apps');

var app = express(),
    mobileapi = azureMobileApps();

mobileapi.tables.import('./tables');
mobileapi.tables.import('./api');

mobileapi.tables.initialize()
    .then(function() {
        app.use(mobileapi);
        app.listen(process.env.PORT || 3000);
    });
    