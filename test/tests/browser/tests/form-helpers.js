import * as chai from 'chai'
import * as FormHelpers from '../../../../src/form-helpers.js'

const { expect } = chai

describe('form-helpers validation', function () {
  it('limits required input validation to the submitted form', () => {
    document.body.innerHTML = `
      <form id="active"><input data-required value="filled"></form>
      <form id="other"><input data-required value=""></form>
    `
    const form = document.querySelector('#active')

    expect(FormHelpers.checkRequiredInputs(form)).to.equal(true)
  })

  it('validates checkbox state and radio groups', () => {
    document.body.innerHTML = `
      <form>
        <input id="radio-one" type="radio" name="choice" data-required>
        <input id="radio-two" type="radio" name="choice">
        <input id="check" type="checkbox" data-required>
      </form>
    `
    const radio = document.querySelector('#radio-one')
    const otherRadio = document.querySelector('#radio-two')
    const checkbox = document.querySelector('#check')

    otherRadio.checked = true
    expect(FormHelpers.checkRequiredInput(radio)).to.equal(true)
    expect(FormHelpers.checkRequiredInput(checkbox)).to.equal(false)
    checkbox.checked = true
    expect(FormHelpers.checkRequiredInput(checkbox)).to.equal(true)
  })

  it('alerts only when required input validation fails', () => {
    document.body.innerHTML = '<form><input data-required value="ok"></form>'
    const form = document.querySelector('form')
    const originalAlert = window.alert
    let alerts = 0
    window.alert = () => { alerts += 1 }

    try {
      expect(FormHelpers.handleSubmit({ target: form })).to.equal(true)
      expect(alerts).to.equal(0)
      form.querySelector('input').value = ''
      expect(FormHelpers.handleSubmit({ target: form })).to.equal(false)
      expect(alerts).to.equal(1)
    } finally {
      window.alert = originalAlert
    }
  })
})
