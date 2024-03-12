import * as ObjectHelpers from '../../../../src/object-helpers.js'
import * as chai from 'chai'
import * as jsdom from 'jsdom'

const { expect } = chai

const { JSDOM } = jsdom
const jsDom = new JSDOM('')
const document = jsDom.window.document

let val

describe('object-helpers', function () {
  describe('copyObject', function () {
    it('copies basic deep object without references', () => {
      const obj = {
        a: 1,
        b: [1, 2, [1]],
        c: {
          a: [1]
        }
      }
      const copy = ObjectHelpers.copyObject(obj)
      chai.expect(copy).to.deep.equal(obj)
      chai.expect(copy.b === obj.b).to.equal(false)
      chai.expect(copy.c === obj.c).to.equal(false)
      chai.expect(copy.c.a === obj.c.a).to.equal(false)
    })
  })

  describe('copyObjectData', function () {
    it('extracts shallow data only from object', () => {
      const obj = {
        a: 1,
        b: [1],
        c: { a: 1 },
        d: 'a'
      }
      chai.expect(ObjectHelpers.copyObjectData(obj)).to.deep.equal({
        a: 1,
        d: 'a'
      })
    })
  })

  describe('applyObj', function () {
    it('applies object data from one object to other if key=a', () => {
      const from = {
        a: 1,
        b: 2
      }
      const to = {
        a: 2
      }
      /**
       * @param {string} key
       */
      const condition = (key) => {
        return (key === 'a')
      }
      chai.expect(ObjectHelpers.applyObj(from, to, condition)).to.deep.equal({
        a: 1
      })
    })
  })

  describe('getObjectKeyValueAtIndex', function () {
    it('Gets key info at specified numerical key index', () => {
      const obj = {
        a: 1,
        b: 3,
        c: 5,
        d: 4
      }
      const index = 2
      const keyVal = ObjectHelpers.getObjectKeyValueAtIndex(obj, index)
      chai.expect(keyVal).to.deep.equal({
        key: 'c',
        value: obj.c
      })
    })
  })

  describe('getObjectKeys', function () {
    it('Returns the keys in object', () => {
      const obj = {
        a: 1,
        c: 4
      }
      const keys = ObjectHelpers.getObjectKeys(obj)
      chai.expect(keys).to.eql(['a', 'c'])
    })
  })

  describe('logObjectOnSingleLine', function () {
    it('Does not throw error', () => {
      try {
        ObjectHelpers.logObjectOnSingleLine({ a: 1 })
        chai.assert(true)
      } catch (err) {
        chai.assert(false)
      }
    })
  })

  describe('isObject', function () {
    const h = ObjectHelpers.isObject
    it('object is object', () => {
      chai.expect(h({})).to.equal(true)
    })
    it('null is not object', () => {
      chai.expect(h(null)).to.equal(false)
    })
    it('array is not object', () => {
      chai.expect(h([])).to.equal(false)
    })
  })

  describe('isCommonObject', function () {
    const h = ObjectHelpers.isCommonObject
    it('object => true', () => {
      chai.expect(h({})).to.equal(true)
    })
    it('array => true', () => {
      chai.expect(h([])).to.equal(true)
    })
  })

  describe('objectToObjectInfoArray', function () {
    it('Has 2 items of object type', () => {
      const obj = {
        a: 1,
        b: [
          {
            c: 2
          }
        ]
      }
      const arr = ObjectHelpers.objectToObjectInfoArray(obj)
      chai.expect(arr).to.be.an('array')
      chai.expect(arr).to.have.lengthOf(2)
      arr.forEach(item => {
        chai.expect(item).to.be.an('object')
      })
    })
  })

  describe('ObjectInfo', function () {
    it('has correct format', () => {
      const obj = ObjectHelpers.objectInfo(1, 'key', 'value')
      chai.expect(Object.keys(obj)).to.deep.equal([
        'depth', 'key', 'value'
      ])
    })
  })

  describe('getAddedVariableNames', function () {
    it('correctly gets added keys', () => {
      const obj = {
        a: 1,
        b: 2,
        c: 3,
        d: 4
      }
      const beforeKeys = ['a', 'c']
      chai.expect(ObjectHelpers.getAddedVariableNames(obj, beforeKeys)).to.deep.equal([
        'b', 'd'
      ])
    })
  })

  describe('getRemovedVariableNames', function () {
    it('correctly gets removed keys', () => {
      const obj = {
        a: 1,
        c: 3
      }
      const beforeKeys = ['a', 'b', 'c', 'd']
      chai.expect(ObjectHelpers.getRemovedVariableNames(obj, beforeKeys)).to.deep.equal([
        'b', 'd'
      ])
    })
  })

  describe('filterObjectVariables', function () {
    it('gets only specified keys', () => {
      const obj = {
        a: 1,
        b: 2,
        c: 3,
        d: 4
      }
      const keys = ['b', 'c']
      const filtered = ObjectHelpers.filterObjectVariables(obj, keys)
      chai.expect(filtered).to.deep.equal({
        b: 2,
        c: 3
      })
    })
  })

  describe('globalize', function () {
    it('Sets values to keys in window object', () => {
      const settings = {
        NOT_EXIST_1: 2,
        NOT_EXIST_2: 4
      }
      ObjectHelpers.globalize(settings)
      const keys = Object.keys(settings)
      const values = Object.values(settings)
      const w = /** @type {any} */ (window);
      chai.expect(w[keys[0]]).to.equal(values[0])
      chai.expect(w[keys[1]]).to.equal(values[1])
    })
  })

  describe('renameObjectKey', function () {
    const h = ObjectHelpers.renameObjectKey
    it('if key same keeps original', () => {
      const objRef = {}
      const obj = {
        a: objRef
      }
      h(obj, 'a', 'a')
      chai.expect(obj.a).to.equal(objRef)
    })
    it('if key different original object is same reference', () => {
      const objRef = {}
      /**
       * @type {{ a: any; b?: any }}
       */
      const obj = {
        a: objRef
      }
      h(obj, 'a', 'b')
      chai.expect(obj.a).to.equal(undefined)
      chai.expect(obj.b).to.equal(objRef)
    })
  })

  describe('getKeyChanges', function () {
    it('correctly gets all key changes', () => {
      const oldObj = {
        a: 1,
        b: 2,
        c: 3
      }
      const newObj = {
        a: 1,
        b: 4,
        d: 5
      }
      const expectedResponse = {
        added: {
          d: 5
        },
        updated: {
          b: 4
        },
        old: {
          b: 2
        },
        deleted: {
          c: 3
        }
      }
      const response = ObjectHelpers.getKeyChanges(oldObj, newObj)
      chai.expect(response).to.deep.equal(expectedResponse)
    })
  })

  describe('objectToReadableString', function () {
    it('Creates a string with key and value included', () => {
      const obj = {
        key1: 'value1'
      }
      const str = ObjectHelpers.objectToReadableString(obj)
      chai.expect(str).to.be.a('string')
      chai.expect(str).to.contain('key1')
      chai.expect(str).to.contain('value1')
    })
  })

  describe('watchObjectProperty', function () {
    it('Does not throw error', () => {
      try {
        const obj = ObjectHelpers.watchObjectProperty({ a: 1 }, 'a')
        obj.stop()
        chai.assert(true)
      } catch (err) {
        console.debug('watchObjectProperty', err)
        chai.assert(false)
      }
    })
  })

  describe('#isNonDomObject()', function () {
    it('Traversible object that is not DOM type', function () {
      expect(ObjectHelpers.isNonDomObject(null)).to.equal(false)
      expect(ObjectHelpers.isNonDomObject(document.createElement('input'))).to.equal(false)
      expect(ObjectHelpers.isNonDomObject('hello')).to.equal(false)
      expect(ObjectHelpers.isNonDomObject([1, 2])).to.equal(false)
      expect(ObjectHelpers.isNonDomObject({ a: 1 })).to.equal(true)
    })
  })

  describe('#expandCommonObjectIntoObject()', function () {
    it('Expands object/array into existing object/array', function () {
      val = ObjectHelpers.expandCommonObjectIntoObject({ c: 3, d: 4 }, { a: 1, b: 2 })
      expect(val).to.eql({ a: 1, b: 2, c: 3, d: 4 })

      val = ObjectHelpers.expandCommonObjectIntoObject([3, 4], [1, 2], 2)
      expect(val).to.eql([1, 2, 3, 4])

      val = ObjectHelpers.expandCommonObjectIntoObject([3, 4], [1, 2], 0)
      expect(val).to.eql([3, 4, 1, 2])
    })
  })
})
