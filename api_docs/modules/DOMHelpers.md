[@theopenweb/js-functions](../README.md) / [Exports](../modules.md) / DOMHelpers

# Namespace: DOMHelpers

## Table of contents

### Functions

- [ChildrenSettings](DOMHelpers.md#childrensettings)
- [DOMSearchSettings](DOMHelpers.md#domsearchsettings)
- [DomElementSettings](DOMHelpers.md#domelementsettings)
- [FormOptions](DOMHelpers.md#formoptions)
- [MenuListSettings](DOMHelpers.md#menulistsettings)
- [NameValue](DOMHelpers.md#namevalue)
- [\_applyObjectReplacement](DOMHelpers.md#_applyobjectreplacement)
- [\_handleChildReplacements](DOMHelpers.md#_handlechildreplacements)
- [\_handleChildrenReplacements](DOMHelpers.md#_handlechildrenreplacements)
- [\_setChildren](DOMHelpers.md#_setchildren)
- [\_setEvents](DOMHelpers.md#_setevents)
- [appendChildren](DOMHelpers.md#appendchildren)
- [applyMarginsToDimensions](DOMHelpers.md#applymarginstodimensions)
- [arrayInputter](DOMHelpers.md#arrayinputter)
- [attemptUpdateNestedTextContent](DOMHelpers.md#attemptupdatenestedtextcontent)
- [centerFixElement](DOMHelpers.md#centerfixelement)
- [clearForm](DOMHelpers.md#clearform)
- [convertArrToTableElement](DOMHelpers.md#convertarrtotableelement)
- [convertTableElementToArray](DOMHelpers.md#converttableelementtoarray)
- [convertTableHtmlToArray](DOMHelpers.md#converttablehtmltoarray)
- [convertTableRowElementsToArray](DOMHelpers.md#converttablerowelementstoarray)
- [createBreadcrumbList](DOMHelpers.md#createbreadcrumblist)
- [createCommonList](DOMHelpers.md#createcommonlist)
- [createElement](DOMHelpers.md#createelement)
- [createElementList](DOMHelpers.md#createelementlist)
- [createElements](DOMHelpers.md#createelements)
- [createHeadedArrayElement](DOMHelpers.md#createheadedarrayelement)
- [createHeadedKeyValueList](DOMHelpers.md#createheadedkeyvaluelist)
- [createHeadedList](DOMHelpers.md#createheadedlist)
- [createHeadedTable](DOMHelpers.md#createheadedtable)
- [createIframeLoader](DOMHelpers.md#createiframeloader)
- [createKeyValueList](DOMHelpers.md#createkeyvaluelist)
- [createList](DOMHelpers.md#createlist)
- [createTable](DOMHelpers.md#createtable)
- [displayElementAtPageDimensions](DOMHelpers.md#displayelementatpagedimensions)
- [displayElementAtScreenDimensions](DOMHelpers.md#displayelementatscreendimensions)
- [e](DOMHelpers.md#e)
- [elementChainer](DOMHelpers.md#elementchainer)
- [formify](DOMHelpers.md#formify)
- [getAllChildren](DOMHelpers.md#getallchildren)
- [getAllElements](DOMHelpers.md#getallelements)
- [getAttributeSelector](DOMHelpers.md#getattributeselector)
- [getAvailableElementEvents](DOMHelpers.md#getavailableelementevents)
- [getClosestParent](DOMHelpers.md#getclosestparent)
- [getDOMImage](DOMHelpers.md#getdomimage)
- [getDOMInputRow](DOMHelpers.md#getdominputrow)
- [getDOMInputsList](DOMHelpers.md#getdominputslist)
- [getDOMList](DOMHelpers.md#getdomlist)
- [getElementAttributes](DOMHelpers.md#getelementattributes)
- [getElementPageDimensions](DOMHelpers.md#getelementpagedimensions)
- [getElementPositionData](DOMHelpers.md#getelementpositiondata)
- [getElementScreenDimensions](DOMHelpers.md#getelementscreendimensions)
- [getElementsBoundingRect](DOMHelpers.md#getelementsboundingrect)
- [getElementsByAttribute](DOMHelpers.md#getelementsbyattribute)
- [getElementsByIds](DOMHelpers.md#getelementsbyids)
- [getElementsBySelectors](DOMHelpers.md#getelementsbyselectors)
- [getElementsMappedToSelectors](DOMHelpers.md#getelementsmappedtoselectors)
- [getElementsWithAttribute](DOMHelpers.md#getelementswithattribute)
- [getHtmlImport](DOMHelpers.md#gethtmlimport)
- [getNestedAttributeListFromElement](DOMHelpers.md#getnestedattributelistfromelement)
- [getNestedTextNodes](DOMHelpers.md#getnestedtextnodes)
- [getParents](DOMHelpers.md#getparents)
- [getUniqueDOMText](DOMHelpers.md#getuniquedomtext)
- [getUsedDOMBoundingRect](DOMHelpers.md#getuseddomboundingrect)
- [groupify](DOMHelpers.md#groupify)
- [htmlifyEvent](DOMHelpers.md#htmlifyevent)
- [htmlifyEvents](DOMHelpers.md#htmlifyevents)
- [nestedInputter](DOMHelpers.md#nestedinputter)
- [removeTabIndexes](DOMHelpers.md#removetabindexes)
- [searchDom](DOMHelpers.md#searchdom)
- [setAttributes](DOMHelpers.md#setattributes)
- [setChildrenSettings](DOMHelpers.md#setchildrensettings)
- [setClickFileHandler](DOMHelpers.md#setclickfilehandler)
- [setEditMode](DOMHelpers.md#seteditmode)
- [setElementAsEditable](DOMHelpers.md#setelementaseditable)
- [setStyleDimensions](DOMHelpers.md#setstyledimensions)
- [setStyleMeasurements](DOMHelpers.md#setstylemeasurements)
- [setStylePosition](DOMHelpers.md#setstyleposition)
- [setTabIndexes](DOMHelpers.md#settabindexes)
- [setupMenuList](DOMHelpers.md#setupmenulist)
- [showAboveElement](DOMHelpers.md#showaboveelement)
- [startWatchingHtmlElementListenerChanges](DOMHelpers.md#startwatchinghtmlelementlistenerchanges)
- [stopWatchingHtmlElementListenerChanges](DOMHelpers.md#stopwatchinghtmlelementlistenerchanges)
- [textNodesUnder](DOMHelpers.md#textnodesunder)
- [watchDocumentSizeChanges](DOMHelpers.md#watchdocumentsizechanges)

## Functions

### ChildrenSettings

▸ **ChildrenSettings**(`options`): `ChildrenSettings`

Settings for lists

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Partial`\<`ChildrenSettings`\> |

#### Returns

`ChildrenSettings`

#### Defined in

src/dom-helpers.js:103

___

### DOMSearchSettings

▸ **DOMSearchSettings**(`options?`): `DOMSearchSettings`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Partial`\<`DOMSearchSettings`\> |

#### Returns

`DOMSearchSettings`

#### Defined in

src/dom-helpers.js:88

___

### DomElementSettings

▸ **DomElementSettings**(`options?`): `DomElementSettings`

Represent customizable parts of an HTML Element.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Partial`\<`DomElementSettings`\> |

#### Returns

`DomElementSettings`

#### Defined in

src/dom-helpers.js:71

___

### FormOptions

▸ **FormOptions**(`options?`): `FormOptions`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Partial`\<`FormOptions`\> |

#### Returns

`FormOptions`

#### Defined in

src/dom-helpers.js:767

___

### MenuListSettings

▸ **MenuListSettings**(`options?`): `MenuListSettings`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Partial`\<`MenuListSettings`\> |

#### Returns

`MenuListSettings`

#### Defined in

src/dom-helpers.js:336

___

### NameValue

▸ **NameValue**(): `object`

#### Returns

`object`

#### Defined in

src/dom-helpers.js:718

___

### \_applyObjectReplacement

▸ **_applyObjectReplacement**(`obj`, `item`, `elementPropKey`, `replacements`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Record`\<`string`, `any`\> |
| `item` | `any` |
| `elementPropKey` | `string` |
| `replacements` | `Record`\<`string`, (`arg0`: `any`, `arg1`: `string`) => `any`\> |

#### Returns

`void`

#### Defined in

src/dom-helpers.js:684

___

### \_handleChildReplacements

▸ **_handleChildReplacements**(`item`, `format`, `replacements`): `DomElementSettings`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `any` |
| `format` | `Partial`\<`DomElementSettings`\> |
| `replacements` | `Object` |

#### Returns

`DomElementSettings`

#### Defined in

src/dom-helpers.js:653

___

### \_handleChildrenReplacements

▸ **_handleChildrenReplacements**(`childrenSettings`): `DomElementSettings`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `childrenSettings` | `ChildrenSettings` |

#### Returns

`DomElementSettings`[]

#### Defined in

src/dom-helpers.js:632

___

### \_setChildren

▸ **_setChildren**(`el`, `settingsArr`): `HTMLElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |
| `settingsArr` | `DomElementSettings`[] |

#### Returns

`HTMLElement`

#### Defined in

src/dom-helpers.js:614

___

### \_setEvents

▸ **_setEvents**(`el`, `events`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |
| `events` | `Object` |

#### Returns

`void`

#### Defined in

src/dom-helpers.js:594

___

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

src/dom-helpers.js:697

___

### applyMarginsToDimensions

▸ **applyMarginsToDimensions**(`margins`, `dimensions`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `margins` | `Partial`\<`Margins`\> |
| `dimensions` | `CustomDOMRect` |

#### Returns

`void`

#### Defined in

src/dom-helpers.js:912

___

### arrayInputter

▸ **arrayInputter**(`objectInfoArray`): `HTMLUListElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `objectInfoArray` | \{ `key`: `string` ; `value`: `any`  }[] |

#### Returns

`HTMLUListElement`

#### Defined in

src/dom-helpers.js:1534

___

### attemptUpdateNestedTextContent

▸ **attemptUpdateNestedTextContent**(`element`, `textContent`): `boolean`

Attempts to update nested textContent.
Usually if element.textContent = '...' is used, any nested elements will be overwritten.
Sometimes this is not desired, and any nested might not be known or may change.
This function attempts to update the textContent by checking for any elements with ONLY the same text, no nested elements, and then updating that element's textContent if the element exists.

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `Element` |
| `textContent` | `string` |

#### Returns

`boolean`

#### Defined in

src/dom-helpers.js:2017

___

### centerFixElement

▸ **centerFixElement**(`el`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |

#### Returns

`void`

#### Defined in

src/dom-helpers.js:1789

___

### clearForm

▸ **clearForm**(`form`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `form` | `HTMLFormElement` |

#### Returns

`void`

#### Defined in

src/dom-helpers.js:537

___

### convertArrToTableElement

▸ **convertArrToTableElement**(`arr`): `HTMLTableElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `string`[][] |

#### Returns

`HTMLTableElement`

#### Defined in

src/dom-helpers.js:1849

___

### convertTableElementToArray

▸ **convertTableElementToArray**(`table`): `string`[][]

#### Parameters

| Name | Type |
| :------ | :------ |
| `table` | `HTMLTableElement` |

#### Returns

`string`[][]

#### Defined in

src/dom-helpers.js:1815

___

### convertTableHtmlToArray

▸ **convertTableHtmlToArray**(`html`): `string`[][]

#### Parameters

| Name | Type |
| :------ | :------ |
| `html` | `string` |

#### Returns

`string`[][]

#### Defined in

src/dom-helpers.js:1802

___

### convertTableRowElementsToArray

▸ **convertTableRowElementsToArray**(`rows`): `string`[][]

#### Parameters

| Name | Type |
| :------ | :------ |
| `rows` | `HTMLTableRowElement`[] |

#### Returns

`string`[][]

#### Defined in

src/dom-helpers.js:1824

___

### createBreadcrumbList

▸ **createBreadcrumbList**(`links`, `separator`): `HTMLSpanElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `links` | (`string` \| `Link`)[] |
| `separator` | `string` |

#### Returns

`HTMLSpanElement`

#### Defined in

src/dom-helpers.js:477

___

### createCommonList

▸ **createCommonList**(`arr`): `HTMLUListElement`

DOM list with name value pairs.
Common in Android settings pages.

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | \{ `name`: `string` ; `value`: `string` \| `HTMLElement`  }[] |

#### Returns

`HTMLUListElement`

#### Defined in

src/dom-helpers.js:732

___

### createElement

▸ **createElement**(`options`): `HTMLElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Partial`\<`DomElementSettings`\> |

#### Returns

`HTMLElement`

#### Defined in

src/dom-helpers.js:135

___

### createElementList

▸ **createElementList**(`nameValues`): `HTMLUListElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameValues` | `NameValue`[] |

#### Returns

`HTMLUListElement`

**`Example`**

```ts
createElementList([{name: 'a', value: 'b'}])
```

#### Defined in

src/dom-helpers.js:197

___

### createElements

▸ **createElements**(`settingsArr`, `defaults`): `HTMLElement`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `settingsArr` | `Partial`\<`DomElementSettings`\>[] |
| `defaults` | `Partial`\<`DomElementSettings`\> |

#### Returns

`HTMLElement`[]

#### Defined in

src/dom-helpers.js:119

___

### createHeadedArrayElement

▸ **createHeadedArrayElement**(`handle?`, `headerText`, `arr`): `HTMLDivElement`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `handle` | `undefined` \| (`arr`: `any`[]) => `HTMLElement` | `undefined` |
| `headerText` | `string` | `undefined` |
| `arr` | `any`[] | `undefined` |

#### Returns

`HTMLDivElement`

**`Example`**

```ts
createHeadedArrayElement()
```

#### Defined in

src/dom-helpers.js:265

___

### createHeadedKeyValueList

▸ **createHeadedKeyValueList**(`header`, `obj`): `HTMLDivElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `header` | `string` |
| `obj` | `object` |

#### Returns

`HTMLDivElement`

#### Defined in

src/dom-helpers.js:327

___

### createHeadedList

▸ **createHeadedList**(`header`, `arr`): `HTMLDivElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `header` | `string` |
| `arr` | `string`[] |

#### Returns

`HTMLDivElement`

#### Defined in

src/dom-helpers.js:317

___

### createHeadedTable

▸ **createHeadedTable**(`header`, `arr`): `HTMLDivElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `header` | `string` |
| `arr` | `string`[] |

#### Returns

`HTMLDivElement`

#### Defined in

src/dom-helpers.js:307

___

### createIframeLoader

▸ **createIframeLoader**(`src`, `selector`): () => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `string` |
| `selector` | `string` |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

src/dom-helpers.js:2034

___

### createKeyValueList

▸ **createKeyValueList**(`obj`): `HTMLUListElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Record`\<`string`, `any`\> |

#### Returns

`HTMLUListElement`

**`Example`**

```ts
createKeyValueList({ name1: 'value1', name2: 'value2' })
```

#### Defined in

src/dom-helpers.js:218

___

### createList

▸ **createList**(`arr`): `HTMLUListElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | (`string` \| `HTMLElement`)[] |

#### Returns

`HTMLUListElement`

**`Example`**

```ts
createList(['a', 'b'])
```

#### Defined in

src/dom-helpers.js:237

___

### createTable

▸ **createTable**(`rows`): `HTMLTableElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rows` | `string`[][] |

#### Returns

`HTMLTableElement`

**`Example`**

```ts
createTable([[1, 2][3, 4]])
```

#### Defined in

src/dom-helpers.js:171

___

### displayElementAtPageDimensions

▸ **displayElementAtPageDimensions**(`el`, `dimensions`): `HTMLElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |
| `dimensions` | `object` |

#### Returns

`HTMLElement`

#### Defined in

src/dom-helpers.js:963

___

### displayElementAtScreenDimensions

▸ **displayElementAtScreenDimensions**(`el`, `dimensions`): `HTMLElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |
| `dimensions` | `object` |

#### Returns

`HTMLElement`

#### Defined in

src/dom-helpers.js:932

___

### e

▸ **e**(`id`): `undefined` \| ``null`` \| `HTMLElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` \| ``null`` \| `HTMLElement`

#### Defined in

src/dom-helpers.js:1263

___

### elementChainer

▸ **elementChainer**(`el`): `Object`

Makes setting element info chainable.
TODO: Import native types and add to each below.

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |

#### Returns

`Object`

chainer with functions represeting properties/functions of element all returning chainer

#### Defined in

src/dom-helpers.js:1875

___

### formify

▸ **formify**(`el`, `fOptions`): `HTMLFormElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |
| `fOptions` | `Partial`\<`FormOptions`\> |

#### Returns

`HTMLFormElement`

#### Defined in

src/dom-helpers.js:783

___

### getAllChildren

▸ **getAllChildren**(`el`): `Element`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` \| `Document` |

#### Returns

`Element`[]

#### Defined in

src/dom-helpers.js:1669

___

### getAllElements

▸ **getAllElements**(): `Element`[]

#### Returns

`Element`[]

#### Defined in

src/dom-helpers.js:1660

___

### getAttributeSelector

▸ **getAttributeSelector**(`attr`, `value?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `attr` | `string` | `undefined` |
| `value` | `string` | `''` |

#### Returns

`string`

#### Defined in

src/dom-helpers.js:1705

___

### getAvailableElementEvents

▸ **getAvailableElementEvents**(`el`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |

#### Returns

`string`[]

#### Defined in

src/dom-helpers.js:1122

___

### getClosestParent

▸ **getClosestParent**(`el`, `selector`): ``null`` \| `HTMLElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |
| `selector` | `string` |

#### Returns

``null`` \| `HTMLElement`

#### Defined in

src/dom-helpers.js:1200

___

### getDOMImage

▸ **getDOMImage**(`src`): `HTMLImageElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `string` |

#### Returns

`HTMLImageElement`

#### Defined in

src/dom-helpers.js:1311

___

### getDOMInputRow

▸ **getDOMInputRow**(`input`): `HTMLTableRowElement`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `HTMLInputElement` | Must contain name and value properties. |

#### Returns

`HTMLTableRowElement`

#### Defined in

src/dom-helpers.js:1337

___

### getDOMInputsList

▸ **getDOMInputsList**(`inputs`): `HTMLTableElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputs` | `HTMLInputElement`[] |

#### Returns

`HTMLTableElement`

#### Defined in

src/dom-helpers.js:1322

___

### getDOMList

▸ **getDOMList**(`arr`): `HTMLUListElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `string`[] |

#### Returns

`HTMLUListElement`

#### Defined in

src/dom-helpers.js:1293

___

### getElementAttributes

▸ **getElementAttributes**(`el`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |

#### Returns

`Object`

#### Defined in

src/dom-helpers.js:1686

___

### getElementPageDimensions

▸ **getElementPageDimensions**(`el`): `CustomDOMRect`

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |

#### Returns

`CustomDOMRect`

#### Defined in

src/dom-helpers.js:854

___

### getElementPositionData

▸ **getElementPositionData**(`elementPosition`): ``null`` \| `string`

Goal:
Use position to get DOM data.
Would be used where position remains same but data can vary.

#### Parameters

| Name | Type |
| :------ | :------ |
| `elementPosition` | `ElementPosition` |

#### Returns

``null`` \| `string`

#### Defined in

src/dom-helpers.js:1403

___

### getElementScreenDimensions

▸ **getElementScreenDimensions**(`el`): `DOMRect`

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |

#### Returns

`DOMRect`

#### Defined in

src/dom-helpers.js:846

___

### getElementsBoundingRect

▸ **getElementsBoundingRect**(`elements`): `Object`

Same as normal get bounding rect, but treats multiple elements as a single group.

#### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Element`[] |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `bottom` | `number` |
| `height` | `number` |
| `left` | `number` |
| `right` | `number` |
| `top` | `number` |
| `width` | `number` |

#### Defined in

src/dom-helpers.js:1975

___

### getElementsByAttribute

▸ **getElementsByAttribute**(`attr`, `value`): `NodeListOf`\<`Element`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `attr` | `string` |
| `value` | `string` |

#### Returns

`NodeListOf`\<`Element`\>

#### Defined in

src/dom-helpers.js:1722

___

### getElementsByIds

▸ **getElementsByIds**(`ids`): `HTMLElement`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `ids` | `string`[] |

#### Returns

`HTMLElement`[]

#### Defined in

src/dom-helpers.js:1273

___

### getElementsBySelectors

▸ **getElementsBySelectors**(`selectors`, `baseElement?`): `Element`[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `selectors` | `string`[] | `undefined` |
| `baseElement?` | `HTMLElement` \| `Element` \| `Document` | `document` |

#### Returns

`Element`[]

**`See`**

https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Selectors

#### Defined in

src/dom-helpers.js:1623

___

### getElementsMappedToSelectors

▸ **getElementsMappedToSelectors**(`selectors`, `baseElement?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `selectors` | `string`[] | `undefined` |
| `baseElement?` | `HTMLElement` \| `Document` | `document` |

#### Returns

`Object`

#### Defined in

src/dom-helpers.js:1642

___

### getElementsWithAttribute

▸ **getElementsWithAttribute**(`attr`): `HTMLElement`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `attr` | `string` |

#### Returns

`HTMLElement`[]

#### Defined in

src/dom-helpers.js:1678

___

### getHtmlImport

▸ **getHtmlImport**(`selector`): ``null`` \| `DocumentFragment`

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | `string` |

#### Returns

``null`` \| `DocumentFragment`

#### Defined in

src/dom-helpers.js:1239

___

### getNestedAttributeListFromElement

▸ **getNestedAttributeListFromElement**(`el`, `attr`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `Element` \| `Document` |
| `attr` | `string` |

#### Returns

`string`[]

#### Defined in

src/dom-helpers.js:1732

___

### getNestedTextNodes

▸ **getNestedTextNodes**(`element`): `Node`[]

Gets all text nodes in element, including any child elements.

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `Element` \| `Document` |

#### Returns

`Node`[]

#### Defined in

src/dom-helpers.js:51

___

### getParents

▸ **getParents**(`el`): `HTMLElement`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |

#### Returns

`HTMLElement`[]

#### Defined in

src/dom-helpers.js:1179

___

### getUniqueDOMText

▸ **getUniqueDOMText**(`wrapper`): `string`[]

For getting any readable text in the DOM.
※ No variable names/properties etc.

#### Parameters

| Name | Type |
| :------ | :------ |
| `wrapper` | `HTMLElement` \| `Document` |

#### Returns

`string`[]

#### Defined in

src/dom-helpers.js:9

___

### getUsedDOMBoundingRect

▸ **getUsedDOMBoundingRect**(): `Object`

Gets bounding rect of all DOM.
Usually, checking the size of "body" is enough. However, static, aboslute elements and badly cleared elements may cause the size of body to be different.
This function gets the bounding rect by checking each element.

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `bottom` | `number` |
| `height` | `number` |
| `left` | `number` |
| `right` | `number` |
| `top` | `number` |
| `width` | `number` |

#### Defined in

src/dom-helpers.js:1966

___

### groupify

▸ **groupify**(`nameValues`): `HTMLDivElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameValues` | `NameValue`[] |

#### Returns

`HTMLDivElement`

#### Defined in

src/dom-helpers.js:521

___

### htmlifyEvent

▸ **htmlifyEvent**(`el`, `eventName`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |
| `eventName` | `string` |

#### Returns

`void`

#### Defined in

src/dom-helpers.js:1163

___

### htmlifyEvents

▸ **htmlifyEvents**(`el`, `eventNames`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |
| `eventNames` | `string`[] |

#### Returns

`void`

#### Defined in

src/dom-helpers.js:1143

___

### nestedInputter

▸ **nestedInputter**(`obj`): `HTMLUListElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object` |

#### Returns

`HTMLUListElement`

#### Defined in

src/dom-helpers.js:1561

___

### removeTabIndexes

▸ **removeTabIndexes**(): `void`

#### Returns

`void`

#### Defined in

src/dom-helpers.js:1216

___

### searchDom

▸ **searchDom**(`searchStr`, `optionalType?`, `el?`): `undefined` \| `ElementPosition`[]

Goal: Search for any format of data at once in DOM.
Should only get direct parent of text nodes OR direct element.
Should get position as best as possible so can replace if needed.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `searchStr` | `string` | `undefined` |
| `optionalType` | `Partial`\<`DOMSearchSettings`\> | `{}` |
| `el` | `HTMLElement` \| `Document` | `document` |

#### Returns

`undefined` \| `ElementPosition`[]

#### Defined in

src/dom-helpers.js:1449

___

### setAttributes

▸ **setAttributes**(`el`, `attributes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |
| `attributes` | `Object` |

#### Returns

`void`

#### Defined in

src/dom-helpers.js:708

___

### setChildrenSettings

▸ **setChildrenSettings**(`settings`, `childrenOptions`): `DomElementSettings`[]

Helper for applying array of items to element settings.

#### Parameters

| Name | Type |
| :------ | :------ |
| `settings` | `DomElementSettings` |
| `childrenOptions` | `Partial`\<`ChildrenSettings`\> |

#### Returns

`DomElementSettings`[]

#### Defined in

src/dom-helpers.js:159

___

### setClickFileHandler

▸ **setClickFileHandler**(`el`, `onFileHandle`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |
| `onFileHandle` | () => `void` |

#### Returns

`void`

#### Defined in

src/dom-helpers.js:1369

___

### setEditMode

▸ **setEditMode**(`attr`, `bool`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `attr` | `string` |
| `bool` | `boolean` |

#### Returns

`void`

#### Defined in

src/dom-helpers.js:1771

___

### setElementAsEditable

▸ **setElementAsEditable**(`el`, `onChange`, `bool`): `void`

Sets as editable or non-editable.
Adds/removes onChange event depending on edit mode.

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |
| `onChange` | () => `void` |
| `bool` | `boolean` |

#### Returns

`void`

**`See`**

https://stackoverflow.com/questions/8694054/onchange-event-with-contenteditable

#### Defined in

src/dom-helpers.js:1751

___

### setStyleDimensions

▸ **setStyleDimensions**(`el`, `dimensions`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |
| `dimensions` | `Record`\<keyof `CSSStyleDeclaration`, ``null`` \| `string`\> |

#### Returns

`void`

#### Defined in

src/dom-helpers.js:879

___

### setStyleMeasurements

▸ **setStyleMeasurements**(`el`, `obj`, `allowed`, `unit?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `el` | `HTMLElement` | `undefined` |
| `obj` | `Record`\<keyof `CSSStyleDeclaration`, ``null`` \| `string`\> | `undefined` |
| `allowed` | `string`[] | `undefined` |
| `unit?` | `string` | `undefined` |

#### Returns

`void`

#### Defined in

src/dom-helpers.js:891

___

### setStylePosition

▸ **setStylePosition**(`el`, `position`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |
| `position` | `any` |

#### Returns

`void`

#### Defined in

src/dom-helpers.js:869

___

### setTabIndexes

▸ **setTabIndexes**(`elements`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `HTMLElement`[] |

#### Returns

`void`

#### Defined in

src/dom-helpers.js:1227

___

### setupMenuList

▸ **setupMenuList**(`parentEl`, `settings`): `HTMLElement`

Creates a list from settings + items.
May include a header.
Parent element is required to add header, etc.
Parent element preferred rather than using returned element due to nested formatting possible.
If id is included for item, anchor tag with id as id + _a is also included.

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentEl` | `HTMLElement` |
| `settings` | `MenuListSettings` |

#### Returns

`HTMLElement`

**`Deprecated`**

This function is bloated. Should standardize and use what is necessary.

#### Defined in

src/dom-helpers.js:369

___

### showAboveElement

▸ **showAboveElement**(`shownElement`, `targetElement`, `options`): `HTMLElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `shownElement` | `HTMLElement` |
| `targetElement` | `HTMLElement` |
| `options` | `Partial`\<`Margins`\> |

#### Returns

`HTMLElement`

#### Defined in

src/dom-helpers.js:989

___

### startWatchingHtmlElementListenerChanges

▸ **startWatchingHtmlElementListenerChanges**(`eventName`, `handle`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `handle` | `Function` |

#### Returns

`void`

#### Defined in

src/dom-helpers.js:1027

___

### stopWatchingHtmlElementListenerChanges

▸ **stopWatchingHtmlElementListenerChanges**(`eventName`, `handle`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `handle` | `Function` |

#### Returns

`boolean`

#### Defined in

src/dom-helpers.js:1083

___

### textNodesUnder

▸ **textNodesUnder**(`el`): `Node`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `el` | `HTMLElement` |

#### Returns

`Node`[]

Text node

#### Defined in

src/dom-helpers.js:1608

___

### watchDocumentSizeChanges

▸ **watchDocumentSizeChanges**(`element`, `handle`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `HTMLElement` |
| `handle` | `Function` |

#### Returns

`void`

#### Defined in

src/dom-helpers.js:1012
