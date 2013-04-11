'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    /**
     *
     */
    csscss: {
      dist: {

      }
    }

  });

  /**
   * Loads tasks located in the tasks directory.
   */
  grunt.loadTasks('tasks');

  grunt.registerTask('default', 'csscss');
};
