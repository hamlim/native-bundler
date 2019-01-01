"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = void 0;

var _core = require("@babel/core");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const plugin = async ({
  source,
  config: userConfig
}) => {
  // default babel config
  let config = {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: ['macros'] // if the user provided a `babelConfig` object in their native-bundler
    // config then we want to extract those

  };

  if (typeof userConfig.babelConfig !== 'undefined') {
    // we pull off plugins and presets
    // and initialize them to the default config above
    let _userConfig$babelConf = userConfig.babelConfig,
        {
      presets = config.presets,
      plugins = config.plugins
    } = _userConfig$babelConf,
        rest = _objectWithoutProperties(_userConfig$babelConf, ["presets", "plugins"]); // re-assign the config the new values


    config.presets = presets;
    config.plugins = plugins;
    config = _objectSpread({}, config, rest);
  } // return a promise with code, map, and an ast
  // note that the @native-bundler/core module
  // will only care about the code and the map
  // values


  return (0, _core.transformAsync)(source, config);
};

exports.plugin = plugin;