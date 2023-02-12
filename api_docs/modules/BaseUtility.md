[@theopenweb/js-functions](../README.md) / [Exports](../modules.md) / BaseUtility

# Namespace: BaseUtility

## Table of contents

### Interfaces

- [AsyncHandlerItem](../interfaces/BaseUtility.AsyncHandlerItem.md)
- [CustomElementBase](../interfaces/BaseUtility.CustomElementBase.md)
- [CustomElementOptions](../interfaces/BaseUtility.CustomElementOptions.md)
- [Dimensions](../interfaces/BaseUtility.Dimensions.md)
- [EventOptions](../interfaces/BaseUtility.EventOptions.md)
- [LimitRange](../interfaces/BaseUtility.LimitRange.md)
- [LogOptions](../interfaces/BaseUtility.LogOptions.md)
- [MultipleUrlLoadingOptions](../interfaces/BaseUtility.MultipleUrlLoadingOptions.md)
- [ProbabilityBoolean](../interfaces/BaseUtility.ProbabilityBoolean.md)
- [StringPosition](../interfaces/BaseUtility.StringPosition.md)

### Type Aliases

- [ArrayRange](BaseUtility.md#arrayrange)
- [ConsoleLogType](BaseUtility.md#consolelogtype)
- [CustomElement](BaseUtility.md#customelement)
- [Dictionary](BaseUtility.md#dictionary)
- [FILE\_READER\_METHOD\_NAMES](BaseUtility.md#file_reader_method_names)

### Functions

- [applyStaticFunctions](BaseUtility.md#applystaticfunctions)
- [arrayEquals](BaseUtility.md#arrayequals)
- [asyncCheck](BaseUtility.md#asynccheck)
- [asyncHandler](BaseUtility.md#asynchandler)
- [bindClassThis](BaseUtility.md#bindclassthis)
- [buildFunctionModule](BaseUtility.md#buildfunctionmodule)
- [buildMediaQuery](BaseUtility.md#buildmediaquery)
- [camelCaseToArray](BaseUtility.md#camelcasetoarray)
- [capitalize](BaseUtility.md#capitalize)
- [capitalizeFirstLetter](BaseUtility.md#capitalizefirstletter)
- [combineObjects](BaseUtility.md#combineobjects)
- [compare](BaseUtility.md#compare)
- [convertTabbedDataToArray](BaseUtility.md#converttabbeddatatoarray)
- [createDataURI](BaseUtility.md#createdatauri)
- [delimitedArrayToReadableStringMap](BaseUtility.md#delimitedarraytoreadablestringmap)
- [delimiterStringToArray](BaseUtility.md#delimiterstringtoarray)
- [download](BaseUtility.md#download)
- [downloadBlob](BaseUtility.md#downloadblob)
- [downloadBlobURL](BaseUtility.md#downloadbloburl)
- [downloadCurrentPage](BaseUtility.md#downloadcurrentpage)
- [downloadData](BaseUtility.md#downloaddata)
- [downloadDataUrl](BaseUtility.md#downloaddataurl)
- [downloadLink](BaseUtility.md#downloadlink)
- [equals](BaseUtility.md#equals)
- [exists](BaseUtility.md#exists)
- [failOnFalsy](BaseUtility.md#failonfalsy)
- [fixPageAnchorTagSecurity](BaseUtility.md#fixpageanchortagsecurity)
- [generateRandomString](BaseUtility.md#generaterandomstring)
- [getCurrentDate](BaseUtility.md#getcurrentdate)
- [getCurrentLocation](BaseUtility.md#getcurrentlocation)
- [getDataUrlExtension](BaseUtility.md#getdataurlextension)
- [getFileExtension](BaseUtility.md#getfileextension)
- [getFileName](BaseUtility.md#getfilename)
- [getFormattedString](BaseUtility.md#getformattedstring)
- [getIndexOf](BaseUtility.md#getindexof)
- [getLoadScriptHandle](BaseUtility.md#getloadscripthandle)
- [getLoadStyleSheetHandle](BaseUtility.md#getloadstylesheethandle)
- [getLoadTemplateHandle](BaseUtility.md#getloadtemplatehandle)
- [getMax](BaseUtility.md#getmax)
- [getMin](BaseUtility.md#getmin)
- [getNumberSimilarity](BaseUtility.md#getnumbersimilarity)
- [getPromisesByState](BaseUtility.md#getpromisesbystate)
- [getStackInfo](BaseUtility.md#getstackinfo)
- [getStaticFunctionNames](BaseUtility.md#getstaticfunctionnames)
- [getStaticFunctions](BaseUtility.md#getstaticfunctions)
- [getStringInclusionWeight](BaseUtility.md#getstringinclusionweight)
- [getStringSimilarity](BaseUtility.md#getstringsimilarity)
- [getWrappedStrings](BaseUtility.md#getwrappedstrings)
- [handleCallback](BaseUtility.md#handlecallback)
- [handleEvent](BaseUtility.md#handleevent)
- [handlePrompt](BaseUtility.md#handleprompt)
- [isCapitalLetter](BaseUtility.md#iscapitalletter)
- [isLogFunction](BaseUtility.md#islogfunction)
- [isMinimzed](BaseUtility.md#isminimzed)
- [isNativeFunction](BaseUtility.md#isnativefunction)
- [loadAbstractUrls](BaseUtility.md#loadabstracturls)
- [loadDependencyUrls](BaseUtility.md#loaddependencyurls)
- [loadFile](BaseUtility.md#loadfile)
- [loadFileInput](BaseUtility.md#loadfileinput)
- [loadFiles](BaseUtility.md#loadfiles)
- [loadScriptData](BaseUtility.md#loadscriptdata)
- [loadScripts](BaseUtility.md#loadscripts)
- [loadStyleSheets](BaseUtility.md#loadstylesheets)
- [log](BaseUtility.md#log)
- [loopClass](BaseUtility.md#loopclass)
- [loopClassFunctions](BaseUtility.md#loopclassfunctions)
- [loopClassProperties](BaseUtility.md#loopclassproperties)
- [loopStaticClassMethods](BaseUtility.md#loopstaticclassmethods)
- [mergeEventsObject](BaseUtility.md#mergeeventsobject)
- [parseFuzzyJson](BaseUtility.md#parsefuzzyjson)
- [parseJson](BaseUtility.md#parsejson)
- [preventSubmit](BaseUtility.md#preventsubmit)
- [promiseAll](BaseUtility.md#promiseall)
- [promisify](BaseUtility.md#promisify)
- [promptPrint](BaseUtility.md#promptprint)
- [reduceObjectArray](BaseUtility.md#reduceobjectarray)
- [removeNonCharacters](BaseUtility.md#removenoncharacters)
- [removeSubstringRanges](BaseUtility.md#removesubstringranges)
- [replaceAll](BaseUtility.md#replaceall)
- [replaceAt](BaseUtility.md#replaceat)
- [replaceAt2](BaseUtility.md#replaceat2)
- [replaceStringIndexes](BaseUtility.md#replacestringindexes)
- [scanString](BaseUtility.md#scanstring)
- [setSpaceDelimitedElementAttribute](BaseUtility.md#setspacedelimitedelementattribute)
- [setupCustomElement](BaseUtility.md#setupcustomelement)
- [sleep](BaseUtility.md#sleep)
- [stringIncludesAttribute](BaseUtility.md#stringincludesattribute)
- [stringifyJson](BaseUtility.md#stringifyjson)
- [timeout](BaseUtility.md#timeout)
- [toObject](BaseUtility.md#toobject)
- [toTemplate](BaseUtility.md#totemplate)
- [urlToBlob](BaseUtility.md#urltoblob)
- [waitFor](BaseUtility.md#waitfor)
- [watchForHashValue](BaseUtility.md#watchforhashvalue)

## Type Aliases

### ArrayRange

Ƭ **ArrayRange**<\>: [`number`, `number`]

[startIndex, endIndex]

#### Defined in

[src/base-utility.js:33](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L33)

___

### ConsoleLogType

Ƭ **ConsoleLogType**<\>: ``"trace"`` \| ``"debug"`` \| ``"log"`` \| ``"info"`` \| ``"warn"`` \| ``"error"``

#### Defined in

[src/base-utility.js:77](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L77)

___

### CustomElement

Ƭ **CustomElement**<\>: `HTMLElement` & [`CustomElementBase`](../interfaces/BaseUtility.CustomElementBase.md)

#### Defined in

[src/base-utility.js:48](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L48)

___

### Dictionary

Ƭ **Dictionary**<\>: `Object`<`string`, *\>

#### Defined in

[src/base-utility.js:2](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L2)

___

### FILE\_READER\_METHOD\_NAMES

Ƭ **FILE\_READER\_METHOD\_NAMES**<\>: ``"readAsArrayBuffer"`` \| ``"readAsBinaryString"`` \| ``"readAsDataURL"`` \| ``"readAsText"``

#### Defined in

[src/base-utility.js:37](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L37)

## Functions

### applyStaticFunctions

▸ **applyStaticFunctions**(`classInstance`, `constructor`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `classInstance` | `Object` |
| `constructor` | `Function` |

#### Returns

`void`

#### Defined in

[src/base-utility.js:1609](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1609)

___

### arrayEquals

▸ **arrayEquals**(`a`, `b`): `boolean`

Checks if 2 arrays equal eachother in value(NOT REFERENCE).
DOES NOT WORK ON NESTED ARRAYS. USE Utility.objectDataEquals for that.

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `any`[] |
| `b` | `any`[] |

#### Returns

`boolean`

#### Defined in

[src/base-utility.js:312](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L312)

___

### asyncCheck

▸ **asyncCheck**(`callback`): `void`

For checking async functionality.
Try to add randomization for better testing.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `Function` |

#### Returns

`void`

#### Defined in

[src/base-utility.js:187](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L187)

___

### asyncHandler

▸ **asyncHandler**(`arr`, `onEnd`): `boolean`

Handles multiple async functions.
TODO: Needs checking!!(handle, status.current positioning looks iffy.)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | [`AsyncHandlerItem`](../interfaces/BaseUtility.AsyncHandlerItem.md)[] | Array of items. See code. |
| `onEnd` | `Function` |  |

#### Returns

`boolean`

#### Defined in

[src/base-utility.js:234](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L234)

___

### bindClassThis

▸ **bindClassThis**(`classInstance`): `void`

Binds class instance to all functions.
Used so no need to worry about using this in classes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `classInstance` | `Object` |

#### Returns

`void`

#### Defined in

[src/base-utility.js:1598](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1598)

___

### buildFunctionModule

▸ **buildFunctionModule**(`funcs`): `string`

Takes functions(probably dependent on eachother)
and outputs string that can be copy + pasted.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `funcs` | `Function`[] | array of functions |

#### Returns

`string`

#### Defined in

[src/base-utility.js:1399](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1399)

___

### buildMediaQuery

▸ **buildMediaQuery**(`dimensions`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dimensions` | [`Dimensions`](../interfaces/BaseUtility.Dimensions.md) |

#### Returns

`string`

#### Defined in

[src/base-utility.js:344](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L344)

___

### camelCaseToArray

▸ **camelCaseToArray**(`str`): `string`[]

Extracts words from camel case string.
Converts to lower case.
Should be accurately reversible format:
1. No capital letter acronyms.
2. One character words possible.

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`[]

array of separated strings

#### Defined in

[src/base-utility.js:1138](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1138)

___

### capitalize

▸ **capitalize**(`str`): `string`

Capitalize word

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[src/base-utility.js:1183](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1183)

___

### capitalizeFirstLetter

▸ **capitalizeFirstLetter**(`item`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `string` |

#### Returns

`string`

#### Defined in

[src/base-utility.js:2379](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L2379)

___

### combineObjects

▸ **combineObjects**(`args`): `Object`

Combines array of objects into one.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | `object`[] | Array, but may be arguments list(why here?). Multiple objects. |

#### Returns

`Object`

#### Defined in

[src/base-utility.js:2422](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L2422)

___

### compare

▸ **compare**(`a`, `b`, `comparator?`): `boolean`

Compares a to b using comparator.
Used mainly for numbers, but usable on any variable, and is of use for strings too.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `a` | `any` | `undefined` |  |
| `b` | `any` | `undefined` |  |
| `comparator` | `string` | `'='` | <= < = > >= |

#### Returns

`boolean`

#### Defined in

[src/base-utility.js:1990](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1990)

___

### convertTabbedDataToArray

▸ **convertTabbedDataToArray**(`data`, `colCount`): `string`[][] \| `never`[][]

Can be inaccurate in last row cell if includes line feeds.
Requires col count as line feeds allowed in cells.
Last cell needs to be split by lf.
Uses tabbed data: From spreadsheet, HTML table, etc.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |
| `colCount` | `number` |

#### Returns

`string`[][] \| `never`[][]

#### Defined in

[src/base-utility.js:901](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L901)

___

### createDataURI

▸ **createDataURI**(`data`, `mimeType?`, `options?`): `string`

Creates a data URI

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `data` | `string` | `undefined` |  |
| `mimeType` | `string` | `'text/plain'` |  |
| `options` | `Object` | `{}` | optional data outputted in format key=value; |

#### Returns

`string`

#### Defined in

[src/base-utility.js:1965](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1965)

___

### delimitedArrayToReadableStringMap

▸ **delimitedArrayToReadableStringMap**(`array`, `delimiter?`): `Object`

Takes array of strings(with specified delimiter) and makes all readable.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `array` | `string`[] | `undefined` |
| `delimiter?` | `string` | `'-'` |

#### Returns

`Object`

#### Defined in

[src/base-utility.js:2398](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L2398)

___

### delimiterStringToArray

▸ **delimiterStringToArray**(`str`, `format`): `string`[]

Gets array of delimited string items

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` |  |
| `format` | `string` | camelCase, any delimiter. |

#### Returns

`string`[]

array of delimited strings

#### Defined in

[src/base-utility.js:1232](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1232)

___

### download

▸ **download**(`data`, `name`, `mimeType`): `boolean`

Download data

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `name` | `string` |
| `mimeType` | `string` |

#### Returns

`boolean`

#### Defined in

[src/base-utility.js:443](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L443)

___

### downloadBlob

▸ **downloadBlob**(`blob`, `name`): `boolean`

Causes execution of blob.
May be blocked by browser(especially when multiple downloads occur.)

#### Parameters

| Name | Type |
| :------ | :------ |
| `blob` | `Blob` |
| `name` | `string` |

#### Returns

`boolean`

#### Defined in

[src/base-utility.js:509](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L509)

___

### downloadBlobURL

▸ **downloadBlobURL**(`blobURL`, `name?`): `void`

**`Example`**

```ts
downloadBlobURL(document.querySelector('video').getAttribute('src'))
```

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `blobURL` | `string` | `undefined` |
| `name` | `string` | `'data'` |

#### Returns

`void`

#### Defined in

[src/base-utility.js:541](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L541)

___

### downloadCurrentPage

▸ **downloadCurrentPage**(): `boolean`

Downloads the current HTML page

#### Returns

`boolean`

#### Defined in

[src/base-utility.js:453](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L453)

___

### downloadData

▸ **downloadData**(`data`, `name`): `boolean`

Downloads data

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `name` | `string` |

#### Returns

`boolean`

#### Defined in

[src/base-utility.js:753](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L753)

___

### downloadDataUrl

▸ **downloadDataUrl**(`dataUrl`, `name`): `void`

Downloads file from dataURL

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataUrl` | `string` |
| `name` | `string` |

#### Returns

`void`

#### Defined in

[src/base-utility.js:492](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L492)

___

### downloadLink

▸ **downloadLink**(`url`, `fullName`): `void`

Downloads link
CAUTION. Not working for cross domain urls.
CAUTION. Max 10 downloads at once(occurred in Chrome).

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `fullName` | `string` |

#### Returns

`void`

#### Defined in

[src/base-utility.js:564](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L564)

___

### equals

▸ **equals**(`a`, `b`): `boolean`

Checks if number equals each other including NaN

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `any` |
| `b` | `any` |

#### Returns

`boolean`

#### Defined in

[src/base-utility.js:290](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L290)

___

### exists

▸ **exists**(`data`): `boolean`

Checks if no data exists
Differs from falsy, as only checks for non-value data.
For example "" is a valid string, 0 is a valid number, false is a valid boolean.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`boolean`

#### Defined in

[src/base-utility.js:335](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L335)

___

### failOnFalsy

▸ **failOnFalsy**(`value`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`any`

#### Defined in

[src/base-utility.js:2285](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L2285)

___

### fixPageAnchorTagSecurity

▸ **fixPageAnchorTagSecurity**(): `void`

Fixes a tag security issues:
rel="noopener noreferrer"

**`See`**

https://developers.google.com/web/tools/lighthouse/audits/noopener

#### Returns

`void`

#### Defined in

[src/base-utility.js:2237](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L2237)

___

### generateRandomString

▸ **generateRandomString**(`length?`): `string`

Generate random string

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `length` | `number` | `0` |

#### Returns

`string`

#### Defined in

[src/base-utility.js:2221](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L2221)

___

### getCurrentDate

▸ **getCurrentDate**(): `Date`

Gets current date. Not needed. Should remove.

**`Deprecated`**

#### Returns

`Date`

#### Defined in

[src/base-utility.js:782](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L782)

___

### getCurrentLocation

▸ **getCurrentLocation**(`callback`): `void`

Gets current location.
No need for separate function so should remove.

**`Deprecated`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `Function` |

#### Returns

`void`

#### Defined in

[src/base-utility.js:833](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L833)

___

### getDataUrlExtension

▸ **getDataUrlExtension**(`dataUrl`): `string`

Gets dataURL extension

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataUrl` | `string` |

#### Returns

`string`

#### Defined in

[src/base-utility.js:432](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L432)

___

### getFileExtension

▸ **getFileExtension**(`url`): `string`

Gets file extension from url

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`string`

file extension

#### Defined in

[src/base-utility.js:480](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L480)

___

### getFileName

▸ **getFileName**(`url`): `string`

Gets file name from url
Does not distinguish file extensions.

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`string`

file name

#### Defined in

[src/base-utility.js:466](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L466)

___

### getFormattedString

▸ **getFormattedString**(`str`, `delimiter`, `lenArr`): `string`

Inserts delimiter at selected points in lenArr
Used for things like binary data splitting etc.

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `delimiter` | `string` |
| `lenArr` | `number`[] |

#### Returns

`string`

#### Defined in

[src/base-utility.js:796](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L796)

___

### getIndexOf

▸ **getIndexOf**(`data`, `find`): `string` \| `number`

Gets index of value from variable that could be following: String, Number, Array, Object
Allows using object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `any` |  |
| `find` | `any` | value searching for. |

#### Returns

`string` \| `number`

index

#### Defined in

[src/base-utility.js:1203](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1203)

___

### getLoadScriptHandle

▸ **getLoadScriptHandle**(`src`, `parent`): `Promise`<`Event`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `string` |
| `parent` | `HTMLElement` |

#### Returns

`Promise`<`Event`\>

#### Defined in

[src/base-utility.js:974](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L974)

___

### getLoadStyleSheetHandle

▸ **getLoadStyleSheetHandle**(`src`, `parent`): `Promise`<`Event`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `string` |
| `parent` | `HTMLElement` |

#### Returns

`Promise`<`Event`\>

#### Defined in

[src/base-utility.js:992](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L992)

___

### getLoadTemplateHandle

▸ **getLoadTemplateHandle**(`src`, `parent`): `Promise`<`Event`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `string` |
| `parent` | `HTMLElement` |

#### Returns

`Promise`<`Event`\>

#### Defined in

[src/base-utility.js:1014](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1014)

___

### getMax

▸ **getMax**(`...args`): ``null`` \| `number`

Gets max number from unlimited number of parameters

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | `number`[] | Array of numbers |

#### Returns

``null`` \| `number`

#### Defined in

[src/base-utility.js:1328](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1328)

___

### getMin

▸ **getMin**(`...args`): ``null`` \| `number`

Gets min number from unlimited number of parameters

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | `number`[] | Array of numbers |

#### Returns

``null`` \| `number`

#### Defined in

[src/base-utility.js:1345](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1345)

___

### getNumberSimilarity

▸ **getNumberSimilarity**(`num1`, `num2`): `number`

Gets number similarity relative to scale of numbers (0~1)

#### Parameters

| Name | Type |
| :------ | :------ |
| `num1` | `number` |
| `num2` | `number` |

#### Returns

`number`

#### Defined in

[src/base-utility.js:1309](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1309)

___

### getPromisesByState

▸ **getPromisesByState**(`promises`, `resolved?`): `Promise`<`Promise`<`boolean`\>[]\>

Gets array of promises by status from array.
Main use is for early exit of Promise.all where need to get what completed.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `promises` | `Promise`<`any`\>[] | `undefined` |  |
| `resolved` | `boolean` | `false` | (resolved = true. rejected = false) |

#### Returns

`Promise`<`Promise`<`boolean`\>[]\>

resolves array of promises

#### Defined in

[src/base-utility.js:1881](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1881)

___

### getStackInfo

▸ **getStackInfo**(): `Object`

Gets stack info
Gets standard info from error object + more.

#### Returns

`Object`

info

#### Defined in

[src/base-utility.js:1441](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1441)

___

### getStaticFunctionNames

▸ **getStaticFunctionNames**(`constructor`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `constructor` | `any` |

#### Returns

`string`[]

#### Defined in

[src/base-utility.js:1620](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1620)

___

### getStaticFunctions

▸ **getStaticFunctions**(`constructor`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `constructor` | `any` |

#### Returns

`Object`

#### Defined in

[src/base-utility.js:1628](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1628)

___

### getStringInclusionWeight

▸ **getStringInclusionWeight**(`str1`, `str2`): `number`

Tests how closely str1 is included in str2.
Checking every permutation would be most accurate but would be severely risky on larger strings.

#### Parameters

| Name | Type |
| :------ | :------ |
| `str1` | `string` |
| `str2` | `string` |

#### Returns

`number`

(0~1)

#### Defined in

[src/base-utility.js:1286](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1286)

___

### getStringSimilarity

▸ **getStringSimilarity**(`str1`, `str2`): `number`

Gets string similarity(0~1)

#### Parameters

| Name | Type |
| :------ | :------ |
| `str1` | `string` |
| `str2` | `string` |

#### Returns

`number`

#### Defined in

[src/base-utility.js:1257](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1257)

___

### getWrappedStrings

▸ **getWrappedStrings**(`str`, `wrapperOpen`, `wrapperClose`, `keepWrapper?`, `useClosingTagEnd?`): `string`[]

Gets wrapped strings from string.
Examples: XML TAGS <>, double quotes "", mustache {{}}...

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `str` | `string` | `undefined` |  |
| `wrapperOpen` | `string` | `undefined` |  |
| `wrapperClose` | `string` | `undefined` |  |
| `keepWrapper` | `boolean` | `false` | Include wrapper in output |
| `useClosingTagEnd` | `boolean` | `false` | Allows for things like {{{a}}} > {a} instead of {a |

#### Returns

`string`[]

Array of detected wrapped strings

#### Defined in

[src/base-utility.js:130](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L130)

___

### handleCallback

▸ **handleCallback**(`callback`, `args`): `any`

Handles callback for functions that may have a callback.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`arg0`: `any`[]) => `any` |
| `args` | `any`[] |

#### Returns

`any`

#### Defined in

[src/base-utility.js:739](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L739)

___

### handleEvent

▸ **handleEvent**(`events`, `name`, `data?`, `options?`): `any`

Clever event handling mechanism
Detects single mode or array mode by type of events[name]
Returns single or array based on single mode type

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `events` | `Object` | `undefined` |  |
| `name` | `string` | `undefined` |  |
| `data` | `any` | `undefined` | data passed to event |
| `options` | `Partial`<[`EventOptions`](../interfaces/BaseUtility.EventOptions.md)\> | `{}` |  |

#### Returns

`any`

Return data(single or array)

#### Defined in

[src/base-utility.js:1713](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1713)

___

### handlePrompt

▸ **handlePrompt**(`handle`, `text`, `defaultText`): `any`

Prompt handle.
Probably was supposed to be async but was moved elsewhere.
Should remove.

**`Deprecated`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | `Function` |
| `text` | `string` |
| `defaultText` | `string` |

#### Returns

`any`

#### Defined in

[src/base-utility.js:772](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L772)

___

### isCapitalLetter

▸ **isCapitalLetter**(`char`): `boolean`

Checks if character is capital letter.
Will be true for non-ascii-letters.

#### Parameters

| Name | Type |
| :------ | :------ |
| `char` | `string` |

#### Returns

`boolean`

#### Defined in

[src/base-utility.js:1169](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1169)

___

### isLogFunction

▸ **isLogFunction**(`func`): `boolean`

Usage: For distinguishing between log/non-log functions such as disallowing/allowing logging.

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | `Function` |

#### Returns

`boolean`

#### Defined in

[src/base-utility.js:1418](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1418)

___

### isMinimzed

▸ **isMinimzed**(`str`): [`ProbabilityBoolean`](../interfaces/BaseUtility.ProbabilityBoolean.md)

Checks if string is minimized.
Can estimate if code is minimized.
Has margin of error so returns object with information and estimated boolean.
Space ratio: <2% <5% <10% Most likely minimized. >10% Most likely not minimized.

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

[`ProbabilityBoolean`](../interfaces/BaseUtility.ProbabilityBoolean.md)

#### Defined in

[src/base-utility.js:2020](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L2020)

___

### isNativeFunction

▸ **isNativeFunction**(`func`): `boolean`

Checks if is native function.
Native functions can not be accessed in certain ways.
For example, the contents can not be viewed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | `Function` |

#### Returns

`boolean`

#### Defined in

[src/base-utility.js:1385](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1385)

___

### loadAbstractUrls

▸ **loadAbstractUrls**(`arr`, `handle`, `options?`): `Promise`<`any`[]\>

Loads array of url data with custom handle for handling urls
Removed:

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `string`[] | array of link href urls. |
| `handle` | (`arg0`: `string`, `arg1`: `HTMLElement`) => `any` |  |
| `options` | `Partial`<[`MultipleUrlLoadingOptions`](../interfaces/BaseUtility.MultipleUrlLoadingOptions.md)\> |  |

#### Returns

`Promise`<`any`[]\>

#### Defined in

[src/base-utility.js:1039](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1039)

___

### loadDependencyUrls

▸ **loadDependencyUrls**(`arr`, `options?`): `Promise`<`any`[]\>

Loads array of url data with css or js

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `string`[] | array of link href urls. |
| `options` | `Object` | See loadAbstractUrls |

#### Returns

`Promise`<`any`[]\>

#### Defined in

[src/base-utility.js:1057](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1057)

___

### loadFile

▸ **loadFile**(`url`, `callback`, `onError?`): `XMLHttpRequest`

GETs file data

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `url` | `string` | `undefined` |
| `callback` | (`arg0`: `any`) => `void` | `undefined` |
| `onError` | `undefined` \| (`arg0`: `any`) => `void` | `undefined` |

#### Returns

`XMLHttpRequest`

#### Defined in

[src/base-utility.js:717](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L717)

___

### loadFileInput

▸ **loadFileInput**(`event`, `callback`, `options`): `FileReader`

Loads file data from input event.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Event` \| `DragEvent` |
| `callback` | `Function` |
| `options` | `Object` |
| `options.method` | [`FILE_READER_METHOD_NAMES`](BaseUtility.md#file_reader_method_names) |

#### Returns

`FileReader`

#### Defined in

[src/base-utility.js:847](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L847)

___

### loadFiles

▸ **loadFiles**(`urls`, `onData`): `Promise`<`any`[]\>

GETs multiple file data

#### Parameters

| Name | Type |
| :------ | :------ |
| `urls` | `string`[] |
| `onData` | `Function` |

#### Returns

`Promise`<`any`[]\>

#### Defined in

[src/base-utility.js:688](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L688)

___

### loadScriptData

▸ **loadScriptData**(`data`, `onLoad`): `HTMLElement`

Loads script tag with data(js, etc.)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |
| `onLoad` | `Function` |

#### Returns

`HTMLElement`

script tag

#### Defined in

[src/base-utility.js:1114](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1114)

___

### loadScripts

▸ **loadScripts**(`arr`, `optionsAbstract?`): `Promise`<`any`[]\>

Loads scripts(Injects script tag into DOM)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `string`[] | array of script src urls. |
| `optionsAbstract` | `Object` |  |

#### Returns

`Promise`<`any`[]\>

#### Defined in

[src/base-utility.js:1099](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1099)

___

### loadStyleSheets

▸ **loadStyleSheets**(`arr`, `optionsAbstract?`): `Promise`<`any`[]\>

Loads style sheet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `string`[] | array of link href urls. |
| `optionsAbstract` | `Object` |  |

#### Returns

`Promise`<`any`[]\>

#### Defined in

[src/base-utility.js:1085](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1085)

___

### log

▸ **log**(`data`, `options?`): `undefined` \| ``false``

Logging function that won't cause error if does not exist, and includes some options.

**`See`**

https://developers.google.com/web/tools/chrome-devtools/console/console-write#styling_console_output_with_css

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `data` | `any` | `undefined` |  |
| `options` | `undefined` \| [`LogOptions`](../interfaces/BaseUtility.LogOptions.md) | `undefined` | See link |

#### Returns

`undefined` \| ``false``

#### Defined in

[src/base-utility.js:390](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L390)

___

### loopClass

▸ **loopClass**(`classInstance`, `onVariable`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `classInstance` | `object` |
| `onVariable` | (`arg0`: `string`) => `void` |

#### Returns

`void`

#### Defined in

[src/base-utility.js:1559](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1559)

___

### loopClassFunctions

▸ **loopClassFunctions**(`classInstance`, `onFunction`): `void`

Loops class instance functions.
Ignores constructor.

#### Parameters

| Name | Type |
| :------ | :------ |
| `classInstance` | `Object` |
| `onFunction` | (`arg0`: (`arg0`: `any`[]) => `any`, `arg1`: `string`, `arg2`: `Object`) => `void` |

#### Returns

`void`

#### Defined in

[src/base-utility.js:1529](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1529)

___

### loopClassProperties

▸ **loopClassProperties**(`classInstance`, `onProperty`): `void`

Loops class instance properties.

#### Parameters

| Name | Type |
| :------ | :------ |
| `classInstance` | `Object` |
| `onProperty` | `Function` |

#### Returns

`void`

#### Defined in

[src/base-utility.js:1543](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1543)

___

### loopStaticClassMethods

▸ **loopStaticClassMethods**(): `void`

Loop static class methods.
TODO:

#### Returns

`void`

#### Defined in

[src/base-utility.js:1588](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1588)

___

### mergeEventsObject

▸ **mergeEventsObject**(`events1`, `events2`): `Object`

Merges events based on handleEvent format.

#### Parameters

| Name | Type |
| :------ | :------ |
| `events1` | `Object` |
| `events2` | `Object` |

#### Returns

`Object`

merged events object

#### Defined in

[src/base-utility.js:1742](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1742)

___

### parseFuzzyJson

▸ **parseFuzzyJson**(`str`): `Object`

Parses JSON data that may be in JS format.
Example: {a: 1} instead of {"a": 1}.
Because this uses eval, should never use user entered data!

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`Object`

#### Defined in

[src/base-utility.js:623](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L623)

___

### parseJson

▸ **parseJson**(`str`): ``null`` \| `Object`

With no errors + checks for support.
Returns null on bad.

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

``null`` \| `Object`

#### Defined in

[src/base-utility.js:649](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L649)

___

### preventSubmit

▸ **preventSubmit**(`form`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `form` | `HTMLFormElement` |

#### Returns

`void`

#### Defined in

[src/base-utility.js:2263](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L2263)

___

### promiseAll

▸ **promiseAll**(`arr`, `ordered?`): `Promise`<`any`[]\>

Simple abstraction of Promise.all that takes handles instead and allows sequential execution.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `arr` | () => `Promise`<`any`\>[] | `undefined` | array of functions that should return promises. |
| `ordered` | `boolean` | `false` | Whether to execute handles sequentially or in any order(fastest). |

#### Returns

`Promise`<`any`[]\>

#### Defined in

[src/base-utility.js:1922](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1922)

___

### promisify

▸ **promisify**(`handle`, `args`, `resolveIndex`): `Promise`<`any`\>

Turns a function handling a callback into a promise.
TODO: Needs a check.

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | `Function` |
| `args` | `any`[] |
| `resolveIndex` | `number` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/base-utility.js:204](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L204)

___

### promptPrint

▸ **promptPrint**(): `void`

Asks for print. Not really needed. Should remove later.

**`Deprecated`**

#### Returns

`void`

#### Defined in

[src/base-utility.js:379](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L379)

___

### reduceObjectArray

▸ **reduceObjectArray**(`objArr`): `Object`

Automatically performs number operation on each key in object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `objArr` | `Object`[] | Array of objects containing numbers. |

#### Returns

`Object`

#### Defined in

[src/base-utility.js:1640](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1640)

___

### removeNonCharacters

▸ **removeNonCharacters**(`str`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[src/base-utility.js:1360](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1360)

___

### removeSubstringRanges

▸ **removeSubstringRanges**(`text`, `ranges?`): `string`

Removes ranges of text using string.substring format.
Assumes ranges sorted from startIndex end to start.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `text` | `string` | `undefined` |
| `ranges` | [`ArrayRange`](BaseUtility.md#arrayrange)[] | `[]` |

#### Returns

`string`

#### Defined in

[src/base-utility.js:2321](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L2321)

___

### replaceAll

▸ **replaceAll**(`str`, `find`, `replace`): `string`

Replaces all occurrences of string.
No native function available of time of writing.
Usually done via global regex.

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `find` | `string` |
| `replace` | `string` |

#### Returns

`string`

replace complete string

#### Defined in

[src/base-utility.js:965](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L965)

___

### replaceAt

▸ **replaceAt**(`string`, `replacer`, `startIndex`, `endIndex`): `string`

Replaces string between start and end index range(including start and end).
Usually faster than replacing with string.replace.

#### Parameters

| Name | Type |
| :------ | :------ |
| `string` | `string` |
| `replacer` | `string` |
| `startIndex` | `number` |
| `endIndex` | `number` |

#### Returns

`string`

#### Defined in

[src/base-utility.js:2212](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L2212)

___

### replaceAt2

▸ **replaceAt2**(`string`, `fromIndex`, `length`, `replacement`): `string`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` |  |
| `fromIndex` | `number` |  |
| `length` | `number` |  |
| `replacement` | `string` | TODO: Duplicate implementation. Check both and handle. |

#### Returns

`string`

#### Defined in

[src/base-utility.js:2274](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L2274)

___

### replaceStringIndexes

▸ **replaceStringIndexes**(`string`, `indexes?`, `sortRequired?`): `string`

Replaces a string with values between specified start and end indexes.
This function aims to replace multiple parts of a same string string quickly.
Ranges of indexes should NOT overlap.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `string` | `string` | `undefined` |  |
| `indexes` | [`string`, `number`, `number`][] | `[]` | [['a', 1, 3], ['b', 5, 8], ...] |
| `sortRequired` | `boolean` | `true` | If false, expects "start" index from low to high. |

#### Returns

`string`

replaced string

#### Defined in

[src/base-utility.js:2166](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L2166)

___

### scanString

▸ **scanString**(`string`, `checker`): [`StringPosition`](../interfaces/BaseUtility.StringPosition.md)[]

Scans string with function and returns results

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` |  |
| `checker` | `Function` | (char)=>{} |

#### Returns

[`StringPosition`](../interfaces/BaseUtility.StringPosition.md)[]

Results array

#### Defined in

[src/base-utility.js:2133](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L2133)

___

### setSpaceDelimitedElementAttribute

▸ **setSpaceDelimitedElementAttribute**(`element`, `attribute`, `values?`): `void`

Sets element attribute like so while allowing existing: rel="val1 val2 valn ..."

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `element` | `HTMLElement` | `undefined` |
| `attribute` | `string` | `undefined` |
| `values` | `string`[] | `[]` |

#### Returns

`void`

#### Defined in

[src/base-utility.js:2250](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L2250)

___

### setupCustomElement

▸ **setupCustomElement**(`customElement`, `options?`): `void`

Common format for setting up custom element.
Should only include important functionality such as rendering templates.

#### Parameters

| Name | Type |
| :------ | :------ |
| `customElement` | [`CustomElement`](BaseUtility.md#customelement) |
| `options` | [`CustomElementOptions`](../interfaces/BaseUtility.CustomElementOptions.md) |

#### Returns

`void`

#### Defined in

[src/base-utility.js:2341](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L2341)

___

### sleep

▸ **sleep**(`ms`): `Promise`<`void`\>

Sleeps for number of ms.
Does not make cpu sleep, just waits and allows other scripts to run.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ms` | `number` | milliseconds |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/base-utility.js:1696](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1696)

___

### stringIncludesAttribute

▸ **stringIncludesAttribute**(`text`, `name`, `value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |
| `name` | `string` |
| `value` | `string` |

#### Returns

`boolean`

#### Defined in

[src/base-utility.js:2309](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L2309)

___

### stringifyJson

▸ **stringifyJson**(`jsonObj`): ``null`` \| `string`

Attempts to stringify json object

#### Parameters

| Name | Type |
| :------ | :------ |
| `jsonObj` | `string` |

#### Returns

``null`` \| `string`

#### Defined in

[src/base-utility.js:668](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L668)

___

### timeout

▸ **timeout**(`promise`, `ms`): `Promise`<`any`\>

Sets timeout.
For promises.
Reports as soon as timeout ends.
Caution: Difficult to cancel out of promise, so only should be used for reporting and where can let promise finish.
timeout(promise, 1000).catch(console.error);

**`See`**

 - https://stackoverflow.com/questions/21485545/is-there-a-way-to-tell-if-an-es6-promise-is-fulfilled-rejected-resolved?noredirect=1&lq=1
 - https://stackoverflow.com/questions/35716275/how-to-tell-if-a-promise-is-resolved

#### Parameters

| Name | Type |
| :------ | :------ |
| `promise` | `Promise`<`any`\> |
| `ms` | `number` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/base-utility.js:1856](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1856)

___

### toObject

▸ **toObject**(`data`, `onError?`): `Object`

Safely attempts to JSON parse data.
Always returns an object.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `data` | `any` | `undefined` | JSON parseable data |
| `onError` | `undefined` \| `Function` | `undefined` | optional error handler |

#### Returns

`Object`

#### Defined in

[src/base-utility.js:597](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L597)

___

### toTemplate

▸ **toTemplate**(`html?`): `HTMLTemplateElement`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `html` | `string` | `''` |

#### Returns

`HTMLTemplateElement`

#### Defined in

[src/base-utility.js:2296](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L2296)

___

### urlToBlob

▸ **urlToBlob**(`url`): `Promise`<`any`\>

Converts URL to blob.
Should work on any kind of media.

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/base-utility.js:1792](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1792)

___

### waitFor

▸ **waitFor**(`condition`, `pollInterval?`): `Promise`<`void`\>

条件を間隔的に確認して、Trueになれば、resolveする。

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `condition` | `Function` | `undefined` | Booleanを返すFunction |
| `pollInterval` | `number` | `50` | ms |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/base-utility.js:1667](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L1667)

___

### watchForHashValue

▸ **watchForHashValue**(`value`, `func`): `void`

Checks for URL hash change including existing hash in URL at time of execution.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |
| `func` | `Function` |

#### Returns

`void`

#### Defined in

[src/base-utility.js:2099](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-utility.js#L2099)
