"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exists = exports.stat = exports.makeDirectory = exports.writeFile = exports.readFile = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _util = _interopRequireDefault(require("util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * File System utils
 *
 * this file exports a few file system utils
 * they are thin wrappers around the fs module
 * that are promise based instead of callback based
 */
const {
  promisify
} = _util.default;
const readFile = promisify(_fs.default.readFile);
exports.readFile = readFile;

const writeFile = (path, data) => new Promise((resolve, reject) => {
  _fs.default.writeFile(path, data, err => {
    if (err) {
      reject(err);
    }

    resolve();
  });
});

exports.writeFile = writeFile;
const makeDirectory = promisify(_fs.default.mkdir);
exports.makeDirectory = makeDirectory;
const stat = promisify(_fs.default.stat);
exports.stat = stat;

const exists = filepath => Promise.resolve(_fs.default.existsSync(filepath));

exports.exists = exists;