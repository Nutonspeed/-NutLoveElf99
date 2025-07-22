import React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'

function Dummy() {
  return <div>ok</div>
}

describe('smoke', () => {
  it('renders', () => {
    const { getByText } = render(<Dummy />)
    expect(getByText('ok')).toBeInTheDocument()
  })
})
