const BaseObjectHelper = require('../src/base-object-helper');

var chai = require('chai');
var expect = require('chai').expect;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var jsDom = new JSDOM('');
var document = jsDom.window.document;

var val;

describe('base-object-helper.js', function(){
    describe('#isNonDomObject()', function() {
        it('Traversible object that is not DOM type', function() {
          expect(BaseObjectHelper.isNonDomObject(null)).to.equal(false);
          expect(BaseObjectHelper.isNonDomObject(document.createElement("input"))).to.equal(false);
          expect(BaseObjectHelper.isNonDomObject("hello")).to.equal(false);
          expect(BaseObjectHelper.isNonDomObject([1, 2])).to.equal(false);
          expect(BaseObjectHelper.isNonDomObject({a: 1})).to.equal(true);
        });
      });

      describe('#expandCommonObjectIntoObject()', function() {
        it('Expands object/array into existing object/array', function() {
          val = BaseObjectHelper.expandCommonObjectIntoObject({c: 3, d: 4}, {a: 1, b: 2});
          expect(val).to.eql({a: 1, b: 2, c: 3, d: 4});
          
          val = BaseObjectHelper.expandCommonObjectIntoObject([3, 4], [1, 2], 2);
          expect(val).to.eql([1,2,3,4]);
          
          val = BaseObjectHelper.expandCommonObjectIntoObject([3, 4], [1, 2], 0);
          expect(val).to.eql([3,4,1,2]);
        });
      });
});