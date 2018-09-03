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
import fs from 'fs'

import { readFile } from './utils/file-system.js'

let COUNTER = 0

const makeAsset = async filename => {
  const content = await readFile(filename, 'utf-8')
  const ast = babylon.parse(content, {
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

export const getDependencyTree = inputPath => {}
