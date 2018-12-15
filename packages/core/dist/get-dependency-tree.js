"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDependencyTree = void 0;

var _traverse = _interopRequireDefault(require("@babel/traverse"));

var _babylon = require("babylon");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _fileSystem = require("./utils/file-system.js");

var _index = require("./utils/index.js");

var _getAssetType = require("./get-asset-type.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get Dependency Tree
 *
 * This file is heavily inspired by/copied from [minipack](https://github.com/ronami/minipack/blob/master/src/minipack.js)
 *
 * The aim is to take in an input path (this should be a string that is the path to the entry module)
 * create an array of modules (an object that represents the import path)
 * iterate through that array, whenever we find more imports we push those onto the queue
 */
// Global module id counter
let COUNTER = 0; // @TODO
// Right now this is only handling Javascript assets
// This should also handle CSS, TXT, HTML, and SVG assets as well
// this should probably be a point where we can inject plugins

const makeAsset = async ({
  filename,
  isExternal = false,
  transformAsset
} = {}) => {
  const content = await (0, _fileSystem.readFile)(filename, 'utf-8');
  const assetType = (0, _getAssetType.getAssetType)(filename);
  let ast = null;
  let dependencies = [];

  if (assetType.type === _getAssetType.JS && !isExternal) {
    ast = (0, _babylon.parse)(content, {
      sourceType: 'module'
    });
    (0, _traverse.default)(ast, {
      ImportDeclaration({
        node
      }) {
        dependencies.push(node.source.value);
      }

    });
  }

  const id = COUNTER++;
  const {
    code
  } = await transformAsset({
    source: content,
    filename,
    ast,
    isExternal,
    assetType
  });
  return {
    id,
    filename,
    dependencies,
    isExternal,
    code
  };
};

const getDependencyTree = async ({
  inputPath,
  resolveExternalAsset,
  config,
  transformAsset
}) => {
  const entryAsset = await makeAsset({
    filename: inputPath,
    isExternal: false,
    transformAsset
  });
  const externalPaths = [];
  const queue = [entryAsset]; // Crawl through the dependencies and create a mapping of them

  for (const asset of queue) {
    asset.mapping = {};

    const dirname = _path.default.dirname(asset.filename);

    for (const depPath of asset.dependencies) {
      let absolutePath,
          isExternal = false;

      if ((0, _index.isExternalImport)(depPath) && config.cacheExternals) {
        isExternal = true;
        absolutePath = await resolveExternalAsset(depPath);
      } else {
        absolutePath = _path.default.join(dirname, depPath);
      }

      const child = await makeAsset({
        filename: absolutePath,
        isExternal,
        transformAsset
      });

      if (isExternal) {
        asset.code = asset.code.replace(depPath, absolutePath);
        externalPaths.push({
          depPath,
          absolutePath,
          linkedId: asset.id,
          ownId: child.id
        });
      }

      asset.mapping[depPath] = child.id;
      queue.push(child);
    }
  } // Go through the external assets and remap the original assets
  // to import from the new path


  for (const externalAsset of externalPaths) {
    const {
      linkedId,
      absolutePath,
      depPath,
      ownId
    } = externalAsset;
    const linkedAssets = queue.filter(asset => asset.id === linkedId);
    linkedAssets.forEach(asset => {
      if (asset.mapping[depPath]) {
        asset.mapping[absolutePath] = ownId;
        delete asset.mapping[depPath];
      }

      const assetDep = asset.dependencies.findIndex(dep => dep === depPath);

      if (assetDep !== -1) {
        asset.dependencies.splice(assetDep, 1, absolutePath);
      }
    });
  }

  return {
    tree: queue,
    externalPaths
  };
};

exports.getDependencyTree = getDependencyTree;