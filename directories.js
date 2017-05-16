const path = require('path');

const SRC_DIR_NAME  = 'src';
const DIST_DIR_NAME = 'dist';

const ROOT_DIR = path.resolve(__dirname);
const SRC_DIR  = path.resolve(ROOT_DIR, SRC_DIR_NAME);
const DIST_DIR = path.resolve(ROOT_DIR, DIST_DIR_NAME);


const DIRECTORIES = module.exports = {
    SRC_DIR_NAME,
    DIST_DIR_NAME,
    ROOT_DIR,
    SRC_DIR,
    DIST_DIR,
};
