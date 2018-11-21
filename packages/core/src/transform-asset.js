/**
 * Transform Asset
 *
 * This file will take in a config and then some metadata
 * about an asset and will transform it into code
 */

import { JS, MDX } from './get-asset-type.js'

import { plugin as JSPlugin } from '@native-bundler/plugin-js'
import { plugin as MDXPlugin } from '@native-bundler/plugin-mdx'

export const transformAsset = (config = {}) => async ({
  source,
  filename,
  ast,
  isExternal,
  assetType,
}) => {
  // @TODO determine if we want to actually handle external
  // assets here or not
  // we could leave it up to the plugin to decide I guess
  if (isExternal) {
    return Promise.resolve({ code: source })
  }
  switch (assetType.type) {
    case JS: {
      return JSPlugin({
        source,
        config,
      })
    }
    case MDX: {
      return MDXPlugin({
        source,
        config,
      })
    }
    default: {
      return Promise.resolve({ code: '' })
    }
  }
}
