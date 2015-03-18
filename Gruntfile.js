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
            ngtemplates: 'grunt-angular-templates'
        });
    }

    grunt.initConfig({

        pkg: grunt.file.readJSON('bower.json'),
        config: {
            coverage: 'coverage',
            dist: 'dist',
            lib: 'lib',
            src: 'src',
            test: 'test',
            files: {
                src: '<%= config.src %>/<%= pkg.name %>.js',
                dist: '<%= config.dist %>/<%= pkg.name %>.js',
                distMin: '<%= config.dist %>/<%= pkg.name %>.min.js',
                test: '<%= config.test %>/spec/**/*.js',
                unit: ['<%= config.files.src %>', '<%= config.files.test %>'],
                unitDist: ['<%= config.files.dist %>', '<%= config.files.test %>'],
                templatesHTML: '<%= config.src %>/templates/**/*.html',
                templatesJS: '<%= config.src %>/templates.js',
                lint: ['Gruntfile.js', '<%= config.files.unit %>', '!<%= config.files.templatesJS %>']
            }
        },

        ngtemplates: {
            build: {
                cwd: '<%= config.src %>',
                src: 'templates/**/*.html',
                dest: '<%= config.files.templatesJS %>',
                options: {
                    module: 'articles',
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        useShortDoctype: true
                    }
                }
            }
        },

        clean: {
            coverage: {
                src: ['<%= config.coverage %>']
            },
            dist: {
                src: ['<%= config.dist %>']
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: {
                src: '<%= config.files.lint %>'
            }
        },

        jscs: {
            options: {
                config: '.jscsrc'
            },
            all: {
                src: '<%= config.files.lint %>'
            }
        },

        watch: {
            lint: {
                files: '<%= config.files.lint %>',
                tasks: ['lint']
            },
            templates: {
                files: '<%= config.files.templatesHTML %>',
                tasks: ['ngtemplates']
            },
            dist: {
                files: '<%= config.src %>/**/*.js',
                tasks: ['dist']
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            watch: ['watch', 'karma:watch']
        },

        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
            },
            dist: {
                src: [
                    '<%= config.files.src %>',
                    '<%= config.files.templatesJS %>'
                ],
                dest: '<%= config.files.dist %>'
            }
        },

        uglify: {
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: '<%= config.files.distMin %>'
            }
        },

        karma: {
            options: {
                basePath: '',
                files: [
                    '<%= config.lib %>/angular/angular.js',
                    '<%= config.lib %>/angular-mocks/angular-mocks.js',
                    '<%= config.lib %>/angular-route/angular-route.js',
                    '<%= config.lib %>/lodash/dist/lodash.js',
                    'node_modules/jasmine-expect/dist/jasmine-matchers.js',
                    '<%= config.test %>/mock/**/*.js'
                ],
                exclude: [],
                frameworks: ['jasmine'],
                plugins: [
                    'karma-jasmine',
                    'karma-coverage',
                    'karma-spec-reporter',
                    'karma-firefox-launcher'
                ],
                preprocessors: {
                    '<%= config.files.templatesHTML %>': 'ng-html2js',
                    '<%= config.files.src %>': 'coverage',
                    '<%= config.files.templatesJS %>': 'coverage',
                    '<%= config.files.dist %>': 'coverage'
                },
                reporters: ['dots', 'coverage'],
                coverageReporter: {
                    dir: 'coverage',
                    type: 'lcov'
                },
                port: 9876,
                colors: true,
                // Travis only allows Firefox.
                browsers: ['Firefox'],
                singleRun: true
            },
            travis: {
                coverageReporter: {
                    type: 'lcovonly',
                    // Travis uses this path: coverage/lcov.info
                    subdir: '.',
                    file: 'lcov.info'
                },
                logLevel: 'WARN',
                // To merge target-specific files with the default ones above
                // in options, the files property must be an array of objects,
                // each one with a src property set to a string glob (no array)
                // otherwise grunt-karma won't merge the two together.
                files: [
                    // Test the distribution in Travis.
                    // jscs:disable requirePaddingNewLinesInObjects
                    {src: '<%= config.files.dist %>'},
                    {src: '<%= config.files.test %>'}
                    // jscs:enable requirePaddingNewLinesInObjects
                ]
            },
            dist: {
                files: [
                    // Test the minified distribution.
                    // jscs:disable requirePaddingNewLinesInObjects
                    {src: '<%= config.files.distMin %>'},
                    {src: '<%= config.files.test %>'}
                    // jscs:enable requirePaddingNewLinesInObjects
                ]
            },
            unit: {
                logLevel: 'INFO',
                files: [
                    // jscs:disable requirePaddingNewLinesInObjects
                    // First the module file.
                    {src: '<%= config.files.src %>'},
                    // Then the rest of the src files.
                    {src: '<%= config.files.templatesJS %>'},
                    // Then the test files.
                    {src: '<%= config.files.test %>'}
                    // jscs:enable requirePaddingNewLinesInObjects
                ]
            },
            watch: {
                autoWatch: true,
                singleRun: false,
                // INFO level logs when a file is changed: better feedback.
                logLevel: 'INFO',
                files: '<%= karma.unit.files %>'
            }
        }

    });

    grunt.registerTask('ensure:dist', function () {
        var dist = grunt.config('config.files.dist');
        var distMin = grunt.config('config.files.distMin');
        if (!grunt.file.exists(dist) || !grunt.file.exists(distMin)) {
            grunt.fatal('Nill or impartial distribution. Run `grunt dist` and commit.');
        }
    });

    grunt.registerTask('default', ['concurrent:watch']);
    grunt.registerTask('lint', ['jshint', 'jscs']);
    grunt.registerTask('unit', ['clean:coverage', 'karma:unit']);
    grunt.registerTask('unit:dist', ['clean:coverage', 'karma:dist']);
    grunt.registerTask('unit:travis', ['clean:coverage', 'karma:travis']);
    grunt.registerTask('test', ['lint', 'unit']);
    grunt.registerTask('test:travis', ['ensure:dist', 'lint', 'unit:dist', 'unit:travis']);
    grunt.registerTask('dist', ['clean:dist', 'ngtemplates', 'concat:dist', 'uglify:dist']);

};
