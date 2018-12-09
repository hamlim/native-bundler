"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = void 0;

var _core = require("@babel/core");

var _autoprefixer = _interopRequireDefault(require("autoprefixer"));

var _postcss = _interopRequireDefault(require("postcss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Entry point for the CSS transformer plugin for
 * the native bundler application.
 *
 * The intent is to take in a raw string of CSS code and
 * parse it, and return a transformed string of js code.
 */
const plugin = async ({
  source,
  config: userConfig
}) => {
  // default babel config
  let babelConfig = {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [] // if the user provided a `babelConfig` object in their native-bundler
    // config then we want to extract those

  };

  if (typeof userConfig.babelConfig !== 'undefined') {
    // we pull off plugins and presets
    // and initialize them to the default config above
    let {
      presets = babelConfig.presets,
      plugins = babelConfig.plugins
    } = userConfig.babelConfig; // re-assign the config the new values

    babelConfig.presets = presets;
    babelConfig.plugins = plugins;
  }

  let autoprefixerConfig = userConfig.autoprefixer || {};
  const prefixer = (0, _autoprefixer.default)(autoprefixerConfig);
  const processor = (0, _postcss.default)([prefixer]);
  const result = await processor.process(source, {
    from: undefined
  }); // return a promise with code, map

  return (0, _core.transformAsync)(`export default \`${result.css}\``, babelConfig);
};

exports.plugin = plugin;