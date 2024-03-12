[@theopenweb/js-functions](../README.md) / [Exports](../modules.md) / MediaStreamHelpers

# Namespace: MediaStreamHelpers

## Table of contents

### Functions

- [StreamError](MediaStreamHelpers.md#streamerror)
- [StreamObject](MediaStreamHelpers.md#streamobject)
- [createStreamVideoElement](MediaStreamHelpers.md#createstreamvideoelement)
- [getBestConstraints](MediaStreamHelpers.md#getbestconstraints)
- [getEmptyStream](MediaStreamHelpers.md#getemptystream)
- [getPolyfilledGetUserMedia](MediaStreamHelpers.md#getpolyfilledgetusermedia)
- [getStreamConstraints](MediaStreamHelpers.md#getstreamconstraints)
- [getStreamTracks](MediaStreamHelpers.md#getstreamtracks)
- [getTracksByAttribute](MediaStreamHelpers.md#gettracksbyattribute)
- [getTracksByStatus](MediaStreamHelpers.md#gettracksbystatus)
- [getTracksByType](MediaStreamHelpers.md#gettracksbytype)
- [getUnlimitedConstraints](MediaStreamHelpers.md#getunlimitedconstraints)
- [getUserMedia](MediaStreamHelpers.md#getusermedia)
- [getUserMediaWithWorkingConstraints](MediaStreamHelpers.md#getusermediawithworkingconstraints)
- [handleCameraStream](MediaStreamHelpers.md#handlecamerastream)
- [polyfillGetUserMedia](MediaStreamHelpers.md#polyfillgetusermedia)
- [startRecordingStream](MediaStreamHelpers.md#startrecordingstream)
- [stopCameraStream](MediaStreamHelpers.md#stopcamerastream)
- [stopCameraStreamObject](MediaStreamHelpers.md#stopcamerastreamobject)
- [stopRecordingStream](MediaStreamHelpers.md#stoprecordingstream)
- [streamHasAudio](MediaStreamHelpers.md#streamhasaudio)
- [streamHasVideo](MediaStreamHelpers.md#streamhasvideo)
- [webcamToElement](MediaStreamHelpers.md#webcamtoelement)

## Functions

### StreamError

▸ **StreamError**(): `StreamError`

#### Returns

`StreamError`

#### Defined in

src/media-stream-helpers.js:250

___

### StreamObject

▸ **StreamObject**(): `StreamObject`

Connection between stream, video and url due to revoking and updating.

#### Returns

`StreamObject`

#### Defined in

src/media-stream-helpers.js:261

___

### createStreamVideoElement

▸ **createStreamVideoElement**(`stream`): `HTMLVideoElement`

Create video element from stream

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | `MediaStream` |

#### Returns

`HTMLVideoElement`

#### Defined in

src/media-stream-helpers.js:30

___

### getBestConstraints

▸ **getBestConstraints**(): `Promise`\<`any`\>

Attempts to get best constraints with best video.

#### Returns

`Promise`\<`any`\>

#### Defined in

src/media-stream-helpers.js:341

___

### getEmptyStream

▸ **getEmptyStream**(): `MediaStream`

#### Returns

`MediaStream`

#### Defined in

src/media-stream-helpers.js:413

___

### getPolyfilledGetUserMedia

▸ **getPolyfilledGetUserMedia**(): `NavigatorGetUserMedia`

Old navigator version of getUserMedia

#### Returns

`NavigatorGetUserMedia`

#### Defined in

src/media-stream-helpers.js:285

___

### getStreamConstraints

▸ **getStreamConstraints**(`stream`): `MediaStreamConstraints`

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | `MediaStream` |

#### Returns

`MediaStreamConstraints`

#### Defined in

src/media-stream-helpers.js:353

___

### getStreamTracks

▸ **getStreamTracks**(`stream`): `MediaStreamTrack`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | `MediaStream` |

#### Returns

`MediaStreamTrack`[]

#### Defined in

src/media-stream-helpers.js:177

___

### getTracksByAttribute

▸ **getTracksByAttribute**(`stream`, `attr`, `value`): `MediaStreamTrack`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | `MediaStream` |
| `attr` | keyof `MediaStreamTrack` |
| `value` | `any` |

#### Returns

`MediaStreamTrack`[]

#### Defined in

src/media-stream-helpers.js:242

___

### getTracksByStatus

▸ **getTracksByStatus**(`stream`, `status`): `MediaStreamTrack`[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | `MediaStream` |  |
| `status` | `boolean` | Enabled: enabled = true & muted = false |

#### Returns

`MediaStreamTrack`[]

#### Defined in

src/media-stream-helpers.js:190

___

### getTracksByType

▸ **getTracksByType**(`stream`, `type`): `MediaStreamTrack`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | `MediaStream` |
| `type` | `string` |

#### Returns

`MediaStreamTrack`[]

#### Defined in

src/media-stream-helpers.js:232

___

### getUnlimitedConstraints

▸ **getUnlimitedConstraints**(): `MediaStreamConstraints`

#### Returns

`MediaStreamConstraints`

#### Defined in

src/media-stream-helpers.js:331

___

### getUserMedia

▸ **getUserMedia**(`callback`, `constraints`): `void`

Simple handling of getUserMedia
Be careful of argument order change: navigator.getUserMedia(constraints, onSuccess, onError)
Order changed due to constraints being optional.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`streamOrError`: `MediaStream` \| `StreamError`) => `void` |
| `constraints` | `MediaStreamConstraints` |

#### Returns

`void`

**`Deprecated`**

This was used as during early adoption of this feature, but now it is standardized should use promises instead.

#### Defined in

src/media-stream-helpers.js:68

___

### getUserMediaWithWorkingConstraints

▸ **getUserMediaWithWorkingConstraints**(`constraints?`, `onSuccess`, `onError`): `void`

Attempts to getUserMedia with best video.
Falls back to simpler constraints on fail.
  Safe => Not safe
  1. {video: true, audio: false} OR {video: false, audio: true}
  2. {video: true, audio: true}
  3. {video: {...}, audio: {...}

#### Parameters

| Name | Type |
| :------ | :------ |
| `constraints` | `MediaStreamConstraints` |
| `onSuccess` | `NavigatorUserMediaSuccessCallback` |
| `onError` | (`arg0`: `Error`) => `void` |

#### Returns

`void`

#### Defined in

src/media-stream-helpers.js:382

___

### handleCameraStream

▸ **handleCameraStream**(`stream`, `object?`): ``null`` \| `StreamObject`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `stream` | `MediaStream` \| `StreamError` | `undefined` |
| `object` | `undefined` \| `StreamObject` | `undefined` |

#### Returns

``null`` \| `StreamObject`

#### Defined in

src/media-stream-helpers.js:103

___

### polyfillGetUserMedia

▸ **polyfillGetUserMedia**(): `void`

Old navigator version of getUserMedia

#### Returns

`void`

#### Defined in

src/media-stream-helpers.js:272

___

### startRecordingStream

▸ **startRecordingStream**(`stream`, `dataHandle`, `options?`): `MediaRecorder`

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | `MediaStream` |
| `dataHandle` | ``null`` \| (`this`: `MediaRecorder`, `ev`: `BlobEvent`) => `any` |
| `options` | `MediaRecorderOptions` |

#### Returns

`MediaRecorder`

#### Defined in

src/media-stream-helpers.js:9

___

### stopCameraStream

▸ **stopCameraStream**(`stream`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | `MediaStream` |

#### Returns

`void`

#### Defined in

src/media-stream-helpers.js:131

___

### stopCameraStreamObject

▸ **stopCameraStreamObject**(`o`, `removeFromDom?`): `void`

Stops stream and related data

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `o` | `StreamObject` | `undefined` |
| `removeFromDom` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

src/media-stream-helpers.js:148

___

### stopRecordingStream

▸ **stopRecordingStream**(`recorder`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `recorder` | `MediaRecorder` |

#### Returns

`void`

#### Defined in

src/media-stream-helpers.js:21

___

### streamHasAudio

▸ **streamHasAudio**(`stream`): `boolean`

Checks if audio exists

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | `MediaStream` |

#### Returns

`boolean`

#### Defined in

src/media-stream-helpers.js:54

___

### streamHasVideo

▸ **streamHasVideo**(`stream`): `boolean`

Checks if video exists

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | `MediaStream` |

#### Returns

`boolean`

#### Defined in

src/media-stream-helpers.js:43

___

### webcamToElement

▸ **webcamToElement**(`constraints`, `element`, `callback`): `void`

Quick method to get webcam and show in element

#### Parameters

| Name | Type |
| :------ | :------ |
| `constraints` | `MediaStreamConstraints` |
| `element` | `HTMLElement` |
| `callback` | (`streamObject`: `StreamObject` \| `StreamError`) => `void` |

#### Returns

`void`

#### Defined in

src/media-stream-helpers.js:302
