/**
 * File System utils
 *
 * this file exports a few file system utils
 * they are thin wrappers around the fs module
 * that are promise based instead of callback based
 */

import fs from 'fs'
import util from 'util'

const { promisify } = util

export const readFile = promisify(fs.readFile)

export const writeFile = promisify(fs.writeFile)
