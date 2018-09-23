"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveExternalAssets = void 0;

var _saveExternalAsset = require("./save-external-asset.js");

/**
 * Resolve external assets
 *
 * This file exports a function that takes in
 * a config and a cache, and returns a function that accepts
 * absolute url paths to assets.
 *
 * It should then check the cache (and config) to determine
 * if the asset has already been locally cached and return that
 * otherwise it downloads the asset and returns the path to the
 * asset
 */
// @TODO support plugins to pass in `resolveAssetType`
// to save external asset
const resolveExternalAssets = ({
  config,
  cache
}) => async assetPath => {
  // @TODO Revisit to see if we need to provide the config here
  // we could flush the cache before calling this method if we want
  // to force a full asset download
  // if (!config.flush)
  // If the cache contains the asset
  if (cache.has(assetPath)) {
    // return the path from the cached asset
    const cachedAsset = cache.get(assetPath);
    return Promise.resolve(cachedAsset.localPath);
  } else {
    const {
      filepath: localPath,
      birthtime: createdTime,
      name: filename
    } = await (0, _saveExternalAsset.saveExternalAsset)({
      assetPath
    });
    cache.set(assetPath, {
      localPath,
      createdTime,
      assetPath,
      filename
    });
    return Promise.resolve(localPath);
  }
};

exports.resolveExternalAssets = resolveExternalAssets;