import { trackHasData } from './media-stream-track-helpers.js'

/**
 * @param {MediaStream} stream
 * @param {((this: MediaRecorder, ev: BlobEvent) => any) | null} dataHandle
 * @param {MediaRecorderOptions} options
 * @return {MediaRecorder}
 */
export function startRecordingStream(stream, dataHandle, options = {}) {
  // Should be abstract

  const recorder = new window.MediaRecorder(stream, options)
  recorder.ondataavailable = dataHandle
  recorder.start()
  return recorder
}

/**
 * @param {MediaRecorder} recorder
 */
export function stopRecordingStream(recorder) {
  recorder.stop()
}

/**
 * Create video element from stream
 * @param {MediaStream} stream
 * @return {HTMLVideoElement}
 */
export function createStreamVideoElement(stream) {
  const video = document.createElement('video')
  video.autoplay = true
  video.srcObject = stream

  return video
}

/**
 * Checks if video exists
 * @param {MediaStream} stream
 * @return {Boolean}
 */
export function streamHasVideo(stream) {
  const FIRST_INDEX = 0
  const track = stream.getVideoTracks()[FIRST_INDEX]
  return trackHasData(track)
}

/**
 * Checks if audio exists
 * @param {MediaStream} stream
 * @return {Boolean}
 */
export function streamHasAudio(stream) {
  const FIRST_INDEX = 0
  const track = stream.getAudioTracks()[FIRST_INDEX]
  return trackHasData(track)
}

/**
 * Simple handling of getUserMedia
 * Be careful of argument order change: navigator.getUserMedia(constraints, onSuccess, onError)
 * Order changed due to constraints being optional.
 * @deprecated This was used as during early adoption of this feature, but now it is standardized should use promises instead.
 * @param {(streamOrError: MediaStream|import('./types/ts/index.js').StreamError) => void} callback
 * @param {MediaStreamConstraints} constraints
 */
export function getUserMedia(callback, constraints) {
  if (!constraints) {
    constraints = {
      video: true,
      audio: true
    }
  }

  /**
   * @param {MediaStream} stream
   */
  const onSuccess = (stream) => {
    callback(stream)
  }

  /**
   * @param {Error} err
   */
  const onError = (err) => {
    console.error(err)

    const error = StreamError()
    error.error = err

    callback(error)
  }

  getPolyfilledGetUserMedia()(constraints, onSuccess, onError)
}

/**
 * @param {MediaStream|import('./types/ts/index.js').StreamError} stream
 * @param {import('./types/ts/index.js').StreamObject|undefined} object
 * @return {null|import('./types/ts/index.js').StreamObject}
 */
export function handleCameraStream(stream, object = undefined) {
  if (!stream || (!(stream instanceof MediaStream) && stream.isError)) {
    return null
  }

  let o = object
  if (!o) {
    o = StreamObject()
  }

  // Set
  o.stream = stream instanceof MediaStream ? stream : null

  // URL
  // o.object_url = window.URL.createObjectURL(o.stream)

  // Video
  o.video = document.createElement('video')
  o.video.autoplay = true
  // o.video.src = o.object_url
  o.video.srcObject = o.stream

  return o
}

/**
 * @param {MediaStream} stream
 */
export function stopCameraStream(stream) {
  // Stop tracks
  const tracks = getStreamTracks(stream)
  for (let i = 0; i < tracks.length; i++) {
    const track = tracks[i]
    if (track.stop) {
      track.stop()
    }
  }
}

/**
 * Stops stream and related data
 * @param {import('./types/ts/index.js').StreamObject} o
 * @param {Boolean} removeFromDom
 * @return {void}
 */
export function stopCameraStreamObject(o, removeFromDom = false) {
  // Stop Stream
  if (o.stream) {
    stopCameraStream(o.stream)
  }

  // Destroy video
  if (o.video) {
    o.video.src = ''
    if (removeFromDom && o.video.parentElement) {
      o.video.parentElement.removeChild(o.video)
    }
  }

  // Revoke URL
  if (o.object_url) {
    window.URL.revokeObjectURL(o.object_url)
  }

  // Nullify
  o.stream = null
  o.video = null
  o.object_url = null
}

/**
 * @param {MediaStream} stream
 * @return {MediaStreamTrack[]}
 */
export function getStreamTracks(stream) {
  if (stream.getTracks) {
    return stream.getTracks()
  } else {
    return []
  }
}

/**
 * @param {MediaStream} stream
 * @param {boolean} status Enabled: enabled = true & muted = false
 * @return {MediaStreamTrack[]}
 */
export function getTracksByStatus(stream, status) {
  const tracks = stream.getTracks()
  /**
   * @type {MediaStreamTrack[]}
   */
  const fTracks = []

  for (let i = 0; i < tracks.length; i++) {
    let track = tracks[i]

    // Enabled
    if (track.enabled !== undefined && track.enabled !== status) {
      continue
    }

    // ReadyState
    if (
      track.readyState !== undefined &&
      (
        (track.readyState === 'live' && !status) ||
        (track.readyState === 'ended' && status)
      )
    ) {
      continue
    }

    // Muted
    if (track.muted !== undefined && track.muted !== !status) {
      continue
    }

    fTracks.push(track)
  }

  return fTracks
}

