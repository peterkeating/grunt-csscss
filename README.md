# grunt-csscss

[![Build Status](https://secure.travis-ci.org/peterkeating/grunt-csscss.png?branch=master)](http://travis-ci.org/peterkeating/grunt-csscss)

Grunt task that runs [CSSCSS](http://zmoazeni.github.io/csscss/), a CSS redundancy analyzer.

## CSSCSS

CSSCSS runs on Ruby (`v1.9.x` and up), to check Ruby is installed on your machine use `ruby -v`. To install the CSSCSS gem run `gem install csscss` command, this will grab the latest version.

Currently this Grunt task handles all the features for CSSCSS that are available with version **1.0.0**.

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

### colorize

Type: `Boolean`
Default: `true`

Flag indicating whether the outputted analysis should be colorized.

### compass

Type: `Boolean`
Default: `false`

Enables Compass extensions when parsing Sass.

### ignoreProperties

Type: `String`

Comma seperated list of CSS properties that should be ignored when finding matches.

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

### verbose

Type: `Boolean`
Default: `false`

Displays the CSS properties that have been matched.
