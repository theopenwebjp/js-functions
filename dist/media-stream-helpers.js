import { trackHasData } from './media-stream-track-helpers.js';
export function startRecordingStream(stream, dataHandle, options = {}) {
    const recorder = new window.MediaRecorder(stream, options);
    recorder.ondataavailable = dataHandle;
    recorder.start();
    return recorder;
}
export function stopRecordingStream(recorder) {
    recorder.stop();
}
export function createStreamVideoElement(stream) {
    const video = document.createElement('video');
    video.autoplay = true;
    video.srcObject = stream;
    return video;
}
export function streamHasVideo(stream) {
    const FIRST_INDEX = 0;
    const track = stream.getVideoTracks()[FIRST_INDEX];
    return trackHasData(track);
}
export function streamHasAudio(stream) {
    const FIRST_INDEX = 0;
    const track = stream.getAudioTracks()[FIRST_INDEX];
    return trackHasData(track);
}
export function getUserMedia(callback, constraints) {
    if (!constraints) {
        constraints = {
            video: true,
            audio: true
        };
    }
    const onSuccess = (stream) => {
        callback(stream);
    };
    const onError = (err) => {
        console.error(err);
        const error = StreamError();
        error.error = err;
        callback(error);
    };
    getPolyfilledGetUserMedia()(constraints, onSuccess, onError);
}
export function handleCameraStream(stream, object = undefined) {
    if (!stream || (!(stream instanceof MediaStream) && stream.isError)) {
        return null;
    }
    let o = object;
    if (!o) {
        o = StreamObject();
    }
    o.stream = stream instanceof MediaStream ? stream : null;
    o.video = document.createElement('video');
    o.video.autoplay = true;
    o.video.srcObject = o.stream;
    return o;
}
export function stopCameraStream(stream) {
    const tracks = getStreamTracks(stream);
    for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i];
        if (track.stop) {
            track.stop();
        }
    }
}
export function stopCameraStreamObject(o, removeFromDom = false) {
    if (o.stream) {
        stopCameraStream(o.stream);
    }
    if (o.video) {
        o.video.src = '';
        if (removeFromDom && o.video.parentElement) {
            o.video.parentElement.removeChild(o.video);
        }
    }
    if (o.object_url) {
        window.URL.revokeObjectURL(o.object_url);
    }
    o.stream = null;
    o.video = null;
    o.object_url = null;
}
export function getStreamTracks(stream) {
    if (stream.getTracks) {
        return stream.getTracks();
    }
    else {
        return [];
    }
}
export function getTracksByStatus(stream, status) {
    const tracks = stream.getTracks();
    const fTracks = [];
    for (let i = 0; i < tracks.length; i++) {
        let track = tracks[i];
        if (track.enabled !== undefined && track.enabled !== status) {
            continue;
        }
        if (track.readyState !== undefined &&
            ((track.readyState === 'live' && !status) ||
                (track.readyState === 'ended' && status))) {
            continue;
        }
        if (track.muted !== undefined && track.muted !== !status) {
            continue;
        }
        fTracks.push(track);
    }
    return fTracks;
}
export function getTracksByType(stream, type) {
    return getTracksByAttribute(stream, 'kind', type);
}
export function getTracksByAttribute(stream, attr, value) {
    const tracks = stream.getTracks();
    return tracks.filter(track => track[attr] === value);
}
export function StreamError() {
    return {
        isError: true,
        error: null
    };
}
export function StreamObject() {
    return {
        stream: null,
        object_url: null,
        video: null
    };
}
export function polyfillGetUserMedia() {
    const n = (window.navigator);
    n.getUserMedia = (n.getUserMedia ||
        n.mozGetUserMedia ||
        n.webkitGetUserMedia);
}
export function getPolyfilledGetUserMedia() {
    const n = (window.navigator);
    if (!n.getUserMedia) {
        polyfillGetUserMedia();
    }
    if (!n['getUserMedia']) {
        throw new Error('No getUserMedia');
    }
    return n['getUserMedia'];
}
export function webcamToElement(constraints, element, callback) {
    getUserMedia(function (data) {
        if (!(data instanceof MediaStream)) {
            if (callback) {
                callback(data);
            }
            return false;
        }
        const stream = data;
        const streamObj = handleCameraStream(stream);
        if (!element) {
            element = document.body;
        }
        if (!streamObj || !streamObj.video) {
            throw new Error('Invalid stream object');
        }
        element.appendChild(streamObj.video);
        if (callback) {
            callback(streamObj);
        }
    }, constraints);
}
export function getUnlimitedConstraints() {
    return {
        video: true,
        audio: true
    };
}
export function getBestConstraints() {
    return new Promise((resolve, reject) => {
        getUserMediaWithWorkingConstraints(undefined, (stream) => {
            resolve(getStreamConstraints(stream));
        }, reject);
    });
}
export function getStreamConstraints(stream) {
    const tracks = stream.getTracks();
    const constraints = {};
    tracks.forEach(track => {
        const trackConstraints = track.getConstraints();
        const kind = track.kind;
        if (!(kind === 'audio' || kind === 'video')) {
            throw new Error(`Disallowed media stream track kind: ${kind}`);
        }
        constraints[kind] = Object.keys(trackConstraints).length > 0 ? trackConstraints : true;
    });
    return constraints;
}
export function getUserMediaWithWorkingConstraints(constraints = getUnlimitedConstraints(), onSuccess, onError) {
    const onErrorHandle = (err) => {
        let isError = false;
        if (typeof constraints.video === 'object') {
            constraints.video = true;
        }
        else if (typeof constraints.audio === 'object') {
            constraints.audio = true;
        }
        else if (constraints.video === true && constraints.audio === true) {
            constraints.audio = false;
        }
        else {
            isError = true;
        }
        if (isError) {
            onError(err);
        }
        else {
            getPolyfilledGetUserMedia()(constraints, onSuccess, onErrorHandle);
        }
    };
    getPolyfilledGetUserMedia()(constraints, onSuccess, onErrorHandle);
}
export function getEmptyStream() {
    let stream = new window.MediaStream();
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) {
        throw new Error('Failed to get context');
    }
    context.fillRect(1, 1, 1, 1);
    stream = canvas.captureStream();
    return stream;
}
