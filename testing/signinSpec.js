describe('TownHall SignUp', function() {
  it('should create user and go to profile page', function() {
    // navigates to the sign in page
    browser.get('http://localhost:3000/#/signin');

    // fills in the sign in form fields
    element(by.model('user.email')).sendKeys('jeff@boss.com');
    element(by.model('user.password')).sendKeys('123');

    // clicks the sign in button
    element(by.id('signIn')).click();

    // waits for page to load and checks that the browser goes to the profile page
    browser.sleep(3000);

    // checks that the url is the profile page
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/profile');
  });
});
