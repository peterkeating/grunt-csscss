/*
 * grunt-csscss
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('csscss', 'CSSCSS redundancy analyzer.', function() {

    /**
     * Asynchronously loops through the provided files and puts them through the
     * CSSCSS tool.
     */
    function analyze(files) {

      /**
       * Loops over all the files specified in the src array.
       */
      grunt.util.async.forEachSeries(files, function(file, next) {

        /**
         * Stores the output that is to be written to the file.dest, if one is
         * specified.
         */
        var output = options.outputJson ? '{' : '';

        /**
         * Loops over all the matches files in the src in case there are multiple.
         */
        grunt.util.async.forEachSeries(file.src, function (fileToBeAnalyzed, innerNext) {

          /**
           * adds the file path as the final argument, this goes into a new array so
           * the file doesn't get used in the next iteration.
           */
          var cmdArgs = args.concat([fileToBeAnalyzed]),

            /**
             * Stores the output from CSSCSS.
             */
            childOutput = '';

          /**
           * Outputs the file that is being analysed.
           */
          grunt.log.writeln(fileToBeAnalyzed);

          output += (options.outputJson) ? '\n\t"' + fileToBeAnalyzed + '": ' : fileToBeAnalyzed + '\n';

          grunt.verbose.writeln('csscss ' + cmdArgs.join(' '));

          /**
           * Executes the csscss command.
           */
          var child = grunt.util.spawn({
            cmd: cmdArgs.shift(),
            args: cmdArgs
          }, function(error, result, code) {
            if (code === 127) {
              return grunt.warn('Ruby and csscss have to be installed and in your PATH for this task to run.');
            }

            grunt.log.writeln(childOutput);

            /**
             * Substring removes the carriage return from CSSCSS.
             */
            output += (options.outputJson) ? childOutput.substring(0, childOutput.length - 2) + ',' : childOutput;

            /**
             * When outputting JSON from CSSCSS an empty array will be outputted, this
             * should be ignored and shouldn't cause the grunt task to fail if no other
             * duplicates are found.
             */
            if (!(options.outputJson && JSON.parse(childOutput).length === 0)) {
              hasDuplicates = true;
            }

            innerNext(error);
          });

          /**
           * Displays the output and error streams via the parent process.
           */
          child.stdout.on('data', function(buf) {
            childOutput += String(buf);
          });

          child.stderr.on('data', function(buf) {
            grunt.log.writeln(String(buf));
          });

        }, function () {

          /**
           * Removes the final comma so valid JSON is outputted. Also the end brace
           * for the JSON object is included.
           */
          if (options.outputJson) {
            output = output.substring(0, output.length - 1);
            output += '\n}';
          }

          /**
           * Write the output to the destination file if one was specified.
           */
          if (file.dest) {
            grunt.file.write(file.dest, output);
          }
          next();
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
    }

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

    /**
     * Contains the arguments that are to be passed to CSSCSS.
     */
    var args = [];

    args.push('csscss');

    /**
     * Flag indicating whether CSSCSS should be run in the context of a bundle.
     */
    if (options.bundleExec) {
      args.unshift('bundle', 'exec');
    }

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
     * Sets whether Sass mixins should be ignored.
     */
    if (options.ignoreSassMixins) {
      args.push('--ignore-sass-mixins');
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

    analyze(this.files);
  });
};
