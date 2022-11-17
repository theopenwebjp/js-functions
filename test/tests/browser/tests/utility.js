// const chai = require('chai')
import chai from 'chai'
// const Utility = require('../../../../src/utility')
import * as Utility from '../../../../src/utility.js'

const { expect } = chai

// var fs = require("fs");
// eval( fs.readFileSync('./../utility.js', 'utf8') );

let val

describe('utility.js', function () {
  describe('dataEquals', function () {
    it('object check', function () {
      val = Utility.dataEquals({ a: 1 }, { a: 1 }); expect(val).to.equal(true)
      val = Utility.dataEquals({ a: 1 }, { a: 2 }); expect(val).to.equal(false)
    })

    it('array check', function () {
      val = Utility.dataEquals([1, 3, 5], [1, 3, 5]); expect(val).to.equal(true)
      val = Utility.dataEquals([1, 3, 5], [1, 3, 2]); expect(val).to.equal(false)
    })

    it('non array check', function () {
      val = Utility.dataEquals(1, 1); expect(val).to.equal(true)
      val = Utility.dataEquals(1, 2); expect(val).to.equal(false)
    })
  })

  describe('objectDataEquals', function () {
    const obj1 = {
      a: 1,
      b: 'a',
      c: [1, 2, 3]
    }
    const obj2 = JSON.parse(JSON.stringify(obj1))
    const obj3 = JSON.parse(JSON.stringify(obj1))
    obj3.c = [1, 2, 4]// Only here different

    const nestedObj1 = {
      a: 1,
      b: 'a',
      c: [1, 2, 3],
      d: {
        a: [1, 2, 3]
      }
    }
    const nestedObj2 = JSON.parse(JSON.stringify(nestedObj1))
    const nestedObj3 = JSON.parse(JSON.stringify(nestedObj1)); nestedObj3.d.a = [1, 2, 1]// Only here different
    it('objects equal', function () {
      val = Utility.objectDataEquals(obj1, obj2); expect(val).to.equal(true)
    })
    it('objects do not equal', function () {
      val = Utility.objectDataEquals(obj1, obj3); expect(val).to.equal(false)
    })
    it('deep objects equal', function () {
      val = Utility.objectDataEquals(nestedObj1, nestedObj2); expect(val).to.equal(true)
    })
    it('deep objects do not equal', function () {
      val = Utility.objectDataEquals(nestedObj1, nestedObj3); expect(val).to.equal(false)
    })
  })

  describe('cleverSlice', function () {
    it('slices in intuitive from to way', function () {
      const arr = [0, 1, 2, 3, 4, 5]
      val = Utility.cleverSlice(arr, 1, 3)
      expect(val).to.deep.equal([1, 2, 3])
    })
  })

  describe('getArguments', function () {
    it('Returns specified arguments as an array', function () {
      // const f = function (a, b, c, d) {
      const f = function () {
        return Utility.getArguments(arguments, 1, 2)
      }
      val = f(1, 2, 3, 4)

      expect(val).to.deep.equal([2, 3])
      expect(val).to.be.an('array')
    })
  })

  describe('combineObjects', function () {
    it('combines multiple objects into one', function () {
      val = Utility.combineObjects([{ a: 1 }, { b: 2 }])
      chai.expect(val).to.deep.equal({ a: 1, b: 2 })
    })
  })

  describe('dataInArray', function () {
    it('Checks if data in array(Only looks at data not reference.)', function () {
      val = Utility.dataInArray(2, [1, 2, 3]); expect(val).to.equal(true)
      val = Utility.dataInArray(5, [1, 2, 3]); expect(val).to.equal(false)
      val = Utility.dataInArray({ a: 1, b: 2 }, [1, { a: 1, b: 2 }, 3]); expect(val).to.equal(true)
      val = Utility.dataInArray({ a: 1, b: 3 }, [1, { a: 1, b: 2 }, 3]); expect(val).to.equal(false)
    })
  })

  describe('copyVariable', function () {
    it('Copied values should match', function () {
      val = Utility.copyVariable({ a: 1, b: 2, c: { a: 4 } }); expect(val).to.eql({ a: 1, b: 2, c: { a: 4 } })
      val = Utility.copyVariable([1, 2, 3, 7]); expect(val).to.eql([1, 2, 3, 7])
      val = Utility.copyVariable(5); expect(val).to.eql(5)
    })
  })

  describe('createMultiple', function () {
    const obj = {
      a: 1,
      b: [1, 2, 3],
      c: 'a'
    }
    val = Utility.createMultiple(obj, 5)
    expect(val).to.deep.equal([obj, obj, obj, obj, obj])
  })

  describe('toReadableString', function () {
    it('Object to string returns a string', function () {
      const obj = { a: 1 }
      val = Utility.toReadableString(obj)
      chai.expect(val).to.be.a('string')
    })

    it('Non object to string', function () {
      val = Utility.toReadableString(22)
      expect(val).to.equal('22')
    })
  })

  describe.skip('exportData', function () {
    it('exports', function () {
      chai.expect(true).to.equal(false)// TODO: Must stub window.prompt first.
    })
  })

  describe('getSimilarity', function () {
    it('Identical is 1', function () {
      val = Utility.getSimilarity(2, 2); expect(val).to.equal(1)
    })

    it('Number uses number similarity', function () {
      val = Utility.getSimilarity(4, 7)
      expect(val).to.equal(Utility.getNumberSimilarity(4, 7))
    })

    it('Other uses string similarity', function () {
      val = Utility.getSimilarity('aa', 'ccc')
      const h = Utility.toReadableString
      expect(val).to.equal(Utility.getStringSimilarity(h('aa'), h('ccc')))
    })
  })

  describe.skip('getDataSet', function () {
    it('Gets data set', function () {
      chai.expect(true).to.equal(false)// TODO: Check spec first.
    })
  })

  describe.skip('executeAjax', function () {
    it('Executes AJAX properly', function () {
      chai.expect(true).to.equal(false)// TODO: Must stub AJAX first.
    })
  })

  describe.skip('getAjaxParams', function () {
    it('Gets AJAX parameters', function () {
      chai.expect(true).to.equal(false)// TODO: Must stub window.encodeURIComponent first.
    })
  })

  describe.skip('handleAjaxResponse', function () {
    it('Handles AJAX response', function () {
      chai.expect(true).to.equal(false)// TODO: Must stub AJAX first.
    })
  })
})
