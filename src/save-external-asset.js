/**
 * Save external assets
 *
 * This file exports a function that takes in
 * a path to an asset, something like https://unpkg.com/react@16.5.1/umd/react.production.min.js
 * downloads that asset into the `_vendor_` directory
 * then returns the created time for the asset and the local path to the asset
 */

import { writeFile, makeDirectory, stat } from './utils/file-system.js'
import fetch from 'node-fetch'

const getAssetName = assetPath => {
  const splitOnSlash = assetPath.split('/')
  const { [splitOnSlash.length - 1]: last } = splitOnSlash
  return last
}

export const saveExternalAsset = async ({ assetPath }) => {
  if (!assetPath.startsWith('https') && !assetPath.startsWith('http')) {
    // if the asset doesn't begin with `http(s)` then resolve with an Error
    // We don't throw here to avoid try catch blocks in parent contexts
    return Promise.resolve({
      error: new Error(
        `Asset Path does not begin with https or http. Asset Path: ${assetPath}.`,
      ),
    })
  } else {
    // the path is validated, we can attempt to fetch it
    const name = getAssetName(assetPath)
    try {
      const response = await fetch(assetPath)
      const body = await response.text()
      await makeDirectory('_vendor_')
      const filepath = `./_vendor_/${name}`
      await writeFile(filepath)
      const { birthtime } = await stat(filePath)
      return Promise.resolve({
        birthtime,
        name,
        filepath,
      })
    } catch (error) {
      return Promise.resolve({
        error,
      })
    }
  }
}
