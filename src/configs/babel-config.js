/**
 * Default Babel Config
 *
 * This file exports a function which resolves a babel config
 * for transforming JS assets.
 */

export const defaultBabelConfig = ({ babel }) => {
  return {
    presets: babel.presets ? babel.presets : ['@babel/preset-env'],
    plugins: babel.plugins,
  }
}
