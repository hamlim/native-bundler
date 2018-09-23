"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAssetType = exports.TXT = exports.CSS = exports.HTML = exports.SVG = exports.JS = void 0;

/**
 * Asset Types
 *
 * This file handles the logic around categorizing asset
 * types.
 *
 * Assets are categorized by their query param
 * If they don't have a query param then we
 * default to treating them as JS assets.
 */
const JS = 'js';
exports.JS = JS;
const SVG = 'svg';
exports.SVG = SVG;
const HTML = 'html';
exports.HTML = HTML;
const CSS = 'css';
exports.CSS = CSS;
const TXT = 'txt';
exports.TXT = TXT;

const getAssetType = assetPath => {
  const queryParam = assetPath.split('?nb=')[1];

  switch (queryParam) {
    case JS:
      {
        return {
          type: JS,
          extension: '.js'
        };
      }

    case HTML:
      {
        return {
          type: HTML,
          extension: '.html'
        };
      }

    case SVG:
      {
        return {
          type: SVG,
          extension: '.svg'
        };
      }

    case TXT:
      {
        return {
          type: TXT,
          extension: '.txt'
        };
      }

    case CSS:
      {
        return {
          type: CSS,
          extension: '.css'
        };
      }

    default:
      {
        return {
          type: JS,
          extension: '.js'
        };
      }
  }
};

exports.getAssetType = getAssetType;