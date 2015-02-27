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
        ignoreProperties: 'padding',
        ignoreSelectors: '.rule-a',
        showParserErrors: true,
        shorthand: false,
        failWhenDuplicates: false
      },
      dist: {
        src: ['test/example/style.css', 'test/example/shorthand.css']
      },

      /**
       * Tests running the grunt task in a Compass setup.
       */
      compass: {
        options: {
          require: 'test/example/compass/config.rb',
          ignoreSassMixins: true
        },
        src: ['test/example/compass/sass/screen.scss']
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
      },

      /**
       * Tests that CSSCSS handles a glob pattern.
       */
      globbing: {
        src: ['test/example/*.css']
      },

      /**
       * Tests outputting CSSCSS findings to a file.
       */
      outputToFile: {
        options: {
          outputJson: true
        },
        files: {
          'ignore/output.json': ['test/example/no-duplicates.css']
        }
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
