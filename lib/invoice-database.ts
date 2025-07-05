import type { Invoice } from "@/types/invoice"

// Mock database for invoices
const invoices: Invoice[] = []

export const invoiceDb = {
  // Get all invoices
  async getInvoices(): Promise<Invoice[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...invoices])
      }, 300)
    })
  },

  // Get invoice by ID
  async getInvoiceById(id: string): Promise<Invoice | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const invoice = invoices.find((inv) => inv.id === id)
        resolve(invoice || null)
      }, 300)
    })
  },

  // Create new invoice
  async createInvoice(invoiceData: Partial<Invoice>): Promise<Invoice> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newInvoice: Invoice = {
          id: `inv-${Date.now()}`,
          orderId: invoiceData.orderId || "",
          invoiceNumber: this.generateInvoiceNumber(),
          issuedAt: invoiceData.issuedAt || new Date().toISOString(),
          dueAt:
            invoiceData.dueAt ||
            new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          items: invoiceData.items || [],
          subtotal: invoiceData.subtotal || 0,
          discount: invoiceData.discount || 0,
          shippingCost: invoiceData.shippingCost || 0,
          tax: invoiceData.tax || 0,
          total: invoiceData.total || 0,
          status: invoiceData.status || "unpaid",
          notes: invoiceData.notes || "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        invoices.push(newInvoice)
        resolve(newInvoice)
      }, 500)
    })
  },

  // Update invoice
  async updateInvoice(id: string, updates: Partial<Invoice>): Promise<Invoice | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = invoices.findIndex((inv) => inv.id === id)
        if (index === -1) {
          resolve(null)
          return
        }

        invoices[index] = {
          ...invoices[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        }

        resolve(invoices[index])
      }, 500)
    })
  },

  // Delete invoice
  async deleteInvoice(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = invoices.findIndex((inv) => inv.id === id)
        if (index === -1) {
          resolve(false)
          return
        }

        invoices.splice(index, 1)
        resolve(true)
      }, 300)
    })
  },

  // Generate invoice number
  generateInvoiceNumber(): string {
    const year = new Date().getFullYear()
    const count = invoices.length + 1
    return `INV-${year}-${String(count).padStart(3, "0")}`
  },
}
