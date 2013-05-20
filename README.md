# grunt-csscss

[![Build Status](https://secure.travis-ci.org/peterkeating/grunt-csscss.png?branch=master)](http://travis-ci.org/peterkeating/grunt-csscss)

Grunt task that runs [CSSCSS](http://zmoazeni.github.io/csscss/), a CSS redundancy analyzer.

## CSSCSS

CSSCSS runs on Ruby (`v1.9.x` and up), to check Ruby is installed on your machine use `ruby -v`. To install the CSSCSS gem run `gem install csscss` command, this will grab the latest version.

Currently grunt-csscss handles all the features for CSSCSS that are available with version **1.3.1**.

## Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-csscss --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-csscss');
```
## Options

### bundleExec

Type: `Boolean`
Default: `false`

Run CSSCSS with [bundle exec](http://gembundler.com/).

### colorize

Type: `Boolean`
Default: `true`

Flag indicating whether the outputted analysis should be colorized.

### compass

Type: `Boolean`
Default: `false`

Enables Compass extensions when parsing Sass.

*[Compass](http://compass-style.org/) must be installed in order to use this option.*

### compassConfig - DEPRECATED

Type: `String`

Enables Compass extension and specifies path to a config file.

**This option is deprecated, the require option should be used.**

*[Compass](http://compass-style.org/) must be installed in order to use this option.*

### failWhenDuplicates

Type: `Boolean`
Default: `false`

Flag indicating whether the Grunt task should fail when rule sets with duplicate declarations are found by CSSCSS.

### ignoreProperties

Type: `String`

Comma seperated list of CSS properties that should be ignored when finding matches.

### ignoreSassMixins

Type: `Boolean`
Default: `false`

Flag indicating whether matches in Sass mixins should be ignored.

*This is an experimental feature.*

### ignoreSelectors

Type: `String`

Comma seperated list of selectors that should be ignored when finding matches.

### minMatch

Type: `Number`
Default: `3`

Only report matches that have at least this many matching rules.

### outputJson

Type: `Boolean`
Default: `false`

Output analysis in JSON format.

### shorthand

Type: `Boolean`
Default: `true`

Whether shorthand CSS declaration should be parsed. Check [here for a great explanation](https://github.com/zmoazeni/csscss/pull/20) of this option.

### showParserErrors

Type: `Boolean`
Default: `false`

Outputs parser errors.

### require

Type: `string`

Path to a ruby file that is loaded before running CSSCSS.

*[Compass](http://compass-style.org/) must be installed in order to use this option.*

### verbose

Type: `Boolean`
Default: `false`

Displays the CSS properties that have been matched.

## Examples

### Configuration Example

Basic example of a Grunt config containing the CSSCSS task.
```js
grunt.initConfig({
  csscss: {
    dist: {
      src: ['css/style.css']
    }
  }
});

grunt.loadNpmTasks('grunt-csscss');

grunt.registerTask('default', ['csscss']);
```

### Multiple Files

Running CSSCSS against multiple CSS files. All the files specified in the `src` array will be analyzed by CSSCSS.
```js
csscss: {
  dist: {
    src: ['css/style.css', 'css/another.css']
  }
}
```

### Specifying Options

Example of using the [options](https://github.com/peterkeating/grunt-csscss#options).

```js
csscss: {
  options: {
    colorize: false,
    verbose: true,
    outputJson: false,
    minMatch: 2,
    compass: true,
    ignoreProperties: 'padding',
    ignoreSelectors: '.rule-a'
  },
  dist: {
    src: ['css/style.css', 'css/another.css']
  }
}
```

### Analyzing Compass Stylesheet

Example of using CSSCSS to analyze Sass files that are converted using Compass.

```js
csscss: {
  options: {
    require: 'my/config/file.rb'
  },
  dist: {
    src: ['sass/style.scss']
  }
}
```

## Release History

### 0.5.0 (Unreleased)

* Fixed typos in the documentation ([#5](https://github.com/peterkeating/grunt-csscss/issues/5))
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

## Credits

All credit goes to [Zach Moazeni](https://github.com/zmoazeni) for his brilliant work on [CSSCSS](https://github.com/zmoazeni/csscss), great job Zach!
