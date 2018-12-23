(function(modules){
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
require(0);
})({0: [
function(require, module, exports) {
  "use strict";

var _localMdxFile = _interopRequireDefault(require("./local-mdx-file.mdx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_localMdxFile.default);
},
{"./local-mdx-file.mdx":1}
],1: [
function(require, module, exports) {
  "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _tag = require("@mdx-js/tag");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var _default = function _default(_ref) {
  var components = _ref.components,
      props = _objectWithoutProperties(_ref, ["components"]);

  return _react.default.createElement(_tag.MDXTag, {
    name: "wrapper",
    components: components
  }, _react.default.createElement(_tag.MDXTag, {
    name: "h1",
    components: components
  }, "MDX Content"), _react.default.createElement("p", null, "Cool!"), _react.default.createElement(_tag.MDXTag, {
    name: "p",
    components: components
  }, _react.default.createElement(_tag.MDXTag, {
    name: "del",
    components: components,
    parentName: "p"
  }, "strikethrough")), _react.default.createElement(_tag.MDXTag, {
    name: "pre",
    components: components
  }, _react.default.createElement(_tag.MDXTag, {
    name: "code",
    components: components,
    parentName: "pre",
    props: {
      "className": "language-jsx",
      "metaString": ""
    }
  }, "<code>\n  snippets too!\n</code>\n")));
};

exports.default = _default;
},
{}
],})
  