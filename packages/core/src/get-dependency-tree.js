/**
 * Get Dependency Tree
 *
 * This file is heavily inspired by/copied from [minipack](https://github.com/ronami/minipack/blob/master/src/minipack.js)
 *
 * The aim is to take in an input path (this should be a string that is the path to the entry module)
 * create an array of modules (an object that represents the import path)
 * iterate through that array, whenever we find more imports we push those onto the queue
 */

import traverse from '@babel/traverse'
import { parse } from 'babylon'
import fs from 'fs'
import path from 'path'

import { readFile } from './utils/file-system.js'
import { isExternalImport } from './utils/index.js'
import { getAssetType, JS } from './get-asset-type.js'

let COUNTER = 0

// @TODO
// Right now this is only handling Javascript assets
// This should also handle CSS, TXT, HTML, and SVG assets as well
// this should probably be a point where we can inject plugins
const makeAsset = async ({
  filename,
  isExternal = false,
  transformAsset,
} = {}) => {
  const content = await readFile(filename, 'utf-8')
  const assetType = getAssetType(filename)

  let ast = null
  let dependencies = []

  if (assetType.type === JS) {
    ast = parse(content, {
      sourceType: 'module',
    })
    traverse(ast, {
      ImportDeclaration({ node }) {
        dependencies.push(node.source.value)
      },
    })
  }

  const id = COUNTER++

  const { code } = await transformAsset({
    source: content,
    filename,
    ast,
    isExternal,
    assetType,
  })

  return {
    id,
    filename,
    dependencies,
    isExternal,
    code,
  }
}

export const getDependencyTree = async ({
  inputPath,
  resolveExternalAsset,
  config,
  transformAsset,
}) => {
  const entryAsset = await makeAsset({
    filename: inputPath,
    isExternal: false,
    transformAsset,
  })

  const externalPaths = []

  const queue = [entryAsset]

  // Crawl through the dependencies and create a mapping of them
  for (const asset of queue) {
    asset.mapping = {}
    const dirname = path.dirname(asset.filename)
    for (const depPath of asset.dependencies) {
      let absolutePath,
        isExternal = false
      if (isExternalImport(depPath) && config.cacheExternals) {
        isExternal = true
        absolutePath = await resolveExternalAsset(depPath)
      } else {
        absolutePath = path.join(dirname, depPath)
      }
      const child = await makeAsset({
        filename: absolutePath,
        isExternal,
        transformAsset,
      })
      if (isExternal) {
        externalPaths.push({
          depPath,
          absolutePath,
          linkedId: asset.id,
          ownId: child.id,
        })
      }
      asset.mapping[depPath] = child.id
      queue.push(child)
    }
  }

  // Go through the external assets and remap the original assets
  // to import from the new path
  for (const externalAsset of externalPaths) {
    const { linkedId, absolutePath, depPath, ownId } = externalAsset
    const linkedAssets = queue.filter(asset => asset.id === linkedId)
    linkedAssets.forEach(asset => {
      if (asset.mapping[depPath]) {
        asset.mapping[absolutePath] = ownId
        delete asset.mapping[depPath]
      }
      const assetDep = asset.dependencies.findIndex(dep => dep === depPath)
      if (assetDep !== -1) {
        asset.dependencies.splice(assetDep, 1, absolutePath)
      }
    })
  }

  console.log(queue)

  return {
    tree: queue,
    externalPaths,
  }
}
