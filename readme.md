# JS Functions

## Introduction

- Set of general functions that can be used in JavaScript(browser).
- Code uses ESM.
- This library SHOULD NOT include any dependencies OTHER THAN devDependencies.
- Code is made to be efficiently tree-shaken.

## Installation

```bash
npm install @theopenweb/js-functions
```

## Usage

```js
// Example of import and execution.
import { capitalize } from '@theopenweb/js-functions'
console.log(capitalize('smith'))
// For the full API, check "Documentation".
```

## Documentation

- [Documentation](/api_docs/modules.md)
- Generated documentation is accessible from: [/api_docs/modules.md](/api_docs/modules.md)
- To run all documentation scripts, execute: `npm run docs`.

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

## Linting

`npm run eslint` will generate linting reports.

## Contributors

- Damien Golding
