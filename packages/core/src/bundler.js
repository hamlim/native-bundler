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

  console.log(tree)
}
