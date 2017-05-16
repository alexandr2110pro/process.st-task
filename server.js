const express       = require('express');
const DIST_DIR_NAME = require('./directories').DIST_DIR_NAME;

const cfenv = require('cfenv');
const app   = express();

app.use(express.static(__dirname + '/' + DIST_DIR_NAME));

const appEnv = cfenv.getAppEnv();

app.listen(appEnv.port, '0.0.0.0', function() {

    console.log('server starting on ' + appEnv.url);
});
