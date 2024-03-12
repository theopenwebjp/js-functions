import * as ArrayHelpers from '../../../../src/array-helpers.js'
import * as chai from 'chai';

describe('array-helpers', function(){
    describe('searchObjectArray', ()=>{
        const key = 'testKey';
        const val = 'testVal';
        const objOk1 = {
            [key]: val,
            a: 1,
            b: 2
        };
        const objOk2 = {
            [key]: val,
            c: 1,
            d: 2
        };
        const arr = [
            {
                [key]: 1
            },
            objOk1,
            {
                [key]: (val + 1)
            },
            objOk2
        ];
        const found = ArrayHelpers.searchObjectArray(arr, key, val);
        chai.expect(found).to.deep.equal([
            objOk1,
            objOk2
        ]);
    });

    describe('singleDimensionArrayToObject', ()=>{
        const arr = [
            'a',
            '1',
            'b'
        ];
        const defaultVal = '?';
        const obj = ArrayHelpers.singleDimensionArrayToObject(arr, defaultVal);
        chai.expect(obj).to.deep.equal({
            'a': defaultVal,
            '1': defaultVal,
            'b': defaultVal
        });
    });

    describe.skip('arrayListToObjectList', ()=>{
        const arr = [
            [1,2,3,4],
            [5,6,7,8],
            [9,10,11,12]
        ];
        const keys = ['a', 'b', 'c', 'd'];
        const objList = ArrayHelpers.arrayListToObjectList(arr, keys);
        chai.expect(objList).to.deep.equal([
            {a: 1, b: 2, c: 3, d: 4},
            {a: 5, b: 6, c: 7, d: 8},
            {a: 9, b: 10, c: 11, d: 12}
        ]);
    });

    describe('arrayToCamelCase', ()=>{
        const h = ArrayHelpers.arrayToCamelCase;
        chai.expect(h(['normal','camel','case'])).to.equal('normalCamelCase');
        chai.expect(h(['o','n','e','l','e','t','t','e','r'])).to.equal('oNELETTER');
    });

    describe('buildDelimiterString', ()=>{
        const arr = ['delimiter', 'string'];
        const h = ArrayHelpers.buildDelimiterString;
        chai.expect(h(arr, 'camelCase')).to.equal('delimiterString');
        chai.expect(h(arr, '_')).to.equal('delimiter_string');
    });

    describe('uniqueArray', ()=>{
        const h = ArrayHelpers.uniqueArray;
        chai.expect(h([1,1,2,2,1,2])).to.deep.equal([1,2]);
    });
});