/**
 * @param {MediaStream} stream
 * @param {string} type
 * @return {MediaStreamTrack[]}
 */
export function getTracksByType(stream, type) {
  return getTracksByAttribute(stream, 'kind', type)
}

/**
 * @param {MediaStream} stream
 * @param {keyof MediaStreamTrack} attr
 * @param {any} value
 * @return {MediaStreamTrack[]}
 */
export function getTracksByAttribute(stream, attr, value) {
  const tracks = stream.getTracks()
  return tracks.filter(track => track[attr] === value)
}

/**
 * @return {import('./types/ts/index.js').StreamError}
 */
export function StreamError() {
  return {
    isError: true,
    error: null
  }
}

/**
 * Connection between stream, video and url due to revoking and updating.
 * @return {import('./types/ts/index.js').StreamObject}
 */
export function StreamObject() {
  return {
    stream: null,
    object_url: null, // DEPRECATED
    video: null
  }
}

/**
 * Old navigator version of getUserMedia
 */
export function polyfillGetUserMedia() {
  const n = /** @type {import('./types/ts/index.js').GetUserMediaPolyfilledNavigator} */ (window.navigator)

  n.getUserMedia = (
    n.getUserMedia ||
    n.mozGetUserMedia ||
    n.webkitGetUserMedia
  )
}

/**
 * Old navigator version of getUserMedia
 */
export function getPolyfilledGetUserMedia() {
  const n = /** @type {import('./types/ts/index.js').GetUserMediaPolyfilledNavigator} */ (window.navigator)
  if (!n.getUserMedia) {
    polyfillGetUserMedia()
  }
  if (!n['getUserMedia']) {
    throw new Error('No getUserMedia')
  }
  return n['getUserMedia']
}

/**
 * Quick method to get webcam and show in element
 * @param {MediaStreamConstraints} constraints
 * @param {HTMLElement} element
 * @param {(streamObject: import('./types/ts/index.js').StreamObject|import('./types/ts/index.js').StreamError) => void} callback
 */
export function webcamToElement(constraints, element, callback) {
  getUserMedia(function (data) {
    if (!(data instanceof MediaStream)) {
      if (callback) {
        callback(data)
      }
      return false
    }

    const stream = data
    const streamObj = handleCameraStream(stream)

    if (!element) {
      element = document.body
    }
    if (!streamObj || !streamObj.video) {
      throw new Error('Invalid stream object')
    }
    element.appendChild(streamObj.video)

    if (callback) {
      callback(streamObj)
    }
  }, constraints)
}

/**
 * @return {MediaStreamConstraints}
 */
export function getUnlimitedConstraints() {
  return {
    video: true,
    audio: true
  }
}

/**
 * Attempts to get best constraints with best video.
 */
export function getBestConstraints() {
  return new Promise((resolve, reject) => {
    getUserMediaWithWorkingConstraints(undefined, (stream) => {
      resolve(getStreamConstraints(stream))
    }, reject)
  })
}

/**
 * @param {MediaStream} stream
 * @return {MediaStreamConstraints}
 */
export function getStreamConstraints(stream) {
  const tracks = stream.getTracks()
  /**
   * @type {MediaStreamConstraints}
   */
  const constraints = {}
  tracks.forEach(track => {
    const trackConstraints = track.getConstraints()
    const kind = track.kind
    if (!(kind === 'audio' || kind === 'video')) {
      throw new Error(`Disallowed media stream track kind: ${kind}`)
    }
    constraints[kind] = Object.keys(trackConstraints).length > 0 ? trackConstraints : true
  })
  return constraints
}

/**
 * Attempts to getUserMedia with best video.
 * Falls back to simpler constraints on fail.
 *   Safe => Not safe
 *   1. {video: true, audio: false} OR {video: false, audio: true}
 *   2. {video: true, audio: true}
 *   3. {video: {...}, audio: {...}
 * @param {MediaStreamConstraints} constraints
 * @param {import('./types/ts/index.js').NavigatorUserMediaSuccessCallback} onSuccess
 * @param {function(Error):void} onError
 * 
 */
export function getUserMediaWithWorkingConstraints(constraints = getUnlimitedConstraints(), onSuccess, onError) {
  /**
   * @param {Error} err
   */
  const onErrorHandle = (err) => {
    let isError = false

    if (typeof constraints.video === 'object') { // 1 video most important
      constraints.video = true
    } else if (
      typeof constraints.audio === 'object') { // 2
      constraints.audio = true
    } else if (constraints.video === true && constraints.audio === true) { // 3 no audio sometimes causes errors
      constraints.audio = false
    } else {
      isError = true
    }

    if (isError) {
      onError(err)
    } else {
      getPolyfilledGetUserMedia()(constraints, onSuccess, onErrorHandle)
    }
  }

  getPolyfilledGetUserMedia()(constraints, onSuccess, onErrorHandle)
}

/**
 * @return {MediaStream}
 */
export function getEmptyStream() {
  let stream = new window.MediaStream()

  const canvas = document.createElement('canvas')

  // Firefox stream error bug fix
  // [Exception... "Component not initialized"  nsresult: "0xc1f30001 (NS_ERROR_NOT_INITIALIZED)"
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Failed to get context')
  }
  context.fillRect(1, 1, 1, 1)
  stream = canvas.captureStream() // Error above can possibly be fixed by passing value here.

  return stream
}
