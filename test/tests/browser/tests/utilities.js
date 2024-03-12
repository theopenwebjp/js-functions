import * as chai from 'chai'
import * as Utilities from '../../../../src/utilities.js'

const { expect } = chai

// var fs = require("fs");
// eval( fs.readFileSync('./../utilities.js', 'utf8') );

let val

describe('utilities', function () {
  describe('getWrappedStrings', function () {
    const h = Utilities.getWrappedStrings
    const wrapperOpen = '{{'
    const wrapperClose = '}}'
    it('gets wrapped normal', () => {
      const str = 'a{{b}}{{cc}} {{d}} '
      const strings = h(str, wrapperOpen, wrapperClose)
      chai.expect(strings).to.deep.equal([
        'b', 'cc', 'd'
      ])
    })
    it('gets wrapped keeping wrapper', () => {
      const str = 'a{{b}}{{cc}} {{d}} '
      const strings = h(str, wrapperOpen, wrapperClose, true)
      chai.expect(strings).to.deep.equal([
        '{{b}}', '{{cc}}', '{{d}}'
      ])
    })
    it.skip('gets wrapped with self inside', () => { // TODO: useClosingTagEnd failing.
      const str = 'a{{b}}{{{cc}} {{{{d}}}}'
      const strings = h(str, wrapperOpen, wrapperClose, false, true)
      chai.expect(strings).to.deep.equal([
        'b', 'cc', 'd'
      ])
    })
  })

  describe('asyncCheck', function () {
    it('executes callback later(NOT SYNC)', (done) => {
      let async = false
      Utilities.asyncCheck(() => {
        chai.expect(async).to.equal(true)
        done()
      })
      async = true
    })
  })

  describe('promisify', function () {
    it('function with callback becomes executed promise.', () => {
      let val = 0
      /**
       * @param {any} arg 
       */
      const callback = (arg) => {
        chai.expect(arg).to.equal(10)
        chai.expect(val).to.equal(10)
      }
      /**
       * @param {number} num 
       * @param {(num: number) => void} callback 
       */
      const f = (num, callback) => {
        val = num
        callback(num)
      }
      const args = [10, callback, 1]
      const callbackIndex = 1
      const promise = Utilities.promisify(f, args, callbackIndex)
      return promise
    })
  })

  describe('asyncHandler', function () {
    it('executes without errors', function (cb) {
      const arr = [
        {
          /**
           * @param {() => void} callback 
           */
          handle: (callback) => {
            window.setTimeout(callback, 50)
          },
          args: [() => { }],
          callbackParamIndex: 0
        },
        {
          /**
           * @param {() => void} callback 
           */
          handle: (callback) => {
            window.setTimeout(callback, 100)
          },
          args: [() => { }],
          callbackParamIndex: 0
        }
      ]
      Utilities.asyncHandler(arr, () => {
        chai.assert(true)
        cb()
      })
    })
  })

  describe('equals', function () {
    it('Return true on match, false on fail', function () {
      let val
      val = Utilities.equals(NaN, NaN); expect(val).to.equal(true)
      val = Utilities.equals(5, 5); expect(val).to.equal(true)
      val = Utilities.equals(3, 4); expect(val).to.equal(false)
    })
  })

  describe('arrayEquals', function () {
    const h = Utilities.arrayEquals
    it('not equal length => false', () => {
      chai.expect(h([1], [1, 1])).to.equal(false)
    })
    it('not same => false', () => {
      chai.expect(h([1, 2], [1, 1])).to.equal(false)
    })
    it('string number type diff => false', () => {
      chai.expect(h([1], ['1'])).to.equal(false)
    })
    it('same => true', () => {
      chai.expect(h([1, 2, 3], [1, 2, 3])).to.equal(true)
    })
  })

  describe('exists', function () {
    const h = Utilities.exists
    it('null and undefined only false', () => {
      chai.expect(h(undefined)).to.equal(false)
      chai.expect(h(null)).to.equal(false)
      chai.expect(h(false)).to.equal(true)
      chai.expect(h('')).to.equal(true)
      chai.expect(h(0)).to.equal(true)
    })
  })

  describe('log', function () {
    it('does not cause an error', function () {
      try {
        Utilities.log('test log')
        chai.assert(true)
      } catch (err) {
        chai.assert(false)
      }
    })
  })

  describe('getDataUrlExtension', function () {
    it('returns extension string', function () {
      // Taken from https://en.wikipedia.org/wiki/Data_URI_scheme#HTML
      const dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
      const extension = Utilities.getDataUrlExtension(dataUrl)
      chai.expect(extension).to.be.a('string')
      chai.expect(extension).to.equal('png')
    })
  })

  describe('download', function () {
    it('does not throw an error', function () {
      try {
        window.URL.createObjectURL = () => '' // window.URL.createObjectURL NOT supported by test libraries.
        Utilities.download({ a: 1 }, 'my_file', 'application/text')
        chai.assert(true)
      } catch (err) {
        console.debug('download', err)
        chai.assert(false)
      }
    })
  })

  describe('downloadCurrentPage', function () {
    it('does not throw an error', function () {
      try {
        window.URL.createObjectURL = () => '' // window.URL.createObjectURL NOT supported by test libraries.
        Utilities.downloadCurrentPage()
        chai.assert(true)
      } catch (err) {
        console.debug('downloadCurrentPage', err)
        chai.assert(false)
      }
    })
  })

  describe('getFileName', function () {
    it('gets only file name of url', () => {
      const fileName = Utilities.getFileName('http://example.com/route/route2/fileName.txt?arg1&arg2#hash')
      chai.expect(fileName).to.be.a('string')
      chai.expect(fileName).to.equal('fileName.txt')
    })
  })

  describe('getFileExtension', function () {
    it('gets extension only', () => {
      const url = 'http://sub.domain.com:8080/index.html'
      const ext = Utilities.getFileExtension(url)
      chai.expect(ext).to.equal('html')
    })
  })

  describe('downloadDataUrl', function () {
    it('does not throw an error', function () {
      try {
        // Taken from https://en.wikipedia.org/wiki/Data_URI_scheme#HTML
        const dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='

        Utilities.downloadDataUrl(dataUrl, 'data.data')
        chai.assert(true)
      } catch (err) {
        chai.assert(false)
      }
    })
  })

  describe('downloadBlob', function () {
    it('does not throw an error', function () {
      try {
        const blob = new window.Blob(['1', '2'])
        window.URL.createObjectURL = () => '' // window.URL.createObjectURL NOT supported by test libraries.
        Utilities.downloadBlob(blob, 'blob.blob')
        chai.assert(true)
      } catch (err) {
        console.debug('downloadBlob', err)
        chai.assert(false)
      }
    })
  })

  describe('downloadLink', function () {
    it('does not throw an error', function () {
      try {
        const url = 'https://theopenweb.info/robots.txt'
        Utilities.downloadLink(url, 'url.txt')
        chai.assert(true)
      } catch (err) {
        chai.assert(false)
      }
    })
  })

  describe('camelCaseToArray', function () {
    const h = Utilities.camelCaseToArray
    it('normal camel case', () => {
      const str = 'camelCaseWord'
      chai.expect(h(str)).to.deep.equal([
        'camel', 'case', 'word'
      ])
    })
    it('single letter words camel case', () => {
      const str = 'iCAMEL'
      chai.expect(h(str)).to.deep.equal([
        'i', 'c', 'a', 'm', 'e', 'l'
      ])
    })
  })

  describe('isCapitalLetter', function () {
    const h = Utilities.isCapitalLetter
    it('only small characters false', () => {
      chai.expect(h('a')).to.equal(false)
      chai.expect(h('z')).to.equal(false)
      chai.expect(h('D')).to.equal(true)
      chai.expect(h('1')).to.equal(true)
    })
  })

  describe('capitalize', function () {
    const h = Utilities.capitalize
    it('capitalizes first letter', () => {
      chai.expect(h('capital')).to.equal('Capital')
    })
  })

  describe('class looping', () => {
    const getClass = () => {
      class Extension {
        constructor() {
          this.a = {}
        }
        e() {
          return this
        }
      }
      class MyClass extends Extension {
        constructor() {
          super()
          this.c = {}
        }
        f1() {
          return this
        }
        f2() {
          return this
        }
      }
      const myClass = new MyClass()

      return myClass
    }

    describe('loopClassFunctions', function () {
      const myClass = getClass()
      /**
       * @type {(() => any)[]}
       */
      const funcs = []
      /**
       * @type {(string)[]}
       */
      const keys = []
      /**
       * @type {({ [x: string]: any })[]}
       */
      const classInstances = []
      Utilities.loopClassFunctions(myClass, (func, key, classInstance) => {
        funcs.push(func)
        keys.push(key)
        classInstances.push(classInstance)
      })
      // console.log('loopClassFunctions', funcs, keys, classInstances)
      it('Keys match', () => {
        chai.expect(keys).to.deep.equal(['f1', 'f2', 'e'])
      })
      it('Functions match', () => {
        chai.expect(funcs).to.deep.equal([myClass.f1, myClass.f2, myClass.e])
      })
      it('Class instances match', () => {
        chai.expect(classInstances).to.deep.equal([myClass, myClass, myClass])
      })
    })

    describe('loopClassProperties', function () {
      const myClass = getClass()
      /**
       * @type {string[]}
       */
      const keys = []
      Utilities.loopClassProperties(myClass, (prop, key) => {
        keys.push(key)
      })
      it('Keys match', () => {
        chai.expect(keys.sort()).to.deep.equal(['a', 'c'])
      })
    })

    describe('bindClassThis', function () {
      class MyClass {
        constructor() {
          this.ref = true
          this.obj = {
            func: function () {
              return this
            }
          }
          this.arrow = () => {
            return this
          }
        }
        method() {
          return this
        }
        callback() {
          const callback = () => {
            return this
          }
          return this.callbackExecutor(callback)
        }
        /**
         * @param {() => any} callback 
         */
        callbackExecutor(callback) {
          return callback()
        }
      }
      const myClass = new MyClass()

      Utilities.bindClassThis(myClass)

      it('values remain', () => {
        chai.expect(myClass.obj).to.be.an('object')
        chai.expect(myClass.arrow).to.be.a('function')
        chai.expect(myClass.method).to.be.a('function')
      })

      it('arrow function this OK', () => {
        chai.expect(myClass.arrow().ref).to.equal(true)
      })

      it('method this OK', () => {
        chai.expect(myClass.method().ref).to.equal(true)
      })

      it('object function this NOT HANDLED SO SHOULD FAIL', () => {
        // @ts-ignore
        chai.expect(myClass.obj.func()['ref']).to.equal(undefined)
      })

      it('callback function this OK', () => {
        chai.expect(myClass.callback().ref).to.equal(true)
      })
    })
  })

  describe('reduceObjectArray', function () {
    it('', () => {
      const objArr = [
        {
          a: 1,
          b: 5
        },
        {
          a: 7,
          b: 8
        }
      ]
      const obj = Utilities.reduceObjectArray(objArr)
      chai.expect(obj).to.deep.equal({
        a: 8,
        b: 13
      })
    })
  })

  describe('waitFor', function () {
    it('', () => {
      const ms = Date.now()
      const waitMs = 200
      const condition = () => {
        return (Date.now() >= (ms + waitMs))
      }
      return Utilities.waitFor(condition)
        .then(() => {
          chai.assert(true)
        })
    })
  })

  describe('sleep', function () {
    it('', () => {
      const ms = Date.now()
      const sleepForMs = 200
      const toleranceInMs = 10
      return Utilities.sleep(sleepForMs)
        .then(() => {
          chai.expect(Math.abs((Date.now() - ms) - sleepForMs) <= toleranceInMs)
        })
    })
  })

  describe('promiseAll', function () {
    it('resolves promises unordered', () => {
      const h1 = () => { return Promise.resolve(1) }
      const h2 = () => { return Promise.resolve(2) }
      const h3 = () => { return Promise.resolve(3) }
      const handles = [h1, h2, h3]

      return Utilities.promiseAll(handles, false)
        .then((arr) => {
          chai.expect(arr).to.deep.equal([1, 2, 3])
        })
    })

    it('resolves promises ordered', () => {
      /**
       * @param {number} num 
       * @param {number} ms 
       */
      const t = (num, ms) => {
        return new Promise((resolve) => {
          window.setTimeout(() => {
            resolve(num)
          }, ms)
        })
      }

      const h1 = () => { return t(1, 100) }
      const h2 = () => { return t(4, 10) }
      const h3 = () => { return t(6, 50) }
      const handles = [h1, h2, h3]

      return Utilities.promiseAll(handles, true)
        .then((arr) => {
          chai.expect(arr).to.deep.equal([1, 4, 6])
        })
    })
  })

  describe.skip('loadStyleSheets', function () {
    it('loads unordered', () => {
      // Utilities.loadStyleSheets(array, false);
    })

    it('loads ordered', () => {
      // Need to test different speed css.
    })
  })

  // Error: Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called
  // Can't load in tests?
  describe.skip('loadScripts', function () {
    it('loads unordered', () => {
      const src1 = Utilities.createDataURI('window._a = true;')
      const src2 = Utilities.createDataURI('window._b = true;')
      return Utilities.loadScripts([src1, src2], false)
        .then(() => {
          const w = /** @type {any} */ (window);
          chai.expect(w._a).to.equal(true)
          chai.expect(w._b).to.equal(true)
        })
    })

    it.skip('loads ordered', () => {
      // Need to test different speed scripts.
    })
  })

  /*
  TODO:
  base64 functions are causing errors in test. Find issue and fix. Either real unicode issue or problem with testing environment.
  InvalidCharacterError: The string to be decoded contains invalid characters.
  */

  const BASE_64 = {
    ascii: 'a Ā 𐀀 文 🦄',
    base64: 'YSDEgCDwkICAIOaWhyDwn6aE',
  }

  describe.skip('atobUnicode', function() {
    it('ascii creates correct base64', () => {
      const base64 = Utilities.atobUnicode(BASE_64.ascii)
      chai.expect(base64).to.equal(BASE_64.base64)
    })
  })

  describe.skip('btoaUnicode', function() {
    it('base64 creates correct ascii', () => {
      const ascii = Utilities.btoaUnicode(BASE_64.base64)
      chai.expect(ascii).to.equal(BASE_64.ascii)
    })
  })

  describe.skip('createDataURI', function () {
    it('creates data URI as expected: Hello World! => SGVsbG8gV29ybGQh', () => {
      // https://www.base64encode.org/
      console.log(2)
      const str = Utilities.createDataURI('Hello World!', 'text/plain', { charset: 'utf-8' })
      console.log(3, str)
      chai.expect(str).to.equal('data:text/plain;charset=utf-8;base64,SGVsbG8gV29ybGQh')
    })
  })

  describe('dataEquals', function () {
    it('object check', function () {
      val = Utilities.dataEquals({ a: 1 }, { a: 1 }); expect(val).to.equal(true)
      val = Utilities.dataEquals({ a: 1 }, { a: 2 }); expect(val).to.equal(false)
    })

    it('array check', function () {
      val = Utilities.dataEquals([1, 3, 5], [1, 3, 5]); expect(val).to.equal(true)
      val = Utilities.dataEquals([1, 3, 5], [1, 3, 2]); expect(val).to.equal(false)
    })

    it('non array check', function () {
      val = Utilities.dataEquals(1, 1); expect(val).to.equal(true)
      val = Utilities.dataEquals(1, 2); expect(val).to.equal(false)
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
      val = Utilities.objectDataEquals(obj1, obj2); expect(val).to.equal(true)
    })
    it('objects do not equal', function () {
      val = Utilities.objectDataEquals(obj1, obj3); expect(val).to.equal(false)
    })
    it('deep objects equal', function () {
      val = Utilities.objectDataEquals(nestedObj1, nestedObj2); expect(val).to.equal(true)
    })
    it('deep objects do not equal', function () {
      val = Utilities.objectDataEquals(nestedObj1, nestedObj3); expect(val).to.equal(false)
    })
  })

  describe('cleverSlice', function () {
    it('slices in intuitive from to way', function () {
      const arr = [0, 1, 2, 3, 4, 5]
      val = Utilities.cleverSlice(arr, 1, 3)
      expect(val).to.deep.equal([1, 2, 3])
    })
  })

  describe('getArguments', function () {
    it('Returns specified arguments as an array', function () {
      // const f = function (a, b, c, d) {
      const f = function () {
        return Utilities.getArguments(arguments, 1, 2)
      }
      val = f(1, 2, 3, 4)

      expect(val).to.deep.equal([2, 3])
      expect(val).to.be.an('array')
    })
  })

  describe('combineObjects', function () {
    it('combines multiple objects into one', function () {
      val = Utilities.combineObjects([{ a: 1 }, { b: 2 }])
      chai.expect(val).to.deep.equal({ a: 1, b: 2 })
    })
  })

  describe('dataInArray', function () {
    it('Checks if data in array(Only looks at data not reference.)', function () {
      val = Utilities.dataInArray(2, [1, 2, 3]); expect(val).to.equal(true)
      val = Utilities.dataInArray(5, [1, 2, 3]); expect(val).to.equal(false)
      val = Utilities.dataInArray({ a: 1, b: 2 }, [1, { a: 1, b: 2 }, 3]); expect(val).to.equal(true)
      val = Utilities.dataInArray({ a: 1, b: 3 }, [1, { a: 1, b: 2 }, 3]); expect(val).to.equal(false)
    })
  })

  describe('copyVariable', function () {
    it('Copied values should match', function () {
      val = Utilities.copyVariable({ a: 1, b: 2, c: { a: 4 } }); expect(val).to.eql({ a: 1, b: 2, c: { a: 4 } })
      val = Utilities.copyVariable([1, 2, 3, 7]); expect(val).to.eql([1, 2, 3, 7])
      val = Utilities.copyVariable(5); expect(val).to.eql(5)
    })
  })

  describe('createMultiple', function () {
    const obj = {
      a: 1,
      b: [1, 2, 3],
      c: 'a'
    }
    val = Utilities.createMultiple(obj, 5)
    expect(val).to.deep.equal([obj, obj, obj, obj, obj])
  })

  describe('toReadableString', function () {
    it('Object to string returns a string', function () {
      const obj = { a: 1 }
      val = Utilities.toReadableString(obj)
      chai.expect(val).to.be.a('string')
    })

    it('Non object to string', function () {
      val = Utilities.toReadableString(22)
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
      val = Utilities.getSimilarity(2, 2); expect(val).to.equal(1)
    })

    it('Number uses number similarity', function () {
      val = Utilities.getSimilarity(4, 7)
      expect(val).to.equal(Utilities.getNumberSimilarity(4, 7))
    })

    it('Other uses string similarity', function () {
      val = Utilities.getSimilarity('aa', 'ccc')
      const h = Utilities.toReadableString
      expect(val).to.equal(Utilities.getStringSimilarity(h('aa'), h('ccc')))
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
