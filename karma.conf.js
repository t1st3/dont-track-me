module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'src/dont-track-me.js',
      'test/dont-track-me.test.js'
    ],
    exclude: [
    ],
    client: {
      mocha: {
        reporter: 'html',
      },
    },
    preprocessors: {
    },
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Firefox', 'Chromium'],
    singleRun: true,
    concurrency: Infinity,
  });
};
