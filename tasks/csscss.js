/*
 * grunt-csscss
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('csscss', 'CSSCSS redundancy analyzer.', function() {

    var child = grunt.util.spawn({
      cmd: 'csscss'
    }, function(error, result, code) {
      if (code === 127) {
        return grunt.warn('You need to have Ruby and csscss installed and in your PATH for this task to run.');
      }
    });
  });

};
