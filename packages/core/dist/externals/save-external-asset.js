"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveExternalAsset = saveExternalAsset;

var _fileSystem = require("../utils/file-system.js");

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Save external assets
 *
 * This file exports a function that takes in
 * a path to an asset, something like https://unpkg.com/react@16.5.1/umd/react.production.min.js
 * downloads that asset into the `_vendor_` directory
 * then returns the created time for the asset and the local path to the asset
 */
const getAssetName = assetPath => {
  const splitOnSlash = assetPath.split('/');
  const {
    [splitOnSlash.length - 1]: last
  } = splitOnSlash;
  return last.split('?')[0];
};

async function saveExternalAsset({
  assetPath,
  outputDirectory
}) {
  if (!assetPath.startsWith('https://') && !assetPath.startsWith('http://')) {
    // if the asset doesn't begin with `http(s)` then resolve with an Error
    // We don't throw here to avoid try catch blocks in parent contexts
    return Promise.resolve({
      error: new Error(`Asset Path does not begin with https or http. Asset Path: ${assetPath}.`)
    });
  } else {
    // the path is validated, we can attempt to fetch it
    const name = getAssetName(assetPath);

    try {
      const response = await (0, _nodeFetch.default)(assetPath);
      const body = await response.text();
      const vendorDirectory = `${outputDirectory}/_vendor_`;
      const directoryExists = await (0, _fileSystem.exists)(vendorDirectory);

      if (!directoryExists) {
        await (0, _fileSystem.makeDirectory)(vendorDirectory);
      }

      const filepath = `${vendorDirectory}/${name}`;
      await (0, _fileSystem.writeFile)(filepath, body);

      const absolutePath = _path.default.resolve(process.cwd(), filepath);

      const {
        birthtime
      } = await (0, _fileSystem.stat)(absolutePath);
      return Promise.resolve({
        birthtime,
        name,
        filepath
      });
    } catch (error) {
      return Promise.resolve({
        error
      });
    }
  }
}