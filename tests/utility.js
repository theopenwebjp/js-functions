var describe = require('mocha').describe;
var before = require('mocha').before;
var it = require('mocha').it;

//var assert = require('assert');
var assert = require('chai').assert;
var should = require('chai').should;
var expect = require('chai').expect;

var fs = require("fs");
eval( fs.readFileSync('./../utility.js', 'utf8') );

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var jsDom = new JSDOM('');
var document = jsDom.window.document;

var val;

describe('utility.js', function() {
  describe('#copyVariable()', function() {
    it('Copied values should match', function() {
      val = copyVariable({a: 1, b: 2, c: {a: 4}}); expect(val).to.eql({a: 1, b: 2, c: {a: 4}});
      val = copyVariable([1,2,3,7]); expect(val).to.eql([1,2,3,7]);
      val = copyVariable(5); expect(val).to.eql(5);
    });
  });
  
  describe('#equals()', function() {
    it('Return true on match, false on fail', function() {
      val = equals(NaN, NaN); expect(val).to.equal(true);
      val = equals(5, 5); expect(val).to.equal(true);
      val = equals(3, 4); expect(val).to.equal(false);
    });
  });
  
  describe("#Traversing", function(){
    
    var obj = {
      a: {
        a: {},
        b: null,
        c: {
          a: {
            obj: 3
          },
          b: [
            1,
            2,
            {
              arr: 2
            },
            4
          ]
        },
        d: 2
      },
      b: {}
    };
    var objPath = ["a", "c", "a", "obj"];
    var arrPath = ["a", "c", "b", 2, "arr"];
    
    var readableObj = {
      a: {
        b: {
          a: 1,
          b: 2,
          c: null
        },
        c: true
      },
      b: false,
      hello: {
        world: {
          again: 5
        },
        array: [
          2,
          3
        ]
      }
    };
    
    describe('#getObjectValue()', function() {
      it('Returns value at path array', function() {
        val = getObjectValue(obj, objPath); expect(val).to.equal(3);
        val = getObjectValue(obj, arrPath); expect(val).to.equal(2);
      });
    });

    describe('#setObjectValue()', function() {
      it('Sets value at path array', function() {
        setObjectValue(obj, objPath, 4); expect(obj.a.c.a.obj).to.equal(4);
        setObjectValue(obj, arrPath, 4); expect(obj.a.c.b[2].arr).to.equal(4);
      });
    });
    
    describe('#loopObject()', function() {
      it('Loops objects without complexity', function() {
        
        var hasVal = false;
        
        loopObject(readableObj, function(obj, key, val){
          if(val === 2){hasVal = true;}
          return val;//required
        });
        
        expect(hasVal).to.equal(true);
      });
    });
    
    describe('#loopObjectComplex()', function() {
      it('Loop object allowing any possible interaction', function() {
        
        var hasPath = false;
        var hasVal = false;
        
        loopObjectComplex(readableObj, function(status){
          if(status.path.length > 0){hasPath = true;}
          if(status.value === 2){hasVal = true;}
        });
        
        expect(hasPath).to.equal(true);
        expect(hasVal).to.equal(true);
      });
    });
    
    describe('#getKeyedData()', function() {
      it('Loops object, transforming data into key value pairs.', function() {
        
        val = getKeyedData(readableObj, "camelCase", null, false);//non-simple camel case
        expect(val["helloWorldAgain"]).to.equal(5);//Object
        //expect(val["helloArray1"]).to.equal(3);//Array(support should be added)
        
        val = getKeyedData(readableObj, "-", null, false);//non-simple delimiter
        expect(val["hello-world-again"]).to.equal(5);//Others assumed same.
        
        val = getKeyedData(readableObj, "camelCase", null, true);//simple camel case
        expect(val["helloWorldAgain"]).to.equal(5);//non-simple
        expect(val["again"]).to.equal(5);//simple
      });
    });
    
  });
  
  describe('#isNonDomObject()', function() {
    it('Traversible object that is not DOM type', function() {
      expect(isNonDomObject(null)).to.equal(false);
      expect(isNonDomObject(document.createElement("input"))).to.equal(false);
      expect(isNonDomObject("hello")).to.equal(false);
      expect(isNonDomObject([1, 2])).to.equal(false);
      expect(isNonDomObject({a: 1})).to.equal(true);
    });
  });
  
  describe('#dataInArray()', function() {
    it('Checks if data in array(Only looks at data not reference.)', function() {
      val = dataInArray(2, [1,2,3]); expect(val).to.equal(true);
      val = dataInArray(5, [1,2,3]); expect(val).to.equal(false);
      val = dataInArray({a:1, b:2}, [1, {a:1, b:2}, 3]); expect(val).to.equal(true);
      val = dataInArray({a:1, b:3}, [1, {a:1, b:2}, 3]); expect(val).to.equal(false);
    });
  });
  
  describe('#expandCommonObjectIntoObject()', function() {
    it('Expands object/array into existing object/array', function() {
      val = expandCommonObjectIntoObject({c: 3, d: 4}, {a: 1, b: 2});
      expect(val).to.eql({a: 1, b: 2, c: 3, d: 4});
      
      val = expandCommonObjectIntoObject([3, 4], [1, 2], 2);
      expect(val).to.eql([1,2,3,4]);
      
      val = expandCommonObjectIntoObject([3, 4], [1, 2], 0);
      expect(val).to.eql([3,4,1,2]);
    });
  });
  
});