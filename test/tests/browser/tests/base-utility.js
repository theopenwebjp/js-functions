const BaseUtility = require('../../../../src/base-utility');
const chai = require('chai');
const {expect} = chai;

describe('base-utility.js', function(){

  describe('getWrappedStrings', function(){
    const h = BaseUtility.getWrappedStrings;
    const wrapperOpen = '{{';
    const wrapperClose = '}}';
    it('gets wrapped normal', ()=>{
      const str = 'a{{b}}{{cc}} {{d}} ';
      const strings = h(str, wrapperOpen, wrapperClose);
      chai.expect(strings).to.deep.equal([
        'b', 'cc', 'd'
      ]);
    });
    it('gets wrapped keeping wrapper', ()=>{
      const str = 'a{{b}}{{cc}} {{d}} ';
      const strings = h(str, wrapperOpen, wrapperClose, true);
      chai.expect(strings).to.deep.equal([
        '{{b}}', '{{cc}}', '{{d}}'
      ]);
    });
    it('gets wrapped with self inside', ()=>{
      const str = 'a{{b}}{{{cc}} {{{{d}}}}';
      const strings = h(str, wrapperOpen, wrapperClose, false, true);
      chai.expect(strings).to.deep.equal([
        'b', 'cc', 'd'
      ]);
    });
  });

  describe('asyncCheck', function(){
    it('executes callback later(NOT SYNC)', (done)=>{
      let async = false;
      BaseUtility.asyncCheck(()=>{
        chai.expect(async).to.equal(true);
        done();
      });
      async = true;
    });
  });

  describe('promisify', function(){
    it('function with callback becomes executed promise.', ()=>{
      let val = 0;
      const callback = (arg)=>{
        chai.expect(arg).to.equal(10);
        chai.expect(val).to.equal(10);
      };
      const f = (num, callback)=>{
        val = num;
        callback(num);
      };
      const promise = BaseUtility.promisify(f, [10, callback, 1]);
      return promise;
    });
  });

  describe.skip('asyncHandler', function(){

  });

    describe('equals', function() {
        it('Return true on match, false on fail', function() {
          val = BaseUtility.equals(NaN, NaN); expect(val).to.equal(true);
          val = BaseUtility.equals(5, 5); expect(val).to.equal(true);
          val = BaseUtility.equals(3, 4); expect(val).to.equal(false);
        });
      });

      describe('arrayEquals', function(){
        const h = BaseUtility.arrayEquals;
        it('not equal length => false', ()=>{
          chai.expect(h([1],[1,1])).to.equal(false);
        });
        it('not same => false', ()=>{
          chai.expect(h([1,2],[1,1])).to.equal(false);
        });
        it('string number type diff => false', ()=>{
          chai.expect(h([1],['1'])).to.equal(false);
        });
        it('same => true', ()=>{
          chai.expect(h([1,2,3],[1,2,3])).to.equal(true);
        });
      });

      describe('exists', function(){
        const h = BaseUtility.exists;
        it('null and undefined only false', ()=>{
          chai.expect(h(undefined)).to.equal(false);
          chai.expect(h(null)).to.equal(false);
          chai.expect(h(false)).to.equal(true);
          chai.expect(h('')).to.equal(true);
          chai.expect(h(0)).to.equal(true);  
        });
      });

      describe.skip('log', function(){

      });

      describe.skip('getDataUrlExtension', function(){

      });

      describe.skip('download', function(){

      });

      describe.skip('downloadCurrentPage', function(){

      });

      describe('getFileName', function(){
        it.skip('gets only file name of url', ()=>{

        });
      });

      describe('getFileExtension', function(){
        it('gets extension only', ()=>{
          const url = 'http://sub.domain.com:8080/index.html';
          const ext = BaseUtility.getFileExtension(url);
          chai.expect(ext).to.equal('html');
        });
      });

      describe.skip('downloadDataUrl', function(){

      });

      describe.skip('downloadBlob', function(){

      });

      describe.skip('downloadLink', function(){

      });

      describe('cameCaseToArray', function(){
        const h = BaseUtility.camelCaseToArray;
        it('normal camel case', ()=>{
          const str = 'camelCaseWord';
          chai.expect(h(str)).to.deep.equal([
            'camel', 'case', 'word'
          ]);
        });
        it('single letter words camel case', ()=>{
          const str = 'iCAMEL';
          chai.expect(h(str)).to.deep.equal([
            'i','C','A','M','E','L'
          ]);
        });

      });

      describe('isCapitalLetter', function(){
        const h = BaseUtility.isCapitalLetter;
        it('only small characters false', ()=>{
          chai.expect(h('a')).to.equal(false);
          chai.expect(h('z')).to.equal(false);
          chai.expect(h('D')).to.equal(true);
          chai.expect(h('1')).to.equal(true);
        });
      });

      describe('capitalize', function(){
        const h = BaseUtility.capitalize;
        it('capitalizes first letter', ()=>{
          chai.expect(h('capital')).to.equal('Capital');
        });
      });

      describe('class looping', ()=>{
        const getClass = ()=>{
          class Extension{
            e(){
              return this;
            }
          }
          class MyClass extends Extension{
            f1(){
              return this;
            }
            f2(){
              return this;
            }
          }
          const myClass = new MyClass();

          return myClass;
        };

        describe('loopClassFunctions', function(){
          it('', ()=>{
            const myClass = getClass();
            let funcs = [];
            let keys = [];
            let classInstances = [];
            BaseUtility.loopClassFunctions(myClass, (func, key, classInstance)=>{
              funcs.push(func);
              keys.push(key);
              classInstances.push(classInstance);
            });
            chai.expect(funcs).to.deep.equal([myClass.f1, myClass.f2, myClass.e]);
            chai.expect(keys).to.deep.equal(['f1', 'f2', 'e']);
            chai.expect(classInstances).to.deep.equal([myClass, myClass, myClass]);
        });
      });
  
        describe('bindClassThis', function(){
          it('', ()=>{
            const myClass = getClass();
            BaseUtility.bindClassThis(myClass);
            const obj = {
              h: myClass.f1
            };
            chai.expect(obj.h()).to.equal(myClass);
          });
        });
      });

      describe('reduceObjectArray', function(){
        it('', ()=>{
          const objArr = [
            {
              a: 1,
              b: 5
            },
            {
              a: 7,
              b: 8
            }
          ];
          const obj = BaseUtility.reduceObjectArray(objArr);
          chai.expect(obj).to.deep.equal({
            a: 8,
            b: 13
          });
        });
      });

      describe('waitFor', function(){
        it('', ()=>{
          const ms = Date.now();
          const waitMs = 200;
          const condition = ()=>{
            return (Date.now() >= (ms + waitMs));
          };
          return BaseUtility.waitFor(condition)
          .then(()=>{
            chai.assert(true);
          });
        });
      });

      describe('sleep', function(){
        it('', ()=>{
          const ms = Date.now();
          const sleepForMs = 200;
          const toleranceInMs = 10;
          return BaseUtility.sleep(sleepForMs)
          .then(()=>{
            chai.expect(Math.abs((Date.now() - ms) - sleepForMs) <= toleranceInMs);
          });
        });
      });

});