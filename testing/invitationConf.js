exports.config = {

  // sets jasmine framework
  framework: 'jasmine',

  // sets up selenium server
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // runs test with chrome
  capabilities: {
    'browserName': 'chrome'
  },

  // specifies test spec file
  specs: ['invitationSpec.js'],
  onPrepare: function() {
    var SpecReporter = require('jasmine-spec-reporter');
    // adds jasmine spec reporter
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
  }
};
