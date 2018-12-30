"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAssetTransformer = getAssetTransformer;

var _getAssetType = require("./get-asset-type.js");

var _pluginJs = require("@native-bundler/plugin-js");

var _pluginMdx = require("@native-bundler/plugin-mdx");

var _pluginCss = require("@native-bundler/plugin-css");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getAssetTransformer(config = {}) {
  return async function transformAsset({
    source,
    filename,
    ast,
    isExternal,
    assetType
  }) {
    if (isExternal && !(0, _getAssetType.shouldTransformExternals)(filename, assetType.type)) {
      return Promise.resolve({
        code: source
      });
    }

    switch (assetType.type) {
      case _getAssetType.JS:
        {
          return (0, _pluginJs.plugin)({
            source,
            config: _objectSpread({}, config, {
              babelConfig: _objectSpread({}, config.babelConfig || {}, {
                filename
              })
            })
          });
        }

      case _getAssetType.MDX:
        {
          return (0, _pluginMdx.plugin)({
            source,
            config: _objectSpread({}, config, {
              babelConfig: _objectSpread({}, config.babelConfig || {}, {
                filename
              })
            })
          });
        }

      case _getAssetType.CSS:
        {
          return (0, _pluginCss.plugin)({
            source,
            config: _objectSpread({}, config, {
              filename
            })
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
}