import leadsData from '@/mock/facebookLeads.json'
import type { Customer } from '@/types/customer'
import { addCustomer } from '@/lib/mock-customers'

export interface FacebookLead {
  id: string
  name: string
  message: string
  phone: string
  timestamp: string
  billed?: boolean
}

let leads: FacebookLead[] = [...(leadsData as FacebookLead[])]

export function loadLeads() {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem('facebookLeads')
    if (raw) leads = JSON.parse(raw) as FacebookLead[]
  }
}

function persist() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('facebookLeads', JSON.stringify(leads))
  }
}

export function listLeads() {
  return leads.sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export function getLead(id: string) {
  return leads.find(l => l.id === id)
}

export function markBilled(id: string) {
  const l = getLead(id)
  if (l) {
    l.billed = true
    persist()
  }
}

export function convertLeadToCustomer(lead: FacebookLead): Customer {
  const customer = addCustomer({
    name: lead.name,
    phone: lead.phone,
    tags: ['จาก Facebook'],
  })
  return customer
}

export function exportPendingCsv(): string {
  const pending = leads.filter(l => !l.billed)
  const rows = [
    'id,name,message,phone,timestamp',
    ...pending.map(l => `${l.id},"${l.name}","${l.message}",${l.phone},${l.timestamp}`)
  ]
  return rows.join('\n')
}
