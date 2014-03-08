'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // Configurable paths
            src: 'src',
            dev: 'dist',
            tmp: '.tmp'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= yeoman.src %>/scripts/{,*/}*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            jstest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['test:watch']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            handlebars: {
                files: ['<%= yeoman.src %>/templates/**/*.{handlebars,hbs}'],
                tasks: ['hamlbars', 'handlebars:dev']
            },
            compass: {
                files: ['<%= yeoman.src %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },
            styles: {
                files: ['<%= yeoman.src %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.src %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= yeoman.src %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= yeoman.src %>'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= yeoman.src %>'
                    ]
                }
            },
            dev: {
                options: {
                    open: true,
                    base: '<%= yeoman.dev %>',
                    livereload: false
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dev: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dev %>/*',
                        '!<%= yeoman.dev %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.src %>/scripts/{,*/}*.js',
                '!<%= yeoman.src %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },


        // Mocha testing framework configuration options
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
                }
            }
        },
        hamlbars: {
            options: {
                expand: true
            },
            dev: {
                cwd: '<%= yeoman.src %>', 
                src: 'templates/**/*.hamlbars', 
                dest: '<%= yeoman.tmp %>/templates', 
                ext: '.handlebars'
            }
        },
        handlebars:{
            dev: {
                files:{
                    "<%= yeoman.dev %>/js/templates.js": ["<%= yeoman.tmp %>/templates/**/*.handlebars"]
                }
            }
        },
        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= yeoman.src %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= yeoman.src %>/images',
                javascriptsDir: '<%= yeoman.src %>/scripts',
                fontsDir: '<%= yeoman.src %>/styles/fonts',
                importPath: '<%= yeoman.src %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false
            },
            dev: {
                options: {
                    generatedImagesDir: '<%= yeoman.dev %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the HTML file
        'bower-install': {
            src: {
                html: '<%= yeoman.src %>/index.html',
                ignorePath: '<%= yeoman.src %>/'
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dev: {
                files: {
                    src: [
                        '<%= yeoman.dev %>/scripts/{,*/}*.js',
                        '<%= yeoman.dev %>/styles/{,*/}*.css',
                        '<%= yeoman.dev %>/images/{,*/}*.{gif,jpeg,jpg,png,webp}',
                        '<%= yeoman.dev %>/styles/fonts/{,*/}*.*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= yeoman.dev %>'
            },
            html: '<%= yeoman.src %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%= yeoman.dev %>']
            },
            html: ['<%= yeoman.dev %>/{,*/}*.html'],
            css: ['<%= yeoman.dev %>/styles/{,*/}*.css']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.src %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= yeoman.dev %>/images'
                }]
            }
        },
        svgmin: {
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.src %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dev %>/images'
                }]
            }
        },
        htmlmin: {
            dev: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dev %>',
                    src: '{,*/}*.html',
                    dest: '<%= yeoman.dev %>'
                }]
            }
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //     dev: {
        //         files: {
        //             '<%= yeoman.dev %>/styles/main.css': [
        //                 '.tmp/styles/{,*/}*.css',
        //                 '<%= yeoman.src %>/styles/{,*/}*.css'
        //             ]
        //         }
        //     }
        // },
        // uglify: {
        //     dev: {
        //         files: {
        //             '<%= yeoman.dev %>/scripts/scripts.js': [
        //                 '<%= yeoman.dev %>/scripts/scripts.js'
        //             ]
        //         }
        //     }
        // },
        // concat: {
        //     dev: {}
        // },

        // Copies remaining files to places other tasks can use
        copy: {
            dev: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.src %>',
                    dest: '<%= yeoman.dev %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.webp',
                        '{,*/}*.html',
                        'styles/fonts/{,*/}*.*',
                        'bower_components/' + (this.includeCompass ? 'sass-' : '') + 'bootstrap/' + (this.includeCompass ? 'fonts/' : 'dist/fonts/') +'*.*'
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= yeoman.src %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },


        // Generates a custom Modernizr build that includes only the tests you
        // reference in your app
        modernizr: {
            devFile: '<%= yeoman.src %>/bower_components/modernizr/modernizr.js',
            outputFile: '<%= yeoman.dev %>/bower_components/modernizr/modernizr.js',
            files: [
                '<%= yeoman.dev %>/scripts/{,*/}*.js',
                '<%= yeoman.dev %>/styles/{,*/}*.css',
                '!<%= yeoman.dev %>/scripts/vendor/*'
            ],
            uglify: true
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'compass:server',
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dev: [
                'compass',
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        }
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dev:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'hamlbars:dev',
            'handlebars:dev',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('test', function(target) {
        if (target !== 'watch') {
            grunt.task.run([
                'clean:server',
                'concurrent:test',
                'autoprefixer',
            ]);
        }

        grunt.task.run([
            'connect:test',
            'mocha'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'modernizr',
        'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};
