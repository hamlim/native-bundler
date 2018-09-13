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
let COUNTER = 0; // @TODO
// Right now this is only handling Javascript assets
// This should also handle CSS, TXT, HTML, and SVG assets as well
// this should probably be a point where we can inject plugins

const makeAsset = async filename => {
  const content = await (0, _fileSystem.readFile)(filename, 'utf-8');
  const ast = (0, _babylon.parse)(content, {
    sourceType: 'module'
  });
  const dependencies = [];
  (0, _traverse.default)(ast, {
    ImportDeclaration({
      node
    }) {
      dependencies.push(node.source.value);
    }

  });
  const id = COUNTER++;
  return {
    id,
    filename,
    dependencies
  };
};

const getDependencyTree = async (inputPath, resolveExternalAsset) => {
  // console.log('Here?')
  const entryAsset = await makeAsset(inputPath);
  const externalPaths = [];
  const queue = [entryAsset];

  for (const asset of queue) {
    asset.mapping = {};

    const dirname = _path.default.dirname(asset.filename);

    console.log(dirname);

    for (const depPath of asset.dependencies) {
      let absolutePath;

      if ((0, _index.isExternalImport)(depPath)) {
        const relativePath = await resolveExternalAsset(depPath);
        console.log(relativePath);
        absolutePath = _path.default.join(dirname, relativePath);
      } else {
        absolutePath = _path.default.join(dirname, depPath);
      } // console.log(absolutePath)


      const child = await makeAsset(absolutePath);
      asset.mapping[depPath] = child.id;
      queue.push(child);
    }
  }

  console.log(queue);
  return {
    tree: queue,
    externalPaths
  };
};

exports.getDependencyTree = getDependencyTree;