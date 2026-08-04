/**
 * This module defines a custom module wrapping function
 *
 * You can think of it as a replacement for amd define
 * or other module loading shims in the browser
 *
 * It is based around promises, every module is wrapped
 * in a function that returns a promise that resolves to
 * the module's contents.
 */

export const require = (deps, modCallback) => () =>
  Promise.all(deps.map(dep => dep())).then(modCallback)


export const makeLazyRequirer => fetchImpl => (url, deps) => {
  // we want to fetch the module which is at url
  // we optionally accept some deps with the url
  // because the framework doesn't know about the deps
  // before we start fetching.

  // @todo define fetcher here
}