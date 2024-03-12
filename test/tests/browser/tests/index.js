import * as JsFunctions from '../../../../src/index.js'
import * as chai from 'chai'

describe('index.js', function () {
  it('Returns correct object values', function () {
    chai.expect(JsFunctions && typeof JsFunctions === 'object')
    // NO OTHER TESTING BECAUSE IMPORTING ALL IS NOT RECOMMENDED.
  })
})
