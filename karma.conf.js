module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['mocha', 'chai'],
		files: [
			'src/dont-track-me.js',
			'test/*.js'
		],
		exclude: [
		],
		client: {
			mocha: {
				reporter: 'html'
			}
		},
		preprocessors: {
			'src/dont-track-me.js': ['coverage']
		},
		reporters: ['progress', 'coverage'],
		coverageReporter: {
			type: 'lcovonly',
			dir: 'coverage',
			subdir: '.'
		},
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['FirefoxHeadless'],
		customLaunchers: {
			FirefoxHeadless: {
				base: 'Firefox',
				flags: ['-headless']
			}
		},
		singleRun: true,
		concurrency: Infinity
	});
};
