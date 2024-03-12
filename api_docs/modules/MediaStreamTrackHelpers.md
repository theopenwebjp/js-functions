[@theopenweb/js-functions](../README.md) / [Exports](../modules.md) / MediaStreamTrackHelpers

# Namespace: MediaStreamTrackHelpers

## Table of contents

### Functions

- [startRecordingTrack](MediaStreamTrackHelpers.md#startrecordingtrack)
- [trackHasData](MediaStreamTrackHelpers.md#trackhasdata)
- [trackToStream](MediaStreamTrackHelpers.md#tracktostream)

## Functions

### startRecordingTrack

▸ **startRecordingTrack**(`track`, `dataHandle`): `MediaRecorder`

#### Parameters

| Name | Type |
| :------ | :------ |
| `track` | `MediaStreamTrack` |
| `dataHandle` | ``null`` \| (`this`: `MediaRecorder`, `ev`: `BlobEvent`) => `any` |

#### Returns

`MediaRecorder`

#### Defined in

src/media-stream-track-helpers.js:40

___

### trackHasData

▸ **trackHasData**(`track`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `track` | `MediaStreamTrack` |

#### Returns

`boolean`

#### Defined in

src/media-stream-track-helpers.js:7

___

### trackToStream

▸ **trackToStream**(`track`): `MediaStream`

Creates stream with tracks added

#### Parameters

| Name | Type |
| :------ | :------ |
| `track` | `MediaStreamTrack` |

#### Returns

`MediaStream`

#### Defined in

src/media-stream-track-helpers.js:54
