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
{}
],})
  