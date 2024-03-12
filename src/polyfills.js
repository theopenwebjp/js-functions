/*
MANY polyfills are already provided in other open source libraries.
The polyfills here SHOULD be made for the following reasons:
- To be used in this library in order to prevent unnecessary dependencies.
- Non-available custom polyfills.

Polyfills SHOULD use the "polyfill" function to add to object prototype.
Polyfills SHOULD declare the "this" of the function using either JSDoc @this or TS this parameter. 
Polyfills MAY polyfill an entire object. For example, "console".
Polyfills SHOULD be named using one of the following formats:
- Method name. ONLY if unique enough that it will not clash.
- Parent object + Method name. Example: mediaStreamGetAudioTracks.
- "polyfill" + polyfill target. Example: PolyfillConsole.

Example usage:
polyfill(MediaStream, { getAudioTracks })
mediaStream.getAudioTracks()
*/

/**
 * @this {MediaStream}
 */
export function getAudioTracks() {
  /**
   * @type {MediaStreamTrack[]}
   */
  const tracks = this.getTracks()
  /**
   * @type {MediaStreamTrack[]}
   */
  const audioTracks = []
  tracks.forEach(track => {
    if (track.kind === 'audio') {
      audioTracks.push(track)
    }
  })

  return audioTracks
}

/**
 * @this {MediaStream}
 */
export function getVideoTracks() {
  /**
   * @type {MediaStreamTrack[]}
   */
  const tracks = this.getTracks()
  /**
   * @type {MediaStreamTrack[]}
   */
  const videoTracks = []
  tracks.forEach(track => {
    if (track.kind === 'video') {
      videoTracks.push(track)
    }
  })

  return videoTracks
}

export function polyfillConsole () {
  const w = /** @type {any} */ (window);
  if (!w['console']) {
    const func = () => {}
    const console = {
      trace: func,
      debug: func,
      info: func,
      log: func,
      warn: func,
      error: func,
    }
    w['console'] = console
  }
}
