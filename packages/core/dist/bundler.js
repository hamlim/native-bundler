"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bundler = void 0;

var _getDependencyTree = require("./get-dependency-tree.js");

var _resolveExternalAssets = require("./resolve-external-assets.js");

var _transformAsset = require("./transform-asset.js");

var _fileSystem = require("./utils/file-system");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const bundler = async ({
  entry,
  out,
  config: providedConfig = {},
  cache
} = {}) => {
  let config = _objectSpread({
    cacheExternals: true,
    babel: {
      presets: undefined,
      plugins: undefined
    }
  }, providedConfig);

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
    transformAsset: (0, _transformAsset.getAssetTransformer)(config)
  });
  let modules = '';
  tree.forEach(mod => {
    modules += `${mod.id}: [
function(require, module, exports) {
  ${mod.code}
},
${JSON.stringify(mod.mapping)}
],`;
  });
  const result = `(function(modules){
function require(id) {
  const mod = modules[id];
  if (typeof mod === 'undefined') {
    throw new Error('Attempted to import module that does not exist. Ensure peer dependencies are correctly imported.');
  }
  const [fn, mapping] = mod;
  function localRequire(name) {
    return require(mapping[name])
  }
  const module = { exports: {} }
  fn(localRequire, module, module.exports);

  return module.exports;
}
require(${tree[0].id});
})({${modules}})
  `; // write bundle

  await (0, _fileSystem.writeFile)(`${out}/bundle.js`, result);
};

exports.bundler = bundler;