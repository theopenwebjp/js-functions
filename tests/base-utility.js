const BaseUtility = require('../src/base-utility');

describe('base-utility.js', function(){
    describe('equals', function() {
        it('Return true on match, false on fail', function() {
          val = BaseUtility.equals(NaN, NaN); expect(val).to.equal(true);
          val = BaseUtility.equals(5, 5); expect(val).to.equal(true);
          val = BaseUtility.equals(3, 4); expect(val).to.equal(false);
        });
      });
});