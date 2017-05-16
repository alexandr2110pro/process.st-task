let path        = require('path');
let { SRC_DIR } = require('./directories');

let MAIN_ENTRY = path.join(SRC_DIR, 'main.js');

module.exports = {
    main: ['babel-polyfill', MAIN_ENTRY],
    dependencies: path.resolve(SRC_DIR, 'main.dependencies.js'),
    vendor: path.resolve(SRC_DIR, 'shared/vendor-modules/index.js'),
};
