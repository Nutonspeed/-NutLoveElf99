import { beforeEach, describe, expect, it } from 'vitest'
import { createFastBill, getFastBill, resetFastBills } from '../fakeBillDB'

const sample = {
  customerName: 'Alice',
  phone: '1234567890',
  items: 'sofa',
  total: 1000,
  deposit: 100,
  days: 7,
  fabricName: 'Cotton',
  fabricImage: 'img.jpg',
  sofaType: 'L-shape',
  sofaSize: 'Large',
  quantity: 1,
  tags: ['test']
}

beforeEach(() => {
  resetFastBills()
})

describe('fakeBillDB', () => {
  it('createFastBill returns a bill', async () => {
    const bill = await createFastBill(sample)
    const retrieved = await getFastBill(bill.id)
    expect(retrieved).toEqual(bill)
  })

  it('getFastBill retrieves the same bill', async () => {
    const bill = await createFastBill(sample)
    const retrieved = await getFastBill(bill.id)
    expect(retrieved).toEqual(bill)
  })
})
