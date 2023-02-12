[@theopenweb/js-functions](../README.md) / [Exports](../modules.md) / BaseArrayHelper

# Namespace: BaseArrayHelper

## Table of contents

### Functions

- [arrayListToObjectList](BaseArrayHelper.md#arraylisttoobjectlist)
- [arrayToCamelCase](BaseArrayHelper.md#arraytocamelcase)
- [buildDelimiterString](BaseArrayHelper.md#builddelimiterstring)
- [searchObjectArray](BaseArrayHelper.md#searchobjectarray)
- [singleDimensionArrayToObject](BaseArrayHelper.md#singledimensionarraytoobject)
- [uniqueArray](BaseArrayHelper.md#uniquearray)

## Functions

### arrayListToObjectList

▸ **arrayListToObjectList**(`arr`, `keys`): `Object`[]

Converts 2d array to array of objects.
Useful for settings using objects: [[1,2,3,4], ...], ['a','b','c','d'] => [{a: 1, b: 2, c: 3, d: 4}, ...]

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `string`[] |
| `keys` | (`string` \| `number`)[] |

#### Returns

`Object`[]

#### Defined in

[src/base-array-helper.js:64](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-array-helper.js#L64)

___

### arrayToCamelCase

▸ **arrayToCamelCase**(`arr`): `string`

Converts array of words to camel case string

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `string`[] |

#### Returns

`string`

#### Defined in

[src/base-array-helper.js:83](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-array-helper.js#L83)

___

### buildDelimiterString

▸ **buildDelimiterString**(`arr`, `format`): `string`

Builds string from array + format

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `string`[] |
| `format` | `string` |

#### Returns

`string`

#### Defined in

[src/base-array-helper.js:106](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-array-helper.js#L106)

___

### searchObjectArray

▸ **searchObjectArray**(`arr`, `key`, `val`): `object`[]

Searches object array for value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `object`[] |
| `key` | `string` |
| `val` | `any` |

#### Returns

`object`[]

array of objects with match

#### Defined in

[src/base-array-helper.js:11](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-array-helper.js#L11)

___

### singleDimensionArrayToObject

▸ **singleDimensionArrayToObject**(`arr`, `defaultVal?`): `any`

Converts 1d array to object.
Array values are used as keys, values are set with defaultVal.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `arr` | `string`[] | `undefined` |
| `defaultVal` | `string` | `''` |

#### Returns

`any`

#### Defined in

[src/base-array-helper.js:39](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-array-helper.js#L39)

___

### uniqueArray

▸ **uniqueArray**(`arr`): `any`[]

Creates unique array

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `any`[] |

#### Returns

`any`[]

#### Defined in

[src/base-array-helper.js:131](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-array-helper.js#L131)
