/* global module, require */

module.exports = function (grunt) {

    'use strict';

    if (grunt.option('help')) {
        // Load all tasks so they show in the help.
        require('load-grunt-tasks')(grunt);
    } else {
        // Use jit-grunt to only load tasks needed for each grunt call.
        require('jit-grunt')(grunt, {
            // Mappings for tasks whose taskname differs from its config key.
        });
    }

    grunt.initConfig({});

};
