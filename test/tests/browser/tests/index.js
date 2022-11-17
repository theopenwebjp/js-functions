// const JsFunctions = require('../../../../src/index')
import * as JsFunctions from '../../../../src/index.js'
// const chai = require('chai')
import chai from 'chai'

describe('index.js', function () {
  it('Returns correct object values', function () {
    // console.debug({ JsFunctions, type: typeof JsFunctions });
    // chai.expect(JsFunctions).to.be.an('object')
    chai.expect(JsFunctions && typeof JsFunctions === 'object')

        const keys = [
      'BaseArrayHelper',
      'BaseObjectHelper',
      'BaseUtility',
      'Utility',
      'PureFunctions',
    ]
        chai.expect(JsFunctions).to.have.keys(...keys)
    })
})
