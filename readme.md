# JS Functions

## Introduction

Set of general functions that can be used in JavaScript.
May include stand-alone functions.

No dependencies are expected to load this library.
Node.js have been moved to a separate repository due to need for node based dependencies.

Functions may be broken up into classes over time.
Functions may be made into modular(js modules) code over time.
Should not be too complex. If deep dependencies are desired, then create another Utility class dependent on this module.

Base files should have no dependencies.
utility: Dependent on window/DOM browser environment.

THIS LIBRARY IS MEANT AS A SMALL LIBRARY FOR UTILITY FUNCTIONS.
IT SHOULD NOT INCLUDE ANY DEPENDENDENCIES OTHER THAN devDependencies.

## Testing

Some important functions are being tested.
More tests may be added over time.
Tests can be performed in the "tests" folder with "npm run test" after "npm install". Tests may include auto-reporting. To perform only tests use "npm run test-only".
To install dev dependencies only execute "npm install --only=dev".

Tests may be incomplete. Please run to check the status.

## Coverage

`npm run test` will automatically show coverage of tests.
An HTML coverage report will be generated in the "coverage" directory.

## Format

Utility: Non dependent functions.
Other files have dependencies stated in name of file or in code.

## Documentation

- `npm run esdoc` will generate documentation.
- [esdoc config](https://esdoc.org/manual/config.html#full-config)

## Linting

"npm run eslint" will generate linting reports.

## Installation

No installation required.

## Setup

No special setup required. Just add js code into your own project.

## Contributors

Damien Golding

## Supporters

## To Do

- mocha-phantomjs resulting in parse error even though works directly in browser(Probably due to old phantomjs version not supporting es2015).
- Tried following but got "An error occurred trying to launch phantomjs at ..."
- -p ./node_modules/phantomjs/bin/phantomjs
- -p ./node_modules/.bin/phantomjs