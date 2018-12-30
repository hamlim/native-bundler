"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUniversalImport = exports.isExternalImport = void 0;

/**
 * General Utility functions
 */
const isExternalImport = importPath => importPath.startsWith('http');

exports.isExternalImport = isExternalImport;

const isUniversalImport = importPath => !importPath.startsWith('.') || !importPath.startsWith('http');

exports.isUniversalImport = isUniversalImport;