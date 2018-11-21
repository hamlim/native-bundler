"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformAsset = void 0;

var _getAssetType = require("./get-asset-type.js");

var _pluginJs = require("@native-bundler/plugin-js");

var _pluginMdx = require("@native-bundler/plugin-mdx");

/**
 * Transform Asset
 *
 * This file will take in a config and then some metadata
 * about an asset and will transform it into code
 */
const transformAsset = (config = {}) => async ({
  source,
  filename,
  ast,
  isExternal,
  assetType
}) => {
  // @TODO determine if we want to actually handle external
  // assets here or not
  // we could leave it up to the plugin to decide I guess
  if (isExternal) {
    return Promise.resolve({
      code: source
    });
  }

  switch (assetType.type) {
    case _getAssetType.JS:
      {
        return (0, _pluginJs.plugin)({
          source,
          config
        });
      }

    case _getAssetType.MDX:
      {
        return (0, _pluginMdx.plugin)({
          source,
          config
        });
      }

    default:
      {
        return Promise.resolve({
          code: ''
        });
      }
  }
};

exports.transformAsset = transformAsset;