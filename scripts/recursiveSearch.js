'use strict'
/**
 * Searches through a given directory and executes a given function
 * on all of the files in all of the directories.
 */

module.exports = async function recursiveSearch(somePath, someFunc) {
  const containsSub = require('./containsSub');
  const { readdir } = require('fs');
  const { join } = require('path');

  readdir(somePath, { withFileTypes: true }, (err, files) => {
    if (err) return someFunc(err)

    const hasSub = containsSub(files);
    if (hasSub) {
      for (const sub of hasSub) {
        recursiveSearch(join(somePath, sub.name), someFunc);
      }
    }
    someFunc(err, somePath, files);
  });
};
