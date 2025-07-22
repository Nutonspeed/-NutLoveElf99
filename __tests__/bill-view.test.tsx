import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BillClient } from '@/app/bill/view/[billId]/page'
import type { FakeBill } from '@/core/mock/fakeBillDB'
import * as db from '@/core/mock/fakeBillDB'

const sampleBill: FakeBill = {
  id: 'TEST-1',
  customerName: 'John Doe',
  customerAddress: '123 Main St',
  customerPhone: '0800000000',
  items: [
    { fabricName: 'Cotton', sofaType: 'Sofa', quantity: 1, unitPrice: 1000 },
  ],
  statusStep: 2,
  lastUpdated: '2024-06-01',
  estimatedTotal: 1000,
  note: 'note',
}

describe('BillClient', () => {
  beforeEach(() => {
    (globalThis as any).React = React
    vi.stubGlobal('alert', vi.fn())
  })

  it('saves new address and highlights current step', async () => {
    const updateSpy = vi.spyOn(db, 'updateBillAddress').mockResolvedValue(undefined)
    const { getByDisplayValue, getByText } = render(<BillClient bill={sampleBill} />)

    const input = getByDisplayValue('123 Main St') as HTMLInputElement
    fireEvent.change(input, { target: { value: '456 New Ave' } })
    fireEvent.click(getByText('บันทึกที่อยู่'))
    expect(updateSpy).toHaveBeenCalledWith('TEST-1', '456 New Ave')

    const step = getByText('กำลังแพ็ค')
    expect(step.className).toContain('font-bold')
    expect(step.className).toContain('text-primary')
  })
})
