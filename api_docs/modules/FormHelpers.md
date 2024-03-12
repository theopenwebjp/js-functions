[@theopenweb/js-functions](../README.md) / [Exports](../modules.md) / FormHelpers

# Namespace: FormHelpers

## Table of contents

### Functions

- [appendChildren](FormHelpers.md#appendchildren)
- [attributesToSelector](FormHelpers.md#attributestoselector)
- [checkRequiredInput](FormHelpers.md#checkrequiredinput)
- [checkRequiredInputs](FormHelpers.md#checkrequiredinputs)
- [clickRadioInputs](FormHelpers.md#clickradioinputs)
- [createTag](FormHelpers.md#createtag)
- [elementToInputObject](FormHelpers.md#elementtoinputobject)
- [elementsToInputObjects](FormHelpers.md#elementstoinputobjects)
- [enterFormInputs](FormHelpers.md#enterforminputs)
- [enterTextInputs](FormHelpers.md#entertextinputs)
- [formSettings](FormHelpers.md#formsettings)
- [getCheckedElements](FormHelpers.md#getcheckedelements)
- [getLabel](FormHelpers.md#getlabel)
- [getLabelElement](FormHelpers.md#getlabelelement)
- [getRequiredInputs](FormHelpers.md#getrequiredinputs)
- [getTableHeaderValue](FormHelpers.md#gettableheadervalue)
- [handleSubmit](FormHelpers.md#handlesubmit)
- [inputObject](FormHelpers.md#inputobject)
- [inputTypesToSelectors](FormHelpers.md#inputtypestoselectors)
- [setAttributes](FormHelpers.md#setattributes)
- [setInputAsRequired](FormHelpers.md#setinputasrequired)

## Functions

### appendChildren

▸ **appendChildren**(`el`, `children`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |
| `children` | `HTMLElement`[] |

#### Returns

`void`

#### Defined in

src/form-helpers.js:128

___

### attributesToSelector

▸ **attributesToSelector**(`attributes`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `attributes` | [`Dictionary`](ObjectHelpers.md#dictionary) |

#### Returns

`string`

#### Defined in

src/form-helpers.js:155

___

### checkRequiredInput

▸ **checkRequiredInput**(`el`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |

#### Returns

`boolean`

#### Defined in

src/form-helpers.js:168

___

### checkRequiredInputs

▸ **checkRequiredInputs**(`form`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `form` | `HTMLFormElement` |

#### Returns

`boolean`

#### Defined in

src/form-helpers.js:327

___

### clickRadioInputs

▸ **clickRadioInputs**(`wrapper`): `void`

Clicks many radio inputs for when want to automatically test large radio input lists.
Even works in frameworks such as React = MUI.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `wrapper` | `HTMLElement` | Usually a form. |

#### Returns

`void`

**`Example`**

```ts
clickRadioInputs(document.querySelector('form'))
```

#### Defined in

src/form-helpers.js:57

___

### createTag

▸ **createTag**(`tagName`, `attributes`, `children?`): `HTMLElement`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `tagName` | `string` | `undefined` |
| `attributes` | [`Dictionary`](ObjectHelpers.md#dictionary) | `undefined` |
| `children` | `DomElementSettings`[] | `[]` |

#### Returns

`HTMLElement`

#### Defined in

src/form-helpers.js:116

___

### elementToInputObject

▸ **elementToInputObject**(`element`): `InputObject`

Should keep only necessary information for editing

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `HTMLElement` |

#### Returns

`InputObject`

#### Defined in

src/form-helpers.js:268

___

### elementsToInputObjects

▸ **elementsToInputObjects**(`elements`): `InputObject`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `HTMLElement`[] |

#### Returns

`InputObject`[]

#### Defined in

src/form-helpers.js:293

___

### enterFormInputs

▸ **enterFormInputs**(`wrapper`): `void`

Randomly inputs form inputs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `wrapper` | `HTMLElement` | Usually a form. |

#### Returns

`void`

**`Example`**

```ts
enterTextInputs(document.querySelector('form'))
```

#### Defined in

src/form-helpers.js:104

___

### enterTextInputs

▸ **enterTextInputs**(`wrapper`): `void`

Randomly inputs text elements

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `wrapper` | `HTMLElement` | Usually a form. |

#### Returns

`void`

**`Example`**

```ts
enterTextInputs(document.querySelector('form'))
```

#### Defined in

src/form-helpers.js:86

___

### formSettings

▸ **formSettings**(): `FormSettings`

#### Returns

`FormSettings`

#### Defined in

src/form-helpers.js:254

___

### getCheckedElements

▸ **getCheckedElements**(`el`): `Element`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |

#### Returns

`Element`[]

#### Defined in

src/form-helpers.js:196

___

### getLabel

▸ **getLabel**(`element`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `HTMLElement` |

#### Returns

`string`

#### Defined in

src/form-helpers.js:39

___

### getLabelElement

▸ **getLabelElement**(`element`): `undefined` \| `HTMLElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `HTMLElement` |

#### Returns

`undefined` \| `HTMLElement`

#### Defined in

src/form-helpers.js:12

___

### getRequiredInputs

▸ **getRequiredInputs**(`form`): `HTMLElement`[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `form` | `HTMLFormElement` | TODO |

#### Returns

`HTMLElement`[]

#### Defined in

src/form-helpers.js:214

___

### getTableHeaderValue

▸ **getTableHeaderValue**(`el`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |

#### Returns

`string`

#### Defined in

src/form-helpers.js:144

___

### handleSubmit

▸ **handleSubmit**(`ev`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ev` | `Event` |

#### Returns

`boolean`

#### Defined in

src/form-helpers.js:222

___

### inputObject

▸ **inputObject**(): `InputObject`

#### Returns

`InputObject`

#### Defined in

src/form-helpers.js:237

___

### inputTypesToSelectors

▸ **inputTypesToSelectors**(`inputTypes`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputTypes` | `Object` |

#### Returns

`string`[]

#### Defined in

src/form-helpers.js:305

___

### setAttributes

▸ **setAttributes**(`el`, `attributes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |
| `attributes` | [`Dictionary`](ObjectHelpers.md#dictionary) |

#### Returns

`void`

#### Defined in

src/form-helpers.js:136

___

### setInputAsRequired

▸ **setInputAsRequired**(`el`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |

#### Returns

`void`

#### Defined in

src/form-helpers.js:206
