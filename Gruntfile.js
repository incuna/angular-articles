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
            files: {
                src: '<%= config.src %>/<%= pkg.name %>.js',
                dist: '<%= config.dist %>/<%= pkg.name %>.js',
                distMin: '<%= config.dist %>/<%= pkg.name %>.min.js',
                test: 'test/**/*.js',
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
                    '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
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
                    // First the module file.
                    '<%= config.files.src %>',
                    // Then the rest of the src files.
                    '<%= config.files.templatesJS %>',
                    '<%= config.files.test %>'
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
                    '<%= config.files.unit %>': 'coverage'
                },
                reporters: ['dots'],
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
                reporters: ['dots', 'coverage'],
                coverageReporter: {
                    type: 'lcovonly',
                    // Travis uses this path: coverage/lcov.info
                    subdir: '.',
                    file: 'lcov.info'
                },
                logLevel: 'WARN',
                options: {
                    files: [
                        '<%= config.lib %>/angular/angular.js',
                        '<%= config.lib %>/angular-mocks/angular-mocks.js',
                        '<%= config.lib %>/angular-route/angular-route.js',
                        '<%= config.lib %>/lodash/dist/lodash.js',
                        'node_modules/jasmine-expect/dist/jasmine-matchers.js',
                        // Test the distribution in Travis.
                        '<%= config.files.distMin %>',
                        '<%= config.files.test %>'
                    ]
                }
            },
            watch: {
                autoWatch: true,
                singleRun: false,
                // INFO level logs when a file is changed: better feedback.
                logLevel: 'INFO'
            },
            unit: {
                reporters: ['dots'],
                logLevel: 'INFO'
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
    grunt.registerTask('unit:travis', ['clean:coverage', 'karma:travis']);
    grunt.registerTask('test', ['lint', 'unit']);
    grunt.registerTask('test:travis', ['ensure:dist', 'lint', 'unit:travis']);
    grunt.registerTask('dist', ['clean:dist', 'ngtemplates', 'concat:dist', 'uglify:dist']);

};
