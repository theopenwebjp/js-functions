export function getAudioTracks() {
    const tracks = this.getTracks();
    const audioTracks = [];
    tracks.forEach(track => {
        if (track.kind === 'audio') {
            audioTracks.push(track);
        }
    });
    return audioTracks;
}
export function getVideoTracks() {
    const tracks = this.getTracks();
    const videoTracks = [];
    tracks.forEach(track => {
        if (track.kind === 'video') {
            videoTracks.push(track);
        }
    });
    return videoTracks;
}
export function polyfillConsole() {
    const w = (window);
    if (!w['console']) {
        const func = () => { };
        const console = {
            trace: func,
            debug: func,
            info: func,
            log: func,
            warn: func,
            error: func,
        };
        w['console'] = console;
    }
}
