"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformAsset = void 0;

var _getAssetType = require("./get-asset-type.js");

var _core = require("@babel/core");

var _babelConfig = require("./configs/babel-config.js");

/**
 * Transform Asset
 *
 * This file will take in a config and then some metadata
 * about an asset and will transform it into code
 */
const transformAsset = (config = {}) => async ({
  filename,
  ast,
  isExternal,
  assetType
}) => {
  if (isExternal) {
    return Promise.resolve({
      code: ''
    });
  }

  switch (assetType.type) {
    case _getAssetType.JS:
      {
        const babelConfig = (0, _babelConfig.defaultBabelConfig)(config);
        return (0, _core.transformFromAstAsync)(ast, null, babelConfig);
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