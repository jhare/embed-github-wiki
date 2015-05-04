'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

describe('Given I have a test', function() {
  it('should fail on this call', function failTest(done) {
    expect('true').to.equal('false');
  });
});
