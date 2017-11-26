# JS Functions

## Introduction

Set of general functions that can be used in JavaScript.
May incldude stand-alone functions.

Functions may be broken up into classes over time.
Functions may be made into modular(js modules) code over time.
Should not be too complex. If deep dependencies are desired, then create another Utility class dependent on this module.

Base files should have no dependencies.
utility: Dependent on window/DOM browser environment.
node-functions: Dependent on Node environment.

## Testing
Some important functions are being tested.
More tests may be added over time.
Tests can be performed in the "tests" folder with "npm run test" after "npm install". Tests may include auto-reporting. To perform only tests use "npm run test-only".
To install dev dependencies only execute "npm install --only=dev".

Tests may be incomplete. Please run to check the status.

## Coverage
"npm run test" will automatically show coverage of tests.
An HTML coverage report will be generated in the "coverage" directory.

## Format

Utility: Non dependent functions.
Other files have dependencies stated in name of file or in code.

## Installation

No installation required.

## Setup

No special setup required. Just add js code into your own project.

## Contributors

Damien Golding

## Supporters