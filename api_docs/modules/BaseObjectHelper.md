[@theopenweb/js-functions](../README.md) / [Exports](../modules.md) / BaseObjectHelper

# Namespace: BaseObjectHelper

## Table of contents

### Interfaces

- [GetterSetter](../interfaces/BaseObjectHelper.GetterSetter.md)
- [KeyValue](../interfaces/BaseObjectHelper.KeyValue.md)
- [ObjectInfo](../interfaces/BaseObjectHelper.ObjectInfo.md)
- [WatchObject](../interfaces/BaseObjectHelper.WatchObject.md)

### Type Aliases

- [CommonObject](BaseObjectHelper.md#commonobject)
- [Dictionary](BaseObjectHelper.md#dictionary)
- [WatchOptions](BaseObjectHelper.md#watchoptions)

### Functions

- [applyObj](BaseObjectHelper.md#applyobj)
- [copyObject](BaseObjectHelper.md#copyobject)
- [copyObjectData](BaseObjectHelper.md#copyobjectdata)
- [expandCommonObjectIntoObject](BaseObjectHelper.md#expandcommonobjectintoobject)
- [filterObjectVariables](BaseObjectHelper.md#filterobjectvariables)
- [getAddedVariableNames](BaseObjectHelper.md#getaddedvariablenames)
- [getKeyChanges](BaseObjectHelper.md#getkeychanges)
- [getObjectKeyValueAtIndex](BaseObjectHelper.md#getobjectkeyvalueatindex)
- [getObjectKeys](BaseObjectHelper.md#getobjectkeys)
- [getRemovedVariableNames](BaseObjectHelper.md#getremovedvariablenames)
- [globalize](BaseObjectHelper.md#globalize)
- [isCommonObject](BaseObjectHelper.md#iscommonobject)
- [isNonDomObject](BaseObjectHelper.md#isnondomobject)
- [isObject](BaseObjectHelper.md#isobject)
- [logObjectOnSingleLine](BaseObjectHelper.md#logobjectonsingleline)
- [objectInfo](BaseObjectHelper.md#objectinfo)
- [objectToObjectInfoArray](BaseObjectHelper.md#objecttoobjectinfoarray)
- [objectToReadableString](BaseObjectHelper.md#objecttoreadablestring)
- [renameObjectKey](BaseObjectHelper.md#renameobjectkey)
- [watchObjectProperty](BaseObjectHelper.md#watchobjectproperty)

## Type Aliases

### CommonObject

Ƭ **CommonObject**<\>: *[] \| [`Dictionary`](BaseObjectHelper.md#dictionary)

#### Defined in

[src/base-object-helper.js:148](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-object-helper.js#L148)

___

### Dictionary

Ƭ **Dictionary**<\>: `Object`<`string`, *\>

#### Defined in

[src/base-object-helper.js:2](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-object-helper.js#L2)

___

### WatchOptions

Ƭ **WatchOptions**<\>: [`GetterSetter`](../interfaces/BaseObjectHelper.GetterSetter.md)

#### Defined in

[src/base-object-helper.js:25](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-object-helper.js#L25)

## Functions

### applyObj

▸ **applyObj**(`from`, `to`, `condition`): `Object`

Applies shallow object data one way between objects.
Allows for conditional handling.

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `Object` |
| `to` | `Object` |
| `condition` | (`arg0`: `string`, `arg1`: `Object`, `arg2`: `Object`) => `boolean` |

#### Returns

`Object`

to

#### Defined in

[src/base-object-helper.js:82](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-object-helper.js#L82)

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

[src/base-object-helper.js:45](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-object-helper.js#L45)

___

### copyObjectData

▸ **copyObjectData**(`obj`): `Object`

For extracting shallow data from object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object` |

#### Returns

`Object`

shallow copy

#### Defined in

[src/base-object-helper.js:59](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-object-helper.js#L59)

___

### expandCommonObjectIntoObject

▸ **expandCommonObjectIntoObject**(`obj`, `parentObj`, `insertIndex?`): [`CommonObject`](BaseObjectHelper.md#commonobject)

Expands and inserts data of common object into common object.
Common object: Array or normal object

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `obj` | [`CommonObject`](BaseObjectHelper.md#commonobject) | `undefined` |
| `parentObj` | [`CommonObject`](BaseObjectHelper.md#commonobject) | `undefined` |
| `insertIndex` | `number` | `0` |

#### Returns

[`CommonObject`](BaseObjectHelper.md#commonobject)

#### Defined in

[src/base-object-helper.js:160](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-object-helper.js#L160)

___

### filterObjectVariables

▸ **filterObjectVariables**(`obj`, `keys`): `Object`

Returns object with only desired keys

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object` |
| `keys` | `string`[] |

#### Returns

`Object`

#### Defined in

[src/base-object-helper.js:316](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-object-helper.js#L316)

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

[src/base-object-helper.js:290](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-object-helper.js#L290)

___

### getKeyChanges

▸ **getKeyChanges**(`oldObj`, `newObj`): `Object`

Diffs 2 objects and gets object of change information

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldObj` | `Object` |
| `newObj` | `Object` |

#### Returns

`Object`

Changes. See source.

#### Defined in

[src/base-object-helper.js:366](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-object-helper.js#L366)

___

### getObjectKeyValueAtIndex

▸ **getObjectKeyValueAtIndex**(`obj`, `index`): `Object`

Gets value at index of keys in object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object` |
| `index` | `number` |

#### Returns

`Object`

{key: key, value: val}

#### Defined in

[src/base-object-helper.js:108](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-object-helper.js#L108)

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

[src/base-object-helper.js:132](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-object-helper.js#L132)

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

[src/base-object-helper.js:303](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-object-helper.js#L303)

___

### globalize

▸ **globalize**(`obj`): `void`

Globalizes(sets to window) all shallow data in object

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object` |

#### Returns

`void`

#### Defined in

[src/base-object-helper.js:333](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-object-helper.js#L333)

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

[src/base-object-helper.js:241](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-object-helper.js#L241)

___

### isNonDomObject

▸ **isNonDomObject**(`obj`): `boolean`

Checks if is map object but not from DOM.

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object` |

#### Returns

`boolean`

#### Defined in

[src/base-object-helper.js:227](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-object-helper.js#L227)

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

[src/base-object-helper.js:209](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-object-helper.js#L209)

___

### logObjectOnSingleLine

▸ **logObjectOnSingleLine**(`obj`): `void`

Log each element in object on single line.
Naming confusing, should change!!

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object` |

#### Returns

`void`

#### Defined in

[src/base-object-helper.js:193](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-object-helper.js#L193)

___

### objectInfo

▸ **objectInfo**(`depth`, `key`, `value`): [`ObjectInfo`](../interfaces/BaseObjectHelper.ObjectInfo.md)

Information about object value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `depth` | `number` | Starting at 1 |
| `key` | `any` |  |
| `value` | `any` |  |

#### Returns

[`ObjectInfo`](../interfaces/BaseObjectHelper.ObjectInfo.md)

#### Defined in

[src/base-object-helper.js:275](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-object-helper.js#L275)

___

### objectToObjectInfoArray

▸ **objectToObjectInfoArray**(`obj`, `curDepth?`, `arr?`): [`ObjectInfo`](../interfaces/BaseObjectHelper.ObjectInfo.md)[]

Object with possible nesting => array of objects with information.
Gets information on end values ONLY for now. For example, no array or objects, only nested parts of those.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `obj` | `Object` | `undefined` |
| `curDepth` | `number` | `1` |
| `arr` | [`ObjectInfo`](../interfaces/BaseObjectHelper.ObjectInfo.md)[] | `[]` |

#### Returns

[`ObjectInfo`](../interfaces/BaseObjectHelper.ObjectInfo.md)[]

#### Defined in

[src/base-object-helper.js:254](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-object-helper.js#L254)

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

[src/base-object-helper.js:414](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-object-helper.js#L414)

___

### renameObjectKey

▸ **renameObjectKey**(`obj`, `oldKey`, `newKey`): `void`

Rename object key

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object` |
| `oldKey` | `string` |
| `newKey` | `string` |

#### Returns

`void`

#### Defined in

[src/base-object-helper.js:347](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-object-helper.js#L347)

___

### watchObjectProperty

▸ **watchObjectProperty**(`obj`, `key`, `options?`): [`WatchObject`](../interfaces/BaseObjectHelper.WatchObject.md)

Starts watching object property.
Returns object for handling watching including stopping watching.

**`Example`**

```ts
See comments in code.
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object` |
| `key` | `string` |
| `options` | `Partial`<[`GetterSetter`](../interfaces/BaseObjectHelper.GetterSetter.md)\> |

#### Returns

[`WatchObject`](../interfaces/BaseObjectHelper.WatchObject.md)

watch object

#### Defined in

[src/base-object-helper.js:440](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/base-object-helper.js#L440)
