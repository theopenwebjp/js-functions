[@theopenweb/js-functions](../README.md) / [Exports](../modules.md) / CanvasHelpers

# Namespace: CanvasHelpers

## Table of contents

### Functions

- [BoundingRect](CanvasHelpers.md#boundingrect)
- [ImageSrcToDataURL](CanvasHelpers.md#imagesrctodataurl)
- [RGBASelection](CanvasHelpers.md#rgbaselection)
- [canvasHasColorData](CanvasHelpers.md#canvashascolordata)
- [canvasToDataURL](CanvasHelpers.md#canvastodataurl)
- [canvasToImage](CanvasHelpers.md#canvastoimage)
- [canvasToImageFile](CanvasHelpers.md#canvastoimagefile)
- [canvasToStream](CanvasHelpers.md#canvastostream)
- [diffRGBA](CanvasHelpers.md#diffrgba)
- [drawableToCanvas](CanvasHelpers.md#drawabletocanvas)
- [drawableToDataURL](CanvasHelpers.md#drawabletodataurl)
- [drawableToImage](CanvasHelpers.md#drawabletoimage)
- [fitCanvasToBoundingRect](CanvasHelpers.md#fitcanvastoboundingrect)
- [getContext](CanvasHelpers.md#getcontext)
- [getContextBoundingRect](CanvasHelpers.md#getcontextboundingrect)
- [getMainColor](CanvasHelpers.md#getmaincolor)
- [getMaxRGBACount](CanvasHelpers.md#getmaxrgbacount)
- [isImageDataSame](CanvasHelpers.md#isimagedatasame)
- [loopImageData](CanvasHelpers.md#loopimagedata)
- [watchCanvas](CanvasHelpers.md#watchcanvas)
- [watchForCanvasStop](CanvasHelpers.md#watchforcanvasstop)

## Functions

### BoundingRect

▸ **BoundingRect**(): `SimpleDOMRect`

#### Returns

`SimpleDOMRect`

#### Defined in

src/canvas-helpers.js:351

___

### ImageSrcToDataURL

▸ **ImageSrcToDataURL**(`src`, `onLoad`, `format`, `conversionOptions`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `string` |
| `onLoad` | (`dataUrl`: `string`) => `void` |
| `format` | `string` |
| `conversionOptions` | `undefined` \| `number` |

#### Returns

`void`

#### Defined in

src/canvas-helpers.js:141

___

### RGBASelection

▸ **RGBASelection**(`options`): \{ `a`: `boolean` = false; `b`: `boolean` = true; `g`: `boolean` = true; `r`: `boolean` = true } & `Partial`\<`RGBASelection`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Partial`\<`RGBASelection`\> |

#### Returns

\{ `a`: `boolean` = false; `b`: `boolean` = true; `g`: `boolean` = true; `r`: `boolean` = true } & `Partial`\<`RGBASelection`\>

#### Defined in

src/canvas-helpers.js:25

___

### canvasHasColorData

▸ **canvasHasColorData**(`canvas`, `rgbaOptions?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `canvas` | `HTMLCanvasElement` |
| `rgbaOptions` | `Partial`\<`RGBASelection`\> |

#### Returns

`boolean`

#### Defined in

src/canvas-helpers.js:269

___

### canvasToDataURL

▸ **canvasToDataURL**(`canvas`, `format?`, `encoderOptions?`): `string`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `canvas` | `HTMLCanvasElement` | `undefined` |  |
| `format` | `undefined` \| `string` | `undefined` |  |
| `encoderOptions` | `undefined` \| `number` | `undefined` | https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL |

#### Returns

`string`

#### Defined in

src/canvas-helpers.js:184

___

### canvasToImage

▸ **canvasToImage**(`canvas`, `options`): `string` \| `HTMLImageElement`

Abstract canvas to image function

#### Parameters

| Name | Type |
| :------ | :------ |
| `canvas` | `HTMLCanvasElement` |
| `options` | `Partial`\<`CanvasImageOptions`\> |

#### Returns

`string` \| `HTMLImageElement`

#### Defined in

src/canvas-helpers.js:73

___

### canvasToImageFile

▸ **canvasToImageFile**(`canvas`, `format`, `conversionOptions`, `onLoad?`): `HTMLImageElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `canvas` | `HTMLCanvasElement` |
| `format` | `string` |
| `conversionOptions` | `undefined` \| `number` |
| `onLoad?` | (`image`: `HTMLImageElement`) => `void` |

#### Returns

`HTMLImageElement`

#### Defined in

src/canvas-helpers.js:196

___

### canvasToStream

▸ **canvasToStream**(`canvas`, `fps`): `boolean` \| `MediaStream`

#### Parameters

| Name | Type |
| :------ | :------ |
| `canvas` | `HTMLCanvasElement` |
| `fps` | `number` |

#### Returns

`boolean` \| `MediaStream`

#### Defined in

src/canvas-helpers.js:56

___

### diffRGBA

▸ **diffRGBA**(`rgba1`, `rgba2`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rgba1` | `RGBA` |
| `rgba2` | `RGBA` |

#### Returns

`number`

#### Defined in

src/canvas-helpers.js:381

___

### drawableToCanvas

▸ **drawableToCanvas**(`drawable`, `startCanvas?`): `HTMLCanvasElement`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `drawable` | `CanvasImageSource` | `undefined` |
| `startCanvas` | `undefined` \| `HTMLCanvasElement` | `undefined` |

#### Returns

`HTMLCanvasElement`

#### Defined in

src/canvas-helpers.js:156

___

### drawableToDataURL

▸ **drawableToDataURL**(`drawable`, `format?`, `conversionOptions?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `drawable` | `CanvasImageSource` | `undefined` |
| `format` | `undefined` \| `string` | `undefined` |
| `conversionOptions` | `undefined` \| `number` | `undefined` |

#### Returns

`string`

#### Defined in

src/canvas-helpers.js:173

___

### drawableToImage

▸ **drawableToImage**(`drawable`): `HTMLImageElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `drawable` | `any` |

#### Returns

`HTMLImageElement`

#### Defined in

src/canvas-helpers.js:127

___

### fitCanvasToBoundingRect

▸ **fitCanvasToBoundingRect**(`canvas`, `boundingRect`): `HTMLCanvasElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `canvas` | `HTMLCanvasElement` |
| `boundingRect` | `SimpleDOMRect` |

#### Returns

`HTMLCanvasElement`

#### Defined in

src/canvas-helpers.js:299

___

### getContext

▸ **getContext**(`canvas`): `CanvasRenderingContext2D`

Caching allows for higher speed.
  *

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `canvas` | `CachedHTMLCanvasElement` | * |

#### Returns

`CanvasRenderingContext2D`

#### Defined in

src/canvas-helpers.js:39

___

### getContextBoundingRect

▸ **getContextBoundingRect**(`ctx`): `SimpleDOMRect`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CanvasRenderingContext2D` |

#### Returns

`SimpleDOMRect`

#### Defined in

src/canvas-helpers.js:315

___

### getMainColor

▸ **getMainColor**(`imgData`, `threshold?`): `any`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `imgData` | `ImageData` | `undefined` |
| `threshold?` | `number` | `0` |

#### Returns

`any`

#### Defined in

src/canvas-helpers.js:394

___

### getMaxRGBACount

▸ **getMaxRGBACount**(`colors`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `colors` | `RGBACount`[] |

#### Returns

`any`

#### Defined in

src/canvas-helpers.js:423

___

### isImageDataSame

▸ **isImageDataSame**(`imgData1`, `imgData2`): `boolean`

Returns boolean for quick imageData checking.

#### Parameters

| Name | Type |
| :------ | :------ |
| `imgData1` | `ImageData` |
| `imgData2` | `ImageData` |

#### Returns

`boolean`

#### Defined in

src/canvas-helpers.js:247

___

### loopImageData

▸ **loopImageData**(`imgData`, `onPixel`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `imgData` | `ImageData` |
| `onPixel` | (`rgba`: `RGBA`, `index`: `number`) => `void` |

#### Returns

`void`

#### Defined in

src/canvas-helpers.js:366

___

### watchCanvas

▸ **watchCanvas**(`canvas`, `onChange`, `intervalMs?`): () => `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `canvas` | `HTMLCanvasElement` | `undefined` |
| `onChange` | () => `void` | `undefined` |
| `intervalMs` | `number` | `1000` |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

src/canvas-helpers.js:9

___

### watchForCanvasStop

▸ **watchForCanvasStop**(`canvas`, `onStop`, `options`): `void`

Watches for canvas stop, usual for WebRTC connection problems in older browsers.
Stops on first stop.

#### Parameters

| Name | Type |
| :------ | :------ |
| `canvas` | `HTMLCanvasElement` |
| `onStop` | () => `void` |
| `options` | `Object` |
| `options.interval` | `number` |

#### Returns

`void`

#### Defined in

src/canvas-helpers.js:221
