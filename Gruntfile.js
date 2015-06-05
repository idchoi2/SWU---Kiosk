// Gruntfile.js
module.exports = function(grunt) {

    // Project config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jslint: {
            swu: {
                src: [
                    'vendor/**/*.js',
                    'app.js'
                ],
                directives: {
                    nomen: true,
                    white: true,
                    browser: true,
                    sloppy: true,
                    predef: [
                        '$', 'jQuery', 'angular', 'confirm', 'alert', 'swu', 'module'
                    ]
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        jsdoc: {
            dist: {
                src: ['README.md'],
                options: {
                    encoding: "utf8",
                    destination: "docs",
                    recurse: true,
                    private: true,
                    configure: 'jsdoc.conf.json'
                }
            }
        },
        concat : {
            dist : {
                src : [
                    'vendor/js/script.js',
                    'app.js'
                ],
                dest: 'build/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },
        uglify : {
            dist : {
                files : {
                    'build/<%= pkg.name %>-<%= pkg.version %>.min.js': ['build/<%= pkg.name %>-<%= pkg.version %>.js']
                }
            }
        }
    });



    // Load Plugin
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');



    grunt.registerTask('default', ['jslint', 'karma', 'jsdoc', 'concat', 'uglify']);
};