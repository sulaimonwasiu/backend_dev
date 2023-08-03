/* eslint-disable no-undef */
const {reverse, average} = require('../utils/for_testing')
const assert = require('assert')

describe('Reverse a string', () => {
  it('reverse of a', () => {
    assert.equal(reverse('a'), 'a')
  })

  it('reverse of react', () => {
    const result = reverse('react')
  
    assert.equal(result, 'tcaer')
  })

  it('reverse of releveler', () => {
    const result = reverse('releveler')
  
    assert.equal(result,'releveler')
  })
})

describe('average', () => {
  it('of one value is the value itself', () => {
    assert.equal(average([1]), 1)
  })

  it('of empty array is zero', () => {
    assert.equal(average([]), 0)
  })
})

