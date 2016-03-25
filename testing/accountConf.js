exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  capabilities: {
    'browserName': 'chrome'
  },
  specs: ['accountSpec.js'],
  jasmineNodeOpts: {
    showColors: true,
  },

};



//   capabilities: env.capabilities,
//
//   baseUrl: env.baseUrl + '/ng1/',
//
//   onPrepare: function() {
//     browser.driver.get(env.baseUrl + '/ng1/login.html');
//
//     browser.driver.findElement(by.id('username')).sendKeys('Jane');
//     browser.driver.findElement(by.id('password')).sendKeys('1234');
//     browser.driver.findElement(by.id('clickme')).click();
//
//     // Login takes some time, so wait until it's done.
//     // For the test app's login, we know it's done when it redirects to
//     // index.html.
//     return browser.driver.wait(function() {
//       return browser.driver.getCurrentUrl().then(function(url) {
//         return /index/.test(url);
//       });
//     }, 10000);
//   }
