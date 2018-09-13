/**
 * Initial module of the native-bundler package
 *
 * In here we need to do a few things:
 *
 * 1. Define a bundler function that we will export
 * 2. Call out to other transformation functions
 */

import { getDependencyTree } from './get-dependency-tree.js'
import {resolveExternalAssets } from './resolve-external-assets.js';

export const bundler = async ({ entry, out, config, cache }) => {
  const {tree} = await getDependencyTree(entry, resolveExternalAssets({config, cache}));

})