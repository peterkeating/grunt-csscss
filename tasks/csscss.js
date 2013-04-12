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
    grunt.verbose.writeflags(options, 'Options');

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
       * Flag indicating whether the output should be colorized. This is true by
       * default.
       */
      if (options.colorize === false) {
        args.push('--no-color');
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
        args.push('-n');
        args.push(options.minMatch);
      }

      /**
       * Sets which properties should be ignored.
       */
      if (options.ignoreProperties) {
        args.push('--ignore-properties');
        args.push(options.ignoreProperties);
      }

      /**
       * Sets which selectors should be ignored.
       */
      if (options.ignoreSelectors) {
        args.push('--ignore-selectors');
        args.push(options.ignoreSelectors);
      }

      /**
       * Sets whether parser errors should be outputted.
       */
      if (options.showParserErrors) {
        args.push('--show-parser-errors');
      }

      /**
       * adds path to file, to be analysed, as an argument.
       */
      args.push(f);

      /**
       * Outputs the file that is being analysed.
       */
      grunt.log.writeln(f);
      grunt.verbose.writeln('csscss ' + args.join(' '));

      /**
       * Executes the csscss command.
       */
      var child = grunt.util.spawn({
        cmd: 'csscss',
        args: args
      }, function(error, result, code) {
        if (code === 127) {
          return grunt.warn('Ruby and csscss have to be installed and in your PATH for this task to run.');
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
