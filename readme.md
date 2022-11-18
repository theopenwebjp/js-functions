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

## Installation

```bash
npm install @theopenweb/js-functions
```

## Testing

Some important functions are being tested.
More tests may be added over time.
Tests can be performed in the "tests" folder with `npm run test` after `npm install`. Tests may include auto-reporting.

Tests may be incomplete. Please run to check the status.

- Test treeshaking: `npm run test-treeshaking`.
  - Can test treeshaking code is working before build via: `npx http-server ./` and going to [http://localhost:8080/test/tests/tree-shaking](http://localhost:8080/test/tests/tree-shaking).
  - Can specify typeof treeshaking test with: `npm run test-treeshaking [TYPE]`, where [TYPE] is any from [here](test\tests\tree-shaking\README.md#keys).
- Playground: `npx http-server ./` and go to [http://localhost:8080/playground](http://localhost:8080/playground)

## Coverage

`npm run test` will automatically show coverage of tests.
An HTML coverage report will be generated in the "coverage" directory.

## Format

Utility: Non dependent functions.
Other files have dependencies stated in name of file or in code.

## Documentation

To run all documentation scripts, execute: `npm run docs`.

- `npm run esdoc` will generate documentation.
- [esdoc config](https://esdoc.org/manual/config.html#full-config)

## Linting

`npm run eslint` will generate linting reports.

## Contributors

Damien Golding
