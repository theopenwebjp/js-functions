/*
DO NOT IMPORT FROM THIS FILE UNLESS NEED TO REFERENCE ALL EXPORTS.

This project use ESM exports for tree-shaking.
This makes it possible to manage many exports in this repository without causing the end built code to balloon in size.

Use import('@theopenweb/js-functions/src/[FILE_NAME]') instead.
*/

import { polyfillConsole } from './polyfills.js'
polyfillConsole()
console.warn('ONLY USE WHEN ALL EXPORTS ARE DESIRED.')

import * as ArrayHelpers from './array-helpers.js'
import * as CanvasHelpers from './canvas-helpers.js'
import * as DOMHelpers from './dom-helpers.js'
import * as FormHelpers from './form-helpers.js'
import * as MediaStreamHelpers from './media-stream-helpers.js'
import * as MediaStreamTrackHelpers from './media-stream-track-helpers.js'
import * as ObjectHelpers from './object-helpers.js'
import * as Polyfills from './polyfills.js'
import * as Services from './services.js'
import * as Utilities from './utilities.js'

export {
  ArrayHelpers,
  CanvasHelpers,
  DOMHelpers,
  FormHelpers,
  MediaStreamHelpers,
  MediaStreamTrackHelpers,
  ObjectHelpers,
  Polyfills,
  Services,
  Utilities,
}
