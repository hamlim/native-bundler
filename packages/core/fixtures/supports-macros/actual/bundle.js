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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = 1;
exports.default = _default;
},
{}
],})
  