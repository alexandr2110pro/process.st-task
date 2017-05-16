import angular from 'angular';
import mocks from 'angular-mocks';

const context = require.context('.', true, /\.spec\.js$/);
context.keys().forEach(context);

// require all `project/test/src/components/**/index.js`
// const testsContext = require.context('./src/components/', true, /index\.js$/);
//
// testsContext.keys().forEach(testsContext);

// require all `project/src/components/**/index.js`
// const componentsContext = require.context('../src/components/', true, /index\.js$/);
//
// componentsContext.keys().forEach(componentsContext);
