'use strict';

var generators = require('yeoman-generator'),
    chalk = require('chalk');

module.exports = generators.Base.extend({
    constructor: function() {
        var testLocal;

        generators.Base.apply(this, arguments);

        this.option('skip-install-message', {
            desc: 'Skips the message after the installation of dependencies',
            type: Boolean
        });
        this.option('test-framework', {
            desc: 'Test framework to be invoked',
            type: String,
            defaults: 'mocha'
        });

        if (this.options['test-framework'] === 'mocha') {
            testLocal = require.resolve('generator-mocha/generators/app/index.js');
        } else if (this.options['test-framework'] === 'jasmine') {
            testLocal = require.resolve('generator-jasmine/generators/app/index.js');
        }
        this.composeWith(this.options['test-framework']+':app', {
            options: {
                'skip-install': this.options['skip-install']
            }
        }, {
            local: testLocal
        });
    },

    initializing: function() {
        this.pkg = require('../package.json');
    },

    askFor: function() {
        var done = this.async();

        // We have nothing more to ask for right now.
        done();
    },

    writing: {
        'files': function() {
            var src = this.templatePath,
                dest = this.destinationPath,
                copy = this.fs.copy;

            // Copy the following files as-is
            var fileList = [
                '.gitignore',
                'server.js',
                'jsconfig.json',
                'azureMobile.js',
                'tables/example.js',
                'api/example.js'
            ];

            fileList.forEach(function copyFile(filename) {
                copy(src(filename), dest(filename));
            });
        },

        'package-json': function() {
            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'),
                {
                    testFramework: this.options['test-framework']
                }
            );
        }
    },

    install: function() {
        this.installDependendencies({
            skipInstall: this.options['skip-install'],
            skipMessage: this.options['skip-install-message']
        });
    },

    end: function() {
        var howToInstall = '\nAfter running ' + chalk.yellow.bold('npm install') + ', publish your service to Azure App Service.';

        if (this.options['skip-install']) {
            this.log(howToInstall);
            return;
        }
    }

});