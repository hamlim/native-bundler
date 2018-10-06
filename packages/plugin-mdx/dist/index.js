"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = void 0;

var _core = require("@babel/core");

var _mdx = _interopRequireDefault(require("@mdx-js/mdx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Entry point for the MDX transformer plugin for
 * the native bundler application.
 *
 * The intent is to take in a raw string of mdx code and
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

  let mdxConfig = userConfig.mdxConfig || {};
  let code = await (0, _mdx.default)(source, mdxConfig); // return a promise with code, map, and an ast
  // note that the @native-bundler/core module
  // will only care about the code and the map
  // values

  return (0, _core.transformAsync)(`import React from 'react'; import { MDXTag } from '@mdx-js/tag'; ${code}`, babelConfig);
};

exports.plugin = plugin;