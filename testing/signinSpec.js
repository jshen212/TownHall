describe('TownHall SignUp', function() {
  it('should create user and go to profile page', function() {
    browser.get('http://localhost:3000/#/signin');
    element(by.model('user.email')).sendKeys('jeff@boss.com');
    element(by.model('user.password')).sendKeys('123');

    element(by.id('signIn')).click();

    setTimeout(function() {
      expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/profile');
    }, 3000);
  });
});
