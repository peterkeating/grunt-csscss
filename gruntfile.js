'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    /**
     *
     */
    csscss: {
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
