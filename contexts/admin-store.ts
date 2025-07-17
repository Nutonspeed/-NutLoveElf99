import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockProducts } from '@/lib/mock-products'
import { mockProductGroups, type ProductGroup } from '@/lib/mock-product-groups'
import { mockCollections, type Collection } from '@/lib/mock-collections'
import type { Product } from '@/types/product'
import { addAdminLog } from '@/lib/mock-admin-logs'

interface AdminStoreState {
  products: Product[]
  groups: ProductGroup[]
  collections: Collection[]
  addProduct: (data: Omit<Product, 'id'>) => void
  updateProduct: (id: string, data: Partial<Product>) => void
  deleteProduct: (id: string) => void
  addGroup: (data: Omit<ProductGroup, 'id'>) => void
  updateGroup: (id: string, data: Partial<ProductGroup>) => void
  deleteGroup: (id: string) => void
  addCollection: (data: Omit<Collection, 'id'>) => void
  updateCollection: (id: string, data: Partial<Collection>) => void
  deleteCollection: (id: string) => void
}

export const useAdminStore = create<AdminStoreState>()(
  persist(
    (set, get) => ({
      products: mockProducts,
      groups: mockProductGroups,
      collections: mockCollections,
      addProduct: (data) => {
        const newProduct: Product = {
          id: Date.now().toString(),
          status: 'active',
          ...data,
        }
        set((state) => ({ products: [...state.products, newProduct] }))
        addAdminLog(`add product ${newProduct.id}`, 'mockAdminId')
      },
      updateProduct: (id, data) => {
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...data } : p)),
        }))
        addAdminLog(`update product ${id}`, 'mockAdminId')
      },
      deleteProduct: (id) => {
        set((state) => ({ products: state.products.filter((p) => p.id !== id) }))
        addAdminLog(`delete product ${id}`, 'mockAdminId')
      },
      addGroup: (data) => {
        const newGroup: ProductGroup = { id: Date.now().toString(), ...data }
        set((state) => ({ groups: [...state.groups, newGroup] }))
      },
      updateGroup: (id, data) => {
        set((state) => ({
          groups: state.groups.map((g) => (g.id === id ? { ...g, ...data } : g)),
        }))
      },
      deleteGroup: (id) => {
        set((state) => ({ groups: state.groups.filter((g) => g.id !== id) }))
      },
      addCollection: (data) => {
        const newCollection: Collection = { id: Date.now().toString(), ...data }
        set((state) => ({ collections: [...state.collections, newCollection] }))
      },
      updateCollection: (id, data) => {
        set((state) => ({
          collections: state.collections.map((c) => (c.id === id ? { ...c, ...data } : c)),
        }))
      },
      deleteCollection: (id) => {
        set((state) => ({ collections: state.collections.filter((c) => c.id !== id) }))
      },
    }),
    { name: 'admin-store' },
  ),
)
