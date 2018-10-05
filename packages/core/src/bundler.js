/**
 * Initial module of the native-bundler package
 *
 * In here we need to do a few things:
 *
 * 1. Define a bundler function that we will export
 * 2. Call out to other transformation functions
 */

import { getDependencyTree } from './get-dependency-tree.js'
import { resolveExternalAssets } from './resolve-external-assets.js'
import { transformAsset } from './transform-asset.js'
import { writeFile } from './utils/file-system'

export const bundler = async ({
  entry,
  out,
  config = {
    cacheExternals: true,
    babel: { presets: undefined, plugins: undefined },
  },
  cache,
} = {}) => {
  const { tree } = await getDependencyTree({
    inputPath: entry,
    resolveExternalAsset: resolveExternalAssets({ config, cache, out }),
    config,
    transformAsset: transformAsset(config),
  })

  let modules = ''

  tree.forEach(mod => {
    modules += `${mod.id}: [
function(require, module, exports) {
  ${mod.code}
},
${JSON.stringify(mod.mapping)}
],`
  })

  const result = `(function(modules){
function require(id) {
  const [fn, mapping] = modules[id];
  function localRequire(name) {
    return require(mapping[name])
  }
  const module = { exports: {} }
  fn(localRequire, module, module.exports);

  return module.exports;
}
require(0);
})({${modules}})
  `

  // write bundle
  await writeFile(`${out}/bundle.js`, result)
}
