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

let COUNTER = 0

// @TODO
// Right now this is only handling Javascript assets
// This should also handle CSS, TXT, HTML, and SVG assets as well
// this should probably be a point where we can inject plugins
const makeAsset = async filename => {
  const content = await readFile(filename, 'utf-8')
  const ast = parse(content, {
    sourceType: 'module',
  })

  const dependencies = []

  traverse(ast, {
    ImportDeclaration({ node }) {
      dependencies.push(node.source.value)
    },
  })

  const id = COUNTER++

  return {
    id,
    filename,
    dependencies,
  }
}

export const getDependencyTree = async (inputPath, resolveExternalAsset) => {
  // console.log('Here?')
  const entryAsset = await makeAsset(inputPath)

  const externalPaths = []

  const queue = [entryAsset]

  for (const asset of queue) {
    asset.mapping = {}
    const dirname = path.dirname(asset.filename)
    console.log(dirname)
    for (const depPath of asset.dependencies) {
      let absolutePath
      if (isExternalImport(depPath)) {
        const relativePath = await resolveExternalAsset(depPath)
        console.log(relativePath)
        absolutePath = path.join(dirname, relativePath)
      } else {
        absolutePath = path.join(dirname, depPath)
      }
      // console.log(absolutePath)
      const child = await makeAsset(absolutePath)
      asset.mapping[depPath] = child.id
      queue.push(child)
    }
  }

  console.log(queue)

  return {
    tree: queue,
    externalPaths,
  }
}
