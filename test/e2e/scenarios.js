'use strict';

describe('angular-todo', function() {

  beforeEach(function() {
    browser().navigateTo('../../views/index.ejs');
  });

  // unnecesary test, but trying out e2e tests since I have no routes
  it ('should not redirect', function() {
    expect(browser().location().url()).toBe('');
  });

  xit('should skip this e2e test', function() {
    sleep(2);
  });
});