/**
 * Takes an array of Dirent objects (like the output of readdir)
 * and returns an array of the directories if any. Otherwise returns false.
 */
const containsSub = directory => {
    const hasSub = directory.filter(item => item.isDirectory());
    if (hasSub.length) { return hasSub }
    return false;
}

module.exports = containsSub;