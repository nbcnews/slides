var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
    return connect.static(path.resolve(point));
};

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        // local server config
        connect: {
            livereload: {
                options: {
                    port: 9001,
                    hostname: undefined,
                    middleware: function (connect, options) {
                        return [lrSnippet, folderMount(connect, '.')];
                    }
                }
            },
            acceptanceTest: {
                options: {port: 9002}
            }
        },
        // files to watch & tasks to run when they're changed
        regarde: {
            markup: {
                files: 'app/**/*.html',
                tasks: ['livereload']
            },
            scss: {
                files: 'app/**/*.scss',
                tasks: ['compass:dev', 'livereload']
            },
            js: {
                files: 'app/scripts/**/*.js',
                tasks: ['requirejs:dev', 'livereload']
            }
        },

        compass: {
            prod: {
                options: {
                    sassDir: 'app/styles',
                    cssDir: 'app/build/styles',
                    environment: 'production',
                    imagesDir: 'app/img'
                }
            },
            dev: {
                options: {
                    sassDir: 'app/styles',
                    cssDir: 'app/build/styles',
                    debugInfo: true,
                    imagesDir: 'app/img'
                }
            }
        },

        mocha: {
            all: {
                src: ['test/**/*.html'],
                // use bridge.js to support running the tests in phantomjs
                options: {run: true}
            }
        },

        jshint: {
            files: ['app/scripts/*.js', 'app/scripts/views/*.js'],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                undef: false,
                unused: true,
                laxbreak: true,
                globals: {
                    jQuery: true,
                    require: true
                },
                devel: {
                    console: true
                }
            }
        },

        casperjs: {
            files: ['acceptance-test/**/*.js']
        },

        requirejs: {

            prod: {
                options: {
                    out: 'app/build/scripts/main.js',
                    mainConfigFile: 'app/scripts/config.js',
                    name: 'requireLib',
                    paths: {
                        requireLib: '../../components/requirejs/require'
                    },
                    optimize: 'uglify2',
                    preserveLicenseComments: false,
                    generateSourceMaps: true
                }
            },

            dev: {
                options: {
                    out: 'app/build/scripts/main.js',
                    mainConfigFile: 'app/scripts/config.js',
                    name: 'requireLib',
                    paths: {
                        requireLib: '../../components/requirejs/require'
                    },
                    optimize: 'none'
                }
            }
        },
        copy: {
            main: {
                files: [
                    { cwd: 'app/fonts/', src: ['**'], dest: 'app/build/fonts', expand: true },
                    { cwd: 'app/img/', src: ['**'], dest: 'app/build/img', expand: true }

                ]
            },
            github: {
                files: [
                    { src: ['.gitignore.github'], dest: '.gitignore' }
                ]
            },
            heroku: {
                files: [
                    { src: ['.gitignore.heroku'], dest: '.gitignore' }
                ]
            }
        },
        exec: {
            github: {
                cmd: "git rm -rfq --cached --ignore-unmatch app/build/"
            },
            heroku: {
                cmd: 'git add app/build'
            }
        },
        parallel: {
            dev: [{
                grunt: true,
                args: ['requirejs:dev']
            }, {
                grunt: true,
                args: ['compass:dev']
            }],
            prod:[{
                grunt: true,
                args: ['requirejs:prod']
            }, {
                grunt: true,
                args: ['compass:prod']
            }]
        },
        hogan: {
            default_templates: {
                templates: ["app/templates/default/*.html"],
                output: 'app/build/templates/default.js',
                binderName: 'amd'
            }
        }
    });

    grunt.loadNpmTasks('grunt-regarde');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-casperjs');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-exec')
    grunt.loadNpmTasks('grunt-parallel');
    grunt.loadNpmTasks('grunt-hogan');

    grunt.registerTask('default', ['jshint', 'hogan', 'parallel:dev', 'copy:main', 'livereload-start', 'connect', 'regarde']);
    grunt.registerTask('build', ['jshint', 'hogan', 'parallel:prod', 'copy:main']);
    grunt.registerTask('switch-to-dev', ['copy:github', 'exec:github']);
    grunt.registerTask('switch-to-heroku', ['copy:heroku', 'exec:heroku']);
    grunt.registerTask('test', ['mocha']);
    grunt.registerTask('acceptance-test', ['hogan','connect:acceptanceTest', 'casperjs']);
};