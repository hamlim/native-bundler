"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bundler = void 0;

var _getDependencyTree = require("./get-dependency-tree.js");

var _resolveExternalAssets = require("./resolve-external-assets.js");

var _transformAsset = require("./transform-asset.js");

var _fileSystem = require("./utils/file-system");

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
  const [fn, mapping] = modules[id];
  function localRequire(name) {
    return require(mapping[name])
  }
  const module = { exports: {} }
  fn(localRequire, module, module.exports);

  return module.exports;
}
require(0);
})({${modules}})
  `; // write bundle

  await (0, _fileSystem.writeFile)(`${out}/bundle.js`, result);
};

exports.bundler = bundler;