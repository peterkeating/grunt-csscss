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
       * Outputs the rules that have been matched.
       */
      if (options.verbose) {
        args.push('-v');
      }

      /**
       * Enables Compass extensions when parsing Sass files.
       */
      if (options.compass) {
        args.push('--compass');
      }

      /**
       * Returns analysis in JSON format.
       */
      if (options.outputJson) {
        args.push('-j');
      }

      /**
       * Sets the minimum number of rules before a match is found.
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
