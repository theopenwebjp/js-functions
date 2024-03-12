export function corsAnywhereFetch() {
    let cors_api_host = 'cors-anywhere.herokuapp.com';
    let cors_api_url = 'https://' + cors_api_host + '/';
    let slice = [].slice;
    let origin = window.location.protocol + '//' + window.location.host;
    let f = window.fetch;
    window.fetch = function (url, options = {}) {
        let targetOrigin = /^https?:\/\/([^/]+)/i.exec(url);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
            targetOrigin[1] !== cors_api_host) {
            url = cors_api_url + url;
        }
        return f(url, options);
    };
}
export function corsAnywhereAJAX() {
    let cors_api_host = 'cors-anywhere.herokuapp.com';
    let cors_api_url = 'https://' + cors_api_host + '/';
    let slice = [].slice;
    let origin = window.location.protocol + '//' + window.location.host;
    let open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function () {
        let args = slice.call(arguments);
        let targetOrigin = /^https?:\/\/([^/]+)/i.exec(args[1]);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
            targetOrigin[1] !== cors_api_host) {
            args[1] = cors_api_url + args[1];
        }
        return open.apply(this, (args));
    };
}
