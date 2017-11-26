describe('base-utility.js', function(){
    describe('equals', function() {
        it('Return true on match, false on fail', function() {
          val = Utility.equals(NaN, NaN); expect(val).to.equal(true);
          val = Utility.equals(5, 5); expect(val).to.equal(true);
          val = Utility.equals(3, 4); expect(val).to.equal(false);
        });
      });
});