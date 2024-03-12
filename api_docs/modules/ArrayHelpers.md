[@theopenweb/js-functions](../README.md) / [Exports](../modules.md) / ArrayHelpers

# Namespace: ArrayHelpers

## Table of contents

### Functions

- [arrayListToObjectList](ArrayHelpers.md#arraylisttoobjectlist)
- [arrayToCamelCase](ArrayHelpers.md#arraytocamelcase)
- [arrayifyAll](ArrayHelpers.md#arrayifyall)
- [buildDelimiterString](ArrayHelpers.md#builddelimiterstring)
- [getRandomItemFromArray](ArrayHelpers.md#getrandomitemfromarray)
- [searchObjectArray](ArrayHelpers.md#searchobjectarray)
- [singleDimensionArrayToObject](ArrayHelpers.md#singledimensionarraytoobject)
- [uniqueArray](ArrayHelpers.md#uniquearray)

## Functions

### arrayListToObjectList

▸ **arrayListToObjectList**(`arr`, `keys`): {}[]

Converts 2d array to array of objects.
Useful for settings using objects: [[1,2,3,4], ...], ['a','b','c','d'] => [{a: 1, b: 2, c: 3, d: 4}, ...]

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `any`[][] |
| `keys` | (`string` \| `number`)[] |

#### Returns

{}[]

#### Defined in

src/array-helpers.js:64

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

src/array-helpers.js:83

___

### arrayifyAll

▸ **arrayifyAll**(`arr`): `any`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `any`[] |

#### Returns

`any`[]

#### Defined in

src/array-helpers.js:149

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

src/array-helpers.js:106

___

### getRandomItemFromArray

▸ **getRandomItemFromArray**(`items`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `any`[] |

#### Returns

`any`

#### Defined in

src/array-helpers.js:140

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

src/array-helpers.js:11

___

### singleDimensionArrayToObject

▸ **singleDimensionArrayToObject**(`arr`, `defaultVal?`): `any`

Converts 1d array to object.
Array values are used as keys, values are set with defaultVal.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `arr` | `string`[] | `undefined` | If any numbers exist, cast beforehand. |
| `defaultVal` | `string` | `''` |  |

#### Returns

`any`

#### Defined in

src/array-helpers.js:39

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

src/array-helpers.js:131
