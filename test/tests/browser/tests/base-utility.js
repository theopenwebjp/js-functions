const BaseUtility = require('../../../../src/base-utility')
const chai = require('chai')
const { expect } = chai

describe('base-utility.js', function () {
  describe('getWrappedStrings', function () {
    const h = BaseUtility.getWrappedStrings
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
    it('gets wrapped with self inside', () => {
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
      BaseUtility.asyncCheck(() => {
        chai.expect(async).to.equal(true)
        done()
      })
      async = true
    })
  })

  describe('promisify', function () {
    it('function with callback becomes executed promise.', () => {
      let val = 0
      const callback = (arg) => {
        chai.expect(arg).to.equal(10)
        chai.expect(val).to.equal(10)
      }
      const f = (num, callback) => {
        val = num
        callback(num)
      }
      const args = [10, callback, 1]
      const callbackIndex = 1
      const promise = BaseUtility.promisify(f, args, callbackIndex)
      return promise
    })
  })

  describe('asyncHandler', function () {
    it('executes without errors', function (cb) {
      const arr = [
        {
          handle: (callback) => {
            window.setTimeout(callback, 50)
          },
          args: [() => { }],
          callbackParamIndex: 0
        },
        {
          handle: (callback) => {
            window.setTimeout(callback, 100)
          },
          args: [() => { }],
          callbackParamIndex: 0
        }
      ]
      BaseUtility.asyncHandler(arr, () => {
        chai.assert(true)
        cb()
      })
    })
  })

  describe('equals', function () {
    it('Return true on match, false on fail', function () {
      val = BaseUtility.equals(NaN, NaN); expect(val).to.equal(true)
      val = BaseUtility.equals(5, 5); expect(val).to.equal(true)
      val = BaseUtility.equals(3, 4); expect(val).to.equal(false)
    })
  })

  describe('arrayEquals', function () {
    const h = BaseUtility.arrayEquals
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
    const h = BaseUtility.exists
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
        BaseUtility.log('test log')
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
      const extension = BaseUtility.getDataUrlExtension(dataUrl)
      chai.expect(extension).to.be.a('string')
      chai.expect(extension).to.equal('png')
    })
  })

  describe('download', function () {
    it('does not throw an error', function () {
      try {
        BaseUtility.download({ a: 1 }, 'my_file', 'application/text')
        chai.assert(true)
      } catch (err) {
        chai.assert(false)
      }
    })
  })

  describe('downloadCurrentPage', function () {
    it('does not throw an error', function () {
      try {
        BaseUtility.downloadCurrentPage()
        chai.assert(true)
      } catch (err) {
        chai.assert(false)
      }
    })
  })

  describe('getFileName', function () {
    it('gets only file name of url', () => {
      const fileName = BaseUtility.getFileName('http://example.com/route/route2/fileName.txt?arg1&arg2#hash')
      chai.expect(fileName).to.be.a('string')
      chai.expect(fileName).to.equal('fileName.txt')
    })
  })

  describe('getFileExtension', function () {
    it('gets extension only', () => {
      const url = 'http://sub.domain.com:8080/index.html'
      const ext = BaseUtility.getFileExtension(url)
      chai.expect(ext).to.equal('html')
    })
  })

  describe('downloadDataUrl', function () {
    it('does not throw an error', function () {
      try {
        // Taken from https://en.wikipedia.org/wiki/Data_URI_scheme#HTML
        const dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='

        BaseUtility.downloadDataUrl(dataUrl, 'data.data')
        chai.assert(true)
      } catch (err) {
        chai.assert(false)
      }
    })
  })

  describe('downloadBlob', function () {
    it('does not throw an error', function () {
      try {
        const blob = new window.Blob([1, 2])
        BaseUtility.downloadBlob(blob, 'blob.blob')
        chai.assert(true)
      } catch (err) {
        chai.assert(false)
      }
    })
  })

  describe('downloadLink', function () {
    it('does not throw an error', function () {
      try {
        const url = 'https://theopenweb.info/robots.txt'
        BaseUtility.downloadLink(url, 'url.txt')
        chai.assert(true)
      } catch (err) {
        chai.assert(false)
      }
    })
  })

  describe('camelCaseToArray', function () {
    const h = BaseUtility.camelCaseToArray
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
    const h = BaseUtility.isCapitalLetter
    it('only small characters false', () => {
      chai.expect(h('a')).to.equal(false)
      chai.expect(h('z')).to.equal(false)
      chai.expect(h('D')).to.equal(true)
      chai.expect(h('1')).to.equal(true)
    })
  })

  describe('capitalize', function () {
    const h = BaseUtility.capitalize
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
      let funcs = []
      let keys = []
      let classInstances = []
      BaseUtility.loopClassFunctions(myClass, (func, key, classInstance) => {
        funcs.push(func)
        keys.push(key)
        classInstances.push(classInstance)
      })
      console.log('loopClassFunctions', funcs, keys, classInstances)
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
      const keys = []
      BaseUtility.loopClassProperties(myClass, (prop, key) => {
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
        callbackExecutor(callback) {
          return callback()
        }
      }
      const myClass = new MyClass()

      BaseUtility.bindClassThis(myClass)
      
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
      chai.expect(myClass.obj.func().ref).to.equal(undefined)
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
    const obj = BaseUtility.reduceObjectArray(objArr)
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
    return BaseUtility.waitFor(condition)
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
    return BaseUtility.sleep(sleepForMs)
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

    return BaseUtility.promiseAll(handles, false)
      .then((arr) => {
        chai.expect(arr).to.deep.equal([1, 2, 3])
      })
  })

  it('resolves promises ordered', () => {
    const t = (num, ms) => {
      return new Promise((resolve, reject) => {
        window.setTimeout(() => {
          resolve(num)
        }, ms)
      })
    }

    const h1 = () => { return t(1, 100) }
    const h2 = () => { return t(4, 10) }
    const h3 = () => { return t(6, 50) }
    const handles = [h1, h2, h3]

    return BaseUtility.promiseAll(handles, true)
      .then((arr) => {
        chai.expect(arr).to.deep.equal([1, 4, 6])
      })
  })
})

describe.skip('loadStyleSheets', function () {
  it('loads unordered', () => {
    // BaseUtility.loadStyleSheets(array, false);
  })

  it('loads ordered', () => {
    // Need to test different speed css.
  })
})

describe('loadScripts', function () {
  it('loads unordered', () => {
    const src1 = BaseUtility.createDataURI('window._a = true;')
    const src2 = BaseUtility.createDataURI('window._b = true;')
    return BaseUtility.loadScripts([src1, src2], false)
      .then(() => {
        chai.expect(window._a).to.equal(true)
        chai.expect(window._b).to.equal(true)
      })
  })

  it.skip('loads ordered', () => {
    // Need to test different speed scripts.
  })
})

describe('createDataURI', function () {
  it('creates data URI as expected: Hello World! => SGVsbG8gV29ybGQh', () => {
    // https://www.base64encode.org/
    const str = BaseUtility.createDataURI('Hello World!', mimeType = 'text/plain', { charset: 'utf-8' })
    chai.expect(str).to.equal('data:text/plain;charset=utf-8;base64,SGVsbG8gV29ybGQh')
  })
})
})
