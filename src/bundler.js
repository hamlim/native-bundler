/**
 * Initial module of the native-bundler package
 *
 * In here we need to do a few things:
 *
 * 1. Define a bundler function that we will export
 * 2. Call out to other transformation functions
 */

import { getDependencyTree } from './get-dependency-tree.js'

export const bundler = async ({ entry, out }) => {
  const dependencyTree = getDependencyTree(entry)
}
