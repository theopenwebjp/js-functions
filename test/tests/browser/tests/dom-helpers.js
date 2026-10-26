import * as chai from 'chai'
import * as DOMHelpers from '../../../../src/dom-helpers.js'

const { expect } = chai

describe('dom-helpers security and defaults', function () {
  it('renders configured HTML strings as text', () => {
    const element = DOMHelpers.createElement({
      tag: 'div',
      innerHTML: '<img src=x onerror=alert(1)>'
    })

    expect(element.textContent).to.equal('<img src=x onerror=alert(1)>')
    expect(element.querySelector('img')).to.equal(null)
  })

  it('rejects event-handler and executable URL attributes', () => {
    const element = document.createElement('a')

    expect(() => DOMHelpers.setAttributes(element, { onclick: 'alert(1)' })).to.throw(TypeError)
    expect(() => DOMHelpers.setAttributes(element, { href: ' \tjavascript:alert(1)' })).to.throw(TypeError)
  })

  it('preserves item settings when applying element defaults', () => {
    const elements = DOMHelpers.createElements(
      [{ textContent: 'item' }],
      { tag: 'div', textContent: 'default' }
    )

    expect(elements[0].tagName).to.equal('DIV')
    expect(elements[0].textContent).to.equal('item')
  })

  it('creates table cells using literal text', () => {
    const table = DOMHelpers.createTable([['<img src=x onerror=alert(1)>']])

    expect(table.querySelector('img')).to.equal(null)
    expect(table.textContent).to.equal('<img src=x onerror=alert(1)>')
  })
})
