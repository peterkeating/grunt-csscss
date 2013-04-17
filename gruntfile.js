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
        compassConfig: 'test/example/compass/config.rb',
        failWhenDuplicates: false
      },
      dist: {
        src: ['test/example/style.css', 'test/example/shorthand.css', 'test/example/compass/sass/screen.scss']
      },

      /**
       * Tests that the grunt task doesn't fail when outputting JSON and the failWhenDuplicates
       * option is set to true.
       */
      outputJsonTest: {
        options: {
          failWhenDuplicates: true,
          outputJson: true
        },
        src: ['test/example/no-duplicates.css']
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
