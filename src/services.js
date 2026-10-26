/*
This file is for functions aimed at services.
"Services" do not have dependencies. They are service specific such as an endpoint.
*/

const CORS_ANYWHERE_HOST = 'cors-anywhere.herokuapp.com'

/**
 * Makes one explicit credential-free GET request through CORS Anywhere.
 * Does not modify the global fetch implementation.
 * @param {string} url
 * @param {RequestInit} [options]
 * @return {Promise<Response>}
 */
export function corsAnywhereFetch(url, options = {}) {
  const target = new URL(url, window.location.href)
  if (target.protocol !== 'http:' && target.protocol !== 'https:') {
    throw new TypeError(`Unsupported URL protocol: ${target.protocol}`)
  }

  if (target.origin === window.location.origin || target.host === CORS_ANYWHERE_HOST) {
    return window.fetch(url, options)
  }

  const method = (options.method || 'GET').toUpperCase()
  if (method !== 'GET' || options.body != null) {
    throw new TypeError('The CORS proxy only supports credential-free GET requests')
  }

  const headers = new Headers(options.headers)
  headers.delete('authorization')
  headers.delete('proxy-authorization')
  headers.delete('cookie')

  return window.fetch(`https://${CORS_ANYWHERE_HOST}/${url}`, {
    ...options,
    method,
    body: undefined,
    credentials: 'omit',
    headers
  })
}

/**
 * Makes one explicit credential-free GET request through CORS Anywhere.
 * Does not modify XMLHttpRequest.prototype.
 * @param {string} url
 * @param {(event: ProgressEvent<EventTarget>) => void} [onload]
 * @param {(event: ProgressEvent<EventTarget>) => void} [onerror]
 * @return {XMLHttpRequest}
 */
export function corsAnywhereAJAX(url, onload = undefined, onerror = undefined) {
  const target = new URL(url, window.location.href)
  if (target.protocol !== 'http:' && target.protocol !== 'https:') {
    throw new TypeError(`Unsupported URL protocol: ${target.protocol}`)
  }

  const request = new XMLHttpRequest()
  request.open(
    'GET',
    target.origin === window.location.origin || target.host === CORS_ANYWHERE_HOST
      ? url
      : `https://${CORS_ANYWHERE_HOST}/${url}`
  )
  request.withCredentials = false
  if (onload) request.addEventListener('load', onload)
  if (onerror) request.addEventListener('error', onerror)
  request.send()
  return request
}
