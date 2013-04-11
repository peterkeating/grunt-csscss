/*
 * grunt-csscss
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('csscss', 'CSSCSS redundancy analyzer.', function() {

    var done = this.async();

    grunt.util.async.forEachSeries(this.data.src, function(f, next) {
      var args = [];

      /**
       * adds path to file, to be analysed, as an argument.
       */
      args.push(f);

      var child = grunt.util.spawn({
        cmd: 'csscss',
        args: args
      }, function(error, result, code) {
        if (code === 127) {
          return grunt.warn('You need to have Ruby and csscss installed and in your PATH for this task to run.');
        }

        next(error);
      });

      /**
       * displays the output and error streams via the parent process.
       */
      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);
    }, done);

  });

};
