const tests = './src/**/*.spec.js';

module.exports = config => {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],

        files: [
            { pattern: 'src/karma.entry.js', watched: false },
        ],

        preprocessors: {
            'src/karma.entry.js': ['webpack', 'sourcemap'],
        },

        webpack: require('./webpack.test'),
        webpackServer: {
            noInfo: true,
        },

        port: 9876,
        reporters: ['mocha', 'coverage-istanbul'],
        coverageIstanbulReporter: {
            reports: ['lcovonly', 'text-summary', 'html'],
            fixWebpackSourcePaths: true,
        },
        autoWatch: false,
        singleRun: true,
        colors: true,
        logLevel: config.LOG_INFO,
    });
};
