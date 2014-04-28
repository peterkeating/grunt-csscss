### 0.6.2 (28th April 2014)

* Updated grunt dependency to 0.4.2.
* Fixed example in README of outputting analysis to a file.
* Fixed issue causing task to crash when processing files with large amounts of duplication.

### 0.6.1 (September 13th 2013)

* Fixed typo in documentation example courtesy of [joshmatz](https://github.com/joshmatz). ([#9](https://github.com/peterkeating/grunt-csscss/pull/9))

### 0.6.0 (August 17th 2013)

* Removed `compassConfig` option.
* Refactored task to use [`this.files` instead of `this.data`](http://dontkry.com/posts/code/2013-04-24-use-this-files.html).
* Added ability to write output from CSSCSS to a file. ([#8](https://github.com/peterkeating/grunt-csscss/issues/8))

### 0.5.0 (June 4th 2013)

* Specifying which files CSSCSS should analyse now supports glob patterns. ([#7](https://github.com/peterkeating/grunt-csscss/issues/7))
* Fixed typos in the documentation. ([#5](https://github.com/peterkeating/grunt-csscss/issues/5))
* Added `bundleExec` option to run CSSCSS in the context of a bundle. ([#6](https://github.com/peterkeating/grunt-csscss/issues/6))

### 0.4.0 (April 21st 2013)

* Added `ignoreSassMixins` option to ignore matches in Sass mixins.
* Added `require` option for loading Ruby file before running CSSCSS.
* Updated the `compassConfig` option to use the `--require` argument instead of the now deprecated `--compass-with-config` argument.
* Deprecated `compassConfig` option.

### 0.3.1 (April 17th 2013)

* Fixed bug with grunt task failing when CSSCSS outputs JSON even though duplicates weren't found. ([#3](https://github.com/peterkeating/grunt-csscss/issues/3))
* Performance improvements by moving re-used argument construction outside the file loop.

### 0.3.0 (April 16th 2013)

* Added `failWhenDuplicates` option to fail Grunt task when CSSCSS finds rule sets with duplicate declarations. ([#2](https://github.com/peterkeating/grunt-csscss/issues/2))

### 0.2.0 (April 13th 2013)

* Added `showParserErrors` option to output parser errors.
* Added `shorthand` option to determined whether shorthand should be parsed.
* Added `compassConfig` option to specify path to Compass config file.

### 0.1.0 (April 12th 2013)

* Initial release supporting all options for CSSCSS v1.0.0.
