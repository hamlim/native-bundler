/**
 * Transform Asset
 *
 * This file will take in a config and then some metadata
 * about an asset and will transform it into code
 */

import { JS } from './get-asset-type.js'

import { transformFromAstAsync } from '@babel/core'

import { defaultBabelConfig } from './configs/babel-config.js'

export const transformAsset = (config = {}) => async ({
  filename,
  ast,
  isExternal,
  assetType,
}) => {
  if (isExternal) {
    return Promise.resolve({ code: '' })
  }
  switch (assetType.type) {
    case JS: {
      const babelConfig = defaultBabelConfig(config)

      return transformFromAstAsync(ast, null, babelConfig)
    }
    default: {
      return Promise.resolve({ code: '' })
    }
  }
}
