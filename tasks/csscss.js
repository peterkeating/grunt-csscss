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

    /**
     * Flag for whether any duplicates were found by CSSCSS.
     */
    var hasDuplicates = false;

    var done = this.async();

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
     * Enables Compass extensions when parsing Sass files. This argument is not
     * set if the compassConfig property has been defined.
     */
    if (options.compass && !options.compassConfig) {
      args.push('--compass');
    }

    /**
     * Enables Compass extensions when parsing Sass files and specifies the path
     * to the config file.
     * The compassConfig option is deprecated and will be removed in a future release.
     * The require option should be used instead.
     */
    if (options.compassConfig && !options.require) {
      args.push('--compass');
      args.push('--require');
      args.push(options.compassConfig);

      grunt.log.writeln('WARNING: compassConifg is DEPRECATED, please use the "require" option');
    }

    /**
     * Enables Compass extensions when parsing Sass files and specifies the path
     * to the config file.
     */
    if (options.require) {
      args.push('--compass');
      args.push('--require');
      args.push(options.require);
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
     * Sets whether shorthand should be matched.
     */
    if (options.shorthand === false) {
      args.push('--no-match-shorthand');
    }

    grunt.util.async.forEachSeries(this.data.src, function(f, next) {

      /**
       * adds the file path as the final argument, this goes into a new array so
       * the file doesn't get used in the next iteration.
       */
      var cmdArgs = args.concat([f]);

      /**
       * Outputs the file that is being analysed.
       */
      grunt.log.writeln(f);
      grunt.verbose.writeln('csscss ' + cmdArgs.join(' '));

      /**
       * Executes the csscss command.
       */
      var child = grunt.util.spawn({
        cmd: 'csscss',
        args: cmdArgs
      }, function(error, result, code) {
        if (code === 127) {
          return grunt.warn('Ruby and csscss have to be installed and in your PATH for this task to run.');
        }

        next(error);
      });

      /**
       * displays the output and error streams via the parent process.
       */
      child.stdout.on('data', function(buf) {
        var output = String(buf);
        grunt.log.writeln(output);

        /**
         * When outputting JSON from CSSCSS an empty array will be outputted, this
         * should be ignored and shouldn't cause the grunt task to fail if no other
         * duplicates are found.
         */
        if (!(options.outputJson && JSON.parse(output).length === 0)) {
          hasDuplicates = true;
        }
      });

      child.stderr.on('data', function(buf) {
        grunt.log.writeln(String(buf));
      });

    }, function () {

      /**
       * If instructed to fail when a match happens and matches found lets fail
       * the grunt build.
       */
      if (options.failWhenDuplicates && hasDuplicates) {
        grunt.fail.warn("Failed due to matches found by CSSCSS.");
      }

      done();
    });

  });

};
