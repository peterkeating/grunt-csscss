/*
 * grunt-csscss
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('csscss', 'CSSCSS redundancy analyzer.', function() {
    /**
     * Retrieves defined options.
     */
    var options = this.options();

    var done = this.async();

    grunt.util.async.forEachSeries(this.data.src, function(f, next) {
      var args = [];

      /**
       * Checks to see if the verbose flag should be added as an argument.
       */
      if (options.verbose) {
        args.push('-v');
      }

      /**
       * Checks to see if the results of the analysis should be formatted as json.
       */
      if (options.outputJson) {
        args.push('-j');
      }

      /**
       * Checks to see if the minimum match argument should be enforced.
       */
      if (options.minMatch) {
        args.push('-n')
        args.push(options.minMatch);
      }

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
