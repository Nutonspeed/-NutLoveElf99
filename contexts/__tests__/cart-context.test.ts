import { describe, it, expect } from 'vitest'
import { cartReducer } from '../cart-context'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

describe('cartReducer', () => {
  const initialState = { items: [] as CartItem[], total: 0, itemCount: 0 }

  it('adds an item to the cart', () => {
    const action = {
      type: 'ADD_ITEM' as const,
      payload: { id: '1', name: 'Sofa', price: 10, image: '', quantity: 1 },
    }
    const state = cartReducer(initialState, action)
    expect(state.items).toHaveLength(1)
    expect(state.total).toBe(10)
    expect(state.itemCount).toBe(1)
  })

  it('updates quantity of an existing item', () => {
    const stateWithItem = cartReducer(initialState, {
      type: 'ADD_ITEM',
      payload: { id: '1', name: 'Sofa', price: 10, image: '', quantity: 1 },
    })
    const updated = cartReducer(stateWithItem, {
      type: 'UPDATE_QUANTITY',
      payload: { id: '1', quantity: 3 },
    })
    expect(updated.items[0].quantity).toBe(3)
    expect(updated.total).toBe(30)
    expect(updated.itemCount).toBe(3)
  })

  it('removes an item', () => {
    const stateWithItem = cartReducer(initialState, {
      type: 'ADD_ITEM',
      payload: { id: '1', name: 'Sofa', price: 10, image: '', quantity: 1 },
    })
    const removed = cartReducer(stateWithItem, {
      type: 'REMOVE_ITEM',
      payload: '1',
    })
    expect(removed.items).toHaveLength(0)
    expect(removed.total).toBe(0)
    expect(removed.itemCount).toBe(0)
  })
})
