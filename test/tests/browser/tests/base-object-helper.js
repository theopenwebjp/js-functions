const BaseObjectHelper = require('../../../../src/base-object-helper');

var chai = require('chai');
var expect = require('chai').expect;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var jsDom = new JSDOM('');
var document = jsDom.window.document;

var val;

describe('base-object-helper.js', function(){

  describe('copyObject', function(){
    it('copies basic deep object without references', ()=>{
      const obj = {
        a: 1,
        b: [1, 2, [1]],
        c: {
          a: [1]
        }
      };
      const copy = BaseObjectHelper.copyObject(obj);
      chai.expect(copy).to.deep.equal(obj);
      chai.expect(copy.b === obj.b).to.equal(false);
      chai.expect(copy.c === obj.c).to.equal(false);
      chai.expect(copy.c.a === obj.c.a).to.equal(false);
    });
  });

  describe('copyObjectData', function(){
    it('extracts shallow data only from object', ()=>{
      const obj = {
        a: 1,
        b: [1],
        c: {a: 1},
        d: 'a'
      };
      chai.expect(BaseObjectHelper.copyObjectData(obj)).to.deep.equal({
        a: 1,
        d: 'a'
      });
    });
  });

  describe('applyObj', function(){
    it('applies object data from one object to other if key=a', ()=>{
      const from = {
        a: 1,
        b: 2
      };
      const to = {
        a: 2
      };
      const condition = (key)=>{
        return (key === 'a');
      };
      chai.expect(BaseObjectHelper.applyObj(from, to, condition)).to.deep.equal({
        a: 1
      });
    });
  });

  describe('getObjectKeyValueAtIndex', function(){
    it('Gets key info at specified numerical key index', ()=>{
      const obj = {
        a: 1,
        b: 3,
        c: 5,
        d: 4
      };
      const index = 2;
      const keyVal = BaseObjectHelper.getObjectKeyValueAtIndex(obj, index);
      chai.expect(keyVal).to.deep.equal({
        key: 'c',
        value: obj.c
      });
    });
  });

  describe.skip('getObjectKeys', function(){
    it('', ()=>{
      chai.assert(false, 'failed');
    });
  });

  describe.skip('logObjectOnSingleLine', function(){
    it('', ()=>{
      chai.assert(false, 'failed');
    });
  });

  describe('isObject', function(){
    const h = BaseObjectHelper.isObject;
    it('object is object', ()=>{
      chai.expect(h({})).to.equal(true);
    });
    it('null is not object', ()=>{
      chai.expect(h(null)).to.equal(false);
    });
    it('array is not object', ()=>{
      chai.expect(h([])).to.equal(false);
    });
  });

  describe('isCommonObject', function(){
    const h = BaseObjectHelper.isCommonObject;
    it('object => true', ()=>{
      chai.expect(h({})).to.equal(true);
    });
    it('array => true', ()=>{
      chai.expect(h([])).to.equal(true);
    });
  });

  describe.skip('objectToObjectInfoArray', function(){
    it('', ()=>{
      chai.assert(false, 'failed');
    });
  });

  describe('ObjectInfo', function(){
    it('has correct format', ()=>{
      const obj = BaseObjectHelper.ObjectInfo();
      chai.expect(Object.keys(obj)).to.deep.equal([
        'depth', 'key', 'value'
      ]);
    });
  });

  describe('getAddedVariableNames', function(){
    it('correctly gets added keys', ()=>{
      const obj = {
        a: 1,
        b: 2,
        c: 3,
        d: 4
      };
      const beforeKeys = ['a', 'c'];
      chai.expect(BaseObjectHelper.getAddedVariableNames(obj, beforeKeys)).to.deep.equal([
        'b', 'd'
      ]);
    });
  });

  describe('getRemovedVariableNames', function(){
    it('correctly gets removed keys', ()=>{
      const obj = {
        a: 1,
        c: 3
      };
      const beforeKeys = ['a', 'b', 'c', 'd'];
      chai.expect(BaseObjectHelper.getRemovedVariableNames(obj, beforeKeys)).to.deep.equal([
        'b', 'd'
      ]);
    });
  });

  describe('filterObjectVariables', function(){
    it('gets only specified keys', ()=>{
      const obj = {
        a: 1,
        b: 2,
        c: 3,
        d: 4
      };
      const keys = ['b', 'c'];
      const filtered = BaseObjectHelper.filterObjectVariables(obj, keys);
      chai.expect(filtered).to.deep.equal({
        b: 2,
        c: 3
      });
    });
  });

  describe.skip('globalize', function(){
    it('', ()=>{
      chai.assert(false, 'failed');
    });
  });

  describe('renameObjectKey', function(){
    const h = BaseObjectHelper.renameObjectKey;
    it('if key same keeps original', ()=>{
      const objRef = {};
      const obj = {
        a: objRef
      };
      h(obj, 'a', 'a');
      chai.expect(obj.a).to.equal(objRef);
    });
    it('if key different original object is same reference', ()=>{
      const objRef = {};
      const obj = {
        a: objRef
      };
      h(obj, 'a', 'b');
      chai.expect(obj.a).to.equal(undefined);
      chai.expect(obj.b).to.equal(objRef);
    });
  });

  describe.skip('getKeyChanges', function(){
    it('correctly gets all key changes', ()=>{
      it('', ()=>{
        chai.assert(false, 'failed');
      });
    });
  });

  describe.skip('objectToReadableString', function(){
    it('', ()=>{
      chai.assert(false, 'failed');
    });
  });

  describe.skip('watchObjectProperty', function(){
    it('', ()=>{
      chai.assert(false, 'failed');
    });
  });

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