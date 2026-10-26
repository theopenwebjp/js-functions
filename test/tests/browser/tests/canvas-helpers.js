import * as chai from 'chai'
import * as CanvasHelpers from '../../../../src/canvas-helpers.js'

const { expect } = chai

describe('canvas-helpers pixel utilities', function () {
  it('iterates every RGBA pixel', () => {
    const imageData = {
      width: 2,
      height: 1,
      data: new Uint8ClampedArray([1, 2, 3, 4, 5, 6, 7, 8])
    }
    const pixels = []

    CanvasHelpers.loopImageData(imageData, (rgba, index) => pixels.push([rgba, index]))

    expect(pixels).to.deep.equal([
      [[1, 2, 3, 4], 0],
      [[5, 6, 7, 8], 1]
    ])
  })

  it('computes bounds with the canvas width and zero-origin pixels', () => {
    const data = new Uint8ClampedArray(3 * 2 * 4)
    data.set([0, 0, 1, 255], 0)
    data.set([0, 0, 1, 255], (1 * 3 + 2) * 4)
    const canvas = { width: 3, height: 2 }
    const context = {
      canvas,
      getImageData: () => ({ data })
    }

    expect(CanvasHelpers.getContextBoundingRect(context)).to.deep.equal({
      top: 0,
      bottom: 1,
      left: 0,
      right: 2
    })
  })

  it('counts exact colors without quadratic repeated scans', () => {
    const imageData = {
      width: 3,
      height: 1,
      data: new Uint8ClampedArray([
        1, 2, 3, 4,
        5, 6, 7, 8,
        1, 2, 3, 4
      ])
    }

    expect(CanvasHelpers.getMainColor(imageData)).to.deep.equal([1, 2, 3, 4])
  })
})
