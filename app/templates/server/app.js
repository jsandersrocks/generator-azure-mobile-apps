'use strict';
/* global __dirname */

var azureMobileApp = require('azure-mobile-apps'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    express = require('express'),
    logCollector = require('express-winston'),
    path = require('path'),
    staticFiles = require('serve-static'),
    logger = require('./logger');

/**
 * Create a new Web Application
 * @param {boolean} [logging=true] - if true, enable transaction logging
 * @returns {Promise.<express.Application>} A promisified express application
 */
function createWebApplication(logging) {
    var app = express(),
        mobile = azureMobileApp({ swagger: true, homePage: true });

    if (typeof logging === 'undefined' || logging === true) {
        app.use(logCollector.logger({
            winstonInstance: logger,
            colorStatus: true,
            statusLevels: true
        }));
    }

    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(staticFiles('public', {
        dotfile: 'ignore',
        etag: true,
        index: 'index.html',
        lastModified: true
    }));

    mobile.tables.import(path.join(__dirname, '../tables'));
    mobile.api.import(path.join(__dirname, '../api'));

    return mobile.tables.initialize()
        .then(function () {
            app.use(mobile);
            app.use(logCollector.errorLogger({
                winstonInstance: logger
            }));
            return app;
        });
}

module.exports = exports = createWebApplication;
