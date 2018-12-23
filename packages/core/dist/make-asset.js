"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assetGenerator = void 0;

var _traverse = _interopRequireDefault(require("@babel/traverse"));

var _babylon = require("babylon");

var _fileSystem = require("./utils/file-system.js");

var _getAssetType = require("./get-asset-type.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @TODO
// Right now this is only handling Javascript assets
// This should also handle CSS, TXT, HTML, and SVG assets as well
// this should probably be a point where we can inject plugins
const assetGenerator = () => {
  let COUNTER = 0;
  return async function makeAsset({
    filename,
    isExternal = false,
    transformAsset
  } = {}) {
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
    let code;

    try {
      ;
      ({
        code
      } = await transformAsset({
        source: content,
        filename,
        ast,
        isExternal,
        assetType
      }));
    } catch (e) {
      console.error(e.message);
      return Promise.resolve({
        id: -1,
        filename: '',
        dependencies: [],
        isExternal: false,
        code: ''
      });
    }

    return {
      id,
      filename,
      dependencies,
      isExternal,
      code
    };
  };
};

exports.assetGenerator = assetGenerator;