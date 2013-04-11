'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    /**
     *
     */
    csscss: {
      options: {
        verbose: true,
        outputJson: false
      },
      dist: {
        src: ['test/example/style.css', 'test/example/another.css']
      }
    }

  });

  /**
   * Loads tasks located in the tasks directory.
   */
  grunt.loadTasks('tasks');

  grunt.registerTask('default', 'csscss');
};
