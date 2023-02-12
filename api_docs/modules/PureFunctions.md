[@theopenweb/js-functions](../README.md) / [Exports](../modules.md) / PureFunctions

# Namespace: PureFunctions

## Table of contents

### Functions

- [createObjectKeyObserver](PureFunctions.md#createobjectkeyobserver)
- [observeObjectKeys](PureFunctions.md#observeobjectkeys)

## Functions

### createObjectKeyObserver

▸ **createObjectKeyObserver**(`object`, `keys?`): `ProxyConstructor`

Simple function for observing(watching) changes on an object.
This is for easy copy and pasting when needed so contains NO DEPENDENCIES.
Logs changes and the stack.
THE RETURNED PROXY OBJECT IS OBSERVED, SO MUST EDIT THE RETURNED VALUE.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `object` | `Object` | `undefined` |
| `keys` | `string`[] | `[]` |

#### Returns

`ProxyConstructor`

#### Defined in

[src/pure-functions.js:15](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/pure-functions.js#L15)

___

### observeObjectKeys

▸ **observeObjectKeys**(`object`, `key`): () => `void`

Simple function for observing(watching) changes on an object.
This is for easy copy and pasting when needed so contains NO DEPENDENCIES.
Logs changes and the stack.

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Object` |
| `key` | `string` |

#### Returns

`fn`

Stops watching.

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/pure-functions.js:44](https://github.com/theopenwebjp/js-functions/blob/cc8d337/src/pure-functions.js#L44)
