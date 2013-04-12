'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    /**
     *
     */
    jshint: {
      all: [
        'gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    /**
     *
     */
    csscss: {
      options: {
        colorize: false,
        verbose: true,
        outputJson: false,
        minMatch: 2,
        compass: true,
        ignoreProperties: 'padding',
        ignoreSelectors: '.rule-a',
        showParserErrors: true,
        shorthand: false,
        compassConfig: 'test/example/compass/config.rb'
      },
      dist: {
        src: ['test/example/style.css', 'test/example/shorthand.css', 'test/example/compass/sass/screen.scss']
      }
    }

  });

  /**
   * Loads tasks located in the tasks directory.
   */
  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint', 'csscss']);
};
