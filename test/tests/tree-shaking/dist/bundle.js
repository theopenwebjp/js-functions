/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../src/base-array-helper.js":
/*!*****************************************!*\
  !*** ../../../src/base-array-helper.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"arrayListToObjectList\": () => (/* binding */ arrayListToObjectList),\n/* harmony export */   \"arrayToCamelCase\": () => (/* binding */ arrayToCamelCase),\n/* harmony export */   \"buildDelimiterString\": () => (/* binding */ buildDelimiterString),\n/* harmony export */   \"searchObjectArray\": () => (/* binding */ searchObjectArray),\n/* harmony export */   \"singleDimensionArrayToObject\": () => (/* binding */ singleDimensionArrayToObject),\n/* harmony export */   \"uniqueArray\": () => (/* binding */ uniqueArray)\n/* harmony export */ });\n// TODO: https://stackoverflow.com/questions/59083632/how-to-fix-definition-for-rule-typescript-eslint-no-use-before-declare-was-n\r\n\r\n  /**\r\n   * Searches object array for value.\r\n   *\r\n   * @param {object[]} arr\r\n   * @param {String} key\r\n   * @param {*} val\r\n   * @return {object[]} array of objects with match\r\n   */\r\nfunction searchObjectArray(arr, key, val) {\r\n  /**\r\n   * @type {Object<string, *>[]}\r\n   */\r\n  const found = []\r\n  /**\r\n   * @type {Object<string, *>}\r\n   */\r\n  let obj\r\n  for (let i = 0; i < arr.length; i++) {\r\n    obj = arr[i]\r\n\r\n    if (obj[key] === val) {\r\n      found.push(obj)\r\n    }\r\n  }\r\n\r\n  return found\r\n}\r\n\r\n/**\r\n   * Converts 1d array to object.\r\n   * Array values are used as keys, values are set with defaultVal.\r\n   *\r\n   * @param {string[]} arr\r\n   * @param {String} defaultVal\r\n   * @return {Object<string|number, *>}\r\n   */\r\nfunction singleDimensionArrayToObject(arr, defaultVal = '') {\r\n  /**\r\n   * @type {Object<string|number, *>}\r\n   */\r\n  const obj = {}\r\n  /**\r\n   * @type {string|number}\r\n   */\r\n  let key\r\n  for (let i = 0; i < arr.length; i++) {\r\n    key = arr[i]\r\n    obj[key] = defaultVal\r\n  }\r\n\r\n  return obj\r\n}\r\n\r\n/**\r\n   * Converts 2d array to array of objects.\r\n   * Useful for settings using objects: [[1,2,3,4], ...], ['a','b','c','d'] => [{a: 1, b: 2, c: 3, d: 4}, ...]\r\n   *\r\n   * @param {string[]} arr\r\n   * @param {Array<string|number>} keys\r\n   * @return {Object<string, *>[]}\r\n   */\r\nfunction arrayListToObjectList(arr, keys) {\r\n  return arr.map(function (val) {\r\n    /**\r\n     * @type {Object<string, *>}\r\n     */\r\n    const obj = {}\r\n    for (let i = 0; i < val.length; i++) {\r\n      obj[keys[i]] = val[i]\r\n    }\r\n    return obj\r\n  })\r\n}\r\n\r\n/**\r\n   * Converts array of words to camel case string\r\n   *\r\n   * @param {string[]} arr\r\n   * @return {String}\r\n   */\r\nfunction arrayToCamelCase(arr) {\r\n  let str = ''\r\n\r\n  for (let i = 0; i < arr.length; i++) {\r\n    let tempStr = arr[i]\r\n\r\n    if (i > 0) {\r\n      tempStr = tempStr.substr(0, 1).toUpperCase() + tempStr.substr(1)\r\n    }\r\n\r\n    str += tempStr\r\n  }\r\n\r\n  return str\r\n}\r\n\r\n/**\r\n   * Builds string from array + format\r\n   *\r\n   * @param {string[]} arr\r\n   * @param {String} format\r\n   * @return {String}\r\n   */\r\nfunction buildDelimiterString(arr, format) {\r\n  let cHandle = null\r\n\r\n  if (format === 'camelCase') {\r\n    cHandle = arrayToCamelCase\r\n  } else {\r\n    /**\r\n     * @param {string[]} arr\r\n     * @return {string}\r\n     */\r\n    cHandle = function (arr) {\r\n      const del = format\r\n      return arr.join(del)\r\n    }\r\n  }\r\n\r\n  return cHandle(arr)\r\n}\r\n\r\n/**\r\n   * Creates unique array\r\n   *\r\n   * @param {*[]} arr\r\n   * @return {*[]}\r\n   */\r\nfunction uniqueArray(arr) {\r\n  return arr.filter((value, index, array) => {\r\n    return array.indexOf(value) === index\r\n  })\r\n}\r\n\n\n//# sourceURL=webpack:///../../../src/base-array-helper.js?");

/***/ }),

/***/ "./file.js":
/*!*****************!*\
  !*** ./file.js ***!
  \*****************/
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

eval("/* harmony import */ var _src_base_array_helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../src/base-array-helper.js */ \"../../../src/base-array-helper.js\");\n\r\n\r\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\r\n  return _src_base_array_helper_js__WEBPACK_IMPORTED_MODULE_0__\r\n}\r\n\n\n//# sourceURL=webpack:///./file.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./file.js");
/******/ 	
/******/ })()
;