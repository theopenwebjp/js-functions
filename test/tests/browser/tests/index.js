const JsFunctions = require('../../../../src/index');

var chai = require('chai');

describe('index.js', function(){
    it('Returns correct object values', function(){
        chai.expect(JsFunctions).to.be.an('object');

        const keys = [
            'BaseArrayHelper',
            'BaseObjectHelper',
            'BaseUtility',
            'NodeFunctions',
            'Utility',
            'DependentFunctions',
            'JQueryFunctions'
        ];
        chai.expect(JsFunctions).to.have.keys(...keys);
    });
})