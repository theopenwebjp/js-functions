/*
This file is for functions aimed at services.
"Services" do not have dependencies. They are service specific such as an endpoint.
*/

/**
* First request temporary access below:
* @see https://cors-anywhere.herokuapp.com/corsdemo
* 
* @see https://github.com/Rob--W/cors-anywhere/issues/301
* @see https://github.com/Rob--W/cors-anywhere
*
* @example corsAnywhereFetch()
*/
export function corsAnywhereFetch() {
  let cors_api_host = 'cors-anywhere.herokuapp.com';
  let cors_api_url = 'https://' + cors_api_host + '/';
  let slice = [].slice;
  let origin = window.location.protocol + '//' + window.location.host;
  let f = window.fetch;
  /**
  * @param {string} url
  * @param {any} [options]
  */
  // @ts-ignore
  window.fetch = function(url, options = {}) {
      // let targetOrigin = /^https?:\/\/([^\/]+)/i.exec(url);
      let targetOrigin = /^https?:\/\/([^/]+)/i.exec(url);
      if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
          targetOrigin[1] !== cors_api_host) {
          url = cors_api_url + url;
      }
      return f(url, options)
  };
}

/**
* AJAX CORS
* @see https://github.com/Rob--W/cors-anywhere#client
*/ 
export function corsAnywhereAJAX() {
  let cors_api_host = 'cors-anywhere.herokuapp.com';
  let cors_api_url = 'https://' + cors_api_host + '/';
  let slice = [].slice;
  let origin = window.location.protocol + '//' + window.location.host;
  let open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function() {
     /**
     * @type {string[]}
     */
      let args = slice.call(arguments);
      // let targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
      let targetOrigin = /^https?:\/\/([^/]+)/i.exec(args[1]);
      if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
          targetOrigin[1] !== cors_api_host) {
          args[1] = cors_api_url + args[1];
      }
      return open.apply(this, /** @type {[any, any, any]} */ (args));
  };
}
