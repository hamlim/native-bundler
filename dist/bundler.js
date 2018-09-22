"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bundler = void 0;

var _getDependencyTree = require("./get-dependency-tree.js");

var _resolveExternalAssets = require("./resolve-external-assets.js");

var _transformAsset = require("./transform-asset.js");

/**
 * Initial module of the native-bundler package
 *
 * In here we need to do a few things:
 *
 * 1. Define a bundler function that we will export
 * 2. Call out to other transformation functions
 */
const bundler = async ({
  entry,
  out,
  config = {
    cacheExternals: true,
    babel: {
      presets: undefined,
      plugins: undefined
    }
  },
  cache
} = {}) => {
  const {
    tree
  } = await (0, _getDependencyTree.getDependencyTree)({
    inputPath: entry,
    resolveExternalAsset: (0, _resolveExternalAssets.resolveExternalAssets)({
      config,
      cache,
      out
    }),
    config,
    transformAsset: (0, _transformAsset.transformAsset)(config)
  });
  console.log(tree);
};

exports.bundler = bundler;