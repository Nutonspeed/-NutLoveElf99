import { create } from 'zustand'
import type { Product } from '@/types/product'
import type { ProductGroup } from '@/lib/mock-product-groups'
import type { Collection } from '@/lib/mock-collections'
import { mockProducts } from '@/lib/mock-products'
import { mockProductGroups } from '@/lib/mock-product-groups'
import { mockCollections } from '@/lib/mock-collections'
import { addAdminLog } from '@/lib/mock-admin-logs'

interface AdminStore {
  products: Product[]
  productGroups: ProductGroup[]
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

export const useAdminStore = create<AdminStore>((set) => ({
  products: mockProducts,
  productGroups: mockProductGroups,
  collections: mockCollections,
  addProduct: (data) =>
    set((state) => {
      const newProduct: Product = { id: Date.now().toString(), status: 'active', ...data }
      addAdminLog(`add product ${newProduct.id}`, 'mockAdminId')
      return { products: [...state.products, newProduct] }
    }),
  updateProduct: (id, data) =>
    set((state) => {
      addAdminLog(`update product ${id}`, 'mockAdminId')
      return { products: state.products.map((p) => (p.id === id ? { ...p, ...data } : p)) }
    }),
  deleteProduct: (id) =>
    set((state) => {
      addAdminLog(`delete product ${id}`, 'mockAdminId')
      return { products: state.products.filter((p) => p.id !== id) }
    }),
  addGroup: (data) =>
    set((state) => ({ productGroups: [...state.productGroups, { id: Date.now().toString(), ...data }] })),
  updateGroup: (id, data) =>
    set((state) => ({ productGroups: state.productGroups.map((g) => (g.id === id ? { ...g, ...data } : g)) })),
  deleteGroup: (id) =>
    set((state) => ({ productGroups: state.productGroups.filter((g) => g.id !== id) })),
  addCollection: (data) =>
    set((state) => ({ collections: [...state.collections, { id: Date.now().toString(), ...data }] })),
  updateCollection: (id, data) =>
    set((state) => ({ collections: state.collections.map((c) => (c.id === id ? { ...c, ...data } : c)) })),
  deleteCollection: (id) =>
    set((state) => ({ collections: state.collections.filter((c) => c.id !== id) })),
}))
