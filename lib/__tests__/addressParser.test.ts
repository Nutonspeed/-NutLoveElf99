import { parseAddress } from '../addressParser'
import { describe, it, expect } from 'vitest'

describe('parseAddress', () => {
  it('parses single line with phone', () => {
    const input = 'John Doe 0812345678 123/45 Main St, Bangkok 10100'
    const result = parseAddress(input)
    expect(result).toEqual({
      name: 'John Doe',
      phone: '0812345678',
      address: '123/45 Main St Bangkok 10100'
    })
  })

  it('parses multiline with phone', () => {
    const input = 'Jane\n088-123-4567\n45/3 Street, City'
    const result = parseAddress(input)
    expect(result).toEqual({
      name: 'Jane',
      phone: '0881234567',
      address: '45/3 Street City'
    })
  })

  it('parses without phone', () => {
    const input = 'Bob\n12 Road, Town'
    const result = parseAddress(input)
    expect(result).toEqual({
      name: 'Bob',
      phone: null,
      address: '12 Road Town'
    })
  })
})
