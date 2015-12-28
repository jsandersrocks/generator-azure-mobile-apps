/* global describe, it */
var expect = require('chai').expect;

var createWebApplication = require('../server/app');

describe('server/app.js', function () {
    it('should export a function', function () {
        expect(createWebApplication).to.be.a('function');
    });

    it('should return a Promise', function () {
        expect(createWebApplication()).to.be.an.instanceof(Promise);
    });

    it('should resolve to an express Application', function (done) {
        createWebApplication()
            .then((app) => {
                expect(app).to.be.a('function');
                done();
            })
            .catch((error) => {
                done(error);
            });
    });
});
