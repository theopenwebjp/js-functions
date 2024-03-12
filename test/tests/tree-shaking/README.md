# Description

Tree shaking tests to check the size of built js files.

## Keys

- file
- non-dependent
- dependent

## Tree shaking test spec

1. [file.js](./file.js): Each file: import * as Utilities from './utilities' ...
2. [non-dependent.js](./non-dependent.js): Non-dependent function: import func from './utilities'
3. [dependent.js](./dependent.js): Dependent function: import funcWithDependencies from './utilities'
