var expect = require('chai').expect;
var chai = require('chai');

//var fs = require("fs");
//eval( fs.readFileSync('./../utility.js', 'utf8') );

var val;

const Utility = require('../../../../src/utility');

describe('utility.js', function() {

  describe('dataEquals', function(){
    it('object check', function(){
      val = Utility.dataEquals({a: 1}, {a: 1}); expect(val).to.equal(true);
      val = Utility.dataEquals({a: 1}, {a: 2}); expect(val).to.equal(false);
      
      val = Utility.dataEquals([1,3,5], [1,3,5]); expect(val).to.equal(true);
      val = Utility.dataEquals([1,3,5], [1,3,2]); expect(val).to.equal(false);
    });

    it('non array check', function(){
      val = Utility.dataEquals(1,1); expect(val).to.equal(true);
      val = Utility.dataEquals(1,2); expect(val).to.equal(false);
    });
  });

  describe('objectDataEquals', function(){
    const obj1 = {
      a: 1,
      b: 'a',
      c: [1,2,3],
      d: {
        a: [1,2,3]
      }
    };
    const obj2 = {
      a: 1,
      b: 'a',
      c: [1,2,3],
      d: {
        a: [1,2,3]
      }
    };
    const obj3 = {
      a: 1,
      b: 'a',
      c: [1,2,3],
      d: {
        a: [1,2,1]//Only here different
      }
    };
    it('objects equal', function(){
      val = Utility.objectDataEquals(obj1, obj2); expect(val).to.equal(true);
    });
    it('objects do not equal', function(){
      val = Utility.objectDataEquals(obj1, obj3); expect(val).to.equal(false);
    });
  });

  describe('cleverSlice', function(){
    it('slices in intuitive from to way', function(){
      const arr = [0,1,2,3,4,5];
      val = Utility.cleverSlice(arr, 1, 3);
      expect(val).to.deep.equal([1,2,3]);
    });
  });

  describe('getArguments', function(){
    it('Returns specified arguments as an array', function(){
      var f = function(a,b,c,d){
        return Utility.getArguments(arguments, 1, 3);
      };
      val = f(1,2,3,4);
      
      expect(val).to.deep.equal([2, 3]);
      expect(val).to.be.an('array');
    })
  });

  describe('combineObjects', function(){
    it('combines multiple objects into one', function(){
      val = Utility.combineObjects([{}, {}]);//??
      chai.expect(val).to.equal(false);//??Check spec first.
    });
  });

  describe('dataInArray', function() {
    it('Checks if data in array(Only looks at data not reference.)', function() {
      val = Utility.dataInArray(2, [1,2,3]); expect(val).to.equal(true);
      val = Utility.dataInArray(5, [1,2,3]); expect(val).to.equal(false);
      val = Utility.dataInArray({a:1, b:2}, [1, {a:1, b:2}, 3]); expect(val).to.equal(true);
      val = Utility.dataInArray({a:1, b:3}, [1, {a:1, b:2}, 3]); expect(val).to.equal(false);
    });
  });

  describe('copyVariable', function() {
    it('Copied values should match', function() {
      val = Utility.copyVariable({a: 1, b: 2, c: {a: 4}}); expect(val).to.eql({a: 1, b: 2, c: {a: 4}});
      val = Utility.copyVariable([1,2,3,7]); expect(val).to.eql([1,2,3,7]);
      val = Utility.copyVariable(5); expect(val).to.eql(5);
    });
  });

  describe('createMultiple', function(){
    var obj = {
      a: 1,
      b: [1,2,3],
      c: 'a'
    };
    val = Utility.createMultiple(obj, 5);
    expect(val).to.deep.equal([obj, obj, obj, obj, obj]);
  });

  describe('toReadableString', function(){
    it('Object to string', function(){
      var obj = {a:1};
      chai.expect(true).to.equal(false);//??Check spec first.
    });

    it('Non object to string', function(){
      val = Utility.toReadableString(22);
      expect(val).to.equal('22');
    });
  });

  describe('exportData', function(){
    it('exports', function(){
      chai.expect(true).to.equal(false);//??Must stub window.prompt first.
    });
  });

  describe('getSimilarity', function(){
    it('Identical is 1', function(){
      val = Utility.getSimilarity(2,2); expect(val).to.equal(1);
    });

    it('Number uses number similarity', function(){
      val = Utility.getSimilarity(4,7);
      expect(val).to.equal(Utility.getNumberSimilarity(4, 7));
    });

    it('Other uses string similarity', function(){
      val = Utility.getSimilarity('aa', 'ccc');
      var h = Utility.toReadableString;
      expect(val).to.equal(Utility.getStringSimilarity(h('aa'), h('ccc')));
    });
  });

  describe('getDataSet', function(){
    it('Gets data set', function(){
      chai.expect(true).to.equal(false);//??Check spec first.
    });
  });

  describe('executeAjax', function(){
    it('Executes AJAX properly', function(){
      chai.expect(true).to.equal(false);//??Must stub AJAX first.
    });
  });

  describe('getAjaxParams', function(){
    it('Gets AJAX parameters', function(){
      chai.expect(true).to.equal(false);//??Must stub window.encodeURIComponent first.
    });
  });

  describe('handleAjaxResponse', function(){
    it('Handles AJAX response', function(){
      chai.expect(true).to.equal(false);//??Must stub AJAX first.
    });
  });
});