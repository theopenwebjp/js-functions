import { startRecordingStream } from "./media-stream-helpers.js";
export function trackHasData(track) {
    if (!track) {
        return false;
    }
    if (track.enabled !== undefined && !track.enabled) {
        return false;
    }
    if (track.readyState !== undefined &&
        track.readyState === 'ended') {
        return false;
    }
    if (track.muted !== undefined && !!track.muted) {
    }
    return true;
}
export function startRecordingTrack(track, dataHandle) {
    const stream = trackToStream(track);
    return startRecordingStream(stream, dataHandle);
}
export function trackToStream(track) {
    const stream = new window.MediaStream();
    stream.addTrack(track);
    return stream;
}
