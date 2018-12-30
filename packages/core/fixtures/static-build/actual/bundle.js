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
exports.default = App;

var _reactProductionMin = _interopRequireDefault(require("https://unpkg.com/react@16.5.1/umd/react.production.min.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_reactProductionMin.default.version);

function App() {
  return _reactProductionMin.default.createElement("h1", null, "Hi");
}
},
{}
],})
  