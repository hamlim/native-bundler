"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultBabelConfig = void 0;

/**
 * Default Babel Config
 *
 * This file exports a function which resolves a babel config
 * for transforming JS assets.
 */
const defaultBabelConfig = ({
  babel
}) => {
  return {
    presets: babel.presets ? babel.presets : ['@babel/preset-env'],
    plugins: babel.plugins
  };
};

exports.defaultBabelConfig = defaultBabelConfig;