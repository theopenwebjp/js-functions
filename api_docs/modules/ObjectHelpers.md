[@theopenweb/js-functions](../README.md) / [Exports](../modules.md) / ObjectHelpers

# Namespace: ObjectHelpers

## Table of contents

### Interfaces

- [GetterSetter](../interfaces/ObjectHelpers.GetterSetter.md)
- [KeyValue](../interfaces/ObjectHelpers.KeyValue.md)
- [ObjectInfo](../interfaces/ObjectHelpers.ObjectInfo.md)
- [WatchObject](../interfaces/ObjectHelpers.WatchObject.md)

### Type Aliases

- [Dictionary](ObjectHelpers.md#dictionary)
- [WatchOptions](ObjectHelpers.md#watchoptions)

### Functions

- [applyObj](ObjectHelpers.md#applyobj)
- [copyObject](ObjectHelpers.md#copyobject)
- [copyObjectData](ObjectHelpers.md#copyobjectdata)
- [expandCommonObjectIntoObject](ObjectHelpers.md#expandcommonobjectintoobject)
- [filterObjectVariables](ObjectHelpers.md#filterobjectvariables)
- [getAddedVariableNames](ObjectHelpers.md#getaddedvariablenames)
- [getKeyChanges](ObjectHelpers.md#getkeychanges)
- [getObjectKeyValueAtIndex](ObjectHelpers.md#getobjectkeyvalueatindex)
- [getObjectKeys](ObjectHelpers.md#getobjectkeys)
- [getRemovedVariableNames](ObjectHelpers.md#getremovedvariablenames)
- [globalize](ObjectHelpers.md#globalize)
- [isCommonObject](ObjectHelpers.md#iscommonobject)
- [isNonDomObject](ObjectHelpers.md#isnondomobject)
- [isObject](ObjectHelpers.md#isobject)
- [keyValueObjToArrays](ObjectHelpers.md#keyvalueobjtoarrays)
- [logObjectOnSingleLine](ObjectHelpers.md#logobjectonsingleline)
- [objectInfo](ObjectHelpers.md#objectinfo)
- [objectToObjectInfoArray](ObjectHelpers.md#objecttoobjectinfoarray)
- [objectToReadableString](ObjectHelpers.md#objecttoreadablestring)
- [renameObjectKey](ObjectHelpers.md#renameobjectkey)
- [watchObjectProperty](ObjectHelpers.md#watchobjectproperty)

## Type Aliases

### Dictionary

Ƭ **Dictionary**: `Record`\<`string`, `any`\>

#### Defined in

[src/types/ts/index.ts:1](https://github.com/theopenwebjp/js-functions/blob/64247ce/src/types/ts/index.ts#L1)

___

### WatchOptions

Ƭ **WatchOptions**: [`GetterSetter`](../interfaces/ObjectHelpers.GetterSetter.md)

#### Defined in

[src/types/ts/index.ts:17](https://github.com/theopenwebjp/js-functions/blob/64247ce/src/types/ts/index.ts#L17)

## Functions

### applyObj

▸ **applyObj**(`from`, `to`, `condition`): [`Dictionary`](ObjectHelpers.md#dictionary)

Applies shallow object data one way between objects.
Allows for conditional handling.

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | [`Dictionary`](ObjectHelpers.md#dictionary) |
| `to` | [`Dictionary`](ObjectHelpers.md#dictionary) |
| `condition` | (`arg0`: `string`, `arg1`: [`Dictionary`](ObjectHelpers.md#dictionary), `arg2`: [`Dictionary`](ObjectHelpers.md#dictionary)) => `boolean` |

#### Returns

[`Dictionary`](ObjectHelpers.md#dictionary)

to

#### Defined in

src/object-helpers.js:55

___

### copyObject

▸ **copyObject**(`obj`): `any`

Copies data without references.
Not perfect solution, but is most basic.
var copy = Object.assign({}, obj);//seems to keep inner references.
Does not work for circular references.
Does not work for __proto__ inheriting variables(Usually native class objects) and functions.

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object` |

#### Returns

`any`

#### Defined in

src/object-helpers.js:18

___

### copyObjectData

▸ **copyObjectData**(`obj`): [`Dictionary`](ObjectHelpers.md#dictionary)

For extracting shallow data from object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`Dictionary`](ObjectHelpers.md#dictionary) |

#### Returns

[`Dictionary`](ObjectHelpers.md#dictionary)

shallow copy

#### Defined in

src/object-helpers.js:32

___

### expandCommonObjectIntoObject

▸ **expandCommonObjectIntoObject**(`obj`, `parentObj`, `insertIndex?`): `CommonObject`

Expands and inserts data of common object into common object.
Common object: Array or normal object

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `obj` | `CommonObject` | `undefined` |
| `parentObj` | `CommonObject` | `undefined` |
| `insertIndex` | `number` | `0` |

#### Returns

`CommonObject`

#### Defined in

src/object-helpers.js:129

___

### filterObjectVariables

▸ **filterObjectVariables**(`obj`, `keys`): `Object`

Returns object with only desired keys

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`Dictionary`](ObjectHelpers.md#dictionary) |
| `keys` | `string`[] |

#### Returns

`Object`

#### Defined in

src/object-helpers.js:285

___

### getAddedVariableNames

▸ **getAddedVariableNames**(`obj`, `beforeKeys`): `string`[]

Diff(added) of object keys

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object` |
| `beforeKeys` | `string`[] |

#### Returns

`string`[]

added keys

#### Defined in

src/object-helpers.js:259

___

### getKeyChanges

▸ **getKeyChanges**(`oldObj`, `newObj`): [`Dictionary`](ObjectHelpers.md#dictionary)

Diffs 2 objects and gets object of change information

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldObj` | [`Dictionary`](ObjectHelpers.md#dictionary) |
| `newObj` | [`Dictionary`](ObjectHelpers.md#dictionary) |

#### Returns

[`Dictionary`](ObjectHelpers.md#dictionary)

Changes. See source.

#### Defined in

src/object-helpers.js:335

___

### getObjectKeyValueAtIndex

▸ **getObjectKeyValueAtIndex**(`obj`, `index`): `Object`

Gets value at index of keys in object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`Dictionary`](ObjectHelpers.md#dictionary) |
| `index` | `number` |

#### Returns

`Object`

{key: key, value: val}

#### Defined in

src/object-helpers.js:81

___

### getObjectKeys

▸ **getObjectKeys**(`obj`): `string`[]

Same keys as in: for(var key in obj)
As opposed to usual Object.keys.
Does not use hasOwnProperty

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object` |

#### Returns

`string`[]

array of keys

#### Defined in

src/object-helpers.js:105

___

### getRemovedVariableNames

▸ **getRemovedVariableNames**(`obj`, `beforeKeys`): `string`[]

Diff(removed) of object keys

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object` |
| `beforeKeys` | `string`[] |

#### Returns

`string`[]

removed keys

#### Defined in

src/object-helpers.js:272

___

### globalize

▸ **globalize**(`obj`): `void`

Globalizes(sets to window) all shallow data in object

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`Dictionary`](ObjectHelpers.md#dictionary) |

#### Returns

`void`

#### Defined in

src/object-helpers.js:302

___

### isCommonObject

▸ **isCommonObject**(`obj`): `boolean`

Checks if is traversible object(map object or array)

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |

#### Returns

`boolean`

#### Defined in

src/object-helpers.js:210

___

### isNonDomObject

▸ **isNonDomObject**(`obj`): `boolean`

Checks if is map object but not from DOM.

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |

#### Returns

`boolean`

#### Defined in

src/object-helpers.js:196

___

### isObject

▸ **isObject**(`obj`): `boolean`

Checks if is object of map style.

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |

#### Returns

`boolean`

#### Defined in

src/object-helpers.js:178

___

### keyValueObjToArrays

▸ **keyValueObjToArrays**(`obj`): [`string`, `any`][]

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`Dictionary`](ObjectHelpers.md#dictionary) |

#### Returns

[`string`, `any`][]

#### Defined in

src/object-helpers.js:461

___

### logObjectOnSingleLine

▸ **logObjectOnSingleLine**(`obj`): `void`

Log each element in object on single line.
Naming confusing, should change!!

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`Dictionary`](ObjectHelpers.md#dictionary) |

#### Returns

`void`

#### Defined in

src/object-helpers.js:162

___

### objectInfo

▸ **objectInfo**(`depth`, `key`, `value`): [`ObjectInfo`](../interfaces/ObjectHelpers.ObjectInfo.md)

Information about object value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `depth` | `number` | Starting at 1 |
| `key` | `any` |  |
| `value` | `any` |  |

#### Returns

[`ObjectInfo`](../interfaces/ObjectHelpers.ObjectInfo.md)

#### Defined in

src/object-helpers.js:244

___

### objectToObjectInfoArray

▸ **objectToObjectInfoArray**(`obj`, `curDepth?`, `arr?`): [`ObjectInfo`](../interfaces/ObjectHelpers.ObjectInfo.md)[]

Object with possible nesting => array of objects with information.
Gets information on end values ONLY for now. For example, no array or objects, only nested parts of those.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `obj` | [`Dictionary`](ObjectHelpers.md#dictionary) | `undefined` |
| `curDepth` | `number` | `1` |
| `arr` | [`ObjectInfo`](../interfaces/ObjectHelpers.ObjectInfo.md)[] | `[]` |

#### Returns

[`ObjectInfo`](../interfaces/ObjectHelpers.ObjectInfo.md)[]

#### Defined in

src/object-helpers.js:223

___

### objectToReadableString

▸ **objectToReadableString**(`obj`, `onError?`): `string`

Object to readable string.
Should make as readable as possible.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `obj` | `Object` | `undefined` |
| `onError` | `undefined` \| `Function` | `undefined` |

#### Returns

`string`

#### Defined in

src/object-helpers.js:374

___

### renameObjectKey

▸ **renameObjectKey**(`obj`, `oldKey`, `newKey`): `void`

Rename object key

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`Dictionary`](ObjectHelpers.md#dictionary) |
| `oldKey` | `string` |
| `newKey` | `string` |

#### Returns

`void`

#### Defined in

src/object-helpers.js:316

___

### watchObjectProperty

▸ **watchObjectProperty**(`obj`, `key`, `options?`): [`WatchObject`](../interfaces/ObjectHelpers.WatchObject.md)

Starts watching object property.
Returns object for handling watching including stopping watching.

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`Dictionary`](ObjectHelpers.md#dictionary) |
| `key` | `string` |
| `options` | `Partial`\<[`GetterSetter`](../interfaces/ObjectHelpers.GetterSetter.md)\> |

#### Returns

[`WatchObject`](../interfaces/ObjectHelpers.WatchObject.md)

watch object

**`Example`**

```ts
See comments in code.
```

#### Defined in

src/object-helpers.js:400
