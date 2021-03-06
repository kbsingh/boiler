var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
  dest: 'target/screenshots',
  filename: 'my-report.html',
  reportOnlyFailedSpecs: false,
  captureOnlyFailedSpecs: true
});

exports.config = {
    useAllAngular2AppRoots: true,
    getPageTimeout: 30000,
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['src/tests/**/*.spec.js'],

multiCapabilities: [
	{ 
        'browserName': 'firefox',
        'firefox.binary': "/usr/bin/firefox",
        'firefox.cli.args': ['--webdriver-loglevel=ERROR', '--local-storage-path=/tmp/phantom_' + Math.random()]
 	},

	{ 
        'browserName': 'chrome',
        'firefox.binary': "/usr/bin/chrome",
        'firefox.cli.args': ['--webdriver-loglevel=ERROR', '--local-storage-path=/tmp/phantom_' + Math.random()]
 	},

	{
        'browserName': 'phantomjs',
        'phantomjs.binary.path': require('phantomjs').path,
        'phantomjs.cli.args': ['--webdriver-loglevel=ERROR', '--local-storage-path=/tmp/phantom_' + Math.random()]
	}   

	],
maxSessions: 1,

  // Setup the report before any tests start
  beforeLaunch: function() {
    return new Promise(function(resolve){
      reporter.beforeLaunch(resolve);
    });
  },

  // Assign the test reporter to each running instance
  onPrepare: function() {
    jasmine.getEnv().addReporter(reporter);
  },

  // Close the report after all tests finish
  afterLaunch: function(exitCode) {
    return new Promise(function(resolve){
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  }

}
