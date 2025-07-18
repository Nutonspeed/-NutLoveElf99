import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createClient } from '@supabase/supabase-js'

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({ mock: true })),
}))

// helper to clear env vars
const clearEnv = () => {
  delete process.env.NEXT_PUBLIC_SUPABASE_URL
  delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
}

describe('supabase client initialization', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  afterEach(() => {
    clearEnv()
  })

  it('initializes when env variables are defined', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://example.com'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'anon'

    const mod = await import('../supabase')

    expect(createClient).toHaveBeenCalledWith('http://example.com', 'anon')
    expect(mod.supabase).toEqual({ mock: true })
  })

  it('remains null when env variables are missing', async () => {
    clearEnv()
    const mod = await import('../supabase')

    expect(createClient).not.toHaveBeenCalled()
    expect(mod.supabase).toBeNull()
  })
})

describe('getProducts', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('returns data from supabase', async () => {
    const select = vi.fn().mockResolvedValue({ data: [{ id: '1' }], error: null })
    const from = vi.fn().mockReturnValue({ select })
    vi.doMock('../supabase', () => ({ supabase: { from } }))

    const { getProducts } = await import('../mock-products')
    const result = await getProducts()

    expect(from).toHaveBeenCalledWith('products')
    expect(result).toEqual([{ id: '1' }])
  })

  it('returns mock data on error', async () => {
    const select = vi.fn().mockResolvedValue({ data: null, error: new Error('fail') })
    const from = vi.fn().mockReturnValue({ select })
    vi.doMock('../supabase', () => ({ supabase: { from } }))

    const { getProducts, mockProducts } = await import('../mock-products')
    const result = await getProducts()

    expect(result).toEqual(mockProducts)
  })
})

describe('getFabrics', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('returns data from supabase', async () => {
    const select = vi.fn().mockResolvedValue({ data: [{ id: 'f1' }], error: null })
    const from = vi.fn().mockReturnValue({ select })
    vi.doMock('../supabase', () => ({ supabase: { from } }))

    const { getFabrics } = await import('../mock-fabrics')
    const result = await getFabrics()

    expect(from).toHaveBeenCalledWith('fabrics')
    expect(result).toEqual([{ id: 'f1' }])
  })

  it('returns mock fabrics on error', async () => {
    const select = vi.fn().mockResolvedValue({ data: null, error: new Error('oops') })
    const from = vi.fn().mockReturnValue({ select })
    vi.doMock('../supabase', () => ({ supabase: { from } }))

    const { getFabrics, mockFabrics } = await import('../mock-fabrics')
    const result = await getFabrics()

    expect(result).toEqual(mockFabrics)
  })
})
