import { beforeEach, describe, expect, it } from 'vitest'
import { join } from 'path'
import { promises as fs } from 'fs'
import { createFastBill, getFastBill } from '../fakeBillDB'

const file = join(process.cwd(), 'mock', 'store', 'fast-bills.json')

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

beforeEach(async () => {
  await fs.mkdir(join(process.cwd(), 'mock', 'store'), { recursive: true })
  await fs.writeFile(file, '[]', 'utf8')
})

describe('fakeBillDB', () => {
  it('createFastBill appends to JSON store', async () => {
    const bill = await createFastBill(sample)
    const stored = JSON.parse(await fs.readFile(file, 'utf8'))
    expect(stored).toHaveLength(1)
    expect(stored[0]).toEqual(bill)
  })

  it('getFastBill retrieves the same bill', async () => {
    const bill = await createFastBill(sample)
    const retrieved = await getFastBill(bill.id)
    expect(retrieved).toEqual(bill)
  })
})
